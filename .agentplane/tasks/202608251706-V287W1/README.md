---
id: "202608251706-V287W1"
title: "AP-RUNTIME-001 Make local execution runtime deterministic"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "core-clean-break"
  - "recovery"
  - "risk-high"
  - "roadmap"
  - "runtime-environment"
  - "verification"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T02:57:20.979Z"
  updated_by: "USER"
  note: "Approved under the user standing authorization for all subsequent in-scope Clean Task Core plans and the explicit instruction to finish the refactoring. This retained runtime prerequisite covers local executable resolution, environment propagation, tests and evidence only; no release, credential or remote-runtime changes."
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
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
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
      - "docs/developer"
      - "packages/agentplane/src/commands/shared/pr-meta"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/agentplane/src/shared"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Changes affect local executable discovery and subprocess environments across shared production paths. A task worktree and full regression are required. No credentials, publication or remote runtime changes are authorized."
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
      - "docs/developer"
      - "packages/agentplane/src/commands/shared/pr-meta"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/agentplane/src/shared"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "docs"
      - "packages/agentplane"
    changed_paths:
      - "docs/developer/local-runtime-resolution.md"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/runner/execution-receipt.ts"
      - "packages/agentplane/src/runner/process-supervision/result.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/state.ts"
      - "packages/agentplane/src/runner/runtime-env.integration.test.ts"
      - "packages/agentplane/src/shared/runtime-env.test.ts"
      - "packages/agentplane/src/shared/runtime-env.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
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
          - "docs/developer"
          - "packages/agentplane/src/commands/shared/pr-meta"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner"
          - "packages/agentplane/src/shared"
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
      digest: "sha256:643596199b41560f87e2087d39ea8bf2d5b646e82c4851763eaacff46ffe8f11"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/pr-meta"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
        changed_files:
          - "docs/developer/local-runtime-resolution.md"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/runner/execution-receipt.ts"
          - "packages/agentplane/src/runner/process-supervision/result.ts"
          - "packages/agentplane/src/runner/process-supervision/run.ts"
          - "packages/agentplane/src/runner/process-supervision/state.ts"
          - "packages/agentplane/src/runner/runtime-env.integration.test.ts"
          - "packages/agentplane/src/shared/runtime-env.test.ts"
          - "packages/agentplane/src/shared/runtime-env.ts"
        external_effects: []
        repository_effects:
          - "documentation"
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
      - "verification_recovery:recorded-check-1"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 846ffaccbdec. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-30T03:06:28.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T03:24:14.153Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 846ffaccbdec. CLI accepted one state-bound external-agent semantic result."
    commit: "846ffaccbdecfdfb07eb4000e6a943616090ad70"
  -
    type: "verify"
    at: "2026-08-30T03:30:52.423Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
