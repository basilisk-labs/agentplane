---
id: "202610142156-4MGWZM"
title: "Bound GitHub CI aggregate job-output projection"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 42
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "fix"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
  - "bun run typecheck"
  - "npm run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-15T01:50:18.289Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-15T02:08:46.875Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-15T01:50:18.289Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "29757addd936732c6deb10eea11a89c22147a214"
  review_identity_digest: "sha256:337cb584a40b41d147da578dd3a224027e41b53916c7d2bfc2692de506e10cb3"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610142156-4MGWZM/87cccb0c716c61c459726255e3180313923673fdf9d452972fb0372e57f956ad/quality-report.json"
  findings:
    - "ROOT read all thirteen genuine EVAL context blocks and verified canonical pointer digests and byte sizes, all three required criteria and unchanged three mandatory commands. All three pathful required input digests match their contracts; repository evidence excludes its own digest field. The pathless report4b3e7f matches canonical JSON of the retained genuine Task29 environment proposal. Historical preparation NOT_RUN statements remain historical, with new native evidence separately bound."
    - "ROOT read the complete corrective diff46261..29757: only process-supervision.test.ts adds a ready file after installing the SIGTERM handler and waits for it at the existing before-recording-process-start boundary. The120ms wall,1000ms idle,zero grace and existing six escalation assertions are retained. No production supervisor, timeout or API changes. Original completed CI quota WorkItem and all prior failed evidence are retained."
    - "No new source edits or invented repository evidence were needed for attempt3. Native selected retained same-WorkItem repository evidence whose implementation_commit and evaluator_target equal actualHEAD29757. The current canonical source result75d45634 and new native input4057d8cc bind this attempt, command set, runtime and repository fingerprint. Historical shared-Node disappearance is not relabelled as a code defect."
    - "ROOT independently rehashed148 deduplicated artifact/raw references, all25 closed zero-exit wrapper stages and50 raw wrapper files, and freshly observed all1914 retained PID/start pairs absent. There are23 recursive native manifests; four nested exit2/3 results are intentional verification-contract fixtures and their parent core group passed. Own APFSX volume was authenticated and detached, with mount absent. No evaluator tests or lifecycle actions were run."
    - "Genuine native SOURCE run009 passed38 focused checks, run010 typecheck passed, and run011 FULL passed all six groups in1132247ms. Core771 files7055PASS plus1 conditional network packaging SKIP; process-supervision all12PASS7804ms. Runtime36, five CLI chunks, critical Windows98 and coverage guard101 passed. The network packaging skip requires its existing explicit opt-in; no new skip or check omission was introduced."
    - "The corrected source and committed bytes/modes, original completed CI WorkItem, index and canonicalmain d886 were preserved. The separately qualified successor Node and linked closure were used for fresh native execution; prior dyld/missing-Node failures remain retained. Historical EPERM causality remains UNKNOWN. Passing the readiness test does not establish that historical cause."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
      - "ci"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "scripts/checks/plan-github-ci.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "scripts/checks/plan-github-ci.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "scripts/checks/plan-github-ci.mjs"
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
        id: "recorded-check-10"
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
    - "effect_ci"
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
          - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "scripts/checks/plan-github-ci.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:259a78a16b0981afcfaea915b775bad875f2c1ffa1cb69a2a90c285aba0cd415"
      escalation_reasons:
        - "central_component:scripts/checks/plan-github-ci.mjs"
        - "central_path:scripts/checks/plan-github-ci.mjs"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "scripts/checks/plan-github-ci.mjs"
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
      - "repository_effect:ci"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "29757addd936732c6deb10eea11a89c22147a214"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-15T02:08:46.875Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-15T02:08:47.522Z"
