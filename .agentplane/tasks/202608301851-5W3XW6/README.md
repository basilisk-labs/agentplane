---
id: "202608301851-5W3XW6"
title: "Recover unstarted task worktrees pinned before the approved planning baseline"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 30
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core-bootstrap"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T18:53:20.013Z"
  updated_by: "USER"
  note: "User authorized necessary bootstrap fixes and all in-scope plans for completion of the clean core refactor. This bounded recovery unblocks M3 without changing dependencies or bypassing gates."
verification:
  state: "needs_rework"
  updated_at: "2026-08-30T20:53:55.533Z"
  updated_by: "REVIEWER"
  note: "Address PR 5883 review threads 3890385746 and 3890385749: parse NUL-delimited normalized Git paths for custom workflow directories, and reserve capacity for the in-flight atomic publication candidate. Preserve recovery guards and add focused regressions."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-30T20:21:16.206Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 6 typed finding(s)."
  evaluated_sha: "753ed95d1d782fe03e1aec40f72508750ee84c2a"
  blueprint_digest: "c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649"
  evidence_refs:
    - ".agentplane/tasks/202608301851-5W3XW6/quality/20260830-201603236-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/20260830-201603236-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/objects/sha256/d4e4f5b282b02ac9eed524824f9226d5d78f724442081ca23a734262cf0fc996.md"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/20260830-201603236-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/20260830-201603236-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/20260830-201603236-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608301851-5W3XW6/README.md"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/objects/sha256/88d55613569a9881429b58e16be68aaecc010d82d2de9c0738e6655cc806a926.patch"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/objects/sha256/e851c6ff4d8240ee7502d4b5d7884c9a2711bb808bf435705a83ff265d6379e7.json"
    - ".agentplane/tasks/202608301851-5W3XW6/verification/20260830201530164-c13219fe0d49d28e.json"
    - ".agentplane/tasks/202608301851-5W3XW6/quality/objects/sha256/8bf281feaf0feb2d5a0b350bb465ecb07cd56ed14e2cf893cceb3fe2a7eec36c.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "All frozen evaluator evidence digests match. Native persisted checks passed: full CI, fast tests, typecheck, policy routing and doctor."
    - "The new test uses actual Task records and native route construction. It proves absent dependency and dependency_wait on the creation snapshot, preserved nonempty depends_on, and DONE dependency visibility with no dependency blocker after recovery in all three crash modes."
    - "Implementation preserves the approved plan and WorkItems, rejects explicit pins and started or dirty work, uses native revision locking, preserves verified crash candidates in an audit archive, and leaves default work resume behavior unchanged."
    - "The exact CLI candidate delta adds only the three reviewed recovery options and Task provenance. The immutable compatibility anchor is unchanged."
    - "Residual risk: Explicit recovery remains limited to an unstarted creation-checkout base with a descendant approved planning commit. Unknown artifacts, active work and divergent histories intentionally remain blocked."
    - "Residual risk: Hosted integration and actual M3 recovery are still pending."
