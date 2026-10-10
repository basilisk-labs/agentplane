---
id: "202610081254-Z21QM3"
title: "Preregister M05 live experiment and release decision protocol"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 20
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-08T13:10:13.959Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-08T13:10:49.932Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-08T13:09:49.502Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "61bf92ce321e5e340f1022c5db4c594684da1cbe"
  review_identity_digest: "sha256:da1799b35c19fae9098fa86eed7ede0baae070cb68b8776c3133576611269869"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610081254-Z21QM3/68b3ab7a3ae436388f9b4e8ebfc66cb32a68a589a727fc350fc1c2eea08fd79d/quality-report.json"
  findings:
    - "Verified fresh manifest 977646f7925dc82fcb4af90ff18f13ed38d027661dc4940f75c3489f898a1ebf, all 13 required blocks, all four frozen input digests, supplied schema and retained check logs. Native validation records both assigned checks passed; no checks rerun."
    - "Reviewed exact committed target 61bf92ce321e5e340f1022c5db4c594684da1cbe. The only implementation document is artifacts/bench/m05-live-0.7.13/experiment-protocol.md, SHA256 286a43a5d6b803903a80780707163b87fdf0d29b46b5e1bd1c3b51fc7a1fd683; other commit paths are native task artifacts."
    - "The protocol preserves same-product three-arm coding comparisons, five genuine coding/control strata, hidden independent behavioral oracle and complete native planning/review/recovery obligations. The minimum 75-assignment pilot explicitly has only five independent task clusters; repetitions are not treated as new tasks."
    - "Independent prospective confirmation, task-clustered paired uncertainty, multiplicity across two treatment comparisons, unknown-cost and zero-success handling, setup accounting and negative-control separation satisfy the bounded contract. Observed corpus quality is explicitly distinguished from unresolved population noninferiority inference. Proposed numeric thresholds are not presented as approved or measured results."
    - "The document reflects the superseding user condition to establish savings before publication, preserves historical debt acceptance, and does not guarantee a favorable outcome. Secure credential choice, finite spend, real adapter/corpus/oracle qualification and exact campaign pins remain genuine unresolved launch prerequisites. Routine scientific design can proceed under delegated authority; this review creates no additional user approval gate."
token_usage:
  agent_runs: 3
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:b9fe3a28b6ba4403c1dfe258dcbd60ef23d72d03da618e4cdbfc109d44578a7b"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "external_host_turn_unallocatable"
  updated_at: "2026-10-08T14:36:25.272Z"
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
      - "documentation"
      - "repository_write"
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
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
  observed:
    authority_violations: []
    changed_components:
      - "artifacts"
    changed_paths:
      - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-14"
        result: "pass"
      -
        id: "recorded-check-15"
        result: "pass"
      -
        id: "recorded-check-16"
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
          - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:794036bc1d12935ea3464b98031cb5972fc9a94d08a30bf65023dfcbeaf7c462"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
        - "cli"
      observed:
        changed_components:
          - "artifacts"
        changed_files:
          - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
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
        - "docs_contract"
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
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "c02c008639f43d2ac427e72d5bafe99da6ec75ff"
  message: "📝 Z21QM3 task: preserve published PR identity"
comments:
  -
    author: "DOCS"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-10-08T13:10:49.932Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-10-08T14:36:25.272Z"
    author: "DOCS"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "c02c008639f43d2ac427e72d5bafe99da6ec75ff"