doc_version: 3
doc_updated_at: "2026-08-30T03:30:54.407Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the observed defect where verification reports `bun: command not found` even though Bun is installed and available on the host. Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths instead of assuming it is Supervisor-only. Establish one centralized executable resolver and normalized local runtime environment shared by default across those paths, without user-specific absolute paths and without per-agent PATH configuration by default. Explicit runtime profiles and task or execution overrides must take precedence over normalized defaults. Preserve inherited host PATH entries while resolving supported standard runtime locations deterministically. Distinguish executable-resolution or environment failure from implementation or test failure; if that typed classification requires a separate architectural change beyond this resolver, create a follow-up Task rather than widening this Task. Regression acceptance must exercise the production execution path with a deliberately reduced parent PATH, prove Bun resolution from a supported standard location, and prove fail-closed behavior with an explicit infrastructure-classified result when Bun is genuinely absent."
sections:
  Summary: |-
    AP-RUNTIME-001 Make local execution runtime deterministic

    Observed symptom: verification can report `bun: command not found` even though Bun is installed and available on the host. The violated invariant is that verification of the same execution contract on the same repository state must not depend on the parent shell PATH.

    Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths; do not assume Supervisor is the sole owner. Implement one centralized executable resolver and normalized local runtime environment shared by those local paths by default. Explicit runtime profiles and task or execution overrides take precedence. Do not encode user-specific absolute paths or create per-agent PATH configuration as the default. Distinguish executable-resolution or environment failure from implementation or test failure; split a follow-up Task if typed classification requires a separate architectural change.
  Scope: |-
    - In scope: trace executable and environment propagation through the production launch paths for agents, Supervisor, verification, and recovery subprocesses; define and implement one shared local runtime resolver; preserve inherited host PATH entries while adding supported standard runtime locations deterministically; enforce precedence for explicit runtime profiles and task or execution overrides; emit enough structured evidence to distinguish resolution failure from implementation or test failure; add production-path regressions for reduced PATH and true executable absence.
    - Required invariant: verification of one execution contract on one repository state does not change solely because AgentPlane was launched from a different parent shell PATH.
    - Required regression: launch the production execution path with a deliberately reduced parent PATH and an isolated fixture home containing Bun in a supported standard location; prove the resolved Bun is executed.
    - Required fail-closed regression: remove Bun from both PATH and every supported standard location; prove no unrelated executable is selected and the outcome is an explicit infrastructure or executable-resolution failure, not an implementation failure.
    - Out of scope: user-specific absolute paths; per-agent PATHs as the default model; container or remote runtime unification; release 0.7.8 scope; redesign of the full verification-result taxonomy when it can be isolated as a follow-up Task.
  Plan: "Plan one cohesive runtime implementation WorkItem with shared resolver hardening, production propagation and evidence qualification. Reuse runtime-env.ts; preserve explicit overrides and canonical authority."
  Verify Steps: |-
    1. Run standalone and root-referenced child Tasks through agent, Supervisor, verification, and recovery subprocesses. Expected: identical executable resolution and shared environment semantics.
    2. Restart from base and child worktree. Expected: deterministic toolchain identity and preserved root provenance.
    3. Change PATH or toolchain. Expected: old receipts cannot be reused and authority remains canonical rather than environment-derived.
    4. Omit a required executable. Expected: typed infrastructure failure, not product failure or authority widening.
    5. Run runtime, subprocess, receipt, installed CLI, and root-child integration tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T03:30:52.423Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:662550a4afa531436620a3de058c0263090e62afd93530949292d244e87808e7

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608251706-V287W1 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
    - old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608251706-V287W1

    DecisionContextRef:
    - operator_action: stop
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
  Findings: |-
    Roadmap intake on 2026-08-25:

    - The observed symptom is evidence of environment-dependent executable resolution, not proof that Supervisor alone owns the defect.
    - Completed Task 202603271156-EAMB43 covers first-class repository development bootstrap, not normalized runtime propagation across agent, Supervisor, verification, and recovery production subprocesses.
    - AP-CORE-016 already owns environment-bound verification receipts and infrastructure classification for missing toolchain binaries, but it does not own executable discovery or PATH normalization.
    - Placement: depend on AP-CORE-012 and make AP-CORE-013 depend on this Task. This establishes deterministic runtime resolution before canonical verification semantics and leaves AP-CORE-016 downstream to consume the normalized environment and classification evidence.
    - This Task is post-0.7.8 roadmap work and adds no dependency to the live 0.7.8 release chain.