token_usage:
  agent_runs: 9
  input_tokens: null
  journal_digest: "sha256:60d14c4efaede81016b93088fb57d0e7fcfcfc53d6fbe4b3158948c0abf3f251"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-30T20:21:53.863Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/developer"
      - "docs/reference"
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/runtime/task-execution-context"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Recovery changes Git and Task state only through an explicit operator command with exact identities and fail-closed checks. It requires isolated review and full regression checks."
      - "USER-approved blocked-result scope extension: roots=docs/user/cli-reference.generated.mdx; repository_effects=documentation"
      - "USER-approved blocked-result scope extension: roots=scripts/baselines/v0.7-compatibility-candidate.json,scripts/checks/check-compatibility-contract-baseline.mjs; repository_effects=tests"
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "docs/reference"
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/runtime/task-execution-context"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "docs/developer/harness-dev.mdx"
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/branch/work-resume-candidate.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
      - "packages/agentplane/src/commands/branch/work-resume.command.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
    external_effects: []
    repository_effects:
      - "documentation"
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
        id: "recorded-check-17"
        result: "pass"
      -
        id: "recorded-check-18"
        result: "pass"
      -
        id: "recorded-check-19"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-20"
        result: "pass"
      -
        id: "recorded-check-21"
        result: "pass"
      -
        id: "recorded-check-22"
        result: "pass"
      -
        id: "recorded-check-23"
        result: "pass"
      -
        id: "recorded-check-24"
        result: "pass"
      -
        id: "recorded-check-25"
        result: "pass"
      -
        id: "recorded-check-26"
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
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "docs/reference"
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/branch"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/runtime/task-execution-context"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:5f41826b667cd5a67efe174b209ce7e858caddee50968352b285ca232f62b953"
      escalation_reasons:
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "effect_public_api"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "docs/developer/harness-dev.mdx"
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/commands/branch/work-resume-candidate.ts"
          - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
          - "packages/agentplane/src/commands/branch/work-resume.command.ts"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
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
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:verification-record"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The native recovery needs its generated CLI reference in the writable scope. Source work is preserved outside the checkout in tool state; the emitted baseline is restored before requesting the extension. Recommended action: Extend scope to docs/user/cli-reference.generated.mdx, then restore the preserved candidate and regenerate documentation. Requested scope: roots=docs/user/cli-reference.generated.mdx; repository effects=documentation; request digest=sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360. Agentplane receipt: external-agent-blocker/tr_359012ee79b8ac83b73d24a7f02d9132/sha256:8efcdc33bc75000d5291750a49bda8a7d3f596bdffb17e3116492c890657fcaa/sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: docs/user/cli-reference.generated.mdx; repository effects: documentation."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 01bb6b501547. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Full CI requires an exact additive compatibility candidate update for the three new work resume options. Recommended action: Extend the two exact paths, record the additive CLI options with Task provenance, and retain all existing compatibility guards. Requested scope: roots=scripts/baselines/v0.7-compatibility-candidate.json,scripts/checks/check-compatibility-contract-baseline.mjs; repository effects=tests; request digest=sha256:19307380a094c86cc2e266383bcc28b0a97460389271f31631b63de319e6ab99. Agentplane receipt: external-agent-blocker/tr_ae976010dabc522e1afc92f4f365ab8a/sha256:0b4142ecab862e09e2eacf54caf2310339f5f2fb514c6819b513eac7561ec183/sha256:19307380a094c86cc2e266383bcc28b0a97460389271f31631b63de319e6ab99."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: scripts/baselines/v0.7-compatibility-candidate.json, scripts/checks/check-compatibility-contract-baseline.mjs; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7af3f7882834. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d0e1012b750a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 753ed95d1d78. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-30T18:53:26.069Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T19:08:49.791Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The native recovery needs its generated CLI reference in the writable scope. Source work is preserved outside the checkout in tool state; the emitted baseline is restored before requesting the extension. Recommended action: Extend scope to docs/user/cli-reference.generated.mdx, then restore the preserved candidate and regenerate documentation. Requested scope: roots=docs/user/cli-reference.generated.mdx; repository effects=documentation; request digest=sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360. Agentplane receipt: external-agent-blocker/tr_359012ee79b8ac83b73d24a7f02d9132/sha256:8efcdc33bc75000d5291750a49bda8a7d3f596bdffb17e3116492c890657fcaa/sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360."
  -
    type: "status"
    at: "2026-08-30T19:15:26.128Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 01bb6b501547. CLI accepted one state-bound external-agent semantic result."
    commit: "01bb6b501547edd924695f6d5a1379911466dbe8"
  -
    type: "verify"
    at: "2026-08-30T19:17:15.634Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T19:19:36.266Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Full CI requires an exact additive compatibility candidate update for the three new work resume options. Recommended action: Extend the two exact paths, record the additive CLI options with Task provenance, and retain all existing compatibility guards. Requested scope: roots=scripts/baselines/v0.7-compatibility-candidate.json,scripts/checks/check-compatibility-contract-baseline.mjs; repository effects=tests; request digest=sha256:19307380a094c86cc2e266383bcc28b0a97460389271f31631b63de319e6ab99. Agentplane receipt: external-agent-blocker/tr_ae976010dabc522e1afc92f4f365ab8a/sha256:0b4142ecab862e09e2eacf54caf2310339f5f2fb514c6819b513eac7561ec183/sha256:19307380a094c86cc2e266383bcc28b0a97460389271f31631b63de319e6ab99."
  -
    type: "status"
    at: "2026-08-30T19:32:51.307Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7af3f7882834. CLI accepted one state-bound external-agent semantic result."
    commit: "7af3f7882834056ce41278a0275351ab98e505ae"
  -
    type: "verify"
    at: "2026-08-30T19:35:58.462Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T19:40:00.663Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d0e1012b750a. CLI accepted one state-bound external-agent semantic result."
    commit: "d0e1012b750ad2ac8282f618642c79912cc6ea9e"
  -
    type: "verify"
    at: "2026-08-30T19:54:51.358Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T20:01:33.166Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 753ed95d1d78. CLI accepted one state-bound external-agent semantic result."
    commit: "753ed95d1d782fe03e1aec40f72508750ee84c2a"
  -
    type: "verify"
    at: "2026-08-30T20:15:30.164Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T20:21:53.863Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "bcf2f38f73d05fc2878983c72ca0a4a9e2f066c2"
  -
    type: "verify"
    at: "2026-08-30T20:53:55.533Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "Address PR 5883 review threads 3890385746 and 3890385749: parse NUL-delimited normalized Git paths for custom workflow directories, and reserve capacity for the in-flight atomic publication candidate. Preserve recovery guards and add focused regressions."
