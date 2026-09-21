---
id: "202609211330-5A54M1"
title: "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.11"
  - "compatibility"
  - "lifecycle"
task_kind: "release"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run bench:compatibility:candidate:check"
  - "bun run bench:compatibility:check"
  - "bun run ci:local:full"
  - "bun run test:release:critical"
  - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
plan_approval:
  state: "approved"
  updated_at: "2026-09-21T13:31:23.767Z"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
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
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:9d51a4e9b780aa87aefbcf97f67fdb1821d9a38c44f1065fbe5e972d44ac7b75"
      escalation_reasons:
        - "effect_release_metadata"
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
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-21T13:30:16.054Z"
doc_updated_by: "CODER"
description: "Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged."
sections:
  Summary: |-
    Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate

    Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
  Scope: |-
    - In scope: Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
    - Out of scope: unrelated refactors not required for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate".
  Plan: "1. Execute approved WorkItem completion-and-compatibility-repair."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "task/202609211051-X92CWM/repair-the-demonstrated-0-7-11-release-blockers"
    base_sha: "6f44ea7b46345716293906301024c81f0dedc0b7"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1de2e3dde16b6b0390850bbf0164079a1cc719de90ac09d451949e75c023e2e2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ac3caa500dbd3257e4b1f89ee1eb482bff1c35ffa1fbb96b9f7209878f1cde1a"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:71fed5716d8fdf4258101d9725aad2aa59abcf59539dfde8e06a4b402f370692"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
            task_id: "202609211330-5A54M1"
            validation_requirements:
              - "bun run bench:compatibility:candidate:check"
              - "bun run bench:compatibility:check"
              - "bun run ci:local:full"
              - "bun run test:release:critical"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:71fed5716d8fdf4258101d9725aad2aa59abcf59539dfde8e06a4b402f370692"
        digest: "sha256:ac3caa500dbd3257e4b1f89ee1eb482bff1c35ffa1fbb96b9f7209878f1cde1a"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:adb3fd5c68d62ff1a743c32d834805a5edd6e2823ec3a0efda00f7ede09e9738"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
            expected_outputs:
              - "canonical-completion-persistence-proof"
              - "reviewed-compatibility-candidate"
            id: "completion-and-compatibility-repair"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609211330-5A54M1"
      intent_digest: "sha256:0c2b58526a6944a35121f7477ed7b7d35391491d1084c2ca2371b84a818c9028"
      migration_receipts: []
      mutation_receipts:
        capture:202609211330-5A54M1:
          after_revision: 1
          aggregate_digest: "sha256:c208a846a29fcccac19456d7e2945e5ac6739bf670a32c247f8f04d786d4b58a"
          before_revision: 0
          command_digest: "sha256:53ffb44c0f22f61ba7254ebfb9c428aed2f5a4d3ff471cbc3cbbe7bdc39dc9b2"
          effect_ids: []
          event_digests:
            - "sha256:667e5ede68626d4b142cabbc6180482f66b6dd9b27c11637109ea42dae6671fe"
          mutation_id: "capture:202609211330-5A54M1"
        result:sha256:342a772871fdb4895bba459b5a2178d003e8092806a1c7290a1978ebd9c4099f:
          after_revision: 2
          aggregate_digest: "sha256:4f6748fdcaed5b66d9f4d448582c6245ddfb06427dc038c426916b2ed23e7b46"
          before_revision: 1
          command_digest: "sha256:b79b00f379b9d62a339c34eb5b7c222398b1d48fcd9f5e370d0b155d8b995e9b"
          effect_ids: []
          event_digests:
            - "sha256:ce580c9760cb156898617b0ff55ba83fb695a58a3859cdbc3eefcd20f72ebf65"
          mutation_id: "result:sha256:342a772871fdb4895bba459b5a2178d003e8092806a1c7290a1978ebd9c4099f"
        sha256:8c91983fabdbf9b4a1840bbdc81b86cf3488e2febcfb762e322740a44582d383:
          after_revision: 3
          aggregate_digest: "sha256:769def3968143e0f577db472de7b9bcfd9e79d8cc92855de41b38f7855cbb978"
          before_revision: 2
          command_digest: "sha256:cfd2433ad7bbc732e6889162474762fcdcf8af8410a551897c605e05c002ee11"
          effect_ids: []
          event_digests:
            - "sha256:7f4ae158aae891817ac6528ff082ed5f876be5aadf0234bcb343929de576fd1a"
          mutation_id: "sha256:8c91983fabdbf9b4a1840bbdc81b86cf3488e2febcfb762e322740a44582d383"
      plan_history: []
      revision: 3
      schema_version: 1
      state: "ACTIVE"
      work_items: {}
    digest: "sha256:20058f6d020fb4999f6894ba246b7da25bcc22067662c98f5eda2f8a27dbc374"
    documents:
      contracts:
        sha256:adb3fd5c68d62ff1a743c32d834805a5edd6e2823ec3a0efda00f7ede09e9738:
          acceptance_criteria:
            - "A successful canonical branch_pr complete_task transition is persisted before commitCanonicalTerminalTaskArtifacts records terminal state, and failed or stale transitions do not create a false terminal commit."
            - "The nearest public-route regression proves the task is COMPLETED and the task checkout has no uncommitted canonical README projection after terminal completion."
            - "The reviewed v0.7 compatibility candidate exactly matches the cumulative 0.7.11 surface, includes 202609211330-5A54M1 in source-task provenance, and does not modify the immutable v0.6.24 baseline."
            - "Focused lifecycle tests, both compatibility candidate gates, release-critical tests, and the full local CI pass without baseline or gate weakening."
          objective: "Move branch_pr terminal task-artifact persistence after the successful complete_task Kernel mutation without weakening fail-closed routing; add a regression that proves the public completion route leaves the canonical task projection committed and the checkout clean; then regenerate scripts/baselines/v0.7-compatibility-candidate.json with task 202609211330-5A54M1 as source provenance while leaving scripts/baselines/v0.6.24-compatibility-contract.json byte-identical."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run test:release:critical"
            - "bun run ci:local:full"
      intent:
        context: "Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged."
        objective: "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate"
    events:
      -
        command_digest: "sha256:53ffb44c0f22f61ba7254ebfb9c428aed2f5a4d3ff471cbc3cbbe7bdc39dc9b2"
        id: "capture:202609211330-5A54M1:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609211330-5A54M1"
        occurred_at: "2026-09-21T13:30:16.024Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609211330-5A54M1"
        task_revision: 1
      -
        command_digest: "sha256:b79b00f379b9d62a339c34eb5b7c222398b1d48fcd9f5e370d0b155d8b995e9b"
        id: "result:sha256:342a772871fdb4895bba459b5a2178d003e8092806a1c7290a1978ebd9c4099f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:342a772871fdb4895bba459b5a2178d003e8092806a1c7290a1978ebd9c4099f"
        occurred_at: "2026-09-21T13:31:14.213Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609211330-5A54M1"
        task_revision: 2
      -
        command_digest: "sha256:cfd2433ad7bbc732e6889162474762fcdcf8af8410a551897c605e05c002ee11"
        id: "sha256:8c91983fabdbf9b4a1840bbdc81b86cf3488e2febcfb762e322740a44582d383:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8c91983fabdbf9b4a1840bbdc81b86cf3488e2febcfb762e322740a44582d383"
        occurred_at: "2026-09-21T13:31:22.822Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609211330-5A54M1"
        task_revision: 3
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate

Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.

## Scope

- In scope: Fix the demonstrated branch_pr completion ordering so the canonical COMPLETED projection is included in the terminal task-artifact commit and does not leave the task README dirty. Add a public-route regression test. Regenerate the v0.7 compatibility candidate for the exact cumulative 0.7.11 surface with this task as provenance; keep the immutable compatibility baseline unchanged.
- Out of scope: unrelated refactors not required for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate".

## Plan

1. Execute approved WorkItem completion-and-compatibility-repair.

## Verify Steps

PLANNER fallback scaffold for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair canonical branch-PR completion persistence and record the reviewed 0.7.11 compatibility candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