extensions:
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:8729f96da6b32837f004e10d458b49de0917b7d6597fa98f6cc1564560a8836a"
    digest: "sha256:3ac1874ff717d1bbf8bef5fac8045d0664e12b2cbe97edba7b62ab2c468470f0"
    grant_id: "4ed7c9be-4fcb-486a-a35f-67233d864039"
    issued_at: "2026-08-30T02:57:20.979Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e3411f9c00014061a11d43ace35d9d858606b835080ff1323ab8b457c652078c"
    plan_revision: 10
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:5fac9f1c25b4514daf0ec5af461afe6e7348472267c3357d588f2a206cf78d35"
    status: "active"
    task_id: "202608251706-V287W1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T02:57:20.979Z"
        approved_by: "USER"
        approved_digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T02:56:49.483Z"
      digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
      proposal:
        assumptions:
          - "Keep runtime/environment provenance separate from canonical authorization. Do not infer authority from environment variables."
          - "Preserve unrelated worktrees and release scope. Use isolated fixture homes for missing-tool and fallback-location tests."
          - "The existing shared runtime-env module is the canonical owner; consolidate callers instead of adding independent per-agent PATH rules."
        planning_baseline:
          captured_at: "2026-08-30T02:52:10.563Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:bbbc096958309edd6ad4181d5f6a4eccd6da16cdc434429e6f44c4683f21f479"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "71519a0e675d7d460d27e7c5aea87d1f2363b9e2"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:9"
        schema_version: 1
        task_id: "202608251706-V287W1"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "runtime-full-ci"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "runtime-diff-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "runtime-full-ci"
              description: "Reuse and harden shared runtime-env resolution. Reduced inherited PATH resolves installed Node/Bun from supported explicit or standard locations; explicit execution/profile overrides win. Never select implicit relative-CWD candidates or non-executable files."
              id: "runtime-resolution"
              required: true
            -
              check_ids:
                - "runtime-full-ci"
              description: "Production runner, Supervisor verification and recovery subprocesses share normalized default runtime semantics. Preserve canonical authority and existing dotenv isolation. Add real subprocess regressions for fixture HOME, explicit overrides, root-referenced and standalone invocations, and true executable absence."
              id: "runtime-launches"
              required: true
            -
              check_ids:
                - "runtime-full-ci"
                - "runtime-diff-check"
              description: "Missing executables produce typed infrastructure evidence and cannot masquerade as implementation failures. Bind resolved runtime/environment identity to applicable receipts without secret values. Reuse existing failure and evidence contracts where possible."
              id: "runtime-evidence"
              required: true
          evidence_fingerprint: "sha256:c1247e039678d04591d413d9fb258152b206836f8438303ae30bff7fe8acc58b"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "runtime-full-ci"
                  description: "Reuse and harden shared runtime-env resolution. Reduced inherited PATH resolves installed Node/Bun from supported explicit or standard locations; explicit execution/profile overrides win. Never select implicit relative-CWD candidates or non-executable files."
                  id: "runtime-resolution"
                  required: true
                -
                  check_ids:
                    - "runtime-full-ci"
                  description: "Production runner, Supervisor verification and recovery subprocesses share normalized default runtime semantics. Preserve canonical authority and existing dotenv isolation. Add real subprocess regressions for fixture HOME, explicit overrides, root-referenced and standalone invocations, and true executable absence."
                  id: "runtime-launches"
                  required: true
                -
                  check_ids:
                    - "runtime-full-ci"
                    - "runtime-diff-check"
                  description: "Missing executables produce typed infrastructure evidence and cannot masquerade as implementation failures. Bind resolved runtime/environment identity to applicable receipts without secret values. Reuse existing failure and evidence contracts where possible."
                  id: "runtime-evidence"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 64000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "withPreferredRuntimePath"
                  - "resolvePreferredNodeExecutable"
                  - "runSupervisedProcess"
                  - "verificationChildEnv"
                  - "runDirectTaskVerification"
              depends_on: []
              expected_outputs:
                - "deterministic-local-runtime-implementation"
              id: "deterministic-local-runtime"
              objective: "Implement one deterministic local runtime resolver and propagate its environment through production execution, verification and recovery paths with explicit override precedence and typed resolution evidence."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/pr-meta"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/shared"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared/pr-meta"
                - "docs/developer"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "runtime-full-ci"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "runtime-diff-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "runtime-full-ci"
                    description: "Reuse and harden shared runtime-env resolution. Reduced inherited PATH resolves installed Node/Bun from supported explicit or standard locations; explicit execution/profile overrides win. Never select implicit relative-CWD candidates or non-executable files."
                    id: "runtime-resolution"
                    required: true
                  -
                    check_ids:
                      - "runtime-full-ci"
                    description: "Production runner, Supervisor verification and recovery subprocesses share normalized default runtime semantics. Preserve canonical authority and existing dotenv isolation. Add real subprocess regressions for fixture HOME, explicit overrides, root-referenced and standalone invocations, and true executable absence."
                    id: "runtime-launches"
                    required: true
                  -
                    check_ids:
                      - "runtime-full-ci"
                      - "runtime-diff-check"
                    description: "Missing executables produce typed infrastructure evidence and cannot masquerade as implementation failures. Bind resolved runtime/environment identity to applicable receipts without secret values. Reuse existing failure and evidence contracts where possible."
                    id: "runtime-evidence"
                    required: true
                evidence_fingerprint: "sha256:c1247e039678d04591d413d9fb258152b206836f8438303ae30bff7fe8acc58b"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608251706-V287W1"
    event_cursor: 0
    final_validation: null
    id: "202608251706-V287W1"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-25T22:46:41.344Z"
      constraints: []
      request: |-
        AP-RUNTIME-001 Make local execution runtime deterministic

        Fix the observed defect where verification reports `bun: command not found` even though Bun is installed and available on the host. Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths instead of assuming it is Supervisor-only. Establish one centralized executable resolver and normalized local runtime environment shared by default across those paths, without user-specific absolute paths and without per-agent PATH configuration by default. Explicit runtime profiles and task or execution overrides must take precedence over normalized defaults. Preserve inherited host PATH entries while resolving supported standard runtime locations deterministically. Distinguish executable-resolution or environment failure from implementation or test failure; if that typed classification requires a separate architectural change beyond this resolver, create a follow-up Task rather than widening this Task. Regression acceptance must exercise the production execution path with a deliberately reduced parent PATH, prove Bun resolution from a supported standard location, and prove fail-closed behavior with an explicit infrastructure-classified result when Bun is genuinely absent.
      task_id: "202608251706-V287W1"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 17
    schema_version: 1
    updated_at: "2026-08-30T03:30:55.573Z"
    work_items:
      deterministic-local-runtime:
        attempt: 1
        claim_id: null
        id: "deterministic-local-runtime"
        last_failure:
          cause_refs:
            - "runtime-resolution"
            - "runtime-launches"
            - "runtime-evidence"
          code: "validation_failed"
          kind: "validation"
          message: "Implemented deterministic local runtime discovery and shared environment normalization for runner and verification/recovery launch paths. Explicit profile PATH wins. Runtime identity and infrastructure failures are recorded through existing evidence/receipt contracts."
          retryable: true
        output_manifests:
          -
            digest: "sha256:1f80652b8223a305224f9f55d75cd3414a6abd9ca974e49cc2140a5c299a2b78"
            id: "deterministic-local-runtime-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608251706-V287W1"
              work_item_id: "deterministic-local-runtime"
            provenance:
              - "sha256:af3696eea5f8d64dfcbfed1bb2234dbf23e409f5547b74c2761558479b5235dd"
              - ".agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0b25625e060609e6f41fd970dcc070a9c942c24f21e152ee1d582697a4f28b5a"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json"
              check_id: "runtime-full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 1
              observed_at: "2026-08-30T03:30:55.566Z"
              repository_snapshot_digest: "sha256:0b25625e060609e6f41fd970dcc070a9c942c24f21e152ee1d582697a4f28b5a"
              status: "failed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json"
              check_id: "runtime-diff-check"
              command_identity: "git diff --check"
              detail: "Declared validation command git diff --check was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-08-30T03:30:55.566Z"
              repository_snapshot_digest: "sha256:0b25625e060609e6f41fd970dcc070a9c942c24f21e152ee1d582697a4f28b5a"
              status: "unsupported"
          schema_version: 1
          stale_evidence: []
          status: "blocked"
          unsatisfied_criteria:
            - "runtime-resolution"
            - "runtime-launches"
            - "runtime-evidence"
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608251706-V287W1-executor-4039265a31e04da683b4c138:
        aggregate_digest: "sha256:1432c3dd16fa68442e57fabb7994f3009804027c2ce20b7e4b2308f2e714b00a"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T03:30:55.573Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_582243aea031db2947888577"
          mutation_id: "external-result:work-order-202608251706-V287W1-executor-4039265a31e04da683b4c138"
          plan_digest: "sha256:0a32be0fe48f48a34d82bc81aa1c7b858cb333250aede98c0e3e543061660753"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608251706-V287W1"
          task_revision: 16
          to: "REWORK_READY"
          work_item_id: "deterministic-local-runtime"
        mutation_id: "external-result:work-order-202608251706-V287W1-executor-4039265a31e04da683b4c138"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202608251706-V287W1"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

