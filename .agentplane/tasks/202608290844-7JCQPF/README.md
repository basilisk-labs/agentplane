---
id: "202608290844-7JCQPF"
title: "Allow state-bound WorkItem implementation results to reopen DONE tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 40
origin:
  system: "manual"
depends_on: []
tags:
  - "task-centric"
  - "review-blocker"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T12:19:19.387Z"
  updated_by: "USER"
  note: "User pre-authorized subsequent in-scope bootstrap recovery plans; approved plan deff35da with unchanged four-file scope and no external effects."
verification:
  state: "ok"
  updated_at: "2026-08-29T14:36:21.259Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-29T13:58:49.036Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 5 typed finding(s)."
  evaluated_sha: "a607a05c6e11b9be9f6084d2f800f798f7dc2628"
  blueprint_digest: "1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584"
  evidence_refs:
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e292f4d015d55c072e7e21144fc8791343a332c84a64d49e6164ed43ac4537ca.md"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-135755737-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608290844-7JCQPF/README.md"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/eba6a62437a3e1722cad7b6d477654c71e7c4ecea013a52313e862621c811e58.patch"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/f5a5751e9d32d9d24fb39379371b7291cd6420c99d10ecf8f0283eb09e84094e.json"
    - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829135723903-1e369e8c538b8c1d.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The authority helper permits DONE reopen for implementation_rework and for ordinary implementation only when work_item_id is concrete; task-level ordinary implementation and all non-DONE cases remain false."
    - "The real task-advance branch-worktree regression observes READY on interrupted projection, seeds premature DONE, replays the original result, and asserts DOING, verification=ok, and WorkItem COMPLETED."
    - "Task-level scope extension preserves a fully completed plan and rejects zero schedulable selection when required work remains unfinished."
    - "The persisted verification record covers affected integration tests, critical size and diff guards, the full local regression suite, and the task outcome."
    - "Residual risk: The hosted PR head, hosted checks, merge result, and hosted-close state are not yet observed."
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
    allowed_external_effects: []
    allowed_repository_effects:
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch PR preserves independent review and hosted integration evidence."
      - "The changes are limited to state-bound authority and scope-extension recovery required by the unresolved PR review."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts; repository_effects=tests"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
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
        result: "fail"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
      digest: "sha256:7e3fb43ce78474c12b5492f0bcc9437d17179e3ba2a307a3ecb65b345a37b9db"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:verification-record"
