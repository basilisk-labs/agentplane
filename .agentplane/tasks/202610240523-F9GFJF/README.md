---
id: "202610240523-F9GFJF"
title: "Align PR lifecycle tests with ancestry-safe artifact refresh commits"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run lint"
  - "node node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
  - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-24T06:20:01.841Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-24T05:40:02.924Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:641c6212acf86d32cc8e49fb9d809694ff1b2e4d4d815dd5ad606ceb08fc1f9f"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-24T05:40:02.924Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "7cb61781f38f0be51d86d9464482337e12c7a1e2"
  review_identity_digest: "sha256:90ff1e43a4a7f1bc515c79ef371fb350050f232add2c6987844fd7ff98a2798d"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610240523-F9GFJF/2de8bc1dbcdf585be33d05d09171bc66689948fb7bb72ec3d08aa80fde718f13/quality-report.json"
  findings:
    - "PR open asserts refresh HEAD, exact unchanged implementation parent SHA, two commits, source file in parent, task README and PR metadata in refresh HEAD, and clean task artifacts."
    - "PR update asserts refresh HEAD over the exact unchanged change commit SHA and retains tracked README, metadata, and clean-state checks."
    - "Adjacent PR lifecycle expectations were inspected; no other same-pattern stale assertion was found in this scoped file. Native focused Vitest 10/10, Prettier and lint passed on the retry with 4 GiB Node heap."
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
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
      digest: "sha256:cba261d9263138f97fdfe35abff42b19a5046d0ac295a694202f154530df363c"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "7cb61781f38f0be51d86d9464482337e12c7a1e2"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-24T05:23:11.499Z"