AP-RUNTIME-001 Make local execution runtime deterministic

Observed symptom: verification can report `bun: command not found` even though Bun is installed and available on the host. The violated invariant is that verification of the same execution contract on the same repository state must not depend on the parent shell PATH.

Confirm the root cause across agents, Supervisor, verification, and recovery subprocess production paths; do not assume Supervisor is the sole owner. Implement one centralized executable resolver and normalized local runtime environment shared by those local paths by default. Explicit runtime profiles and task or execution overrides take precedence. Do not encode user-specific absolute paths or create per-agent PATH configuration as the default. Distinguish executable-resolution or environment failure from implementation or test failure; split a follow-up Task if typed classification requires a separate architectural change.

## Scope

- In scope: trace executable and environment propagation through the production launch paths for agents, Supervisor, verification, and recovery subprocesses; define and implement one shared local runtime resolver; preserve inherited host PATH entries while adding supported standard runtime locations deterministically; enforce precedence for explicit runtime profiles and task or execution overrides; emit enough structured evidence to distinguish resolution failure from implementation or test failure; add production-path regressions for reduced PATH and true executable absence.
- Required invariant: verification of one execution contract on one repository state does not change solely because AgentPlane was launched from a different parent shell PATH.
- Required regression: launch the production execution path with a deliberately reduced parent PATH and an isolated fixture home containing Bun in a supported standard location; prove the resolved Bun is executed.
- Required fail-closed regression: remove Bun from both PATH and every supported standard location; prove no unrelated executable is selected and the outcome is an explicit infrastructure or executable-resolution failure, not an implementation failure.
- Out of scope: user-specific absolute paths; per-agent PATHs as the default model; container or remote runtime unification; release 0.7.8 scope; redesign of the full verification-result taxonomy when it can be isolated as a follow-up Task.

