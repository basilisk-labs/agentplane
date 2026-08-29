---
id: "202608290844-7JCQPF"
title: "Allow state-bound WorkItem implementation results to reopen DONE tasks"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 49
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
  updated_at: "2026-08-29T14:51:24.375Z"
  updated_by: "TESTER"
  note: "Verified current head db3a023e6; its delta from the fully tested close commit is limited to framework-owned task evidence artifacts."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-29T15:46:23.204Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "019b64e46502d17f73e177d1ddca9d9d280487b0"
  blueprint_digest: "1bb097fc1b123cf9b94f10d140a5799db5354fc6a23efe5943d948dcf1c09584"
  evidence_refs:
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/8a9ba323a4f7313e683932e5a199789ec48f072e7b92129fab34109e8df996f6.md"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/20260829-154622554-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608290844-7JCQPF/README.md"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/2258e008d9ba7a086ad71c563a02b042962c03b0c5c940f4ea42f62bbb0eb012.patch"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/e36dbbcacb05dd26f53c2a444202d9451db4063b531311834485b11970ed6072.json"
    - ".agentplane/tasks/202608290844-7JCQPF/verification/20260829145124375-d0d20769bc9e2777.json"
    - ".agentplane/tasks/202608290844-7JCQPF/quality/objects/sha256/bf246ecc6aed6a80440a3a0197ee6a33faa53b12ac072fd16ecde736ee4d7a69.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The authorization predicate is fail-closed for non-DONE tasks and for ordinary implementation without a concrete work_item_id."
    - "The real task-advance regression exercises the interrupted WorkItem projection path, seeds premature DONE, resumes the exact result, and proves DOING plus COMPLETED projection."
    - "The scope-extension adjustment only bypasses scheduler selection when every required WorkItem is already COMPLETED; unfinished unschedulable states still fail closed."
token_usage:
  agent_runs: 18
  input_tokens: null
  journal_digest: "sha256:3aa6c5c3da652dae883bf111dbb87c428d382902600ed1757f2f13ecc4aeed04"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-29T15:47:33.231Z"
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
      - "repository_effect:documentation"
      - "verification:verification-record:fail"
      - "writable_scope:.agentplane/policy/incidents.md"
      - "writable_scope:packages/agentplane/assets/policy/incidents.md"
    changed_components:
      - ".agentplane"
      - "packages/agentplane"
    changed_paths:
      - ".agentplane/policy/incidents.md"
      - "packages/agentplane/assets/policy/incidents.md"
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
    - "observed_path_outside_scope:.agentplane/policy/incidents.md"
    - "observed_path_outside_scope:packages/agentplane/assets/policy/incidents.md"
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
          - "repository_effect:documentation"
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
      digest: "sha256:c7fb6e4e4cc1017cce72e86a88505d3794d8170fa476876fffea33ddd1120561"
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
          - ".agentplane"
          - "packages/agentplane"
        changed_files:
          - ".agentplane/policy/incidents.md"
          - "packages/agentplane/assets/policy/incidents.md"
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:verification-record"
commit:
  hash: "c75df360718b4012e3a3defec60196d46822ca88"
  message: "🚧 7JCQPF task: record current evaluator result"
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
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The uncommitted task-worktree paths are intentional framework-owned artifacts created by the fresh passing verification and PR metadata refresh. No unrelated or ambiguous source edits are present."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The five dirty quality paths are incomplete generated artifacts from the evaluator packet that AgentPlane retired as stale; they are unintended and must not be committed."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The dirty quality paths are incomplete generated artifacts from retired evaluator packets; they are unintended and must not be committed."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
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
  -
    type: "status"
    at: "2026-08-29T14:37:49.085Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "94b57b253f6a8189288089d80906b0489ae40106"
  -
    type: "verify"
    at: "2026-08-29T14:47:25.405Z"
    author: "TESTER"
    state: "ok"
    note: "Verified the current close commit after framework-owned incident promotion."
  -
    type: "comment"
    at: "2026-08-29T14:48:50.134Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The uncommitted task-worktree paths are intentional framework-owned artifacts created by the fresh passing verification and PR metadata refresh. No unrelated or ambiguous source edits are present."
  -
    type: "verify"
    at: "2026-08-29T14:51:24.375Z"
    author: "TESTER"
    state: "ok"
    note: "Verified current head db3a023e6; its delta from the fully tested close commit is limited to framework-owned task evidence artifacts."
  -
    type: "comment"
    at: "2026-08-29T15:42:39.259Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The five dirty quality paths are incomplete generated artifacts from the evaluator packet that AgentPlane retired as stale; they are unintended and must not be committed."
  -
    type: "comment"
    at: "2026-08-29T15:44:28.812Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The dirty quality paths are incomplete generated artifacts from retired evaluator packets; they are unintended and must not be committed."
  -
    type: "status"
    at: "2026-08-29T15:47:33.231Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "c75df360718b4012e3a3defec60196d46822ca88"
