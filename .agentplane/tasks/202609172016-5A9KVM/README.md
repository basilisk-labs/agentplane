---
id: "202609172016-5A9KVM"
title: "Complete canonical Task application coordinator for 0.7.10"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 147
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
  state: "approved"
  updated_at: "2026-09-18T22:42:39.802Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-18T22:42:39.802Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:e527a143c35af7e8ae563c540defc54db9250eace763ca7f520d330681fa543f"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-18T22:42:39.802Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "35867096b52f05c366bcbe34e1da2dba5c636504"
  review_identity_digest: "sha256:e1a0cca3ced48352c8ecb8ffad4b2b3746107abdaf06c6b3778130b2f6658353"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609172016-5A9KVM/927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4/quality-report.json"
  findings:
    - "Repository evidence binds this review to commit 35867096b52f05c366bcbe34e1da2dba5c636504 and its single product path, the coordinator regression test."
    - "The test supplies immutable primary and follow-up intents, a current HEAD beyond the follow-up base, a range containing only this task's artifacts, and the authorized follow-up path still dirty."
    - "The test requires one commit dispatch for only the remaining product path and validates the reconciled implementation commit and combined changed-path evidence."
    - "The underlying coordinator remains fail-closed: ancestry is required, non-task paths in committed ranges must exactly match the persisted intents, and unrelated introduced dirty paths are rejected."
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
commit:
  hash: "35867096b52f05c366bcbe34e1da2dba5c636504"
  message: "AgentPlane-owned canonical implementation commit"
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
  agentplane.kernel_operational_projection:
    digest: "sha256:0405758922425fd7f6aea9cbe996ab889448ba8a0f43cdd94de2b537bcb50430"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609172016-5A9KVM/927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4/quality-report.json"
    findings:
      - "Repository evidence binds this review to commit 35867096b52f05c366bcbe34e1da2dba5c636504 and its single product path, the coordinator regression test."
      - "The test supplies immutable primary and follow-up intents, a current HEAD beyond the follow-up base, a range containing only this task's artifacts, and the authorized follow-up path still dirty."
      - "The test requires one commit dispatch for only the remaining product path and validates the reconciled implementation commit and combined changed-path evidence."
      - "The underlying coordinator remains fail-closed: ancestry is required, non-task paths in committed ranges must exactly match the persisted intents, and unrelated introduced dirty paths are rejected."
    implementation_commit: "35867096b52f05c366bcbe34e1da2dba5c636504"
    implementation_tree: "b0e31ea0a672e8a979cbf2121e19b332af12ee12"
    projected_at: "2026-09-18T22:42:39.802Z"
    review_identity_digest: "sha256:e1a0cca3ced48352c8ecb8ffad4b2b3746107abdaf06c6b3778130b2f6658353"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:e527a143c35af7e8ae563c540defc54db9250eace763ca7f520d330681fa543f"
    work_order_id: "sha256:98600244cc2e9564afd0eb563ea68d9eead2c50a5dc364d20078fc6dce39a579"
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
            digest: "sha256:4ae93bdfd4e1f2ec03448aac94ba82364e69af1a30c19d8ff5ce623fac2e9ad7"
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
              parent_authority_digest: "sha256:eff43e1f34c8e20944851aa4056c899d4dc59043066f24f8e32bba1a7cdfcea3"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
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
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.test.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
            evidence_digest: "sha256:193385093f44f2ee9015bb70c2734de20560593884a98f481d5c6a6c0f580d78"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:9e420a2a28c5c4376122fb1dd09c95b4c8e8d96a1a43dd6858a07d37b772a755"
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
            digest: "sha256:abe332e6f388d9a0bd7ba8ae8c870bf00f9e71655bf045dbcd0aa8ad46920722"
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
              parent_authority_digest: "sha256:4ae93bdfd4e1f2ec03448aac94ba82364e69af1a30c19d8ff5ce623fac2e9ad7"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:740b7fcf8b684f37b96f0914c1cdf764b3ccba66e2ee1c7cc58415bf799336e6"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/finalize.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/run.command.ts"
            evidence_digest: "sha256:a2d33f2ac7dc40b02af90bc602bc69a170023103db5191ea9d0d8e7dc1f42d4a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
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
            digest: "sha256:20b9f31af10d7c02e38c7e55d4536bb76e8b65dbfc29ec4a932933c56efb4622"
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
              parent_authority_digest: "sha256:abe332e6f388d9a0bd7ba8ae8c870bf00f9e71655bf045dbcd0aa8ad46920722"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:517c98cc43d8479eccfb881e80670e542e8c5a832eba0682d0eebd3643bf6e6d"
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
            evidence_digest: "sha256:7f6f768674ae687054ece00fdbf920399f381c9069b927507a4e04009dbcd931"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:740b7fcf8b684f37b96f0914c1cdf764b3ccba66e2ee1c7cc58415bf799336e6"
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
            digest: "sha256:eb2f7150a27b815c3581bd1a725a46be3e03843ae8a534571599e7844f93d7df"
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
              parent_authority_digest: "sha256:20b9f31af10d7c02e38c7e55d4536bb76e8b65dbfc29ec4a932933c56efb4622"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/finalize.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/run.command.ts"
            evidence_digest: "sha256:7436a06ff328cff7f1dbecb7baf6f15c08800e0ab1fce8e7f9c27b2e123078c4"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:517c98cc43d8479eccfb881e80670e542e8c5a832eba0682d0eebd3643bf6e6d"
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
            digest: "sha256:60cdec70d4acfb03acd22a3e378c1551a0e3222993bbc7e18cb6bebc36c01a20"
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
              parent_authority_digest: "sha256:eb2f7150a27b815c3581bd1a725a46be3e03843ae8a534571599e7844f93d7df"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5bee47b9c5530d6f71bc54df1893dad29fbc87d3c93563430bb78c345ec86171"
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
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            added_repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            added_scope_roots:
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:9153047f931a1cfdf18d0cb123946db935ba85a408db15b1ba57a48ca7c9c2d0"
            kind: "authority_delta"
            previous_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
            repository_evidence_digest: "sha256:09b4f49f934745b8552979ccd5e13e897fc91b54331508e24ba174f9f403fd39"
            request_digest: "sha256:2810f21a1f168bf6252c5cd42643138bf44170a719c011c693710bb747e469d4"
            request_task_revision: 33
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
            digest: "sha256:66c410d575a070fb2926206a862d91c73aa696a836be5ec9fe2d24d01b9aaf2c"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:41a64f606e78235ff526b7360a079acba13beb01c716cb09cdc24a1ce3fcbc12"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:60cdec70d4acfb03acd22a3e378c1551a0e3222993bbc7e18cb6bebc36c01a20"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5bee47b9c5530d6f71bc54df1893dad29fbc87d3c93563430bb78c345ec86171"
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
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            changed_paths: []
            evidence_digest: "sha256:f6ca8e9f1341f15b22d5ed8cbfbe830fccfab1a8f871831c3d8f110f32c0e478"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:5bee47b9c5530d6f71bc54df1893dad29fbc87d3c93563430bb78c345ec86171"
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
            digest: "sha256:e7a7826bddeb8bc80aa8ca6f7322dba741d3be8d4f1d3720415b92ccb37bc341"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:41a64f606e78235ff526b7360a079acba13beb01c716cb09cdc24a1ce3fcbc12"
              kind: "USER"
              parent_authority_digest: "sha256:66c410d575a070fb2926206a862d91c73aa696a836be5ec9fe2d24d01b9aaf2c"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3929a1540fb1d50cf08bd6ef0709194d3744a25aeca48bc8f59601a1699d302a"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            added_repository_effects:
              - "repository_write"
              - "source_code"
            added_scope_roots:
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
            changed_paths:
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:ec253f3113b409f042f3496f4af8c38b3cb375b3c3ba786ffea0ffd5b17259e5"
            kind: "authority_delta"
            previous_fingerprint: "sha256:5bee47b9c5530d6f71bc54df1893dad29fbc87d3c93563430bb78c345ec86171"
            repository_evidence_digest: "sha256:bf4b56ec22c2c8c1647c0cea03172d98d59c414b4f184cdb520602f4f95e3635"
            request_digest: "sha256:c968bf74988205a7bdf62ae2413871519d1f33c37693402f0b8e0155129015f4"
            request_task_revision: 36
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
            digest: "sha256:d0af88bd5d1dd3c0ced30ab0a58dcfa538e910fae8ddeb8cb0c71cde435e312c"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e7a7826bddeb8bc80aa8ca6f7322dba741d3be8d4f1d3720415b92ccb37bc341"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3929a1540fb1d50cf08bd6ef0709194d3744a25aeca48bc8f59601a1699d302a"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            changed_paths: []
            evidence_digest: "sha256:266fc60bacc915f2e4c2ffd68d8637b0b7cacd771f3a78b9ba11c1f1fb30fdc2"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:3929a1540fb1d50cf08bd6ef0709194d3744a25aeca48bc8f59601a1699d302a"
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
            digest: "sha256:09d6a77d16253976265f1378855fa0a5461dd5a5089ff4c850a7a0e324513f5c"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d0af88bd5d1dd3c0ced30ab0a58dcfa538e910fae8ddeb8cb0c71cde435e312c"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:c08460674a50281ef159b5290d00061e7408c2f441ccee56349ab03abdc5a791"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:3929a1540fb1d50cf08bd6ef0709194d3744a25aeca48bc8f59601a1699d302a"
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
            digest: "sha256:da6d71f029aad9aca5cbd1eebaf3136308ab2b773601991b19014b7ec11e4115"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:09d6a77d16253976265f1378855fa0a5461dd5a5089ff4c850a7a0e324513f5c"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/finalize.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
              - "packages/agentplane/src/commands/task/kernel-controller-handoff.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-run.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/agentplane/src/commands/task/run.command.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:41ed1524d6a873f51efd0631ff2e689ef0b98fde001bb977856055a970f3d44a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
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
            digest: "sha256:26aa284f5728865c1e95ac7369d2fc45feaa743fe89580bb6fd764e3a415e3ed"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:da6d71f029aad9aca5cbd1eebaf3136308ab2b773601991b19014b7ec11e4115"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "docs/developer/harness-dev.mdx"
              - "docs/releases/v0.7.10.md"
              - "packages/agentplane/src/commands/acr/acr.command.test.ts"
              - "packages/agentplane/src/commands/acr/generate.ts"
              - "packages/agentplane/src/commands/acr/summary.ts"
              - "packages/testkit/src/cli-harness.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:4e23b63cd0958f625388c12d3df6ac1ad1278e922ae205ef82fa1bd8c87c77a6"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
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
            digest: "sha256:518fae66078d55378c8e2995f51dc1a06586ac04d1b98495fc4eb7505f276d3c"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:26aa284f5728865c1e95ac7369d2fc45feaa743fe89580bb6fd764e3a415e3ed"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
            evidence_digest: "sha256:27107db792eae117155b068caa10f35d8db572d9fc56c26b2a9713c0053e6f20"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
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
            digest: "sha256:14bc7a9d32dd21b341f7e579b52ae8f1bd85a1ec7a857f8aa7b257ab18ab6d21"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:518fae66078d55378c8e2995f51dc1a06586ac04d1b98495fc4eb7505f276d3c"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "scripts/qualification/release-qualification.test.mjs"
            evidence_digest: "sha256:c9cfa97f449bb24afe57ad2ebf63c7ac0d6d2a0cec22daaccd8bf1f7dda8245b"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
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
            digest: "sha256:4262ad9586ef9e3aae4efabc090f7b397bd35d302b31590b0ab06064d8f755a5"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:14bc7a9d32dd21b341f7e579b52ae8f1bd85a1ec7a857f8aa7b257ab18ab6d21"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            evidence_digest: "sha256:9ecfb671bf88c8dcb4e31e2944ef334605c06e49790d57062d19f7045184a88f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
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
            digest: "sha256:68dc1c51196dabf8328c95f0face77acc22990b2e6b22620432bf9deba86367d"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4262ad9586ef9e3aae4efabc090f7b397bd35d302b31590b0ab06064d8f755a5"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/commands/task/show-kernel.test.ts"
              - "packages/agentplane/src/commands/task/show.ts"
            evidence_digest: "sha256:65bed93fe0b0b2ceda7576d34663c2dce87ded35ddb4b903d6674994268bc6d4"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
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
            digest: "sha256:89ad3a96bc718413a85722e68f7487ef6ff1794d893a1b8725ea9d2929504dba"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:68dc1c51196dabf8328c95f0face77acc22990b2e6b22620432bf9deba86367d"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/commands/task/show-kernel.test.ts"
              - "packages/agentplane/src/commands/task/show.ts"
            evidence_digest: "sha256:ef192092b22a9ee634429b3357f4184a1d2bb2393a22aabcaf3b4ae494e25105"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
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
            digest: "sha256:4817638d6b2af129f6dfb9009e9acf2f8ceef5a78b8c6c6d47427b6a2012ebd2"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:89ad3a96bc718413a85722e68f7487ef6ff1794d893a1b8725ea9d2929504dba"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              - "scripts/qualification/release-qualification.test.mjs"
            evidence_digest: "sha256:bab07db624179973cc419f4a6852ae39460bc2f6bbba140c3b1f31907af6bffd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
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
            digest: "sha256:57decbf3a98d2b51bd5c2c596bf253a2ab5ee358ef8afb3f1e3a19f8861311c7"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6558b82d343486058d7cbcea51d44007bdfcb1f83a45550c33c0819b32367013"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4817638d6b2af129f6dfb9009e9acf2f8ceef5a78b8c6c6d47427b6a2012ebd2"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            changed_paths: []
            evidence_digest: "sha256:ce6d141b3b631f49999471f37cc8ee1b1c37d4a9efedce1ff2f25fa71bbb6a39"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
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
            digest: "sha256:9fec45a7d2cf18acdcfcdf44bdd3db16d470ee4959e7d09299685c286a77c077"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6558b82d343486058d7cbcea51d44007bdfcb1f83a45550c33c0819b32367013"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:57decbf3a98d2b51bd5c2c596bf253a2ab5ee358ef8afb3f1e3a19f8861311c7"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-finalization.ts"
              - "packages/agentplane/src/commands/task/git-status-path.test.ts"
              - "packages/agentplane/src/commands/task/git-status-path.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
            evidence_digest: "sha256:ab515c4fdc2098f94082b8dea17fd316f1a8a278ed95d82fc7c104459395f1c6"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
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
            digest: "sha256:3c15518e807c682822a257c163c467042382167f07bdfe09bd7ad6e1c5621aa3"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29"
            plan_revision: 5
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:4f7ae06fc481728191c3f38b841c2a4eafe5dc33fe70390e8cd6a62b51257b33"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9fec45a7d2cf18acdcfcdf44bdd3db16d470ee4959e7d09299685c286a77c077"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            changed_paths: []
            evidence_digest: "sha256:45658596b30adee77f15b4bd8a2c0ef7b596fcb470cde45c860be9a42cba33a4"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
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
            digest: "sha256:e611a872431fbe8b42c210287fbdffd67bbbbfb7a9fd0367ab899b952e3cc386"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29"
            plan_revision: 5
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:4f7ae06fc481728191c3f38b841c2a4eafe5dc33fe70390e8cd6a62b51257b33"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3c15518e807c682822a257c163c467042382167f07bdfe09bd7ad6e1c5621aa3"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
            evidence_digest: "sha256:5486dde2870fcaced551c0e74387f06f552966d052ef6ae819cc197d6da8a29d"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
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
            digest: "sha256:992ee350dad841b9644f7930f5ac070b73f3bd6196416db6969cebbf75856769"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a"
            plan_revision: 6
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:535b781d34faec91916011c490e654a820cae6e85f91a4e6538cf8a39fc1dec7"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e611a872431fbe8b42c210287fbdffd67bbbbfb7a9fd0367ab899b952e3cc386"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            changed_paths: []
            evidence_digest: "sha256:6e42af4a98c10ad39b8aa812c68ebb8055ad6bbc5e5e552f95ca265128b21389"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
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
            digest: "sha256:cbca4051e1ffe1faa6caf155fb7d6de951acb8cd571d8d1760456271f58abf0f"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a"
            plan_revision: 6
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:535b781d34faec91916011c490e654a820cae6e85f91a4e6538cf8a39fc1dec7"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:992ee350dad841b9644f7930f5ac070b73f3bd6196416db6969cebbf75856769"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
            evidence_digest: "sha256:147b6028a6f5e9c019e36d16462dbb22dd6bed8f35cc46bd06df4e4c1a611465"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
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
            digest: "sha256:3479d651a59bc051c067d80abbcaf156f1643060de76cda731b9ff8be4362a73"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f2ae8850c9a249185765d152e3bde093462d29120edd0fbe8ab0c276885d1928"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:cbca4051e1ffe1faa6caf155fb7d6de951acb8cd571d8d1760456271f58abf0f"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "docs/user/cli-reference.generated.mdx"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
            added_scope_roots:
              - "docs/user/cli-reference.generated.mdx"
            changed_paths: []
            evidence_digest: "sha256:e0cdc2ef18e55eb4bcfbcfd4ba8e4abb9c82f114d90817446bd0496a277fc918"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
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
            digest: "sha256:c9b3224bc7e2de380d4ad6cc700cee3ceaabecb0cd3e0698b27351fd383fb103"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f2ae8850c9a249185765d152e3bde093462d29120edd0fbe8ab0c276885d1928"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3479d651a59bc051c067d80abbcaf156f1643060de76cda731b9ff8be4362a73"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "docs/user/cli-reference.generated.mdx"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
            evidence_digest: "sha256:0d4212a8e70de0d8d88d1ef0cabe07ff6940116568e21fd08e2be3c9ca3822df"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
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
            digest: "sha256:65ed45af75c5c3c98f1f51727008fbe562d5c8227dba4185486ac819f90664e7"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f2ae8850c9a249185765d152e3bde093462d29120edd0fbe8ab0c276885d1928"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c9b3224bc7e2de380d4ad6cc700cee3ceaabecb0cd3e0698b27351fd383fb103"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "docs/user/cli-reference.generated.mdx"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
            evidence_digest: "sha256:543b74ebdd3150317d0daa1cbd4e5bbaaccece5c9934c1e0b1d3c9f37ead6cc9"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
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
            digest: "sha256:01719ce93a11706c6881344cf4ab673f2c742312cbb8054152f56bac77cf4a67"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f2ae8850c9a249185765d152e3bde093462d29120edd0fbe8ab0c276885d1928"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:65ed45af75c5c3c98f1f51727008fbe562d5c8227dba4185486ac819f90664e7"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cb78277a9e0baab7f88555a0957f6293d28b3a1e0ab9f9cea43bc36537908454"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "docs/user/cli-reference.generated.mdx"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity.test.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.kernel.test.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish-quality-evidence.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/verify-record-execute.ts"
              - "packages/agentplane/src/commands/task/verify-record.ts"
              - "packages/agentplane/src/commands/task/verify-record.types.ts"
            evidence_digest: "sha256:5e9b44176d399cef89169578c019b194ef29c9b82012fed4af6ab6525624de90"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace"
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
            digest: "sha256:d2155e2f08b65b2c9a08f1c1b95d6b513fcf7290e156920b61520c51d216d3b3"
            expires_at: null
            external_effects:
              - "git_remote"
              - "hosted_ci"
              - "integration"
              - "pull_request"
            plan_digest: "sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:f2ae8850c9a249185765d152e3bde093462d29120edd0fbe8ab0c276885d1928"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:01719ce93a11706c6881344cf4ab673f2c742312cbb8054152f56bac77cf4a67"
            repository_effects:
              - "ci"
              - "documentation"
              - "git_commit"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5a3f1cd1112133d6b7b0b356e9a3585fd9a3adbdaa6c6ecbed961c5be7936698"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/developer"
              - "docs/releases"
              - "docs/user/cli-reference.generated.mdx"
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
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/core/src/runner"
              - "packages/core/src/task"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
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
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
            evidence_digest: "sha256:d036124425385b43dc63f9198f2a68f832c3d4031a8b48f5dc4ceb7494206bb3"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:cb78277a9e0baab7f88555a0957f6293d28b3a1e0ab9f9cea43bc36537908454"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:f2ae8850c9a249185765d152e3bde093462d29120edd0fbe8ab0c276885d1928"
        digest: "sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
        revision: 7
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
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/cleanup"
                - "packages/agentplane/src/commands/hosted"
                - "packages/agentplane/src/commands/integration"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
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
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/commands/acr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
            expected_outputs:
              - "canonical-coordinator-qualified"
            id: "canonical-coordinator-qualification"
            optional: false
            required_inputs:
              - "canonical-provider-effects-implemented"
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:8496863db891fbb5d5c2282efb3548279b2a2c16c2e5b4b41c628d88b4c17357"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:92ac9e687ffbe5af310075e55ae22eb609ddd05eed1eb92d04ba612fe610b13d"
          environment_digest: "sha256:5fbf0bdf6c6d90a652cd9f4291d2de9921dc6d4cf86f696308bb1de7dee5c3c0"
          implementation_identity: "sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace"
          toolchain_digest: "sha256:f0e6da53954af1f7c1314a72e108d91198d73513fbb084fc08d1572cfe522b0a"
        observed_at: "2026-09-18T23:34:30.758Z"
        status: "PASSED"
      id: "202609172016-5A9KVM"
      intent_digest: "sha256:b8755d81f5313d5334252d26bde9dbfda6662d790d6a525e1c577a4f0d4ee56d"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9:
          after_revision: 100
          aggregate_digest: "sha256:f26f5cc7917073c92b9fcb229feafd640db99bdf24706afa99121a0e091ae768"
          before_revision: 99
          command_digest: "sha256:1509a818bfd2042e7dedfc954b2d95f6b0f5db4e2dd10191c597081ed0ca0fc2"
          effect_ids: []
          event_digests:
            - "sha256:9b797e679dbaa262e8315bff36c48c6b5f0c676b5b91c4c185b2b81008bf8b2a"
          mutation_id: "amend:sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9"
        amend:sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a:
          after_revision: 118
          aggregate_digest: "sha256:f58f2f36b5e70c7aaf6889287d740b6c2c9448c0152840305f2873fd42187f05"
          before_revision: 117
          command_digest: "sha256:482bab18edee7c64524bf8758487ff3970c49fb33dedd6706b38f2e3ab5fcc37"
          effect_ids: []
          event_digests:
            - "sha256:3ba54e41f2377a4059b47f52abc84622319715f4dbf199a8488658f9854d7fda"
          mutation_id: "amend:sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a"
        amend:sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b:
          after_revision: 38
          aggregate_digest: "sha256:3697e275c1fd044f400f4b6edb7363d9a79bbfdf5a64c20bda26711c9380c05c"
          before_revision: 37
          command_digest: "sha256:0af72fd709da54a34031cf69f508e394236a0fa610a14fb93259aeeab3494c57"
          effect_ids: []
          event_digests:
            - "sha256:a2880a4b3d5c7e82d90cecd21753b9cc4c58b534a6752dd153b8ce3c6cde129a"
          mutation_id: "amend:sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
        amend:sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29:
          after_revision: 112
          aggregate_digest: "sha256:efdedece9b2247d7517e4afb6abf1d9869d338f7e1c041c41055061162647f15"
          before_revision: 111
          command_digest: "sha256:2c926836042f9d4acaf7d92a99af3ce0192c24c7cad53631b24a718228640f45"
          effect_ids: []
          event_digests:
            - "sha256:1fe3deeabb10cd980a311ed779fdd31759e1f71b248108ac2bad858477abebb4"
          mutation_id: "amend:sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29"
        amend:sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e:
          after_revision: 124
          aggregate_digest: "sha256:f03d987de7f2fa93c26f43ab228c2f20c5e38a668ea98c72941e9b0894086dca"
          before_revision: 123
          command_digest: "sha256:9d4306f3fd2b5b8e3273c69aae2444e70cfcfbcf31f1589449f56074a0ca61e7"
          effect_ids: []
          event_digests:
            - "sha256:f63dfd7ccf6acc9499cd68f614d48b1b7f4b24d53699e2a09aa0197ee67e81d7"
          mutation_id: "amend:sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
        amend:sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa:
          after_revision: 35
          aggregate_digest: "sha256:97811a5faad09c1392834c65ae7ba98542390747914ef5bddc3d2eef4af4ca71"
          before_revision: 34
          command_digest: "sha256:13a096bded6ca19c376c817b5728944191434dfb1216a3bcd9438ece622e68d2"
          effect_ids: []
          event_digests:
            - "sha256:0536a3472d0225c7dded815498928da09b4e38058bdbb9ca87eb283e8bbb3611"
          mutation_id: "amend:sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa"
        capture:202609172016-5A9KVM:
          after_revision: 1
          aggregate_digest: "sha256:56811827712abf0031833377311283fcd7c9ddc9b15dd160ab38615f93924228"
          before_revision: 0
          command_digest: "sha256:b30e5d883a84c835fb5b876206440c144e26589e15c4155d6b5979018e547f0d"
          effect_ids: []
          event_digests:
            - "sha256:78228afaa68f083f400d23bd6652f3d871edff4f5f0f8cb65ba4ef6f0f129904"
          mutation_id: "capture:202609172016-5A9KVM"
        final-validation:sha256:8496863db891fbb5d5c2282efb3548279b2a2c16c2e5b4b41c628d88b4c17357:141:
          after_revision: 142
          aggregate_digest: "sha256:77660e63c57bd648f0705bf13594a05447054b6b70ee1827a12fea00cfab7302"
          before_revision: 141
          command_digest: "sha256:5f6647b720d8c73a4073136412988be43a17f90bb26092e7702979f4576f2df7"
          effect_ids: []
          event_digests:
            - "sha256:636733bf44cc733e1cb9818565c410719e01d372fbb5dc91138cdea808213443"
          mutation_id: "final-validation:sha256:8496863db891fbb5d5c2282efb3548279b2a2c16c2e5b4b41c628d88b4c17357:141"
        final-validation:sha256:c22b17ce0b814daaf764a98d3c1bdcae6cd1fc0b8cba07ea261f01e49bb35f24:139:
          after_revision: 140
          aggregate_digest: "sha256:97fea78377df37a030f4938a2c192ac356a4f2a85c06b3b7b17c2fa488d171d7"
          before_revision: 139
          command_digest: "sha256:ce35f4b7121940ca8ee1dc4a3de7c1b520999817d4171055dfb00b0f1a83abcd"
          effect_ids: []
          event_digests:
            - "sha256:19b034f70c5cc49baf14c76d04d7f003b087b88a7ea91d389061af7fe207280c"
          mutation_id: "final-validation:sha256:c22b17ce0b814daaf764a98d3c1bdcae6cd1fc0b8cba07ea261f01e49bb35f24:139"
        final-validation:sha256:ec311fac943cdaa6493cc5b381e01606dfd6bd09fd5d562529f03efc71cb6dfe:140:
          after_revision: 141
          aggregate_digest: "sha256:5f1b9672a6648ec8e948ad15435d9e8aec500b16ceab4f8fa7be37e3884f8564"
          before_revision: 140
          command_digest: "sha256:f901feb1e00dfacb63885e1a8a9005ebd33edc17a595678d4806ed2daa342568"
          effect_ids: []
          event_digests:
            - "sha256:1a0ed7025402f38529f048de4ecc1e92d3007be20369c470bad4d6a6eb25ad68"
          mutation_id: "final-validation:sha256:ec311fac943cdaa6493cc5b381e01606dfd6bd09fd5d562529f03efc71cb6dfe:140"
        kernel_work_item_claim_required:sha256:0bd4c5bd67cf720ffe286b41730383705f70241d69060346697eee26caec2933:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:
          after_revision: 114
          aggregate_digest: "sha256:a154310d1ac6c8512861227d4e2049ed665f5caab568bbca3a4f4f09de4c8857"
          before_revision: 113
          command_digest: "sha256:3248c583c036cc23b655a0fb72a5eb897ab20372fef1116a2cf2876922a7c5d9"
          effect_ids: []
          event_digests:
            - "sha256:4defe954843068af0158fef9083c84a686f38eeca30a68815b318aae7f327de8"
          mutation_id: "kernel_work_item_claim_required:sha256:0bd4c5bd67cf720ffe286b41730383705f70241d69060346697eee26caec2933:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        kernel_work_item_claim_required:sha256:239f5a31865cb9fd37ab6ae01c4749c23d16cff7274d8420988a5e2ec6c95a1e:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521:
          after_revision: 48
          aggregate_digest: "sha256:a99e33a56ab8c6b2fa7f563de8662f8f5ddf2e87d6157dc694b6d8abc1a42f69"
          before_revision: 47
          command_digest: "sha256:b480b84360a3f169d9af1361128e70e13ce82e7273afec4cd639f23c96784fd6"
          effect_ids: []
          event_digests:
            - "sha256:773f23ebe12bf0a19127cdb8a33a0001e19e085601de35a866a2dd7f120af345"
          mutation_id: "kernel_work_item_claim_required:sha256:239f5a31865cb9fd37ab6ae01c4749c23d16cff7274d8420988a5e2ec6c95a1e:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
        kernel_work_item_claim_required:sha256:3e793b0150c50a454a5cb2b568fb0b6948bf6e0510bd4f89a0919c9a60291bb8:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:
          after_revision: 41
          aggregate_digest: "sha256:0b46da94d28d4efc4484f1ecfb53d08ea753f5a43139cbb627847013d6eff40e"
          before_revision: 40
          command_digest: "sha256:7cd9a7d462b7a4f0d015626b6d5be22a8d04809d1c34a8fe48c5179f85f26308"
          effect_ids: []
          event_digests:
            - "sha256:9b83014d8a0ed4dfdf681ba6a65bcfc8cf039a9b45a7bac6a5d706ef66452e00"
          mutation_id: "kernel_work_item_claim_required:sha256:3e793b0150c50a454a5cb2b568fb0b6948bf6e0510bd4f89a0919c9a60291bb8:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        kernel_work_item_claim_required:sha256:42a5bb9e9e4b8239ab1f13b454cea3efa080985b1cf80e43ad5f1ee3822adabb:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275:
          after_revision: 126
          aggregate_digest: "sha256:45b96906a9d88978c6ce217d7668b0328ab682dfb26cdf0b24d6a4d00512f366"
          before_revision: 125
          command_digest: "sha256:5237cdc0fb1c63ab9da0b10119fcf405467f7a6082fba5585364de41ca95de49"
          effect_ids: []
          event_digests:
            - "sha256:ae8cf1b698320e74f330bad4ed53cccf2c4a4d1a2d2c6f3e33a951a18ce53b3a"
          mutation_id: "kernel_work_item_claim_required:sha256:42a5bb9e9e4b8239ab1f13b454cea3efa080985b1cf80e43ad5f1ee3822adabb:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
        kernel_work_item_claim_required:sha256:5026d1d6490ff9b585451ce1ca5b231a8a8f8026230d4c8434a676c036b75c4c:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6:
          after_revision: 120
          aggregate_digest: "sha256:9618b92f17b42d0c7b9b6e33b776a3ba10567a88d2e824548b266a1940185247"
          before_revision: 119
          command_digest: "sha256:f1c71426cb26c9a33d76b17ef2df3082c2b6dbb8d739c4970b548c87f42ed3e5"
          effect_ids: []
          event_digests:
            - "sha256:edcf108a1bb465af3861cc0b44086a6436cd7c7f58e0779af4e25dc55e956087"
          mutation_id: "kernel_work_item_claim_required:sha256:5026d1d6490ff9b585451ce1ca5b231a8a8f8026230d4c8434a676c036b75c4c:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
        kernel_work_item_claim_required:sha256:a84496ff597885ddfd08b48336b8561b190ddda9264d6693b2cccf84daef320d:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:
          after_revision: 28
          aggregate_digest: "sha256:83e0aefc8e5c7e435f38c02b246def5d349672a2b6ad119e75af186fc798b540"
          before_revision: 27
          command_digest: "sha256:2910ab26a3c5c9cdd7496660fc8484def3561f9e204af185bb112b18ba6ce701"
          effect_ids: []
          event_digests:
            - "sha256:b9208bf7dfdef0806c3f0ff423d0f1239e466aaffdc0bb15f1c24cef62f6aac4"
          mutation_id: "kernel_work_item_claim_required:sha256:a84496ff597885ddfd08b48336b8561b190ddda9264d6693b2cccf84daef320d:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
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
        kernel_work_item_claim_required:sha256:e6fb110f8fa92cf7379467cbdb586b76552b0629003926b589cfcdd8c8ee7ed4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:
          after_revision: 102
          aggregate_digest: "sha256:e185c3e3bf8580f7fa4b02d8f8606528910a291eb14b628ea40313a05fa41940"
          before_revision: 101
          command_digest: "sha256:f9b71b9e0aa57fb23603af83899022f0d203a95dcb2ac70029dcf45e47a737db"
          effect_ids: []
          event_digests:
            - "sha256:1482d52674c0ebfedbc6d092cc2d99ca3e8cec5d117afc60fcc87ccf3b84463f"
          mutation_id: "kernel_work_item_claim_required:sha256:e6fb110f8fa92cf7379467cbdb586b76552b0629003926b589cfcdd8c8ee7ed4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        kernel_work_item_execution_required:sha256:0aa084c251ccab38678027dd3e94a6d3f76908166937da09e297afa60b39f151:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521:
          after_revision: 49
          aggregate_digest: "sha256:b7569653608d3ed7b71f31811d97d695549dbb65b5a266a4b74023f34f0e2f01"
          before_revision: 48
          command_digest: "sha256:fbfd335ab8f004e1e07b9792cba04061c06ab35a642173025da3a5b9204dfa99"
          effect_ids: []
          event_digests:
            - "sha256:2394927372c8329f5653140d2574e85b2c28559dccbfec4a9ff70dbf56d2fbc8"
          mutation_id: "kernel_work_item_execution_required:sha256:0aa084c251ccab38678027dd3e94a6d3f76908166937da09e297afa60b39f151:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
        kernel_work_item_execution_required:sha256:226913b917c956b4e7aa3cc81b93cc32f069395f2d918a94ee0aaea1f5f85a8a:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b:
          after_revision: 134
          aggregate_digest: "sha256:cfb1f45c456780d1d8103280c7dd25ae0b69be1ae49a798683f71e61d3da545f"
          before_revision: 133
          command_digest: "sha256:5c8aa71cd96e226e90ce4be144dd4e7664cf0dddbba8e5a8b66c302acd2eb093"
          effect_ids: []
          event_digests:
            - "sha256:b5d669fa3efd001ee796408697b22eb7dc29bdbb4bd0ceedbdd9a5e61ed48dff"
          mutation_id: "kernel_work_item_execution_required:sha256:226913b917c956b4e7aa3cc81b93cc32f069395f2d918a94ee0aaea1f5f85a8a:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
        kernel_work_item_execution_required:sha256:2ebc49764c085c2df6e38c216218b2201948afdb8301f363c9010915e64d5055:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c:
          after_revision: 56
          aggregate_digest: "sha256:742a1408ce568f455a5cc7b8f75a7f18955c4ad51216bf2970dc6ba28e725811"
          before_revision: 55
          command_digest: "sha256:0002bfc6984f9b3605ec2eca22b6fc387a7c596ba20f77af139fa0e1edfac8dc"
          effect_ids: []
          event_digests:
            - "sha256:dabec03c615eeb41f6f5b196b602b08a3917a8dcbb48092beb3486528dcd6093"
          mutation_id: "kernel_work_item_execution_required:sha256:2ebc49764c085c2df6e38c216218b2201948afdb8301f363c9010915e64d5055:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
        kernel_work_item_execution_required:sha256:30df8f413d51b9f4c01e249b8a22f36e3a378a531d87bf0e446bc37185bdfa46:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:
          after_revision: 29
          aggregate_digest: "sha256:94f42884ce594c3f2f91d490ef238f7213d5b09bf39d57fee8933871b91bb1d4"
          before_revision: 28
          command_digest: "sha256:4594cd043df31e944e6c5c5c4723047e97a77b3882b478357570edea6c9c91d4"
          effect_ids: []
          event_digests:
            - "sha256:85173f2306d9f07a21a2ad9c9283e91398b1366757aeacb2a6266908449f62a3"
          mutation_id: "kernel_work_item_execution_required:sha256:30df8f413d51b9f4c01e249b8a22f36e3a378a531d87bf0e446bc37185bdfa46:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        kernel_work_item_execution_required:sha256:4122a838eff8edd1e1bf0825cee2e638ee94a174aeb77952089c670fee67c8b4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:
          after_revision: 98
          aggregate_digest: "sha256:c97c254ab1c0ad02dde42b209a0dcec560cc9a6b8c79fa30345c46332fd16e50"
          before_revision: 97
          command_digest: "sha256:a402cbd93878c60d9f3eb33c23650827d6045fdc099b345801b3b96dd3de1eaf"
          effect_ids: []
          event_digests:
            - "sha256:90a618f6ce3b73f39eb9b081959c31341065db62f6dd3cadde67c0daf62ae97a"
          mutation_id: "kernel_work_item_execution_required:sha256:4122a838eff8edd1e1bf0825cee2e638ee94a174aeb77952089c670fee67c8b4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        kernel_work_item_execution_required:sha256:419d70b464cdcf5e45fb6f9b7c22e40a7d4d5f9eca5180e3aa1437517c7b7acd:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275:
          after_revision: 127
          aggregate_digest: "sha256:4918975e8472f7b2084dc832f739d21d1d8f9ca733a56eadff4786167cd18319"
          before_revision: 126
          command_digest: "sha256:50806a95f74f1bc307b8d73b968312224b45096406e4ba701307b08ae2052a1b"
          effect_ids: []
          event_digests:
            - "sha256:6d6b5cd5988735b6e33f0f3c2657466bf557d80036b5820e6f1ca380a5dac0ed"
          mutation_id: "kernel_work_item_execution_required:sha256:419d70b464cdcf5e45fb6f9b7c22e40a7d4d5f9eca5180e3aa1437517c7b7acd:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
        kernel_work_item_execution_required:sha256:4571afebe6411bb08c930605aee50cfad13c323246974ede29b29a202cccf0be:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:
          after_revision: 42
          aggregate_digest: "sha256:39a90d2052244c3e0ec9d0b1584667e5befa706b24943d69c14537d0120050f8"
          before_revision: 41
          command_digest: "sha256:1e8ad5d2668e36a57f9cea9949c2cda091c732c77a5cba057d1dbc52abcc3041"
          effect_ids: []
          event_digests:
            - "sha256:c23e64f5ff64de5568c214b723eaae738ba8befbf0e60cdd9b0fd1c85d2dc4ba"
          mutation_id: "kernel_work_item_execution_required:sha256:4571afebe6411bb08c930605aee50cfad13c323246974ede29b29a202cccf0be:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        kernel_work_item_execution_required:sha256:69e96264359149328c1e43284ff24ce25dd0a90848c04e10dac3a16cfbe574c0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:
          after_revision: 6
          aggregate_digest: "sha256:221932b283d03cfa1c903d0c9eb6e158d720315cc02271ad6b1ac3c97e20b212"
          before_revision: 5
          command_digest: "sha256:03180e954dddfad63c7b59dae30b24425b2150055b516d6b80bd3b73cbd8a2c8"
          effect_ids: []
          event_digests:
            - "sha256:e8065bca73e46feed0cf22181d6fba68e762728eae308706eadd2d5b10705100"
          mutation_id: "kernel_work_item_execution_required:sha256:69e96264359149328c1e43284ff24ce25dd0a90848c04e10dac3a16cfbe574c0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        kernel_work_item_execution_required:sha256:7e46fa43038a52031ce2201926d72e89f4d262c5b671fead001bb045a8d6bbb4:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c:
          after_revision: 91
          aggregate_digest: "sha256:92c774f36debb19e8e290ec627f8c8be38c1bf855ad4d3ebe1a21539bed631d2"
          before_revision: 90
          command_digest: "sha256:b2b0f7d81965d4eb0da231d6a13b49178ee6ea41bd17c8dedb55644a2d651966"
          effect_ids: []
          event_digests:
            - "sha256:c351a78226a0ecdcf6f6cb047e6068823a21290ab68a6161b1f4ddba97930db3"
          mutation_id: "kernel_work_item_execution_required:sha256:7e46fa43038a52031ce2201926d72e89f4d262c5b671fead001bb045a8d6bbb4:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
        kernel_work_item_execution_required:sha256:92200c63d5a0aa61876f83737c8f03954114d1f71a127487b36ba565b290f9dc:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e:
          after_revision: 70
          aggregate_digest: "sha256:a3c3cd233e9e3916246c39ea2bdae4b0c92990ace1ffb2bb8d3c9a888e4e5204"
          before_revision: 69
          command_digest: "sha256:6c36fedd5136bec612ecf0ed53673e986f2695139892391db8a118644d0a3bfb"
          effect_ids: []
          event_digests:
            - "sha256:bd88eef12536b5a8196aae75cfc5ad5377fe184fd5b5d55340c0c46824370cd0"
          mutation_id: "kernel_work_item_execution_required:sha256:92200c63d5a0aa61876f83737c8f03954114d1f71a127487b36ba565b290f9dc:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
        kernel_work_item_execution_required:sha256:9f5270ca81efb77c5964e278e2c26443754ef5426787f73dc3a95afb2e1c8921:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:
          after_revision: 20
          aggregate_digest: "sha256:fbf939103ba692e59b4ffbb68bbf31af2dd448dc2c3f59612de9f985e96ada17"
          before_revision: 19
          command_digest: "sha256:d5adc18e3566ef4ded46c6a9112908b0dcfa38cce9e5cec93b57dbba58e63bac"
          effect_ids: []
          event_digests:
            - "sha256:897ffc4520159a9a3d8bbc549c487b230f0c214d435d412db323aed9f6bcf89e"
          mutation_id: "kernel_work_item_execution_required:sha256:9f5270ca81efb77c5964e278e2c26443754ef5426787f73dc3a95afb2e1c8921:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        kernel_work_item_execution_required:sha256:b14262a31b316db9fa235a7ae987a9cb1c091e55fe35ae52cee10ba7746950fb:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:
          after_revision: 110
          aggregate_digest: "sha256:7eb716906aab7ad516c5e1317224cd18d1ddb9e8211a2c2d24b064da5323b9ca"
          before_revision: 109
          command_digest: "sha256:1f5e0982e6671152b78b5db5e35ca91c3d1045044a58d0a494687fcce2d197b1"
          effect_ids: []
          event_digests:
            - "sha256:049e2374c7b645ccd94cbef29c6dce72afaa2bed2a40b444812874ff3f08e378"
          mutation_id: "kernel_work_item_execution_required:sha256:b14262a31b316db9fa235a7ae987a9cb1c091e55fe35ae52cee10ba7746950fb:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        kernel_work_item_execution_required:sha256:b6c4710398a7b61a2fa9056534092a16b92a4a5ab780690e64232c6011b6d847:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:
          after_revision: 115
          aggregate_digest: "sha256:2f345785b795549d1596e8f7ecef5fdbb166020b4db4e68dd67aeca7ffbad0ee"
          before_revision: 114
          command_digest: "sha256:c1e18e32c11214f30e3b63406ed2bd6e52b77c97f0d98e8f06b4dc91c2ad0511"
          effect_ids: []
          event_digests:
            - "sha256:1df3e763255f884eeb699997923109183ce5d4c821e9fd38ce49acd7132f0636"
          mutation_id: "kernel_work_item_execution_required:sha256:b6c4710398a7b61a2fa9056534092a16b92a4a5ab780690e64232c6011b6d847:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        kernel_work_item_execution_required:sha256:bd99912e2cc34a164d157b1f01272a67b3c99fd51d26a8287bfd722354e0ff9f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510:
          after_revision: 63
          aggregate_digest: "sha256:7469d60eb01c03ee1853c935072b912e81da8890531643100568af224586b472"
          before_revision: 62
          command_digest: "sha256:379414f6e883fd8408a02dd8bb8bee7b36fb02d51c2d55dd7e5b77b2712a1176"
          effect_ids: []
          event_digests:
            - "sha256:4d3503b626a8411397dd4a3a82f5f87bcfe3e56fdfe68b428a8a2dcb41c62648"
          mutation_id: "kernel_work_item_execution_required:sha256:bd99912e2cc34a164d157b1f01272a67b3c99fd51d26a8287bfd722354e0ff9f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
        kernel_work_item_execution_required:sha256:bee02616e17dada657accf0e7792202d5600b55d8330c4bcfa6824e16dad8d28:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:
          after_revision: 13
          aggregate_digest: "sha256:19b8b29074ee63acaef932a00fbf35fc0d33177cf4726a43ea5aef4e8d08bcdd"
          before_revision: 12
          command_digest: "sha256:7df7a15a476681f14898374696e9dc1018537886650b2a41bff8995f727da6b0"
          effect_ids: []
          event_digests:
            - "sha256:cd482c8fb8fb2ab933c555a01200a8e159ff989ea0d16131b586ebd43bea1b7d"
          mutation_id: "kernel_work_item_execution_required:sha256:bee02616e17dada657accf0e7792202d5600b55d8330c4bcfa6824e16dad8d28:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        kernel_work_item_execution_required:sha256:cb0c1adc4224833f9060020685291e6e99c5efebc41c5d97bc31dcdce2a6b70e:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:
          after_revision: 103
          aggregate_digest: "sha256:847e16a681a37da24ac3fe64d08213666b1133c8d5b8fe6cf2557cf998378b9c"
          before_revision: 102
          command_digest: "sha256:ab23ae8b48bf1b7f6f12add5e7e7abba2f400bea2953d17f672226b4015e9072"
          effect_ids: []
          event_digests:
            - "sha256:45166561cf8b686efc5ed1be82bf710fd2187eb382aeb51281cccd5ae7081e20"
          mutation_id: "kernel_work_item_execution_required:sha256:cb0c1adc4224833f9060020685291e6e99c5efebc41c5d97bc31dcdce2a6b70e:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        kernel_work_item_execution_required:sha256:d2c57626953c45a6c065e1bac06240c6b07ae90f8f5359e0003c73121ff243fb:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200:
          after_revision: 77
          aggregate_digest: "sha256:704c135321b06e54c96ded314facadbf32bf2c16a5caf10ea21337a2adada8c6"
          before_revision: 76
          command_digest: "sha256:f1822eae47cf99151efca16172db89fb249b795027caf2c072d641c4d8bcef58"
          effect_ids: []
          event_digests:
            - "sha256:36106c200401ebbfea457b844e525f5c51aeefe22b1e7c389058c9405bbc5e86"
          mutation_id: "kernel_work_item_execution_required:sha256:d2c57626953c45a6c065e1bac06240c6b07ae90f8f5359e0003c73121ff243fb:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
        kernel_work_item_execution_required:sha256:f08d6699284bd752951323357e33ef45f821596fa8172876203a1f6010022e42:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42:
          after_revision: 84
          aggregate_digest: "sha256:42e7cd98205ae9bb1f0757cd42a8f1e6e200cb86ac007a7fb5907cb668244bd6"
          before_revision: 83
          command_digest: "sha256:c30b640ba48d47df9c3038cc8e5aa73f6eb49d4635d2a1c9b9e15aef8a5e6c75"
          effect_ids: []
          event_digests:
            - "sha256:12c6f528d4c9a910ef61fb6f65336e6a909b13d4f5ed9f5a56e7940ef686b6bb"
          mutation_id: "kernel_work_item_execution_required:sha256:f08d6699284bd752951323357e33ef45f821596fa8172876203a1f6010022e42:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
        kernel_work_item_execution_required:sha256:f7571f43914c500c983d84ea6d3aa3c079f25e7d519212bbf781a2aae6267462:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6:
          after_revision: 121
          aggregate_digest: "sha256:5f29b4a70132766f831adac67cae2f0e51786e29162ae90e97ebe8bb79c4f0d3"
          before_revision: 120
          command_digest: "sha256:16bf0356ac5f2a32d6cd84e0a00da4b6fb5c72da6487aabd8ef67345f9d286b7"
          effect_ids: []
          event_digests:
            - "sha256:17a1677f4ef06fdf3b3cec63fb4b9525db1b98b0448e6cf2d59022974f44bead"
          mutation_id: "kernel_work_item_execution_required:sha256:f7571f43914c500c983d84ea6d3aa3c079f25e7d519212bbf781a2aae6267462:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
        kernel_work_item_inspection_required:sha256:085a580ca7a9f0b6ecb00bf9430c6e8207ef0e0aa9305b62c83e20d8a552e120:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200:
          after_revision: 73
          aggregate_digest: "sha256:24fbb462f21840cb9f9872e78b28660d6d5d909518393bb4c4d02d6cfa444cab"
          before_revision: 72
          command_digest: "sha256:141e4f7a7c86f69a9ebd4e74bc225778335109a57b095cd2e58c42727a4c48ee"
          effect_ids: []
          event_digests:
            - "sha256:fb28c589e7881d802c1fc2b20c4baefcfa81822e1eb9d1ac28b0a3c90b63ce09"
          mutation_id: "kernel_work_item_inspection_required:sha256:085a580ca7a9f0b6ecb00bf9430c6e8207ef0e0aa9305b62c83e20d8a552e120:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
        kernel_work_item_inspection_required:sha256:0b2d5bcab0615e9b6a98db8f022e207e6036d53a349a56f3e2cb8ccc02995551:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521:
          after_revision: 45
          aggregate_digest: "sha256:4cfaadeab581243ea786f5b204e9d293a4a7d03a9e1f124d1306564e0a9d6a7e"
          before_revision: 44
          command_digest: "sha256:ec0e3a8c4aec5a22c37eda2f186da80afb8ab6341812b64566279579afaddf83"
          effect_ids: []
          event_digests:
            - "sha256:9a77b2f220c910af6bb7708df938eba5d48377d970ba54fc89ea064dc2d81d66"
          mutation_id: "kernel_work_item_inspection_required:sha256:0b2d5bcab0615e9b6a98db8f022e207e6036d53a349a56f3e2cb8ccc02995551:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
        kernel_work_item_inspection_required:sha256:16a8367a7ad93bc1b9d73c8206fc2a50ea9d62819b586e9795c7d5749eca0892:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c:
          after_revision: 87
          aggregate_digest: "sha256:cc1c9c9125189d5eed0404435747b7098bdca32808cf13376e6c333487a6aedb"
          before_revision: 86
          command_digest: "sha256:b0e1d7f4c540b4722a4f11378ea565c67ae5be52ec4abbf9b4eba7e17ce3d6ce"
          effect_ids: []
          event_digests:
            - "sha256:924559a6dce890d76ece868b00aea4b803650e703487c676ae735f26900c2ed3"
          mutation_id: "kernel_work_item_inspection_required:sha256:16a8367a7ad93bc1b9d73c8206fc2a50ea9d62819b586e9795c7d5749eca0892:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
        kernel_work_item_inspection_required:sha256:289b835dd75ff6ac807218a692ca2e63cb400138204e7ea754ef4c904869bf27:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42:
          after_revision: 80
          aggregate_digest: "sha256:0fae9f7ebcc7d5cd8b3ba03206d9c01acc8eddf51686a97758cbbdf70e7c61c3"
          before_revision: 79
          command_digest: "sha256:c1d098dc5d83d92854278f187da94c65dc78c99f2eb6dd0a06679440a00e8703"
          effect_ids: []
          event_digests:
            - "sha256:79b98589750b4fc7a99ee8ab6e24b54f81cd41122bdd10b27d6c9517f2c3dd23"
          mutation_id: "kernel_work_item_inspection_required:sha256:289b835dd75ff6ac807218a692ca2e63cb400138204e7ea754ef4c904869bf27:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
        kernel_work_item_inspection_required:sha256:29508c044107edbe19eba339c7e170aa931a7f0c6c0c1a235b6fb47a38ca60f6:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990:
          after_revision: 16
          aggregate_digest: "sha256:7e2539a5a6e98f38522c0450b0ca4e78dd5669bcbc48cc2a8167a093825d756d"
          before_revision: 15
          command_digest: "sha256:042066d96f51dd0f6b2dffefa629189e62b9f188b728c53e2f2683d8036a8734"
          effect_ids: []
          event_digests:
            - "sha256:a70c7cd9b9395844679201a69d1d594d59e76d2a3cd94e75439b8f65a10fcac8"
          mutation_id: "kernel_work_item_inspection_required:sha256:29508c044107edbe19eba339c7e170aa931a7f0c6c0c1a235b6fb47a38ca60f6:sha256:9aa46af80a58784e89fa7fd183fe5044fd59d118d97aff368a56ed49ec357990"
        kernel_work_item_inspection_required:sha256:50a44a5bf366e563be95afbd65ca4e4c7ff56ac43b8743ded964a34408c151d2:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:
          after_revision: 94
          aggregate_digest: "sha256:80994ee15baa94357fde160b38d556f252b6a1b2b96918f45ed545fb2f794b62"
          before_revision: 93
          command_digest: "sha256:391825ea5a6b9aef23dd5924900de5714eb091590b5158da266b9c70d76bca73"
          effect_ids: []
          event_digests:
            - "sha256:6a7a51474a2d9610042e45a597046193213bf5af3fc353e3f147644f0d32d511"
          mutation_id: "kernel_work_item_inspection_required:sha256:50a44a5bf366e563be95afbd65ca4e4c7ff56ac43b8743ded964a34408c151d2:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        kernel_work_item_inspection_required:sha256:70b2a0ed43e795773bea31a84a47d3aa4eb76374b11721e14eb0f8eb20a65d2d:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c:
          after_revision: 52
          aggregate_digest: "sha256:07e13d146594133bef0385e6eb47219669be00c7057c207da10d7540cc79f77f"
          before_revision: 51
          command_digest: "sha256:a9edfb596897b3d9d2a0292ea1cfc528018d2d0abe8cdd470d70ad24ef3a7b23"
          effect_ids: []
          event_digests:
            - "sha256:caaaa4e716958aaa1905eef105a32fa1bc44433b0a9161db0b4dd946a669ed87"
          mutation_id: "kernel_work_item_inspection_required:sha256:70b2a0ed43e795773bea31a84a47d3aa4eb76374b11721e14eb0f8eb20a65d2d:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
        kernel_work_item_inspection_required:sha256:9236854fc56ba52936778cd0cb16a4fbe7e10521a40e1d3d49cef2894c45f2b3:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:
          after_revision: 9
          aggregate_digest: "sha256:21bd4d05d5eb00edba43cfc5d6ee7abc1cb2039f5270c30eaf27f318f829bcb7"
          before_revision: 8
          command_digest: "sha256:547cef8e5129cb8fcdfc0e74946d82b9f755fc551466179ff06b4e1f8e79e503"
          effect_ids: []
          event_digests:
            - "sha256:13853f67d50b473e97c6d745021862a5ff3fb7f245ba9c5a20aa7271cc54fbd7"
          mutation_id: "kernel_work_item_inspection_required:sha256:9236854fc56ba52936778cd0cb16a4fbe7e10521a40e1d3d49cef2894c45f2b3:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        kernel_work_item_inspection_required:sha256:a25b2822e9b13f70dd0486e0c0550c735c3791ef9966020a1bbc9f90946c565d:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:
          after_revision: 106
          aggregate_digest: "sha256:fa194c097089fb9d3712dc54e306042d03c32a5441031b4afe826c34bd7c19c9"
          before_revision: 105
          command_digest: "sha256:0f0c08ce141015cfc0cc78c01826344cad39f10caf9426372e9a2d4c4f47c87a"
          effect_ids: []
          event_digests:
            - "sha256:feae163012cf7f39daa55a2a320d86bf35d19afd9b1a2907ee57b3745773a450"
          mutation_id: "kernel_work_item_inspection_required:sha256:a25b2822e9b13f70dd0486e0c0550c735c3791ef9966020a1bbc9f90946c565d:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        kernel_work_item_inspection_required:sha256:ae325a7abd53701fb686233f8cb6bc5a14b6d35a71da53c70b150a6ec7cccbcd:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e:
          after_revision: 66
          aggregate_digest: "sha256:9b5102540a9a7b6eb399e23f332b620439c8c116a868f840b69a070d1d086d73"
          before_revision: 65
          command_digest: "sha256:afd7443910c717587a1ffaf1eba621b023ccb0f405c001ae2fd260bcb9d89ede"
          effect_ids: []
          event_digests:
            - "sha256:226758f9f72258bbbe16074535cd5fc6c419b44f8ced61155749a8d351ca8e36"
          mutation_id: "kernel_work_item_inspection_required:sha256:ae325a7abd53701fb686233f8cb6bc5a14b6d35a71da53c70b150a6ec7cccbcd:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
        kernel_work_item_inspection_required:sha256:c22656102728f8e917944c8324b5b90c266258d554e4633c6f285d6d91651d6f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510:
          after_revision: 59
          aggregate_digest: "sha256:76084ec44c901eb768bd86a58d61798872a5aed7d0011ff15d8d3c646ecbf682"
          before_revision: 58
          command_digest: "sha256:02158d40ad4b52caecee6875473b58b79c447325f52da8a97a78a1cef440f402"
          effect_ids: []
          event_digests:
            - "sha256:fdacfa6739fd790f19dd95e3385f2cba77f06339f111cc360dd0a350d37e8b0e"
          mutation_id: "kernel_work_item_inspection_required:sha256:c22656102728f8e917944c8324b5b90c266258d554e4633c6f285d6d91651d6f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
        kernel_work_item_inspection_required:sha256:ce40528590fdaaf4475c5c8abb954e910cc27c779a988652c5415fa3bb921874:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:
          after_revision: 25
          aggregate_digest: "sha256:0d76ce69c5055cd7d3600d13ed71141381d82cef920da7df17b98a5b46e22c18"
          before_revision: 24
          command_digest: "sha256:18c5ee27930da35856106d5a286b13d874ea55d7f65df4148c59e0028ae144a3"
          effect_ids: []
          event_digests:
            - "sha256:3addfcc6d0e6cfb1bebfdf27fd8762c8794e510ae4a30c3948052e68474e7116"
          mutation_id: "kernel_work_item_inspection_required:sha256:ce40528590fdaaf4475c5c8abb954e910cc27c779a988652c5415fa3bb921874:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        kernel_work_item_inspection_required:sha256:fc38fdbe13a7ad19fea9cd92626e93744a2220724a0302cb637dceacc9843815:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b:
          after_revision: 130
          aggregate_digest: "sha256:602c11a6fb516f7bc1db6835f572fd33d5fe31a4946e7b832e5f757dcbbce491"
          before_revision: 129
          command_digest: "sha256:9d512e5ab93dc1a4d41645e848c4e8a8aea5ac964bc776bd430f5daf2bdac8dd"
          effect_ids: []
          event_digests:
            - "sha256:612ce55e0488fdbc6032df0b4fd2f6efaeed41ac082ca7dec87b2c7165dc4d8d"
          mutation_id: "kernel_work_item_inspection_required:sha256:fc38fdbe13a7ad19fea9cd92626e93744a2220724a0302cb637dceacc9843815:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
        kernel_work_item_inspection_required:sha256:fecbed2db23a522dda79480cc337afce49c33f43954e1b2fcac6090c9679a512:sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace:
          after_revision: 137
          aggregate_digest: "sha256:cd0963678775eb62d0fe2ceb5f423f6c13dc692a316be179a151970c249b150b"
          before_revision: 136
          command_digest: "sha256:b7c977a9633199907dcec807e1846cf8727361481366e90955d35528f0983565"
          effect_ids: []
          event_digests:
            - "sha256:6a32da9508745605926146699c198ebf97f06dae70b1cf28ca5ff0b67aafb46c"
          mutation_id: "kernel_work_item_inspection_required:sha256:fecbed2db23a522dda79480cc337afce49c33f43954e1b2fcac6090c9679a512:sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace"
        kernel_work_item_materialization_required:sha256:0fa173070cf6f74de85e8d495c3e33470a8249a6d9506d368fb9bff4a003beb0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8:
          after_revision: 4
          aggregate_digest: "sha256:1945c1adce0a1e2bb957953666a29a3349a948dc9bf621c3556483b5cc9ee725"
          before_revision: 3
          command_digest: "sha256:ceed4b275110597fd9fad9baf5891b530c65e85df8d573cc252bb7d86a4ffa80"
          effect_ids: []
          event_digests:
            - "sha256:bab40bdb14ce4bb9f7b037de4d1c1f554c659b69377f595b8f7a2bbe47034295"
          mutation_id: "kernel_work_item_materialization_required:sha256:0fa173070cf6f74de85e8d495c3e33470a8249a6d9506d368fb9bff4a003beb0:sha256:792ab7e3133792031ca6b06a13a41ffaa9e6291651706d834f36b921dae322e8"
        kernel_work_item_rework_claim_required:sha256:36f88a93610a03590ca45eb29db1590e42e668e4d86bfcbf7cf2aa173f61d437:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b:
          after_revision: 133
          aggregate_digest: "sha256:7864eefc7d333fead91514b2714236572ac6563bed065c94672bacba3fd42b61"
          before_revision: 132
          command_digest: "sha256:a1265db760500ee7c5f4a6907cd64535060a1e110476b7259f0125459bcb0a05"
          effect_ids: []
          event_digests:
            - "sha256:a889073e91574be27c0bfe3c56a36c08496b50ac84574dc24542c6ebcd40a7b9"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:36f88a93610a03590ca45eb29db1590e42e668e4d86bfcbf7cf2aa173f61d437:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
        kernel_work_item_rework_claim_required:sha256:4428e2e093c2acf4893a8a5b062b14ea7c63bb02166fc1102125c716d2b33825:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200:
          after_revision: 76
          aggregate_digest: "sha256:432a1ef318428d7c78dffa2788cf8b68d452744715fc4343cfe0dcdb51618cdc"
          before_revision: 75
          command_digest: "sha256:fbf128111603239087d34de2f27a2cb537e3df76b55796f28c108e364561f6dc"
          effect_ids: []
          event_digests:
            - "sha256:8d4284e257e18a1f5f9f5cd06ec6c5a4bb948f8ee8ed2e3e0528fd8d52cc13e1"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:4428e2e093c2acf4893a8a5b062b14ea7c63bb02166fc1102125c716d2b33825:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
        kernel_work_item_rework_claim_required:sha256:4f296ca99b564277dac072ecd8d3eddddc688bbd7acd074997d481fa57221785:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:
          after_revision: 109
          aggregate_digest: "sha256:43d2dad59d03484c396229ed0219e2f3965c4b8e3a3bc2dbce600b7d104526f3"
          before_revision: 108
          command_digest: "sha256:7211d854ed8a8bc83b1720daa72d060bedc3dca5a4329724f3c4d7c269151d58"
          effect_ids: []
          event_digests:
            - "sha256:dd2f6f33667a0ed932d30dc6e2eed76cf51d19234c87e76770f5225f0a696c20"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:4f296ca99b564277dac072ecd8d3eddddc688bbd7acd074997d481fa57221785:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        kernel_work_item_rework_claim_required:sha256:717f1d32e722c9007aaf06b265dc235b64b7d5b0d02b43609fae4c4a5f21046d:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:
          after_revision: 97
          aggregate_digest: "sha256:80923f9ea2f617a635f13073affc888e5fe71865e3cc26703082e8e0bd024d14"
          before_revision: 96
          command_digest: "sha256:99de49abc7379e0d3d54cfe5df802689a84bc06a758847a73a4f58648ba9a137"
          effect_ids: []
          event_digests:
            - "sha256:49d6b2a15410033ee54a777362e15d57fcde49c12f2a234d4782b88bcde8a8c1"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:717f1d32e722c9007aaf06b265dc235b64b7d5b0d02b43609fae4c4a5f21046d:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        kernel_work_item_rework_claim_required:sha256:d075ee676a6e99d6f93bca5c1b7f73a242bc6247e024ada672d1c3005176a324:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c:
          after_revision: 90
          aggregate_digest: "sha256:7f6ebb460644dcb8f63cc22a805b6bfb4a8822cdbd0dffad492b13f6f6ee68c7"
          before_revision: 89
          command_digest: "sha256:7c1f90292707813ffb7091efcfb7f3533dc2aad54dc15986266475a362133123"
          effect_ids: []
          event_digests:
            - "sha256:b09af95f98789d154626d43d031f768a4e57182517dead1359574f4ec25e5661"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:d075ee676a6e99d6f93bca5c1b7f73a242bc6247e024ada672d1c3005176a324:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
        kernel_work_item_rework_claim_required:sha256:d48578eeebe74a2cfba1415665e210b06f27bd0b804ec4d65a5058f4b6e73233:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e:
          after_revision: 69
          aggregate_digest: "sha256:d3a616d2fa2399bc7d89df9568ca103220ef0115a4e5c963eda2fd99cda7e48e"
          before_revision: 68
          command_digest: "sha256:6953e82b8148401a52e6ec69dcbff6e28de3a9777d7e996542dcfa1e7103b619"
          effect_ids: []
          event_digests:
            - "sha256:ffe3bc1a1b5a04b51e88d4f90045a8b5d6b840f59ef46c32cad1a975c2cc230e"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:d48578eeebe74a2cfba1415665e210b06f27bd0b804ec4d65a5058f4b6e73233:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
        kernel_work_item_rework_claim_required:sha256:e5f08f85fdbbbb2e151ecf6ccd585726ec133ea1f7b7fe68034931bd45bb6aae:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510:
          after_revision: 62
          aggregate_digest: "sha256:33c5235b4ea3925f6233cd80f688d7a61621ea1916513078a8a0bbdc4da93a2c"
          before_revision: 61
          command_digest: "sha256:14ab94d0036103e78ca95dbf387bee2414115b6473231e7480ada7cdfc3b8aaa"
          effect_ids: []
          event_digests:
            - "sha256:f76221dd4c7a231e423b3fb755385beb69c137c11c33c0efbec252a77bc7c069"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:e5f08f85fdbbbb2e151ecf6ccd585726ec133ea1f7b7fe68034931bd45bb6aae:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
        kernel_work_item_rework_claim_required:sha256:eca98de3d100fa1cd90a046c88d93340104520bcabee00b98cb1dfa64e77d9b9:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3:
          after_revision: 12
          aggregate_digest: "sha256:331db53d59dc939470391d61883fd5154d8f292a1b4380e66d42925c8887864f"
          before_revision: 11
          command_digest: "sha256:665a454873f8cd87a837ab979fb7d6fe8c26c2c85c2872b8f5fbb9904a912faf"
          effect_ids: []
          event_digests:
            - "sha256:72f425028f1125af0a2990bd280b8dc72a77f45ab9dadbacf0dd8686520d3b9f"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:eca98de3d100fa1cd90a046c88d93340104520bcabee00b98cb1dfa64e77d9b9:sha256:ef656dc637791ea5631bb90b7d37fa9bbcc5ddaf48f4e4ba68656a1709c80ae3"
        kernel_work_item_rework_claim_required:sha256:f9b156b7b607db365d994ccecc6ed9cc081c5a81fbd7fa79c0c62407b2ada73b:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c:
          after_revision: 55
          aggregate_digest: "sha256:502115dd88f1266bb95f2a8a9aae325104bb3df0e459ddd628aa95ec8ce20ec3"
          before_revision: 54
          command_digest: "sha256:57df2811d36ea9799f89051f54359bba458dc0737a5bd7307933a90bc27fff96"
          effect_ids: []
          event_digests:
            - "sha256:4dd9b5dfa36300507990d46b62431fe6849522ceb43edf5644feb98e5a136656"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:f9b156b7b607db365d994ccecc6ed9cc081c5a81fbd7fa79c0c62407b2ada73b:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
        kernel_work_item_rework_claim_required:sha256:f9e0c7234c4ee5b697c8678ae42c42e77748e7ec35b5db2b2cebf56d7d0b1fe8:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42:
          after_revision: 83
          aggregate_digest: "sha256:b0e48e3b59ace9a149e9bbdb3dd90b523af8552c921118017af7189d2ab6b291"
          before_revision: 82
          command_digest: "sha256:afae1c47a4ed6a155d79c93327c7fe82b0f2bc56eef8cfdb4f9cfcf6f4bd818c"
          effect_ids: []
          event_digests:
            - "sha256:36f3bf31913189fc250b458121e91fac405d06bc3904dad0e332588cd8c89389"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:f9e0c7234c4ee5b697c8678ae42c42e77748e7ec35b5db2b2cebf56d7d0b1fe8:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
        result:sha256:06fe8db5f0d9463873a82828ebf958927025adb8df76dd896245566937e432c4:
          after_revision: 72
          aggregate_digest: "sha256:93f250f772441610e4c695710c888c46b20c3e8e253b6d491d01bb0538635af5"
          before_revision: 71
          command_digest: "sha256:1df18d3ae1f9e176478c763b73fac5a1fafcd8a8278ecb323d858b04f09ba98f"
          effect_ids: []
          event_digests:
            - "sha256:49b5130750fcc2be8aecec86d92b94381dc0e41b059b90d9c816d1b97b7f4c7c"
          mutation_id: "result:sha256:06fe8db5f0d9463873a82828ebf958927025adb8df76dd896245566937e432c4"
        result:sha256:3668cd9c41cbca40edc5d72e26bc4189ba255547ff7c0f5e2735ef428f54f953:
          after_revision: 79
          aggregate_digest: "sha256:4022d05aefd0695784e6ebedc8ab56b4d00922b7395d398bfdb2c77a1e47ce52"
          before_revision: 78
          command_digest: "sha256:13018808894b52796f2e71897981993334f0fc7bb41e980d036c3a7aec75350a"
          effect_ids: []
          event_digests:
            - "sha256:1f71242676c089a6bafb022abf4a24251aefd297493357419009af575c689e88"
          mutation_id: "result:sha256:3668cd9c41cbca40edc5d72e26bc4189ba255547ff7c0f5e2735ef428f54f953"
        result:sha256:43a1813bf773236fe9597fc04e8897d22815525413d8f6a8e0972d9c51e8a385:
          after_revision: 51
          aggregate_digest: "sha256:6406ee3eb8b4c3311c62bcd618cb77a18d55156493f550f9d86e118ef5f5e70b"
          before_revision: 50
          command_digest: "sha256:7e4f2208b905a8ac232174dc44c2e146d7bf8be8b7159b5e1082a9a131c62786"
          effect_ids: []
          event_digests:
            - "sha256:1f1ead4ed39182c9226a97e3168d2d45b2120c6c09fa8bbbb3db772490a59085"
          mutation_id: "result:sha256:43a1813bf773236fe9597fc04e8897d22815525413d8f6a8e0972d9c51e8a385"
        result:sha256:4e5b283096d6c931491dcfd4697c7793360abf2182c033a04ff56015977ff26e:
          after_revision: 129
          aggregate_digest: "sha256:7993b0005465a2cb539237b9ae90da26b4f57728f5048cbf2ee75496265ae7e7"
          before_revision: 128
          command_digest: "sha256:a734e98e15e18c79aa93d5f0d3b2c15f9f3c13a9279721b63830067ba148b337"
          effect_ids: []
          event_digests:
            - "sha256:44fbd24f3a84e63ca212770b06964f07c3abb74152368999152e8abc9441c051"
          mutation_id: "result:sha256:4e5b283096d6c931491dcfd4697c7793360abf2182c033a04ff56015977ff26e"
        result:sha256:5fa028f43e25ac2aa3880f68467ae8d5865072552be5e7cde125373a7cdff87b:
          after_revision: 44
          aggregate_digest: "sha256:0710f879e828dfaaff2ecbfe97d8f1b202392bc050bb368734aa200f4a6d05f6"
          before_revision: 43
          command_digest: "sha256:bbc2db842fb8b4bafe57900a0e5d531a30274f59a4fcc780149abcff48c33e5e"
          effect_ids: []
          event_digests:
            - "sha256:9a839dd3752e573957d4afcf4c4925c5343ee39d08dc3e2a63726a8fa2307e43"
          mutation_id: "result:sha256:5fa028f43e25ac2aa3880f68467ae8d5865072552be5e7cde125373a7cdff87b"
        result:sha256:79a9818aed1cc38e5c587886ecf81864d54da4da3de218b68519230ad7455100:
          after_revision: 105
          aggregate_digest: "sha256:4700d85601170ecb23b951ab3822ece8dfec3dbae64b982c2590fee4a4a8a971"
          before_revision: 104
          command_digest: "sha256:9cfcbb884d1db3b5a56e0d8595ad4c280c3df9c6719a8be726868d1b2ed57b91"
          effect_ids: []
          event_digests:
            - "sha256:eb1d9e66b32ac88f139d78a291f11f743df0ded1596849387133834ad29c2b7b"
          mutation_id: "result:sha256:79a9818aed1cc38e5c587886ecf81864d54da4da3de218b68519230ad7455100"
        result:sha256:84f70b748e44fd405c03b6ecf205829e05bf9f8c8fb164aba51c21c662fd3da2:
          after_revision: 2
          aggregate_digest: "sha256:e398bd8affbf42ee05a6fcd25642faaa69a1df3ce3ac9ae973006277e4515915"
          before_revision: 1
          command_digest: "sha256:6a0f56347949a0a35c6439fde8a4338bab4322ac8de44c82700e7b30b7aabb04"
          effect_ids: []
          event_digests:
            - "sha256:fafaf78071e3bb57e38a52d3722349b14bc60ae30b5b802557e8d5f634abea2e"
          mutation_id: "result:sha256:84f70b748e44fd405c03b6ecf205829e05bf9f8c8fb164aba51c21c662fd3da2"
        result:sha256:9082cd1dbab340b05708cd9281919287cff9b8d284a71e3f19c6f7478fd021ea:
          after_revision: 93
          aggregate_digest: "sha256:d1fa0fdbc2976dfc50f0547f1cd334c55ed366509c0c671a443cd6745b807fb3"
          before_revision: 92
          command_digest: "sha256:71cb9863ea1db8bbd39378e1e867296c62c60a145a4a5c55411d677de71a2c20"
          effect_ids: []
          event_digests:
            - "sha256:0cb69531da1ce52dafc63aa15db46f6994e1b8035fb2e1806e9829b99d924061"
          mutation_id: "result:sha256:9082cd1dbab340b05708cd9281919287cff9b8d284a71e3f19c6f7478fd021ea"
        result:sha256:93d08a8aaee7eef0c483ff01e9356c02bbdf91b432254109c1bbaf703904ca2b:
          after_revision: 15
          aggregate_digest: "sha256:ef72ab7fb09651a9e6999a55471c8e6fe76acc2bb5e613813a9a5965320d305f"
          before_revision: 14
          command_digest: "sha256:6dece20f0169cab4517f9eb30938aa902efbb0b03070e927e12092d57d876895"
          effect_ids: []
          event_digests:
            - "sha256:e2fa9430fe7a5d122af8f57a71c034590ba9b3a9c91300a852615214abe9ddf6"
          mutation_id: "result:sha256:93d08a8aaee7eef0c483ff01e9356c02bbdf91b432254109c1bbaf703904ca2b"
        result:sha256:98600244cc2e9564afd0eb563ea68d9eead2c50a5dc364d20078fc6dce39a579:
          after_revision: 136
          aggregate_digest: "sha256:07210176bf37264ee42290004d96c78e4ac5e9142f61363713e8278c7f853ff8"
          before_revision: 135
          command_digest: "sha256:33890513367c2577739e0fce9be4bdb0b24f3ce3798ad478845e2fb530b59aff"
          effect_ids: []
          event_digests:
            - "sha256:0ab86d5ad3711cbb10a7f191c798095efeb75b9123e5b7a87a14f15369a0b183"
          mutation_id: "result:sha256:98600244cc2e9564afd0eb563ea68d9eead2c50a5dc364d20078fc6dce39a579"
        result:sha256:a1185fe7a37b2eac9c3e0c8643a68cc54a9b44b32226924497f8b0de8f469b00:
          after_revision: 24
          aggregate_digest: "sha256:6712fb93201a4c2efb540a67fec6dc0e0db93d03ae739fe2ef81e3ab2f52a8fd"
          before_revision: 23
          command_digest: "sha256:ccef6dc1cb2604281ddfb2b162b40dade4397d9481a9b398b3ec7348efe60c8d"
          effect_ids: []
          event_digests:
            - "sha256:3efdb1e7784ded30648c5aa3885772ba07ceb5d368e8ab87ad10c1ba993ac1f3"
          mutation_id: "result:sha256:a1185fe7a37b2eac9c3e0c8643a68cc54a9b44b32226924497f8b0de8f469b00"
        result:sha256:a2a68a79cc44e9478a4cb83a1e335731b4d9333301018a260a0d33339cbddf3e:
          after_revision: 86
          aggregate_digest: "sha256:7e84c90a6eed2ab0b06545ca76b1520e7c93ecb0d5e23d0feea12ebe9aaaf50d"
          before_revision: 85
          command_digest: "sha256:4aa0a899879f571c4fda69a1bfeb8546c8a22ed85719251dae03b2f24d954c9a"
          effect_ids: []
          event_digests:
            - "sha256:53e1a07c7adda0e81c878d49d491a3e536ac1eb7edc647d34e48ae0cfa914791"
          mutation_id: "result:sha256:a2a68a79cc44e9478a4cb83a1e335731b4d9333301018a260a0d33339cbddf3e"
        result:sha256:bedc2cd5fc3e1626db99bd92006011feb6368d68da8a667922b729b94b0c93e3:
          after_revision: 8
          aggregate_digest: "sha256:1930686fe70011d01f328baff3250a60fcbfd8e346c2dd6fad94cd6e2d3af61e"
          before_revision: 7
          command_digest: "sha256:4fd1f9d35b1cd7c5a30ad5ec793d825cb5c4369b8c4f933ef51a8e2eb66a90bb"
          effect_ids: []
          event_digests:
            - "sha256:1bb3a18cb4037afec8c5fc6858f7d000e2150104840fa14366ccef926b3f3742"
          mutation_id: "result:sha256:bedc2cd5fc3e1626db99bd92006011feb6368d68da8a667922b729b94b0c93e3"
        result:sha256:cb19ed970719ff1b3e1edfec6d736cb31f18a3cc17a7e5ac27ca1ccd8309e9f8:
          after_revision: 58
          aggregate_digest: "sha256:52bc9a07d9dfe4b363791f8b2f78a90462b11e87ef39514bf3d148211647efbc"
          before_revision: 57
          command_digest: "sha256:e7df57c62b29c230180886a64c06f2f822ca401b674a13a49bb934008d0f00c9"
          effect_ids: []
          event_digests:
            - "sha256:c03d6d761302c42a420687c9724ab851aeec1f5df87d491b151260274db1f7a0"
          mutation_id: "result:sha256:cb19ed970719ff1b3e1edfec6d736cb31f18a3cc17a7e5ac27ca1ccd8309e9f8"
        result:sha256:cf2a82cb9be8fe27119404c84c74a346c44807bc717d3a539e07d6e0444210de:
          after_revision: 65
          aggregate_digest: "sha256:e6d640f9cbb9234a392e079a99638c92e643ce9de88a2c717c8bea4b62185114"
          before_revision: 64
          command_digest: "sha256:f6f9dd9448498dcb600fa138d745642d4b3ae56f90b866054b0aea2c5888695b"
          effect_ids: []
          event_digests:
            - "sha256:fbaf765ec0caa5e9c46c8d152549157956b2d2232c338f291061efed0dde91e0"
          mutation_id: "result:sha256:cf2a82cb9be8fe27119404c84c74a346c44807bc717d3a539e07d6e0444210de"
        semantic-stop:sha256:1d76bdf2e94c7c5d04d1dd51cf2c4e76bc73ab317f8e63854f57a57989029440:
          after_revision: 117
          aggregate_digest: "sha256:72d3b4fc50eb0ce3fe5a14d26c52620bc2f7db706017b7c83f957e1a974ee142"
          before_revision: 116
          command_digest: "sha256:0130ca1e9ead3d87b93609a9f6f2b09baea293c66c0e360c081d201e743d29ed"
          effect_ids: []
          event_digests:
            - "sha256:0bfdfd02fb6227112f6a13d8789006bd8d0d1acdf3d014c42ddc4d91974b7653"
          mutation_id: "semantic-stop:sha256:1d76bdf2e94c7c5d04d1dd51cf2c4e76bc73ab317f8e63854f57a57989029440"
        semantic-stop:sha256:2ae9ea965457c041b05032754acec7165aaafd8ab7084227d39f84b4abc5d0b6:
          after_revision: 111
          aggregate_digest: "sha256:621ebdf52895bfa20bad2fec7fa2e9f13fa8bf563e89c8ea403b166c06a43c46"
          before_revision: 110
          command_digest: "sha256:95c23f67110456f8198d6edd8dc98f45f942ec2e1b2250a216f2ed0f09b7f4fa"
          effect_ids: []
          event_digests:
            - "sha256:c97edec8e56769c1ea0b174f65011d949c6dcb8443493f668b8a67050d482e48"
          mutation_id: "semantic-stop:sha256:2ae9ea965457c041b05032754acec7165aaafd8ab7084227d39f84b4abc5d0b6"
        semantic-stop:sha256:72d3a0cbfb2415a0d8e3fdf94c0fc5a4fee2a9985abbf95a6c562887ccf54853:
          after_revision: 99
          aggregate_digest: "sha256:acef8b8115e4b98674d5cb7fb937f24ca14661697e8731bbe3e25bc170f9f35e"
          before_revision: 98
          command_digest: "sha256:0377bf62d6cbcf2b3b73e7d4e72c73c510fd00f2545d0c49340cb2f8395bb018"
          effect_ids: []
          event_digests:
            - "sha256:14e502a9f590ce457d2c44f26d767899d6ca6e3d604b3484955d35e8152c71e5"
          mutation_id: "semantic-stop:sha256:72d3a0cbfb2415a0d8e3fdf94c0fc5a4fee2a9985abbf95a6c562887ccf54853"
        semantic-stop:sha256:833138fc6ad49c7b36a5477067365e1aa845234909e277235a9e039fb76e43d3:
          after_revision: 123
          aggregate_digest: "sha256:b544bd3a534647ead34abde53bd1c35c1b3e0a3ff008a4bc0f350817819eb7ce"
          before_revision: 122
          command_digest: "sha256:c19fcd5849d93d15743f078c489d142d0b7ca48292927d7cf02e85595001f07b"
          effect_ids: []
          event_digests:
            - "sha256:188e5dfc5e5cefde4852698748d1de9334ed33c758552c07994a5252a46bd8aa"
          mutation_id: "semantic-stop:sha256:833138fc6ad49c7b36a5477067365e1aa845234909e277235a9e039fb76e43d3"
        semantic-stop:sha256:bf2f48e34c48d7650858f327601263971efde98102631d55e6e12f9239f5e2eb:
          after_revision: 32
          aggregate_digest: "sha256:377270e17110114d493393215e636102bb2b6afb3dafd61e28ef92409c3e8a43"
          before_revision: 31
          command_digest: "sha256:29111a2fe56dea1fdff8d7a5b847d4852b2141ef57709066716e915162e89529"
          effect_ids: []
          event_digests:
            - "sha256:330d28cfcd0c09030bd165edfa54c4b05d08e31b9b85de3156dd2fd9bc991118"
          mutation_id: "semantic-stop:sha256:bf2f48e34c48d7650858f327601263971efde98102631d55e6e12f9239f5e2eb"
        sha256:13346b93bfd52fc430579e7e4410efc48bbca1847b32daeddc0d362c246e55c3:
          after_revision: 30
          aggregate_digest: "sha256:e2039ef5fd4297d869977706df1e2919609f04ad26eec0ae6c89919c96348c41"
          before_revision: 29
          command_digest: "sha256:15fb4976c778ddab29dc4777ab674d7006475dc6a201ab15f0a2f2ad8ff7d62e"
          effect_ids: []
          event_digests:
            - "sha256:37aaba5e3cd42b0b1d40b59fdcd14707525f4cbdf78f1750cfdbea2a0f5cb6f2"
          mutation_id: "sha256:13346b93bfd52fc430579e7e4410efc48bbca1847b32daeddc0d362c246e55c3"
        sha256:14859607887c65ecc30ba99cd59c64218d977cfec20eacfb8c6e1b8a097ffdd0:
          after_revision: 71
          aggregate_digest: "sha256:8246dad2d3474a1b4df62dd1b40de39a03c21ea59cd5c508c07ff40bd7a08efa"
          before_revision: 70
          command_digest: "sha256:1e70e9fcab27bd602f63e906f7ce3b74712c27898421803a531fbf7b68f64b44"
          effect_ids: []
          event_digests:
            - "sha256:e6a2f604917b55eb3b561c235d44741bbc8c16d774248ec3ac0b9bb14287751f"
          mutation_id: "sha256:14859607887c65ecc30ba99cd59c64218d977cfec20eacfb8c6e1b8a097ffdd0"
        sha256:15b34778f564154a939e23650ce138727de4363f2ee35894ec607f7cae128e99:
          after_revision: 3
          aggregate_digest: "sha256:d91d6dd6e7619fce47299c479792b171ac40a191c2ff5d0176a7ac64c204bad4"
          before_revision: 2
          command_digest: "sha256:96976245793e38d7911951913e0c2664cdb1f8ab462930fddf1f6a750606bd52"
          effect_ids: []
          event_digests:
            - "sha256:c8f12263c2d40358dc61742e79de5a496389ad8e31b8f197700a483206c39af7"
          mutation_id: "sha256:15b34778f564154a939e23650ce138727de4363f2ee35894ec607f7cae128e99"
        sha256:16846f2f78e98ced9c385bfd2007e53c07cbca47844f31293fcce7d1515eafaa:
          after_revision: 116
          aggregate_digest: "sha256:d328f2101f97d05a6a05afcf8089678321c7e30f08417a9ceb888c71341cff4a"
          before_revision: 115
          command_digest: "sha256:6505afd56b63cfcbb06132a65188730da0ca425a2478760a9ef83b1a22c6bf43"
          effect_ids: []
          event_digests:
            - "sha256:058bb3895f58a3d04ebd43b1a750fdfdfb5961f3b32fc9cbe18c443645382d77"
          mutation_id: "sha256:16846f2f78e98ced9c385bfd2007e53c07cbca47844f31293fcce7d1515eafaa"
        sha256:1c3187aac6653bd51eabc8aaebcecf5c1beea7c49945e05860988ae90ab07ccd:
          after_revision: 113
          aggregate_digest: "sha256:3bf98bc4d781d8ebe674ac6356d4f48526b29ad436e4ef7aacc542c191dc98c5"
          before_revision: 112
          command_digest: "sha256:95ac0bc5fdbd852d6f836c0a3fdfff9170ddd0c645d0a059faba2cbb3030c69f"
          effect_ids: []
          event_digests:
            - "sha256:9ed03729f825c0cb1eaf0a0dc96f7f9ef9129cc9aa172fe40eefebf22d86af7f"
          mutation_id: "sha256:1c3187aac6653bd51eabc8aaebcecf5c1beea7c49945e05860988ae90ab07ccd"
        sha256:24501c9f32844885dc04ce7c12916dc3c09ffdacd85c7718243c228c8c9f8087:
          after_revision: 101
          aggregate_digest: "sha256:f106f98cbd0968bfd472203b91e5f9e529261a79c2e15c4cb54d575f5ac7fb22"
          before_revision: 100
          command_digest: "sha256:196cd730e1ade8b6e8a49e43cb49f141873f973e5e68b9e893e7e62826448d51"
          effect_ids: []
          event_digests:
            - "sha256:715416345211318b41a068aa2a7c4e821407c279c6f06f1627279346808397a9"
          mutation_id: "sha256:24501c9f32844885dc04ce7c12916dc3c09ffdacd85c7718243c228c8c9f8087"
        sha256:2838fb3fad9be77009bea28b7df81d3f7bc2b4807c452cf4a73a68da2b66bc3f:
          after_revision: 78
          aggregate_digest: "sha256:ac9c3b13d2074e7f6d07c4fa2b2bded000be3fc383bb9436730e1c126227579e"
          before_revision: 77
          command_digest: "sha256:e073e012d0d766a11b9d9462cae8d76e90a1fe92f43c9646b4668cc699aa07d1"
          effect_ids: []
          event_digests:
            - "sha256:a32e43b0435330b5c6ccd3c99d58e900a876292aa1777f84525f2c80d7b6a39d"
          mutation_id: "sha256:2838fb3fad9be77009bea28b7df81d3f7bc2b4807c452cf4a73a68da2b66bc3f"
        sha256:29082ac8925e24fe7654c3762a8924abdf23bb8c5d5c03d26e4acd05ce88117a:
          after_revision: 39
          aggregate_digest: "sha256:0b48af66f5f8d6124b8c1048fcf54bd8e9d55ca22bbaa0b2c7de71e1503d3aa0"
          before_revision: 38
          command_digest: "sha256:0c8b2c16aaab3fb9d29a0deb9676603836dbbd21d2f695def90d14202fd2c3e7"
          effect_ids: []
          event_digests:
            - "sha256:a483937eb60f6deb2151468adfd59f5794ff69596532ce2d1dbfab0ec7210c56"
          mutation_id: "sha256:29082ac8925e24fe7654c3762a8924abdf23bb8c5d5c03d26e4acd05ce88117a"
        sha256:316af14cc874e458562f59e958d75d52e9b2588c3462cc33b273cd37ddaa8bab:
          after_revision: 33
          aggregate_digest: "sha256:a7a38eff7ac996cc313ad9cf6f0c4a2cc8f920fb627846f729734fee7151d6dd"
          before_revision: 32
          command_digest: "sha256:2af578237b2558b101488d756b481b3a548edccf9a18e611304435db88177ddc"
          effect_ids: []
          event_digests:
            - "sha256:943f9cbc1835a0fcc480a7e3eb05c9a38bcbdce6e5cae141f83091b018507899"
          mutation_id: "sha256:316af14cc874e458562f59e958d75d52e9b2588c3462cc33b273cd37ddaa8bab"
        sha256:39320ebc38aa6a37d90403b3e8776b61690210451fa3a71c33155f925b701571:
          after_revision: 37
          aggregate_digest: "sha256:2610b535a17218f206136e7259f2d6c1e498c4b1c6e452e2446844b9a3039ba3"
          before_revision: 36
          command_digest: "sha256:b7332c7c5d010afe9228b09029aa92bec46e2c666c26634e86fbd2fc2c930964"
          effect_ids: []
          event_digests:
            - "sha256:f17fc327227b9b7c492eecb8c3a93a30f7b8f84787bd62637a07f67bc3c4c863"
          mutation_id: "sha256:39320ebc38aa6a37d90403b3e8776b61690210451fa3a71c33155f925b701571"
        sha256:43bc27b7ce673e14b10f31f9456a87da0b6586a9da8f1a1415a6ef2336232e13:
          after_revision: 122
          aggregate_digest: "sha256:e41c85e5115e46f37b5982f864fc16f98ee748c92b64bb7d453fc16d81131540"
          before_revision: 121
          command_digest: "sha256:04ce4b90ae8c7b2d4ac594414867df7fda4efba9df006cf9decdc565da7ddd77"
          effect_ids: []
          event_digests:
            - "sha256:d9e641e759785268c2743e0b6917b3c092850be74f0ab3cccbc5c1a4c7a70c13"
          mutation_id: "sha256:43bc27b7ce673e14b10f31f9456a87da0b6586a9da8f1a1415a6ef2336232e13"
        sha256:47b25713aebf05a99d5b77d9025890dec593c853396ccf4eda385aceeebc1146:
          after_revision: 21
          aggregate_digest: "sha256:5e0046987505e96a56917dddb07f583666dd12371911b7604741331e87f2fa90"
          before_revision: 20
          command_digest: "sha256:9f7236a0c7a2dd66e6351bf30e5f026325b462b98d6935cfdf3e0fe1540e719f"
          effect_ids: []
          event_digests:
            - "sha256:0acd9f57df80654e178f7e6ce1ea50b68b8df6a6f2c1b54d530216203323575a"
          mutation_id: "sha256:47b25713aebf05a99d5b77d9025890dec593c853396ccf4eda385aceeebc1146"
        sha256:59efa6cce3c750592d95ab9b111071f2e3255b9438a45fdc21900bd3bb955c01:
          after_revision: 144
          aggregate_digest: "sha256:946d8b419a2dabf3be716a281af36876a472d26fc0425a9f26c59d1903c4fe31"
          before_revision: 143
          command_digest: "sha256:601d736fb7957dace717d20872d7a047e579c6f00b4afa09a28733c0b9995d3e"
          effect_ids: []
          event_digests:
            - "sha256:c819ecb5039ace3aecaeb7550dafc4fa9bf7eb1a3f097267b0a1cff278f1f204"
          mutation_id: "sha256:59efa6cce3c750592d95ab9b111071f2e3255b9438a45fdc21900bd3bb955c01"
        sha256:5a23428013fd9cdd3129682e5fa4f8d037ccaa0d0927d1c4baaa9b514851653e:
          after_revision: 50
          aggregate_digest: "sha256:c7cd8b580e97943b12471ea5cde23a66d002700932a08a1b663cf73c2604ac1f"
          before_revision: 49
          command_digest: "sha256:bec3a2ca131cb41bf8ac24d2faf7bd07babb6019d858e87566a6492c46848d4c"
          effect_ids: []
          event_digests:
            - "sha256:98cd69c816797fbaeebebf92ec46b89e23f507dfd250b80618e4c6c83f2239d7"
          mutation_id: "sha256:5a23428013fd9cdd3129682e5fa4f8d037ccaa0d0927d1c4baaa9b514851653e"
        sha256:67f7861098ed206915ef678c2ec1ce8828fc2d9076662b459414192cfc77fd33:
          after_revision: 43
          aggregate_digest: "sha256:94eef04d3e57bb7272b816c4ffd02cac398aa232590c120c4e12dc4c9d29c1f9"
          before_revision: 42
          command_digest: "sha256:50ee57e3b7ca35869f77aa9273d4fe0c0ab1eb0cc3f2ab1422ca927f17f30ea9"
          effect_ids: []
          event_digests:
            - "sha256:55dfafbbca8047a01ba056bf34b0a62c0b0352a1f2ce16243a244e1073cfac8e"
          mutation_id: "sha256:67f7861098ed206915ef678c2ec1ce8828fc2d9076662b459414192cfc77fd33"
        sha256:7abe82731217316d54601bdbe1104c700f3ac6cd71931e62ed179985e7913910:
          after_revision: 92
          aggregate_digest: "sha256:f76c99fc1ce00a14c1d82e10b24f14cabbf62f28d383eaddbbd85c0324b23662"
          before_revision: 91
          command_digest: "sha256:5e17524118ac140c56966b7f625ffafc64cb14bc7343ba35e27d212982fb6669"
          effect_ids: []
          event_digests:
            - "sha256:8500d9fe0189e31fbd2e480bf3b365bbc464a85739f2b6b3926d7c29267db3c2"
          mutation_id: "sha256:7abe82731217316d54601bdbe1104c700f3ac6cd71931e62ed179985e7913910"
        sha256:81fac69f20f42249963429e0ed7d7883600d371f9946a7fb32a4ea25ca2b92c1:
          after_revision: 23
          aggregate_digest: "sha256:891f7cb26faa9fbfa29b69a630d7f73d8a44d25863f98c8db198eb789750ed42"
          before_revision: 22
          command_digest: "sha256:c4d6c894c7f4d1e0fd78fdb1086f01d76fc113c9918ee57d07de924f4b30f0dc"
          effect_ids: []
          event_digests:
            - "sha256:e8ea3a8e0621372e254fe3bfd64cd5f6a290f125de23be4dfdc8b53f586a71df"
          mutation_id: "sha256:81fac69f20f42249963429e0ed7d7883600d371f9946a7fb32a4ea25ca2b92c1"
        sha256:83a2c4db0bd32b954a8d1faff9e7060fcf3f5c710e0e13f6d9bbea5bc0c0928f:
          after_revision: 119
          aggregate_digest: "sha256:669d6e90b078f1d783c45c1370f3d818a21df521100e3c70b6f37da7e24f54de"
          before_revision: 118
          command_digest: "sha256:137f9b06ad5c08f763194919af3d3f9bd937a4a744660fff9f7e4b450085b7a9"
          effect_ids: []
          event_digests:
            - "sha256:a8199b5769ef277e01aee1502c7727e6c120543ed4b9399ede5090f340534b4a"
          mutation_id: "sha256:83a2c4db0bd32b954a8d1faff9e7060fcf3f5c710e0e13f6d9bbea5bc0c0928f"
        sha256:8d4790c201331e0b473b89204c4bb6cfc08d8900dc7b57f4826e3e90325b3c13:
          after_revision: 31
          aggregate_digest: "sha256:7fb2c62edcb38a2f256c580e048d22e6c6a30f450772a28da98b8ea6171ede7f"
          before_revision: 30
          command_digest: "sha256:c56124c0f09165e96cd41b6198fbc8f87bb14d7d7498ae33dc0bdf5710dd2d76"
          effect_ids: []
          event_digests:
            - "sha256:1c1d5c4ac80e5ea41901c8a32b21d1955bce23ca75467d37bc4261b5f43bf46e"
          mutation_id: "sha256:8d4790c201331e0b473b89204c4bb6cfc08d8900dc7b57f4826e3e90325b3c13"
        sha256:95a2a02481ca6c761628c6b4edc2076ac596d2c4ad99f2651b59482286e552fd:
          after_revision: 34
          aggregate_digest: "sha256:4ffc4ca1408798f1ca2ff82d0dc76d17859eb00512b4b30b4f46d4421378dc1a"
          before_revision: 33
          command_digest: "sha256:22a27ba9cf6ce866e44bee66731a61c30a78953402752c41ed79a5b58a85a372"
          effect_ids: []
          event_digests:
            - "sha256:277607a513a38c86aedd81fc225b691f65332f69c02477b4580d42601291c975"
          mutation_id: "sha256:95a2a02481ca6c761628c6b4edc2076ac596d2c4ad99f2651b59482286e552fd"
        sha256:9f95db9ef5c96626935e11db4f8810e123a432cab1dd4a0d60d80fe6c7aa91a8:
          after_revision: 125
          aggregate_digest: "sha256:27f13aa9da90e49a9dbf9f7f70b9bec7e2b0cb403967a81122b36b47db37314a"
          before_revision: 124
          command_digest: "sha256:ed72b438898827524ca1c1f04e365f1093c7588d4a69f34af5d4b25512cabc90"
          effect_ids: []
          event_digests:
            - "sha256:3cba64f6fc809fe6df1ff8b28ea144793fea71912999c3477df4aad72675c26f"
          mutation_id: "sha256:9f95db9ef5c96626935e11db4f8810e123a432cab1dd4a0d60d80fe6c7aa91a8"
        sha256:a22ebc99f97aba4bc52fad174d427035101db5eb6aeadf3b931e0350891d3d26:
          after_revision: 104
          aggregate_digest: "sha256:677accd2ffaa366b57d5f3dde0059278b3f5b7ab4442bf6e564469b76d1d9001"
          before_revision: 103
          command_digest: "sha256:360b95cb9e2e9285b602737195921cf4fa5d709ba8cabbb3b0618f5049b35dbe"
          effect_ids: []
          event_digests:
            - "sha256:6e3ec64b5f74da7ace58c8d422cebfbd9f14ffdd18197246f5936da2b93c7f00"
          mutation_id: "sha256:a22ebc99f97aba4bc52fad174d427035101db5eb6aeadf3b931e0350891d3d26"
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
        sha256:b1c91a6044ce87af3374bd289a0539faa310c8b3f7f5fd948c558b283fafbaff:
          after_revision: 64
          aggregate_digest: "sha256:2a2ca09a38aa3e4026c2f7722d4a06b174d6dc631332d17e2a41f3f98ee877f3"
          before_revision: 63
          command_digest: "sha256:755e5452dbb0d09baa8394ffb57fc50d6d075255adf14b094513eaf241a1d780"
          effect_ids: []
          event_digests:
            - "sha256:4972511f98a2fdaa68316e157aa78ec5a5b3f78300b93dab3230f4cdd0215c13"
          mutation_id: "sha256:b1c91a6044ce87af3374bd289a0539faa310c8b3f7f5fd948c558b283fafbaff"
        sha256:bc73acf3694c1661a044847c1385a42d3acf323de9096dd14cdd9f77cac37999:
          after_revision: 57
          aggregate_digest: "sha256:c5b90fe1bd7b1546ce6d425c0cc2c5def1f6e3dadf05c325551a445c309f6fc8"
          before_revision: 56
          command_digest: "sha256:df742394d5644174b00d4e7bd223f81e0a3ebfd56bce00709b69c5ea221c49e8"
          effect_ids: []
          event_digests:
            - "sha256:31ed6b0fde23a116cba9f17e6e43808303575709bbf2405a3f766a02263ece32"
          mutation_id: "sha256:bc73acf3694c1661a044847c1385a42d3acf323de9096dd14cdd9f77cac37999"
        sha256:c0ebaa75040731e9db181dc8fa15c50f9718dc9bd5ce9a94d28b62ed61c27608:
          after_revision: 36
          aggregate_digest: "sha256:9f4cda1e9c05ffb565ebe8fa4066495237259b1131f04c106b2a422e401af8c0"
          before_revision: 35
          command_digest: "sha256:55996485a5ff189e73d87ce54aa1a1d62db647c583bcd3214bc1c5e8bc729965"
          effect_ids: []
          event_digests:
            - "sha256:dc5240747b77f0b4847e9b62b2ace67f3c22bdb8ac693a71b0bae7b55f97d5f2"
          mutation_id: "sha256:c0ebaa75040731e9db181dc8fa15c50f9718dc9bd5ce9a94d28b62ed61c27608"
        sha256:c9beb8007b800f63fe77bdc1f32aa91e2a271f483b14315468b57979718af929:
          after_revision: 40
          aggregate_digest: "sha256:da81406343cf7382239dfa9aac3949a180d96d2ee1d9d5fdc3dc5bb37b592d04"
          before_revision: 39
          command_digest: "sha256:b5d611f2b9d16103e5a2a0f73a3b89868d07833d4265cf0a5875043eb1707ba7"
          effect_ids: []
          event_digests:
            - "sha256:f0190aa7a256835462982fc8b7c3f665fcaa7503a8214d1268368ea73c90752a"
          mutation_id: "sha256:c9beb8007b800f63fe77bdc1f32aa91e2a271f483b14315468b57979718af929"
        sha256:cb5cd723248911e826b53fc753b3b90cdd1798c46dcab3865b9d9fa4499a68e7:
          after_revision: 143
          aggregate_digest: "sha256:91e902a119b6d0f09d61c74bcc52e524885a64db4c893204da4b3711136cb639"
          before_revision: 142
          command_digest: "sha256:a0a07b382bad61dfa4d0e5d79ace4bfa328caffd0c7f5c009e8432f06094fd71"
          effect_ids: []
          event_digests:
            - "sha256:1cd905206491d67eeb916a8aea573aab0ea29facc26572b64cd72d5583491464"
          mutation_id: "sha256:cb5cd723248911e826b53fc753b3b90cdd1798c46dcab3865b9d9fa4499a68e7"
        sha256:d5b7e8745e15050084d59b8e2fb5f56b3c66511780102726c3b5e2c987666d86:
          after_revision: 128
          aggregate_digest: "sha256:a72a15c866472fb69100ceffada4c4b7a1d485ffd21613d69d194da4972274f9"
          before_revision: 127
          command_digest: "sha256:c124edc4ec5b8ee8c5feb03169c52dd85004f61a81a7d397c70c980b49e47e2c"
          effect_ids: []
          event_digests:
            - "sha256:c0132f5b79fcfca85d14019517a588aecc97206bf1c0da4369d2a249a81b0d15"
          mutation_id: "sha256:d5b7e8745e15050084d59b8e2fb5f56b3c66511780102726c3b5e2c987666d86"
        sha256:e0843c9b5067d42620ddc0d8709c84e43915171945a03dab1558b2a96544c85a:
          after_revision: 22
          aggregate_digest: "sha256:44bb09024251e33842ea6d4f6a3f1b9c2bf4cc5524ac83c8400b733bf1a48655"
          before_revision: 21
          command_digest: "sha256:175603aabc6862befa2a95ce3b39c59c5cef9da00d60de234850134a08eddccb"
          effect_ids: []
          event_digests:
            - "sha256:224e8a472448b1878dc2a6db4e7c6f7517e7c694edb3fba2e5e008aa578cef73"
          mutation_id: "sha256:e0843c9b5067d42620ddc0d8709c84e43915171945a03dab1558b2a96544c85a"
        sha256:e92903fd7a29f371f651f57d9bb54653ce937b05f12b606083716124d5fb6f1c:
          after_revision: 135
          aggregate_digest: "sha256:c78ada98f1c8ceea41001ed9e5832edb2a1a692ddb51a8434debcf9d4f61654e"
          before_revision: 134
          command_digest: "sha256:307ef619360e03b2303f42b1cca5b52a39d8598b7e4574d964df1a48e91269a6"
          effect_ids: []
          event_digests:
            - "sha256:fceb965b7d0aa6b5355135b58ab0dfc27066bee6cd278b06c6c847afcbeadc2a"
          mutation_id: "sha256:e92903fd7a29f371f651f57d9bb54653ce937b05f12b606083716124d5fb6f1c"
        sha256:ef976cbcce0a480049c2ff7356dba4b41b49b17f433447a32f57139e4c86bd8e:
          after_revision: 85
          aggregate_digest: "sha256:165c9651704513352d0d2bb92ea417a65cceac24a9201431f7f593834cab847f"
          before_revision: 84
          command_digest: "sha256:5268abf02d3ea0d0235bb49365bcc4eed08ba42d8b84eeccaf44afc847a678e5"
          effect_ids: []
          event_digests:
            - "sha256:184e883dcc3740f701ddc8e765c722879bd61642d921bc475eb113d974a7eca9"
          mutation_id: "sha256:ef976cbcce0a480049c2ff7356dba4b41b49b17f433447a32f57139e4c86bd8e"
        validation-resolution:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf:
          after_revision: 27
          aggregate_digest: "sha256:69c371b683eaaaad62c76a24078275ba09fddf5bff50e18f2c2aec55538c9d2b"
          before_revision: 26
          command_digest: "sha256:ce6e1d863c5799b8387c5c5781c5ce4bc8291093784046b973d34f209545efa7"
          effect_ids: []
          event_digests:
            - "sha256:8bc6827aaf0418aa3d3c2d248a65bffed951839ff79691d893b1f945cbf92262"
          mutation_id: "validation-resolution:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf"
        validation-resolution:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e:
          after_revision: 11
          aggregate_digest: "sha256:7425c76e109cc7e5c0889441ec8d64073bc6ddde1caf68493f597f8648c9b443"
          before_revision: 10
          command_digest: "sha256:aa5849c14cd8511d3064b4c434a8ccfe58b6e918691f545c6ecdf02da0f592e2"
          effect_ids: []
          event_digests:
            - "sha256:240876eefde31ae2dffcc6a8d0b982e809722ca327d040d9f5b59de29999fa84"
          mutation_id: "validation-resolution:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e"
        validation-resolution:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f:
          after_revision: 61
          aggregate_digest: "sha256:d9d253daaf9ac63ce5dbfd32bafb42a3b9eaf88916eb888cb798c916bcc61e1d"
          before_revision: 60
          command_digest: "sha256:0bafac46d797dab98ce04ec14088032c4fbb33c32a35b88ee44beea8f6d3a0dd"
          effect_ids: []
          event_digests:
            - "sha256:d50df36508c481f494f88f26a4b48c0e4056cc225068a41cbf89e05f72c86040"
          mutation_id: "validation-resolution:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f"
        validation-resolution:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009:
          after_revision: 132
          aggregate_digest: "sha256:ca04d2f3d9544e2db46a59d853b20753f6b3b329aa5a09ba223d1147d6b302f0"
          before_revision: 131
          command_digest: "sha256:0dcec9c16c5f9c46349a331a2bd14e37a2ef5662f1b5375c5fab6a758a6daaff"
          effect_ids: []
          event_digests:
            - "sha256:34f004b7cee3709bcca747348dcf3435694179b22ab7b95130db3678ca787ee8"
          mutation_id: "validation-resolution:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009"
        validation-resolution:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd:
          after_revision: 108
          aggregate_digest: "sha256:b53a7130141ba6a628dfe0123326e609050d88d376bc117020f2717e586c1e7d"
          before_revision: 107
          command_digest: "sha256:d0e448d5ab14f554e2b4dfad019369f188014a6312da6e18abd65953198e94e5"
          effect_ids: []
          event_digests:
            - "sha256:cc5098ddc66d521d12ed27ffa615462da82c2ade7ef8c425c406c9c1c72c61e4"
          mutation_id: "validation-resolution:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd"
        validation-resolution:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4:
          after_revision: 139
          aggregate_digest: "sha256:896b462817de6decb7793c53002727739356acb01ca00da1391f01c23749f078"
          before_revision: 138
          command_digest: "sha256:c3ce3e6d9e4cb2e0d324626238f782c4a411bc1ac91fc3d0faf9bc9c2c62756c"
          effect_ids: []
          event_digests:
            - "sha256:7e427f2b033f8ea481ab1ab7298bf151dfc2f54e1ec92fde7212dafbbb190c0d"
          mutation_id: "validation-resolution:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4"
        validation-resolution:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b:
          after_revision: 82
          aggregate_digest: "sha256:e59579d6d49e4149554d86844b5b63a8b8bead856e61e55cd336833b2e47ea7a"
          before_revision: 81
          command_digest: "sha256:4ad3c0ac7a753f261912c45768b12cf4c844f46391eb064066aaa4694ae7861f"
          effect_ids: []
          event_digests:
            - "sha256:b5f0998858f659d632d1e0bf24c00af47470c3d2e07bc54c24270d11cf1a2161"
          mutation_id: "validation-resolution:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b"
        validation-resolution:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d:
          after_revision: 54
          aggregate_digest: "sha256:80ab3affdedca812aae84d871ef988b3e82b53ec2c0e6e019f493f40ba99caf9"
          before_revision: 53
          command_digest: "sha256:0dfde8049aa67abb61141f52579538ed824cff86ae4a1a2cd6a2991cd1cb894c"
          effect_ids: []
          event_digests:
            - "sha256:6f358cfeab1c16137a9c07fb092293a5e66e9a9c632d8b950eb34610d0d3ca7a"
          mutation_id: "validation-resolution:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d"
        validation-resolution:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88:
          after_revision: 96
          aggregate_digest: "sha256:911ae7d0a0359689aa5497b03e34c578e9094911e5ba50cf8610e141a2693f3c"
          before_revision: 95
          command_digest: "sha256:ae00584d9b6a01cc66c1e4e9e81f1222d299dbb83ebad546e10a9ae03563db11"
          effect_ids: []
          event_digests:
            - "sha256:330839764ecbaae495208bba9b3d9642098722bb973c7fa7f5bcef435e230d9a"
          mutation_id: "validation-resolution:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88"
        validation-resolution:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51:
          after_revision: 89
          aggregate_digest: "sha256:ba80c756cbea8b2635fe077523ea85ff3bb86eabfedd6c2d50ac1a458d6285a0"
          before_revision: 88
          command_digest: "sha256:074148d9e579d6230b865da46bf7282ce39539c1ba0abfe310081bb2e12e2207"
          effect_ids: []
          event_digests:
            - "sha256:84894aa59aa47341f41e5d7840ebfc27a675d0ed47c208a9ec93fa1e055f6633"
          mutation_id: "validation-resolution:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51"
        validation-resolution:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec:
          after_revision: 75
          aggregate_digest: "sha256:742266ae766f5a84290c59cc7c673f22ca57e54b14dfa1c85961c7f40809aca1"
          before_revision: 74
          command_digest: "sha256:36453d11f3d242cb3593332c50f060b36f19452cbc8fb090a880c88db9e6f736"
          effect_ids: []
          event_digests:
            - "sha256:7f3e83a8e6086793e26d69935b8cbdac2c3e82b91436e4268115ad94a2c251a0"
          mutation_id: "validation-resolution:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec"
        validation-resolution:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183:
          after_revision: 18
          aggregate_digest: "sha256:be111abeee763bf566f1f4359c279d06433f2d53899d1702d0a062e061581548"
          before_revision: 17
          command_digest: "sha256:b4602a3e393931976862a1b7dcf49629e2c20ee72a5a1c50bbadc81745709036"
          effect_ids: []
          event_digests:
            - "sha256:487ea87610e779d940b014e131cccf887b7f30675c3d10fe4de1f953ecc63aa0"
          mutation_id: "validation-resolution:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183"
        validation-resolution:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82:
          after_revision: 47
          aggregate_digest: "sha256:11ab09481431fe6559ba6c907df57a34f29f0a96f19dc2f78e560914485c3232"
          before_revision: 46
          command_digest: "sha256:8ea7a94d40dfdddfa979c87bb487e8e8d590594560f1d8052e051cfa157f8e60"
          effect_ids: []
          event_digests:
            - "sha256:ef6cf7b1fa97db88962491b8c04cb5c9bdfaae1c508692cdbb15b3f9e48045e0"
          mutation_id: "validation-resolution:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82"
        validation-resolution:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5:
          after_revision: 68
          aggregate_digest: "sha256:9defdcc173507027f356b14dff66c234f803478294ed54558b4f622d491268c3"
          before_revision: 67
          command_digest: "sha256:cff21e0589082f5eebc04ed25ef92bd89878b9c847afcbb9000b682813efb71c"
          effect_ids: []
          event_digests:
            - "sha256:5eb3cda7f9e6fa03d2b71c35ad5c47cee72cb3f2606d44098878bdcef41abacd"
          mutation_id: "validation-resolution:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5"
        validation:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf:
          after_revision: 26
          aggregate_digest: "sha256:1b1c5695f52107d337a9cf0b06630e33033cc323b064221feda416164337d85a"
          before_revision: 25
          command_digest: "sha256:d88c994b581ac2a9cdae346600d2e08cf8dd78625ff7146bf5b1d80f13477d16"
          effect_ids: []
          event_digests:
            - "sha256:b0af9d28f3aa669cf26b0ff1f33ba4ca79d74b516879cb9ab7533d0beef04144"
          mutation_id: "validation:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf"
        validation:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e:
          after_revision: 10
          aggregate_digest: "sha256:2809be6bf58c7e72414bdf763766dd75c2ca028d60b0075f93bd99a22e310fb0"
          before_revision: 9
          command_digest: "sha256:805607e4183aa32fe57a0a54a4f79056fa641dedb1f2b000a18e1b324e53e678"
          effect_ids: []
          event_digests:
            - "sha256:31614587461263ed7314c51c3c96bf5ec337bbee6c4934875b66215fc3dc5c8e"
          mutation_id: "validation:sha256:3ae442aa4cd74726c4ce0e3f70ee6c943ae600392bb7863a2cb66fa0fbbd288e"
        validation:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f:
          after_revision: 60
          aggregate_digest: "sha256:811352700e9b7d807b150b0c260ab8629f87040607100c2dc5f49e817a97095d"
          before_revision: 59
          command_digest: "sha256:9748d6ed8f96f81938ba6df9202984a5ee3d71357681dc638b9182a77de9e847"
          effect_ids: []
          event_digests:
            - "sha256:12dd8cf0cdf021bce36656b4082ed48e75a1856553d8577822306ea5279dba61"
          mutation_id: "validation:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f"
        validation:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009:
          after_revision: 131
          aggregate_digest: "sha256:695dfa16b1eb5644ac5634adb66b6e6224db4c0f6bf848e58810c62becd6dd64"
          before_revision: 130
          command_digest: "sha256:263a9801be1115157435f9c434187442d6f1bb148859612f8746334a7820878d"
          effect_ids: []
          event_digests:
            - "sha256:8adcb511a778bcbdc9e2682c81321475555ae52ba597b1037393c23eb21542f4"
          mutation_id: "validation:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009"
        validation:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd:
          after_revision: 107
          aggregate_digest: "sha256:9d9fd40c8582564d5b176fbbb38d8e246c765d1eb22f993880ce4242724b03e0"
          before_revision: 106
          command_digest: "sha256:20c830e6634d4a9cd7bac56b93d47b487159b5bd123dc0662ac8cb3d52441e48"
          effect_ids: []
          event_digests:
            - "sha256:bf9e244bd374f399ad18d677eb6f091f922470739bd3277974ae54e95bfe1454"
          mutation_id: "validation:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd"
        validation:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4:
          after_revision: 138
          aggregate_digest: "sha256:b25c218aa15771e0ba95c8b3342c25e433e00b1e8c39ebc3818514b720bcf7b8"
          before_revision: 137
          command_digest: "sha256:eb0c97894a3f318c46fdda095893b4855c6d730cfe6dca3e6387232c185202cd"
          effect_ids: []
          event_digests:
            - "sha256:d8d60a61830f616ca82fe6e0e3934cb0a30945447b270406864a86a0cfddf858"
          mutation_id: "validation:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4"
        validation:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b:
          after_revision: 81
          aggregate_digest: "sha256:7de54e40ebeb9ca82b1d467d02ef3873e0f6a165273e19fcc38d37215bb1c9d4"
          before_revision: 80
          command_digest: "sha256:3ffde266f04fcc0f28b5c4143e16a85e3799a9662a923086c129321a741f9b8e"
          effect_ids: []
          event_digests:
            - "sha256:1ea569ee29f27e60f0455dced9b0f1a3bb17636f7522506a9a0d01b3a15558b2"
          mutation_id: "validation:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b"
        validation:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d:
          after_revision: 53
          aggregate_digest: "sha256:8c1076c3e5e7db647bbaea3af0dde653e492c79b3ca05030ed08558226f18e4d"
          before_revision: 52
          command_digest: "sha256:7a07b870640dc817af11baa17696e7a21f066b9a5ce317cc12470f9b72d23f89"
          effect_ids: []
          event_digests:
            - "sha256:0d98e848acaa2d4297554e924f9ce9e67e1fc51162ce6c332d1f7b2a6eb0b01e"
          mutation_id: "validation:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d"
        validation:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88:
          after_revision: 95
          aggregate_digest: "sha256:2073c01e1c86a2664e1e0203f9c893a7ebe488fd453b5ffbca5dfecd44333086"
          before_revision: 94
          command_digest: "sha256:4d493973572fd3eb82c89c27cf780e89c7c64e953f780d975808c11da33d3baf"
          effect_ids: []
          event_digests:
            - "sha256:932adc95ef87b6640ddf7682061543486393986afacdbf9852d873b906b1097b"
          mutation_id: "validation:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88"
        validation:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51:
          after_revision: 88
          aggregate_digest: "sha256:6703eb1dec8983a9e88e53c8d81cb8adb56ed86e292e53e1a91eef2806f6e256"
          before_revision: 87
          command_digest: "sha256:b1832209c75389d44145285cf00ed09eefc270aa7e423583a3253953d69aa171"
          effect_ids: []
          event_digests:
            - "sha256:a7e4bdaa961a928180f31ede96b7e0350752db8e1556b4d8c29df7061ffff16d"
          mutation_id: "validation:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51"
        validation:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec:
          after_revision: 74
          aggregate_digest: "sha256:58ebadce7fe65921ce93c5caa957b5268e2cd068388c8747e14e486e01fb08a9"
          before_revision: 73
          command_digest: "sha256:09f42a1ef82c70e37a30250f7c8ac85c4e2ae23ff897d7f8e2ba2d2ac149572e"
          effect_ids: []
          event_digests:
            - "sha256:85846c13851b9680bd11350bde55d18fbedcc57841eb9afe69787f3f19961652"
          mutation_id: "validation:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec"
        validation:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183:
          after_revision: 17
          aggregate_digest: "sha256:639595f157691467aa49a15480ddc0b7012dc9b05d3c70427f4a5bb3c51b784b"
          before_revision: 16
          command_digest: "sha256:cc5ecd3783a9e17eff69e3869044eeced9adf9181a38e398f4bbae642e7bad01"
          effect_ids: []
          event_digests:
            - "sha256:cf7bba089062fb249f55e6ab8b512e427cee7dcbb5521104be4249bbbe44ed2a"
          mutation_id: "validation:sha256:cc8f46f6eb6ee68c6afe658f5b1f264d991ae1425b25114d74e3a23c0af86183"
        validation:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82:
          after_revision: 46
          aggregate_digest: "sha256:085fc5de7c4aed294172e2c02d7ab20334fcf232b3636966a4e0e59f4c2a1649"
          before_revision: 45
          command_digest: "sha256:9b8a644daa0878f95d405199b5c2239396eb152e742b3016018a1ccca0e4555e"
          effect_ids: []
          event_digests:
            - "sha256:4f23c50360fd8f42e0f342ea82b7bd2ccb01181d965611d93e69558f8cf1d1d0"
          mutation_id: "validation:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82"
        validation:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5:
          after_revision: 67
          aggregate_digest: "sha256:376c91bff48fbfdb135b50c41a9b2b9a95f09d44c81fa5ecd8d531f5ef2137a8"
          before_revision: 66
          command_digest: "sha256:c7df1aad14a6dfc704b384e4e2a9099829dca54e0c9b0f5d70e1a2b0a496e2cc"
          effect_ids: []
          event_digests:
            - "sha256:70dc1350dc47d8ee66ce0cd8ecddc6cad2e74b4ad443c2bee5e6bf4c1f3e275a"
          mutation_id: "validation:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:c060f58e7809f3491fcc81dd54a60e4d8152db34515ae7327bd35784f59ddf58"
          digest: "sha256:26c5726d237359c5786ea7f15a2ab081193f6012a29902c5dc25e58768ba8c10"
          revision: 1
          state: "SUPERSEDED"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:41a64f606e78235ff526b7360a079acba13beb01c716cb09cdc24a1ce3fcbc12"
          digest: "sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa"
          revision: 2
          state: "SUPERSEDED"
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
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/cleanup"
                  - "packages/agentplane/src/commands/hosted"
                  - "packages/agentplane/src/commands/integration"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:5896254eb786bd6736d669004a251dc4485b3f4ec043ac482eb665cbee2b5b6c"
          digest: "sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
          revision: 3
          state: "SUPERSEDED"
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
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/cleanup"
                  - "packages/agentplane/src/commands/hosted"
                  - "packages/agentplane/src/commands/integration"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                  - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
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
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:6558b82d343486058d7cbcea51d44007bdfcb1f83a45550c33c0819b32367013"
          digest: "sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9"
          revision: 4
          state: "SUPERSEDED"
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
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/cleanup"
                  - "packages/agentplane/src/commands/hosted"
                  - "packages/agentplane/src/commands/integration"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                  - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
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
                  - "packages/agentplane/src/commands/shared"
              expected_outputs:
                - "canonical-coordinator-qualified"
              id: "canonical-coordinator-qualification"
              optional: false
              required_inputs:
                - "canonical-provider-effects-implemented"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:4f7ae06fc481728191c3f38b841c2a4eafe5dc33fe70390e8cd6a62b51257b33"
          digest: "sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29"
          revision: 5
          state: "SUPERSEDED"
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
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/cleanup"
                  - "packages/agentplane/src/commands/hosted"
                  - "packages/agentplane/src/commands/integration"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                  - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
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
                  - "packages/agentplane/src/commands/shared"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              expected_outputs:
                - "canonical-coordinator-qualified"
              id: "canonical-coordinator-qualification"
              optional: false
              required_inputs:
                - "canonical-provider-effects-implemented"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:535b781d34faec91916011c490e654a820cae6e85f91a4e6538cf8a39fc1dec7"
          digest: "sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a"
          revision: 6
          state: "SUPERSEDED"
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
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/cleanup"
                  - "packages/agentplane/src/commands/hosted"
                  - "packages/agentplane/src/commands/integration"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                  - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
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
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                  - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
              expected_outputs:
                - "canonical-coordinator-qualified"
              id: "canonical-coordinator-qualification"
              optional: false
              required_inputs:
                - "canonical-provider-effects-implemented"
      revision: 144
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        canonical-coordinator-qualification:
          attempt: 14
          claim_id: "sha256:d2b2784c12c1619d10dbf4001a28f31289eaa0a1718721884dbdb23a03c31912"
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
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/commands/acr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
            expected_outputs:
              - "canonical-coordinator-qualified"
            id: "canonical-coordinator-qualification"
            optional: false
            required_inputs:
              - "canonical-provider-effects-implemented"
          output_manifests:
            -
              attempt: 14
              digest: "sha256:b65a635ae235f950bf5401a012b976cd20a4aeaf51b5b2d4be579c6d0305a128"
              id: "canonical-coordinator-qualified"
              kind: "report"
              plan_revision: 7
              repository_fingerprint: "sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace"
              task_id: "202609172016-5A9KVM"
              work_item_id: "canonical-coordinator-qualification"
          result_digest: "sha256:60444c0ae56fe934e45a8bd10947e419036eaf8caf41a042fd0ffc2d10f7202d"
          revision: 82
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:e527a143c35af7e8ae563c540defc54db9250eace763ca7f520d330681fa543f"
              - "sha256:e1a0cca3ced48352c8ecb8ffad4b2b3746107abdaf06c6b3778130b2f6658353"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:4acf1c04c639158641d358978450af5283a4f3db2bfb38f4cb91209bdd3f7a1e"
              environment_digest: "sha256:3bedd1617a5f27ce0d4c0cd47859dc81ec99a591ebe3dfab5cf9203476b2ba7c"
              implementation_identity: "sha256:60444c0ae56fe934e45a8bd10947e419036eaf8caf41a042fd0ffc2d10f7202d"
              toolchain_digest: "sha256:e04c6ab2260410279f5d6382d265e1677cb5bf1fcab02916a3bf08182d58e350"
            observed_at: "2026-09-18T22:42:39.802Z"
            status: "PASSED"
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
          attempt: 2
          claim_id: "sha256:052ed9c5bcf1904657003ff88135ef7b6a64245d1bd9c1e4b23153ef4bd2c0ea"
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
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/cleanup"
                - "packages/agentplane/src/commands/hosted"
                - "packages/agentplane/src/commands/integration"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/testkit/src"
            expected_outputs:
              - "canonical-provider-effects-implemented"
            id: "canonical-provider-effects"
            optional: false
            required_inputs:
              - "canonical-repository-effects-implemented"
          output_manifests:
            -
              attempt: 2
              digest: "sha256:f3273d8a66ad23a2a8015ebedda79ebf9e3195f6cf64fa0c682e527624dd1d11"
              id: "canonical-provider-effects-implemented"
              kind: "repository_diff"
              plan_revision: 3
              repository_fingerprint: "sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
              task_id: "202609172016-5A9KVM"
              work_item_id: "canonical-provider-effects"
          result_digest: "sha256:95eb5e64c974666178ea32a0a4f726d9d0514920b3ebd5cb6eaa55693dc9e328"
          revision: 15
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:7f669cfb91b53caff81c5468251bfcb7bbd072ef546d528760355996e8147bcd"
              - "sha256:e38fbce0668cd0eb8f1579626e62bff40c25b73f200f61a2944c70cfac5df049"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:472342ccffac073492102174c8b14e4e8c95a3075dc3dc85803a40d93c3efb89"
              environment_digest: "sha256:4feb8f0879560c3288d6e5b6e29cffc17b36ddd5791a1f650507c97bed9a8398"
              implementation_identity: "sha256:95eb5e64c974666178ea32a0a4f726d9d0514920b3ebd5cb6eaa55693dc9e328"
              toolchain_digest: "sha256:d7d21b7137c5ffe58fa32ac5165e9a1e93fb1919fc0f4db76103927e6b8ff0fe"
            observed_at: "2026-09-18T17:38:38.274Z"
            status: "PASSED"
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
          output_manifests:
            -
              attempt: 1
              digest: "sha256:591a0ac10808b3f961eb18bdb0afe107bad92cbb1732d498ce26e6262f29d8f4"
              id: "canonical-repository-effects-implemented"
              kind: "repository_diff"
              plan_revision: 1
              repository_fingerprint: "sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
              task_id: "202609172016-5A9KVM"
              work_item_id: "canonical-repository-effects"
          result_digest: "sha256:3661c996919335f04ea0ea0f1626089a1946e0f2654e249a91a3142cafbe7de7"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:7610eca59cc70c77d32af1c99a850929bf4f7966c219ee4eae1a277f15c024dd"
              - "sha256:87a96b3acb57e9866f3068ea779529bb6e67da306823d216d725dce83ab04032"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:674157000f01a1d8b6b9e4948f859785009636374a0d71303410506547709025"
              environment_digest: "sha256:3fc2c8c4fa805d6b42019d41e7bafadb96d20bea97aa9ea4ea5d7fdddfb04c61"
              implementation_identity: "sha256:3661c996919335f04ea0ea0f1626089a1946e0f2654e249a91a3142cafbe7de7"
              toolchain_digest: "sha256:04bec368c49807e4d0c1d9fa7b2ff3352150517c88ee4492325423407c5f4aec"
            observed_at: "2026-09-17T22:52:22.687Z"
            status: "PASSED"
    digest: "sha256:eea4601cc665f71d908e962a765e95dc1cb580a59946847d53bf6ef3eb0865f1"
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
      -
        command_digest: "sha256:c4d6c894c7f4d1e0fd78fdb1086f01d76fc113c9918ee57d07de924f4b30f0dc"
        id: "sha256:81fac69f20f42249963429e0ed7d7883600d371f9946a7fb32a4ea25ca2b92c1:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:81fac69f20f42249963429e0ed7d7883600d371f9946a7fb32a4ea25ca2b92c1"
        occurred_at: "2026-09-17T22:51:13.332Z"
        payload_digest: "sha256:d47dd98692456ecd8c2232ce09064ac5e2cff5d4b61aee0c39058ec1a5b2e91b"
        task_id: "202609172016-5A9KVM"
        task_revision: 23
      -
        command_digest: "sha256:ccef6dc1cb2604281ddfb2b162b40dade4397d9481a9b398b3ec7348efe60c8d"
        id: "result:sha256:a1185fe7a37b2eac9c3e0c8643a68cc54a9b44b32226924497f8b0de8f469b00:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a1185fe7a37b2eac9c3e0c8643a68cc54a9b44b32226924497f8b0de8f469b00"
        occurred_at: "2026-09-17T22:51:17.560Z"
        payload_digest: "sha256:fab1b25ae6b523adc3425755b7448df4925fc1771b596e424a7dd02f9b8e3724"
        task_id: "202609172016-5A9KVM"
        task_revision: 24
      -
        command_digest: "sha256:18c5ee27930da35856106d5a286b13d874ea55d7f65df4148c59e0028ae144a3"
        id: "kernel_work_item_inspection_required:sha256:ce40528590fdaaf4475c5c8abb954e910cc27c779a988652c5415fa3bb921874:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ce40528590fdaaf4475c5c8abb954e910cc27c779a988652c5415fa3bb921874:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        occurred_at: "2026-09-17T22:51:20.777Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609172016-5A9KVM"
        task_revision: 25
      -
        command_digest: "sha256:d88c994b581ac2a9cdae346600d2e08cf8dd78625ff7146bf5b1d80f13477d16"
        id: "validation:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf"
        occurred_at: "2026-09-17T22:54:21.148Z"
        payload_digest: "sha256:c640172650bace8e18a4458b58619fb160a3f285b79e7a250d737d3d523462bc"
        task_id: "202609172016-5A9KVM"
        task_revision: 26
      -
        command_digest: "sha256:ce6e1d863c5799b8387c5c5781c5ce4bc8291093784046b973d34f209545efa7"
        id: "validation-resolution:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:363dcffa4a222e25190822ab6a8c03d364b737d6eeb955317a540c6badc5c0cf"
        occurred_at: "2026-09-17T22:54:23.213Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202609172016-5A9KVM"
        task_revision: 27
      -
        command_digest: "sha256:2910ab26a3c5c9cdd7496660fc8484def3561f9e204af185bb112b18ba6ce701"
        id: "kernel_work_item_claim_required:sha256:a84496ff597885ddfd08b48336b8561b190ddda9264d6693b2cccf84daef320d:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a84496ff597885ddfd08b48336b8561b190ddda9264d6693b2cccf84daef320d:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        occurred_at: "2026-09-17T22:54:27.308Z"
        payload_digest: "sha256:23532dbce000d1f0f79e31749079afe2ef833ccc76bde8a0b5d96138f25c1d3e"
        task_id: "202609172016-5A9KVM"
        task_revision: 28
      -
        command_digest: "sha256:4594cd043df31e944e6c5c5c4723047e97a77b3882b478357570edea6c9c91d4"
        id: "kernel_work_item_execution_required:sha256:30df8f413d51b9f4c01e249b8a22f36e3a378a531d87bf0e446bc37185bdfa46:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:30df8f413d51b9f4c01e249b8a22f36e3a378a531d87bf0e446bc37185bdfa46:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        occurred_at: "2026-09-17T22:54:30.407Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202609172016-5A9KVM"
        task_revision: 29
      -
        command_digest: "sha256:15fb4976c778ddab29dc4777ab674d7006475dc6a201ab15f0a2f2ad8ff7d62e"
        id: "sha256:13346b93bfd52fc430579e7e4410efc48bbca1847b32daeddc0d362c246e55c3:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:13346b93bfd52fc430579e7e4410efc48bbca1847b32daeddc0d362c246e55c3"
        occurred_at: "2026-09-18T11:48:55.723Z"
        payload_digest: "sha256:d4a92440b02b7b741d34bf4343153c638a5d88f1b605a1aa1260bbd3f66d3c26"
        task_id: "202609172016-5A9KVM"
        task_revision: 30
      -
        command_digest: "sha256:c56124c0f09165e96cd41b6198fbc8f87bb14d7d7498ae33dc0bdf5710dd2d76"
        id: "sha256:8d4790c201331e0b473b89204c4bb6cfc08d8900dc7b57f4826e3e90325b3c13:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8d4790c201331e0b473b89204c4bb6cfc08d8900dc7b57f4826e3e90325b3c13"
        occurred_at: "2026-09-18T11:54:24.019Z"
        payload_digest: "sha256:f8f92483994f2aeee36455a8aef37798ccb0aa0f98a768f9257fd5f3451c0f68"
        task_id: "202609172016-5A9KVM"
        task_revision: 31
      -
        command_digest: "sha256:29111a2fe56dea1fdff8d7a5b847d4852b2141ef57709066716e915162e89529"
        id: "semantic-stop:sha256:bf2f48e34c48d7650858f327601263971efde98102631d55e6e12f9239f5e2eb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:bf2f48e34c48d7650858f327601263971efde98102631d55e6e12f9239f5e2eb"
        occurred_at: "2026-09-18T11:54:52.082Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202609172016-5A9KVM"
        task_revision: 32
      -
        command_digest: "sha256:2af578237b2558b101488d756b481b3a548edccf9a18e611304435db88177ddc"
        id: "sha256:316af14cc874e458562f59e958d75d52e9b2588c3462cc33b273cd37ddaa8bab:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:316af14cc874e458562f59e958d75d52e9b2588c3462cc33b273cd37ddaa8bab"
        occurred_at: "2026-09-18T11:55:55.836Z"
        payload_digest: "sha256:797a4608a5a898fb6c9075f8e924209f716af73cbbb0f52cf8e21122982b5bef"
        task_id: "202609172016-5A9KVM"
        task_revision: 33
      -
        command_digest: "sha256:22a27ba9cf6ce866e44bee66731a61c30a78953402752c41ed79a5b58a85a372"
        id: "sha256:95a2a02481ca6c761628c6b4edc2076ac596d2c4ad99f2651b59482286e552fd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:95a2a02481ca6c761628c6b4edc2076ac596d2c4ad99f2651b59482286e552fd"
        occurred_at: "2026-09-18T17:13:34.882Z"
        payload_digest: "sha256:3d2163f51fda60cd21b1c287bee4fdeb786611d20216e840ca008843ee4c0487"
        task_id: "202609172016-5A9KVM"
        task_revision: 34
      -
        command_digest: "sha256:13a096bded6ca19c376c817b5728944191434dfb1216a3bcd9438ece622e68d2"
        id: "amend:sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:e1dc3f758a3adbb45a9e6d9a130498a2f25e08bdbe50f8cb99b2797f634676fa"
        occurred_at: "2026-09-18T17:13:50.170Z"
        payload_digest: "sha256:4b15ff7252f942da946b240177cc57cc1539d1d1ac383db66e2aa8bd2ed708c8"
        task_id: "202609172016-5A9KVM"
        task_revision: 35
      -
        command_digest: "sha256:55996485a5ff189e73d87ce54aa1a1d62db647c583bcd3214bc1c5e8bc729965"
        id: "sha256:c0ebaa75040731e9db181dc8fa15c50f9718dc9bd5ce9a94d28b62ed61c27608:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c0ebaa75040731e9db181dc8fa15c50f9718dc9bd5ce9a94d28b62ed61c27608"
        occurred_at: "2026-09-18T17:22:46.600Z"
        payload_digest: "sha256:cc69a4acc8017953b9592e8b005bcdd66c6954768eb8534a637d5d5602b74062"
        task_id: "202609172016-5A9KVM"
        task_revision: 36
      -
        command_digest: "sha256:b7332c7c5d010afe9228b09029aa92bec46e2c666c26634e86fbd2fc2c930964"
        id: "sha256:39320ebc38aa6a37d90403b3e8776b61690210451fa3a71c33155f925b701571:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:39320ebc38aa6a37d90403b3e8776b61690210451fa3a71c33155f925b701571"
        occurred_at: "2026-09-18T17:23:57.593Z"
        payload_digest: "sha256:f550d9df017b08063d3f512870092b3490f614d088f7c019e7304d93aa616839"
        task_id: "202609172016-5A9KVM"
        task_revision: 37
      -
        command_digest: "sha256:0af72fd709da54a34031cf69f508e394236a0fa610a14fb93259aeeab3494c57"
        id: "amend:sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:3bcfcb5c09faed882a65517907ca775392899d7607dff141051351cefe9d8d7b"
        occurred_at: "2026-09-18T17:24:21.437Z"
        payload_digest: "sha256:fd0e8ab1aa350c81694a5e5ac8711b0d960ce32f70ffa2beffa41224cd31f6c4"
        task_id: "202609172016-5A9KVM"
        task_revision: 38
      -
        command_digest: "sha256:0c8b2c16aaab3fb9d29a0deb9676603836dbbd21d2f695def90d14202fd2c3e7"
        id: "sha256:29082ac8925e24fe7654c3762a8924abdf23bb8c5d5c03d26e4acd05ce88117a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:29082ac8925e24fe7654c3762a8924abdf23bb8c5d5c03d26e4acd05ce88117a"
        occurred_at: "2026-09-18T17:24:23.549Z"
        payload_digest: "sha256:ccfc3d6a41a895c4897d0031547f1cc8c36461950f21965445727e4fc380ad09"
        task_id: "202609172016-5A9KVM"
        task_revision: 39
      -
        command_digest: "sha256:b5d611f2b9d16103e5a2a0f73a3b89868d07833d4265cf0a5875043eb1707ba7"
        id: "sha256:c9beb8007b800f63fe77bdc1f32aa91e2a271f483b14315468b57979718af929:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c9beb8007b800f63fe77bdc1f32aa91e2a271f483b14315468b57979718af929"
        occurred_at: "2026-09-18T17:25:02.490Z"
        payload_digest: "sha256:fda43981b458e0d1de8c39f6488ee3131cb7f8bc7b984458be5721f45c6aec37"
        task_id: "202609172016-5A9KVM"
        task_revision: 40
      -
        command_digest: "sha256:7cd9a7d462b7a4f0d015626b6d5be22a8d04809d1c34a8fe48c5179f85f26308"
        id: "kernel_work_item_claim_required:sha256:3e793b0150c50a454a5cb2b568fb0b6948bf6e0510bd4f89a0919c9a60291bb8:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3e793b0150c50a454a5cb2b568fb0b6948bf6e0510bd4f89a0919c9a60291bb8:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        occurred_at: "2026-09-18T17:25:07.566Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202609172016-5A9KVM"
        task_revision: 41
      -
        command_digest: "sha256:1e8ad5d2668e36a57f9cea9949c2cda091c732c77a5cba057d1dbc52abcc3041"
        id: "kernel_work_item_execution_required:sha256:4571afebe6411bb08c930605aee50cfad13c323246974ede29b29a202cccf0be:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4571afebe6411bb08c930605aee50cfad13c323246974ede29b29a202cccf0be:sha256:41c72eddbe085b662ee2b6d4604b643c39a9e5ebee873db40bce3afc4424027b"
        occurred_at: "2026-09-18T17:25:10.721Z"
        payload_digest: "sha256:aec49a4b547a4401da31cfe163dadf2f671fd47179bd7ec6528fad14db98542c"
        task_id: "202609172016-5A9KVM"
        task_revision: 42
      -
        command_digest: "sha256:50ee57e3b7ca35869f77aa9273d4fe0c0ab1eb0cc3f2ab1422ca927f17f30ea9"
        id: "sha256:67f7861098ed206915ef678c2ec1ce8828fc2d9076662b459414192cfc77fd33:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:67f7861098ed206915ef678c2ec1ce8828fc2d9076662b459414192cfc77fd33"
        occurred_at: "2026-09-18T17:37:33.405Z"
        payload_digest: "sha256:259c70289759a0edc6d8cbc68cd2c0216cdadc0143f936e1ee17e0b97bda0fb1"
        task_id: "202609172016-5A9KVM"
        task_revision: 43
      -
        command_digest: "sha256:bbc2db842fb8b4bafe57900a0e5d531a30274f59a4fcc780149abcff48c33e5e"
        id: "result:sha256:5fa028f43e25ac2aa3880f68467ae8d5865072552be5e7cde125373a7cdff87b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:5fa028f43e25ac2aa3880f68467ae8d5865072552be5e7cde125373a7cdff87b"
        occurred_at: "2026-09-18T17:37:37.720Z"
        payload_digest: "sha256:fa3f794fd17443a84ea899bc14483d1fc5692b1739be2bed2821fee6a927dd12"
        task_id: "202609172016-5A9KVM"
        task_revision: 44
      -
        command_digest: "sha256:ec0e3a8c4aec5a22c37eda2f186da80afb8ab6341812b64566279579afaddf83"
        id: "kernel_work_item_inspection_required:sha256:0b2d5bcab0615e9b6a98db8f022e207e6036d53a349a56f3e2cb8ccc02995551:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0b2d5bcab0615e9b6a98db8f022e207e6036d53a349a56f3e2cb8ccc02995551:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
        occurred_at: "2026-09-18T17:37:41.041Z"
        payload_digest: "sha256:73f5350c84cc96e7810b4cf90409a1512e4a9b7dcf9f0e74d9098c10bb1e7197"
        task_id: "202609172016-5A9KVM"
        task_revision: 45
      -
        command_digest: "sha256:9b8a644daa0878f95d405199b5c2239396eb152e742b3016018a1ccca0e4555e"
        id: "validation:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82"
        occurred_at: "2026-09-18T17:39:39.962Z"
        payload_digest: "sha256:fdf8751bb1021539730ca1441d3139c9aa1fa6ab6c67b41959176d3a56f853c9"
        task_id: "202609172016-5A9KVM"
        task_revision: 46
      -
        command_digest: "sha256:8ea7a94d40dfdddfa979c87bb487e8e8d590594560f1d8052e051cfa157f8e60"
        id: "validation-resolution:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:d8a4dadddaeac41cb67d074f84bb8fcb868cf2cb9014554a5a6cdb79c8901c82"
        occurred_at: "2026-09-18T17:39:42.118Z"
        payload_digest: "sha256:aad38a57b30211b5e7c8a3e705c00172ac1ec5a3fcea34eb7b37c2a16409188d"
        task_id: "202609172016-5A9KVM"
        task_revision: 47
      -
        command_digest: "sha256:b480b84360a3f169d9af1361128e70e13ce82e7273afec4cd639f23c96784fd6"
        id: "kernel_work_item_claim_required:sha256:239f5a31865cb9fd37ab6ae01c4749c23d16cff7274d8420988a5e2ec6c95a1e:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:239f5a31865cb9fd37ab6ae01c4749c23d16cff7274d8420988a5e2ec6c95a1e:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
        occurred_at: "2026-09-18T17:39:46.343Z"
        payload_digest: "sha256:49a5ab2916791286794d7b8826aec0460831d51f8d946e88087187ad77c32af1"
        task_id: "202609172016-5A9KVM"
        task_revision: 48
      -
        command_digest: "sha256:fbfd335ab8f004e1e07b9792cba04061c06ab35a642173025da3a5b9204dfa99"
        id: "kernel_work_item_execution_required:sha256:0aa084c251ccab38678027dd3e94a6d3f76908166937da09e297afa60b39f151:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0aa084c251ccab38678027dd3e94a6d3f76908166937da09e297afa60b39f151:sha256:ba447824bbf732a533ca4503982d9e77c6a616d5fa7b68d4e231759c1777a521"
        occurred_at: "2026-09-18T17:39:49.555Z"
        payload_digest: "sha256:a8ab5da46010ff17fa02de04a8b9468b3acd2b6ed9c17e55d3b78a2c8782aa87"
        task_id: "202609172016-5A9KVM"
        task_revision: 49
      -
        command_digest: "sha256:bec3a2ca131cb41bf8ac24d2faf7bd07babb6019d858e87566a6492c46848d4c"
        id: "sha256:5a23428013fd9cdd3129682e5fa4f8d037ccaa0d0927d1c4baaa9b514851653e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:5a23428013fd9cdd3129682e5fa4f8d037ccaa0d0927d1c4baaa9b514851653e"
        occurred_at: "2026-09-18T17:50:28.810Z"
        payload_digest: "sha256:1fef4e341bcdd016d3b4c3d8d09162c92670767166b2908b4161795e5cb671db"
        task_id: "202609172016-5A9KVM"
        task_revision: 50
      -
        command_digest: "sha256:7e4f2208b905a8ac232174dc44c2e146d7bf8be8b7159b5e1082a9a131c62786"
        id: "result:sha256:43a1813bf773236fe9597fc04e8897d22815525413d8f6a8e0972d9c51e8a385:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:43a1813bf773236fe9597fc04e8897d22815525413d8f6a8e0972d9c51e8a385"
        occurred_at: "2026-09-18T17:50:33.177Z"
        payload_digest: "sha256:0525dd43fb2c4b3d6845027072a8ae8b5a01bf40cb822ef0a03ce57e0199e5dc"
        task_id: "202609172016-5A9KVM"
        task_revision: 51
      -
        command_digest: "sha256:a9edfb596897b3d9d2a0292ea1cfc528018d2d0abe8cdd470d70ad24ef3a7b23"
        id: "kernel_work_item_inspection_required:sha256:70b2a0ed43e795773bea31a84a47d3aa4eb76374b11721e14eb0f8eb20a65d2d:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:70b2a0ed43e795773bea31a84a47d3aa4eb76374b11721e14eb0f8eb20a65d2d:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
        occurred_at: "2026-09-18T17:50:36.537Z"
        payload_digest: "sha256:b88fe73b96a21b8cd9734beda39a60b9174f6dcc3838ea4cfb914bd024c71e20"
        task_id: "202609172016-5A9KVM"
        task_revision: 52
      -
        command_digest: "sha256:7a07b870640dc817af11baa17696e7a21f066b9a5ce317cc12470f9b72d23f89"
        id: "validation:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d"
        occurred_at: "2026-09-18T17:58:20.028Z"
        payload_digest: "sha256:65f2057bd78e610ac0cfc25bfca6ca50b2ff898166c73c70b7f58db4a03f4a02"
        task_id: "202609172016-5A9KVM"
        task_revision: 53
      -
        command_digest: "sha256:0dfde8049aa67abb61141f52579538ed824cff86ae4a1a2cd6a2991cd1cb894c"
        id: "validation-resolution:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9dbe2c85ca709d4035b95a1d394aa03b2830615f45a3eb03b1b15755f776631d"
        occurred_at: "2026-09-18T17:58:22.259Z"
        payload_digest: "sha256:95261d0951c6a1d6d2b46eaa2016ffc47eee6bc6509507bc60402cf421be1cc9"
        task_id: "202609172016-5A9KVM"
        task_revision: 54
      -
        command_digest: "sha256:57df2811d36ea9799f89051f54359bba458dc0737a5bd7307933a90bc27fff96"
        id: "kernel_work_item_rework_claim_required:sha256:f9b156b7b607db365d994ccecc6ed9cc081c5a81fbd7fa79c0c62407b2ada73b:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:f9b156b7b607db365d994ccecc6ed9cc081c5a81fbd7fa79c0c62407b2ada73b:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
        occurred_at: "2026-09-18T17:58:26.532Z"
        payload_digest: "sha256:f45b55230035d9446470efeb8317eb2ab86b7e3cb37cbe75bd650d7ecfe3360e"
        task_id: "202609172016-5A9KVM"
        task_revision: 55
      -
        command_digest: "sha256:0002bfc6984f9b3605ec2eca22b6fc387a7c596ba20f77af139fa0e1edfac8dc"
        id: "kernel_work_item_execution_required:sha256:2ebc49764c085c2df6e38c216218b2201948afdb8301f363c9010915e64d5055:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2ebc49764c085c2df6e38c216218b2201948afdb8301f363c9010915e64d5055:sha256:068cbaa224fda671d54202de878c4a3b2cad19497c4d6455559ae5f7369a9c9c"
        occurred_at: "2026-09-18T17:58:29.770Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202609172016-5A9KVM"
        task_revision: 56
      -
        command_digest: "sha256:df742394d5644174b00d4e7bd223f81e0a3ebfd56bce00709b69c5ea221c49e8"
        id: "sha256:bc73acf3694c1661a044847c1385a42d3acf323de9096dd14cdd9f77cac37999:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bc73acf3694c1661a044847c1385a42d3acf323de9096dd14cdd9f77cac37999"
        occurred_at: "2026-09-18T18:04:47.132Z"
        payload_digest: "sha256:8c6522d394911ff3cc26dea684d53941e030138a0ca63a0b8a3d8018a4839f0a"
        task_id: "202609172016-5A9KVM"
        task_revision: 57
      -
        command_digest: "sha256:e7df57c62b29c230180886a64c06f2f822ca401b674a13a49bb934008d0f00c9"
        id: "result:sha256:cb19ed970719ff1b3e1edfec6d736cb31f18a3cc17a7e5ac27ca1ccd8309e9f8:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:cb19ed970719ff1b3e1edfec6d736cb31f18a3cc17a7e5ac27ca1ccd8309e9f8"
        occurred_at: "2026-09-18T18:04:51.633Z"
        payload_digest: "sha256:11792cc6362ff7c773086ac514fc8cea1228442e9fe1aa7479b2d2ccfd5dbd13"
        task_id: "202609172016-5A9KVM"
        task_revision: 58
      -
        command_digest: "sha256:02158d40ad4b52caecee6875473b58b79c447325f52da8a97a78a1cef440f402"
        id: "kernel_work_item_inspection_required:sha256:c22656102728f8e917944c8324b5b90c266258d554e4633c6f285d6d91651d6f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c22656102728f8e917944c8324b5b90c266258d554e4633c6f285d6d91651d6f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
        occurred_at: "2026-09-18T18:04:54.997Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202609172016-5A9KVM"
        task_revision: 59
      -
        command_digest: "sha256:9748d6ed8f96f81938ba6df9202984a5ee3d71357681dc638b9182a77de9e847"
        id: "validation:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f"
        occurred_at: "2026-09-18T18:05:46.370Z"
        payload_digest: "sha256:e3b97b57062f39754b46799a248c66bebf3e7680ad80a8dd5b0f9d56c5c33110"
        task_id: "202609172016-5A9KVM"
        task_revision: 60
      -
        command_digest: "sha256:0bafac46d797dab98ce04ec14088032c4fbb33c32a35b88ee44beea8f6d3a0dd"
        id: "validation-resolution:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:462edd65b25c840299b29b5d8bd403ae9690824c8e016d7c89ac14d1d01ecc2f"
        occurred_at: "2026-09-18T18:05:48.585Z"
        payload_digest: "sha256:2e19f270cec9be0a5dd349d0b5e6724c9e17338a119dd07a89cda8feb1348aa6"
        task_id: "202609172016-5A9KVM"
        task_revision: 61
      -
        command_digest: "sha256:14ab94d0036103e78ca95dbf387bee2414115b6473231e7480ada7cdfc3b8aaa"
        id: "kernel_work_item_rework_claim_required:sha256:e5f08f85fdbbbb2e151ecf6ccd585726ec133ea1f7b7fe68034931bd45bb6aae:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:e5f08f85fdbbbb2e151ecf6ccd585726ec133ea1f7b7fe68034931bd45bb6aae:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
        occurred_at: "2026-09-18T18:05:52.798Z"
        payload_digest: "sha256:549553d878c18efc3b207a18305754d1e32f11dc76540096754f12817ef67091"
        task_id: "202609172016-5A9KVM"
        task_revision: 62
      -
        command_digest: "sha256:379414f6e883fd8408a02dd8bb8bee7b36fb02d51c2d55dd7e5b77b2712a1176"
        id: "kernel_work_item_execution_required:sha256:bd99912e2cc34a164d157b1f01272a67b3c99fd51d26a8287bfd722354e0ff9f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bd99912e2cc34a164d157b1f01272a67b3c99fd51d26a8287bfd722354e0ff9f:sha256:66000c5f04a358725e74de51be1122e78948e73fe325d7a0a6ca3fd554200510"
        occurred_at: "2026-09-18T18:05:56.017Z"
        payload_digest: "sha256:257b3d825f9d2b38f2f52032d48050f5fb8ecfc7aaf5b5c7002a6c079d4b28f5"
        task_id: "202609172016-5A9KVM"
        task_revision: 63
      -
        command_digest: "sha256:755e5452dbb0d09baa8394ffb57fc50d6d075255adf14b094513eaf241a1d780"
        id: "sha256:b1c91a6044ce87af3374bd289a0539faa310c8b3f7f5fd948c558b283fafbaff:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b1c91a6044ce87af3374bd289a0539faa310c8b3f7f5fd948c558b283fafbaff"
        occurred_at: "2026-09-18T18:08:15.907Z"
        payload_digest: "sha256:99a3d7fdf396ddc592d6ac6a15ede8e07e4a6d183315686f5a9dc3737a328700"
        task_id: "202609172016-5A9KVM"
        task_revision: 64
      -
        command_digest: "sha256:f6f9dd9448498dcb600fa138d745642d4b3ae56f90b866054b0aea2c5888695b"
        id: "result:sha256:cf2a82cb9be8fe27119404c84c74a346c44807bc717d3a539e07d6e0444210de:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:cf2a82cb9be8fe27119404c84c74a346c44807bc717d3a539e07d6e0444210de"
        occurred_at: "2026-09-18T18:08:20.312Z"
        payload_digest: "sha256:11a7fe61bf7311f828c1fe7ea7f0145059bd7367ae143878fafbbbecd4ab5773"
        task_id: "202609172016-5A9KVM"
        task_revision: 65
      -
        command_digest: "sha256:afd7443910c717587a1ffaf1eba621b023ccb0f405c001ae2fd260bcb9d89ede"
        id: "kernel_work_item_inspection_required:sha256:ae325a7abd53701fb686233f8cb6bc5a14b6d35a71da53c70b150a6ec7cccbcd:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ae325a7abd53701fb686233f8cb6bc5a14b6d35a71da53c70b150a6ec7cccbcd:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
        occurred_at: "2026-09-18T18:08:23.742Z"
        payload_digest: "sha256:ce7670c1a31c14a609ac8512bab0d82941060c20405f355d1a5b9a4722679fc8"
        task_id: "202609172016-5A9KVM"
        task_revision: 66
      -
        command_digest: "sha256:c7df1aad14a6dfc704b384e4e2a9099829dca54e0c9b0f5d70e1a2b0a496e2cc"
        id: "validation:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5"
        occurred_at: "2026-09-18T18:16:03.466Z"
        payload_digest: "sha256:8d2d8c9d7687f936d27ad341791a16c2336d141054d7fc8a397959f6720518e6"
        task_id: "202609172016-5A9KVM"
        task_revision: 67
      -
        command_digest: "sha256:cff21e0589082f5eebc04ed25ef92bd89878b9c847afcbb9000b682813efb71c"
        id: "validation-resolution:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e405ed04bc5b9fb20f225647c5edb44db37e8748d5c2c32453a071566720e1f5"
        occurred_at: "2026-09-18T18:16:05.786Z"
        payload_digest: "sha256:924bffbe25186b1425a999bdbba4a730ebf2705afdc150b377f116466a56020a"
        task_id: "202609172016-5A9KVM"
        task_revision: 68
      -
        command_digest: "sha256:6953e82b8148401a52e6ec69dcbff6e28de3a9777d7e996542dcfa1e7103b619"
        id: "kernel_work_item_rework_claim_required:sha256:d48578eeebe74a2cfba1415665e210b06f27bd0b804ec4d65a5058f4b6e73233:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:d48578eeebe74a2cfba1415665e210b06f27bd0b804ec4d65a5058f4b6e73233:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
        occurred_at: "2026-09-18T18:16:10.186Z"
        payload_digest: "sha256:7d4b139564b9a67f1091c7c1addafc180cb4b3e2633b3372211ea7ca2e0318b4"
        task_id: "202609172016-5A9KVM"
        task_revision: 69
      -
        command_digest: "sha256:6c36fedd5136bec612ecf0ed53673e986f2695139892391db8a118644d0a3bfb"
        id: "kernel_work_item_execution_required:sha256:92200c63d5a0aa61876f83737c8f03954114d1f71a127487b36ba565b290f9dc:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:92200c63d5a0aa61876f83737c8f03954114d1f71a127487b36ba565b290f9dc:sha256:f9255a8060c2c40c03b6853175a4b52a8177e18a62d9dc8607270d0e0cad037e"
        occurred_at: "2026-09-18T18:16:13.608Z"
        payload_digest: "sha256:a2da109a8b181cb6be40337d65b7b1c1a58280bbcff3b880a0a3b52ae2157b03"
        task_id: "202609172016-5A9KVM"
        task_revision: 70
      -
        command_digest: "sha256:1e70e9fcab27bd602f63e906f7ce3b74712c27898421803a531fbf7b68f64b44"
        id: "sha256:14859607887c65ecc30ba99cd59c64218d977cfec20eacfb8c6e1b8a097ffdd0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:14859607887c65ecc30ba99cd59c64218d977cfec20eacfb8c6e1b8a097ffdd0"
        occurred_at: "2026-09-18T18:20:56.461Z"
        payload_digest: "sha256:add08c40161eb2107ec032405069f1dd0728f0a2802294af48c88084bce08059"
        task_id: "202609172016-5A9KVM"
        task_revision: 71
      -
        command_digest: "sha256:1df18d3ae1f9e176478c763b73fac5a1fafcd8a8278ecb323d858b04f09ba98f"
        id: "result:sha256:06fe8db5f0d9463873a82828ebf958927025adb8df76dd896245566937e432c4:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:06fe8db5f0d9463873a82828ebf958927025adb8df76dd896245566937e432c4"
        occurred_at: "2026-09-18T18:21:01.113Z"
        payload_digest: "sha256:3c09392ea792a6e6fef8799b69c5ce1f9486ab40a3aaa4cf1ddbcf1fdd83845e"
        task_id: "202609172016-5A9KVM"
        task_revision: 72
      -
        command_digest: "sha256:141e4f7a7c86f69a9ebd4e74bc225778335109a57b095cd2e58c42727a4c48ee"
        id: "kernel_work_item_inspection_required:sha256:085a580ca7a9f0b6ecb00bf9430c6e8207ef0e0aa9305b62c83e20d8a552e120:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:085a580ca7a9f0b6ecb00bf9430c6e8207ef0e0aa9305b62c83e20d8a552e120:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
        occurred_at: "2026-09-18T18:21:04.692Z"
        payload_digest: "sha256:b5c1e3852767e763689cfdbb3420c7430ee0adbb3f76689f0637445e3fd33ed1"
        task_id: "202609172016-5A9KVM"
        task_revision: 73
      -
        command_digest: "sha256:09f42a1ef82c70e37a30250f7c8ac85c4e2ae23ff897d7f8e2ba2d2ac149572e"
        id: "validation:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec"
        occurred_at: "2026-09-18T18:28:20.090Z"
        payload_digest: "sha256:b5158105fd0945de83638a8e63add32c3f25eacafdb50b42df4f0a554e7cb1da"
        task_id: "202609172016-5A9KVM"
        task_revision: 74
      -
        command_digest: "sha256:36453d11f3d242cb3593332c50f060b36f19452cbc8fb090a880c88db9e6f736"
        id: "validation-resolution:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:c885af75a7e331d14a8ab4fc7472ff19ea19506a8d16970a1fbbaa112b8aadec"
        occurred_at: "2026-09-18T18:28:22.296Z"
        payload_digest: "sha256:96ca2c49c09734ae7ab2da62c677a35d0a62770b12627f74f15d72a48762c9a7"
        task_id: "202609172016-5A9KVM"
        task_revision: 75
      -
        command_digest: "sha256:fbf128111603239087d34de2f27a2cb537e3df76b55796f28c108e364561f6dc"
        id: "kernel_work_item_rework_claim_required:sha256:4428e2e093c2acf4893a8a5b062b14ea7c63bb02166fc1102125c716d2b33825:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:4428e2e093c2acf4893a8a5b062b14ea7c63bb02166fc1102125c716d2b33825:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
        occurred_at: "2026-09-18T18:28:26.528Z"
        payload_digest: "sha256:31978fb432bc4b25d6d267e138e01022e0f316fe9783dc8b5cc475166e4e3d8b"
        task_id: "202609172016-5A9KVM"
        task_revision: 76
      -
        command_digest: "sha256:f1822eae47cf99151efca16172db89fb249b795027caf2c072d641c4d8bcef58"
        id: "kernel_work_item_execution_required:sha256:d2c57626953c45a6c065e1bac06240c6b07ae90f8f5359e0003c73121ff243fb:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d2c57626953c45a6c065e1bac06240c6b07ae90f8f5359e0003c73121ff243fb:sha256:76c8f5f9c5aab9331f5654a2517175432cef1bbed4a29a8ec8f226ff4a32b200"
        occurred_at: "2026-09-18T18:28:29.988Z"
        payload_digest: "sha256:84ba2212bc35d3881c24ad5b26a3a1b75e985eb876f5cfe430544d68a123f3df"
        task_id: "202609172016-5A9KVM"
        task_revision: 77
      -
        command_digest: "sha256:e073e012d0d766a11b9d9462cae8d76e90a1fe92f43c9646b4668cc699aa07d1"
        id: "sha256:2838fb3fad9be77009bea28b7df81d3f7bc2b4807c452cf4a73a68da2b66bc3f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2838fb3fad9be77009bea28b7df81d3f7bc2b4807c452cf4a73a68da2b66bc3f"
        occurred_at: "2026-09-18T18:33:21.979Z"
        payload_digest: "sha256:53a1d94a947b753c028e4995a529ed5d9113e48b75d577567cbc8c27dc6a1e59"
        task_id: "202609172016-5A9KVM"
        task_revision: 78
      -
        command_digest: "sha256:13018808894b52796f2e71897981993334f0fc7bb41e980d036c3a7aec75350a"
        id: "result:sha256:3668cd9c41cbca40edc5d72e26bc4189ba255547ff7c0f5e2735ef428f54f953:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:3668cd9c41cbca40edc5d72e26bc4189ba255547ff7c0f5e2735ef428f54f953"
        occurred_at: "2026-09-18T18:33:26.438Z"
        payload_digest: "sha256:87c9d749f79f04a94e07e9845e56968ef00e0c9e3e236448419a5885e5e1f885"
        task_id: "202609172016-5A9KVM"
        task_revision: 79
      -
        command_digest: "sha256:c1d098dc5d83d92854278f187da94c65dc78c99f2eb6dd0a06679440a00e8703"
        id: "kernel_work_item_inspection_required:sha256:289b835dd75ff6ac807218a692ca2e63cb400138204e7ea754ef4c904869bf27:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:289b835dd75ff6ac807218a692ca2e63cb400138204e7ea754ef4c904869bf27:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
        occurred_at: "2026-09-18T18:33:30.000Z"
        payload_digest: "sha256:6215d74f6748cdb78013a5b43cff756f904381a9068e419c0c650244b31e0a31"
        task_id: "202609172016-5A9KVM"
        task_revision: 80
      -
        command_digest: "sha256:3ffde266f04fcc0f28b5c4143e16a85e3799a9662a923086c129321a741f9b8e"
        id: "validation:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b"
        occurred_at: "2026-09-18T18:40:49.588Z"
        payload_digest: "sha256:0d7a90d1421de4f22acbf56941a0d112580afd2ec14e3ed9d940791963559faa"
        task_id: "202609172016-5A9KVM"
        task_revision: 81
      -
        command_digest: "sha256:4ad3c0ac7a753f261912c45768b12cf4c844f46391eb064066aaa4694ae7861f"
        id: "validation-resolution:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9685281618ad908b6862fdff403376112feba9f442061fe633e4b9a53b1f000b"
        occurred_at: "2026-09-18T18:40:51.822Z"
        payload_digest: "sha256:a5123c6a1976cd82678aad408df20145549480b169029f73c70411ceaa06e9fe"
        task_id: "202609172016-5A9KVM"
        task_revision: 82
      -
        command_digest: "sha256:afae1c47a4ed6a155d79c93327c7fe82b0f2bc56eef8cfdb4f9cfcf6f4bd818c"
        id: "kernel_work_item_rework_claim_required:sha256:f9e0c7234c4ee5b697c8678ae42c42e77748e7ec35b5db2b2cebf56d7d0b1fe8:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:f9e0c7234c4ee5b697c8678ae42c42e77748e7ec35b5db2b2cebf56d7d0b1fe8:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
        occurred_at: "2026-09-18T18:40:56.072Z"
        payload_digest: "sha256:ade48133883f8a35e548486afd95eff5c45c8bf74f0a39885330c4cdfd27f6a6"
        task_id: "202609172016-5A9KVM"
        task_revision: 83
      -
        command_digest: "sha256:c30b640ba48d47df9c3038cc8e5aa73f6eb49d4635d2a1c9b9e15aef8a5e6c75"
        id: "kernel_work_item_execution_required:sha256:f08d6699284bd752951323357e33ef45f821596fa8172876203a1f6010022e42:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f08d6699284bd752951323357e33ef45f821596fa8172876203a1f6010022e42:sha256:03aefefe2d457110855e8d60bf52f872f3cc2008cc494da7c1c2358c2bb13e42"
        occurred_at: "2026-09-18T18:40:59.346Z"
        payload_digest: "sha256:1873970bc4b3fd428cbe6fa0fd824c12e3fdb54b73d35290a057ae3490fe47e8"
        task_id: "202609172016-5A9KVM"
        task_revision: 84
      -
        command_digest: "sha256:5268abf02d3ea0d0235bb49365bcc4eed08ba42d8b84eeccaf44afc847a678e5"
        id: "sha256:ef976cbcce0a480049c2ff7356dba4b41b49b17f433447a32f57139e4c86bd8e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ef976cbcce0a480049c2ff7356dba4b41b49b17f433447a32f57139e4c86bd8e"
        occurred_at: "2026-09-18T18:44:29.368Z"
        payload_digest: "sha256:b5a3fe5123458db57a9243f93672bed269735d2a9c631660b45294a12b3ff46e"
        task_id: "202609172016-5A9KVM"
        task_revision: 85
      -
        command_digest: "sha256:4aa0a899879f571c4fda69a1bfeb8546c8a22ed85719251dae03b2f24d954c9a"
        id: "result:sha256:a2a68a79cc44e9478a4cb83a1e335731b4d9333301018a260a0d33339cbddf3e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a2a68a79cc44e9478a4cb83a1e335731b4d9333301018a260a0d33339cbddf3e"
        occurred_at: "2026-09-18T18:44:33.877Z"
        payload_digest: "sha256:9fec11c256364b21b97c4607d40e557f9d15ec717ae75e029a2e2d7952947ca0"
        task_id: "202609172016-5A9KVM"
        task_revision: 86
      -
        command_digest: "sha256:b0e1d7f4c540b4722a4f11378ea565c67ae5be52ec4abbf9b4eba7e17ce3d6ce"
        id: "kernel_work_item_inspection_required:sha256:16a8367a7ad93bc1b9d73c8206fc2a50ea9d62819b586e9795c7d5749eca0892:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:16a8367a7ad93bc1b9d73c8206fc2a50ea9d62819b586e9795c7d5749eca0892:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
        occurred_at: "2026-09-18T18:44:37.336Z"
        payload_digest: "sha256:4f3df77266f934b24b193531155a64508a7fc429b27ff90171895cb2c26bef7e"
        task_id: "202609172016-5A9KVM"
        task_revision: 87
      -
        command_digest: "sha256:b1832209c75389d44145285cf00ed09eefc270aa7e423583a3253953d69aa171"
        id: "validation:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51"
        occurred_at: "2026-09-18T18:52:24.905Z"
        payload_digest: "sha256:f3b0db895381ced165a624b5fd3b3431e808be3efe80fd48f4e8d7b140f582cd"
        task_id: "202609172016-5A9KVM"
        task_revision: 88
      -
        command_digest: "sha256:074148d9e579d6230b865da46bf7282ce39539c1ba0abfe310081bb2e12e2207"
        id: "validation-resolution:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:c28d42e2d4246aa820aa6a5eb0d87bca3e5b8210ba97d020033d49f4efb36b51"
        occurred_at: "2026-09-18T18:52:27.161Z"
        payload_digest: "sha256:a667a0534249b9baa7375298a3879bbe7fec5279bd5bd4164e75e9e82058a40b"
        task_id: "202609172016-5A9KVM"
        task_revision: 89
      -
        command_digest: "sha256:7c1f90292707813ffb7091efcfb7f3533dc2aad54dc15986266475a362133123"
        id: "kernel_work_item_rework_claim_required:sha256:d075ee676a6e99d6f93bca5c1b7f73a242bc6247e024ada672d1c3005176a324:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:d075ee676a6e99d6f93bca5c1b7f73a242bc6247e024ada672d1c3005176a324:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
        occurred_at: "2026-09-18T18:52:31.566Z"
        payload_digest: "sha256:aa0f8579f93c7e0ba180b83911f7088f83b00ce7a93098f84201a541ace52ead"
        task_id: "202609172016-5A9KVM"
        task_revision: 90
      -
        command_digest: "sha256:b2b0f7d81965d4eb0da231d6a13b49178ee6ea41bd17c8dedb55644a2d651966"
        id: "kernel_work_item_execution_required:sha256:7e46fa43038a52031ce2201926d72e89f4d262c5b671fead001bb045a8d6bbb4:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7e46fa43038a52031ce2201926d72e89f4d262c5b671fead001bb045a8d6bbb4:sha256:59b6f9ed1b4f4e133a274cf02ecf23050f65fe2ec9c08c8dab3ec0bad433362c"
        occurred_at: "2026-09-18T18:52:34.903Z"
        payload_digest: "sha256:3e47fbd0a34294b5fe8c4dd7744b0c51d40d91cbc982dd99f689f7cffdb80694"
        task_id: "202609172016-5A9KVM"
        task_revision: 91
      -
        command_digest: "sha256:5e17524118ac140c56966b7f625ffafc64cb14bc7343ba35e27d212982fb6669"
        id: "sha256:7abe82731217316d54601bdbe1104c700f3ac6cd71931e62ed179985e7913910:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7abe82731217316d54601bdbe1104c700f3ac6cd71931e62ed179985e7913910"
        occurred_at: "2026-09-18T19:01:28.320Z"
        payload_digest: "sha256:7c6b9f95da3dc666e34083bd8282094a77da58875839e7bdfee770e57fc58210"
        task_id: "202609172016-5A9KVM"
        task_revision: 92
      -
        command_digest: "sha256:71cb9863ea1db8bbd39378e1e867296c62c60a145a4a5c55411d677de71a2c20"
        id: "result:sha256:9082cd1dbab340b05708cd9281919287cff9b8d284a71e3f19c6f7478fd021ea:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:9082cd1dbab340b05708cd9281919287cff9b8d284a71e3f19c6f7478fd021ea"
        occurred_at: "2026-09-18T19:01:32.963Z"
        payload_digest: "sha256:8a5da9c32e8a4982960049b49d3e4cea94e59401b227f270dad4c942ccab8c21"
        task_id: "202609172016-5A9KVM"
        task_revision: 93
      -
        command_digest: "sha256:391825ea5a6b9aef23dd5924900de5714eb091590b5158da266b9c70d76bca73"
        id: "kernel_work_item_inspection_required:sha256:50a44a5bf366e563be95afbd65ca4e4c7ff56ac43b8743ded964a34408c151d2:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:50a44a5bf366e563be95afbd65ca4e4c7ff56ac43b8743ded964a34408c151d2:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        occurred_at: "2026-09-18T19:01:36.515Z"
        payload_digest: "sha256:9f00fc8396f26cf701bc05e46c51d41881db60a25b107432715eb5f701a1f325"
        task_id: "202609172016-5A9KVM"
        task_revision: 94
      -
        command_digest: "sha256:4d493973572fd3eb82c89c27cf780e89c7c64e953f780d975808c11da33d3baf"
        id: "validation:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88"
        occurred_at: "2026-09-18T19:16:41.026Z"
        payload_digest: "sha256:6ed488583b4f49d260cf4db412ba43fd44334d00357bbd75c6533ec3b730a69d"
        task_id: "202609172016-5A9KVM"
        task_revision: 95
      -
        command_digest: "sha256:ae00584d9b6a01cc66c1e4e9e81f1222d299dbb83ebad546e10a9ae03563db11"
        id: "validation-resolution:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:a40ea44d1da35051b26d21aba0982265c0cd51c88c3c26ceb13a467b9569ff88"
        occurred_at: "2026-09-18T19:16:43.348Z"
        payload_digest: "sha256:9c2653849ef2bade961401a3e11c1894cae0468c6fc1cafa77ee96c6a56e6ff5"
        task_id: "202609172016-5A9KVM"
        task_revision: 96
      -
        command_digest: "sha256:99de49abc7379e0d3d54cfe5df802689a84bc06a758847a73a4f58648ba9a137"
        id: "kernel_work_item_rework_claim_required:sha256:717f1d32e722c9007aaf06b265dc235b64b7d5b0d02b43609fae4c4a5f21046d:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:717f1d32e722c9007aaf06b265dc235b64b7d5b0d02b43609fae4c4a5f21046d:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        occurred_at: "2026-09-18T19:16:47.667Z"
        payload_digest: "sha256:12b77ef24225c35e2f647c08a5088893139676adf0fc3ab2e06f98b7e7601e67"
        task_id: "202609172016-5A9KVM"
        task_revision: 97
      -
        command_digest: "sha256:a402cbd93878c60d9f3eb33c23650827d6045fdc099b345801b3b96dd3de1eaf"
        id: "kernel_work_item_execution_required:sha256:4122a838eff8edd1e1bf0825cee2e638ee94a174aeb77952089c670fee67c8b4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4122a838eff8edd1e1bf0825cee2e638ee94a174aeb77952089c670fee67c8b4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        occurred_at: "2026-09-18T19:16:50.952Z"
        payload_digest: "sha256:c1e023812a14084522bc5c53b1a2b370d1957d72cd4744f3e50062e785d008c6"
        task_id: "202609172016-5A9KVM"
        task_revision: 98
      -
        command_digest: "sha256:0377bf62d6cbcf2b3b73e7d4e72c73c510fd00f2545d0c49340cb2f8395bb018"
        id: "semantic-stop:sha256:72d3a0cbfb2415a0d8e3fdf94c0fc5a4fee2a9985abbf95a6c562887ccf54853:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:72d3a0cbfb2415a0d8e3fdf94c0fc5a4fee2a9985abbf95a6c562887ccf54853"
        occurred_at: "2026-09-18T19:18:56.041Z"
        payload_digest: "sha256:5583b0225b1f78f895b6068784b238279be5961b523f271b6918bc8c20ade1cb"
        task_id: "202609172016-5A9KVM"
        task_revision: 99
      -
        command_digest: "sha256:1509a818bfd2042e7dedfc954b2d95f6b0f5db4e2dd10191c597081ed0ca0fc2"
        id: "amend:sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:11d5f55cf62d737d18c0bb79126cfe15cfad03fab2101d4056d3149d4e391be9"
        occurred_at: "2026-09-18T20:24:07.832Z"
        payload_digest: "sha256:f4801f777c77d69f867dce7deacd64898b4209c0655a5ecc31cd939ac47fa57e"
        task_id: "202609172016-5A9KVM"
        task_revision: 100
      -
        command_digest: "sha256:196cd730e1ade8b6e8a49e43cb49f141873f973e5e68b9e893e7e62826448d51"
        id: "sha256:24501c9f32844885dc04ce7c12916dc3c09ffdacd85c7718243c228c8c9f8087:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:24501c9f32844885dc04ce7c12916dc3c09ffdacd85c7718243c228c8c9f8087"
        occurred_at: "2026-09-18T20:24:10.189Z"
        payload_digest: "sha256:6d117424f23f893864228faf5566772ad95ca13471e8eecc8130599dd9984b76"
        task_id: "202609172016-5A9KVM"
        task_revision: 101
      -
        command_digest: "sha256:f9b71b9e0aa57fb23603af83899022f0d203a95dcb2ac70029dcf45e47a737db"
        id: "kernel_work_item_claim_required:sha256:e6fb110f8fa92cf7379467cbdb586b76552b0629003926b589cfcdd8c8ee7ed4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:e6fb110f8fa92cf7379467cbdb586b76552b0629003926b589cfcdd8c8ee7ed4:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        occurred_at: "2026-09-18T20:24:20.434Z"
        payload_digest: "sha256:cf8a2148b487a801169bfda2cd8b476040c7b342abe7ac306f09228427ddcdc3"
        task_id: "202609172016-5A9KVM"
        task_revision: 102
      -
        command_digest: "sha256:ab23ae8b48bf1b7f6f12add5e7e7abba2f400bea2953d17f672226b4015e9072"
        id: "kernel_work_item_execution_required:sha256:cb0c1adc4224833f9060020685291e6e99c5efebc41c5d97bc31dcdce2a6b70e:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:cb0c1adc4224833f9060020685291e6e99c5efebc41c5d97bc31dcdce2a6b70e:sha256:b220a08d67cc2df8de49ed941c2c2e06748de8d76d9c0f92b0d1fee7869636bc"
        occurred_at: "2026-09-18T20:24:23.868Z"
        payload_digest: "sha256:cb5b9ee3228bea4163323734af8a48de29a202650dadeef06a5a8218db7dea2c"
        task_id: "202609172016-5A9KVM"
        task_revision: 103
      -
        command_digest: "sha256:360b95cb9e2e9285b602737195921cf4fa5d709ba8cabbb3b0618f5049b35dbe"
        id: "sha256:a22ebc99f97aba4bc52fad174d427035101db5eb6aeadf3b931e0350891d3d26:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a22ebc99f97aba4bc52fad174d427035101db5eb6aeadf3b931e0350891d3d26"
        occurred_at: "2026-09-18T20:48:53.093Z"
        payload_digest: "sha256:ec241489e58819bfa93d38514b725f1118aca4455e6d06fa107c4410bc948b8d"
        task_id: "202609172016-5A9KVM"
        task_revision: 104
      -
        command_digest: "sha256:9cfcbb884d1db3b5a56e0d8595ad4c280c3df9c6719a8be726868d1b2ed57b91"
        id: "result:sha256:79a9818aed1cc38e5c587886ecf81864d54da4da3de218b68519230ad7455100:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:79a9818aed1cc38e5c587886ecf81864d54da4da3de218b68519230ad7455100"
        occurred_at: "2026-09-18T20:48:57.876Z"
        payload_digest: "sha256:923a2ad7995765da5fb85304ccc43c37e3d981eb924869aeb982645db551bcd2"
        task_id: "202609172016-5A9KVM"
        task_revision: 105
      -
        command_digest: "sha256:0f0c08ce141015cfc0cc78c01826344cad39f10caf9426372e9a2d4c4f47c87a"
        id: "kernel_work_item_inspection_required:sha256:a25b2822e9b13f70dd0486e0c0550c735c3791ef9966020a1bbc9f90946c565d:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:a25b2822e9b13f70dd0486e0c0550c735c3791ef9966020a1bbc9f90946c565d:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        occurred_at: "2026-09-18T20:49:01.560Z"
        payload_digest: "sha256:a0bc2fb4beda4c019bb13e7aef680b89bc1cc1ea4ee41b6307d8934def4aa2d3"
        task_id: "202609172016-5A9KVM"
        task_revision: 106
      -
        command_digest: "sha256:20c830e6634d4a9cd7bac56b93d47b487159b5bd123dc0662ac8cb3d52441e48"
        id: "validation:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd"
        occurred_at: "2026-09-18T21:04:52.734Z"
        payload_digest: "sha256:b515929696cf5ff9236570f80b1ebbe18b7b3765f52e4d67ef6d0b30e532ab85"
        task_id: "202609172016-5A9KVM"
        task_revision: 107
      -
        command_digest: "sha256:d0e448d5ab14f554e2b4dfad019369f188014a6312da6e18abd65953198e94e5"
        id: "validation-resolution:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7c5a318d6918aec4a40deb1373b9e8f19e062db5972a7b2522ffbb4cff2867bd"
        occurred_at: "2026-09-18T21:04:55.100Z"
        payload_digest: "sha256:a805bf485a89265d0c1e08fa5673eef24be0cbe980f21f722e11f693acf9be9d"
        task_id: "202609172016-5A9KVM"
        task_revision: 108
      -
        command_digest: "sha256:7211d854ed8a8bc83b1720daa72d060bedc3dca5a4329724f3c4d7c269151d58"
        id: "kernel_work_item_rework_claim_required:sha256:4f296ca99b564277dac072ecd8d3eddddc688bbd7acd074997d481fa57221785:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:4f296ca99b564277dac072ecd8d3eddddc688bbd7acd074997d481fa57221785:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        occurred_at: "2026-09-18T21:04:59.625Z"
        payload_digest: "sha256:3851855c5395fc491e39ebf228e6ae6555dcdae6c264ebc886d12c525812fbb8"
        task_id: "202609172016-5A9KVM"
        task_revision: 109
      -
        command_digest: "sha256:1f5e0982e6671152b78b5db5e35ca91c3d1045044a58d0a494687fcce2d197b1"
        id: "kernel_work_item_execution_required:sha256:b14262a31b316db9fa235a7ae987a9cb1c091e55fe35ae52cee10ba7746950fb:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b14262a31b316db9fa235a7ae987a9cb1c091e55fe35ae52cee10ba7746950fb:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        occurred_at: "2026-09-18T21:05:03.162Z"
        payload_digest: "sha256:f72bf52fe50e45ff60dc0aa2988b36af70e8b13f8bf5615fdd53b88fe8e52a36"
        task_id: "202609172016-5A9KVM"
        task_revision: 110
      -
        command_digest: "sha256:95c23f67110456f8198d6edd8dc98f45f942ec2e1b2250a216f2ed0f09b7f4fa"
        id: "semantic-stop:sha256:2ae9ea965457c041b05032754acec7165aaafd8ab7084227d39f84b4abc5d0b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:2ae9ea965457c041b05032754acec7165aaafd8ab7084227d39f84b4abc5d0b6"
        occurred_at: "2026-09-18T21:06:01.373Z"
        payload_digest: "sha256:bf50ae11fbdbcb96ba8883b95102e492d738c8def9b22a8ba9fc45f08e8cf1f9"
        task_id: "202609172016-5A9KVM"
        task_revision: 111
      -
        command_digest: "sha256:2c926836042f9d4acaf7d92a99af3ce0192c24c7cad53631b24a718228640f45"
        id: "amend:sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:a06bda5a2fd48a81425b59516ac203277dd4a27560854b1d73dd96960ff22e29"
        occurred_at: "2026-09-18T21:25:32.414Z"
        payload_digest: "sha256:1adc3887982d1ac8018579bdca4e83dbe3cf0fd5eb3b170713046598c47bb6d4"
        task_id: "202609172016-5A9KVM"
        task_revision: 112
      -
        command_digest: "sha256:95ac0bc5fdbd852d6f836c0a3fdfff9170ddd0c645d0a059faba2cbb3030c69f"
        id: "sha256:1c3187aac6653bd51eabc8aaebcecf5c1beea7c49945e05860988ae90ab07ccd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1c3187aac6653bd51eabc8aaebcecf5c1beea7c49945e05860988ae90ab07ccd"
        occurred_at: "2026-09-18T21:25:34.839Z"
        payload_digest: "sha256:6db957a2514e0f1fcc399b470c13388d0ce70d1b7be0ede29fb7f7cace609100"
        task_id: "202609172016-5A9KVM"
        task_revision: 113
      -
        command_digest: "sha256:3248c583c036cc23b655a0fb72a5eb897ab20372fef1116a2cf2876922a7c5d9"
        id: "kernel_work_item_claim_required:sha256:0bd4c5bd67cf720ffe286b41730383705f70241d69060346697eee26caec2933:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0bd4c5bd67cf720ffe286b41730383705f70241d69060346697eee26caec2933:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        occurred_at: "2026-09-18T21:25:47.276Z"
        payload_digest: "sha256:93980568165c5ff01397fc7d3b08a1d62457a45afe7f5b9fca0b9f37ec709067"
        task_id: "202609172016-5A9KVM"
        task_revision: 114
      -
        command_digest: "sha256:c1e18e32c11214f30e3b63406ed2bd6e52b77c97f0d98e8f06b4dc91c2ad0511"
        id: "kernel_work_item_execution_required:sha256:b6c4710398a7b61a2fa9056534092a16b92a4a5ab780690e64232c6011b6d847:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b6c4710398a7b61a2fa9056534092a16b92a4a5ab780690e64232c6011b6d847:sha256:3baae2eb42e3702a97e502cd92f793aaca3d07e32e5734d88f2027b3b43b8d1e"
        occurred_at: "2026-09-18T21:25:50.828Z"
        payload_digest: "sha256:0167921e0e206b3b0703f5f883c941a06585f61a4c15e2bbcf3b3b0e910e2262"
        task_id: "202609172016-5A9KVM"
        task_revision: 115
      -
        command_digest: "sha256:6505afd56b63cfcbb06132a65188730da0ca425a2478760a9ef83b1a22c6bf43"
        id: "sha256:16846f2f78e98ced9c385bfd2007e53c07cbca47844f31293fcce7d1515eafaa:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:16846f2f78e98ced9c385bfd2007e53c07cbca47844f31293fcce7d1515eafaa"
        occurred_at: "2026-09-18T21:56:57.049Z"
        payload_digest: "sha256:c65ee05ab2d3ccd81d80d23c137fdeaac213bdb2e094e78a9ab3a65483d51e8d"
        task_id: "202609172016-5A9KVM"
        task_revision: 116
      -
        command_digest: "sha256:0130ca1e9ead3d87b93609a9f6f2b09baea293c66c0e360c081d201e743d29ed"
        id: "semantic-stop:sha256:1d76bdf2e94c7c5d04d1dd51cf2c4e76bc73ab317f8e63854f57a57989029440:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:1d76bdf2e94c7c5d04d1dd51cf2c4e76bc73ab317f8e63854f57a57989029440"
        occurred_at: "2026-09-18T21:57:00.570Z"
        payload_digest: "sha256:8370f411e204ebd746c55f5312906fadfbfe2fd028da921f0adeb4caece0b884"
        task_id: "202609172016-5A9KVM"
        task_revision: 117
      -
        command_digest: "sha256:482bab18edee7c64524bf8758487ff3970c49fb33dedd6706b38f2e3ab5fcc37"
        id: "amend:sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:1e2064b7f0b1b0ff6c05cec4a9cb2ac2c8c93bc82d8f25b52c91970c6b2c184a"
        occurred_at: "2026-09-18T22:00:06.257Z"
        payload_digest: "sha256:80ccd81d14695bf86cdfa564ab06ae6715ba2091732645383f1a5a386dcf3571"
        task_id: "202609172016-5A9KVM"
        task_revision: 118
      -
        command_digest: "sha256:137f9b06ad5c08f763194919af3d3f9bd937a4a744660fff9f7e4b450085b7a9"
        id: "sha256:83a2c4db0bd32b954a8d1faff9e7060fcf3f5c710e0e13f6d9bbea5bc0c0928f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:83a2c4db0bd32b954a8d1faff9e7060fcf3f5c710e0e13f6d9bbea5bc0c0928f"
        occurred_at: "2026-09-18T22:00:08.687Z"
        payload_digest: "sha256:77c6ef0b70a5aa556cda61bb0b718634f50bd2cf43ee9218e1db9df8d3759af8"
        task_id: "202609172016-5A9KVM"
        task_revision: 119
      -
        command_digest: "sha256:f1c71426cb26c9a33d76b17ef2df3082c2b6dbb8d739c4970b548c87f42ed3e5"
        id: "kernel_work_item_claim_required:sha256:5026d1d6490ff9b585451ce1ca5b231a8a8f8026230d4c8434a676c036b75c4c:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5026d1d6490ff9b585451ce1ca5b231a8a8f8026230d4c8434a676c036b75c4c:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
        occurred_at: "2026-09-18T22:00:44.139Z"
        payload_digest: "sha256:b2e5c709eecd986aa8465821680e95e4557f8f0e51ed44ef9f17a24ea819a0db"
        task_id: "202609172016-5A9KVM"
        task_revision: 120
      -
        command_digest: "sha256:16bf0356ac5f2a32d6cd84e0a00da4b6fb5c72da6487aabd8ef67345f9d286b7"
        id: "kernel_work_item_execution_required:sha256:f7571f43914c500c983d84ea6d3aa3c079f25e7d519212bbf781a2aae6267462:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f7571f43914c500c983d84ea6d3aa3c079f25e7d519212bbf781a2aae6267462:sha256:8ce988059fa5b0998bd7650a3668db94b74df3ef2478a76d73cd8adcb34186d6"
        occurred_at: "2026-09-18T22:00:47.671Z"
        payload_digest: "sha256:3e0ef55ae51b33c5f036a78c54789da9018bd0ec65056a7b495697e2c73a1a6a"
        task_id: "202609172016-5A9KVM"
        task_revision: 121
      -
        command_digest: "sha256:04ce4b90ae8c7b2d4ac594414867df7fda4efba9df006cf9decdc565da7ddd77"
        id: "sha256:43bc27b7ce673e14b10f31f9456a87da0b6586a9da8f1a1415a6ef2336232e13:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:43bc27b7ce673e14b10f31f9456a87da0b6586a9da8f1a1415a6ef2336232e13"
        occurred_at: "2026-09-18T22:10:07.809Z"
        payload_digest: "sha256:3498b9d5f5679bc57f0a6c54cdcb2b6e56ce5e130cba27f630a345fdee138247"
        task_id: "202609172016-5A9KVM"
        task_revision: 122
      -
        command_digest: "sha256:c19fcd5849d93d15743f078c489d142d0b7ca48292927d7cf02e85595001f07b"
        id: "semantic-stop:sha256:833138fc6ad49c7b36a5477067365e1aa845234909e277235a9e039fb76e43d3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:833138fc6ad49c7b36a5477067365e1aa845234909e277235a9e039fb76e43d3"
        occurred_at: "2026-09-18T22:10:11.356Z"
        payload_digest: "sha256:8fe3670303f97206f02ff7fd1c5a264795a96af7bd922115757cc961d803c71d"
        task_id: "202609172016-5A9KVM"
        task_revision: 123
      -
        command_digest: "sha256:9d4306f3fd2b5b8e3273c69aae2444e70cfcfbcf31f1589449f56074a0ca61e7"
        id: "amend:sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:c545a900b67f8ac3b350737403d3f9f523ec11a5bb4f21d3144ad02cc4ac3e5e"
        occurred_at: "2026-09-18T22:10:25.387Z"
        payload_digest: "sha256:9bc09f6cfeab14821090cba8d7fb15bfa3db651a1bb844ce16d4e0dfc0d0dd80"
        task_id: "202609172016-5A9KVM"
        task_revision: 124
      -
        command_digest: "sha256:ed72b438898827524ca1c1f04e365f1093c7588d4a69f34af5d4b25512cabc90"
        id: "sha256:9f95db9ef5c96626935e11db4f8810e123a432cab1dd4a0d60d80fe6c7aa91a8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9f95db9ef5c96626935e11db4f8810e123a432cab1dd4a0d60d80fe6c7aa91a8"
        occurred_at: "2026-09-18T22:10:27.895Z"
        payload_digest: "sha256:639b5d43473213833a9d7c629e80e4ab394c86c2c5f42ab6aabc2592b3d13a03"
        task_id: "202609172016-5A9KVM"
        task_revision: 125
      -
        command_digest: "sha256:5237cdc0fb1c63ab9da0b10119fcf405467f7a6082fba5585364de41ca95de49"
        id: "kernel_work_item_claim_required:sha256:42a5bb9e9e4b8239ab1f13b454cea3efa080985b1cf80e43ad5f1ee3822adabb:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:42a5bb9e9e4b8239ab1f13b454cea3efa080985b1cf80e43ad5f1ee3822adabb:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
        occurred_at: "2026-09-18T22:10:38.239Z"
        payload_digest: "sha256:8840d0c9718d1dc4c43dfaae2a6b3f28c64b892d32894cacd67b6e182b362177"
        task_id: "202609172016-5A9KVM"
        task_revision: 126
      -
        command_digest: "sha256:50806a95f74f1bc307b8d73b968312224b45096406e4ba701307b08ae2052a1b"
        id: "kernel_work_item_execution_required:sha256:419d70b464cdcf5e45fb6f9b7c22e40a7d4d5f9eca5180e3aa1437517c7b7acd:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:419d70b464cdcf5e45fb6f9b7c22e40a7d4d5f9eca5180e3aa1437517c7b7acd:sha256:2f829fa18622b4d16d7f69aa862791dd1fa4b185efa3525659a676f3a7f03275"
        occurred_at: "2026-09-18T22:10:41.868Z"
        payload_digest: "sha256:dc0df4cc990fa7d489459b5a26a8422107f4cefaa01b58a22838f5ff3e934d5b"
        task_id: "202609172016-5A9KVM"
        task_revision: 127
      -
        command_digest: "sha256:c124edc4ec5b8ee8c5feb03169c52dd85004f61a81a7d397c70c980b49e47e2c"
        id: "sha256:d5b7e8745e15050084d59b8e2fb5f56b3c66511780102726c3b5e2c987666d86:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d5b7e8745e15050084d59b8e2fb5f56b3c66511780102726c3b5e2c987666d86"
        occurred_at: "2026-09-18T22:37:56.297Z"
        payload_digest: "sha256:33ecee09deafd4af8f107b98e547e53580051fe9ee85ee5967cd2d598caf38da"
        task_id: "202609172016-5A9KVM"
        task_revision: 128
      -
        command_digest: "sha256:a734e98e15e18c79aa93d5f0d3b2c15f9f3c13a9279721b63830067ba148b337"
        id: "result:sha256:4e5b283096d6c931491dcfd4697c7793360abf2182c033a04ff56015977ff26e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4e5b283096d6c931491dcfd4697c7793360abf2182c033a04ff56015977ff26e"
        occurred_at: "2026-09-18T22:38:00.968Z"
        payload_digest: "sha256:f931fcf641f78814a7ba35efd7f93d37146f22e71e016613d103f9871b8b01bb"
        task_id: "202609172016-5A9KVM"
        task_revision: 129
      -
        command_digest: "sha256:9d512e5ab93dc1a4d41645e848c4e8a8aea5ac964bc776bd430f5daf2bdac8dd"
        id: "kernel_work_item_inspection_required:sha256:fc38fdbe13a7ad19fea9cd92626e93744a2220724a0302cb637dceacc9843815:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fc38fdbe13a7ad19fea9cd92626e93744a2220724a0302cb637dceacc9843815:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
        occurred_at: "2026-09-18T22:38:04.704Z"
        payload_digest: "sha256:56611d1de70f1484300eca84ec2097f03bbdbd0752c5fdde82a330fce266d195"
        task_id: "202609172016-5A9KVM"
        task_revision: 130
      -
        command_digest: "sha256:263a9801be1115157435f9c434187442d6f1bb148859612f8746334a7820878d"
        id: "validation:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009"
        occurred_at: "2026-09-18T22:40:01.187Z"
        payload_digest: "sha256:c799ab6498bee3d886f6eb68e7ecdf1e765dffee6552ca1e92cea2ef31b3acc5"
        task_id: "202609172016-5A9KVM"
        task_revision: 131
      -
        command_digest: "sha256:0dcec9c16c5f9c46349a331a2bd14e37a2ef5662f1b5375c5fab6a758a6daaff"
        id: "validation-resolution:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5f3da5d21189c1a3f52cec99d6c2d9b0ff0353fd156b956f10ebf1f817dd4009"
        occurred_at: "2026-09-18T22:40:03.652Z"
        payload_digest: "sha256:2196cf7bbdd4cc0cef17eafee80e96737df0ae4a909e101eaa2570a2c7cd705d"
        task_id: "202609172016-5A9KVM"
        task_revision: 132
      -
        command_digest: "sha256:a1265db760500ee7c5f4a6907cd64535060a1e110476b7259f0125459bcb0a05"
        id: "kernel_work_item_rework_claim_required:sha256:36f88a93610a03590ca45eb29db1590e42e668e4d86bfcbf7cf2aa173f61d437:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:36f88a93610a03590ca45eb29db1590e42e668e4d86bfcbf7cf2aa173f61d437:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
        occurred_at: "2026-09-18T22:40:08.220Z"
        payload_digest: "sha256:15251e60979dc8cf26c80975b9c103fc40b251392a833c66b9a56c7860ac2d56"
        task_id: "202609172016-5A9KVM"
        task_revision: 133
      -
        command_digest: "sha256:5c8aa71cd96e226e90ce4be144dd4e7664cf0dddbba8e5a8b66c302acd2eb093"
        id: "kernel_work_item_execution_required:sha256:226913b917c956b4e7aa3cc81b93cc32f069395f2d918a94ee0aaea1f5f85a8a:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:226913b917c956b4e7aa3cc81b93cc32f069395f2d918a94ee0aaea1f5f85a8a:sha256:4e1dd948b7679c0084cfc47a9afe7929cb17b055e77ddedbf778571c207a730b"
        occurred_at: "2026-09-18T22:40:11.780Z"
        payload_digest: "sha256:0246f57fa8ba9056eb87a8e33118a99d341b366f50213099d0976f94b5b209c1"
        task_id: "202609172016-5A9KVM"
        task_revision: 134
      -
        command_digest: "sha256:307ef619360e03b2303f42b1cca5b52a39d8598b7e4574d964df1a48e91269a6"
        id: "sha256:e92903fd7a29f371f651f57d9bb54653ce937b05f12b606083716124d5fb6f1c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e92903fd7a29f371f651f57d9bb54653ce937b05f12b606083716124d5fb6f1c"
        occurred_at: "2026-09-18T22:41:57.239Z"
        payload_digest: "sha256:9aa66aaf7d8e60d9824fef1e4a231c7d8cb64b4f156461301ebb21702377a6f2"
        task_id: "202609172016-5A9KVM"
        task_revision: 135
      -
        command_digest: "sha256:33890513367c2577739e0fce9be4bdb0b24f3ce3798ad478845e2fb530b59aff"
        id: "result:sha256:98600244cc2e9564afd0eb563ea68d9eead2c50a5dc364d20078fc6dce39a579:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:98600244cc2e9564afd0eb563ea68d9eead2c50a5dc364d20078fc6dce39a579"
        occurred_at: "2026-09-18T22:42:02.032Z"
        payload_digest: "sha256:547ce19be3b5865d7a346fdba65500ad32f9817798e55dcc5527dab9c14106d8"
        task_id: "202609172016-5A9KVM"
        task_revision: 136
      -
        command_digest: "sha256:b7c977a9633199907dcec807e1846cf8727361481366e90955d35528f0983565"
        id: "kernel_work_item_inspection_required:sha256:fecbed2db23a522dda79480cc337afce49c33f43954e1b2fcac6090c9679a512:sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fecbed2db23a522dda79480cc337afce49c33f43954e1b2fcac6090c9679a512:sha256:beed8745d659eb02c415a479c301ea7d6a3836980b4df3d2096db64e2a8b2ace"
        occurred_at: "2026-09-18T22:42:05.707Z"
        payload_digest: "sha256:787c797627dc978f0bd75cbaf8a07272253632c6031ea71ad716c83706ada927"
        task_id: "202609172016-5A9KVM"
        task_revision: 137
      -
        command_digest: "sha256:eb0c97894a3f318c46fdda095893b4855c6d730cfe6dca3e6387232c185202cd"
        id: "validation:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4"
        occurred_at: "2026-09-18T22:58:38.862Z"
        payload_digest: "sha256:aea0c3257359b243f4ce8df5e4c8bcf6492019d342534472532dd8fca76ed872"
        task_id: "202609172016-5A9KVM"
        task_revision: 138
      -
        command_digest: "sha256:c3ce3e6d9e4cb2e0d324626238f782c4a411bc1ac91fc3d0faf9bc9c2c62756c"
        id: "validation-resolution:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:927502adc444c704ec41f87b27776d84a333ebbe8ecb5ac955263612114e10f4"
        occurred_at: "2026-09-18T22:58:41.449Z"
        payload_digest: "sha256:012618840fd3385a7e3b5d71127ad08e4cdc1decdef5270df5451a6a2a9b13f8"
        task_id: "202609172016-5A9KVM"
        task_revision: 139
      -
        command_digest: "sha256:ce35f4b7121940ca8ee1dc4a3de7c1b520999817d4171055dfb00b0f1a83abcd"
        id: "final-validation:sha256:c22b17ce0b814daaf764a98d3c1bdcae6cd1fc0b8cba07ea261f01e49bb35f24:139:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:c22b17ce0b814daaf764a98d3c1bdcae6cd1fc0b8cba07ea261f01e49bb35f24:139"
        occurred_at: "2026-09-18T23:16:19.386Z"
        payload_digest: "sha256:c5bd522c7c36cff2a9777e24aaa431ad73291befdbce591ede3287b53a55aed8"
        task_id: "202609172016-5A9KVM"
        task_revision: 140
      -
        command_digest: "sha256:f901feb1e00dfacb63885e1a8a9005ebd33edc17a595678d4806ed2daa342568"
        id: "final-validation:sha256:ec311fac943cdaa6493cc5b381e01606dfd6bd09fd5d562529f03efc71cb6dfe:140:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:ec311fac943cdaa6493cc5b381e01606dfd6bd09fd5d562529f03efc71cb6dfe:140"
        occurred_at: "2026-09-18T23:33:55.530Z"
        payload_digest: "sha256:0dfbb7fbe9013ec3c65af0e5f97d3cdde0f8f949b213f7def4bb7180418e886f"
        task_id: "202609172016-5A9KVM"
        task_revision: 141
      -
        command_digest: "sha256:5f6647b720d8c73a4073136412988be43a17f90bb26092e7702979f4576f2df7"
        id: "final-validation:sha256:8496863db891fbb5d5c2282efb3548279b2a2c16c2e5b4b41c628d88b4c17357:141:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:8496863db891fbb5d5c2282efb3548279b2a2c16c2e5b4b41c628d88b4c17357:141"
        occurred_at: "2026-09-18T23:52:11.968Z"
        payload_digest: "sha256:591b6d31ec56949c7b1762c9a4491f1580908a456e90fa85688630f45d79f430"
        task_id: "202609172016-5A9KVM"
        task_revision: 142
      -
        command_digest: "sha256:a0a07b382bad61dfa4d0e5d79ace4bfa328caffd0c7f5c009e8432f06094fd71"
        id: "sha256:cb5cd723248911e826b53fc753b3b90cdd1798c46dcab3865b9d9fa4499a68e7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cb5cd723248911e826b53fc753b3b90cdd1798c46dcab3865b9d9fa4499a68e7"
        occurred_at: "2026-09-19T02:29:09.672Z"
        payload_digest: "sha256:5f64ce5daf5dde7e1fab8a4da7fd61cc3000b26a9aea7391b73cf94eaa9219d1"
        task_id: "202609172016-5A9KVM"
        task_revision: 143
      -
        command_digest: "sha256:601d736fb7957dace717d20872d7a047e579c6f00b4afa09a28733c0b9995d3e"
        id: "sha256:59efa6cce3c750592d95ab9b111071f2e3255b9438a45fdc21900bd3bb955c01:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:59efa6cce3c750592d95ab9b111071f2e3255b9438a45fdc21900bd3bb955c01"
        occurred_at: "2026-09-19T02:43:18.035Z"
        payload_digest: "sha256:5d11ec7c356cccac8c7891c4938c27bbbf368cc1fac7cafb2abc8a5c95acc9a4"
        task_id: "202609172016-5A9KVM"
        task_revision: 144
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