doc_updated_by: "SUPERVISOR"
description: "Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer."
sections:
  Summary: |-
    Bound GitHub CI aggregate job-output projection

    Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
  Scope: |-
    - In scope: Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
    - Out of scope: unrelated refactors not required for "Bound GitHub CI aggregate job-output projection".
  Plan: |-
    1. Execute approved WorkItem bound-aggregate-job-output.
    2. Execute approved WorkItem final-correction-0a4dae5da69c.
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound GitHub CI aggregate job-output projection". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound GitHub CI aggregate job-output projection". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-15T02:08:46.875Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3db0f6aa78dde1420e6337e84e5b50136740c8d82360d9ac34958f7537cb8fab, input_digest=sha256:769db26d5116118017c0c421a678854128b55193c2ceadb36916e237e8404901

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: npm run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: npm run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: npm run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: npm run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610142156-4MGWZM Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2
    - policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
    - capability_digest: sha256:b5e6e850a6a4608be1489c415068a7b0507651d7c5748e04517f0f464b64ba5f
    - checks_digest: sha256:4d1577ea2c92b70e6ac94aea3a39fb2a14ba93dcab77e1c33a52e2ba2c20d28a
    - identity_digest: sha256:17ddb07dbafc343b5b4c26d85f02299355e635b9f140d08d2ca6f681ff732cfc

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610142156-4MGWZM
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
    digest: "sha256:eb057a93782a40d12a2d215b20a0783868d1adcfd4dee4290c0e4e362d86904b"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610142156-4MGWZM/87cccb0c716c61c459726255e3180313923673fdf9d452972fb0372e57f956ad/quality-report.json"
    findings:
      - "ROOT read all thirteen genuine EVAL context blocks and verified canonical pointer digests and byte sizes, all three required criteria and unchanged three mandatory commands. All three pathful required input digests match their contracts; repository evidence excludes its own digest field. The pathless report4b3e7f matches canonical JSON of the retained genuine Task29 environment proposal. Historical preparation NOT_RUN statements remain historical, with new native evidence separately bound."
      - "ROOT read the complete corrective diff46261..29757: only process-supervision.test.ts adds a ready file after installing the SIGTERM handler and waits for it at the existing before-recording-process-start boundary. The120ms wall,1000ms idle,zero grace and existing six escalation assertions are retained. No production supervisor, timeout or API changes. Original completed CI quota WorkItem and all prior failed evidence are retained."
      - "No new source edits or invented repository evidence were needed for attempt3. Native selected retained same-WorkItem repository evidence whose implementation_commit and evaluator_target equal actualHEAD29757. The current canonical source result75d45634 and new native input4057d8cc bind this attempt, command set, runtime and repository fingerprint. Historical shared-Node disappearance is not relabelled as a code defect."
      - "ROOT independently rehashed148 deduplicated artifact/raw references, all25 closed zero-exit wrapper stages and50 raw wrapper files, and freshly observed all1914 retained PID/start pairs absent. There are23 recursive native manifests; four nested exit2/3 results are intentional verification-contract fixtures and their parent core group passed. Own APFSX volume was authenticated and detached, with mount absent. No evaluator tests or lifecycle actions were run."
      - "Genuine native SOURCE run009 passed38 focused checks, run010 typecheck passed, and run011 FULL passed all six groups in1132247ms. Core771 files7055PASS plus1 conditional network packaging SKIP; process-supervision all12PASS7804ms. Runtime36, five CLI chunks, critical Windows98 and coverage guard101 passed. The network packaging skip requires its existing explicit opt-in; no new skip or check omission was introduced."
      - "The corrected source and committed bytes/modes, original completed CI WorkItem, index and canonicalmain d886 were preserved. The separately qualified successor Node and linked closure were used for fresh native execution; prior dyld/missing-Node failures remain retained. Historical EPERM causality remains UNKNOWN. Passing the readiness test does not establish that historical cause."
    implementation_commit: "29757addd936732c6deb10eea11a89c22147a214"
    implementation_tree: "a43711d533499817d44be257be86e938bd1703ff"
    projected_at: "2026-10-15T01:50:18.289Z"
    review_identity_digest: "sha256:337cb584a40b41d147da578dd3a224027e41b53916c7d2bfc2692de506e10cb3"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:409b1240dfdb8900c192692e59aa595b1bf94d45bd94a76b7430ec5998fe3077"
    work_order_id: "sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b"
  task_execution_context:
    base_ref: "main"
    base_sha: "d886917970bc0724b419074b7d575d47d9c95c1b"
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
            digest: "sha256:2a01d4e6377d8db3a6531709725cadc36ce0be3af732e124fc0295881c333318"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
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
            digest: "sha256:88c46b4918f3e0e38aa7fc3c753e50fd34b527bd634ccd720c28d887d9f34776"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2a01d4e6377d8db3a6531709725cadc36ce0be3af732e124fc0295881c333318"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            evidence_digest: "sha256:dd65bd94f6c3f029bb155b64e5e414559277232f7a85b154bea63f647c4680a0"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:66804f80294ee9b6bd0a597310d4f416b9629b0eb5e3056ffe4dce9b950e3b60"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:88c46b4918f3e0e38aa7fc3c753e50fd34b527bd634ccd720c28d887d9f34776"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
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
            evidence_digest: "sha256:49e6e52cda72d323c3c8da2ba6329f8dc6973c5337eabc07722585cc5eb58075"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3515dda368589d79edbbe34a42f5707b2a923973f55754521d8ca39fc8d3a4dc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "USER"
              parent_authority_digest: "sha256:66804f80294ee9b6bd0a597310d4f416b9629b0eb5e3056ffe4dce9b950e3b60"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:2d39680579930519b6403f7d45d7785f350aa595b4265ff7e7b7d1fd38e64c62"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            request_digest: "sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f"
            scope_request:
              attempt: 1
              claim_id: "sha256:99c5e9268584faf9bcb04d61a929b805c6016bbcdecb73151b69b2f494423e51"
              contract_digest: "sha256:68eb2b60f624a21fd9a72ee172e7ea1cab2ddbacf4c64040f6d92adddd36df88"
              intake_after_digest: "sha256:cf40edfc56ef06016eb1c510a352427b4b8bfb6197d261e125a04bf8bffec900"
              intake_before_digest: "sha256:72891b3c1a2c16333475b26b2dec91f7f9faf0ca46c764b3762d795db132d181"
              parent_authority_digest: "sha256:66804f80294ee9b6bd0a597310d4f416b9629b0eb5e3056ffe4dce9b950e3b60"
              plan_digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
              plan_revision: 2
              record_digest: "sha256:bbc1a0acb35e3384bef4f6050d67382e778661b1ee39b738b09f92089821a057"
              repository_effects:
                - "repository_write"
                - "tests"
              repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:bd5f30ba277b5020cdf6cfedc59289ebdc32fad2d07905f08332610dead1438b"
              scope_roots:
                - "packages/agentplane/src/runner/process-supervision.test.ts"
              stop_receipt_digest: "sha256:691de01a78fc2c618435ff1523a7e09151836f6bb2bca09ca756b6ee1e11b155"
              task_id: "202610142156-4MGWZM"
              task_revision: 17
              work_item_id: "final-correction-0a4dae5da69c"
              work_order_id: "sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:fa04861d04f886d3786dc353fd07a8da3c6be5a3ba93d33f847bbb269bc99d13"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5ec9e64fd7f1fbb9c5729594785570b82a5c074c7d33070af68b767dda7d9751"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
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
            digest: "sha256:4dceda11365663d6dd611af8d5e0c090f0933968f16b28b9786d68a8d4e8b4be"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5ec9e64fd7f1fbb9c5729594785570b82a5c074c7d33070af68b767dda7d9751"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:fa04861d04f886d3786dc353fd07a8da3c6be5a3ba93d33f847bbb269bc99d13"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/runner/process-supervision.test.ts"
            evidence_digest: "sha256:d1307d35e400292fbaf88595f360263ca329c301657e78f87e734241c9df748c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:5ec9e64fd7f1fbb9c5729594785570b82a5c074c7d33070af68b767dda7d9751"
        digest: "sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
            expected_outputs:
              - "ci-output-projection-source-report"
            id: "bound-aggregate-job-output"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:f0738f6694f1db209193811543186ed5b9aef27b1f37be23175a9b0500a7c135"
            depends_on:
              - "bound-aggregate-job-output"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
            expected_outputs:
              - "final-correction-0a4dae5da69c-evidence"
            id: "final-correction-0a4dae5da69c"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:409b1240dfdb8900c192692e59aa595b1bf94d45bd94a76b7430ec5998fe3077"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:68513a5ae785d56bc71bc246bdae97f1fc6a7ed54920833c28572236ab2fb61c"
          environment_digest: "sha256:310ac6595a0b4d79054ade2ae6613aa6ad39e8079e7f830f8d79da6207aeb1c8"
          implementation_identity: "sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
          toolchain_digest: "sha256:9a0b74ff04f9ccea8cd3ce8dbe532ebd78a966645ce6660d1f7ce08f3b0a6d5d"
        observed_at: "2026-10-15T01:50:24.040Z"
        status: "PASSED"
      id: "202610142156-4MGWZM"
      intent_digest: "sha256:aee900de50efbf56ccdb4a853cd9f62d28fb5d0fa948d56c53a66b20c5fb4fb5"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be:
          after_revision: 13
          aggregate_digest: "sha256:9875738b5234e3ecdd7b6b0e2de7bc2f7705a5ca164d36801a67f5108d7d1aad"
          before_revision: 12
          command_digest: "sha256:a3aef16bf9680d874d16147acaafe94bd522b9040a525cb0cabb0664c33deff3"
          effect_ids: []
          event_digests:
            - "sha256:e68a7c6d6538ea8c785a0fe0f2542a41afe9a99e8731d32b601f63e620305172"
          mutation_id: "amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
        capture:202610142156-4MGWZM:
          after_revision: 1
          aggregate_digest: "sha256:a17e16917f4ff5c79dccfbdf4bb6cabfeeeb72b1556115aeae6ef5b367a7f561"
          before_revision: 0
          command_digest: "sha256:b34b0b0eefacb198a08af28ed05f2076db305a418076bcb80b5ceb838c1ae201"
          effect_ids: []
          event_digests:
            - "sha256:8ef6cfc4b60898476c2351a4f2f26c21a27c9b4f25cdd2107a2ea85ca2bc2d65"
          mutation_id: "capture:202610142156-4MGWZM"
        final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11:
          after_revision: 12
          aggregate_digest: "sha256:8c18e2a1b2940da7b3ced7a5b35a0ce76e8605a587b6efc5f825cb6c918fed20"
          before_revision: 11
          command_digest: "sha256:7abbd58b03354a15073c64c492d41a65f79923c5d5fd2095dd7922420fb515e3"
          effect_ids: []
          event_digests:
            - "sha256:2cb247b9b91c909e5603f897c1e9b3f2d03f01223db1bb61d6b38d9476a7d1ce"
          mutation_id: "final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11"
        final-validation:sha256:409b1240dfdb8900c192692e59aa595b1bf94d45bd94a76b7430ec5998fe3077:33:
          after_revision: 34
          aggregate_digest: "sha256:399b012200c9ebd6bc5fef581d86b2e51ac0e046ce973db40a5c62aa334718d9"
          before_revision: 33
          command_digest: "sha256:dd5131df02872c96715e406687152ef770cefbf7f3b9b721ac0a4c98b7a71922"
          effect_ids: []
          event_digests:
            - "sha256:efdf2052afe90e0bb2ab39a6a49d01fedc352aad2a3e0dfbc629fa72f90d9105"
          mutation_id: "final-validation:sha256:409b1240dfdb8900c192692e59aa595b1bf94d45bd94a76b7430ec5998fe3077:33"
        kernel_task_completion_required:sha256:a1ca6aed6c7902c4a8e0f46393746bfec0ef5174b432294a9b987326faf1c151:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:
          after_revision: 35
          aggregate_digest: "sha256:6b808ab600beeaef8e8ac1841b46e22d363adffde598b5529fe57ce17fd933ca"
          before_revision: 34
          command_digest: "sha256:4e24f71673f4c57e6021326dcd4c82e75cfc9cc9752827c17cae694c6131febc"
          effect_ids: []
          event_digests:
            - "sha256:76240df8adcdb0dcf4ec28f8e20df7c68e4f2eda39e3d5f82a99cc31ee14f814"
          mutation_id: "kernel_task_completion_required:sha256:a1ca6aed6c7902c4a8e0f46393746bfec0ef5174b432294a9b987326faf1c151:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 15
          aggregate_digest: "sha256:9c1a58404aad347bfd64beb7a87a972312674afd31bf977027b5b831df02968d"
          before_revision: 14
          command_digest: "sha256:474cddeaebd951922d3e471c19410801ab101d6104170a9fc1fbde69dbd8444b"
          effect_ids: []
          event_digests:
            - "sha256:553161558f248e068c95be14973c4889ebfbc4540ef29e3e8cdd5a4a49b69dfe"
          mutation_id: "kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 21
          aggregate_digest: "sha256:6f2ba93678b431ec9abc4b832970d988fd0736adc254f391cabf4b0ebe262620"
          before_revision: 20
          command_digest: "sha256:0bdfb552b42b72883aefeda20f175f0e6a7dd104ba60056691b65255562cbcf4"
          effect_ids: []
          event_digests:
            - "sha256:79b9ecdb5d934731e48429fdec5c034b38279ca1e2f0abd771ee020058283035"
          mutation_id: "kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:6b1c15a9720985737c6bc7adb4237ba08d4dc8a760e35bd74be938889cbc098a"
          before_revision: 4
          command_digest: "sha256:e0473fd883f89a10fecf45a96313990476b87618861ee85d0d6675f4b1f89beb"
          effect_ids: []
          event_digests:
            - "sha256:99b3fab0fa9a5763b31b125f01ca65c6444d646ee1cfa13d4d21794c4e4973f7"
          mutation_id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 16
          aggregate_digest: "sha256:9ba59b6a2b985d8939128ae65fc4a5e3e2a2294db12a4337f2a2554afe5226c1"
          before_revision: 15
          command_digest: "sha256:cf550d4aa805dd673ea6d1d2a4fd2906f522bd55f6a779007267463dd075fd93"
          effect_ids: []
          event_digests:
            - "sha256:387fdfe3cf4f558e843308786fcdd2a0fbb375fa4c7d0cf76988af019143409f"
          mutation_id: "kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 22
          aggregate_digest: "sha256:6844242cf9a27dfb886da2378cfea717b6a049f1c091f0cc8683aea031763fc4"
          before_revision: 21
          command_digest: "sha256:2db1f466e182f0405f8f1953b07d3441579b2e43609f2272f14cdd023315df75"
          effect_ids: []
          event_digests:
            - "sha256:f1dd3a8f4c1ce3b7e8a2a8a703173c235daf81045da64b6e4cb1adf2990656c4"
          mutation_id: "kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:8deddf7dcbb7c3d67abfebf73d2e0ec9c1829c5fcfb52fd7af2eb4a7409a0f35"
          before_revision: 5
          command_digest: "sha256:cfccb9b5052819ee660b6e4dd0d74a04f76b7a50655b25ae7a16493a8e0dd534"
          effect_ids: []
          event_digests:
            - "sha256:dad9c1b117f7add346130a38fe0d6f631dfe5ab48539830b2028fe7d222a4463"
          mutation_id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:8cc58e18783bf16a399290d8b718b3f9db371ac6e109d9c869ee51ff33517e54:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:
          after_revision: 29
          aggregate_digest: "sha256:2d620c786eb1f1a1a648057cc944dd7df87c7d46a06fbacf4b8c8f0b44537923"
          before_revision: 28
          command_digest: "sha256:7389c780efb6cad7f9b3fb0a94d53b322b905d75a045776db1228fefde06cda7"
          effect_ids: []
          event_digests:
            - "sha256:7d9642570c45128862d875fbd64df260b753295ddedb9d3472a2dafb948f1f0e"
          mutation_id: "kernel_work_item_execution_required:sha256:8cc58e18783bf16a399290d8b718b3f9db371ac6e109d9c869ee51ff33517e54:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        kernel_work_item_inspection_required:sha256:321233ad01ff4cfaede360167fddd40ee92af0c75b820477a735fd7143f4e6f6:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:
          after_revision: 25
          aggregate_digest: "sha256:4a7af4686b70ef13daba67a32eb12a84cc7e6ef1153480c8dcb8b97676f92ab4"
          before_revision: 24
          command_digest: "sha256:3ce1c8a12cab4a9127359953ec42060f4df832d3e555323a38fd09148f11005d"
          effect_ids: []
          event_digests:
            - "sha256:99d58dc110d133dec5121ed025a53ec7da869b0bdb164a7932994ac439a13f50"
          mutation_id: "kernel_work_item_inspection_required:sha256:321233ad01ff4cfaede360167fddd40ee92af0c75b820477a735fd7143f4e6f6:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        kernel_work_item_inspection_required:sha256:69429b2fdd81816e8da2bb00a11276d1a7cf191efcd088aa3ce804751eba2487:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:
          after_revision: 31
          aggregate_digest: "sha256:d9b0b9e1ea322bc9fbdcd7ec792b91621724da15d476551a93b5091b2108da93"
          before_revision: 30
          command_digest: "sha256:5a0793e889190cf3372ef0217799cc9677b44d768f190df588d9bd2135f7c343"
          effect_ids: []
          event_digests:
            - "sha256:4f79eac7a66239efbf27940e29f21ba3dfc7b42076042c6a3692369112db4765"
          mutation_id: "kernel_work_item_inspection_required:sha256:69429b2fdd81816e8da2bb00a11276d1a7cf191efcd088aa3ce804751eba2487:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 9
          aggregate_digest: "sha256:5909f88a84e72c251a17d7d0d0a4cb4c051f7c6f3bee0717bfa2a66131a046ab"
          before_revision: 8
          command_digest: "sha256:489cace0517fbeacd7dd70bb4d6e1a2f563499705669c7a2e4cd5fcf97a53bf9"
          effect_ids: []
          event_digests:
            - "sha256:6a1eb21500a8421c7df0f7f541e401428638c1df06326c75c4104b3ffaf1a3d4"
          mutation_id: "kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:e740e4aed07a897d797353fa8b0760cb97c7b12cf478dd5609d39f3a16ca19ef"
          before_revision: 3
          command_digest: "sha256:d739e39acf7073fb5fc9e58eeb6c890fea5e693792631e7b83033cba96510026"
          effect_ids: []
          event_digests:
            - "sha256:cb909744c9d8ef4430e1a770f817c7bb921ad060eaf350233e81418c4952453b"
          mutation_id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_rework_claim_required:sha256:45ad6b206ba2514d69f906604763e930759166a8f52e8174facd8b1270b80771:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:
          after_revision: 28
          aggregate_digest: "sha256:7edcf3603661add9360ea0ab02410a46849c39a4933782eb9c1359fd98bc0d71"
          before_revision: 27
          command_digest: "sha256:00dd7c773f12e1fc826d01f48b05ae4e43a17c6124d9e12d3cb62e0dc0022937"
          effect_ids: []
          event_digests:
            - "sha256:8349edfd6e27964e808590905abae399003bb0a19f0079235da2f4694653bcba"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:45ad6b206ba2514d69f906604763e930759166a8f52e8174facd8b1270b80771:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2:
          after_revision: 19
          aggregate_digest: "sha256:1c700b61af9e1e5b837b170fa6e5b3c24c6dc27882e3f2f2f95c726a518c8eb5"
          before_revision: 18
          command_digest: "sha256:29e81c5907a0c51c54de07f76f5d6b02f4d7a0114c74173c83826ef6ba226bd0"
          effect_ids: []
          event_digests:
            - "sha256:cd0d3b276f63071b9dc060698246ba90ebba7dc6a2bfb9e2480f516533fdbb7c"
          mutation_id: "plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
        result:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b:
          after_revision: 24
          aggregate_digest: "sha256:164de8e0a6f8c625979147922cfac7694072c304de284bd8e7ebd5bb9a0c7b60"
          before_revision: 23
          command_digest: "sha256:e49512455cfd416f951ab7456d3c06bf263cf62aca8996b9b5f09dcf456fabb4"
          effect_ids: []
          event_digests:
            - "sha256:2006cf6408a1a441f796e95a6b9a9e4d4b74548e465317b56c29373f89e374cc"
          mutation_id: "result:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b"
        result:sha256:dfc545f92a5200831db39a6bd289b7cd86bda6953899434acb01b7a7d801ce86:
          after_revision: 30
          aggregate_digest: "sha256:2ecc0d53d7e741a71dfc75c4752610131fde9718234bb8b03b0385cebda98785"
          before_revision: 29
          command_digest: "sha256:7d42f5a36c1a3f2fd8c57c6bdfd086d7b69621f8e8b1d931212c1889c83504b2"
          effect_ids: []
          event_digests:
            - "sha256:ab1e6f2e1ade820bd22a49c95b41477ac8a040a0d9c31f27f722a54d3029d906"
          mutation_id: "result:sha256:dfc545f92a5200831db39a6bd289b7cd86bda6953899434acb01b7a7d801ce86"
        result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0:
          after_revision: 2
          aggregate_digest: "sha256:9e3a50b911b1c65e680b0b4e991f7998cf052496b85b1436e6616b075a1f3e2a"
          before_revision: 1
          command_digest: "sha256:bd9090bdf2087f520e9139491572fd8039b2828e8ef16d6063121a1c96b1405d"
          effect_ids: []
          event_digests:
            - "sha256:728ff138de93377506e73f1e3a0385954ac1c19384e34ebc61c3461dba436adb"
          mutation_id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0"
        result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418:
          after_revision: 8
          aggregate_digest: "sha256:c45a4fd6cb1ccc6e4965c7c26502585f7d4076a99f77b5105e864b44750bbb30"
          before_revision: 7
          command_digest: "sha256:2884265fbdf61c59bf7ddfe67e3326fce57e20c487c5dd1f210b1fc541051ebc"
          effect_ids: []
          event_digests:
            - "sha256:423d98b0c70f538c22a594b28437a2a262760b9890f1f7c0cd098bc274e56218"
          mutation_id: "result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418"
        scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f:
          after_revision: 18
          aggregate_digest: "sha256:d4f9a17e9b613373efde837af552229dff1a9050fae2c736bb712b60a4cda129"
          before_revision: 17
          command_digest: "sha256:b18bb74bb7b6b5c33ba691632823c0101a9252ce76b1a8f0642021ce0e11cde1"
          effect_ids: []
          event_digests:
            - "sha256:cb6cbd451516b34ff53bb855c27ee1c3712b85c11a920e98c0ea659c40a806d0"
          mutation_id: "scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f"
        semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2:
          after_revision: 17
          aggregate_digest: "sha256:76d08bf37dbc368ce041e62d1cc02eca9021f33ab6b37d73406f743747e77f24"
          before_revision: 16
          command_digest: "sha256:73549da6f3af2af92364f6bc16a58dc6f337e434aa55d4f0f402eb256628e9b0"
          effect_ids: []
          event_digests:
            - "sha256:1287f0557aa95eca80fdb84f7870947fd560cab690802cb816dd630aac2e7ba8"
          mutation_id: "semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2"
        sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd:
          after_revision: 14
          aggregate_digest: "sha256:3c76a0c2047b753e0df45f0f060c4a014a2e93b12516ce430b01d3d82f517f19"
          before_revision: 13
          command_digest: "sha256:e7f670cdd33bb4709301f182074494b2b62e7fca018745474260863e43e1cab3"
          effect_ids: []
          event_digests:
            - "sha256:ab5d02f096aee9540b7b9fcdd4455e3ccbbfee3b5beddfdae8f10e5df882bb94"
          mutation_id: "sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd"
        sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10:
          after_revision: 3
          aggregate_digest: "sha256:ede96821324dd93c3a8900a14364b272e400a76c476daab50f5224c0a56899b0"
          before_revision: 2
          command_digest: "sha256:d9065bb30dbdd4859b7632c35296e7c35318e22ab0a4af3c02f66791af4f94eb"
          effect_ids: []
          event_digests:
            - "sha256:04384127f20a51f3cbe850dd9895aa3afd8425a1c81ecdc3942529282466054c"
          mutation_id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10"
        sha256:69c4f1f269bb32c7dedf9f6e4fd284d7734d159208e67e6c8450a3be94855fb9:
          after_revision: 23
          aggregate_digest: "sha256:df9b56dbf57a9ce82a7d4de2a1f8d644bca984b117207db5de544a54ce0407c7"
          before_revision: 22
          command_digest: "sha256:a75f893267b9b24d3e1deb5feebd5201d3abb1ebed736c71036da464e61515b7"
          effect_ids: []
          event_digests:
            - "sha256:3d2745246d6f62b46d5d20c73696a7f85096875fdaecd080972d42de606e17cc"
          mutation_id: "sha256:69c4f1f269bb32c7dedf9f6e4fd284d7734d159208e67e6c8450a3be94855fb9"
        sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462:
          after_revision: 20
          aggregate_digest: "sha256:b23aceca85cb0c5f53f358b8b4e69a45943f41fe297e515d7bd11eb498aa1835"
          before_revision: 19
          command_digest: "sha256:71b9562d9806465ae3f1acf0550fc8251aa26c80037f518b93c54fff16ac0130"
          effect_ids: []
          event_digests:
            - "sha256:16409ba41df63abde4715b8964c848621dc958b23f6d5e986e38d9fde9a110d7"
          mutation_id: "sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462"
        sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e:
          after_revision: 7
          aggregate_digest: "sha256:532bea584b2bf60f953ca8402472ff76edd14240da4fbe0995476126d98e4e21"
          before_revision: 6
          command_digest: "sha256:82c1b998d8b59d77fe80c002f2b456266242c6d2bf973c73687ba439b985ed39"
          effect_ids: []
          event_digests:
            - "sha256:b5a5c6854d4c54ae1913adb4444b0c18e60f7b1dcc8f4a9518ae6a15fa549974"
          mutation_id: "sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e"
        validation-resolution:sha256:191549dacd9c7e52fc91eb131d74c66e64b1bc81772f69919e4f137703677b49:
          after_revision: 27
          aggregate_digest: "sha256:a8114b8421893fb2fc77565e839a4418b052c6c0e2f6261e228645de21720ec7"
          before_revision: 26
          command_digest: "sha256:4b3511375f6c47b68321c70f796cb24c353540f1ebec1105a2f330797316305c"
          effect_ids: []
          event_digests:
            - "sha256:4e5758bed104ce9bf9662ed9a9a72067826391a153f5b8c13cd3c20efae5314a"
          mutation_id: "validation-resolution:sha256:191549dacd9c7e52fc91eb131d74c66e64b1bc81772f69919e4f137703677b49"
        validation-resolution:sha256:277a5f117646427b4293a75128ccdaf0db4f2d6d0403f8bbcef7dddac5cfbd16:
          after_revision: 33
          aggregate_digest: "sha256:a1c13fbfb86873f634e9688cd793e85747c12e43737204ba1ee6f2a55e0adf15"
          before_revision: 32
          command_digest: "sha256:ac637d9d1503e016fe7dbdd241d5896cfb7f5d3fb92c21275c8c7e6611010735"
          effect_ids: []
          event_digests:
            - "sha256:b8d442713d9ac6e4812ebbc360995b3941cbba9e2d5348882b407813d4f9269f"
          mutation_id: "validation-resolution:sha256:277a5f117646427b4293a75128ccdaf0db4f2d6d0403f8bbcef7dddac5cfbd16"
        validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9:
          after_revision: 11
          aggregate_digest: "sha256:218c9a58c26b7e217ae8effb5bddee50a67138c6bba950d72ae49c154ab0219b"
          before_revision: 10
          command_digest: "sha256:219ec72ba077d204b7f14fbe9b6b8ec05f6d365ef57c1d951821d17df5b7be65"
          effect_ids: []
          event_digests:
            - "sha256:cb1c6fedf70900ceed14934782fed0b0d28297d684ca4e3f432a95a37e814e15"
          mutation_id: "validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9"
        validation:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b:
          after_revision: 26
          aggregate_digest: "sha256:a7e61fdb46d12318fc5b7c692618db8fd8ff1276dab362b5470425db2998235d"
          before_revision: 25
          command_digest: "sha256:f5e3e9ad473753bbbae6ea8d6a3b19e99467c92404634c119eab2de936cd96eb"
          effect_ids: []
          event_digests:
            - "sha256:a4e31215b49c0fa2594fc65d90510fa20dbf23e4012bf22b5ecda2482c13328d"
          mutation_id: "validation:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b"
        validation:sha256:87cccb0c716c61c459726255e3180313923673fdf9d452972fb0372e57f956ad:
          after_revision: 32
          aggregate_digest: "sha256:1880e13eddcff2a780e479a6ef85315d71b581afd4e6a49a68a1363d3da403a6"
          before_revision: 31
          command_digest: "sha256:b3a7b442529b33844208c722cfde4a8f53efd9e785051506f13c591924cf53f7"
          effect_ids: []
          event_digests:
            - "sha256:2f733dc333cc32acbbac666ce2ff8ec9964dcad7619691bf4b58a4d448bdad29"
          mutation_id: "validation:sha256:87cccb0c716c61c459726255e3180313923673fdf9d452972fb0372e57f956ad"
        validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525:
          after_revision: 10
          aggregate_digest: "sha256:9a046a8182351f4ab880e3d099a38e51daacaf03ad142602768e103080ed981b"
          before_revision: 9
          command_digest: "sha256:ac0bd59b37912305f092d6700fff1cfc385da25735de633073ab35ee30b41c51"
          effect_ids: []
          event_digests:
            - "sha256:a2a9912f039ba598c53d1ee64c100facae5f270a2eccc19b8a2a4728a99f3d71"
          mutation_id: "validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
          digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "ci"
                resources: []
                scope_roots:
                  - "scripts/checks/plan-github-ci.mjs"
                  - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              expected_outputs:
                - "ci-output-projection-source-report"
              id: "bound-aggregate-job-output"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:e5447becaea203eaeab407e6c581973116ff31e4a37f01c3222d8ea2e0de5447"
          digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "ci"
                resources: []
                scope_roots:
                  - "scripts/checks/plan-github-ci.mjs"
                  - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              expected_outputs:
                - "ci-output-projection-source-report"
              id: "bound-aggregate-job-output"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:68eb2b60f624a21fd9a72ee172e7ea1cab2ddbacf4c64040f6d92adddd36df88"
              depends_on:
                - "bound-aggregate-job-output"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "ci"
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
                  - "scripts/checks/plan-github-ci.mjs"
              expected_outputs:
                - "final-correction-0a4dae5da69c-evidence"
              id: "final-correction-0a4dae5da69c"
              optional: false
              required_inputs: []
      revision: 35
      schema_version: 1
      state: "COMPLETED"
      work_items:
        bound-aggregate-job-output:
          attempt: 1
          claim_id: "sha256:3fffbf861938bca1ba7e553836cd70ac082b5c14f093ad88179eebfd72b024e1"
          definition:
            contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
            expected_outputs:
              - "ci-output-projection-source-report"
            id: "bound-aggregate-job-output"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:680076efff1b029b94d3ac8ed7325b1f2f9d9cda645406008b1f95f2dd49a66d"
              id: "ci-output-projection-source-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
              task_id: "202610142156-4MGWZM"
              work_item_id: "bound-aggregate-job-output"
          result_digest: "sha256:cb9a1d1b680aa1c33cb5bb1a353c0a285a7abbe204183aeffc5e50514e4a937d"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ff38b23808d51a5c09aad64dc3a74d205186ad243789f86f38fa3cd742e0b49a"
              - "sha256:e7b94586b74833dd906766ff17c8cd805cfae3917ee36d75d57da1299b2645b3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:68513a5ae785d56bc71bc246bdae97f1fc6a7ed54920833c28572236ab2fb61c"
              environment_digest: "sha256:0a6a273ee6d89b5e5b1770b5b9608ba1f565a4a545f93738a7aad2641dadb858"
              implementation_identity: "sha256:cb9a1d1b680aa1c33cb5bb1a353c0a285a7abbe204183aeffc5e50514e4a937d"
              toolchain_digest: "sha256:0bce0f5c0803bbf256cc4c5c3b66c80103a5a7e8d93978a73c3f3dcb04a01a7a"
            observed_at: "2026-10-14T22:57:30.295Z"
            status: "PASSED"
        final-correction-0a4dae5da69c:
          attempt: 3
          claim_id: "sha256:06e472835c95c1bb533ec3498a2128f43c7c25ab3e4a147b58f254ec04031848"
          definition:
            contract_digest: "sha256:f0738f6694f1db209193811543186ed5b9aef27b1f37be23175a9b0500a7c135"
            depends_on:
              - "bound-aggregate-job-output"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
            expected_outputs:
              - "final-correction-0a4dae5da69c-evidence"
            id: "final-correction-0a4dae5da69c"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 3
              digest: "sha256:4b3e7f5c5e50883c77ffae4cf17c963a825b8b8c937ad149422104e37d168db6"
              id: "final-correction-0a4dae5da69c-evidence"
              kind: "report"
              plan_revision: 3
              repository_fingerprint: "sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
              task_id: "202610142156-4MGWZM"
              work_item_id: "final-correction-0a4dae5da69c"
          result_digest: "sha256:75d45634f71cfd135e2451ee7f93159679b5f4129492f1205a2c58ae42d1f683"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:bbf35db3cfae7d466225ff6228202769b051bcd551ef781f0ed2c1e1cf934802"
              - "sha256:337cb584a40b41d147da578dd3a224027e41b53916c7d2bfc2692de506e10cb3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:68513a5ae785d56bc71bc246bdae97f1fc6a7ed54920833c28572236ab2fb61c"
              environment_digest: "sha256:23102d65ff01f628f08792698c6e95acebf291be3db3402ef8725d525cd110aa"
              implementation_identity: "sha256:75d45634f71cfd135e2451ee7f93159679b5f4129492f1205a2c58ae42d1f683"
              toolchain_digest: "sha256:be6f0d15c7084a544d099f702c9df0723069b29539e4408f636bd9dacec11244"
            observed_at: "2026-10-15T01:50:18.289Z"
            status: "PASSED"
    digest: "sha256:ff5ba84946d9b4fd1c5c99599e31074e9ed5936e3c2e03f19489e0ef98e5d69e"
    documents:
      contracts:
        sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1:
          acceptance_criteria:
            - "The aggregate JSON carries exactly the six consumed fields and preserves their values; full verification plan/capability/expected-job calculation, stdout plan, full changed_files and other scalar outputs remain unchanged."
            - "An actual-producer regression with at least1316 long nested lifecycle-artifact paths creates a full plan exceeding1MiB UTF16 while the sum of every declared GitHub job output name/value stays below1MiB after projection. Parse outputs rather than mirror the assignment; retain the complete changed_files list/count. Include Unicode/surrogate-pair filename coverage."
            - "The compact plan must preserve aggregate required-job failure semantics: all expected successes pass, a failed/missing required job fails, and unexpected non-skipped jobs still fail. Do not weaken verification/admission floors or expected jobs."
            - "Modify only the two approved paths on current canonical main; preserve every other source/config/lock and the completed original Task175/history/source25. Return actual source report/diff/preimages/check results only; native/EVAL/FULL/hosted acceptance remains separate."
            - "Run the exact mandatory verification commands via native verification after admitted source output. Obtain independent EVAL and native final checks before separately authorized exact-SHA publication/hosted CI/canonical integration. Do not claim local proof as hosted acceptance."
            - "Use isolated owned dependencies and bounded owned fixture/temp roots; no shared install/global configuration change. Serialize heavy checks with ROOT. Before FULL/commit/push/merge return the actual source diff and nearest regression evidence; do not invoke those lifecycle effects during source semantic execution."
          objective: "Fix confirmed GitHub CI quota failure described in /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/AP-current175-CI-output-quota-source-diagnosis-PREP.v1.json SHA2566c4b96593e887ad6b452cf0bfbf3e08528b866a710fe51740b0db40403653a6f. Only replace aggregatePlan transport in plan-github-ci.mjs with explicit schema_version,route,route_reason,expected_jobs,executing_jobs_count,changed_files_count projection. Keep full planner calculation, capability/contract decisions and stdout unchanged, and keep full changed_files for routed CI. Reuse existing test fixtures and nearest test module. No truncation, compression, new module, dependency, artifact layer or workflow change. Preserve completed Task1C3ZFG/source25/FINAL and all historical failures. Stop after source diff and focused evidence for ROOT/distinct review before source intake/commit/FULL/provider actions."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
            - "bun run typecheck"
            - "npm run ci:local:full"
        sha256:68eb2b60f624a21fd9a72ee172e7ea1cab2ddbacf4c64040f6d92adddd36df88:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610142156-4MGWZM/d9b8e5d2ea366eab8f5936a4e2479a1472529b4de671d2eea37048b11e1f1f54/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
            - "bun run typecheck"
            - "npm run ci:local:full"
        sha256:f0738f6694f1db209193811543186ed5b9aef27b1f37be23175a9b0500a7c135:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610142156-4MGWZM/d9b8e5d2ea366eab8f5936a4e2479a1472529b4de671d2eea37048b11e1f1f54/final-validation.json before edits. Correct only test readiness: write a ready marker after installing the SIGTERM handler, then wait through the existing before-recording-process-start boundary before timer commitment. Preserve 120ms wall/1000ms idle/zero grace and all six escalation assertions. No production code/API/timer changes. Historical EPERM causality remains UNKNOWN; diagnostic PASS is nonreproduction, not final qualification. Preserve all mandatory checks and completed CI work. Follow admitted request sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f and its native USER approval."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
            - "bun run typecheck"
            - "npm run ci:local:full"
      intent:
        context: "Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer."
        objective: "Bound GitHub CI aggregate job-output projection"
    events:
      -
        command_digest: "sha256:b34b0b0eefacb198a08af28ed05f2076db305a418076bcb80b5ceb838c1ae201"
        id: "capture:202610142156-4MGWZM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610142156-4MGWZM"
        occurred_at: "2026-10-14T21:56:24.252Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610142156-4MGWZM"
        task_revision: 1
      -
        command_digest: "sha256:bd9090bdf2087f520e9139491572fd8039b2828e8ef16d6063121a1c96b1405d"
        id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0"
        occurred_at: "2026-10-14T22:02:50.684Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610142156-4MGWZM"
        task_revision: 2
      -
        command_digest: "sha256:d9065bb30dbdd4859b7632c35296e7c35318e22ab0a4af3c02f66791af4f94eb"
        id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10"
        occurred_at: "2026-10-14T22:02:54.389Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610142156-4MGWZM"
        task_revision: 3
      -
        command_digest: "sha256:d739e39acf7073fb5fc9e58eeb6c890fea5e693792631e7b83033cba96510026"
        id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T22:02:58.127Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610142156-4MGWZM"
        task_revision: 4
      -
        command_digest: "sha256:e0473fd883f89a10fecf45a96313990476b87618861ee85d0d6675f4b1f89beb"
        id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T22:03:02.620Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610142156-4MGWZM"
        task_revision: 5
      -
        command_digest: "sha256:cfccb9b5052819ee660b6e4dd0d74a04f76b7a50655b25ae7a16493a8e0dd534"
        id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T22:03:55.084Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610142156-4MGWZM"
        task_revision: 6
      -
        command_digest: "sha256:82c1b998d8b59d77fe80c002f2b456266242c6d2bf973c73687ba439b985ed39"
        id: "sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e"
        occurred_at: "2026-10-14T22:29:06.897Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610142156-4MGWZM"
        task_revision: 7
      -
        command_digest: "sha256:2884265fbdf61c59bf7ddfe67e3326fce57e20c487c5dd1f210b1fc541051ebc"
        id: "result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418"
        occurred_at: "2026-10-14T22:29:09.558Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610142156-4MGWZM"
        task_revision: 8
      -
        command_digest: "sha256:489cace0517fbeacd7dd70bb4d6e1a2f563499705669c7a2e4cd5fcf97a53bf9"
        id: "kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T22:29:11.619Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610142156-4MGWZM"
        task_revision: 9
      -
        command_digest: "sha256:ac0bd59b37912305f092d6700fff1cfc385da25735de633073ab35ee30b41c51"
        id: "validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525"
        occurred_at: "2026-10-14T22:57:32.448Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610142156-4MGWZM"
        task_revision: 10
      -
        command_digest: "sha256:219ec72ba077d204b7f14fbe9b6b8ec05f6d365ef57c1d951821d17df5b7be65"
        id: "validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9"
        occurred_at: "2026-10-14T22:57:33.847Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610142156-4MGWZM"
        task_revision: 11
      -
        command_digest: "sha256:7abbd58b03354a15073c64c492d41a65f79923c5d5fd2095dd7922420fb515e3"
        id: "final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11"
        occurred_at: "2026-10-14T23:14:21.587Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610142156-4MGWZM"
        task_revision: 12
      -
        command_digest: "sha256:a3aef16bf9680d874d16147acaafe94bd522b9040a525cb0cabb0664c33deff3"
        id: "amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
        occurred_at: "2026-10-14T23:34:28.663Z"
        payload_digest: "sha256:b15590955f1bf684e87c1de91d4294438c4366f8c657818652f9d8a39b168887"
        task_id: "202610142156-4MGWZM"
        task_revision: 13
      -
        command_digest: "sha256:e7f670cdd33bb4709301f182074494b2b62e7fca018745474260863e43e1cab3"
        id: "sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd"
        occurred_at: "2026-10-14T23:34:29.954Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610142156-4MGWZM"
        task_revision: 14
      -
        command_digest: "sha256:474cddeaebd951922d3e471c19410801ab101d6104170a9fc1fbde69dbd8444b"
        id: "kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:34:53.864Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610142156-4MGWZM"
        task_revision: 15
      -
        command_digest: "sha256:cf550d4aa805dd673ea6d1d2a4fd2906f522bd55f6a779007267463dd075fd93"
        id: "kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:34:55.881Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610142156-4MGWZM"
        task_revision: 16
      -
        command_digest: "sha256:73549da6f3af2af92364f6bc16a58dc6f337e434aa55d4f0f402eb256628e9b0"
        id: "semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2"
        occurred_at: "2026-10-14T23:35:39.233Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610142156-4MGWZM"
        task_revision: 17
      -
        command_digest: "sha256:b18bb74bb7b6b5c33ba691632823c0101a9252ce76b1a8f0642021ce0e11cde1"
        id: "scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f"
        occurred_at: "2026-10-14T23:36:22.523Z"
        payload_digest: "sha256:081d67c06e936b740a518fc54e272e93cef0237b5d5568bc81e75cbe0b73faa3"
        task_id: "202610142156-4MGWZM"
        task_revision: 18
      -
        command_digest: "sha256:29e81c5907a0c51c54de07f76f5d6b02f4d7a0114c74173c83826ef6ba226bd0"
        id: "plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
        occurred_at: "2026-10-14T23:37:33.116Z"
        payload_digest: "sha256:8b2273723f09043e78db604be1df9899c57bc31eef7b3494ebda5b63893267c8"
        task_id: "202610142156-4MGWZM"
        task_revision: 19
      -
        command_digest: "sha256:71b9562d9806465ae3f1acf0550fc8251aa26c80037f518b93c54fff16ac0130"
        id: "sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462"
        occurred_at: "2026-10-14T23:37:52.128Z"
        payload_digest: "sha256:f732d91d0099a835ae963e335cda9be1bcde3c06bea10481ac2c1534f8ec58f1"
        task_id: "202610142156-4MGWZM"
        task_revision: 20
      -
        command_digest: "sha256:0bdfb552b42b72883aefeda20f175f0e6a7dd104ba60056691b65255562cbcf4"
        id: "kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:38:00.234Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610142156-4MGWZM"
        task_revision: 21
      -
        command_digest: "sha256:2db1f466e182f0405f8f1953b07d3441579b2e43609f2272f14cdd023315df75"
        id: "kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:38:02.225Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610142156-4MGWZM"
        task_revision: 22
      -
        command_digest: "sha256:a75f893267b9b24d3e1deb5feebd5201d3abb1ebed736c71036da464e61515b7"
        id: "sha256:69c4f1f269bb32c7dedf9f6e4fd284d7734d159208e67e6c8450a3be94855fb9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:69c4f1f269bb32c7dedf9f6e4fd284d7734d159208e67e6c8450a3be94855fb9"
        occurred_at: "2026-10-14T23:58:35.775Z"
        payload_digest: "sha256:d47dd98692456ecd8c2232ce09064ac5e2cff5d4b61aee0c39058ec1a5b2e91b"
        task_id: "202610142156-4MGWZM"
        task_revision: 23
      -
        command_digest: "sha256:e49512455cfd416f951ab7456d3c06bf263cf62aca8996b9b5f09dcf456fabb4"
        id: "result:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b"
        occurred_at: "2026-10-14T23:58:39.032Z"
        payload_digest: "sha256:fab1b25ae6b523adc3425755b7448df4925fc1771b596e424a7dd02f9b8e3724"
        task_id: "202610142156-4MGWZM"
        task_revision: 24
      -
        command_digest: "sha256:3ce1c8a12cab4a9127359953ec42060f4df832d3e555323a38fd09148f11005d"
        id: "kernel_work_item_inspection_required:sha256:321233ad01ff4cfaede360167fddd40ee92af0c75b820477a735fd7143f4e6f6:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:321233ad01ff4cfaede360167fddd40ee92af0c75b820477a735fd7143f4e6f6:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        occurred_at: "2026-10-14T23:58:41.328Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610142156-4MGWZM"
        task_revision: 25
      -
        command_digest: "sha256:f5e3e9ad473753bbbae6ea8d6a3b19e99467c92404634c119eab2de936cd96eb"
        id: "validation:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:170395fcc8102718012a3dee46ef2b527af9e018314c1ec329081f6ce8d04c3b"
        occurred_at: "2026-10-15T00:09:33.056Z"
        payload_digest: "sha256:c640172650bace8e18a4458b58619fb160a3f285b79e7a250d737d3d523462bc"
        task_id: "202610142156-4MGWZM"
        task_revision: 26
      -
        command_digest: "sha256:4b3511375f6c47b68321c70f796cb24c353540f1ebec1105a2f330797316305c"
        id: "validation-resolution:sha256:191549dacd9c7e52fc91eb131d74c66e64b1bc81772f69919e4f137703677b49:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:191549dacd9c7e52fc91eb131d74c66e64b1bc81772f69919e4f137703677b49"
        occurred_at: "2026-10-15T00:09:34.925Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202610142156-4MGWZM"
        task_revision: 27
      -
        command_digest: "sha256:00dd7c773f12e1fc826d01f48b05ae4e43a17c6124d9e12d3cb62e0dc0022937"
        id: "kernel_work_item_rework_claim_required:sha256:45ad6b206ba2514d69f906604763e930759166a8f52e8174facd8b1270b80771:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:45ad6b206ba2514d69f906604763e930759166a8f52e8174facd8b1270b80771:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        occurred_at: "2026-10-15T00:09:39.898Z"
        payload_digest: "sha256:23532dbce000d1f0f79e31749079afe2ef833ccc76bde8a0b5d96138f25c1d3e"
        task_id: "202610142156-4MGWZM"
        task_revision: 28
      -
        command_digest: "sha256:7389c780efb6cad7f9b3fb0a94d53b322b905d75a045776db1228fefde06cda7"
        id: "kernel_work_item_execution_required:sha256:8cc58e18783bf16a399290d8b718b3f9db371ac6e109d9c869ee51ff33517e54:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:8cc58e18783bf16a399290d8b718b3f9db371ac6e109d9c869ee51ff33517e54:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        occurred_at: "2026-10-15T00:09:42.879Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202610142156-4MGWZM"
        task_revision: 29
      -
        command_digest: "sha256:7d42f5a36c1a3f2fd8c57c6bdfd086d7b69621f8e8b1d931212c1889c83504b2"
        id: "result:sha256:dfc545f92a5200831db39a6bd289b7cd86bda6953899434acb01b7a7d801ce86:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:dfc545f92a5200831db39a6bd289b7cd86bda6953899434acb01b7a7d801ce86"
        occurred_at: "2026-10-15T01:17:22.973Z"
        payload_digest: "sha256:42169c66b4b203818169e58e4566422668fdc8d5c8685870ae51bec9e09a08fe"
        task_id: "202610142156-4MGWZM"
        task_revision: 30
      -
        command_digest: "sha256:5a0793e889190cf3372ef0217799cc9677b44d768f190df588d9bd2135f7c343"
        id: "kernel_work_item_inspection_required:sha256:69429b2fdd81816e8da2bb00a11276d1a7cf191efcd088aa3ce804751eba2487:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:69429b2fdd81816e8da2bb00a11276d1a7cf191efcd088aa3ce804751eba2487:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        occurred_at: "2026-10-15T01:17:25.646Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610142156-4MGWZM"
        task_revision: 31
      -
        command_digest: "sha256:b3a7b442529b33844208c722cfde4a8f53efd9e785051506f13c591924cf53f7"
        id: "validation:sha256:87cccb0c716c61c459726255e3180313923673fdf9d452972fb0372e57f956ad:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:87cccb0c716c61c459726255e3180313923673fdf9d452972fb0372e57f956ad"
        occurred_at: "2026-10-15T01:50:20.404Z"
        payload_digest: "sha256:aca6760d25c1ff1f415d901ea3ee4f1eb6c8efc8872f4593dd8cd6305360ac8b"
        task_id: "202610142156-4MGWZM"
        task_revision: 32
      -
        command_digest: "sha256:ac637d9d1503e016fe7dbdd241d5896cfb7f5d3fb92c21275c8c7e6611010735"
        id: "validation-resolution:sha256:277a5f117646427b4293a75128ccdaf0db4f2d6d0403f8bbcef7dddac5cfbd16:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:277a5f117646427b4293a75128ccdaf0db4f2d6d0403f8bbcef7dddac5cfbd16"
        occurred_at: "2026-10-15T01:50:21.855Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202610142156-4MGWZM"
        task_revision: 33
      -
        command_digest: "sha256:dd5131df02872c96715e406687152ef770cefbf7f3b9b721ac0a4c98b7a71922"
        id: "final-validation:sha256:409b1240dfdb8900c192692e59aa595b1bf94d45bd94a76b7430ec5998fe3077:33:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:409b1240dfdb8900c192692e59aa595b1bf94d45bd94a76b7430ec5998fe3077:33"
        occurred_at: "2026-10-15T02:08:45.975Z"
        payload_digest: "sha256:47ab549de16a4876fbae4cea5e564c39ff5995dfd8f632ce4a042d9cdaba4c3c"
        task_id: "202610142156-4MGWZM"
        task_revision: 34
      -
        command_digest: "sha256:4e24f71673f4c57e6021326dcd4c82e75cfc9cc9752827c17cae694c6131febc"
        id: "kernel_task_completion_required:sha256:a1ca6aed6c7902c4a8e0f46393746bfec0ef5174b432294a9b987326faf1c151:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:a1ca6aed6c7902c4a8e0f46393746bfec0ef5174b432294a9b987326faf1c151:sha256:38423d81c0d75c48c66f3166ad6928dfbdb73d6fc7d96271b983d5088c1c6b0d"
        occurred_at: "2026-10-15T02:30:17.588Z"
        payload_digest: "sha256:6a70441da398a2070b7e909f81f417ba0d15387c071b6432843ecc1b09e58970"
        task_id: "202610142156-4MGWZM"
        task_revision: 35
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bound GitHub CI aggregate job-output projection

Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.