doc_version: 3
doc_updated_at: "2026-08-29T15:47:33.262Z"
doc_updated_by: "CODER"
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

    ### 2026-08-29T14:47:25.405Z — VERIFY — ok

    By: TESTER

    Note: Verified the current close commit after framework-owned incident promotion.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:ecc6f605ce045ce5d52f5a7a6bca57dfbcfa775e55e20b8061b5bfce301ae456

    Details:

    Check: affected_unit_integration
    Command: bun vitest run packages/agentplane/src/commands/task/external-agent-effect-recovery.test.ts packages/agentplane/src/commands/task/task-scope-extension-request.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts -t "before WorkItem projection|state-bound|scope extension"
    Result: pass
    Evidence: focused task-advance and recovery regressions passed against 019b64e46502d17f73e177d1ddca9d9d280487b0.
    Scope: DONE-task reopening, WorkItem result projection, and fail-closed scope extension.

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs && bun run hotspots:check && git diff --check main...HEAD
    Result: pass
    Evidence: policy routing, hotspot baseline, and diff integrity passed.
    Scope: framework policy, size budgets, and changed-tree hygiene.

    Check: docs_contract
    Command: bun run ci:local:full docs-schema and website build groups
    Result: pass
    Evidence: schemas, agent templates, policy routing, generated CLI reference, recipes inventory, README generation, navigation check, static website build, and DESIGN.md compliance passed.
    Scope: generated documentation and policy contract integrity.

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: exit 0; 758 routed tests, 98 Windows platform-critical tests, 101 significant-coverage tests, workflow lint, and coverage threshold passed under Node 26.
    Scope: full local release-equivalent regression suite.

    Check: task_outcome
    Command: inspect task README aggregate and real task advance replay
    Result: pass
    Evidence: state-bound complete-done-workitem-recovery is COMPLETED; replay reopens DONE to DOING and projects the WorkItem result exactly once.
    Scope: accepted bootstrap behavior and persisted semantic evidence.

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T14:51:24.375Z — VERIFY — ok

    By: TESTER

    Note: Verified current head db3a023e6; its delta from the fully tested close commit is limited to framework-owned task evidence artifacts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:a2e51a2314687eb1e5cc91ceb6f7fd7f644097155573b528bf5ee210cbd6e8c7

    Details:

    Check: affected_unit_integration
    Command: bun vitest run packages/agentplane/src/commands/task/external-agent-effect-recovery.test.ts packages/agentplane/src/commands/task/task-scope-extension-request.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts -t "before WorkItem projection|state-bound|scope extension"
    Result: pass
    Evidence: focused task-advance and recovery regressions passed on implementation commit; git diff 019b64e46502..db3a023e6 contains only framework-owned .agentplane task evidence artifacts.
    Scope: DONE-task reopening, WorkItem result projection, and fail-closed scope extension.

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs && bun run hotspots:check && git diff --check main...HEAD
    Result: pass
    Evidence: policy routing, hotspot baseline, and diff integrity passed; current-head delta is task evidence only.
    Scope: framework policy, size budgets, and changed-tree hygiene.

    Check: docs_contract
    Command: bun run ci:local:full docs-schema and website build groups
    Result: pass
    Evidence: schemas, agent templates, policy routing, generated CLI reference, recipes inventory, README generation, navigation check, static website build, and DESIGN.md compliance passed at 019b64e46502; db3a023e6 changes only task evidence artifacts.
    Scope: generated documentation and policy contract integrity.

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: exit 0 at 019b64e46502; 758 routed tests, 98 Windows platform-critical tests, 101 significant-coverage tests, workflow lint, and coverage threshold passed under Node 26. Current db3a023e6 has an implementation-equivalent source tree; its only delta is framework-owned task evidence.
    Scope: full local release-equivalent regression suite.

    Check: task_outcome
    Command: inspect task README aggregate, real task advance replay, and git diff 019b64e46502..db3a023e6
    Result: pass
    Evidence: complete-done-workitem-recovery is COMPLETED; replay reopens DONE to DOING and projects the WorkItem result exactly once; current-head delta is task evidence only.
    Scope: accepted bootstrap behavior and persisted semantic evidence.

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
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608290844-7JCQPF"
            - "git:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
          check_id: "check-task-advance"
          command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts --pool=forks --maxWorkers=1"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-29T14:36:21.259Z"
          repository_snapshot_digest: "sha256:4d6666ff0da8c86a15cf47015aeaa84256b0b2959d2a076e442dfc8f0a0dd062"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608290844-7JCQPF"
            - "git:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
          check_id: "check-scope-extension"
          command_identity: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/scope-extend.test.ts --pool=forks --maxWorkers=1"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-29T14:36:21.259Z"
          repository_snapshot_digest: "sha256:4d6666ff0da8c86a15cf47015aeaa84256b0b2959d2a076e442dfc8f0a0dd062"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608290844-7JCQPF"
            - "git:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
          check_id: "check-full"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-29T14:36:21.259Z"
          repository_snapshot_digest: "sha256:4d6666ff0da8c86a15cf47015aeaa84256b0b2959d2a076e442dfc8f0a0dd062"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608290844-7JCQPF"
            - "git:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
          check_id: "check-diff"
          command_identity: "git diff --check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-29T14:36:21.259Z"
          repository_snapshot_digest: "sha256:4d6666ff0da8c86a15cf47015aeaa84256b0b2959d2a076e442dfc8f0a0dd062"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
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
    lifecycle: "COMPLETED"
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
    revision: 42
    schema_version: 1
    updated_at: "2026-08-29T14:37:49.085Z"
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
      legacy-finish:202608290844-7JCQPF:2026-08-29T14:36:21.259Z:a607a05c6e11b9be9f6084d2f800f798f7dc2628:
        aggregate_digest: "sha256:e64a090621ae30fa98a40bab7e9f58a0886995ee9b03acfe95b9723adcc401d0"
        event:
          actor_id: "CODER"
          at: "2026-08-29T14:37:49.085Z"
          cause_refs:
            - "task-verification:202608290844-7JCQPF"
            - "git:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
          entity: "task"
          from: "ACTIVE"
          id: "event_9e91db32e0f598e0f161cdaf"
          mutation_id: "legacy-finish:202608290844-7JCQPF:2026-08-29T14:36:21.259Z:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
          plan_digest: "sha256:386ba86b2f651b6407366cfc278552cc6ba6b53666bc0dd5acd3540639c61a33"
          plan_revision: 3
          repository_fingerprint: "sha256:4d6666ff0da8c86a15cf47015aeaa84256b0b2959d2a076e442dfc8f0a0dd062"
          schema_version: 1
          task_id: "202608290844-7JCQPF"
          task_revision: 40
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608290844-7JCQPF:2026-08-29T14:36:21.259Z:a607a05c6e11b9be9f6084d2f800f798f7dc2628"
        next_revision: 42
        previous_revision: 41
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
    hash: "019b64e46502d17f73e177d1ddca9d9d280487b0"
    message: "🚧 7JCQPF task: pre-merge closure"
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

