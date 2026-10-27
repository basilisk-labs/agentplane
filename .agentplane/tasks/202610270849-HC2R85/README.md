---
id: "202610270849-HC2R85"
title: "Bound doctor archive commit inspection in partial clones without lazy object fetch"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 33
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-27T11:47:11.036Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-27T12:26:18.319Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-27T11:46:48.152Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "bcf0bb2df53f64930178db089625ed0eb32b5a07"
  review_identity_digest: "sha256:d7cfbd6b1db144afbf9ffb1d85eb7222cc0408176940970b2ce7df05c675239f"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610270849-HC2R85/6616df4bf68593bf339c27462553ba2258e062588334b1e708fc6e6c609a44d6/quality-report.json"
  findings:
    - "The archive lookup forces GIT_NO_LAZY_FETCH=1 and GIT_ALLOW_PROTOCOL='', disables prompts, and bounds each Git show process to 30 seconds and 8 MiB of output."
    - "A real local promisor fixture proves the missing parent can be lazily fetched in a control clone; the doctor lookup leaves it absent, creates no pack, emits no fetch child trace, reports its hash as INFO, and still classifies a locally available close commit as WARN."
    - "Native validation is passed at evaluator target bcf0bb2df53f64930178db089625ed0eb32b5a07: focused tests 24/24, typecheck, and full CI run-008 all exited 0."
token_usage:
  agent_runs: 2
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:c62ca918f3a37070d69989e935935f55ddf4858c1c1abb5e089b8bf30f625686"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "external_host_turn_unallocatable"
  updated_at: "2026-10-27T12:39:01.912Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/doctor/archive.test.ts"
      - "packages/agentplane/src/commands/doctor/archive.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/doctor/archive.test.ts"
          - "packages/agentplane/src/commands/doctor/archive.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:600d7842674873709324854ea75f2abb2156c629e32a99215ffa01876d44b666"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/doctor/archive.test.ts"
          - "packages/agentplane/src/commands/doctor/archive.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "8685d2e18b06d872447b9b133c504a15701f4958"
  message: "🧩 HC2R85 task: record hosted PR #6945"