doc_version: 3
doc_updated_at: "2026-08-30T20:54:00.483Z"
doc_updated_by: "CODER"
description: "M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor."
sections:
  Summary: |-
    Recover unstarted task worktrees pinned before the approved planning baseline

    M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
  Scope: |-
    - In scope: M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
    - Out of scope: unrelated refactors not required for "Recover unstarted task worktrees pinned before the approved planning baseline".
  Plan: "Plan a bounded native recovery for an unstarted workspace pinned before approved planning."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover unstarted task worktrees pinned before the approved planning baseline". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover unstarted task worktrees pinned before the approved planning baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T19:17:15.634Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:3e63b0e72fda4a091c203a19c5d38abff3856650fec3dd734951b2b33a786ebe

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
    - old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

    ### 2026-08-30T19:35:58.462Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:99073ec830b7e2cb23022747c770c581467907c1a763ef1700ffc76bbce48d2a

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
    - old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

    ### 2026-08-30T19:54:51.358Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:248844ca3002d061c28ace1dd7867d3a2b9408db7a83bd00fbf787e56a4f7321

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
    - old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

    ### 2026-08-30T20:15:30.164Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:95d8aa9330f4e7556891f9e0ff4f3980ea85238b81deeb6a3b603171640e1e4b

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
    - old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608301851-5W3XW6
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T20:53:55.533Z — VERIFY — needs_rework

    By: REVIEWER

    Note: Address PR 5883 review threads 3890385746 and 3890385749: parse NUL-delimited normalized Git paths for custom workflow directories, and reserve capacity for the in-flight atomic publication candidate. Preserve recovery guards and add focused regressions.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:e49d9f4477570375add0bdc023ae9eae5b4b342d731ab246ea8849a0e9a2f2e9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
    - old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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
  Findings: ""