### 2026-08-29T14:47:25.405Z — VERIFY — ok

By: TESTER

Note: Verified the current close commit after framework-owned incident promotion.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:ecc6f605ce045ce5d52f5a7a6bca57dfbcfa775e55e20b8061b5bfce301ae456

Details:

Check: affected_unit_integration
Command: bun vitest run packages/agentplane/src/commands/task/external-agent-effect-recovery.test.ts packages/agentplane/src/commands/task/task-scope-extension-request.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts -t "before WorkItem projection|state-bound|scope extension"
Result: pass
Evidence: focused task-advance and recovery regressions passed against 019b64e46502d17f73e177d1ddca9d9d280487b0.
Scope: DONE-task reopening, WorkItem result projection, and fail-closed scope extension.

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs && bun run hotspots:check && git diff --check main...HEAD
Result: pass
Evidence: policy routing, hotspot baseline, and diff integrity passed.
Scope: framework policy, size budgets, and changed-tree hygiene.

Check: docs_contract
Command: bun run ci:local:full docs-schema and website build groups
Result: pass
Evidence: schemas, agent templates, policy routing, generated CLI reference, recipes inventory, README generation, navigation check, static website build, and DESIGN.md compliance passed.
Scope: generated documentation and policy contract integrity.

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: exit 0; 758 routed tests, 98 Windows platform-critical tests, 101 significant-coverage tests, workflow lint, and coverage threshold passed under Node 26.
Scope: full local release-equivalent regression suite.