commit:
  hash: "a607a05c6e11b9be9f6084d2f800f798f7dc2628"
  message: "🚧 7JCQPF task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: be12e8810639. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 788c7ed1ec2a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Blocked by the task-centric result projection order: the current plan cannot accept a refinement because WorkItem selection fails before plan_refinement is recorded. Recommended action: Create and integrate a narrow blocker that records semantic.plan_refinement before WorkItem selection and returns replan_required without projecting a WorkItem result; then rebuild the runtime and resume this task from a fresh packet. Agentplane receipt: external-agent-blocker/tr_60ad750bf1d4cb201d3c3c07cfb828d8/sha256:025b509821fc4dd45dc9897b60c289d4499ab110b16fbe7a1b093e4f2747bae9."
  -
    author: "CODER"
    body: "Resume: prerequisite PR #5872 merged at 57a22a308fd63147d95fe6a65733d02586cdc126 and Task Hosted Close passed; continue the approved recovery plan from a fresh packet."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: fceb51632800. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 52f1d7ccbc2c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The missing real DONE recovery regression belongs in the existing branch-worktree integration fixture, which is outside the current writable scope. Recommended action: Add packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts to the approved WorkItem scope, then extend its interrupted projection scenario without adding a baseline exception. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts; repository effects=tests; request digest=sha256:d1b9c83a7ae6bd4b8386aefaee8e724c0b2d0aff61d0f1d28d87a4bb0e5a7744. Agentplane receipt: external-agent-blocker/tr_985eb547237c6a67b3ea391f11d6c377/sha256:40dcca04f7705db3f17f873f33dc33757401eaf76cc781d1afe4d12534e5282c/sha256:d1b9c83a7ae6bd4b8386aefaee8e724c0b2d0aff61d0f1d28d87a4bb0e5a7744."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a607a05c6e11. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a607a05c6e11. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a607a05c6e11. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-29T08:47:59.077Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T08:53:44.601Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: be12e8810639. CLI accepted one state-bound external-agent semantic result."
    commit: "be12e8810639b5d84b8152f5ced3d68a7f0c4867"
  -
    type: "verify"
    at: "2026-08-29T09:00:48.568Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-29T09:06:26.006Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 788c7ed1ec2a. CLI accepted one state-bound external-agent semantic result."
    commit: "788c7ed1ec2aa26ee88aa589c0c5db128b649496"
  -
    type: "verify"
    at: "2026-08-29T09:14:31.764Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "verify"
    at: "2026-08-29T09:18:15.695Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "Task-centric completion is blocked because the approved WorkItem required_inputs are narrative evidence labels rather than produced output IDs; refine the plan before pre-merge closure."
  -
    type: "status"
    at: "2026-08-29T09:19:42.718Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Blocked by the task-centric result projection order: the current plan cannot accept a refinement because WorkItem selection fails before plan_refinement is recorded. Recommended action: Create and integrate a narrow blocker that records semantic.plan_refinement before WorkItem selection and returns replan_required without projecting a WorkItem result; then rebuild the runtime and resume this task from a fresh packet. Agentplane receipt: external-agent-blocker/tr_60ad750bf1d4cb201d3c3c07cfb828d8/sha256:025b509821fc4dd45dc9897b60c289d4499ab110b16fbe7a1b093e4f2747bae9."
  -
    type: "status"
    at: "2026-08-29T11:45:42.541Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: prerequisite PR #5872 merged at 57a22a308fd63147d95fe6a65733d02586cdc126 and Task Hosted Close passed; continue the approved recovery plan from a fresh packet."
  -
    type: "status"
    at: "2026-08-29T11:53:31.324Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: fceb51632800. CLI accepted one state-bound external-agent semantic result."
    commit: "fceb51632800e2d9b8d87cca8a8f2ff0dccb7b14"
  -
    type: "verify"
    at: "2026-08-29T12:15:18.627Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-29T12:20:48.956Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T12:55:27.924Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 52f1d7ccbc2c. CLI accepted one state-bound external-agent semantic result."
    commit: "52f1d7ccbc2ceae988b045c9516924a2a96954fd"
  -
    type: "verify"
    at: "2026-08-29T13:31:55.703Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: the real task-advance DONE recovery regression is absent from the committed candidate, and full local CI cannot pass because the proposed test location exceeds the oversized-test baseline. Move the regression into the existing branch-worktree integration fixture without a baseline exception."
  -
    type: "status"
    at: "2026-08-29T13:33:03.854Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The missing real DONE recovery regression belongs in the existing branch-worktree integration fixture, which is outside the current writable scope. Recommended action: Add packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts to the approved WorkItem scope, then extend its interrupted projection scenario without adding a baseline exception. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts; repository effects=tests; request digest=sha256:d1b9c83a7ae6bd4b8386aefaee8e724c0b2d0aff61d0f1d28d87a4bb0e5a7744. Agentplane receipt: external-agent-blocker/tr_985eb547237c6a67b3ea391f11d6c377/sha256:40dcca04f7705db3f17f873f33dc33757401eaf76cc781d1afe4d12534e5282c/sha256:d1b9c83a7ae6bd4b8386aefaee8e724c0b2d0aff61d0f1d28d87a4bb0e5a7744."
  -
    type: "status"
    at: "2026-08-29T13:43:41.227Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a607a05c6e11. CLI accepted one state-bound external-agent semantic result."
    commit: "a607a05c6e11b9be9f6084d2f800f798f7dc2628"
  -
    type: "verify"
    at: "2026-08-29T13:57:23.903Z"
    author: "TESTER"
    state: "ok"
    note: "Verified at implementation commit a607a05c6 with focused and full local evidence."
  -
    type: "verify"
    at: "2026-08-29T14:03:19.538Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: implementation commit and passing checks are recorded, but WorkItem complete-done-workitem-recovery remains READY because result projection was interrupted. Recover the recorded state-bound result and complete the concrete WorkItem before pre-merge closure."
  -
    type: "status"
    at: "2026-08-29T14:04:26.768Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a607a05c6e11. CLI accepted one state-bound external-agent semantic result."
    commit: "a607a05c6e11b9be9f6084d2f800f798f7dc2628"
  -
    type: "verify"
    at: "2026-08-29T14:25:22.018Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "verify"
    at: "2026-08-29T14:26:03.828Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: formal verification passed, but concrete WorkItem complete-done-workitem-recovery remains READY because the EXECUTOR result was not projected. Issue and consume a fresh state-bound implementation_rework result."
  -
    type: "status"
    at: "2026-08-29T14:26:45.124Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a607a05c6e11. CLI accepted one state-bound external-agent semantic result."
    commit: "a607a05c6e11b9be9f6084d2f800f798f7dc2628"
  -
    type: "verify"
    at: "2026-08-29T14:36:21.259Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-29T14:36:23.879Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering."