doc_version: 3
doc_updated_at: "2026-10-08T14:36:25.272Z"
doc_updated_by: "DOCS"
description: "Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent."
sections:
  Summary: |-
    Preregister M05 live experiment and release decision protocol

    Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.
  Scope: |-
    - In scope: Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.
    - Out of scope: unrelated refactors not required for "Preregister M05 live experiment and release decision protocol".
  Plan: "1. Execute approved WorkItem write-m05-experiment-protocol."
  Verify Steps: |-
    PLANNER fallback scaffold for "Preregister M05 live experiment and release decision protocol". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Preregister M05 live experiment and release decision protocol". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-08T13:10:49.932Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:368b7a384dc308af6a5cee7c4a2f07ba2b1c8f107e990967c0a1ebf299d4defc, input_digest=sha256:73d2c57855e9c6b180b2b12904a91687d335a1de42e573ab7aa0432d0a657698

    Details:

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (4/4)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (4/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:2f24db149221b9d88ba224f765604b69d5053b2139d05eaad3f09a1f9e11490c
    - checks_digest: sha256:33cfd49e21985a688603c2a0451c3e2722dda60d6f13b9cd84c4c5c8946b7d03
    - identity_digest: sha256:24871fbee7661770707fe54c198934e95d834f4c6f3b8c115230f3e05cb0b0eb

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
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
    digest: "sha256:87cacdf281e66178e294649690b9a3732b80bd9b9c317338bd76c09f58bab7d6"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610081254-Z21QM3/68b3ab7a3ae436388f9b4e8ebfc66cb32a68a589a727fc350fc1c2eea08fd79d/quality-report.json"
    findings:
      - "Verified fresh manifest 977646f7925dc82fcb4af90ff18f13ed38d027661dc4940f75c3489f898a1ebf, all 13 required blocks, all four frozen input digests, supplied schema and retained check logs. Native validation records both assigned checks passed; no checks rerun."
      - "Reviewed exact committed target 61bf92ce321e5e340f1022c5db4c594684da1cbe. The only implementation document is artifacts/bench/m05-live-0.7.13/experiment-protocol.md, SHA256 286a43a5d6b803903a80780707163b87fdf0d29b46b5e1bd1c3b51fc7a1fd683; other commit paths are native task artifacts."
      - "The protocol preserves same-product three-arm coding comparisons, five genuine coding/control strata, hidden independent behavioral oracle and complete native planning/review/recovery obligations. The minimum 75-assignment pilot explicitly has only five independent task clusters; repetitions are not treated as new tasks."
      - "Independent prospective confirmation, task-clustered paired uncertainty, multiplicity across two treatment comparisons, unknown-cost and zero-success handling, setup accounting and negative-control separation satisfy the bounded contract. Observed corpus quality is explicitly distinguished from unresolved population noninferiority inference. Proposed numeric thresholds are not presented as approved or measured results."
      - "The document reflects the superseding user condition to establish savings before publication, preserves historical debt acceptance, and does not guarantee a favorable outcome. Secure credential choice, finite spend, real adapter/corpus/oracle qualification and exact campaign pins remain genuine unresolved launch prerequisites. Routine scientific design can proceed under delegated authority; this review creates no additional user approval gate."
    implementation_commit: "61bf92ce321e5e340f1022c5db4c594684da1cbe"
    implementation_tree: "881df995599a04e0f5db3c85857efbfaf3c5286e"
    projected_at: "2026-10-08T13:09:49.502Z"
    review_identity_digest: "sha256:da1799b35c19fae9098fa86eed7ede0baae070cb68b8776c3133576611269869"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:e2f0970af63bd0d902ecebf80094b68af07fbe21d281c46a818b8484ac3387e4"
    work_order_id: "sha256:212a8ab4928341fdedd565dd8ea54e337044a0ea5c3e226bcb0c39cc65cc0449"
  implementation_commit:
    hash: "61bf92ce321e5e340f1022c5db4c594684da1cbe"
    message: "🚧 Z21QM3 task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "3dbcbad442bbeaadd73e6e698180c8cbaad55b30"
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
            digest: "sha256:f026db53d42b381fb2f436726e152257270b38d115acbe1536865d69722ae467"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "tests"
            repository_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            task_id: "202610081254-Z21QM3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6c37d7de3f5560afa3dd9061f0bad526117567bbb46e41675a943b8ea31722de"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
              kind: "USER"
              parent_authority_digest: "sha256:f026db53d42b381fb2f436726e152257270b38d115acbe1536865d69722ae467"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610081254-Z21QM3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
            added_scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            changed_paths:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            evidence_digest: "sha256:ab903ace856c6f736b533c8e80d10c81884c57542c159ca94e3ed1e1312a1757"
            kind: "authority_delta"
            previous_fingerprint: "sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
            repository_evidence_digest: "sha256:700d6bf89b2ca1069a5ea545a034e80c980eac8e1d2d1d8fb019b65ccd0be037"
            request_digest: "sha256:c2029c31cdcd1c0367339774541c557a7e2f5f65edc646e4f88d08fefde1dcc5"
            request_task_revision: 5
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:82035374309a53bf8cb930069a0d398551f1fa5ec457e20803511e3c6fedfbfc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6c37d7de3f5560afa3dd9061f0bad526117567bbb46e41675a943b8ea31722de"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610081254-Z21QM3"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            evidence_digest: "sha256:dd86c283f5749c73b8df540de94a628ee6b36718d11492dcfb39a7fab21f33c0"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:50f627000f2c5e3e46be518ab5eedac46ce8376e2176b78558b6f4572b3640d7"
        digest: "sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:91b37fd7472043692ab2033a7599b93f955d6da4e3b97978066dc21e49b60461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "documentation"
                - "repository_write"
              resources: []
              scope_roots:
                - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            expected_outputs:
              - "m05-study-protocol-evidence"
            id: "write-m05-experiment-protocol"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:e2f0970af63bd0d902ecebf80094b68af07fbe21d281c46a818b8484ac3387e4"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:7d98d0664660f997ab2026224aafc0c8cc02e6372ae5c89f73b88c1b3448d5bc"
          environment_digest: "sha256:1a484203fe59bfd47f81dd990ca9fe03ee35c252aba42831b0f7aa88b0274f0c"
          implementation_identity: "sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
          toolchain_digest: "sha256:ab3014daab256c8c1d73d45a185bac0fd2a03484f5380325fdda501638a7a13d"
        observed_at: "2026-10-08T13:10:18.948Z"
        status: "PASSED"
      id: "202610081254-Z21QM3"
      intent_digest: "sha256:610315aa636c92e3250da56f43f3572fa68cf5d78b0a213bd1199f2163b723f4"
      migration_receipts: []
      mutation_receipts:
        capture:202610081254-Z21QM3:
          after_revision: 1
          aggregate_digest: "sha256:a9e8f4ffd22998858790cb664f167fa74f92b2a88a8598d751fae1b2ca228167"
          before_revision: 0
          command_digest: "sha256:52a60062c8e06615d66773797dbca62ca09ba0fd04c038672652e5bfe56d67c0"
          effect_ids: []
          event_digests:
            - "sha256:2af67c0b0d6867b52693b708c65a992a028033230c3904fcb94b80b37d8ecfb2"
          mutation_id: "capture:202610081254-Z21QM3"
        final-validation:sha256:e2f0970af63bd0d902ecebf80094b68af07fbe21d281c46a818b8484ac3387e4:12:
          after_revision: 13
          aggregate_digest: "sha256:57ea892fc634af212aa53b5629bd6f86e872c1ce1685206afcf4e5b8dd25afef"
          before_revision: 12
          command_digest: "sha256:5d7b953fe347e023c0a11144176e1e2a7c02eed755d8a7d7732b9a3b2a112318"
          effect_ids: []
          event_digests:
            - "sha256:0088e04c23e478ba10e48b5bf897df75767e0f508caa44436a41ae3fadf8b40f"
          mutation_id: "final-validation:sha256:e2f0970af63bd0d902ecebf80094b68af07fbe21d281c46a818b8484ac3387e4:12"
        kernel_task_completion_required:sha256:d59110124498f81719316932e0c4b6cadff2a80e8081fa9dc23cc9729f673782:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250:
          after_revision: 14
          aggregate_digest: "sha256:c24a0a7e1036f69f45c1fa24115c8372a3bd6a7b5d31acad8dd432ddc5acfde9"
          before_revision: 13
          command_digest: "sha256:4b9da343c1bd5ce289c8eac3ba88a600927216c39e286ed7e359607a6cd90cf6"
          effect_ids: []
          event_digests:
            - "sha256:6506e01823adb309b8cedef63005903e3250de09b4283ee32c3fa5351145072a"
          mutation_id: "kernel_task_completion_required:sha256:d59110124498f81719316932e0c4b6cadff2a80e8081fa9dc23cc9729f673782:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
        kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 5
          aggregate_digest: "sha256:097daca06445503f33e1c8cbe9489a7ad22aa72beab7130b44b95a9e4bed5c52"
          before_revision: 4
          command_digest: "sha256:c5b9e1d5f8bb160a06b5bd7eafeee4642f7878e899aa1bd434ba7644342a71c4"
          effect_ids: []
          event_digests:
            - "sha256:76f9ddebdb7bd195a340f23cc2ed0c40e87dd4e1286fb260cb474a2c9d374e7d"
          mutation_id: "kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:
          after_revision: 7
          aggregate_digest: "sha256:b6b4f9d317e6dce18939aa81a4c68799b522ecd67721b888b799a936dd027672"
          before_revision: 6
          command_digest: "sha256:26f771b4f8e84923a478f72362303a5cebd3418fd9cb58b2da00f1d53a8fe37d"
          effect_ids: []
          event_digests:
            - "sha256:8db66cfc501549eb8d50c118950993123ee8536636847b87baf8346ad56ed459"
          mutation_id: "kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        kernel_work_item_inspection_required:sha256:b413ff0dc9bcaff14ad216e350c74b2d0f5ea872cc04536e0a6d5ed86e418831:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250:
          after_revision: 10
          aggregate_digest: "sha256:8cbb888692a3a4ee3c76807bbb227056a2d6c04c045f138b22b9d4387588d97b"
          before_revision: 9
          command_digest: "sha256:da1ffc46a69b7808a7a5893dfffb8e373fc72e34973d94a1d44c5eb588a7af4a"
          effect_ids: []
          event_digests:
            - "sha256:1b19f26a5f7d0a158432d6a8936942140e1a870714ce39e6ef4bb3458032501f"
          mutation_id: "kernel_work_item_inspection_required:sha256:b413ff0dc9bcaff14ad216e350c74b2d0f5ea872cc04536e0a6d5ed86e418831:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
        kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:
          after_revision: 4
          aggregate_digest: "sha256:3022b8ef934f98fe0f862486f320d69ace7dbf498a9da09ba7d2c79a338db963"
          before_revision: 3
          command_digest: "sha256:479f236ccf155737c87fc79a78fb46b59bd49e92d86d03b88b3b60f3d368d0fa"
          effect_ids: []
          event_digests:
            - "sha256:82c1761138581dcdde8d431b5b1fc5f446dddbea913eb1a6d10be1355f7ef9b5"
          mutation_id: "kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        result:sha256:212a8ab4928341fdedd565dd8ea54e337044a0ea5c3e226bcb0c39cc65cc0449:
          after_revision: 9
          aggregate_digest: "sha256:37ea247b85870ffe347cb965589caebec0fe17a6e2c6b49dc276c06115c1afe5"
          before_revision: 8
          command_digest: "sha256:172bbaa5104d8b183ea27ba9144a9ba86c986e573eea63171059b662f5087bd9"
          effect_ids: []
          event_digests:
            - "sha256:a6ddbaea96c867871083cd941691d833994d155311b1d1624511f6290e674b36"
          mutation_id: "result:sha256:212a8ab4928341fdedd565dd8ea54e337044a0ea5c3e226bcb0c39cc65cc0449"
        result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa:
          after_revision: 2
          aggregate_digest: "sha256:6d13f77b882e91abf908ee228f622c74d2bcf8767f186d32daca7d0280fbd121"
          before_revision: 1
          command_digest: "sha256:cde85b891340a7ab8e66232eee4c050a6455b9034334c331af440afc2667cfb6"
          effect_ids: []
          event_digests:
            - "sha256:fe77acb5948d4a049f408fb5dc7e36c746287846a7e75c4576d1eb943ef70ceb"
          mutation_id: "result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa"
        sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8:
          after_revision: 6
          aggregate_digest: "sha256:6d7ea348484d30d5177f2a2c853011a9930fbb4484be6293deb5ac3378a0c7d8"
          before_revision: 5
          command_digest: "sha256:1e98a1719b47f9fd893aa51f9e4bdc466de6e051f7097f16786e1f67dbaaff4a"
          effect_ids: []
          event_digests:
            - "sha256:a2e6c970aa8a1b077f470d5f760570db35371d2375282a3a15d3850927da8445"
          mutation_id: "sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8"
        sha256:7b0419d242ab6823eb1a7ea89d5f1d400d5287ba2b1acdc6721bbacb6d0acedc:
          after_revision: 8
          aggregate_digest: "sha256:bfbb911025515bd4ebad815e5dcb0a37ac2ec3e0f95c538f075e35cbd59013ba"
          before_revision: 7
          command_digest: "sha256:a4998de40eb0d9fade6c621498f7309f4688499f74c2bb6a7c2e4d3de5a1fb38"
          effect_ids: []
          event_digests:
            - "sha256:d5e857769234b100304fc6873f94f90affcb1d91a150a15b8a0331f4dbde626a"
          mutation_id: "sha256:7b0419d242ab6823eb1a7ea89d5f1d400d5287ba2b1acdc6721bbacb6d0acedc"
        sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4:
          after_revision: 3
          aggregate_digest: "sha256:65646629e59184cf71670907033938265332dd30aaea07b48d6cdd802eaecee7"
          before_revision: 2
          command_digest: "sha256:ffeeb4c75bffda3f30bac2cc8783df1119d4bf100c2457890547b5a71c46164f"
          effect_ids: []
          event_digests:
            - "sha256:c16c260435cf8553b0d6a089965c9b159da9cbf7e67e307c5f7b1e23e348cca7"
          mutation_id: "sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4"
        validation-resolution:sha256:63f8f0013f6ef157559180c332032db5ab16c97f1fa9049a4c28463eb08f3ae3:
          after_revision: 12
          aggregate_digest: "sha256:f2e4e132c174b7474d49d045687d224207ffa6fb54d14d73c35c38dcc6aa7afc"
          before_revision: 11
          command_digest: "sha256:05337c9252b0b0ce225ee1c1128358a860f71c14bcd9fb5cc3ae89862f6866ab"
          effect_ids: []
          event_digests:
            - "sha256:1cf48495fcb101b7eee8275569b97c97a46d1b705fbcd6c451f79464348ece56"
          mutation_id: "validation-resolution:sha256:63f8f0013f6ef157559180c332032db5ab16c97f1fa9049a4c28463eb08f3ae3"
        validation:sha256:68b3ab7a3ae436388f9b4e8ebfc66cb32a68a589a727fc350fc1c2eea08fd79d:
          after_revision: 11
          aggregate_digest: "sha256:d96024817ca8234c773a3368cb4090c83efd44278f382d2bac879a84bc0765e5"
          before_revision: 10
          command_digest: "sha256:397b94d8b357546799f971762aeae51f199ece45d8bd283419fb1d46f58d023f"
          effect_ids: []
          event_digests:
            - "sha256:f909ce41384a1e5177a77e902457e584b94e24cf7b019b85dc329f25da90471c"
          mutation_id: "validation:sha256:68b3ab7a3ae436388f9b4e8ebfc66cb32a68a589a727fc350fc1c2eea08fd79d"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        write-m05-experiment-protocol:
          attempt: 1
          claim_id: "sha256:e7416626364e046d459e84b8ec64d4fb252327af8834ecf8f3b475cf7064558f"
          definition:
            contract_digest: "sha256:91b37fd7472043692ab2033a7599b93f955d6da4e3b97978066dc21e49b60461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "documentation"
                - "repository_write"
              resources: []
              scope_roots:
                - "artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
            expected_outputs:
              - "m05-study-protocol-evidence"
            id: "write-m05-experiment-protocol"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:c9aba2bfc22844c6eb5dec29d42b47c6b64982a6fe4eceaed982a3fff6b5ee0c"
              id: "m05-study-protocol-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
              task_id: "202610081254-Z21QM3"
              work_item_id: "write-m05-experiment-protocol"
          result_digest: "sha256:d79974b7fc6b72df0f968d0217b0fd32f1735e3a1a3f141aeb24fe569d651d57"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:6ccd44f0043852f51efbe54987501fd4ce6d8bc211f435e0a5d33b8ac2ccdba3"
              - "sha256:da1799b35c19fae9098fa86eed7ede0baae070cb68b8776c3133576611269869"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:7d98d0664660f997ab2026224aafc0c8cc02e6372ae5c89f73b88c1b3448d5bc"
              environment_digest: "sha256:37f5ad8e3108b77c93c33369a890ee67e63fc8451ac98a2ac2f0e116e82c55d5"
              implementation_identity: "sha256:d79974b7fc6b72df0f968d0217b0fd32f1735e3a1a3f141aeb24fe569d651d57"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-08T13:09:49.502Z"
            status: "PASSED"
    digest: "sha256:645ea0aca11af37c76fd497f22be8ad323b9a5ba1f149b373ba5ae1cee799f9d"
    documents:
      contracts:
        sha256:91b37fd7472043692ab2033a7599b93f955d6da4e3b97978066dc21e49b60461:
          acceptance_criteria:
            - "Write only artifacts/bench/m05-live-0.7.13/experiment-protocol.md. Distinguish the proposed study protocol from a fully pinned and approved runnable campaign. Preserve historical evidence and mark unresolved prerequisites explicitly."
            - "Specify the same product, policy, objective, authority, model/effort and independent final oracle across no_recipe, instantiate and specialize arms. Count native selection, planning, execution, review, retries, failures and host work. Do not give the no-Recipe arm a free prewritten Plan or give specialization a known answer. Preserve ordinary native approvals and safety checks."
            - "Define a genuine coding corpus and independent behavioral oracle for five strata: direct bug fix, branch feature/change, recoverable check failure, no exact Recipe match and near match with unresolved binding/applicability. Specify measurable code outcomes, permitted paths, immutable hidden-oracle protection, recovery evidence and safe fallback/refusal outcomes. Negative controls must not silently change targets or be pooled as successful coding savings."
            - "Specify a pilot with at least five matched randomized repetitions per task and arm, randomized balanced order and frozen seeds/assignment ledger. Distinguish repetition count from the number of independent tasks. Preserve every assigned attempt, cancellation and failure; do not replace bad outcomes or stop favorably."
            - "Define an independent fixed confirmation sample to be registered after pilot analysis and before any confirmation observations. Separate pilot and confirmation identities and data. State the prospective sample-size/precision procedure, independent task-cluster requirement, corpus-selection constraints, retry and stopping limits, and all unresolved numeric decisions. Do not treat the minimum pilot repetitions as adequate proof or guarantee that confirmation will be conclusive."
            - "Define primary all-assigned observed cost divided by independently verified successes, success rates, setup-inclusive and steady-state costs, and separate intent-to-mutation, verified-result and closure latency. Include every role and billable failure; cached/reasoning subsets are not added twice. Report study-only oracle/setup costs transparently. Missing, partial or unattributable usage prevents an unsupported complete estimate; zero successes have no finite cost per success. Matched-success comparisons are secondary."
            - "Specify task-clustered paired uncertainty and workflow/transport/cache strata. Preregister multiplicity treatment for two treatment comparisons, quality-equivalence or noninferiority margins, safety hard failures, effect-size and uncertainty thresholds, setup amortization assumptions and the release decision matrix before confirmation. Label proposed thresholds requiring ratification; no unapproved numeric margin becomes an approval."
            - "Record the latest user requirement: establish savings before publication. Explain supported benefit, MIXED, adverse, insufficient and NOT_ESTABLISHED outcomes without promising savings. An inconclusive or failed study blocks publication under the current requirement; any changed release disposition requires a new explicit user decision. Prior acceptance of open M05 debt has been superseded, not erased."
            - "List exact pending product/source/build, corpus, Recipe closure, oracle, policy, runtime/sandbox/network, transport/cache/session, adapter, provider/model/effort, price basis, randomization and authority pins. State budget and secure credential decisions as unresolved. Stop before live calls until all concrete authority and qualification gates pass. Do not access credentials, design API implementation, invoke providers, publish or claim measured economics."
            - "Check the final document against the current charter and retained M05 limitations, run the declared diff and scoped formatting checks, and return the document hash with a concise coverage/remaining-gates report for independent evaluation."
          objective: "Write an English preregistration protocol for genuine M05 coding outcomes and an honest release decision, without implementing or launching an API experiment."
          role: "EXECUTOR"
          verification_commands:
            - "git diff --check"
            - "node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md"
      intent:
        context: "Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent."
        objective: "Preregister M05 live experiment and release decision protocol"
    events:
      -
        command_digest: "sha256:52a60062c8e06615d66773797dbca62ca09ba0fd04c038672652e5bfe56d67c0"
        id: "capture:202610081254-Z21QM3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610081254-Z21QM3"
        occurred_at: "2026-10-08T12:55:03.500Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610081254-Z21QM3"
        task_revision: 1
      -
        command_digest: "sha256:cde85b891340a7ab8e66232eee4c050a6455b9034334c331af440afc2667cfb6"
        id: "result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:502f691063d2e4641f6f952693ad9a449a85a2bb140eb4bf856bc1661d1540aa"
        occurred_at: "2026-10-08T12:57:18.032Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610081254-Z21QM3"
        task_revision: 2
      -
        command_digest: "sha256:ffeeb4c75bffda3f30bac2cc8783df1119d4bf100c2457890547b5a71c46164f"
        id: "sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:bb8cebe73d370b37096398bbc5ce9278995c2a2a7dd94682cd3a0d12675c34f4"
        occurred_at: "2026-10-08T12:57:34.646Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610081254-Z21QM3"
        task_revision: 3
      -
        command_digest: "sha256:479f236ccf155737c87fc79a78fb46b59bd49e92d86d03b88b3b60f3d368d0fa"
        id: "kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:27770b72324fc5a27a47c2614f194ddcf738b96aeae084231e5f9757fc770776:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T12:57:53.161Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610081254-Z21QM3"
        task_revision: 4
      -
        command_digest: "sha256:c5b9e1d5f8bb160a06b5bd7eafeee4642f7878e899aa1bd434ba7644342a71c4"
        id: "kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ad349c78b18b40a74cabda8627a81334365d13bd78d669e907a848f51ac48381:sha256:e7f9728974d8419bd04ca6e6458a37214ee4fe2f555e09b677197b8efa41980b"
        occurred_at: "2026-10-08T12:58:19.271Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610081254-Z21QM3"
        task_revision: 5
      -
        command_digest: "sha256:1e98a1719b47f9fd893aa51f9e4bdc466de6e051f7097f16786e1f67dbaaff4a"
        id: "sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:005b51572e57bdd2ea1e885c0892d4d8cab190cf118f6cfa21e2f232650b53a8"
        occurred_at: "2026-10-08T12:59:57.207Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610081254-Z21QM3"
        task_revision: 6
      -
        command_digest: "sha256:26f771b4f8e84923a478f72362303a5cebd3418fd9cb58b2da00f1d53a8fe37d"
        id: "kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3db080af0299fb3e5dfaf1fbc7b289dc9700ba07f29b88e1700a9aa705238c00:sha256:8183e8186c019eae128675f080b94e9b72723457f51b26c7b514f3a5713f2b8f"
        occurred_at: "2026-10-08T13:00:20.582Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610081254-Z21QM3"
        task_revision: 7
      -
        command_digest: "sha256:a4998de40eb0d9fade6c621498f7309f4688499f74c2bb6a7c2e4d3de5a1fb38"
        id: "sha256:7b0419d242ab6823eb1a7ea89d5f1d400d5287ba2b1acdc6721bbacb6d0acedc:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7b0419d242ab6823eb1a7ea89d5f1d400d5287ba2b1acdc6721bbacb6d0acedc"
        occurred_at: "2026-10-08T13:06:35.133Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610081254-Z21QM3"
        task_revision: 8
      -
        command_digest: "sha256:172bbaa5104d8b183ea27ba9144a9ba86c986e573eea63171059b662f5087bd9"
        id: "result:sha256:212a8ab4928341fdedd565dd8ea54e337044a0ea5c3e226bcb0c39cc65cc0449:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:212a8ab4928341fdedd565dd8ea54e337044a0ea5c3e226bcb0c39cc65cc0449"
        occurred_at: "2026-10-08T13:06:56.887Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610081254-Z21QM3"
        task_revision: 9
      -
        command_digest: "sha256:da1ffc46a69b7808a7a5893dfffb8e373fc72e34973d94a1d44c5eb588a7af4a"
        id: "kernel_work_item_inspection_required:sha256:b413ff0dc9bcaff14ad216e350c74b2d0f5ea872cc04536e0a6d5ed86e418831:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:b413ff0dc9bcaff14ad216e350c74b2d0f5ea872cc04536e0a6d5ed86e418831:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
        occurred_at: "2026-10-08T13:07:12.765Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610081254-Z21QM3"
        task_revision: 10
      -
        command_digest: "sha256:397b94d8b357546799f971762aeae51f199ece45d8bd283419fb1d46f58d023f"
        id: "validation:sha256:68b3ab7a3ae436388f9b4e8ebfc66cb32a68a589a727fc350fc1c2eea08fd79d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:68b3ab7a3ae436388f9b4e8ebfc66cb32a68a589a727fc350fc1c2eea08fd79d"
        occurred_at: "2026-10-08T13:10:01.437Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610081254-Z21QM3"
        task_revision: 11
      -
        command_digest: "sha256:05337c9252b0b0ce225ee1c1128358a860f71c14bcd9fb5cc3ae89862f6866ab"
        id: "validation-resolution:sha256:63f8f0013f6ef157559180c332032db5ab16c97f1fa9049a4c28463eb08f3ae3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:63f8f0013f6ef157559180c332032db5ab16c97f1fa9049a4c28463eb08f3ae3"
        occurred_at: "2026-10-08T13:10:07.624Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610081254-Z21QM3"
        task_revision: 12
      -
        command_digest: "sha256:5d7b953fe347e023c0a11144176e1e2a7c02eed755d8a7d7732b9a3b2a112318"
        id: "final-validation:sha256:e2f0970af63bd0d902ecebf80094b68af07fbe21d281c46a818b8484ac3387e4:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:e2f0970af63bd0d902ecebf80094b68af07fbe21d281c46a818b8484ac3387e4:12"
        occurred_at: "2026-10-08T13:10:56.982Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610081254-Z21QM3"
        task_revision: 13
      -
        command_digest: "sha256:4b9da343c1bd5ce289c8eac3ba88a600927216c39e286ed7e359607a6cd90cf6"
        id: "kernel_task_completion_required:sha256:d59110124498f81719316932e0c4b6cadff2a80e8081fa9dc23cc9729f673782:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:d59110124498f81719316932e0c4b6cadff2a80e8081fa9dc23cc9729f673782:sha256:8cb8655c867f044f66fc37cb8f170c2ebbc1d8dbd8aef862407e3e9e95f76250"
        occurred_at: "2026-10-08T13:11:41.421Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202610081254-Z21QM3"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preregister M05 live experiment and release decision protocol

Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.

## Scope

- In scope: Plan the user-authorized real M05 experiment before AgentPlane 0.7.13 publication. Produce an English study protocol, not API implementation: same-product no_recipe/instantiate/specialize comparisons, genuine coding corpus with direct fix, branch change, recovery, no-match and near-match strata; at least five matched randomized repetitions per task and arm for pilot; independent fixed confirmation sample registered after pilot and before confirmation; exact product/corpus/oracle/policy/runtime/transport identities; all-assigned observed cost per independently verified success and quality/time uncertainty; repeated tasks clustered; unknown cost never zero; no optional stopping or fabricated savings. Preserve latest requirement to establish savings before publication. Explicitly enumerate unresolved model/effort/budget/credential/adapter/product pins and stop rules. No live calls, API-dependent implementation, credential access, release publication or efficiency claim. Existing engineering task NDWDC5 is offline-only; adapter and genuine corpus still require qualification. User asks to plan, run, obtain results, then release. Budget and secure key decision are pending; methodology work is independent.
- Out of scope: unrelated refactors not required for "Preregister M05 live experiment and release decision protocol".

## Plan

1. Execute approved WorkItem write-m05-experiment-protocol.

## Verify Steps

PLANNER fallback scaffold for "Preregister M05 live experiment and release decision protocol". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Preregister M05 live experiment and release decision protocol". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-08T13:10:49.932Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:368b7a384dc308af6a5cee7c4a2f07ba2b1c8f107e990967c0a1ebf299d4defc, input_digest=sha256:73d2c57855e9c6b180b2b12904a91687d335a1de42e573ab7aa0432d0a657698

Details:

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check critical_paths (4/4)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check docs_contract (4/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: node node_modules/prettier/bin/prettier.cjs --check artifacts/bench/m05-live-0.7.13/experiment-protocol.md
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610081254-Z21QM3/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610081254-Z21QM3 Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:4cb454b3226fedc63a60bd5b89d5d4931b36775cf5a0bb295555a49031d340e3
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:2f24db149221b9d88ba224f765604b69d5053b2139d05eaad3f09a1f9e11490c
- checks_digest: sha256:33cfd49e21985a688603c2a0451c3e2722dda60d6f13b9cd84c4c5c8946b7d03
- identity_digest: sha256:24871fbee7661770707fe54c198934e95d834f4c6f3b8c115230f3e05cb0b0eb

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
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
- Completeness: `0/3` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:b9fe3a28b6ba4403c1dfe258dcbd60ef23d72d03da618e4cdbfc109d44578a7b`
- Unavailable reason: `external_host_turn_unallocatable`
- Updated at: `2026-10-08T14:36:25.272Z`
