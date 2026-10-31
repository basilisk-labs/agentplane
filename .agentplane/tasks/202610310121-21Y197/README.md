---
id: "202610310121-21Y197"
title: "Fix completed-scope metadata readers across Node command bundles"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202610300522-MRJ9WH"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-31T01:23:10.674Z"
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
    - "effect_publish"
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
      - "repository_write"
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
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
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
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
          - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
          - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:cdc40ba8406e2820952ea0438a2139f8eea9bbcf3dd80cce984982b8e9ec01c5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-31T01:21:21.010Z"
doc_updated_by: "CODER"
description: "The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task."
sections:
  Summary: |-
    Fix completed-scope metadata readers across Node command bundles

    The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.
  Scope: |-
    - In scope: The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.
    - Out of scope: unrelated refactors not required for "Fix completed-scope metadata readers across Node command bundles".
  Plan: "1. Execute approved WorkItem qualify-completed-scope-reader-boundaries."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "5610a273a43b8eeb06a2d776d12a3be03d2fc01d"
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
            digest: "sha256:ccb87a4a85d5418de23e16adf4bc901778cb573f9bfcc49c5dc658f7fbfc1064"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            task_id: "202610310121-21Y197"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
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
            digest: "sha256:19426dad79be952b34b78b1e20a3cb5bafdb259867dbbf4bbacc7bd17ac48e05"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ccb87a4a85d5418de23e16adf4bc901778cb573f9bfcc49c5dc658f7fbfc1064"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
              - "packages/agentplane/src/commands/task/finish-shared.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
              - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
            task_id: "202610310121-21Y197"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:3ce55d74f1e157b434beb73f4f88f63030afb61c5eec64e31631ce9bb0fcbdfe"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:9a73283fa6ffca3ad0d0c5e90e3a2499fe3a71b046655d9739e5bdc56eeb04ad"
        digest: "sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6017d1f68d675d62026e0810aa16fd46c4f3951f200728418135548f94fe7603"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
            expected_outputs:
              - "completed-reader-qualification-report"
            id: "qualify-completed-scope-reader-boundaries"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610310121-21Y197"
      intent_digest: "sha256:a56141a6df52a7f9ff4bba7ed1d09dc9636675b524809063242e3fa4f5a1e4b1"
      migration_receipts: []
      mutation_receipts:
        capture:202610310121-21Y197:
          after_revision: 1
          aggregate_digest: "sha256:34ef592f14b19c562af2273c76ba5a641e5cb6707fe1c5e1c417f745e87c54fa"
          before_revision: 0
          command_digest: "sha256:5c1094d13201fe07e650226e6b338ba91464c48bc40dc87216f9671505a7dd3b"
          effect_ids: []
          event_digests:
            - "sha256:efb5c60429a82fad7caef7a37368167ede0f0f5cc82088651e3edb7ffcad9bb2"
          mutation_id: "capture:202610310121-21Y197"
        kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:
          after_revision: 5
          aggregate_digest: "sha256:4c00e178f1c5764d9dd8b06eae1002e08328b90fbeb52d8a0599f0d55831d409"
          before_revision: 4
          command_digest: "sha256:27d3fead842ba2ad8c2b3357d658950b73b3620f4322fff154662359da6ce800"
          effect_ids: []
          event_digests:
            - "sha256:bcb8ce54093e2c6c9c58c7e9b509c73bb2ff42a1ea126cdd3d0ad6ed5a814dcb"
          mutation_id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f:
          after_revision: 7
          aggregate_digest: "sha256:becfd0e3d1089e86b3f85bbd33a098252a7cfdba6d3178e80d93720a0ad20873"
          before_revision: 6
          command_digest: "sha256:5ac692be8d91e01e1981249c4fa9f3485ab1fc46e0fc6e24fae560b11f5549de"
          effect_ids: []
          event_digests:
            - "sha256:2b2c68a033d0088aba4c4d528dd2c6bf1d89ac5fb3d4a19072b66eff40908c5d"
          mutation_id: "kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
        kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:
          after_revision: 4
          aggregate_digest: "sha256:0e77fa25e7fffbea0f044396831e5409e46df0cb97f991f8c9915bbe8019c043"
          before_revision: 3
          command_digest: "sha256:84cb3889cc86575ad661cfc8d83209de84ac472d0eb8cad2ea20c9f615295957"
          effect_ids: []
          event_digests:
            - "sha256:10b4c9c1d8c92ad5ae933b7f76730e60e13ecd7ff68a1cf7151dd698fdfd6bae"
          mutation_id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da:
          after_revision: 2
          aggregate_digest: "sha256:00f2c8ef5cfe1abf527039c81b04db7edf6ab907a107dbfb99d23785ba6ea4a4"
          before_revision: 1
          command_digest: "sha256:202afb1f00245dc0383da4193a868f93e2b58cd2be504821fc28fcd094fbb2dd"
          effect_ids: []
          event_digests:
            - "sha256:5e395aa75416da5829d2e9b63b485ed4f7cb0517410e7f7b7f036d2e843e1888"
          mutation_id: "plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
        sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3:
          after_revision: 6
          aggregate_digest: "sha256:3fe4677fa2d5daf3870cba25c84cacead5bc537600d63920c754c9b87e358467"
          before_revision: 5
          command_digest: "sha256:22346aa18fe91f602e1b8edaddb900c66d93837a4c6f5593ffa58e131c77bde9"
          effect_ids: []
          event_digests:
            - "sha256:324a17dc789a4143c7cb0e31ae9f9d5881d98471253168f33c1a17ebeda06f00"
          mutation_id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3"
        sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611:
          after_revision: 3
          aggregate_digest: "sha256:81e32993d50e437cc9402fdc451f8ee601e0c67d032e54b5283cadbb8d4a877e"
          before_revision: 2
          command_digest: "sha256:03eedfe86bc1afcdf73f374d440adc6bd8bff80be6c71ca639dcf1d9ebdc0b04"
          effect_ids: []
          event_digests:
            - "sha256:4903695a4dca326f9c8c15260d122c0df42c7a242d46df7cc0c6377317df429d"
          mutation_id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        qualify-completed-scope-reader-boundaries:
          attempt: 1
          claim_id: "sha256:a45556b5975ff14b146409406f43709d15c33ef0b644fdb18e1af6fcb582d24d"
          definition:
            contract_digest: "sha256:6017d1f68d675d62026e0810aa16fd46c4f3951f200728418135548f94fe7603"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/finish-completed-scope.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/scope-extend.command.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts"
            expected_outputs:
              - "completed-reader-qualification-report"
            id: "qualify-completed-scope-reader-boundaries"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:99918168f9ddc12b850ea9a88806e90e3c76e162951d24bd9a7d229155abb2d8"
    documents:
      contracts:
        sha256:6017d1f68d675d62026e0810aa16fd46c4f3951f200728418135548f94fe7603:
          acceptance_criteria:
            - "Only the seven declared source/test paths change. Preserve original MRJ, VPB, cancelled and unstarted Tasks, all beforeimages and failed native evidence."
            - "The actual Node public Task list and intake work against retained canonical history. Strict completed proof authentication continues to reject forged copies, unknown proof bytes and the exact interrupted external partial before native admission."
            - "Raw TaskStore metadata becomes usable by native finish only through exact current source authentication. A separately bundled local backend receives no authority from object shape or a global registry. Remote backends do not recurse."
            - "The dedicated Task checkout requirement and exact adopted hosted-head qualification remain enforced. No production worktree routing, Doctor checks, Kernel state, plan or verification floor is weakened."
            - "Fresh full native CI, focused behavior regressions, routing and independent EVALUATOR qualify the implementation. Complete the protected canonical hosted PR/merge. Preserve data, credentials, runtime guards, all worktrees and branches."
          objective: "Restore authenticated completed-scope reads at native finish and across Node command bundle boundaries. Preserve strict proof, source, Kernel, history and verification floor checks. Ordinary WorkItem history and pre-Kernel metadata retain their existing read contract. Production dedicated Task checkout routing remains unchanged. Implement the simplest bounded source correction and behavior regressions."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts"
            - "node .agentplane/policy/check-routing.mjs"
      intent:
        context: "The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task."
        objective: "Fix completed-scope metadata readers across Node command bundles"
    events:
      -
        command_digest: "sha256:5c1094d13201fe07e650226e6b338ba91464c48bc40dc87216f9671505a7dd3b"
        id: "capture:202610310121-21Y197:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610310121-21Y197"
        occurred_at: "2026-10-31T01:21:20.991Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610310121-21Y197"
        task_revision: 1
      -
        command_digest: "sha256:202afb1f00245dc0383da4193a868f93e2b58cd2be504821fc28fcd094fbb2dd"
        id: "plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:299b79ae8cebc540c28384d95b9f6911966192330bb64922e69df30a9debc2da"
        occurred_at: "2026-10-31T01:22:08.145Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610310121-21Y197"
        task_revision: 2
      -
        command_digest: "sha256:03eedfe86bc1afcdf73f374d440adc6bd8bff80be6c71ca639dcf1d9ebdc0b04"
        id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:4e576097ea32cdb500e1d59b808442018ebb2aed295c0d4506b2d35f97b51611"
        occurred_at: "2026-10-31T01:23:09.386Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610310121-21Y197"
        task_revision: 3
      -
        command_digest: "sha256:84cb3889cc86575ad661cfc8d83209de84ac472d0eb8cad2ea20c9f615295957"
        id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a432f50765f1bffbd70dd5a2ea99ad057b392d9bd669762508a38cb824c10ae0:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        occurred_at: "2026-10-31T01:23:52.343Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610310121-21Y197"
        task_revision: 4
      -
        command_digest: "sha256:27d3fead842ba2ad8c2b3357d658950b73b3620f4322fff154662359da6ce800"
        id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:391de106280cdeae74e63aa968fcb53850633657312b531722fc54350b59b125:sha256:c68cb37c5bef39dc492a4583f628a29efe5da38201cf09bc6b492e8c395b2d44"
        occurred_at: "2026-10-31T01:23:57.769Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610310121-21Y197"
        task_revision: 5
      -
        command_digest: "sha256:22346aa18fe91f602e1b8edaddb900c66d93837a4c6f5593ffa58e131c77bde9"
        id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:343e40618545493e85130a5f4cad7a8928547ad6d072f7f2381c12aa645279d3"
        occurred_at: "2026-10-31T01:25:01.128Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610310121-21Y197"
        task_revision: 6
      -
        command_digest: "sha256:5ac692be8d91e01e1981249c4fa9f3485ab1fc46e0fc6e24fae560b11f5549de"
        id: "kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9ed1e6d80a425bd03045b4a60c68cd423488d5e3fa407fb521a3ed082677b8c9:sha256:d7241c58f64c72cdf7c1a1a4fea2767d21d5c371b052072d15f8376062c8f54f"
        occurred_at: "2026-10-31T01:25:03.800Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610310121-21Y197"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix completed-scope metadata readers across Node command bundles