sections:
  Summary: |-
    Allow state-bound WorkItem implementation results to reopen DONE tasks

    Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.
  Scope: |-
    - In scope: Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.
    - Out of scope: unrelated refactors not required for "Allow state-bound WorkItem implementation results to reopen DONE tasks".
  Plan: "Prepared a one-WorkItem recovery plan with no narrative required_inputs and an explicit real task-advance regression."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow state-bound WorkItem implementation results to reopen DONE tasks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow state-bound WorkItem implementation results to reopen DONE tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-29T09:00:48.568Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:3c2327767f97993ec8bd9e27de0f7762a5bbabeeeb4edb61781f6fd40cb2af02

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

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

    ### 2026-08-29T09:14:31.764Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:838f27720a4a7578e2ad6118ebd2e245234577163c5387e9c36dab269f66b848

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

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

    ### 2026-08-29T09:18:15.695Z — VERIFY — needs_rework

    By: REVIEWER

    Note: Task-centric completion is blocked because the approved WorkItem required_inputs are narrative evidence labels rather than produced output IDs; refine the plan before pre-merge closure.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:c4c4ecc294526dbc1efeebfc92b97f75b181b9bf8b527940d4e489a39f983256

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202608290844-7JCQPF --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit b8ec469a7231ede40943b84c4bbe5193153efeac --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-08-29T12:15:18.627Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:37e69e4eacce6edcb3f1fd66d8efdf2a1b514844a605c30accc7c44f07cb97b6

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T13:31:55.703Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: the real task-advance DONE recovery regression is absent from the committed candidate, and full local CI cannot pass because the proposed test location exceeds the oversized-test baseline. Move the regression into the existing branch-worktree integration fixture without a baseline exception.
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:c4c4ecc294526dbc1efeebfc92b97f75b181b9bf8b527940d4e489a39f983256

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T13:57:23.903Z — VERIFY — ok

    By: TESTER

    Note: Verified at implementation commit a607a05c6 with focused and full local evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:0db0dac6afc7a80d68ca15b8ad210455a9591bbb43c7e2bf5229d0dcece06242

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts -t recovers-an-implementation-interrupted
    Result: pass
    Evidence: 2 matching parameterized recovery cases passed.
    Scope: interrupted verification and WorkItem projection recovery, including premature DONE replay.

    Check: critical_paths
    Command: bun run hotspots:check && git diff --check
    Result: pass
    Evidence: runtime hotspot threshold, oversized-test baseline, and whitespace checks passed; branch-worktree test is 905 lines.
    Scope: state-bound authority and repository size and diff guards.

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: full-fast runtime, docs-schema, core, CLI, docs site, workflow lint, platform-critical, and significant coverage groups passed.
    Scope: full local regression suite.

    Check: task_outcome
    Command: inspect final branch-worktree recovery assertions at implementation commit a607a05c6
    Result: pass
    Evidence: the real task-advance flow reopens premature DONE to DOING, preserves verification=ok, and marks the concrete WorkItem COMPLETED.
    Scope: required task outcome and acceptance criteria.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T14:03:19.538Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: implementation commit and passing checks are recorded, but WorkItem complete-done-workitem-recovery remains READY because result projection was interrupted. Recover the recorded state-bound result and complete the concrete WorkItem before pre-merge closure.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:d86fe5badfc0b0bdcc32808cd98561f91380bdb541bb70c91f41968cbca2f8e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202608290844-7JCQPF --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit fe58828d632a3d1779bc1ab1baa2526f048e087e --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-08-29T14:25:22.018Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:7d6d03fd6f12961c43c219b5624a03c723be689eff8372d1a628e761f20ac4e0

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T14:26:03.828Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: formal verification passed, but concrete WorkItem complete-done-workitem-recovery remains READY because the EXECUTOR result was not projected. Issue and consume a fresh state-bound implementation_rework result.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:d86fe5badfc0b0bdcc32808cd98561f91380bdb541bb70c91f41968cbca2f8e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

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

    ### 2026-08-29T14:36:21.259Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:97cae1acb40c59fc3e05138f63a13587eb8896c9da3bb3154c33cce6d9c4aef0

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
    - old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
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
    - Observation: The required WorkItem remains READY but WorkItemScheduler reports no schedulable item because every required_inputs label is absent from output manifests.
      Impact: External semantic result cannot be projected to the WorkItem, and task finish rejects required_work_item_incomplete.
      Resolution: Refine the current plan so the independent WorkItem has no produced-output dependencies; retain its required evidence as context and acceptance criteria.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: task-centric planning
      IncidentTags: work-item-inputs
      IncidentMatch: required_work_item_incomplete