doc_updated_by: "CODER"
description: "In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration."
sections:
  Summary: |-
    Align PR lifecycle tests with ancestry-safe artifact refresh commits

    In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
  Scope: |-
    - In scope: In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
    - Out of scope: unrelated refactors not required for "Align PR lifecycle tests with ancestry-safe artifact refresh commits".
  Plan: |-
    1. Execute approved WorkItem align-pr-lifecycle-ancestry-tests.
    2. Execute approved WorkItem final-correction-90eafb38bae8.
  Verify Steps: |-
    PLANNER fallback scaffold for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:e3dd7edeb44c97623b23e10c56252c7c2937c3f15b35cb86b4fe2b28aa52a8d0"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610240523-F9GFJF/2de8bc1dbcdf585be33d05d09171bc66689948fb7bb72ec3d08aa80fde718f13/quality-report.json"
    findings:
      - "PR open asserts refresh HEAD, exact unchanged implementation parent SHA, two commits, source file in parent, task README and PR metadata in refresh HEAD, and clean task artifacts."
      - "PR update asserts refresh HEAD over the exact unchanged change commit SHA and retains tracked README, metadata, and clean-state checks."
      - "Adjacent PR lifecycle expectations were inspected; no other same-pattern stale assertion was found in this scoped file. Native focused Vitest 10/10, Prettier and lint passed on the retry with 4 GiB Node heap."
    implementation_commit: "7cb61781f38f0be51d86d9464482337e12c7a1e2"
    implementation_tree: "cc77eea09fb787c517fdf3baa3d25708b33da92d"
    projected_at: "2026-10-24T05:40:02.924Z"
    review_identity_digest: "sha256:90ff1e43a4a7f1bc515c79ef371fb350050f232add2c6987844fd7ff98a2798d"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:641c6212acf86d32cc8e49fb9d809694ff1b2e4d4d815dd5ad606ceb08fc1f9f"
    work_order_id: "sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500"
  task_execution_context:
    base_ref: "main"
    base_sha: "14d3439a3daf5a9c17625e4f4667b839e33962d6"
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
            digest: "sha256:cf6184e715b1e5b45ebfb9b070c82f079d1d2301975d079222f7a2f68b1e65c2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fec6437b5b8d358eb6b63d5802ae0615c5a82a5d8db16a4db38f06a00b3ad04f"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            task_id: "202610240523-F9GFJF"
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
            digest: "sha256:11c48697311f1ed7de9ce9d9bc404fc5f300a3899f805012eddcd10fa6e934dd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fec6437b5b8d358eb6b63d5802ae0615c5a82a5d8db16a4db38f06a00b3ad04f"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:cf6184e715b1e5b45ebfb9b070c82f079d1d2301975d079222f7a2f68b1e65c2"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            task_id: "202610240523-F9GFJF"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            evidence_digest: "sha256:591d3dbe8277d96a36da0a7abac77bcc033baee8d6c7004cca01ff950cf0b212"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:da627b9cfc0036078d56759aee14f3b4a3801dfe08fa2c642bf91d1d45646090"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:409f60c162fb38a9e78bff24db7900de9be2bb632a18811d89025c188113e624"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:11c48697311f1ed7de9ce9d9bc404fc5f300a3899f805012eddcd10fa6e934dd"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            task_id: "202610240523-F9GFJF"
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
            evidence_digest: "sha256:4edd50a8372e92ac64af0249b5080abf32fa73175cd2f091fca4f09272ab6707"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:ff57087635ffe5b4773974c584b55df93df763678635a152e7b8d8d6c3ee46b1"
        digest: "sha256:409f60c162fb38a9e78bff24db7900de9be2bb632a18811d89025c188113e624"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            expected_outputs:
              - "ancestry-safe-lifecycle-regression"
            id: "align-pr-lifecycle-ancestry-tests"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:e428ba9a8d2ebce7dec2ef24510d451ec9c76eb64a001d66d0464ae3b8b1dfa7"
            depends_on:
              - "align-pr-lifecycle-ancestry-tests"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            expected_outputs:
              - "final-correction-90eafb38bae8-evidence"
            id: "final-correction-90eafb38bae8"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610240523-F9GFJF"
      intent_digest: "sha256:9f63331b41f2da840c9fb01eb4f22516a6e0670cdd1215ff663b63b061811910"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:409f60c162fb38a9e78bff24db7900de9be2bb632a18811d89025c188113e624:
          after_revision: 19
          aggregate_digest: "sha256:0434517e90b599b15ef54aaf809667aa9f187dde67ceb925540c1431aa251967"
          before_revision: 18
          command_digest: "sha256:b20f1fe789e3c0f5f97dcfcd5f56d1dd976033fc325c9aa7c09254ec8cb277fe"
          effect_ids: []
          event_digests:
            - "sha256:3419350500c339cbdf4fb26d040ba2ca40eb2c407358f77a00b350618516fd7f"
          mutation_id: "amend:sha256:409f60c162fb38a9e78bff24db7900de9be2bb632a18811d89025c188113e624"
        capture:202610240523-F9GFJF:
          after_revision: 1
          aggregate_digest: "sha256:5c28df2455e55a6a92a743f1d8c09ec42e81750d5950093ab576f1eecf6a2f5b"
          before_revision: 0
          command_digest: "sha256:d6ccc97017a18fc42aad7b557f910be9b286b9efa719b9fa5134344a02165013"
          effect_ids: []
          event_digests:
            - "sha256:24eec89da92916821a46c230a083405a94296999b8087289bcf5ab326e1973d4"
          mutation_id: "capture:202610240523-F9GFJF"
        final-validation:sha256:90eafb38bae8168382f847ba9aa2d684b879a4355e37ffdfed48c88816fd640b:17:
          after_revision: 18
          aggregate_digest: "sha256:f7fa06396a9b4865a9eb63e13c1e59edaf2bdf106e5bce190953ef48328dac6b"
          before_revision: 17
          command_digest: "sha256:26137dbdfbb8cf5669d39c1ba422ddc5f890511a8048dcf8d9ae854e9c7a1460"
          effect_ids: []
          event_digests:
            - "sha256:340823d4044689e147ec2305d90c2a4c2bd127b2a8834a52997807ad88d43436"
          mutation_id: "final-validation:sha256:90eafb38bae8168382f847ba9aa2d684b879a4355e37ffdfed48c88816fd640b:17"
        kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 5
          aggregate_digest: "sha256:a0283ee045cb31cee27fa26200ea14bcc80c6602ff3e71b80566c1f2fe31b000"
          before_revision: 4
          command_digest: "sha256:ff139dcdd568192e317211927ec612f65e2323fa8d0c0d7a7db5e1fa831738fa"
          effect_ids: []
          event_digests:
            - "sha256:2acdf48cc2b60991c4042c9f54034068b6cee8cd1546ba3fda18a0a75f10be3f"
          mutation_id: "kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        kernel_work_item_claim_required:sha256:6678cba46dcd6a3df0d4542596dd3ddb675854716165c5273455bd9bdef79735:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:
          after_revision: 21
          aggregate_digest: "sha256:20c8e99e81aa8913f4c5448c4b0d854538bceffc021fde9c483a02693b16e1e9"
          before_revision: 20
          command_digest: "sha256:cc973ae7a2a0feef03e44d577e36a367b77b55ffcce219ea1835b10128d0514e"
          effect_ids: []
          event_digests:
            - "sha256:d4f21eab5720cdfc235da3a4e4495f4bdb154711718549dd0f6e189a166fb5a9"
          mutation_id: "kernel_work_item_claim_required:sha256:6678cba46dcd6a3df0d4542596dd3ddb675854716165c5273455bd9bdef79735:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 6
          aggregate_digest: "sha256:32e4e74ba997ff9f5f64a1ec3dd1879bd2caecfbaedb6a9039ba3be85b4c9640"
          before_revision: 5
          command_digest: "sha256:eae701f60ecf3bc5f9a4fa810f1a573b24d63d241a4266e67c48d299c5ba396f"
          effect_ids: []
          event_digests:
            - "sha256:5fd2e143de4eee002b5880fc95d9e3d9895eeb6cfbab57e8cbcfc28ee7bc2d8a"
          mutation_id: "kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        kernel_work_item_execution_required:sha256:68c56774e0c1ad82be7efc7b4cc8dc02aa3b175f8e81a17abb4f4fdd6ec22e7d:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:
          after_revision: 22
          aggregate_digest: "sha256:61549ca02180f39b60b983633db7c99824bd02309955327d299423a61b4cebe3"
          before_revision: 21
          command_digest: "sha256:536c305ce7b168573506ba81b6052c7fe278a4c4145c9b5dbe104cddcad8a8ac"
          effect_ids: []
          event_digests:
            - "sha256:78a89d71afc9dd22b0d393cae698cd45906a7782ee2f6f88600a8cedba93fa46"
          mutation_id: "kernel_work_item_execution_required:sha256:68c56774e0c1ad82be7efc7b4cc8dc02aa3b175f8e81a17abb4f4fdd6ec22e7d:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        kernel_work_item_execution_required:sha256:aa29f9ba2f1fa8550aaf5fe699efba94ccac7881b94b530e5f49ae00c92ce134:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:
          after_revision: 13
          aggregate_digest: "sha256:4df076ecb4cc6b0acbed8af42810dbe47e0acd8b3f3160de3a5280d5375f1a6f"
          before_revision: 12
          command_digest: "sha256:eaf8cc22c1b0bc0ef65df47821f6499598d43dc4e658f8e71d086e3dc858db5a"
          effect_ids: []
          event_digests:
            - "sha256:06c895457eb8f7e4da5f915f0bce4f88b40b826f7da435800b3e3e2c82c43316"
          mutation_id: "kernel_work_item_execution_required:sha256:aa29f9ba2f1fa8550aaf5fe699efba94ccac7881b94b530e5f49ae00c92ce134:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        kernel_work_item_inspection_required:sha256:2614d12e5b7f57151ec267c31eacd05c9b7ee892e11644a4fe609e568751fd4c:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:
          after_revision: 15
          aggregate_digest: "sha256:b802097a58b1973dcb8f70500f664352d39f09ac4523ed49ded1c30398eb5b60"
          before_revision: 14
          command_digest: "sha256:c4f9c5af9a06f69c025594be8ee494af7eb55ecbfe303dd1006b6957c4724549"
          effect_ids: []
          event_digests:
            - "sha256:89b4a20b6a0189bdf0fdbd7017b453c2c7be5cd9c8844679531733545077729b"
          mutation_id: "kernel_work_item_inspection_required:sha256:2614d12e5b7f57151ec267c31eacd05c9b7ee892e11644a4fe609e568751fd4c:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        kernel_work_item_inspection_required:sha256:8c1daa59d30fb8736b5f6a3a7282b371f03d505da95cdd652cc522f45db0cb17:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:
          after_revision: 9
          aggregate_digest: "sha256:bd30c8d3c2d06a182b4d8238cda36fc051d08ab76a423c6bab63140d595ffeef"
          before_revision: 8
          command_digest: "sha256:815a5c5efe25fd8e2819a8b63c5b398a6f7fe3c3dd88bc90b84e15a33796d555"
          effect_ids: []
          event_digests:
            - "sha256:edb93fe77f4c40a6a5f0362004975dadc205c7dc4508fc7f0f476a33b6313fb2"
          mutation_id: "kernel_work_item_inspection_required:sha256:8c1daa59d30fb8736b5f6a3a7282b371f03d505da95cdd652cc522f45db0cb17:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 4
          aggregate_digest: "sha256:15afefd3dbde94e91063a69a33eb6a2a90b6ae4bccb157ba3d09c15248121f4a"
          before_revision: 3
          command_digest: "sha256:d2356c3507f80dec2fb8749414e1410ae0db3faf3e27ac1df25998068a5fbad7"
          effect_ids: []
          event_digests:
            - "sha256:1cc9c9333372df11665deeb8f2b40e2e083ca7a31b26d9aeb8592d283670e9bd"
          mutation_id: "kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        kernel_work_item_rework_claim_required:sha256:a927eded14c46676a1095d9dc2c78099daa66a96bddb5970cd81e4fa45b406a3:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:
          after_revision: 12
          aggregate_digest: "sha256:cd5a434d4506c3c6d59f52014be6ab8c1316b18ab50f032315103875d8aa0afe"
          before_revision: 11
          command_digest: "sha256:f50779917c7a7c3b4df342ef77ce826d30645b4e28bb963831d7d6891d00e432"
          effect_ids: []
          event_digests:
            - "sha256:3407cd732b4a0e7043187b8daf1c8b3a5ec249193f13defdbfdafc7f960af599"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:a927eded14c46676a1095d9dc2c78099daa66a96bddb5970cd81e4fa45b406a3:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        result:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500:
          after_revision: 8
          aggregate_digest: "sha256:930084042c33d99705bf3c88569479d9e06ad844c5e92f0c9f7668cf03c5977c"
          before_revision: 7
          command_digest: "sha256:555e01a39d5b450a4bf0bd7afa55a6462a6a0a52ed36e9e2a662aed382057359"
          effect_ids: []
          event_digests:
            - "sha256:9fd2e3c9e27eadcacf1c9f12db54d6a651853b7c13111ddfed1c7ea7c9435dd3"
          mutation_id: "result:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500"
        result:sha256:b532bb31077d3cbdfad751119033cde9ebf4de3679ec1f538599038d015f93e7:
          after_revision: 14
          aggregate_digest: "sha256:aaca346736536ee6060423b05d7c137d0fadfb6bca8aba980b57a371f4cccc81"
          before_revision: 13
          command_digest: "sha256:4dee83000979cc3fb475e99c4f82f3c6c6b9144d30dddeb84facd11164de5fe7"
          effect_ids: []
          event_digests:
            - "sha256:58e1e48891c395c1beb11cbf4ca33b1c77a65f16d9e8d439c2d7fb1c17377b91"
          mutation_id: "result:sha256:b532bb31077d3cbdfad751119033cde9ebf4de3679ec1f538599038d015f93e7"
        result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91:
          after_revision: 2
          aggregate_digest: "sha256:602526651b264218df1f28c61527f71538f7057a813ea05d854b5c12800164f3"
          before_revision: 1
          command_digest: "sha256:9c33c0249ade99064ea25699ba48ebc9583f69e3db7b22258c1fe63b08bf827d"
          effect_ids: []
          event_digests:
            - "sha256:a26b8fc2b1f28df2c3910953881fe74e65d6134d7393923d551e90a3028a525e"
          mutation_id: "result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91"
        sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6:
          after_revision: 7
          aggregate_digest: "sha256:23e9dd7145b719c486aeef535b957910673479e28c23a3e28a8f5bc11590e16a"
          before_revision: 6
          command_digest: "sha256:3e8be6b34d718778134c1124f870312c46bb1d013639e77ecaf2717f31874417"
          effect_ids: []
          event_digests:
            - "sha256:11521e9274e05a515a2422c722f7bbf2823546d97395a07dd56469696bbcf350"
          mutation_id: "sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6"
        sha256:3275dd6b85576b6ff25e52d11c09f0b538d09745a647a98cf5f07724df664295:
          after_revision: 20
          aggregate_digest: "sha256:c5878ccb719d18d1670f0baf7a375587c90f0b0bc69b6d23fda258f215a001a2"
          before_revision: 19
          command_digest: "sha256:0cfcfc1b5ea638a06edd8c0a43b3eeb1ade3845963982994acfb4a7a59561541"
          effect_ids: []
          event_digests:
            - "sha256:6eb5bb14f97fe049c23e75f5660c31affb15617f6cd789a2f8846f73600cbe96"
          mutation_id: "sha256:3275dd6b85576b6ff25e52d11c09f0b538d09745a647a98cf5f07724df664295"
        sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad:
          after_revision: 3
          aggregate_digest: "sha256:e50ce4d371b78f250f44febbbd951f32e7d1944bb8228b8d00e1d825d8209eae"
          before_revision: 2
          command_digest: "sha256:664340106b974a5bddd9b86c5b5622e34a48ecb03c9004003c8aa041da3b4c89"
          effect_ids: []
          event_digests:
            - "sha256:48cdae2972ee4ab416215fc1f17a00d6c808a46a302444b42b0da512f81f80a3"
          mutation_id: "sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad"
        validation-resolution:sha256:051840fd51de0a94a45b39e32fc379396271e464405f966463081bd8e92caba3:
          after_revision: 11
          aggregate_digest: "sha256:feff693885e4a678a3cf904583067bb20f6fd1354497f8b12d36cc03e6a3cf58"
          before_revision: 10
          command_digest: "sha256:79ee7dbc340922c6610c1d8ea80761d551708332cc7587d79a8a0ced9fa24b96"
          effect_ids: []
          event_digests:
            - "sha256:518e4399e9b6bd2be2a9590e0f7472737e7e62444b1bbf12fc2924efe4cfd672"
          mutation_id: "validation-resolution:sha256:051840fd51de0a94a45b39e32fc379396271e464405f966463081bd8e92caba3"
        validation-resolution:sha256:93cacebbacb8d0cacc4f19440a21486b3612d706cb9e04e3a00b37ad1eb1f13a:
          after_revision: 17
          aggregate_digest: "sha256:cd0199467e436c0b514cba1f2d704ca5a5925a18813d26c75997c288ae1afaa5"
          before_revision: 16
          command_digest: "sha256:32f15f534147bf7b6e69ef23166fc94030a67f378feb62a35941206e8e5059f7"
          effect_ids: []
          event_digests:
            - "sha256:019ef2966f2522e4cafc1506c7568e54080f1a38aacc349632202ef8c2618b96"
          mutation_id: "validation-resolution:sha256:93cacebbacb8d0cacc4f19440a21486b3612d706cb9e04e3a00b37ad1eb1f13a"
        validation:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500:
          after_revision: 10
          aggregate_digest: "sha256:fedae99a02af3217ef3373f7111b438c9799ed90295f613c42f3587f86615a8a"
          before_revision: 9
          command_digest: "sha256:1d8d5f98a6ff600b91613d0c9bfcb408414b06d000d4594f1db586d540e4879c"
          effect_ids: []
          event_digests:
            - "sha256:12dc9abc7aaa0db284cf7bf7c56b56d55a789090cee8c94ca3a526055efd86f5"
          mutation_id: "validation:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500"
        validation:sha256:2de8bc1dbcdf585be33d05d09171bc66689948fb7bb72ec3d08aa80fde718f13:
          after_revision: 16
          aggregate_digest: "sha256:1bdfbc6d1e60dacd8ce92e2539a659612c55474584e6513a9ff3742e0cf50ef6"
          before_revision: 15
          command_digest: "sha256:c2d6b5bfb27b530182a9ef2cd36f23d9b6475e94299d50d8a5d34fe91fef7efe"
          effect_ids: []
          event_digests:
            - "sha256:ab3d0f9c3c48420e4384fb6245b741ecb9b744c456c6bdf2284ce61db2fcae9f"
          mutation_id: "validation:sha256:2de8bc1dbcdf585be33d05d09171bc66689948fb7bb72ec3d08aa80fde718f13"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
          digest: "sha256:fec6437b5b8d358eb6b63d5802ae0615c5a82a5d8db16a4db38f06a00b3ad04f"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c"
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
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
              expected_outputs:
                - "ancestry-safe-lifecycle-regression"
              id: "align-pr-lifecycle-ancestry-tests"
              optional: false
              required_inputs: []
      revision: 22
      schema_version: 1
      state: "ACTIVE"
      work_items:
        align-pr-lifecycle-ancestry-tests:
          attempt: 2
          claim_id: "sha256:96ddc99ce6bef0ac481463d703b076516169345b165cf90f9603cf68331a2fb3"
          definition:
            contract_digest: "sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            expected_outputs:
              - "ancestry-safe-lifecycle-regression"
            id: "align-pr-lifecycle-ancestry-tests"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:b0737648800c785621c0bf4ddf598167959270e842cc18be135090cf71191488"
              id: "ancestry-safe-lifecycle-regression"
              kind: "test_file"
              plan_revision: 1
              repository_fingerprint: "sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
              task_id: "202610240523-F9GFJF"
              work_item_id: "align-pr-lifecycle-ancestry-tests"
          result_digest: "sha256:13e7448defa9bf3b88ce69cac57ea5cd8a4f9f6ceda5cff5f9f35861c36b7789"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d6b1bc85e64843d0abc79aad0c9aee5dcd295731b9effc66e47e25e20794b194"
              - "sha256:90ff1e43a4a7f1bc515c79ef371fb350050f232add2c6987844fd7ff98a2798d"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:6a6218694551e6c497600166a9ab2973aedac2b55eab37ffe61ecc14e26c834e"
              environment_digest: "sha256:61a80bea43dbabc0e7ff3f3b39144c7ed1a8d6d12a411c8e52e1ffed549c7e5c"
              implementation_identity: "sha256:13e7448defa9bf3b88ce69cac57ea5cd8a4f9f6ceda5cff5f9f35861c36b7789"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-24T05:40:02.924Z"
            status: "PASSED"
        final-correction-90eafb38bae8:
          attempt: 1
          claim_id: "sha256:8b878880bdd8b6af3ced0fa2abe11ae57794246d8f259f6928eda9b3a6cd60d9"
          definition:
            contract_digest: "sha256:e428ba9a8d2ebce7dec2ef24510d451ec9c76eb64a001d66d0464ae3b8b1dfa7"
            depends_on:
              - "align-pr-lifecycle-ancestry-tests"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            expected_outputs:
              - "final-correction-90eafb38bae8-evidence"
            id: "final-correction-90eafb38bae8"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:b7d9ceb64d7333ed7e49d3c78865724716b3d7ccab0ed3a67a4cf33538e701f3"
    documents:
      contracts:
        sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c:
          acceptance_criteria:
            - "PR open test expects an artifact-refresh HEAD above the original implementation commit, two task branch commits, source change in the parent, and task artifacts in refresh HEAD."
            - "PR update test expects an artifact-refresh HEAD above the original change commit and still verifies tracked task artifacts and clean status."
            - "Test names and descriptions reflect separate commits; adjacent PR lifecycle assertions are audited without unrelated changes."
            - "Focused Vitest, formatting, lint, and full local CI pass before PR publication."
          objective: "Assert the actual ancestry-safe PR open and update artifact-refresh commit behavior without modifying production code."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            - "node node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            - "bun run lint"
        sha256:e428ba9a8d2ebce7dec2ef24510d451ec9c76eb64a001d66d0464ae3b8b1dfa7:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:90eafb38bae8168382f847ba9aa2d684b879a4355e37ffdfed48c88816fd640b. Read /home/agentplane/workspace/agentplane/.agentplane/tmp/pr-lifecycle-0713/.git/agentplane/kernel/exchanges/202610240523-F9GFJF/e626afb873d53fd2919888d9177a0bdee04bf506d8a1b3e2218651c47db5f828/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            - "node node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            - "bun run lint"
      intent:
        context: "In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration."
        objective: "Align PR lifecycle tests with ancestry-safe artifact refresh commits"
    events:
      -
        command_digest: "sha256:d6ccc97017a18fc42aad7b557f910be9b286b9efa719b9fa5134344a02165013"
        id: "capture:202610240523-F9GFJF:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610240523-F9GFJF"
        occurred_at: "2026-10-24T05:23:11.435Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610240523-F9GFJF"
        task_revision: 1
      -
        command_digest: "sha256:9c33c0249ade99064ea25699ba48ebc9583f69e3db7b22258c1fe63b08bf827d"
        id: "result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91"
        occurred_at: "2026-10-24T05:23:44.752Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610240523-F9GFJF"
        task_revision: 2
      -
        command_digest: "sha256:664340106b974a5bddd9b86c5b5622e34a48ecb03c9004003c8aa041da3b4c89"
        id: "sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad"
        occurred_at: "2026-10-24T05:23:52.863Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610240523-F9GFJF"
        task_revision: 3
      -
        command_digest: "sha256:d2356c3507f80dec2fb8749414e1410ae0db3faf3e27ac1df25998068a5fbad7"
        id: "kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T05:24:01.757Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610240523-F9GFJF"
        task_revision: 4
      -
        command_digest: "sha256:ff139dcdd568192e317211927ec612f65e2323fa8d0c0d7a7db5e1fa831738fa"
        id: "kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T05:24:13.191Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610240523-F9GFJF"
        task_revision: 5
      -
        command_digest: "sha256:eae701f60ecf3bc5f9a4fa810f1a573b24d63d241a4266e67c48d299c5ba396f"
        id: "kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T05:24:42.684Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610240523-F9GFJF"
        task_revision: 6
      -
        command_digest: "sha256:3e8be6b34d718778134c1124f870312c46bb1d013639e77ecaf2717f31874417"
        id: "sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6"
        occurred_at: "2026-10-24T05:30:07.396Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610240523-F9GFJF"
        task_revision: 7
      -
        command_digest: "sha256:555e01a39d5b450a4bf0bd7afa55a6462a6a0a52ed36e9e2a662aed382057359"
        id: "result:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500"
        occurred_at: "2026-10-24T05:30:51.051Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610240523-F9GFJF"
        task_revision: 8
      -
        command_digest: "sha256:815a5c5efe25fd8e2819a8b63c5b398a6f7fe3c3dd88bc90b84e15a33796d555"
        id: "kernel_work_item_inspection_required:sha256:8c1daa59d30fb8736b5f6a3a7282b371f03d505da95cdd652cc522f45db0cb17:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8c1daa59d30fb8736b5f6a3a7282b371f03d505da95cdd652cc522f45db0cb17:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        occurred_at: "2026-10-24T05:30:58.437Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610240523-F9GFJF"
        task_revision: 9
      -
        command_digest: "sha256:1d8d5f98a6ff600b91613d0c9bfcb408414b06d000d4594f1db586d540e4879c"
        id: "validation:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:1108c9d134a32fc1dcec025250565c7592fb035326e3883b32fd1cc619adc500"
        occurred_at: "2026-10-24T05:35:03.311Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610240523-F9GFJF"
        task_revision: 10
      -
        command_digest: "sha256:79ee7dbc340922c6610c1d8ea80761d551708332cc7587d79a8a0ced9fa24b96"
        id: "validation-resolution:sha256:051840fd51de0a94a45b39e32fc379396271e464405f966463081bd8e92caba3:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:051840fd51de0a94a45b39e32fc379396271e464405f966463081bd8e92caba3"
        occurred_at: "2026-10-24T05:35:09.660Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610240523-F9GFJF"
        task_revision: 11
      -
        command_digest: "sha256:f50779917c7a7c3b4df342ef77ce826d30645b4e28bb963831d7d6891d00e432"
        id: "kernel_work_item_rework_claim_required:sha256:a927eded14c46676a1095d9dc2c78099daa66a96bddb5970cd81e4fa45b406a3:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:a927eded14c46676a1095d9dc2c78099daa66a96bddb5970cd81e4fa45b406a3:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        occurred_at: "2026-10-24T05:35:19.228Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610240523-F9GFJF"
        task_revision: 12
      -
        command_digest: "sha256:eaf8cc22c1b0bc0ef65df47821f6499598d43dc4e658f8e71d086e3dc858db5a"
        id: "kernel_work_item_execution_required:sha256:aa29f9ba2f1fa8550aaf5fe699efba94ccac7881b94b530e5f49ae00c92ce134:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:aa29f9ba2f1fa8550aaf5fe699efba94ccac7881b94b530e5f49ae00c92ce134:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        occurred_at: "2026-10-24T05:35:27.982Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610240523-F9GFJF"
        task_revision: 13
      -
        command_digest: "sha256:4dee83000979cc3fb475e99c4f82f3c6c6b9144d30dddeb84facd11164de5fe7"
        id: "result:sha256:b532bb31077d3cbdfad751119033cde9ebf4de3679ec1f538599038d015f93e7:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b532bb31077d3cbdfad751119033cde9ebf4de3679ec1f538599038d015f93e7"
        occurred_at: "2026-10-24T05:36:07.709Z"
        payload_digest: "sha256:547a1dee88433dc0a10215a1423f9c2097aa6d02ab6eb93b99052e464e690496"
        task_id: "202610240523-F9GFJF"
        task_revision: 14
      -
        command_digest: "sha256:c4f9c5af9a06f69c025594be8ee494af7eb55ecbfe303dd1006b6957c4724549"
        id: "kernel_work_item_inspection_required:sha256:2614d12e5b7f57151ec267c31eacd05c9b7ee892e11644a4fe609e568751fd4c:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:2614d12e5b7f57151ec267c31eacd05c9b7ee892e11644a4fe609e568751fd4c:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        occurred_at: "2026-10-24T05:36:16.863Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610240523-F9GFJF"
        task_revision: 15
      -
        command_digest: "sha256:c2d6b5bfb27b530182a9ef2cd36f23d9b6475e94299d50d8a5d34fe91fef7efe"
        id: "validation:sha256:2de8bc1dbcdf585be33d05d09171bc66689948fb7bb72ec3d08aa80fde718f13:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2de8bc1dbcdf585be33d05d09171bc66689948fb7bb72ec3d08aa80fde718f13"
        occurred_at: "2026-10-24T05:40:12.203Z"
        payload_digest: "sha256:f24f9d65557899bc275efc46c8293dec2f2bbc34b55c1a89e414744eecc8a8c9"
        task_id: "202610240523-F9GFJF"
        task_revision: 16
      -
        command_digest: "sha256:32f15f534147bf7b6e69ef23166fc94030a67f378feb62a35941206e8e5059f7"
        id: "validation-resolution:sha256:93cacebbacb8d0cacc4f19440a21486b3612d706cb9e04e3a00b37ad1eb1f13a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:93cacebbacb8d0cacc4f19440a21486b3612d706cb9e04e3a00b37ad1eb1f13a"
        occurred_at: "2026-10-24T05:40:18.099Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610240523-F9GFJF"
        task_revision: 17
      -
        command_digest: "sha256:26137dbdfbb8cf5669d39c1ba422ddc5f890511a8048dcf8d9ae854e9c7a1460"
        id: "final-validation:sha256:90eafb38bae8168382f847ba9aa2d684b879a4355e37ffdfed48c88816fd640b:17:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:90eafb38bae8168382f847ba9aa2d684b879a4355e37ffdfed48c88816fd640b:17"
        occurred_at: "2026-10-24T06:19:10.705Z"
        payload_digest: "sha256:6ca3254aaabfe248a9372f668eda2ba19c598c4de6e197ce2d91d124dff9b968"
        task_id: "202610240523-F9GFJF"
        task_revision: 18
      -
        command_digest: "sha256:b20f1fe789e3c0f5f97dcfcd5f56d1dd976033fc325c9aa7c09254ec8cb277fe"
        id: "amend:sha256:409f60c162fb38a9e78bff24db7900de9be2bb632a18811d89025c188113e624:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:409f60c162fb38a9e78bff24db7900de9be2bb632a18811d89025c188113e624"
        occurred_at: "2026-10-24T06:19:40.929Z"
        payload_digest: "sha256:9b35555a95e3db10926d6bf83c8a3fdeca4218efbd9c9de546b6be9c2e203914"
        task_id: "202610240523-F9GFJF"
        task_revision: 19
      -
        command_digest: "sha256:0cfcfc1b5ea638a06edd8c0a43b3eeb1ade3845963982994acfb4a7a59561541"
        id: "sha256:3275dd6b85576b6ff25e52d11c09f0b538d09745a647a98cf5f07724df664295:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3275dd6b85576b6ff25e52d11c09f0b538d09745a647a98cf5f07724df664295"
        occurred_at: "2026-10-24T06:19:46.046Z"
        payload_digest: "sha256:881eb1d3f48c5092189b9c51aa93913d574c5e9406e4b901513a8741256569d1"
        task_id: "202610240523-F9GFJF"
        task_revision: 20
      -
        command_digest: "sha256:cc973ae7a2a0feef03e44d577e36a367b77b55ffcce219ea1835b10128d0514e"
        id: "kernel_work_item_claim_required:sha256:6678cba46dcd6a3df0d4542596dd3ddb675854716165c5273455bd9bdef79735:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6678cba46dcd6a3df0d4542596dd3ddb675854716165c5273455bd9bdef79735:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        occurred_at: "2026-10-24T06:20:08.203Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610240523-F9GFJF"
        task_revision: 21
      -
        command_digest: "sha256:536c305ce7b168573506ba81b6052c7fe278a4c4145c9b5dbe104cddcad8a8ac"
        id: "kernel_work_item_execution_required:sha256:68c56774e0c1ad82be7efc7b4cc8dc02aa3b175f8e81a17abb4f4fdd6ec22e7d:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:68c56774e0c1ad82be7efc7b4cc8dc02aa3b175f8e81a17abb4f4fdd6ec22e7d:sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
        occurred_at: "2026-10-24T06:20:15.665Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610240523-F9GFJF"
        task_revision: 22
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align PR lifecycle tests with ancestry-safe artifact refresh commits

In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.

## Scope

- In scope: In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
- Out of scope: unrelated refactors not required for "Align PR lifecycle tests with ancestry-safe artifact refresh commits".

## Plan

1. Execute approved WorkItem align-pr-lifecycle-ancestry-tests.
2. Execute approved WorkItem final-correction-90eafb38bae8.

## Verify Steps

PLANNER fallback scaffold for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