comments:
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-10-27T12:26:18.319Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-10-27T12:39:01.912Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "8685d2e18b06d872447b9b133c504a15701f4958"
doc_version: 3
doc_updated_at: "2026-10-27T12:39:01.912Z"
doc_updated_by: "CODER"
description: "Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects."
sections:
  Summary: |-
    Bound doctor archive commit inspection in partial clones without lazy object fetch

    Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
  Scope: |-
    - In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
    - Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".
  Plan: "1. Execute approved WorkItem doctor-archive-local-objects."
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-27T12:26:18.319Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b9add3e9dd9e5692f2cf25038d6381200830b14503f4b84b31879a062846e7e2, input_digest=sha256:58711fdac1687d8adf929eee09ba8c2d9ba8d19c02c7c19c1c1b884a816f5f9e

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610270849-HC2R85 Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:fdb0872a03d394d5655615ef68ebaa9c7bf271571a8e51183e3dd52863047628
    - checks_digest: sha256:4dbcaac77106bbf1cc0b95a6c1c597ac00d6112c1692dd30e51f8b2b965c932e
    - identity_digest: sha256:b8bf8780e6d742ce5b5b090a75a1442d67c80d06e2099280254b9163c6d465e8

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610270849-HC2R85
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:fe2303f47aed250f44728154af7c50f01001e57985a9a7c5bf6aa458cdf0743d"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610270849-HC2R85/6616df4bf68593bf339c27462553ba2258e062588334b1e708fc6e6c609a44d6/quality-report.json"
    findings:
      - "The archive lookup forces GIT_NO_LAZY_FETCH=1 and GIT_ALLOW_PROTOCOL='', disables prompts, and bounds each Git show process to 30 seconds and 8 MiB of output."
      - "A real local promisor fixture proves the missing parent can be lazily fetched in a control clone; the doctor lookup leaves it absent, creates no pack, emits no fetch child trace, reports its hash as INFO, and still classifies a locally available close commit as WARN."
      - "Native validation is passed at evaluator target bcf0bb2df53f64930178db089625ed0eb32b5a07: focused tests 24/24, typecheck, and full CI run-008 all exited 0."
    implementation_commit: "bcf0bb2df53f64930178db089625ed0eb32b5a07"
    implementation_tree: "c6f6619d3331651c2a1870f07b9ce6cda635f681"
    projected_at: "2026-10-27T11:46:48.152Z"
    review_identity_digest: "sha256:d7cfbd6b1db144afbf9ffb1d85eb7222cc0408176940970b2ce7df05c675239f"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:59f26f57757fecde2eb5dd43ca03e361a77ec1b3b1f1c27a4cb1d880020e7a0c"
    work_order_id: "sha256:219791174b243674db66ec29262cc6a3cad63974b2dffaed6032f688f79998bd"
  implementation_commit:
    hash: "bcf0bb2df53f64930178db089625ed0eb32b5a07"
    message: "🚧 HC2R85 task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "a4b1534f06f52d10ae96e437a99514abe2629f52"
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
            digest: "sha256:5fbca06a71f710ccdca1a5f8f64ddbf59b13bf6a7100f5f658b5a6b3f9f2e2de"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
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
            digest: "sha256:5e41aa9b2f9f307c1b64522861a6269a4724383ace3dce4f85797583e93e5011"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5fbca06a71f710ccdca1a5f8f64ddbf59b13bf6a7100f5f658b5a6b3f9f2e2de"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            evidence_digest: "sha256:c911782174b0c2497c69f1cf0ebd106176fb5c88bd04b6fad87b5629fa06e439"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3f2c824e90dddf580b95101e62e12d33686489a3abfa600bdf2fbb72840dbad4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5e41aa9b2f9f307c1b64522861a6269a4724383ace3dce4f85797583e93e5011"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
            evidence_digest: "sha256:7cfa9bfd1f79430e185db8eaff3cf7e815048fd4db25c30e1d0b03775e223eec"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ff3235aa4800f7bdb752794b3c53b9dab433997a4957152de12a00caf1e7bbd2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3f2c824e90dddf580b95101e62e12d33686489a3abfa600bdf2fbb72840dbad4"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
              - "packages/agentplane/src/commands/doctor/archive.ts"
            task_id: "202610270849-HC2R85"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/doctor/archive.test.ts"
            evidence_digest: "sha256:d6085e7244efaa274979fdcb7cdd0128334d8b48810cbcaef5690751a8de08c8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:ac5218dce159d5833870ea73b0a6c2e7a182cc0a32668ebd6a468385bee9dd1f"
        digest: "sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a"
            depends_on: []
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
                - "packages/agentplane/src/commands/doctor/archive.ts"
                - "packages/agentplane/src/commands/doctor/archive.test.ts"
            expected_outputs:
              - "doctor-archive-local-lookup"
              - "doctor-archive-regression-tests"
            id: "doctor-archive-local-objects"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:59f26f57757fecde2eb5dd43ca03e361a77ec1b3b1f1c27a4cb1d880020e7a0c"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:e6fa388755a90eb4860133cb4fbe256d52926749c0ee897794a71204d87ab578"
          environment_digest: "sha256:f7b72d259a228b9f387528debf6a7f48649775dfca649974a37a3c4e8ce32f98"
          implementation_identity: "sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
          toolchain_digest: "sha256:336b6fb2815f69a01f10ed4971eec34c294fac0f46014da691f1298c7261c146"
        observed_at: "2026-10-27T11:47:14.346Z"
        status: "PASSED"
      id: "202610270849-HC2R85"
      intent_digest: "sha256:b210304f3d1fd2f7a4e4686ee838572cfc6ad5a6761d5d68278b7f5bb0ffc5ca"
      migration_receipts: []
      mutation_receipts:
        capture:202610270849-HC2R85:
          after_revision: 1
          aggregate_digest: "sha256:9724143c494a86b3c4898fa7deb5773b9254e5dd944029d9d53d631651a28b7e"
          before_revision: 0
          command_digest: "sha256:cb65d9f604217f42ba80cd0e1568baa7d636bc57ac7369326e5626d7a99d0f61"
          effect_ids: []
          event_digests:
            - "sha256:86a8f3c67c5fbc9b3544f7b62ef618456870f1b15a84fce19fc0c0982440aab9"
          mutation_id: "capture:202610270849-HC2R85"
        final-validation:sha256:59f26f57757fecde2eb5dd43ca03e361a77ec1b3b1f1c27a4cb1d880020e7a0c:25:
          after_revision: 26
          aggregate_digest: "sha256:800df1871424323df6ae983faa1b29fa3bc7bd923462035002cedd82ba1f6eec"
          before_revision: 25
          command_digest: "sha256:ac46dde1437aa36a885d6730f26930799ce9feeb82b44e0a2fea2b1303b1784b"
          effect_ids: []
          event_digests:
            - "sha256:522c2eb231efb5a701764687a0f945bf76cee118927978e270f0a457daa8a53a"
          mutation_id: "final-validation:sha256:59f26f57757fecde2eb5dd43ca03e361a77ec1b3b1f1c27a4cb1d880020e7a0c:25"
        kernel_task_completion_required:sha256:f95c1c28343c1797f31f6d8961254ab7d0759ea6aa9cadae35ea83eb26acc7b3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae:
          after_revision: 27
          aggregate_digest: "sha256:5c37b281f3fba3413fde166bac032493408ff9d2da929b62aa81b6a9778e1baf"
          before_revision: 26
          command_digest: "sha256:74f6cce648da6806ab3daaca86d8c2e046c43d37ca57704a9f0d8fd26dc0ea6e"
          effect_ids: []
          event_digests:
            - "sha256:d31e29fdb2a1e751abb234109c2d7e489d15fb829f02fc93b97eea72574a4c05"
          mutation_id: "kernel_task_completion_required:sha256:f95c1c28343c1797f31f6d8961254ab7d0759ea6aa9cadae35ea83eb26acc7b3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
        kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 5
          aggregate_digest: "sha256:b63e1c611b79795df1298ff1c26f55d3bc9f7187ceab9b04e525c6cd9600357f"
          before_revision: 4
          command_digest: "sha256:440d3344aa8265ffe2a397e726f53bf6e339a272bd45aa7cd99a964a509a8dc3"
          effect_ids: []
          event_digests:
            - "sha256:9ffb412303311e3dcd55145149f5e2d532b32f3561b25c80fab6e1bd75a31cd2"
          mutation_id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 6
          aggregate_digest: "sha256:13d5ebe44de8fe5e780bce36199ee3a0ab53a9494880f7c38452233b91e46c43"
          before_revision: 5
          command_digest: "sha256:0f28ed2baaeccdeae5a04240fcfe2ac66feaa320c61bfc983261da6ab7730dfa"
          effect_ids: []
          event_digests:
            - "sha256:862a201814e05c1ffcbe63d18f014f33cb18a2346cbe10d686f3295a583de032"
          mutation_id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:
          after_revision: 13
          aggregate_digest: "sha256:72d738b1424c3e2f41867c0c05d905b805cd5a2b08f9db9cd7b32d366a1b11b5"
          before_revision: 12
          command_digest: "sha256:0a6104ca2e68ce808f0da5eef102bed6030784f6fb68f65fc157634b70d4defe"
          effect_ids: []
          event_digests:
            - "sha256:f840514a6e02e9fc7f181c6d24e8d308209e796fefe32b90437310b944db23e5"
          mutation_id: "kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:
          after_revision: 20
          aggregate_digest: "sha256:b219ac1b2a9815158ba50e59fd9c563307d8f67bf003248e1e9c0cb83abed2f8"
          before_revision: 19
          command_digest: "sha256:f3514e78247e712a5e93ecc8fe048ed7f9b3703a2ad6071ec1821d2d646ad6c6"
          effect_ids: []
          event_digests:
            - "sha256:44c77482e501cf39826242ce8dd8600a807e62ac05adec545b11dd5b5460ac66"
          mutation_id: "kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:
          after_revision: 16
          aggregate_digest: "sha256:fc74e875e9365d212ba9908b07a40e2a9b0e7fbc7fb746bb3200a4d6df1e2ed2"
          before_revision: 15
          command_digest: "sha256:cb63f3b8fe8fb11df4fa799a9ac917a24dc56e6d13311c3de0e89996b8b8b9b5"
          effect_ids: []
          event_digests:
            - "sha256:ecbeb4b2d42b6e2f72de87c184bd6ff903bcb291fa5b25257ef9268652c51c1b"
          mutation_id: "kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:
          after_revision: 9
          aggregate_digest: "sha256:442bc31c821a1f2e8f4e21c8cb955ff94f780b3fdf26d715f9463befdcdc41fc"
          before_revision: 8
          command_digest: "sha256:7df589a22a69c0295e46b000bca36b27baf49ea448a6583cf885a1e8666d988c"
          effect_ids: []
          event_digests:
            - "sha256:e2decaf23d0594a6c70973db3811564cc4ff7c1b8e2a0eefaf70e07ff6fdea2f"
          mutation_id: "kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        kernel_work_item_inspection_required:sha256:cafdcb25ea4a40cd6fc252df211321df72ca30c89df7ba71c018cf8750b697f3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae:
          after_revision: 23
          aggregate_digest: "sha256:4a296a3713708fc4dc66a38796b84c7e84d0f9ce46c624e7e7b756e03536ab8b"
          before_revision: 22
          command_digest: "sha256:90ae2f453fdf88356a7931089424b661db111a73635c0d0bdbf450376c13c4fb"
          effect_ids: []
          event_digests:
            - "sha256:c7349cd85d2daaa8db7f8631f5b17c6c38776f8d653c1ceb402391ef343034b0"
          mutation_id: "kernel_work_item_inspection_required:sha256:cafdcb25ea4a40cd6fc252df211321df72ca30c89df7ba71c018cf8750b697f3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
        kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:
          after_revision: 4
          aggregate_digest: "sha256:7e3bfe10a4832c20456f871676552304eb5b5ba9fc7ab28c97cc27d37fda87f9"
          before_revision: 3
          command_digest: "sha256:8ddb8de69023693510fd58acf03653fb5f54a8a97d9187acd1aa553560b8508b"
          effect_ids: []
          event_digests:
            - "sha256:6016af24f5221fd5dff9a036b8c2a844de143abe5128dcf235637f4389374b8a"
          mutation_id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:
          after_revision: 19
          aggregate_digest: "sha256:3c2c5d0256fd4dc4960e0b4e1b7e893e44c978832e9676c0059c24a1123dd2a4"
          before_revision: 18
          command_digest: "sha256:ccd7652631431168d65b2110f7408ccc83bbeeb732cb3b6e02fad7ad9e24adb5"
          effect_ids: []
          event_digests:
            - "sha256:4164763eb69b0d7e66e8364c0585e3ded4f40682ca2fe66fe01b1860babe0b4b"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:
          after_revision: 12
          aggregate_digest: "sha256:3ed9dfd27e7321605444408329d61f7aab5c1ddba350b3e7f9576a8e7c8438ee"
          before_revision: 11
          command_digest: "sha256:72f68d9346dd93bcdb5aebdcd48b758cf4880df732bb17b4bd28441a03104de8"
          effect_ids: []
          event_digests:
            - "sha256:5ef0603b2aa8007a77b08de6c4d34815c8ba6d7d7154ca7318e58921e52f2def"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:
          after_revision: 15
          aggregate_digest: "sha256:03276d7b425849cd7216cc5dbc88f677ff09e6dad7b89c4c366adf81aff7f5d6"
          before_revision: 14
          command_digest: "sha256:e8eb010ea297ea69af2edae5bf70aa1b229b1ef2c84d8f478ab3bc5222f37e9e"
          effect_ids: []
          event_digests:
            - "sha256:db1be3c70a05654223f8d44d2557006072b03936aa8f63e702f87a870551e8c8"
          mutation_id: "result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        result:sha256:219791174b243674db66ec29262cc6a3cad63974b2dffaed6032f688f79998bd:
          after_revision: 22
          aggregate_digest: "sha256:aeaca3b15fee0ebaf97539d63a8c0ab694147061a2eb74a2340a8d8b7bead611"
          before_revision: 21
          command_digest: "sha256:df29417bfd13929a6ba3e837b5deaa88b6fac38b37afef39b5b89bb6b5c6aff4"
          effect_ids: []
          event_digests:
            - "sha256:d13237cc17efe84b5f2fca36784c2b889d02ea6c7b30a038c76b07a9d6e22697"
          mutation_id: "result:sha256:219791174b243674db66ec29262cc6a3cad63974b2dffaed6032f688f79998bd"
        result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6:
          after_revision: 8
          aggregate_digest: "sha256:1397cb9b66605017d953c68a02f2f7fc6d9740f691dd4863d2f61384cb3e8c04"
          before_revision: 7
          command_digest: "sha256:5d58bec0797de3621057e87504cc25e13a28b8446d5b6c42b4301147c3c8aa2c"
          effect_ids: []
          event_digests:
            - "sha256:40a1056eef660372734f2531a63760b0de88cda535b95f95f030be859c0205c8"
          mutation_id: "result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6"
        result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3:
          after_revision: 2
          aggregate_digest: "sha256:f7b4ba85b56aba3ad5e685cfbf5625f63345eb2233418a3d51410653e3a9d6e5"
          before_revision: 1
          command_digest: "sha256:88d51af08517d3c7fb6058ba38f0490eb1c37d767c79f696567289505da51f69"
          effect_ids: []
          event_digests:
            - "sha256:1c470b2535b92ae9001f3ce6af8b961178c08a131acb48728d43851011a147ad"
          mutation_id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3"
        sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf:
          after_revision: 7
          aggregate_digest: "sha256:08eb9a0e212d5ab7c5f2c0a9cd724efa29bbc86f49d32a2f238d8939b7d0f654"
          before_revision: 6
          command_digest: "sha256:cca3be5f478f0132f836bd1e8669757fed89144538d6fb074b39564697ba12eb"
          effect_ids: []
          event_digests:
            - "sha256:90da6bf377fcf6bdda76319e8fbae4f6619b8d4c2ea9c1e543e91f0348158736"
          mutation_id: "sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf"
        sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8:
          after_revision: 3
          aggregate_digest: "sha256:4629f8b206d9b0d41a542b57f181a2b040e89977cac3c35cafeae1f3c5ce641d"
          before_revision: 2
          command_digest: "sha256:92c8eb4831e2959677c057cb3864f98f0825bf6a6ed19c5b37c47d14bcfde7a7"
          effect_ids: []
          event_digests:
            - "sha256:c5aab388a7103ba21929049cce7ba5912f821ef319b0f1c1bcc5e1e31087825a"
          mutation_id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8"
        sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f:
          after_revision: 14
          aggregate_digest: "sha256:a07544afbaa7a02ac8799d971f0a4a38a0d9bed2d2a63cc92c500cd217a48019"
          before_revision: 13
          command_digest: "sha256:66d797b242d407f915f0dd71a9b4d21d661b9a9c7d0a3ec653afa213fda0a393"
          effect_ids: []
          event_digests:
            - "sha256:e567bd07c371a4542af4f520d8d0bfad4d38aeea563860039115bd6c03fbe97f"
          mutation_id: "sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f"
        sha256:eded467a6e985664c73c6f5d59c543361f5bb69ce8146ca70e1cfee6d91b6921:
          after_revision: 21
          aggregate_digest: "sha256:3aec705c8b19ac619248228b556b5a142d3a2ac05c4351d1dc1492ad39c87fde"
          before_revision: 20
          command_digest: "sha256:0ce3494de47f8bd0befdce8b4151e58dba2e32391d53c7a7a82f32b5c8d8f2bf"
          effect_ids: []
          event_digests:
            - "sha256:ff6b164f4a4afb6a14413f9a0f345ca566be0030110d1e603856ce4ce035c04c"
          mutation_id: "sha256:eded467a6e985664c73c6f5d59c543361f5bb69ce8146ca70e1cfee6d91b6921"
        validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad:
          after_revision: 18
          aggregate_digest: "sha256:47fec27362bc3e2c6012fb8a29c78272697e95456a0d146e6442a610c2254281"
          before_revision: 17
          command_digest: "sha256:3b6d05754e9205b9472a493165446d4a006f9bd2c818d5a10b161572e14de8f8"
          effect_ids: []
          event_digests:
            - "sha256:eb5ea98786b9dbe75de6b9a68b0ef5899e2cd22dc3e59fc973591e96c1e01460"
          mutation_id: "validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad"
        validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f:
          after_revision: 11
          aggregate_digest: "sha256:f8e7e2bf2144c22931e414f2e5b7a2f7f1c95916dd71d4d3795d300c7b64a1a3"
          before_revision: 10
          command_digest: "sha256:c2167c50d2fbc00a20991c0abc774afbef4e95475fed654d29e2303d4df873da"
          effect_ids: []
          event_digests:
            - "sha256:bc1f5781c1ea493c18120caa230fd303dd7f77d1a0f5b34f60054a6ff87f895a"
          mutation_id: "validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f"
        validation-resolution:sha256:b072dc1ad88ec2ffb953b19e4063e0e536e5001d1f4086a97408d7ca9dc95df5:
          after_revision: 25
          aggregate_digest: "sha256:8d3dc2ee6fea1ece8afd6aa3027f237894447e64d9a3eaf83b2d6e1686edb5d0"
          before_revision: 24
          command_digest: "sha256:1f623760530ac8be16cfcc37dddb261aef8c1356bccc2171cac4755911fc58ea"
          effect_ids: []
          event_digests:
            - "sha256:0830c5e1b0ef112ef96ad7bd17c39f84d2467e8ada136149fae09b9c40080305"
          mutation_id: "validation-resolution:sha256:b072dc1ad88ec2ffb953b19e4063e0e536e5001d1f4086a97408d7ca9dc95df5"
        validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:
          after_revision: 17
          aggregate_digest: "sha256:acf6abffc108cb30480bbe69a12fcef5eec5dc975e12a17da4d7452eebafcf28"
          before_revision: 16
          command_digest: "sha256:3cce82ca1bb61c6c2d88b5a2f53a4b85d847a24b5d4a739d4d6c1992e2ff33ca"
          effect_ids: []
          event_digests:
            - "sha256:7ad88b8089684df38b1b57ddaceb0f648ce8f4a722beb390f138e197835f2192"
          mutation_id: "validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        validation:sha256:6616df4bf68593bf339c27462553ba2258e062588334b1e708fc6e6c609a44d6:
          after_revision: 24
          aggregate_digest: "sha256:63e1ce01da4e1ea907e82b8a75277e7d529313055d814c8b760508ba1b7f6998"
          before_revision: 23
          command_digest: "sha256:d066c544c2fe9b01e09c019444fd33f6997868807b85e3b66c56f228e4da80e0"
          effect_ids: []
          event_digests:
            - "sha256:b0d33b37e02cbc4234f3f90e590c5b8ddc946ed1630b0e095289b71a672ad4fa"
          mutation_id: "validation:sha256:6616df4bf68593bf339c27462553ba2258e062588334b1e708fc6e6c609a44d6"
        validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea:
          after_revision: 10
          aggregate_digest: "sha256:4cfb1f615be362b013097b79258b9a1180d333090050a6d129aaa5fd74495991"
          before_revision: 9
          command_digest: "sha256:1233737fff33a572ef23cc0e31495ae281ce829b599375047ae9991db82be383"
          effect_ids: []
          event_digests:
            - "sha256:58dd71bc4a49edbda21eeca0002e1910398842f1743914f66ac977bcbab0b1cf"
          mutation_id: "validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea"
      plan_history: []
      revision: 27
      schema_version: 1
      state: "COMPLETED"
      work_items:
        doctor-archive-local-objects:
          attempt: 3
          claim_id: "sha256:efe24cf2d19d9775c2e9d4cabf8aa07c577a844b870ea1fa3d12d0f6ec11a4d7"
          definition:
            contract_digest: "sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a"
            depends_on: []
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
                - "packages/agentplane/src/commands/doctor/archive.ts"
                - "packages/agentplane/src/commands/doctor/archive.test.ts"
            expected_outputs:
              - "doctor-archive-local-lookup"
              - "doctor-archive-regression-tests"
            id: "doctor-archive-local-objects"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 3
              digest: "sha256:addeb108525c6276526ee023c976f07b5ab2f9d85355e1f75581100e4899152f"
              id: "doctor-archive-local-lookup"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
              task_id: "202610270849-HC2R85"
              work_item_id: "doctor-archive-local-objects"
            -
              attempt: 3
              digest: "sha256:dddde39d085060ae2dc2542809de5a13bbcf32ff0c376c59fab216664a6517b2"
              id: "doctor-archive-regression-tests"
              kind: "tests"
              plan_revision: 1
              repository_fingerprint: "sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
              task_id: "202610270849-HC2R85"
              work_item_id: "doctor-archive-local-objects"
          result_digest: "sha256:f527b82ff9fbafcf02510d29b29a3004c60be40909c87abfc54855fae174fa65"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:a5cb7f6dcae458b34bb6da92d69c07a6a435b6c8ee5676108df0d2cbbd261f31"
              - "sha256:d7cfbd6b1db144afbf9ffb1d85eb7222cc0408176940970b2ce7df05c675239f"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:e6fa388755a90eb4860133cb4fbe256d52926749c0ee897794a71204d87ab578"
              environment_digest: "sha256:c0c89a0de8d672e96c149d568432febeda56e884838cccb85d01124f9a97c389"
              implementation_identity: "sha256:f527b82ff9fbafcf02510d29b29a3004c60be40909c87abfc54855fae174fa65"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-27T11:46:48.152Z"
            status: "PASSED"
    digest: "sha256:4b75f32ca2ab2498abe0fbedfe96b4d4722223ffc6c87aceb9f4817477ae9352"
    documents:
      contracts:
        sha256:4279c3f48944944fcfdf4c6aeb6dc2aa1b636f06e923dc408b03bff631bfc82a:
          acceptance_criteria:
            - "Historical summary lookup never triggers lazy promisor network fetch or unbounded object download; locally available commits continue to classify close-commit references as before."
            - "Missing or unreadable historical objects remain visible as INFO unknown-hash findings, while other doctor failures are unchanged."
            - "Focused tests cover local commit, unavailable historical object, and a promisor-style missing-object lookup without a network fetch."
          objective: "Ensure doctor archive historical DONE-task commit summaries use only locally available Git objects, with bounded process behavior and explicit INFO findings for absent objects in partial/promisor clones."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
            - "bun run --filter=agentplane typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects."
        objective: "Bound doctor archive commit inspection in partial clones without lazy object fetch"
    events:
      -
        command_digest: "sha256:cb65d9f604217f42ba80cd0e1568baa7d636bc57ac7369326e5626d7a99d0f61"
        id: "capture:202610270849-HC2R85:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610270849-HC2R85"
        occurred_at: "2026-10-27T08:49:46.901Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610270849-HC2R85"
        task_revision: 1
      -
        command_digest: "sha256:88d51af08517d3c7fb6058ba38f0490eb1c37d767c79f696567289505da51f69"
        id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d94d59e89ac13fe2d5e033cea0f7cd9fbf15f6429dac3c8a834a2ae92e3156e3"
        occurred_at: "2026-10-27T08:51:07.542Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610270849-HC2R85"
        task_revision: 2
      -
        command_digest: "sha256:92c8eb4831e2959677c057cb3864f98f0825bf6a6ed19c5b37c47d14bcfde7a7"
        id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:69129c28198617b8509cebece349f323ac71e7ba4afcf7f2ddb9c73762d443e8"
        occurred_at: "2026-10-27T08:51:30.345Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610270849-HC2R85"
        task_revision: 3
      -
        command_digest: "sha256:8ddb8de69023693510fd58acf03653fb5f54a8a97d9187acd1aa553560b8508b"
        id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2847038cfb4f809576fca67bb4ab4d57836f2a20f41d880c65fe2fd5238d5a04:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:51:54.603Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610270849-HC2R85"
        task_revision: 4
      -
        command_digest: "sha256:440d3344aa8265ffe2a397e726f53bf6e339a272bd45aa7cd99a964a509a8dc3"
        id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8492a8a7ee605f9e1d49960d0eed127a2829204159e73242689046cf4c3e1a66:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:52:26.744Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610270849-HC2R85"
        task_revision: 5
      -
        command_digest: "sha256:0f28ed2baaeccdeae5a04240fcfe2ac66feaa320c61bfc983261da6ab7730dfa"
        id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:89fc6a5b03098f240c02e36d1ce4c0bc5d68318bc6b0aefa6475c12b6aff0657:sha256:227694f64e84f7da0a55527628b964bb58b010a5d20ce9663e07a20cdb3665a4"
        occurred_at: "2026-10-27T08:54:01.570Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610270849-HC2R85"
        task_revision: 6
      -
        command_digest: "sha256:cca3be5f478f0132f836bd1e8669757fed89144538d6fb074b39564697ba12eb"
        id: "sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:57bbba71bfb3d1926577a878df8f3db90003a3ea1f74ff9148b707a1f76c64cf"
        occurred_at: "2026-10-27T09:17:02.112Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610270849-HC2R85"
        task_revision: 7
      -
        command_digest: "sha256:5d58bec0797de3621057e87504cc25e13a28b8446d5b6c42b4301147c3c8aa2c"
        id: "result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c595abf7b77dc2b841f0959f42cc7d7388997918d159cbb3f81e7e8d724931d6"
        occurred_at: "2026-10-27T09:17:12.567Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610270849-HC2R85"
        task_revision: 8
      -
        command_digest: "sha256:7df589a22a69c0295e46b000bca36b27baf49ea448a6583cf885a1e8666d988c"
        id: "kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c5cd5715533a33f25e6c61fcb343ff1eac159bf8f8add93cef6bef6dfd6c975b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        occurred_at: "2026-10-27T09:17:21.523Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610270849-HC2R85"
        task_revision: 9
      -
        command_digest: "sha256:1233737fff33a572ef23cc0e31495ae281ce829b599375047ae9991db82be383"
        id: "validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:cdc6d75a3b36acda7db8067d1f4c7723162c6cb0eec49894194b96d28de54dea"
        occurred_at: "2026-10-27T09:56:15.542Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610270849-HC2R85"
        task_revision: 10
      -
        command_digest: "sha256:c2167c50d2fbc00a20991c0abc774afbef4e95475fed654d29e2303d4df873da"
        id: "validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7d5990c4bbf06666cbde218234dc7a96dc7732d14ce08b15e6ff4723d8b6924f"
        occurred_at: "2026-10-27T09:56:21.800Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610270849-HC2R85"
        task_revision: 11
      -
        command_digest: "sha256:72f68d9346dd93bcdb5aebdcd48b758cf4880df732bb17b4bd28441a03104de8"
        id: "kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:b4ba2cea2ea2ed414acb0db2bbbdf30eb7640370eb5a4cc0a863d8e46557efce:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        occurred_at: "2026-10-27T09:56:37.935Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610270849-HC2R85"
        task_revision: 12
      -
        command_digest: "sha256:0a6104ca2e68ce808f0da5eef102bed6030784f6fb68f65fc157634b70d4defe"
        id: "kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a1a19461c5ae670b04a069608ca86e24046d3d358ac334554e73ce8b3c529b0b:sha256:aff765602a550270ee3d5fdec4769a094a9e00f9653a2645edaad6442dd9bc01"
        occurred_at: "2026-10-27T09:56:51.624Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610270849-HC2R85"
        task_revision: 13
      -
        command_digest: "sha256:66d797b242d407f915f0dd71a9b4d21d661b9a9c7d0a3ec653afa213fda0a393"
        id: "sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:da9f8e80df1f064e867036028d13380d32e3cad762adc726aefdbd414a74ca7f"
        occurred_at: "2026-10-27T10:34:40.355Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610270849-HC2R85"
        task_revision: 14
      -
        command_digest: "sha256:e8eb010ea297ea69af2edae5bf70aa1b229b1ef2c84d8f478ab3bc5222f37e9e"
        id: "result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        occurred_at: "2026-10-27T10:34:54.465Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202610270849-HC2R85"
        task_revision: 15
      -
        command_digest: "sha256:cb63f3b8fe8fb11df4fa799a9ac917a24dc56e6d13311c3de0e89996b8b8b9b5"
        id: "kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:4f5ef4a981a6a2b35a50e1fa292700b638c7842cb1bf1a71c1c6bbb332895427:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        occurred_at: "2026-10-27T10:35:05.870Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610270849-HC2R85"
        task_revision: 16
      -
        command_digest: "sha256:3cce82ca1bb61c6c2d88b5a2f53a4b85d847a24b5d4a739d4d6c1992e2ff33ca"
        id: "validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:148d0a3c3d0e255eba60de45a14ccb0c2be859b962e97c38173fd2066f73cfb2"
        occurred_at: "2026-10-27T10:44:42.973Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202610270849-HC2R85"
        task_revision: 17
      -
        command_digest: "sha256:3b6d05754e9205b9472a493165446d4a006f9bd2c818d5a10b161572e14de8f8"
        id: "validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:5a8784c83821290b4d805e68600bf191c44c90500616b1fff23fd1f7651a54ad"
        occurred_at: "2026-10-27T10:44:48.612Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610270849-HC2R85"
        task_revision: 18
      -
        command_digest: "sha256:ccd7652631431168d65b2110f7408ccc83bbeeb732cb3b6e02fad7ad9e24adb5"
        id: "kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:128eca141ccbeba46fba18c342ec21f8d2a64fc4cfb1ad8cb5b2adf38c451ca1:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        occurred_at: "2026-10-27T10:44:59.996Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610270849-HC2R85"
        task_revision: 19
      -
        command_digest: "sha256:f3514e78247e712a5e93ecc8fe048ed7f9b3703a2ad6071ec1821d2d646ad6c6"
        id: "kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b19c035446b7425ddc637311f3a50d0979c57a2e1f5e06b57dcdfc921622331a:sha256:b4ccc6d14fd666b20f6e12134556490882d3c9b0377e9f80151cc481cc9b9ba3"
        occurred_at: "2026-10-27T10:45:09.597Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610270849-HC2R85"
        task_revision: 20
      -
        command_digest: "sha256:0ce3494de47f8bd0befdce8b4151e58dba2e32391d53c7a7a82f32b5c8d8f2bf"
        id: "sha256:eded467a6e985664c73c6f5d59c543361f5bb69ce8146ca70e1cfee6d91b6921:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:eded467a6e985664c73c6f5d59c543361f5bb69ce8146ca70e1cfee6d91b6921"
        occurred_at: "2026-10-27T10:47:51.601Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202610270849-HC2R85"
        task_revision: 21
      -
        command_digest: "sha256:df29417bfd13929a6ba3e837b5deaa88b6fac38b37afef39b5b89bb6b5c6aff4"
        id: "result:sha256:219791174b243674db66ec29262cc6a3cad63974b2dffaed6032f688f79998bd:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:219791174b243674db66ec29262cc6a3cad63974b2dffaed6032f688f79998bd"
        occurred_at: "2026-10-27T10:48:03.278Z"
        payload_digest: "sha256:0909349b0439b554db4b4450982b8c538fcc513bb5154268100b33efa83f8996"
        task_id: "202610270849-HC2R85"
        task_revision: 22
      -
        command_digest: "sha256:90ae2f453fdf88356a7931089424b661db111a73635c0d0bdbf450376c13c4fb"
        id: "kernel_work_item_inspection_required:sha256:cafdcb25ea4a40cd6fc252df211321df72ca30c89df7ba71c018cf8750b697f3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cafdcb25ea4a40cd6fc252df211321df72ca30c89df7ba71c018cf8750b697f3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
        occurred_at: "2026-10-27T10:48:13.232Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610270849-HC2R85"
        task_revision: 23
      -
        command_digest: "sha256:d066c544c2fe9b01e09c019444fd33f6997868807b85e3b66c56f228e4da80e0"
        id: "validation:sha256:6616df4bf68593bf339c27462553ba2258e062588334b1e708fc6e6c609a44d6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6616df4bf68593bf339c27462553ba2258e062588334b1e708fc6e6c609a44d6"
        occurred_at: "2026-10-27T11:46:59.278Z"
        payload_digest: "sha256:4878ab2391d59246cd05275fa5f1dec131ae6cd0229e806e9863b1686acfa772"
        task_id: "202610270849-HC2R85"
        task_revision: 24
      -
        command_digest: "sha256:1f623760530ac8be16cfcc37dddb261aef8c1356bccc2171cac4755911fc58ea"
        id: "validation-resolution:sha256:b072dc1ad88ec2ffb953b19e4063e0e536e5001d1f4086a97408d7ca9dc95df5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b072dc1ad88ec2ffb953b19e4063e0e536e5001d1f4086a97408d7ca9dc95df5"
        occurred_at: "2026-10-27T11:47:04.686Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610270849-HC2R85"
        task_revision: 25
      -
        command_digest: "sha256:ac46dde1437aa36a885d6730f26930799ce9feeb82b44e0a2fea2b1303b1784b"
        id: "final-validation:sha256:59f26f57757fecde2eb5dd43ca03e361a77ec1b3b1f1c27a4cb1d880020e7a0c:25:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:59f26f57757fecde2eb5dd43ca03e361a77ec1b3b1f1c27a4cb1d880020e7a0c:25"
        occurred_at: "2026-10-27T12:26:15.415Z"
        payload_digest: "sha256:167c2d467e6693d8efdcbc5039a158d30fd13910fb6c02524c600bbe96131e9e"
        task_id: "202610270849-HC2R85"
        task_revision: 26
      -
        command_digest: "sha256:74f6cce648da6806ab3daaca86d8c2e046c43d37ca57704a9f0d8fd26dc0ea6e"
        id: "kernel_task_completion_required:sha256:f95c1c28343c1797f31f6d8961254ab7d0759ea6aa9cadae35ea83eb26acc7b3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:f95c1c28343c1797f31f6d8961254ab7d0759ea6aa9cadae35ea83eb26acc7b3:sha256:97c4e770bdd84085606c46bce839e54444b0bc6caa61832ddce614e6744dbfae"
        occurred_at: "2026-10-27T12:28:39.076Z"
        payload_digest: "sha256:d08012178a7192b443a635e5fae8cdb3dbd6ec3c73f202ec4ef33edaa7d6189a"
        task_id: "202610270849-HC2R85"
        task_revision: 27
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bound doctor archive commit inspection in partial clones without lazy object fetch

Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.