extensions:
  agentplane.scope_extension_request:
    applied_at: "2026-08-29T13:33:20.461Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:40dcca04f7705db3f17f873f33dc33757401eaf76cc781d1afe4d12534e5282c"
    kind: "task_scope_extension_request"
    request:
      rationale: "The acceptance criterion requires a real task-advance regression. Reusing the existing interrupted branch-worktree fixture avoids duplicated setup and preserves the oversized-test budget."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
    request_digest: "sha256:d1b9c83a7ae6bd4b8386aefaee8e724c0b2d0aff61d0f1d28d87a4bb0e5a7744"
    schema_version: 1
    status: "applied"
    transition_id: "tr_985eb547237c6a67b3ea391f11d6c377"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T13:33:20.461Z"
        approved_by: "USER"
        approved_digest: "sha256:386ba86b2f651b6407366cfc278552cc6ba6b53666bc0dd5acd3540639c61a33"
        policy_facts:
          - "state_bound_scope_extension:sha256:d1b9c83a7ae6bd4b8386aefaee8e724c0b2d0aff61d0f1d28d87a4bb0e5a7744"
        state: "approved"
      created_at: "2026-08-29T13:33:20.461Z"
      digest: "sha256:386ba86b2f651b6407366cfc278552cc6ba6b53666bc0dd5acd3540639c61a33"
      proposal:
        assumptions:
          - "The authority and scope-extension implementation already evaluated as PASS remains valid."
          - "The missing real task-advance regression can be added within the existing four-file execution scope."
        planning_baseline:
          captured_at: "2026-08-29T12:15:59.263Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:9af630a5682dcde112c0d8f853a2e83724a49d7a5c6abdb098bbdaafc7eca5bd"
          dirty_paths:
            - ".agentplane/tasks/202608290844-7JCQPF/README.md"
            - ".agentplane/tasks/202608290844-7JCQPF/pr/github-body.md"
            - ".agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
            - ".agentplane/tasks/202608290844-7JCQPF/pr/review.md"
            - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
            - ".agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
            - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
          git:
            kind: "commit"
            ref: null
            sha: "fceb51632800e2d9b8d87cca8a8f2ff0dccb7b14"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:18"
        schema_version: 1
        task_id: "202608290844-7JCQPF"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
              id: "check-task-advance"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
              id: "check-scope-extension"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-diff"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-task-advance"
              description: "A real task advance flow accepts an implementation result bound to a concrete required WorkItem on a DONE task, reopens the task, completes the WorkItem, and proceeds to verification."
              id: "criterion-real-recovery"
              required: true
            -
              check_ids:
                - "check-task-advance"
              description: "Implementation rework remains allowed, ordinary task-level implementation without work_item_id remains rejected, and non-DONE tasks are not force-reopened."
              id: "criterion-authority-boundary"
              required: true
            -
              check_ids:
                - "check-scope-extension"
              description: "Task-level scope extension accepts zero schedulable items only when every required WorkItem is completed and remains fail-closed for effect-in-doubt or ambiguous unfinished work."
              id: "criterion-scope-recovery"
              required: true
            -
              check_ids:
                - "check-full"
              description: "The full local CI passes on the final candidate."
              id: "criterion-full"
              required: true
            -
              check_ids:
                - "check-diff"
              description: "The final patch contains no whitespace errors."
              id: "criterion-diff"
              required: true
          evidence_fingerprint: "sha256:9af630a5682dcde112c0d8f853a2e83724a49d7a5c6abdb098bbdaafc7eca5bd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-task-advance"
                  description: "A real task advance flow accepts an implementation result bound to a concrete required WorkItem on a DONE task, reopens the task, completes the WorkItem, and proceeds to verification."
                  id: "criterion-real-recovery"
                  required: true
                -
                  check_ids:
                    - "check-task-advance"
                  description: "Implementation rework remains allowed, ordinary task-level implementation without work_item_id remains rejected, and non-DONE tasks are not force-reopened."
                  id: "criterion-authority-boundary"
                  required: true
                -
                  check_ids:
                    - "check-scope-extension"
                  description: "Task-level scope extension accepts zero schedulable items only when every required WorkItem is completed and remains fail-closed for effect-in-doubt or ambiguous unfinished work."
                  id: "criterion-scope-recovery"
                  required: true
                -
                  check_ids:
                    - "check-full"
                  description: "The full local CI passes on the final candidate."
                  id: "criterion-full"
                  required: true
                -
                  check_ids:
                    - "check-diff"
                  description: "The final patch contains no whitespace errors."
                  id: "criterion-diff"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 98304
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                symbol_hints:
                  - "requiresImplementationReworkReopen"
                  - "applyExternalImplementationResult"
                  - "applyApprovedTaskScopeExtension"
                  - "extendTaskCentricWorkItemScope"
              depends_on: []
              expected_outputs:
                - "state-bound DONE reopen authority"
                - "real task-advance recovery regression"
                - "task-level scope-extension recovery"
                - "fresh verification evidence"
              id: "complete-done-workitem-recovery"
              objective: "Complete the state-bound DONE recovery by adding the missing real task-advance regression and retaining the already implemented authority and scope-extension behavior."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
                    id: "check-task-advance"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
                    id: "check-scope-extension"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-task-advance"
                    description: "A real task advance flow accepts an implementation result bound to a concrete required WorkItem on a DONE task, reopens the task, completes the WorkItem, and proceeds to verification."
                    id: "criterion-real-recovery"
                    required: true
                  -
                    check_ids:
                      - "check-task-advance"
                    description: "Implementation rework remains allowed, ordinary task-level implementation without work_item_id remains rejected, and non-DONE tasks are not force-reopened."
                    id: "criterion-authority-boundary"
                    required: true
                  -
                    check_ids:
                      - "check-scope-extension"
                    description: "Task-level scope extension accepts zero schedulable items only when every required WorkItem is completed and remains fail-closed for effect-in-doubt or ambiguous unfinished work."
                    id: "criterion-scope-recovery"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "The full local CI passes on the final candidate."
                    id: "criterion-full"
                    required: true
                  -
                    check_ids:
                      - "check-diff"
                    description: "The final patch contains no whitespace errors."
                    id: "criterion-diff"
                    required: true
                evidence_fingerprint: "sha256:9af630a5682dcde112c0d8f853a2e83724a49d7a5c6abdb098bbdaafc7eca5bd"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202608290844-7JCQPF"
    event_cursor: 1
    final_validation: null
    id: "202608290844-7JCQPF"
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
      captured_at: "2026-08-29T08:44:20.087Z"
      constraints: []
      request: |-
        Allow state-bound WorkItem implementation results to reopen DONE tasks

        Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.
      task_id: "202608290844-7JCQPF"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-29T08:47:49.584Z"
          approved_by: "USER"
          approved_digest: "sha256:ad7fc8b0f5b5a37ec286ed416fda46b8f0f575b76d33c3c49d1e3f2911b0e267"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-29T08:47:02.045Z"
        digest: "sha256:ad7fc8b0f5b5a37ec286ed416fda46b8f0f575b76d33c3c49d1e3f2911b0e267"
        proposal:
          assumptions:
            - "The hosted review finding is authoritative current evidence for the DONE WorkItem authority gap."
            - "Task-level rework scope extension must not synthesize or reopen a completed WorkItem."
          planning_baseline:
            captured_at: "2026-08-29T08:44:27.979Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:6d0a00a980d6dea3b0826ae8251e1f4fbdc43c0b757cd493445a9f8939757156"
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
              - ".agentplane/tasks/202608290844-7JCQPF/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608290844-7JCQPF"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
                id: "check-focused-authority"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
                id: "check-focused-scope"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "check-full"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "check-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "check-focused-authority"
                description: "DONE reopening is true for implementation_rework and for implementation with a concrete work_item_id, and false for ordinary implementation without a WorkItem or for non-DONE states."
                id: "criterion-reopen-authority"
                required: true
              -
                check_ids:
                  - "check-focused-scope"
                description: "A pending USER-approved task-level rework scope extension updates the execution contract without requiring a schedulable WorkItem, while a single schedulable WorkItem still receives the added roots and ambiguous multiple selections fail closed."
                id: "criterion-scope-extension"
                required: true
              -
                check_ids:
                  - "check-full"
                description: "The complete unchanged local CI suite passes on the final candidate."
                id: "criterion-full-regression"
                required: true
              -
                check_ids:
                  - "check-diff"
                description: "The final patch has no whitespace errors."
                id: "criterion-diff"
                required: true
            evidence_fingerprint: "sha256:bb6e560e334466bc810131a6c7786a7954743f4d2a66e8b154c7899a91e309a8"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "check-focused-authority"
                    description: "DONE reopening is true for implementation_rework and for implementation with a concrete work_item_id, and false for ordinary implementation without a WorkItem or for non-DONE states."
                    id: "criterion-reopen-authority"
                    required: true
                  -
                    check_ids:
                      - "check-focused-scope"
                    description: "A pending USER-approved task-level rework scope extension updates the execution contract without requiring a schedulable WorkItem, while a single schedulable WorkItem still receives the added roots and ambiguous multiple selections fail closed."
                    id: "criterion-scope-extension"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "The complete unchanged local CI suite passes on the final candidate."
                    id: "criterion-full-regression"
                    required: true
                  -
                    check_ids:
                      - "check-diff"
                    description: "The final patch has no whitespace errors."
                    id: "criterion-diff"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 65536
                  optional_sources:
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                    - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  symbol_hints:
                    - "requiresImplementationReworkReopen"
                    - "applyApprovedTaskScopeExtension"
                    - "extendTaskCentricWorkItemScope"
                depends_on: []
                expected_outputs:
                  - "state-bound DONE reopen authority"
                  - "task-level scope-extension recovery"
                  - "regression evidence"
                id: "restore-done-workitem-recovery"
                objective: "Authorize DONE to DOING only for implementation_rework or a purpose=implementation work order bound to a concrete WorkItem, and allow the approved task-level scope-extension recovery to proceed without inventing a schedulable WorkItem."
                optional: false
                priority: 100
                required_inputs:
                  - "PR #5870 unresolved review thread"
                  - "current external-agent implementation authority"
                  - "current task scope-extension contract"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
                      id: "check-focused-authority"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
                      id: "check-focused-scope"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "check-full"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "check-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "check-focused-authority"
                      description: "DONE reopening is true for implementation_rework and for implementation with a concrete work_item_id, and false for ordinary implementation without a WorkItem or for non-DONE states."
                      id: "criterion-reopen-authority"
                      required: true
                    -
                      check_ids:
                        - "check-focused-scope"
                      description: "A pending USER-approved task-level rework scope extension updates the execution contract without requiring a schedulable WorkItem, while a single schedulable WorkItem still receives the added roots and ambiguous multiple selections fail closed."
                      id: "criterion-scope-extension"
                      required: true
                    -
                      check_ids:
                        - "check-full"
                      description: "The complete unchanged local CI suite passes on the final candidate."
                      id: "criterion-full-regression"
                      required: true
                    -
                      check_ids:
                        - "check-diff"
                      description: "The final patch has no whitespace errors."
                      id: "criterion-diff"
                      required: true
                  evidence_fingerprint: "sha256:bb6e560e334466bc810131a6c7786a7954743f4d2a66e8b154c7899a91e309a8"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608290844-7JCQPF"
      -
        approval:
          approved_at: "2026-08-29T12:19:19.387Z"
          approved_by: "USER"
          approved_digest: "sha256:deff35dade5353d3416aab0b0699aa1a7b4336e9931408be56abb73ea7b4445d"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-29T12:19:04.517Z"
        digest: "sha256:deff35dade5353d3416aab0b0699aa1a7b4336e9931408be56abb73ea7b4445d"
        proposal:
          assumptions:
            - "The authority and scope-extension implementation already evaluated as PASS remains valid."
            - "The missing real task-advance regression can be added within the existing four-file execution scope."
          planning_baseline:
            captured_at: "2026-08-29T12:15:59.263Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:9af630a5682dcde112c0d8f853a2e83724a49d7a5c6abdb098bbdaafc7eca5bd"
            dirty_paths:
              - ".agentplane/tasks/202608290844-7JCQPF/README.md"
              - ".agentplane/tasks/202608290844-7JCQPF/pr/github-body.md"
              - ".agentplane/tasks/202608290844-7JCQPF/pr/meta.json"
              - ".agentplane/tasks/202608290844-7JCQPF/pr/review.md"
              - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
              - ".agentplane/tasks/202608290844-7JCQPF/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829121518627-935aca8b41573d83.json"
            git:
              kind: "commit"
              ref: null
              sha: "fceb51632800e2d9b8d87cca8a8f2ff0dccb7b14"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:18"
          schema_version: 1
          task_id: "202608290844-7JCQPF"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
                id: "check-task-advance"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
                id: "check-scope-extension"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "check-full"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "check-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "check-task-advance"
                description: "A real task advance flow accepts an implementation result bound to a concrete required WorkItem on a DONE task, reopens the task, completes the WorkItem, and proceeds to verification."
                id: "criterion-real-recovery"
                required: true
              -
                check_ids:
                  - "check-task-advance"
                description: "Implementation rework remains allowed, ordinary task-level implementation without work_item_id remains rejected, and non-DONE tasks are not force-reopened."
                id: "criterion-authority-boundary"
                required: true
              -
                check_ids:
                  - "check-scope-extension"
                description: "Task-level scope extension accepts zero schedulable items only when every required WorkItem is completed and remains fail-closed for effect-in-doubt or ambiguous unfinished work."
                id: "criterion-scope-recovery"
                required: true
              -
                check_ids:
                  - "check-full"
                description: "The full local CI passes on the final candidate."
                id: "criterion-full"
                required: true
              -
                check_ids:
                  - "check-diff"
                description: "The final patch contains no whitespace errors."
                id: "criterion-diff"
                required: true
            evidence_fingerprint: "sha256:9af630a5682dcde112c0d8f853a2e83724a49d7a5c6abdb098bbdaafc7eca5bd"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "check-task-advance"
                    description: "A real task advance flow accepts an implementation result bound to a concrete required WorkItem on a DONE task, reopens the task, completes the WorkItem, and proceeds to verification."
                    id: "criterion-real-recovery"
                    required: true
                  -
                    check_ids:
                      - "check-task-advance"
                    description: "Implementation rework remains allowed, ordinary task-level implementation without work_item_id remains rejected, and non-DONE tasks are not force-reopened."
                    id: "criterion-authority-boundary"
                    required: true
                  -
                    check_ids:
                      - "check-scope-extension"
                    description: "Task-level scope extension accepts zero schedulable items only when every required WorkItem is completed and remains fail-closed for effect-in-doubt or ambiguous unfinished work."
                    id: "criterion-scope-recovery"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "The full local CI passes on the final candidate."
                    id: "criterion-full"
                    required: true
                  -
                    check_ids:
                      - "check-diff"
                    description: "The final patch contains no whitespace errors."
                    id: "criterion-diff"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 98304
                  optional_sources:
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
                  required_sources:
                    - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                    - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                    - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                    - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                  symbol_hints:
                    - "requiresImplementationReworkReopen"
                    - "applyExternalImplementationResult"
                    - "applyApprovedTaskScopeExtension"
                    - "extendTaskCentricWorkItemScope"
                depends_on: []
                expected_outputs:
                  - "state-bound DONE reopen authority"
                  - "real task-advance recovery regression"
                  - "task-level scope-extension recovery"
                  - "fresh verification evidence"
                id: "complete-done-workitem-recovery"
                objective: "Complete the state-bound DONE recovery by adding the missing real task-advance regression and retaining the already implemented authority and scope-extension behavior."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
                      id: "check-task-advance"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
                      id: "check-scope-extension"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "check-full"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "check-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "check-task-advance"
                      description: "A real task advance flow accepts an implementation result bound to a concrete required WorkItem on a DONE task, reopens the task, completes the WorkItem, and proceeds to verification."
                      id: "criterion-real-recovery"
                      required: true
                    -
                      check_ids:
                        - "check-task-advance"
                      description: "Implementation rework remains allowed, ordinary task-level implementation without work_item_id remains rejected, and non-DONE tasks are not force-reopened."
                      id: "criterion-authority-boundary"
                      required: true
                    -
                      check_ids:
                        - "check-scope-extension"
                      description: "Task-level scope extension accepts zero schedulable items only when every required WorkItem is completed and remains fail-closed for effect-in-doubt or ambiguous unfinished work."
                      id: "criterion-scope-recovery"
                      required: true
                    -
                      check_ids:
                        - "check-full"
                      description: "The full local CI passes on the final candidate."
                      id: "criterion-full"
                      required: true
                    -
                      check_ids:
                        - "check-diff"
                      description: "The final patch contains no whitespace errors."
                      id: "criterion-diff"
                      required: true
                  evidence_fingerprint: "sha256:9af630a5682dcde112c0d8f853a2e83724a49d7a5c6abdb098bbdaafc7eca5bd"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202608290844-7JCQPF"
    revision: 40
    schema_version: 1
    updated_at: "2026-08-29T14:36:28.318Z"
    work_items:
      complete-done-workitem-recovery:
        attempt: 1
        claim_id: null
        id: "complete-done-workitem-recovery"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a32482e3be4d5430160012aeee31c20589e89ef48041d2a36755c08019189341"
            id: "state-bound DONE reopen authority"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202608290844-7JCQPF"
              work_item_id: "complete-done-workitem-recovery"
            provenance:
              - "sha256:b930ba0fcbf34138b9a9416ce70843c79d727e47591a67a39471133ddff5389d"
              - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:c5a31ad05a3ea81c21987d3f325ea4e81199035dd5d6f723fbb1372e49e8fa6d"
            id: "real task-advance recovery regression"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202608290844-7JCQPF"
              work_item_id: "complete-done-workitem-recovery"
            provenance:
              - "sha256:b930ba0fcbf34138b9a9416ce70843c79d727e47591a67a39471133ddff5389d"
              - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:c4ba5c5bdbcc710f92e78f21e7c5ac2308676aa9b48dfe962664c6fe254eba42"
            id: "task-level scope-extension recovery"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202608290844-7JCQPF"
              work_item_id: "complete-done-workitem-recovery"
            provenance:
              - "sha256:b930ba0fcbf34138b9a9416ce70843c79d727e47591a67a39471133ddff5389d"
              - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:3814d0656ae102baada785989119d1d9d486266d9a5f7588233ecfa56ba10efa"
            id: "fresh verification evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202608290844-7JCQPF"
              work_item_id: "complete-done-workitem-recovery"
            provenance:
              - "sha256:b930ba0fcbf34138b9a9416ce70843c79d727e47591a67a39471133ddff5389d"
              - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
              check_id: "check-task-advance"
              command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
              detail: "Observed by node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-08-29T14:36:28.311Z"
              repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
              check_id: "check-scope-extension"
              command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
              detail: "Observed by node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-08-29T14:36:28.311Z"
              repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
              check_id: "check-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-29T14:36:28.311Z"
              repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json"
              check_id: "check-diff"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-29T14:36:28.311Z"
              repository_snapshot_digest: "sha256:5b17ae336361a68989d4dd3db6dcd45a4072c743deb595a774604cd66c5dae76"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608290844-7JCQPF-executor-c1ed987383da92bf2fbe47e0:
        aggregate_digest: "sha256:a9792b301b3f6cdaf6e15f5debc17da527295c1ed3406f1ec707b5e455954ba8"
        event:
          actor_id: "agentplane"
          at: "2026-08-29T14:36:28.318Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_1e91bddd5612fc35fa05dfe5"
          mutation_id: "external-result:work-order-202608290844-7JCQPF-executor-c1ed987383da92bf2fbe47e0"
          plan_digest: "sha256:386ba86b2f651b6407366cfc278552cc6ba6b53666bc0dd5acd3540639c61a33"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608290844-7JCQPF"
          task_revision: 39
          to: "COMPLETED"
          work_item_id: "complete-done-workitem-recovery"
        mutation_id: "external-result:work-order-202608290844-7JCQPF-executor-c1ed987383da92bf2fbe47e0"
        next_revision: 40
        previous_revision: 39
        schema_version: 1
        task_id: "202608290844-7JCQPF"
      plan-refinement:work-order-202608290844-7JCQPF-executor-2ea942fb3e82d61103b568b7:
        aggregate_digest: "sha256:cc8c607ed33ce2e02757e7d2c53b41002097b0896c1afccfedfc97e95f36f282"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-29T12:15:55.036Z"
          cause_refs:
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_2ecae025718747fcfae4da8c"
          mutation_id: "plan-refinement:work-order-202608290844-7JCQPF-executor-2ea942fb3e82d61103b568b7"
          plan_digest: "sha256:ad7fc8b0f5b5a37ec286ed416fda46b8f0f575b76d33c3c49d1e3f2911b0e267"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608290844-7JCQPF"
          task_revision: 17
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608290844-7JCQPF-executor-2ea942fb3e82d61103b568b7"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202608290844-7JCQPF"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "a607a05c6e11b9be9f6084d2f800f798f7dc2628"
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    version: 1
id_source: "generated"
---
## Summary