extensions:
  agentplane.scope_extension_request:
    applied_at: "2026-08-30T19:20:47.771Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:0b4142ecab862e09e2eacf54caf2310339f5f2fb514c6819b513eac7561ec183"
    kind: "task_scope_extension_request"
    request:
      rationale: "The full CI failure requires registering three additive work resume options and their exact candidate digest. Do not modify the immutable baseline, remove existing expected options, or loosen guard comparisons."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "scripts/baselines/v0.7-compatibility-candidate.json"
        - "scripts/checks/check-compatibility-contract-baseline.mjs"
    request_digest: "sha256:19307380a094c86cc2e266383bcc28b0a97460389271f31631b63de319e6ab99"
    schema_version: 1
    status: "applied"
    transition_id: "tr_ae976010dabc522e1afc92f4f365ab8a"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T19:20:47.771Z"
        approved_by: "USER"
        approved_digest: "sha256:51825cff1368eee485df886ea4a23f64fe590c5e5db1a9817e59fb6c9f4e679d"
        policy_facts:
          - "state_bound_scope_extension:sha256:19307380a094c86cc2e266383bcc28b0a97460389271f31631b63de319e6ab99"
        state: "approved"
      created_at: "2026-08-30T19:20:47.771Z"
      digest: "sha256:51825cff1368eee485df886ea4a23f64fe590c5e5db1a9817e59fb6c9f4e679d"
      proposal:
        assumptions:
          - "This operator recovery is limited to unstarted creation-checkout Tasks. It does not change default frozen-base semantics or explicit user pins."
          - "M3 is retained unchanged until native recovery is verified and authorized. No task dependency is removed to bypass readiness."
        planning_baseline:
          captured_at: "2026-08-30T18:52:06.171Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
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
            - ".agentplane/tasks/202608301851-5W3XW6/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "36741ce5160d452ca9660a388241cb4da32f842a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608301851-5W3XW6"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "bootstrap-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "bootstrap-types"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "bootstrap-full"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "bootstrap-tests"
                - "bootstrap-types"
                - "bootstrap-full"
              description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
              id: "bootstrap-recovery"
              required: true
          evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "bootstrap-tests"
                    - "bootstrap-types"
                    - "bootstrap-full"
                  description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                  id: "bootstrap-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "makeRunWorkResumeHandler"
                  - "resolveFrozenBaseIdentity"
                  - "taskCentricAggregateFromExtensions"
              depends_on: []
              expected_outputs:
                - "planning-base-recovery-implementation"
              id: "recover-planning-base"
              objective: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runtime/task-execution-context"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/user/cli-reference.generated.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
              risk: "high"
              scope_roots:
                - "docs/developer"
                - "docs/reference"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runtime/task-execution-context"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "bootstrap-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "bootstrap-types"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "bootstrap-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "bootstrap-tests"
                      - "bootstrap-types"
                      - "bootstrap-full"
                    description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                    id: "bootstrap-recovery"
                    required: true
                evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202608301851-5W3XW6"
    event_cursor: 2
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608301851-5W3XW6"
            - "git:753ed95d1d782fe03e1aec40f72508750ee84c2a"
          check_id: "bootstrap-tests"
          command_identity: "bun run test:fast"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T20:15:30.164Z"
          repository_snapshot_digest: "sha256:30997e424d643359a5eb7a7511e4eeac2ee158e51f5a4fcb161f553c1af6908b"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608301851-5W3XW6"
            - "git:753ed95d1d782fe03e1aec40f72508750ee84c2a"
          check_id: "bootstrap-types"
          command_identity: "bun run typecheck"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T20:15:30.164Z"
          repository_snapshot_digest: "sha256:30997e424d643359a5eb7a7511e4eeac2ee158e51f5a4fcb161f553c1af6908b"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608301851-5W3XW6"
            - "git:753ed95d1d782fe03e1aec40f72508750ee84c2a"
          check_id: "bootstrap-full"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-30T20:15:30.164Z"
          repository_snapshot_digest: "sha256:30997e424d643359a5eb7a7511e4eeac2ee158e51f5a4fcb161f553c1af6908b"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608301851-5W3XW6"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:fast"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-30T18:51:50.673Z"
      constraints: []
      request: |-
        Recover unstarted task worktrees pinned before the approved planning baseline

        M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
      task_id: "202608301851-5W3XW6"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-30T18:53:20.013Z"
          approved_by: "USER"
          approved_digest: "sha256:d27e2ac02253c387453dd45cc058373b3da2f2569b4bc8b2916a2d60eee64505"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T18:52:59.720Z"
        digest: "sha256:d27e2ac02253c387453dd45cc058373b3da2f2569b4bc8b2916a2d60eee64505"
        proposal:
          assumptions:
            - "This operator recovery is limited to unstarted creation-checkout Tasks. It does not change default frozen-base semantics or explicit user pins."
            - "M3 is retained unchanged until native recovery is verified and authorized. No task dependency is removed to bypass readiness."
          planning_baseline:
            captured_at: "2026-08-30T18:52:06.171Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
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
              - ".agentplane/tasks/202608301851-5W3XW6/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "36741ce5160d452ca9660a388241cb4da32f842a"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608301851-5W3XW6"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "bootstrap-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "bootstrap-types"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "bootstrap-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "bootstrap-tests"
                  - "bootstrap-types"
                  - "bootstrap-full"
                description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                id: "bootstrap-recovery"
                required: true
            evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "bootstrap-tests"
                      - "bootstrap-types"
                      - "bootstrap-full"
                    description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                    id: "bootstrap-recovery"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "makeRunWorkResumeHandler"
                    - "resolveFrozenBaseIdentity"
                    - "taskCentricAggregateFromExtensions"
                depends_on: []
                expected_outputs:
                  - "planning-base-recovery-implementation"
                id: "recover-planning-base"
                objective: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runtime/task-execution-context"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/branch"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runtime/task-execution-context"
                  - "packages/agentplane/src/cli"
                  - "docs/reference"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "bootstrap-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "bootstrap-types"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "bootstrap-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "bootstrap-tests"
                        - "bootstrap-types"
                        - "bootstrap-full"
                      description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                      id: "bootstrap-recovery"
                      required: true
                  evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608301851-5W3XW6"
      -
        approval:
          approved_at: "2026-08-30T19:09:00.939Z"
          approved_by: "USER"
          approved_digest: "sha256:d663e6bac12833b8d35484614ee257149909e035d31d4292546978ee52b1f860"
          policy_facts:
            - "state_bound_scope_extension:sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360"
          state: "approved"
        created_at: "2026-08-30T19:09:00.939Z"
        digest: "sha256:d663e6bac12833b8d35484614ee257149909e035d31d4292546978ee52b1f860"
        proposal:
          assumptions:
            - "This operator recovery is limited to unstarted creation-checkout Tasks. It does not change default frozen-base semantics or explicit user pins."
            - "M3 is retained unchanged until native recovery is verified and authorized. No task dependency is removed to bypass readiness."
          planning_baseline:
            captured_at: "2026-08-30T18:52:06.171Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
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
              - ".agentplane/tasks/202608301851-5W3XW6/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "36741ce5160d452ca9660a388241cb4da32f842a"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608301851-5W3XW6"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "bootstrap-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "bootstrap-types"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "bootstrap-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "bootstrap-tests"
                  - "bootstrap-types"
                  - "bootstrap-full"
                description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                id: "bootstrap-recovery"
                required: true
            evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "bootstrap-tests"
                      - "bootstrap-types"
                      - "bootstrap-full"
                    description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                    id: "bootstrap-recovery"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "makeRunWorkResumeHandler"
                    - "resolveFrozenBaseIdentity"
                    - "taskCentricAggregateFromExtensions"
                depends_on: []
                expected_outputs:
                  - "planning-base-recovery-implementation"
                id: "recover-planning-base"
                objective: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runtime/task-execution-context"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/user/cli-reference.generated.mdx"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "docs/reference"
                  - "docs/user/cli-reference.generated.mdx"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/branch"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runtime/task-execution-context"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "bootstrap-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "bootstrap-types"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "bootstrap-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "bootstrap-tests"
                        - "bootstrap-types"
                        - "bootstrap-full"
                      description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                      id: "bootstrap-recovery"
                      required: true
                  evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202608301851-5W3XW6"
    revision: 29
    schema_version: 1
    updated_at: "2026-08-30T20:21:53.863Z"
    work_items:
      recover-planning-base:
        attempt: 3
        claim_id: null
        id: "recover-planning-base"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:027d68b92ae54271ea2c26625b292474527aeb4a65c6a3414dceedd95e191d1d"
            id: "planning-base-recovery-implementation"
            kind: "semantic_output"
            producer:
              attempt: 3
              plan_revision: 3
              task_id: "202608301851-5W3XW6"
              work_item_id: "recover-planning-base"
            provenance:
              - "sha256:92457124f75b41d016e9d7d1fa11ab28f12178b6224283128282ecdb754eb4e3"
              - ".agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:c3cf02c6596b13556a01fb2578c18fe41d2da483eeeac453d83b947cc5c5ac25"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 4
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json"
              check_id: "bootstrap-tests"
              command_identity: "bun run test:fast"
              detail: "Observed by bun run test:fast."
              exit_code: 0
              observed_at: "2026-08-30T19:54:54.965Z"
              repository_snapshot_digest: "sha256:c3cf02c6596b13556a01fb2578c18fe41d2da483eeeac453d83b947cc5c5ac25"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json"
              check_id: "bootstrap-types"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-08-30T19:54:54.965Z"
              repository_snapshot_digest: "sha256:c3cf02c6596b13556a01fb2578c18fe41d2da483eeeac453d83b947cc5c5ac25"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json"
              check_id: "bootstrap-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-30T19:54:54.965Z"
              repository_snapshot_digest: "sha256:c3cf02c6596b13556a01fb2578c18fe41d2da483eeeac453d83b947cc5c5ac25"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608301851-5W3XW6-executor-124e3d66a4bea9a74ad7fe38:
        aggregate_digest: "sha256:7046090268a4a4cf2c918b62413d2d66f43d62ba0e88acdee8e79acebf67f0d8"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T19:36:01.928Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_752a303a3f0c99412f6d5185"
          mutation_id: "external-result:work-order-202608301851-5W3XW6-executor-124e3d66a4bea9a74ad7fe38"
          plan_digest: "sha256:51825cff1368eee485df886ea4a23f64fe590c5e5db1a9817e59fb6c9f4e679d"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608301851-5W3XW6"
          task_revision: 17
          to: "REWORK_READY"
          work_item_id: "recover-planning-base"
        mutation_id: "external-result:work-order-202608301851-5W3XW6-executor-124e3d66a4bea9a74ad7fe38"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202608301851-5W3XW6"
      external-result:work-order-202608301851-5W3XW6-executor-6b6609fbe405fbedbcf84955:
        aggregate_digest: "sha256:2fed1ce220a5ce5174e446dccf204d62bd92c3fc563ca8e45e9c77142596f7eb"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T19:17:19.116Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_9f377eecbddd94d1879a1e55"
          mutation_id: "external-result:work-order-202608301851-5W3XW6-executor-6b6609fbe405fbedbcf84955"
          plan_digest: "sha256:d663e6bac12833b8d35484614ee257149909e035d31d4292546978ee52b1f860"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608301851-5W3XW6"
          task_revision: 10
          to: "REWORK_READY"
          work_item_id: "recover-planning-base"
        mutation_id: "external-result:work-order-202608301851-5W3XW6-executor-6b6609fbe405fbedbcf84955"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202608301851-5W3XW6"
      external-result:work-order-202608301851-5W3XW6-executor-90054a4afe653f2b12f219cc:
        aggregate_digest: "sha256:3b79b6e9be31f4da78a8f0fa255a5249a70ad315a2595b76bc627dbdbdb5dbe8"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T19:54:54.976Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_fcb8320a0ef84268ac158b7e"
          mutation_id: "external-result:work-order-202608301851-5W3XW6-executor-90054a4afe653f2b12f219cc"
          plan_digest: "sha256:51825cff1368eee485df886ea4a23f64fe590c5e5db1a9817e59fb6c9f4e679d"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608301851-5W3XW6"
          task_revision: 21
          to: "COMPLETED"
          work_item_id: "recover-planning-base"
        mutation_id: "external-result:work-order-202608301851-5W3XW6-executor-90054a4afe653f2b12f219cc"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202608301851-5W3XW6"
      legacy-finish:202608301851-5W3XW6:2026-08-30T20:15:30.164Z:753ed95d1d782fe03e1aec40f72508750ee84c2a:
        aggregate_digest: "sha256:65a4aeb8cc50e3e2e63406b82c66daac738e8f2ccd2fe0b752efac08c882d62e"
        event:
          actor_id: "CODER"
          at: "2026-08-30T20:21:53.863Z"
          cause_refs:
            - "task-verification:202608301851-5W3XW6"
            - "git:753ed95d1d782fe03e1aec40f72508750ee84c2a"
          entity: "task"
          from: "ACTIVE"
          id: "event_d7dc730ecd157f2906854b32"
          mutation_id: "legacy-finish:202608301851-5W3XW6:2026-08-30T20:15:30.164Z:753ed95d1d782fe03e1aec40f72508750ee84c2a"
          plan_digest: "sha256:51825cff1368eee485df886ea4a23f64fe590c5e5db1a9817e59fb6c9f4e679d"
          plan_revision: 3
          repository_fingerprint: "sha256:30997e424d643359a5eb7a7511e4eeac2ee158e51f5a4fcb161f553c1af6908b"
          schema_version: 1
          task_id: "202608301851-5W3XW6"
          task_revision: 22
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608301851-5W3XW6:2026-08-30T20:15:30.164Z:753ed95d1d782fe03e1aec40f72508750ee84c2a"
        next_revision: 29
        previous_revision: 28
        schema_version: 1
        task_id: "202608301851-5W3XW6"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    version: 1
