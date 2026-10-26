---
id: "202610260157-ZDEE0D"
title: "Recover an approved plan when a required declared check cannot execute"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 45
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "verification"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T07:35:59.694Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-26T02:46:17.850Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:731de155276362896b92f88f54b4a1a30c0117f902411e2695474861f57967de"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-26T04:02:24.705Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "718f98eafe9b1a07f3da9aff86009cba99bddfc9"
  review_identity_digest: "sha256:a7ea915f1f71aaf36776cdec8f43f9c0dd845b70430de66e2b47f1cdd8bbb8a3"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610260157-ZDEE0D/a8ce7b2a6d81f0e419a1315dd7d98ad7299df11c50510b01289739f89e86e625/quality-report.json"
  findings:
    - "The implementation commit moves the 299-line required-check correction case from kernel.test.ts to required-check-correction.test.ts; kernel.test.ts is restored to 995 lines."
    - "The moved case retains positive correction and negative active-claim, actor, WorkOrder, receipt-key, wrong-plan, failed-check, widened-scope, multiple-change, and stale-state assertions."
    - "AgentPlane recorded successful typecheck, 71 focused tests, and hotspots:check; the previous failed full-CI evidence remains in the task trace."
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
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
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:ff8bfc8d9d3501f6546ee9263b290637f5ebd38c2e029c119e15d8800556e980"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "718f98eafe9b1a07f3da9aff86009cba99bddfc9"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-26T01:57:30.855Z"
doc_updated_by: "CODER"
description: "Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters."
sections:
  Summary: |-
    Recover an approved plan when a required declared check cannot execute

    Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
  Scope: |-
    - In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
    - Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".
  Plan: |-
    1. Execute approved WorkItem recover-nonexecutable-required-check.
    2. Execute approved WorkItem split-required-check-recovery-test.
    3. Execute approved WorkItem final-correction-948a30e490fb.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:ee39b26f84757c2ef981d7d617a6fd824ea01e4339443acb76f2f764b7d15c06"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610260157-ZDEE0D/a8ce7b2a6d81f0e419a1315dd7d98ad7299df11c50510b01289739f89e86e625/quality-report.json"
    findings:
      - "The implementation commit moves the 299-line required-check correction case from kernel.test.ts to required-check-correction.test.ts; kernel.test.ts is restored to 995 lines."
      - "The moved case retains positive correction and negative active-claim, actor, WorkOrder, receipt-key, wrong-plan, failed-check, widened-scope, multiple-change, and stale-state assertions."
      - "AgentPlane recorded successful typecheck, 71 focused tests, and hotspots:check; the previous failed full-CI evidence remains in the task trace."
    implementation_commit: "718f98eafe9b1a07f3da9aff86009cba99bddfc9"
    implementation_tree: "7930081ed031f2e3ca326de595ac2d4b53ce5a7e"
    projected_at: "2026-10-26T04:02:24.705Z"
    review_identity_digest: "sha256:a7ea915f1f71aaf36776cdec8f43f9c0dd845b70430de66e2b47f1cdd8bbb8a3"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:50badb822809b3eae1c64b48145eff0321ef526c970ba4b1acdfbbf4561e1f9f"
    work_order_id: "sha256:765c5904d9aa1c5565a74f92de16d5556603f8b8a0ae87d1cc8ae0dfb407e256"
  task_execution_context:
    base_ref: "main"
    base_sha: "cdc68137f324840b306f26b78e7c5dc9587b51e6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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
            digest: "sha256:210a90f65fa26477906250effb48edc674fffb2d37e315ca9fd27792a735e3d6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
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
            digest: "sha256:338cb70c5303d5b310950ccd7ff6f03f4dc369a94aae93e1d8ea764af4330054"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:210a90f65fa26477906250effb48edc674fffb2d37e315ca9fd27792a735e3d6"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:a2ed7ed02af58a001a49cfc2f4d1d51947350dbe0088aa4cda3e19f7d07897fd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ad21f015f998c4eeb119c70be1b1bda0790d7ff740a038000f4d5eb2f117c38e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:338cb70c5303d5b310950ccd7ff6f03f4dc369a94aae93e1d8ea764af4330054"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:4ac1bab15de7a5bca56ab91e894493e290bd50a6acd04e93ed473b7ca1d05636"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:82fdb73409a77fd39e72a5f3f2578dd1273156b4ac3371fa9f29941e4cfe2db1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ad21f015f998c4eeb119c70be1b1bda0790d7ff740a038000f4d5eb2f117c38e"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
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
            evidence_digest: "sha256:f3605a6b0f1b5a6672cbbe818cf819ec5cdd611f8709e169a737ebb84da1d249"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d4ad2c373ee5d0c1011cf11866240a2fbec0697bf891c3d3128ed58cde5fa15a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:82fdb73409a77fd39e72a5f3f2578dd1273156b4ac3371fa9f29941e4cfe2db1"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            evidence_digest: "sha256:293dff7c2169f4873f52b3b78481d6ec1f093f605a8c1bd1ab0570d6550fa891"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a363ee3990fab7240fd0a6ef6fd43ee76eb0093e37b5141e3f58c3665af216e9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d4ad2c373ee5d0c1011cf11866240a2fbec0697bf891c3d3128ed58cde5fa15a"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
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
            evidence_digest: "sha256:71f584357fdd274d4ca42a2e05a554d8b0877004b5daa04ffcac1677d927f145"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a123c15f4d31b083a603e7cfbe490ecc9a610a10365ae4dd6b68be9d97e3c2c6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "USER"
              parent_authority_digest: "sha256:a363ee3990fab7240fd0a6ef6fd43ee76eb0093e37b5141e3f58c3665af216e9"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:aa2ba60a967c461738e1cc0b31f7e35adf1701e759cd2a413f2a58c40ecb73c8"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
            request_digest: "sha256:6fdce866d57249f224984701554d6f7998a94bafb4862dc3143af78b041970a8"
            scope_request:
              attempt: 1
              claim_id: "sha256:be079893d5bdcc50124b9fe62b78b74dba2fba8f94769bedc58bfeb8b069de7a"
              contract_digest: "sha256:d7cf3ffd1b229646ec2d88ee8bcb5539602ce241eeb95447be20a3855408c02c"
              intake_after_digest: "sha256:e4c96acc9e8211a28d69be382bf71cf13806d54dcfdf393aa299eea4e48ecca6"
              intake_before_digest: "sha256:137e063813ddf54110efe5fc0deade2554d5add4dede51b04a7bd956d6c93ff6"
              parent_authority_digest: "sha256:a363ee3990fab7240fd0a6ef6fd43ee76eb0093e37b5141e3f58c3665af216e9"
              plan_digest: "sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7"
              plan_revision: 3
              record_digest: "sha256:940d51a42ce7cb0e8769bbc74a64ccaa4e21df187eaa7dc7745a7168250ecb60"
              repository_effects:
                - "documentation"
              repository_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:340a518f10823d2475c21e9db7514c9e5a4926bd2d8e84c8248efa73f96bf7bc"
              scope_roots:
                - "docs/user/cli-reference.generated.mdx"
              stop_receipt_digest: "sha256:0f33a818ac7afd85220661f981435d287a4e953b83a4a503a3bf7c899cace1b5"
              task_id: "202610260157-ZDEE0D"
              task_revision: 33
              work_item_id: "final-correction-948a30e490fb"
              work_order_id: "sha256:424a61e8805b5e90ec01efd7937ebe6d58f5efd8ea0128224f0496fe25eaabf8"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1172a1adfe7ab158822cbfdf6c3b3486577bc86320ab7e4577184980a5904ccb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d15e91b7fa22e055171e7f708e7ba9ac69b529994e9ee2c405cd130f4d684320"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:899ebc0d4e2ad40a97adf3c71d27b7403e4c5398ad79a42b4f50f727a45f75d7"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:899ebc0d4e2ad40a97adf3c71d27b7403e4c5398ad79a42b4f50f727a45f75d7"
        digest: "sha256:d15e91b7fa22e055171e7f708e7ba9ac69b529994e9ee2c405cd130f4d684320"
        revision: 4
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "proof-bound-check-replacement"
              - "retained-failure-and-rerun"
              - "negative-recovery-tests"
            id: "recover-nonexecutable-required-check"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec"
            depends_on:
              - "recover-nonexecutable-required-check"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "hotspot-test-split-evidence"
            id: "split-required-check-recovery-test"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:d5162db22832e056bb6ff37eb8a7a62634650c635a7b331ac5bec996bd31d44d"
            depends_on:
              - "recover-nonexecutable-required-check"
              - "split-required-check-recovery-test"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "docs/user/cli-reference.generated.mdx"
            expected_outputs:
              - "final-correction-948a30e490fb-evidence"
            id: "final-correction-948a30e490fb"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610260157-ZDEE0D"
      intent_digest: "sha256:0ba74aae27a9559d0728b44ed2c463c332c417af9febbaee8fd656a12508101a"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7:
          after_revision: 29
          aggregate_digest: "sha256:a3f9109aacb9351a3f1b521ea3a4a1fc1f0940a7b852128c78af122fa7a8db6a"
          before_revision: 28
          command_digest: "sha256:7a664375e7d4cad683e4474eb8030ea7852e15e71e98725c5e97fd30ebceea8c"
          effect_ids: []
          event_digests:
            - "sha256:0ab45b4110cd49ec8d93a5dfbb1015e289a697916223a8711fbbdc8f4c2b0645"
          mutation_id: "amend:sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7"
        amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe:
          after_revision: 19
          aggregate_digest: "sha256:5e519e85ffcbc256d1fd420c7fbc6b4e1ad103f70c36923efee06d14cc90b6e9"
          before_revision: 18
          command_digest: "sha256:31a69a7184084008d48a3c20c28f3329c016873dfb7f5faafb4284eb012b9f24"
          effect_ids: []
          event_digests:
            - "sha256:abe644a7d39950cfcfd4baec51ba1ee979524df31f4fdbd2201bc4a9ae0b1122"
          mutation_id: "amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
        capture:202610260157-ZDEE0D:
          after_revision: 1
          aggregate_digest: "sha256:719b1550753da0920d99e1b58cce82860df7936f3e1a893df695e67fbccd7292"
          before_revision: 0
          command_digest: "sha256:500355ac118938f57c6495b6048b7a6548c1b18d9b4535e5f6bbd137782d115b"
          effect_ids: []
          event_digests:
            - "sha256:a455ebca0344421a476fac7b5b33f06850e1e810c4a450976a28757cc5cea011"
          mutation_id: "capture:202610260157-ZDEE0D"
        final-validation:sha256:948a30e490fb6b8bc2355276ada7d3f49c03b25ba112a6ae3ee0f986e6d84635:27:
          after_revision: 28
          aggregate_digest: "sha256:4a65ebb53bd730fda9d11962f5b649aa898d577e4a23d854c919238aeca95b5d"
          before_revision: 27
          command_digest: "sha256:ed8ca8494284610f8cf5727b6c1dab069c38476d3aee578874259029d4df00f6"
          effect_ids: []
          event_digests:
            - "sha256:32dd1d791d24f29ff571ba87e33a8130a23504aa71cfb1f13d3548e71124e1d7"
          mutation_id: "final-validation:sha256:948a30e490fb6b8bc2355276ada7d3f49c03b25ba112a6ae3ee0f986e6d84635:27"
        kernel_work_item_claim_required:sha256:5560dada3b5c97e8285a83062ec3c1e7f993a0210f7f41fb5a532bb104779438:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:
          after_revision: 37
          aggregate_digest: "sha256:b5d600d1fa4f3a559b9f80e187de0ccc46844f41b8031adf01ea6fbb098347f7"
          before_revision: 36
          command_digest: "sha256:6dba1fc2811713be1a0ba2ccece881ee8c4f8905f2bab9569d93108ce03ba981"
          effect_ids: []
          event_digests:
            - "sha256:d8900bbb19fb3209681e04312db6ec94a09b17710eaaaa52cbbdc488397c85a3"
          mutation_id: "kernel_work_item_claim_required:sha256:5560dada3b5c97e8285a83062ec3c1e7f993a0210f7f41fb5a532bb104779438:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        kernel_work_item_claim_required:sha256:c7bde6a44405112acc7e7016cf96b2e94661b3c8cb4fd59eda72e598e4310238:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:
          after_revision: 31
          aggregate_digest: "sha256:23828d2dad975e3346305920779a6f0468801ee113b76d0dbcdee15541a4953f"
          before_revision: 30
          command_digest: "sha256:0a0dba912f02aab52db90aed36cbc0f2f515799b4be8fb1a2211173353e35e7c"
          effect_ids: []
          event_digests:
            - "sha256:dafe1ca31bef225f4b941dba43a2134b30f41372fea2ffdf79885e8d5ebea7cd"
          mutation_id: "kernel_work_item_claim_required:sha256:c7bde6a44405112acc7e7016cf96b2e94661b3c8cb4fd59eda72e598e4310238:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 5
          aggregate_digest: "sha256:eefd6d2eadaac5a7791ddeb01e1369d5a095bfb0afe51fcf6d5b58f7a41b8306"
          before_revision: 4
          command_digest: "sha256:9cef2d974f592e3d386358acdea59d2d862fb03be87b4e9a2a29ebe10331f0f7"
          effect_ids: []
          event_digests:
            - "sha256:10db915233dcd1907a899d57c7ed08018e594a9b0ddb5e2d62a21189a20bb746"
          mutation_id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:
          after_revision: 21
          aggregate_digest: "sha256:dfcff2c84bc93915923028cbc209ac5aced5e5c40bb8660d96ce411717751ea3"
          before_revision: 20
          command_digest: "sha256:9ae868a9df8e3acaa7a91e8aa1318d600f313659f1c30bb0ec5b70214add5eb2"
          effect_ids: []
          event_digests:
            - "sha256:7f1781bf4f720e238cde02490d40ecc1cf7ea1745b120603c406232910918373"
          mutation_id: "kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 6
          aggregate_digest: "sha256:9804148a061addded49be02bda88bc5d0ff28440c1919f92ebba4d2c13352df9"
          before_revision: 5
          command_digest: "sha256:1d019c9f4efcf31ee5777e9c1d9f17f56e3eab77e8894c22003e0c25d747b357"
          effect_ids: []
          event_digests:
            - "sha256:cc796d8919ca6999eb2a10c910e607972b693320c54fbe7770548b769cd0d767"
          mutation_id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:
          after_revision: 22
          aggregate_digest: "sha256:f2a0c9b52474c90842b83a55eb05d687cb5e34f76416387d31db712ff3dc3494"
          before_revision: 21
          command_digest: "sha256:bd418a31f9e85cac43e0e28eaec580adec2f13775e39a2dd3a56597abfdca728"
          effect_ids: []
          event_digests:
            - "sha256:aa27887349edac25058122d9b7ef381258aae2bdddd58ad6e7879a6c9e8ae068"
          mutation_id: "kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 13
          aggregate_digest: "sha256:149de7329b22408a62e06d7fc92410c80692b7d0b599876665e7343d1eba377a"
          before_revision: 12
          command_digest: "sha256:83601970a07248715ac0f4eb3fbf48dcc9d39d86e86dafb52cf8989f3c4217ff"
          effect_ids: []
          event_digests:
            - "sha256:7ba97f49b0ddf8f0f81ca0b9bf76f2a4b2cca021bc8a0c184dc9dd23c4a33587"
          mutation_id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        kernel_work_item_execution_required:sha256:e0bb698ea5e97b7eebead7351b73931aa19f49d6e10fe62950637e327f012e85:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:
          after_revision: 38
          aggregate_digest: "sha256:ef607468d4c60baa024c5b17cfc2ea4061a17cca9a5ccc8928aa0ac5f6a6a967"
          before_revision: 37
          command_digest: "sha256:f826914d62b17c48fbb60608c3d54dd717e19aca23b4aea1633b2475123f92bd"
          effect_ids: []
          event_digests:
            - "sha256:89576a46e3f448b27adc7836ce891dd2ec623b6292c71ec2e9a2e503d10bfca2"
          mutation_id: "kernel_work_item_execution_required:sha256:e0bb698ea5e97b7eebead7351b73931aa19f49d6e10fe62950637e327f012e85:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        kernel_work_item_execution_required:sha256:fbd51cd47d99e09fede06949872062a6b13a466db531ecabb0a3ce8da09480eb:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:
          after_revision: 32
          aggregate_digest: "sha256:4f8bf89c95e1525ff230962ddf69409307d05989b0a72bfd84ac77daec9f7403"
          before_revision: 31
          command_digest: "sha256:e75cecb451e6e7b5d2423d5c2145ff6d93947efcfb8fbee3f102ce8c58dd703e"
          effect_ids: []
          event_digests:
            - "sha256:a0a8808039980f962339e45d8986ee09fea938e9cff52c73facd4ab95cdd99bb"
          mutation_id: "kernel_work_item_execution_required:sha256:fbd51cd47d99e09fede06949872062a6b13a466db531ecabb0a3ce8da09480eb:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:
          after_revision: 16
          aggregate_digest: "sha256:62682440206945bd063ed945817bee6ae09d3260d1a871aa6259d2b77f263692"
          before_revision: 15
          command_digest: "sha256:76bb05a043e30f740a3af13c4e4dbf33143fd4d79e809f4cccece59e7101e0aa"
          effect_ids: []
          event_digests:
            - "sha256:61b76281b9dca95762861a9991bacf66636829ff599c2fd1cc23eb3af2a3a849"
          mutation_id: "kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 9
          aggregate_digest: "sha256:fa6903fcbbd30d0a2fbe86f2343dc579e74e5cf8401032a47d581c054975fa1a"
          before_revision: 8
          command_digest: "sha256:3c5f7bb5e810e64065f3e2f0f422a64588b37e3a47ca7d19c8dff8c7da7b0f08"
          effect_ids: []
          event_digests:
            - "sha256:4c7299ab52cfedc1624a9bd9fb1b8c9d0b0d9553b8e76f512104da3178eeb1ae"
          mutation_id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        kernel_work_item_inspection_required:sha256:d57e532f17ee7b02c44780ec94801623aa3d17ba52658936c96746f33b02c5d3:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:
          after_revision: 25
          aggregate_digest: "sha256:90ad12c4c7a47cbabca386b22f8cc56822a892e22032563914c9f2b72aba724e"
          before_revision: 24
          command_digest: "sha256:6732db4ddd51b8004a187f842f92f7a515ade3c5b3d8b7aca7ff979212bc779a"
          effect_ids: []
          event_digests:
            - "sha256:d9eb8f1962edbcedb73c6001a4fbe73e1944c5be1deb1e06a0f1c6a7d8e9fec1"
          mutation_id: "kernel_work_item_inspection_required:sha256:d57e532f17ee7b02c44780ec94801623aa3d17ba52658936c96746f33b02c5d3:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 4
          aggregate_digest: "sha256:755c479fa8f5344619b39f65be2e5f03b67ba4cd306d74e050069363abf7d7b0"
          before_revision: 3
          command_digest: "sha256:58d50b36deb6af2c3ca3815e37cb0eada2b2d4a115592edf5f4e7f45dd61a0c3"
          effect_ids: []
          event_digests:
            - "sha256:d17b50039daa05e59734750cbd0a5898a961200ab44da9304bfccf19dca56d89"
          mutation_id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 12
          aggregate_digest: "sha256:ebefdcee68c313b5f059ffc13ef6caded9ed915085871d949e9cb140cb7263f4"
          before_revision: 11
          command_digest: "sha256:5ab198389f24236bb3d7b1a58b1b6936e7b28a08f49b0e72fc1de24e91878f10"
          effect_ids: []
          event_digests:
            - "sha256:472d7e86903fca8c07a78764151a5ffb201ba0557f84b3b35c30bfabb237b44b"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        plan:sha256:d15e91b7fa22e055171e7f708e7ba9ac69b529994e9ee2c405cd130f4d684320:
          after_revision: 35
          aggregate_digest: "sha256:0f6db111d57dadb9e3c9aa875afb00bf5b77025e256e851075252ec029257517"
          before_revision: 34
          command_digest: "sha256:148379c6a77a418e17d7b2fec141dad25f70e0470cf7178ad79153c823ca6f22"
          effect_ids: []
          event_digests:
            - "sha256:63a934558181aa6a930ea48091197307b7e127dc4bf2a6dd61832c2a483354c3"
          mutation_id: "plan:sha256:d15e91b7fa22e055171e7f708e7ba9ac69b529994e9ee2c405cd130f4d684320"
        result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86:
          after_revision: 15
          aggregate_digest: "sha256:e9308068956dbcca1a8f02f356486f7b9e509a87999654fd39f6970dba8e76d2"
          before_revision: 14
          command_digest: "sha256:a24ff9b86046b4c0cd7613a3c5552edd8712d4e87db2363e85a9888eed9bab5c"
          effect_ids: []
          event_digests:
            - "sha256:994c86a01c6a9e2b5c387cb1ba759259100193d6cc50c078723b09f894068786"
          mutation_id: "result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86"
        result:sha256:765c5904d9aa1c5565a74f92de16d5556603f8b8a0ae87d1cc8ae0dfb407e256:
          after_revision: 24
          aggregate_digest: "sha256:1b8ac320837648e2b5fab2a4bece5dfe83be51c6a7e478bb220e579936898582"
          before_revision: 23
          command_digest: "sha256:7b435df8e268aebaae31156f922d92baeab72d5b39927b84b65939056536589c"
          effect_ids: []
          event_digests:
            - "sha256:b8ada350645b0854f30203459b50a40e4ba2da9ac0e47195d4e286466147febd"
          mutation_id: "result:sha256:765c5904d9aa1c5565a74f92de16d5556603f8b8a0ae87d1cc8ae0dfb407e256"
        result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af:
          after_revision: 2
          aggregate_digest: "sha256:10856582d725975c9411dab57c9548dce0fd3d3d448871bc7ad33d2ddf869fe8"
          before_revision: 1
          command_digest: "sha256:b578c75f9dc2f97f3700f637516c477afe67667e325c18ad59738bcc49c07331"
          effect_ids: []
          event_digests:
            - "sha256:a46dd5f64c2ccb8f316fcf3b6d9c5b6cd659fad1c7f615479d7ffa99ac1a2c2d"
          mutation_id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af"
        result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387:
          after_revision: 8
          aggregate_digest: "sha256:18272b90f55009a019739c3c935a5883fc98c9bb4601ca26d9fefdab7b410d6c"
          before_revision: 7
          command_digest: "sha256:33077b327eb1eb38138d804a18ac385a4bb404769eb029853991cd416030cfea"
          effect_ids: []
          event_digests:
            - "sha256:9f5e3451f598b6f255bc0b0d1961d37268954867dba6dd540630f10749155d06"
          mutation_id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387"
        scope-request:sha256:6fdce866d57249f224984701554d6f7998a94bafb4862dc3143af78b041970a8:
          after_revision: 34
          aggregate_digest: "sha256:adf0b5124883e7132df9b7a3fcc606c697b328c93285bbbb8b62f77020ebbc4a"
          before_revision: 33
          command_digest: "sha256:a09b0ddce251ebe042b6b3e5077d8eb007fc17f31d2eb07f196478499007bfe8"
          effect_ids: []
          event_digests:
            - "sha256:aa13a046cc33c0af7e8a64756afef746da0705cec7f9aaecba94b7f2af98c9ed"
          mutation_id: "scope-request:sha256:6fdce866d57249f224984701554d6f7998a94bafb4862dc3143af78b041970a8"
        semantic-stop:sha256:424a61e8805b5e90ec01efd7937ebe6d58f5efd8ea0128224f0496fe25eaabf8:
          after_revision: 33
          aggregate_digest: "sha256:d66653b00b6494451ba40217da5eba9f985bc405f2e03169d3763c6a355e2156"
          before_revision: 32
          command_digest: "sha256:2a4b8af2216480792c78950e8900a8b733b200963181035298bfbd41d824c33c"
          effect_ids: []
          event_digests:
            - "sha256:7d303a5552e235c15e486c9a867e1f075e8e31669d0a7fd783f97c467362375c"
          mutation_id: "semantic-stop:sha256:424a61e8805b5e90ec01efd7937ebe6d58f5efd8ea0128224f0496fe25eaabf8"
        sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842:
          after_revision: 20
          aggregate_digest: "sha256:9ccfbae90a3355319a9c4192aee9defc535077b2f7bc63ca4e6e1b0225bfc188"
          before_revision: 19
          command_digest: "sha256:f800179e349c4bcf22a03088f34ae1689cb38b56a132cd1a37e7a52d3a95a33d"
          effect_ids: []
          event_digests:
            - "sha256:c8ea5fd55824f873b4bb8e86214300ce4562a0f06c8d11960ba2aad0521f4e80"
          mutation_id: "sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842"
        sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31:
          after_revision: 3
          aggregate_digest: "sha256:c6852dd4ef1437c9819b3eb764a76670978a810f9f4e814a7d98d103a89742e3"
          before_revision: 2
          command_digest: "sha256:48587b8b0ed6b3d2f70d2e5e92200fb604dcfff3e34bd4d82384cfc83f664de5"
          effect_ids: []
          event_digests:
            - "sha256:0852850b15021d8bb7ddc8b63cc9186110467457121672cb3f9a7f6d695b3603"
          mutation_id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31"
        sha256:45b97e836db82c6944d34ca9c2f56b0fb7e444412d8e23d7ff3410de92f0e157:
          after_revision: 36
          aggregate_digest: "sha256:2db2ad46beb14ce76d9ebd47bb4787abc6e6765c42f5d460d1cf52343081a461"
          before_revision: 35
          command_digest: "sha256:5eb806ac6d883f4cb90905e423cfcf4636d9c6a915e264e6117db2974ed3bdf2"
          effect_ids: []
          event_digests:
            - "sha256:218643ff267bb597c62c23753ffc9d842dc32b0f447c8a66e2bcda01247d5194"
          mutation_id: "sha256:45b97e836db82c6944d34ca9c2f56b0fb7e444412d8e23d7ff3410de92f0e157"
        sha256:78833130dfb387ac00badacb601e636a03803d451aea8e11ff9f1bd70a67d96f:
          after_revision: 30
          aggregate_digest: "sha256:a5a92db02f326855a2cf9eae67e02a5e39754ee6ae8661510e461a54a57e0177"
          before_revision: 29
          command_digest: "sha256:e103001ba10344eec45f555a69930a0bb90a1c2ff340559f3c2513379be663d4"
          effect_ids: []
          event_digests:
            - "sha256:09887bbc947ff747c15acc89aaa4f9823cb956accb88306b82843d04cf52cc1f"
          mutation_id: "sha256:78833130dfb387ac00badacb601e636a03803d451aea8e11ff9f1bd70a67d96f"
        sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a:
          after_revision: 14
          aggregate_digest: "sha256:e82c4d4847cc8711a0a14102aad4ca73872fb630a23d0d51a33ddc46c0b6b2a2"
          before_revision: 13
          command_digest: "sha256:f4d7f021183683346afff31f36b16881f1f2157bc53a643163fc5687023f5528"
          effect_ids: []
          event_digests:
            - "sha256:51431cbe721b4a7f2b39779bc5f3df8aa5b932168716e45b165ccee257720c08"
          mutation_id: "sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a"
        sha256:b1f9ab63563099a880c3adda2983be8eecc41d79597cdd0852d2f00a323d019c:
          after_revision: 23
          aggregate_digest: "sha256:8a37b6e40fc66f00799e6cb40d95e5d7eb85d15018a8e1b316d78d778decfafa"
          before_revision: 22
          command_digest: "sha256:238e869f821aba7b81a006269eb8672c4c627af29012acb6b798490a1d3018f8"
          effect_ids: []
          event_digests:
            - "sha256:1ea09634988e65a6bdf2da56a10b8eda8f5c19cf35f0cc8c292223a50eb78382"
          mutation_id: "sha256:b1f9ab63563099a880c3adda2983be8eecc41d79597cdd0852d2f00a323d019c"
        sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54:
          after_revision: 7
          aggregate_digest: "sha256:bf353ae187240c43e9bca5e48d70a9fd3e4e16fd9e7a118547d2cf2dca2ac5c5"
          before_revision: 6
          command_digest: "sha256:18d47e27b16ae746fdeba40e73c3df3d219d06551dabf5b7bf2813e5f15590e0"
          effect_ids: []
          event_digests:
            - "sha256:e24fac44cafa49791917fc3a7e80642eb4d63e0590dda51db43e33847ca06b40"
          mutation_id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54"
        validation-resolution:sha256:467ea0ee83d20b473654438169876b9bdf0d919d1fde18469cd90ad90e9cbcd2:
          after_revision: 27
          aggregate_digest: "sha256:570c70259479305a2f5de55400d296f06ce6b58e1f6626cd0c69088838a532cf"
          before_revision: 26
          command_digest: "sha256:e039b9620e32d06eefdcdc92f604889d6007201b6399b8188e9a3cccb5ec0484"
          effect_ids: []
          event_digests:
            - "sha256:14a20eedf94e6a169153c0dade7a4f6fb57335437fa8b6b9b0126f29928438b9"
          mutation_id: "validation-resolution:sha256:467ea0ee83d20b473654438169876b9bdf0d919d1fde18469cd90ad90e9cbcd2"
        validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4:
          after_revision: 11
          aggregate_digest: "sha256:381d52fe1dfe0a6f6e47287fb82acddce98b284120ad4cea07901264690361b8"
          before_revision: 10
          command_digest: "sha256:64a4f5b01a63f29504826375e7cebec091e00038d304e4ec6b1cb2f6c2123f03"
          effect_ids: []
          event_digests:
            - "sha256:7134ad30640c4a579688037759349c29537838ed9559ce4c722930b0cde5a060"
          mutation_id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4"
        validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4:
          after_revision: 18
          aggregate_digest: "sha256:c93801ce4deba8f5111ea67296cb9a1a22ac960833865d2d5d598336245ff6e2"
          before_revision: 17
          command_digest: "sha256:4bac646b9d1883b595b036cf6a8f60a0a86b29667c2171a43d569047d8118a23"
          effect_ids: []
          event_digests:
            - "sha256:ee19ccef731513715979d26e4269b4d018bd0f8cf71f4ec6b92d6409a24599d2"
          mutation_id: "validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4"
        validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb:
          after_revision: 17
          aggregate_digest: "sha256:82bee1858742b0d064aa6c97cd4528e012c38926511842a008bea9ca695adf9b"
          before_revision: 16
          command_digest: "sha256:e79aa0fa2fda26672923e1c33f4bb47678e1dc16a819df4b7dda13d25d3ace0f"
          effect_ids: []
          event_digests:
            - "sha256:87599429e03024249db88c427f5e03f1f090c75c040c0fa8bf988e0bc9dc5655"
          mutation_id: "validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb"
        validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd:
          after_revision: 10
          aggregate_digest: "sha256:1796a103bae37297ac3a851554c27461085be1a29f3778a3a821334ba8d82981"
          before_revision: 9
          command_digest: "sha256:af584b3b13c775cf674fc24b8e612b1cd73744ee448c2a28d250a7159a9e1fb3"
          effect_ids: []
          event_digests:
            - "sha256:eaae4dadb0bf98cf788ea0adb8075383475e1505b7f1a0ac1b969fcf16ccc62d"
          mutation_id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd"
        validation:sha256:a8ce7b2a6d81f0e419a1315dd7d98ad7299df11c50510b01289739f89e86e625:
          after_revision: 26
          aggregate_digest: "sha256:9d67c20320ccb3318441a78019a5c8d2805523dc3c97b65760fbd034da94b542"
          before_revision: 25
          command_digest: "sha256:19e0ad560dad80fef7bcf55cfaccb1233c4cd7b3c69fbb4c49bb299c72ec1aaa"
          effect_ids: []
          event_digests:
            - "sha256:fd17b45dfa523c31ea818d8554c8f1be9c986ece75167ffe97444e6e42cbe301"
          mutation_id: "validation:sha256:a8ce7b2a6d81f0e419a1315dd7d98ad7299df11c50510b01289739f89e86e625"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
          digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
              depends_on: []
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "proof-bound-check-replacement"
                - "retained-failure-and-rerun"
                - "negative-recovery-tests"
              id: "recover-nonexecutable-required-check"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:23955e7e5d13a89f7e7307075f9d3253f629a88d2f5c81c411a832ee1bd30930"
          digest: "sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
              depends_on: []
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "proof-bound-check-replacement"
                - "retained-failure-and-rerun"
                - "negative-recovery-tests"
              id: "recover-nonexecutable-required-check"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec"
              depends_on:
                - "recover-nonexecutable-required-check"
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "hotspot-test-split-evidence"
              id: "split-required-check-recovery-test"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:185f198c1d0fe8ab93c72f2c8adcba7edf76cc4ac43678a59d0c109033cfbabf"
          digest: "sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7"
          revision: 3
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
              depends_on: []
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "proof-bound-check-replacement"
                - "retained-failure-and-rerun"
                - "negative-recovery-tests"
              id: "recover-nonexecutable-required-check"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec"
              depends_on:
                - "recover-nonexecutable-required-check"
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "hotspot-test-split-evidence"
              id: "split-required-check-recovery-test"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:d7cf3ffd1b229646ec2d88ee8bcb5539602ce241eeb95447be20a3855408c02c"
              depends_on:
                - "recover-nonexecutable-required-check"
                - "split-required-check-recovery-test"
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks"
              expected_outputs:
                - "final-correction-948a30e490fb-evidence"
              id: "final-correction-948a30e490fb"
              optional: false
              required_inputs: []
      revision: 38
      schema_version: 1
      state: "ACTIVE"
      work_items:
        final-correction-948a30e490fb:
          attempt: 2
          claim_id: "sha256:e06e3b7a4209dc4ed2382d9e934897446f2ea59f6d6775a8384b3788dd7e2b25"
          definition:
            contract_digest: "sha256:d5162db22832e056bb6ff37eb8a7a62634650c635a7b331ac5bec996bd31d44d"
            depends_on:
              - "recover-nonexecutable-required-check"
              - "split-required-check-recovery-test"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks"
                - "docs/user/cli-reference.generated.mdx"
            expected_outputs:
              - "final-correction-948a30e490fb-evidence"
            id: "final-correction-948a30e490fb"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
        recover-nonexecutable-required-check:
          attempt: 2
          claim_id: "sha256:43603b68b603cae383bec45f2c2451eb0410c47ccfd5fed65c30da879885df98"
          definition:
            contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "proof-bound-check-replacement"
              - "retained-failure-and-rerun"
              - "negative-recovery-tests"
            id: "recover-nonexecutable-required-check"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:ee27b69d0d39619be0bea92d8d46081d4f5342b594f29f07db79f0823f0d10c9"
              id: "proof-bound-check-replacement"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "recover-nonexecutable-required-check"
            -
              attempt: 2
              digest: "sha256:d25e81cb594fb3e6e91c281aeb50d508ed815d47eaff4aa76e9f9d5169a7f071"
              id: "retained-failure-and-rerun"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "recover-nonexecutable-required-check"
            -
              attempt: 2
              digest: "sha256:f7a0b1aa3b6f8abdd1d5e1d5eb6ea8ab9717b1123c8ea2a9500eb31bfbd14c58"
              id: "negative-recovery-tests"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "recover-nonexecutable-required-check"
          result_digest: "sha256:26d969fa0bb9593b6bb6cd24c75b709c28252160d863b6ee575c81eecc479902"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:354a53ef5fe9f83bea12ae5e01557365266e560b7ed614251ae63723f8321d51"
              - "sha256:d0e3c3597fbbb4e8c3cffcc2344c585969eb01de7ce5a347241a75b91cff2a85"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:88b89b5a2b1ad4e9e3e2bd7b409c25cbea4c61398109d28b652596cc94bdb5c7"
              environment_digest: "sha256:c8ede4956100f314dd254350e6fdba0d432cefdf0e3fe4b0d936d3c4e6ee8f22"
              implementation_identity: "sha256:26d969fa0bb9593b6bb6cd24c75b709c28252160d863b6ee575c81eecc479902"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-26T02:46:17.850Z"
            status: "PASSED"
        split-required-check-recovery-test:
          attempt: 1
          claim_id: "sha256:0dbf899a06adb349eba99bf3526966d082c501ab7ec71091520215d868c08444"
          definition:
            contract_digest: "sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec"
            depends_on:
              - "recover-nonexecutable-required-check"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "hotspot-test-split-evidence"
            id: "split-required-check-recovery-test"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:f3add444513774ee05181f4693692b0bece9979a156389f85f0486d6472ee70e"
              id: "hotspot-test-split-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "split-required-check-recovery-test"
          result_digest: "sha256:2121da53a5a23990b99f8f956fb5fb92532b1f64653fce58c6c87883b5991956"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:9b38c1c0f225f2b9464686063342896169988d6eaa992d03613963ac34cae844"
              - "sha256:a7ea915f1f71aaf36776cdec8f43f9c0dd845b70430de66e2b47f1cdd8bbb8a3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:59e68a1ba309442de8eaacda87dbb2dbd3ea5dd0bb0268604beb58065b8805d9"
              environment_digest: "sha256:0b362148b6d11ee1c6110945d8fc8f97bf722e634adc14c3b928571d30b7daef"
              implementation_identity: "sha256:2121da53a5a23990b99f8f956fb5fb92532b1f64653fce58c6c87883b5991956"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-26T04:02:24.705Z"
            status: "PASSED"
    digest: "sha256:5a48c4b2e716df1bd242f9e940d89fd90e6f0b0e3a6a8aa39bc98e349dec43df"
    documents:
      contracts:
        sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec:
          acceptance_criteria:
            - "Move the required-check correction regression cases to a dedicated test file and keep the existing kernel test file below the oversized-test threshold."
            - "Retain positive and negative proof, active-claim, wrong-plan, and receipt-key coverage."
            - "Preserve implementation and prior failed full-CI evidence; no scope or authority expansion."
          objective: "Split the new required-check recovery regression test from the existing oversized kernel test file without changing implementation behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/required-check-correction.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
            - "bun run hotspots:check"
        sha256:d5162db22832e056bb6ff37eb8a7a62634650c635a7b331ac5bec996bd31d44d:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
            - "Change only docs/user/cli-reference.generated.mdx to document the new option and make docs:cli:check pass."
          objective: "Repair final validation by synchronizing the generated CLI reference for the new generic failed-check WorkOrder option."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/required-check-correction.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
            - "bun run hotspots:check"
            - "bun run docs:cli:check"
        sha256:d7cf3ffd1b229646ec2d88ee8bcb5539602ce241eeb95447be20a3855408c02c:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:948a30e490fb6b8bc2355276ada7d3f49c03b25ba112a6ae3ee0f986e6d84635. Read /home/agentplane/workspace/agentplane/.agentplane/tmp/required-check-recovery-0713-v2/.git/agentplane/kernel/exchanges/202610260157-ZDEE0D/2591966af55084ca516280b5f8ad4fba9cd973d8dc2b95aa32c36f98ce5bdbc6/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/required-check-correction.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
            - "bun run hotspots:check"
        sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce:
          acceptance_criteria:
            - "Admit a correction only for an exact prior native declared-check failure whose command could not execute; bind original Plan digest, WorkItem, command, failure evidence, and a USER operator decision to the replacement."
            - "Keep scope, outputs, acceptance criteria, all other checks, and execution authority unchanged; reject missing or mismatched proof, unrelated changes, replay, and attempts to replace an executable failed test."
            - "Preserve the original FAILED validation and old Plan in history; corrected Plan requires a new WorkItem attempt and native execution of the replacement command before success."
            - "Use a generic mechanism with no version-specific or Factory-specific behavior."
          objective: "Allow an operator to correct exactly one proven non-executable required check in an approved canonical Plan and rerun it without waiving failed verification."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
      intent:
        context: "Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters."
        objective: "Recover an approved plan when a required declared check cannot execute"
    events:
      -
        command_digest: "sha256:500355ac118938f57c6495b6048b7a6548c1b18d9b4535e5f6bbd137782d115b"
        id: "capture:202610260157-ZDEE0D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610260157-ZDEE0D"
        occurred_at: "2026-10-26T01:57:30.730Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610260157-ZDEE0D"
        task_revision: 1
      -
        command_digest: "sha256:b578c75f9dc2f97f3700f637516c477afe67667e325c18ad59738bcc49c07331"
        id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af"
        occurred_at: "2026-10-26T01:58:19.403Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610260157-ZDEE0D"
        task_revision: 2
      -
        command_digest: "sha256:48587b8b0ed6b3d2f70d2e5e92200fb604dcfff3e34bd4d82384cfc83f664de5"
        id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31"
        occurred_at: "2026-10-26T01:58:41.853Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610260157-ZDEE0D"
        task_revision: 3
      -
        command_digest: "sha256:58d50b36deb6af2c3ca3815e37cb0eada2b2d4a115592edf5f4e7f45dd61a0c3"
        id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T01:59:04.850Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610260157-ZDEE0D"
        task_revision: 4
      -
        command_digest: "sha256:9cef2d974f592e3d386358acdea59d2d862fb03be87b4e9a2a29ebe10331f0f7"
        id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T01:59:31.464Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610260157-ZDEE0D"
        task_revision: 5
      -
        command_digest: "sha256:1d019c9f4efcf31ee5777e9c1d9f17f56e3eab77e8894c22003e0c25d747b357"
        id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T02:00:11.177Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610260157-ZDEE0D"
        task_revision: 6
      -
        command_digest: "sha256:18d47e27b16ae746fdeba40e73c3df3d219d06551dabf5b7bf2813e5f15590e0"
        id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54"
        occurred_at: "2026-10-26T02:38:22.523Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610260157-ZDEE0D"
        task_revision: 7
      -
        command_digest: "sha256:33077b327eb1eb38138d804a18ac385a4bb404769eb029853991cd416030cfea"
        id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387"
        occurred_at: "2026-10-26T02:38:40.206Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610260157-ZDEE0D"
        task_revision: 8
      -
        command_digest: "sha256:3c5f7bb5e810e64065f3e2f0f422a64588b37e3a47ca7d19c8dff8c7da7b0f08"
        id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:38:52.745Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610260157-ZDEE0D"
        task_revision: 9
      -
        command_digest: "sha256:af584b3b13c775cf674fc24b8e612b1cd73744ee448c2a28d250a7159a9e1fb3"
        id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd"
        occurred_at: "2026-10-26T02:41:17.447Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610260157-ZDEE0D"
        task_revision: 10
      -
        command_digest: "sha256:64a4f5b01a63f29504826375e7cebec091e00038d304e4ec6b1cb2f6c2123f03"
        id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4"
        occurred_at: "2026-10-26T02:41:25.540Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610260157-ZDEE0D"
        task_revision: 11
      -
        command_digest: "sha256:5ab198389f24236bb3d7b1a58b1b6936e7b28a08f49b0e72fc1de24e91878f10"
        id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:41:41.457Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610260157-ZDEE0D"
        task_revision: 12
      -
        command_digest: "sha256:83601970a07248715ac0f4eb3fbf48dcc9d39d86e86dafb52cf8989f3c4217ff"
        id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:41:52.488Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610260157-ZDEE0D"
        task_revision: 13
      -
        command_digest: "sha256:f4d7f021183683346afff31f36b16881f1f2157bc53a643163fc5687023f5528"
        id: "sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a"
        occurred_at: "2026-10-26T02:44:58.726Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610260157-ZDEE0D"
        task_revision: 14
      -
        command_digest: "sha256:a24ff9b86046b4c0cd7613a3c5552edd8712d4e87db2363e85a9888eed9bab5c"
        id: "result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86"
        occurred_at: "2026-10-26T02:45:11.665Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202610260157-ZDEE0D"
        task_revision: 15
      -
        command_digest: "sha256:76bb05a043e30f740a3af13c4e4dbf33143fd4d79e809f4cccece59e7101e0aa"
        id: "kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        occurred_at: "2026-10-26T02:45:21.751Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610260157-ZDEE0D"
        task_revision: 16
      -
        command_digest: "sha256:e79aa0fa2fda26672923e1c33f4bb47678e1dc16a819df4b7dda13d25d3ace0f"
        id: "validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb"
        occurred_at: "2026-10-26T02:46:25.935Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202610260157-ZDEE0D"
        task_revision: 17
      -
        command_digest: "sha256:4bac646b9d1883b595b036cf6a8f60a0a86b29667c2171a43d569047d8118a23"
        id: "validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4"
        occurred_at: "2026-10-26T02:46:31.729Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610260157-ZDEE0D"
        task_revision: 18
      -
        command_digest: "sha256:31a69a7184084008d48a3c20c28f3329c016873dfb7f5faafb4284eb012b9f24"
        id: "amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
        occurred_at: "2026-10-26T03:27:02.283Z"
        payload_digest: "sha256:9b35555a95e3db10926d6bf83c8a3fdeca4218efbd9c9de546b6be9c2e203914"
        task_id: "202610260157-ZDEE0D"
        task_revision: 19
      -
        command_digest: "sha256:f800179e349c4bcf22a03088f34ae1689cb38b56a132cd1a37e7a52d3a95a33d"
        id: "sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842"
        occurred_at: "2026-10-26T03:27:13.015Z"
        payload_digest: "sha256:881eb1d3f48c5092189b9c51aa93913d574c5e9406e4b901513a8741256569d1"
        task_id: "202610260157-ZDEE0D"
        task_revision: 20
      -
        command_digest: "sha256:9ae868a9df8e3acaa7a91e8aa1318d600f313659f1c30bb0ec5b70214add5eb2"
        id: "kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        occurred_at: "2026-10-26T03:27:43.097Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610260157-ZDEE0D"
        task_revision: 21
      -
        command_digest: "sha256:bd418a31f9e85cac43e0e28eaec580adec2f13775e39a2dd3a56597abfdca728"
        id: "kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        occurred_at: "2026-10-26T03:27:55.562Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610260157-ZDEE0D"
        task_revision: 22
      -
        command_digest: "sha256:238e869f821aba7b81a006269eb8672c4c627af29012acb6b798490a1d3018f8"
        id: "sha256:b1f9ab63563099a880c3adda2983be8eecc41d79597cdd0852d2f00a323d019c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b1f9ab63563099a880c3adda2983be8eecc41d79597cdd0852d2f00a323d019c"
        occurred_at: "2026-10-26T03:31:16.630Z"
        payload_digest: "sha256:d47dd98692456ecd8c2232ce09064ac5e2cff5d4b61aee0c39058ec1a5b2e91b"
        task_id: "202610260157-ZDEE0D"
        task_revision: 23
      -
        command_digest: "sha256:7b435df8e268aebaae31156f922d92baeab72d5b39927b84b65939056536589c"
        id: "result:sha256:765c5904d9aa1c5565a74f92de16d5556603f8b8a0ae87d1cc8ae0dfb407e256:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:765c5904d9aa1c5565a74f92de16d5556603f8b8a0ae87d1cc8ae0dfb407e256"
        occurred_at: "2026-10-26T03:31:36.304Z"
        payload_digest: "sha256:fab1b25ae6b523adc3425755b7448df4925fc1771b596e424a7dd02f9b8e3724"
        task_id: "202610260157-ZDEE0D"
        task_revision: 24
      -
        command_digest: "sha256:6732db4ddd51b8004a187f842f92f7a515ade3c5b3d8b7aca7ff979212bc779a"
        id: "kernel_work_item_inspection_required:sha256:d57e532f17ee7b02c44780ec94801623aa3d17ba52658936c96746f33b02c5d3:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:d57e532f17ee7b02c44780ec94801623aa3d17ba52658936c96746f33b02c5d3:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        occurred_at: "2026-10-26T03:31:52.337Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610260157-ZDEE0D"
        task_revision: 25
      -
        command_digest: "sha256:19e0ad560dad80fef7bcf55cfaccb1233c4cd7b3c69fbb4c49bb299c72ec1aaa"
        id: "validation:sha256:a8ce7b2a6d81f0e419a1315dd7d98ad7299df11c50510b01289739f89e86e625:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a8ce7b2a6d81f0e419a1315dd7d98ad7299df11c50510b01289739f89e86e625"
        occurred_at: "2026-10-26T04:02:33.767Z"
        payload_digest: "sha256:c640172650bace8e18a4458b58619fb160a3f285b79e7a250d737d3d523462bc"
        task_id: "202610260157-ZDEE0D"
        task_revision: 26
      -
        command_digest: "sha256:e039b9620e32d06eefdcdc92f604889d6007201b6399b8188e9a3cccb5ec0484"
        id: "validation-resolution:sha256:467ea0ee83d20b473654438169876b9bdf0d919d1fde18469cd90ad90e9cbcd2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:467ea0ee83d20b473654438169876b9bdf0d919d1fde18469cd90ad90e9cbcd2"
        occurred_at: "2026-10-26T04:02:39.331Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202610260157-ZDEE0D"
        task_revision: 27
      -
        command_digest: "sha256:ed8ca8494284610f8cf5727b6c1dab069c38476d3aee578874259029d4df00f6"
        id: "final-validation:sha256:948a30e490fb6b8bc2355276ada7d3f49c03b25ba112a6ae3ee0f986e6d84635:27:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:948a30e490fb6b8bc2355276ada7d3f49c03b25ba112a6ae3ee0f986e6d84635:27"
        occurred_at: "2026-10-26T07:32:02.805Z"
        payload_digest: "sha256:e9373e612bfcad8639d58ae3b4bdbac7ff86d82520e9bd4c3ae7504c4c747303"
        task_id: "202610260157-ZDEE0D"
        task_revision: 28
      -
        command_digest: "sha256:7a664375e7d4cad683e4474eb8030ea7852e15e71e98725c5e97fd30ebceea8c"
        id: "amend:sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:5bc1c190e7388409ab17175044b836504cae0995875bb36d1b6dea489d1cc6f7"
        occurred_at: "2026-10-26T07:32:41.162Z"
        payload_digest: "sha256:b217ff09bd299b8a40ee510b9e3a0b25a33179688a5ef188a2f38ac0c462f30a"
        task_id: "202610260157-ZDEE0D"
        task_revision: 29
      -
        command_digest: "sha256:e103001ba10344eec45f555a69930a0bb90a1c2ff340559f3c2513379be663d4"
        id: "sha256:78833130dfb387ac00badacb601e636a03803d451aea8e11ff9f1bd70a67d96f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:78833130dfb387ac00badacb601e636a03803d451aea8e11ff9f1bd70a67d96f"
        occurred_at: "2026-10-26T07:32:46.434Z"
        payload_digest: "sha256:d4a92440b02b7b741d34bf4343153c638a5d88f1b605a1aa1260bbd3f66d3c26"
        task_id: "202610260157-ZDEE0D"
        task_revision: 30
      -
        command_digest: "sha256:0a0dba912f02aab52db90aed36cbc0f2f515799b4be8fb1a2211173353e35e7c"
        id: "kernel_work_item_claim_required:sha256:c7bde6a44405112acc7e7016cf96b2e94661b3c8cb4fd59eda72e598e4310238:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:c7bde6a44405112acc7e7016cf96b2e94661b3c8cb4fd59eda72e598e4310238:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        occurred_at: "2026-10-26T07:33:05.991Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610260157-ZDEE0D"
        task_revision: 31
      -
        command_digest: "sha256:e75cecb451e6e7b5d2423d5c2145ff6d93947efcfb8fbee3f102ce8c58dd703e"
        id: "kernel_work_item_execution_required:sha256:fbd51cd47d99e09fede06949872062a6b13a466db531ecabb0a3ce8da09480eb:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:fbd51cd47d99e09fede06949872062a6b13a466db531ecabb0a3ce8da09480eb:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        occurred_at: "2026-10-26T07:33:13.625Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202610260157-ZDEE0D"
        task_revision: 32
      -
        command_digest: "sha256:2a4b8af2216480792c78950e8900a8b733b200963181035298bfbd41d824c33c"
        id: "semantic-stop:sha256:424a61e8805b5e90ec01efd7937ebe6d58f5efd8ea0128224f0496fe25eaabf8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:424a61e8805b5e90ec01efd7937ebe6d58f5efd8ea0128224f0496fe25eaabf8"
        occurred_at: "2026-10-26T07:34:05.005Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202610260157-ZDEE0D"
        task_revision: 33
      -
        command_digest: "sha256:a09b0ddce251ebe042b6b3e5077d8eb007fc17f31d2eb07f196478499007bfe8"
        id: "scope-request:sha256:6fdce866d57249f224984701554d6f7998a94bafb4862dc3143af78b041970a8:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:6fdce866d57249f224984701554d6f7998a94bafb4862dc3143af78b041970a8"
        occurred_at: "2026-10-26T07:34:31.952Z"
        payload_digest: "sha256:c42fd9656880b27ff75f776e9e1663cf841e44f804aba2cfea538d205a21c259"
        task_id: "202610260157-ZDEE0D"
        task_revision: 34
      -
        command_digest: "sha256:148379c6a77a418e17d7b2fec141dad25f70e0470cf7178ad79153c823ca6f22"
        id: "plan:sha256:d15e91b7fa22e055171e7f708e7ba9ac69b529994e9ee2c405cd130f4d684320:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:d15e91b7fa22e055171e7f708e7ba9ac69b529994e9ee2c405cd130f4d684320"
        occurred_at: "2026-10-26T07:35:38.921Z"
        payload_digest: "sha256:53ccd4c0d2c83fe15b9b11dacd88058232b10dece64bf625ed07a34665fd3d06"
        task_id: "202610260157-ZDEE0D"
        task_revision: 35
      -
        command_digest: "sha256:5eb806ac6d883f4cb90905e423cfcf4636d9c6a915e264e6117db2974ed3bdf2"
        id: "sha256:45b97e836db82c6944d34ca9c2f56b0fb7e444412d8e23d7ff3410de92f0e157:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:45b97e836db82c6944d34ca9c2f56b0fb7e444412d8e23d7ff3410de92f0e157"
        occurred_at: "2026-10-26T07:35:54.099Z"
        payload_digest: "sha256:813e6f011586e3ee139e9db72b8eb5d7f5406aae30f20bd703ae0eebb5443857"
        task_id: "202610260157-ZDEE0D"
        task_revision: 36
      -
        command_digest: "sha256:6dba1fc2811713be1a0ba2ccece881ee8c4f8905f2bab9569d93108ce03ba981"
        id: "kernel_work_item_claim_required:sha256:5560dada3b5c97e8285a83062ec3c1e7f993a0210f7f41fb5a532bb104779438:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5560dada3b5c97e8285a83062ec3c1e7f993a0210f7f41fb5a532bb104779438:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        occurred_at: "2026-10-26T07:36:04.540Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202610260157-ZDEE0D"
        task_revision: 37
      -
        command_digest: "sha256:f826914d62b17c48fbb60608c3d54dd717e19aca23b4aea1633b2475123f92bd"
        id: "kernel_work_item_execution_required:sha256:e0bb698ea5e97b7eebead7351b73931aa19f49d6e10fe62950637e327f012e85:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:e0bb698ea5e97b7eebead7351b73931aa19f49d6e10fe62950637e327f012e85:sha256:1c6f116783a8d6151bcd7f704eee48679bb6a71790b8660a11b62cfbffbded75"
        occurred_at: "2026-10-26T07:36:13.049Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202610260157-ZDEE0D"
        task_revision: 38
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recover an approved plan when a required declared check cannot execute

Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.

## Scope

- In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
- Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".

## Plan

1. Execute approved WorkItem recover-nonexecutable-required-check.
2. Execute approved WorkItem split-required-check-recovery-test.
3. Execute approved WorkItem final-correction-948a30e490fb.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