Allow state-bound WorkItem implementation results to reopen DONE tasks

Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.

## Scope

- In scope: Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.
- Out of scope: unrelated refactors not required for "Allow state-bound WorkItem implementation results to reopen DONE tasks".

## Plan

Prepared a one-WorkItem recovery plan with no narrative required_inputs and an explicit real task-advance regression.

## Verify Steps

PLANNER fallback scaffold for "Allow state-bound WorkItem implementation results to reopen DONE tasks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow state-bound WorkItem implementation results to reopen DONE tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-29T09:00:48.568Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:3c2327767f97993ec8bd9e27de0f7762a5bbabeeeb4edb61781f6fd40cb2af02

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

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

### 2026-08-29T09:14:31.764Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:838f27720a4a7578e2ad6118ebd2e245234577163c5387e9c36dab269f66b848

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

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

### 2026-08-29T09:18:15.695Z — VERIFY — needs_rework

By: REVIEWER

Note: Task-centric completion is blocked because the approved WorkItem required_inputs are narrative evidence labels rather than produced output IDs; refine the plan before pre-merge closure.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:c4c4ecc294526dbc1efeebfc92b97f75b181b9bf8b527940d4e489a39f983256

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202608290844-7JCQPF --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit b8ec469a7231ede40943b84c4bbe5193153efeac --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-08-29T12:15:18.627Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:37e69e4eacce6edcb3f1fd66d8efdf2a1b514844a605c30accc7c44f07cb97b6

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T13:31:55.703Z — VERIFY — needs_rework