id_source: "generated"
---
## Summary

Recover unstarted task worktrees pinned before the approved planning baseline

M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.

## Scope

- In scope: M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
- Out of scope: unrelated refactors not required for "Recover unstarted task worktrees pinned before the approved planning baseline".

## Plan

Plan a bounded native recovery for an unstarted workspace pinned before approved planning.

## Verify Steps

PLANNER fallback scaffold for "Recover unstarted task worktrees pinned before the approved planning baseline". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover unstarted task worktrees pinned before the approved planning baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T19:17:15.634Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:3e63b0e72fda4a091c203a19c5d38abff3856650fec3dd734951b2b33a786ebe

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
- old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

### 2026-08-30T19:35:58.462Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:99073ec830b7e2cb23022747c770c581467907c1a763ef1700ffc76bbce48d2a

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
- old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

### 2026-08-30T19:54:51.358Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:248844ca3002d061c28ace1dd7867d3a2b9408db7a83bd00fbf787e56a4f7321

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
- old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

### 2026-08-30T20:15:30.164Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:95d8aa9330f4e7556891f9e0ff4f3980ea85238b81deeb6a3b603171640e1e4b

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608301851-5W3XW6/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608301851-5W3XW6 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
- old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608301851-5W3XW6
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T20:53:55.533Z — VERIFY — needs_rework

By: REVIEWER

Note: Address PR 5883 review threads 3890385746 and 3890385749: parse NUL-delimited normalized Git paths for custom workflow directories, and reserve capacity for the in-flight atomic publication candidate. Preserve recovery guards and add focused regressions.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9a2b1806b690cbefd91d020ef39915ec1c9bdbe00cb131dc7a044c63418182f, input_digest=sha256:e49d9f4477570375add0bdc023ae9eae5b4b342d731ab246ea8849a0e9a2f2e9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608301851-5W3XW6-recover-unstarted-task-worktrees-pinned-before-t/.agentplane/tasks/202608301851-5W3XW6/blueprint/resolved-snapshot.json
- old_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- current_digest: c4fe4f9395dc1a16d9d0e045fcc7079e8e2b42ab4cd182ea5e32873dbb3bd649
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608301851-5W3XW6

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

## Token Usage

- State: `unavailable`
- Completeness: `0/9` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:60d14c4efaede81016b93088fb57d0e7fcfcfc53d6fbe4b3158948c0abf3f251`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-30T20:21:53.863Z`