## Scope

- In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
- Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".

## Plan

1. Execute approved WorkItem doctor-archive-local-objects.

## Verify Steps

PLANNER fallback scaffold for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound doctor archive commit inspection in partial clones without lazy object fetch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-27T12:26:18.319Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b9add3e9dd9e5692f2cf25038d6381200830b14503f4b84b31879a062846e7e2, input_digest=sha256:58711fdac1687d8adf929eee09ba8c2d9ba8d19c02c7c19c1c1b884a816f5f9e

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610270849-HC2R85/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610270849-HC2R85 Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:3872451d3ac87bd85a54ed14330cb8705a9cd4c6725d02ffa084d54bb219dd10
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:fdb0872a03d394d5655615ef68ebaa9c7bf271571a8e51183e3dd52863047628
- checks_digest: sha256:4dbcaac77106bbf1cc0b95a6c1c597ac00d6112c1692dd30e51f8b2b965c932e
- identity_digest: sha256:b8bf8780e6d742ce5b5b090a75a1442d67c80d06e2099280254b9163c6d465e8

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610270849-HC2R85
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/2` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:c62ca918f3a37070d69989e935935f55ddf4858c1c1abb5e089b8bf30f625686`
- Unavailable reason: `external_host_turn_unallocatable`
- Updated at: `2026-10-27T12:39:01.912Z`