By: TESTER

Note: Rework: the real task-advance DONE recovery regression is absent from the committed candidate, and full local CI cannot pass because the proposed test location exceeds the oversized-test baseline. Move the regression into the existing branch-worktree integration fixture without a baseline exception.
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:c4c4ecc294526dbc1efeebfc92b97f75b181b9bf8b527940d4e489a39f983256

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T13:57:23.903Z — VERIFY — ok

By: TESTER

Note: Verified at implementation commit a607a05c6 with focused and full local evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:0db0dac6afc7a80d68ca15b8ad210455a9591bbb43c7e2bf5229d0dcece06242

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts -t recovers-an-implementation-interrupted
Result: pass
Evidence: 2 matching parameterized recovery cases passed.
Scope: interrupted verification and WorkItem projection recovery, including premature DONE replay.

Check: critical_paths
Command: bun run hotspots:check && git diff --check
Result: pass
Evidence: runtime hotspot threshold, oversized-test baseline, and whitespace checks passed; branch-worktree test is 905 lines.
Scope: state-bound authority and repository size and diff guards.

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: full-fast runtime, docs-schema, core, CLI, docs site, workflow lint, platform-critical, and significant coverage groups passed.
Scope: full local regression suite.

Check: task_outcome
Command: inspect final branch-worktree recovery assertions at implementation commit a607a05c6
Result: pass
Evidence: the real task-advance flow reopens premature DONE to DOING, preserves verification=ok, and marks the concrete WorkItem COMPLETED.
Scope: required task outcome and acceptance criteria.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T14:03:19.538Z — VERIFY — needs_rework