## Plan

Plan one cohesive runtime implementation WorkItem with shared resolver hardening, production propagation and evidence qualification. Reuse runtime-env.ts; preserve explicit overrides and canonical authority.

## Verify Steps

1. Run standalone and root-referenced child Tasks through agent, Supervisor, verification, and recovery subprocesses. Expected: identical executable resolution and shared environment semantics.
2. Restart from base and child worktree. Expected: deterministic toolchain identity and preserved root provenance.
3. Change PATH or toolchain. Expected: old receipts cannot be reused and authority remains canonical rather than environment-derived.
4. Omit a required executable. Expected: typed infrastructure failure, not product failure or authority widening.
5. Run runtime, subprocess, receipt, installed CLI, and root-child integration tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T03:30:52.423Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b4a90a00629d4251c2e20a1c8d0affcac23f80998acbda3ba0aa60559c77656, input_digest=sha256:662550a4afa531436620a3de058c0263090e62afd93530949292d244e87808e7

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608251706-V287W1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608251706-V287W1 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608251706-V287W1-ap-runtime-001-make-local-execution-runtime-dete/.agentplane/tasks/202608251706-V287W1/blueprint/resolved-snapshot.json
- old_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- current_digest: 1e66c76a78609a97f5cd128422e5e2722d341505f5b69118c1434c54aa793981
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608251706-V287W1

DecisionContextRef:
- operator_action: stop
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

Roadmap intake on 2026-08-25:

- The observed symptom is evidence of environment-dependent executable resolution, not proof that Supervisor alone owns the defect.
- Completed Task 202603271156-EAMB43 covers first-class repository development bootstrap, not normalized runtime propagation across agent, Supervisor, verification, and recovery production subprocesses.
- AP-CORE-016 already owns environment-bound verification receipts and infrastructure classification for missing toolchain binaries, but it does not own executable discovery or PATH normalization.
- Placement: depend on AP-CORE-012 and make AP-CORE-013 depend on this Task. This establishes deterministic runtime resolution before canonical verification semantics and leaves AP-CORE-016 downstream to consume the normalized environment and classification evidence.
- This Task is post-0.7.8 roadmap work and adds no dependency to the live 0.7.8 release chain.