The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.

## Scope

- In scope: The user authorized all eight SB recovery items, native framework fixes, PR/merge and deployment with data credentials and guards preserved. Canonical MRJ561 is merged. Native finish must authenticate its exact captured TaskStore metadata without trusting a copied task object. Node command bundles must preserve proof authentication across distinct LocalBackend module instances without a global permit registry. Ordinary historical WorkItem metadata and pre-Kernel tasks must remain readable under their original contract. Genuine completed-scope admissions and the exact applied external legacy partial with COMPLETED Kernel must retain strict verification, source, history, partial and forged-copy refusals. Preserve all old native evidence and Tasks. Production Task checkout routing remains unchanged. Add regressions that preserve dedicated control checkout requirements for adopted qualification. Candidate seven-path proposal262 is review material, not an immutable implementation mandate. Cancelled9QW179 mandated a rejected private routing hypothesis; preserve it as CANCELLED with unfulfilled criteria. Unstarted0AEYYS has a stale pre-merge baseline; do not grant its inherited delta. This new Task starts from canonical561 and depends only on mergedMRJ. Use full native CI, focused tests, independent EVALUATOR and protected canonical GitHub PR/merge. No host, credentials, runtime, cleanup, historical Task rewrite or forced Git effect is authorized in this source Task.
- Out of scope: unrelated refactors not required for "Fix completed-scope metadata readers across Node command bundles".

## Plan

1. Execute approved WorkItem qualify-completed-scope-reader-boundaries.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project agentplane --run packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/finish.canonical-closure.unit.test.ts packages/agentplane/src/commands/task/kernel-worktree-routing.test.ts packages/agentplane/src/commands/task/kernel-adopted-pr-route.test.ts packages/agentplane/src/commands/task/kernel-hosted-head-evidence.test.ts packages/agentplane/src/commands/pr/adoption-request.test.ts packages/agentplane/src/commands/pr/adoption-store.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