By: TESTER

Note: Rework: implementation commit and passing checks are recorded, but WorkItem complete-done-workitem-recovery remains READY because result projection was interrupted. Recover the recorded state-bound result and complete the concrete WorkItem before pre-merge closure.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:d86fe5badfc0b0bdcc32808cd98561f91380bdb541bb70c91f41968cbca2f8e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202608290844-7JCQPF --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit fe58828d632a3d1779bc1ab1baa2526f048e087e --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-08-29T14:25:22.018Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:7d6d03fd6f12961c43c219b5624a03c723be689eff8372d1a628e761f20ac4e0

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T14:26:03.828Z — VERIFY — needs_rework

By: TESTER

Note: Rework: formal verification passed, but concrete WorkItem complete-done-workitem-recovery remains READY because the EXECUTOR result was not projected. Issue and consume a fresh state-bound implementation_rework result.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:d86fe5badfc0b0bdcc32808cd98561f91380bdb541bb70c91f41968cbca2f8e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

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

### 2026-08-29T14:36:21.259Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:97cae1acb40c59fc3e05138f63a13587eb8896c9da3bb3154c33cce6d9c4aef0

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202608290844-7JCQPF/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608290844-7JCQPF Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608290844-7JCQPF-allow-state-bound-workitem-implementation-result/.agentplane/tasks/202608290844-7JCQPF/blueprint/resolved-snapshot.json
- old_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- current_digest: 1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608290844-7JCQPF

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608290844-7JCQPF
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

- Observation: The required WorkItem remains READY but WorkItemScheduler reports no schedulable item because every required_inputs label is absent from output manifests.
  Impact: External semantic result cannot be projected to the WorkItem, and task finish rejects required_work_item_incomplete.
  Resolution: Refine the current plan so the independent WorkItem has no produced-output dependencies; retain its required evidence as context and acceptance criteria.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: task-centric planning
  IncidentTags: work-item-inputs
  IncidentMatch: required_work_item_incomplete