Check: task_outcome
Command: inspect task README aggregate and real task advance replay
Result: pass
Evidence: state-bound complete-done-workitem-recovery is COMPLETED; replay reopens DONE to DOING and projects the WorkItem result exactly once.
Scope: accepted bootstrap behavior and persisted semantic evidence.

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T14:51:24.375Z — VERIFY — ok

By: TESTER

Note: Verified current head db3a023e6; its delta from the fully tested close commit is limited to framework-owned task evidence artifacts.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:74bc71d1fb6ca09710b85ab633754729be01c4b436816a1ddd37c7ed405007b5, input_digest=sha256:a2e51a2314687eb1e5cc91ceb6f7fd7f644097155573b528bf5ee210cbd6e8c7

Details:

Check: affected_unit_integration
Command: bun vitest run packages/agentplane/src/commands/task/external-agent-effect-recovery.test.ts packages/agentplane/src/commands/task/task-scope-extension-request.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts -t "before WorkItem projection|state-bound|scope extension"
Result: pass
Evidence: focused task-advance and recovery regressions passed on implementation commit; git diff 019b64e46502..db3a023e6 contains only framework-owned .agentplane task evidence artifacts.
Scope: DONE-task reopening, WorkItem result projection, and fail-closed scope extension.

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs && bun run hotspots:check && git diff --check main...HEAD
Result: pass
Evidence: policy routing, hotspot baseline, and diff integrity passed; current-head delta is task evidence only.
Scope: framework policy, size budgets, and changed-tree hygiene.

Check: docs_contract
Command: bun run ci:local:full docs-schema and website build groups
Result: pass
Evidence: schemas, agent templates, policy routing, generated CLI reference, recipes inventory, README generation, navigation check, static website build, and DESIGN.md compliance passed at 019b64e46502; db3a023e6 changes only task evidence artifacts.
Scope: generated documentation and policy contract integrity.

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: exit 0 at 019b64e46502; 758 routed tests, 98 Windows platform-critical tests, 101 significant-coverage tests, workflow lint, and coverage threshold passed under Node 26. Current db3a023e6 has an implementation-equivalent source tree; its only delta is framework-owned task evidence.
Scope: full local release-equivalent regression suite.

Check: task_outcome
Command: inspect task README aggregate, real task advance replay, and git diff 019b64e46502..db3a023e6
Result: pass
Evidence: complete-done-workitem-recovery is COMPLETED; replay reopens DONE to DOING and projects the WorkItem result exactly once; current-head delta is task evidence only.
Scope: accepted bootstrap behavior and persisted semantic evidence.

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

- Observation: The required WorkItem remains READY but WorkItemScheduler reports no schedulable item because every required_inputs label is absent from output manifests.
  Impact: External semantic result cannot be projected to the WorkItem, and task finish rejects required_work_item_incomplete.
  Resolution: Refine the current plan so the independent WorkItem has no produced-output dependencies; retain its required evidence as context and acceptance criteria.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: task-centric planning
  IncidentTags: work-item-inputs
  IncidentMatch: required_work_item_incomplete

## Token Usage

- State: `unavailable`
- Completeness: `0/18` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:3aa6c5c3da652dae883bf111dbb87c428d382902600ed1757f2f13ecc4aeed04`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-29T15:47:33.231Z`