## Scope

- In scope: Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
- Out of scope: unrelated refactors not required for "Bound GitHub CI aggregate job-output projection".

## Plan

1. Execute approved WorkItem bound-aggregate-job-output.
2. Execute approved WorkItem final-correction-0a4dae5da69c.

## Verify Steps

PLANNER fallback scaffold for "Bound GitHub CI aggregate job-output projection". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound GitHub CI aggregate job-output projection". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-15T02:08:46.875Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3db0f6aa78dde1420e6337e84e5b50136740c8d82360d9ac34958f7537cb8fab, input_digest=sha256:769db26d5116118017c0c421a678854128b55193c2ceadb36916e237e8404901

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: npm run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: npm run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check critical_paths (3/3)

Check: full_regression
Command: npm run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: npm run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610142156-4MGWZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610142156-4MGWZM Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2
- policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
- capability_digest: sha256:b5e6e850a6a4608be1489c415068a7b0507651d7c5748e04517f0f464b64ba5f
- checks_digest: sha256:4d1577ea2c92b70e6ac94aea3a39fb2a14ba93dcab77e1c33a52e2ba2c20d28a
- identity_digest: sha256:17ddb07dbafc343b5b4c26d85f02299355e635b9f140d08d2ca6f681ff732cfc

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610142156-4MGWZM
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
