---
id: "202608272129-DVS5NN"
title: "Resolve protected integration handoffs from their owning checkout"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on:
  - "202608271649-DVNTRR"
tags:
  - "code"
  - "release-blocker"
  - "tests"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T21:37:08.002Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-27T22:49:32.357Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-27T22:56:49.292Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 6 typed finding(s)."
  evaluated_sha: "db40fc44542cedbf516d4fef901c76bb73fe7aec"
  blueprint_digest: "44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff"
  evidence_refs:
    - ".agentplane/tasks/202608272129-DVS5NN/quality/20260827-225029023-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/20260827-225029023-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/objects/sha256/66a0366e792c3c6f6412ab377fcfa5914c42c4c07faca68fb77c91f775308bcc.md"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/20260827-225029023-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/20260827-225029023-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/20260827-225029023-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608272129-DVS5NN/README.md"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/objects/sha256/c02e0755b019de4aa5dfb3a951ef88f662edaf0f9406228ecfcf7796b35e8926.patch"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/objects/sha256/24696939fbf64f33a360d05c5a93a4c555f4169c949953f59adbcff6f1556733.json"
    - ".agentplane/tasks/202608272129-DVS5NN/verification/20260827224932357-3d64c0ebc10dc61a.json"
    - ".agentplane/tasks/202608272129-DVS5NN/verification/20260827224932357-cea901acbe17c16f.json"
    - ".agentplane/tasks/202608272129-DVS5NN/quality/objects/sha256/276a5a3781c8fb8f8f6ee4d1e55952ab9fb07d70cc7bb3c390863a14fc413a4a.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Reviewed source remains the same seven-file diff c02e0755b019de4aa5dfb3a951ef88f662edaf0f9406228ecfcf7796b35e8926. The reader resolves the registered base owner without copying artifacts, validates protected identity, rejects malformed and conflicting copies, and preserves direct and ordinary local handoffs. Downstream PR/head/base/adoption-token and queue authority guards are unchanged."
    - "The real-Git regression covers repeated show/resume from both checkouts without changing heads, status or artifact bytes. The existing explicit legacy adoption test covers the following transition. All 83 focused tests passed; no new skip or timeout relaxation was introduced."
    - "The prior documentation findings are resolved: Verify Steps names the exact focused scenario and mandatory full CI, while Findings records the proved cause, evidence and two separate residual causes. All ten frozen evidence hashes match. The fresh supervisor verification record cea901acbe17c16f binds successful full checks to current db40fc44542cedbf516d4fef901c76bb73fe7aec and updated Verify Steps."
    - "The observed-checks object retains earlier successful check tails under the existing stable-check identity behavior. Review uses the fresh supervisor verification record and the observed completed full run, not old tail timings as a new execution timestamp."
    - "Residual risk: The incident verification-target mismatch and provider-neutral error wording remain separate follow-up causes, not covered or altered by this patch."
    - "Residual risk: Local full CI is not final release prepublish qualification."
token_usage:
  agent_runs: 6
  input_tokens: null
  journal_digest: "sha256:9bda54f4e0c028ef835a4e95997c3dde17f0e3c886668c0d73069f6c9f205a5b"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-27T22:56:59.011Z"
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
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
      - "packages/agentplane/src/commands/task/handoff-show.command.ts"
      - "packages/agentplane/src/commands/task/handoff.shared.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "All external actions and formal lifecycle transitions remain owned by AgentPlane."
      - "Repair a reproduced integration-route regression with isolated read-only ownership resolution and positive/negative recovery tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
      - "packages/agentplane/src/commands/task/handoff-show.command.ts"
      - "packages/agentplane/src/commands/task/handoff.shared.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
      - "packages/agentplane/src/commands/task/handoff-show.command.ts"
      - "packages/agentplane/src/commands/task/handoff.shared.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
          - "packages/agentplane/src/commands/pr/flow-status.ts"
          - "packages/agentplane/src/commands/shared/route-decision.ts"
          - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
          - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
          - "packages/agentplane/src/commands/task/handoff-show.command.ts"
          - "packages/agentplane/src/commands/task/handoff.shared.ts"
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
      digest: "sha256:fb6d8ce65610da20bd9591060076173266c5f96da4ef392a64c957362f1883eb"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/route-decision.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-handoff-reader.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-handoff-reader.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
          - "packages/agentplane/src/commands/pr/flow-status.ts"
          - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
          - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
          - "packages/agentplane/src/commands/task/handoff-show.command.ts"
          - "packages/agentplane/src/commands/task/handoff.shared.ts"
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
commit:
  hash: "5d2f48ce48e8bf4538d9859cdd8544a0ef8d073e"
  message: "🚧 DVS5NN task: record external evaluator result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bd72b49eaf67. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The only evaluator rework is task-document normalization, but this EXECUTOR packet protects .agentplane/tasks and permits only eight implementation paths. No workspace or source changes were made. Recommended action: At the operator boundary, use supported task doc set commands to replace only Verify Steps and Findings for 202608272129-DVS5NN. Preserve the approved implementation plan and all mandatory checks. Then request a fresh semantic packet. Agentplane receipt: external-agent-blocker/tr_6594ff8695628b5c9d7709a8ced14d4e/sha256:b7e46c713eba8bc7f634629983628855425e0dbe0dfa8f546241b9ebf36f295c."
  -
    author: "ORCHESTRATOR"
    body: "Resume: resolved the documentation-only blocker through supported task doc set. Verify Steps now specifies the approved owner/identity/replay scenario and retains full CI; Findings records evidence and two deferred causes. Source code and required checks are unchanged. Request fresh supervisor verification and evaluation under the user-authorized refactoring operator exception."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: db40fc44542c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-27T21:37:58.045Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-27T22:07:01.951Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bd72b49eaf67. CLI accepted one state-bound external-agent semantic result."
    commit: "bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
  -
    type: "verify"
    at: "2026-08-27T22:15:27.248Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-27T22:22:18.568Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The only evaluator rework is task-document normalization, but this EXECUTOR packet protects .agentplane/tasks and permits only eight implementation paths. No workspace or source changes were made. Recommended action: At the operator boundary, use supported task doc set commands to replace only Verify Steps and Findings for 202608272129-DVS5NN. Preserve the approved implementation plan and all mandatory checks. Then request a fresh semantic packet. Agentplane receipt: external-agent-blocker/tr_6594ff8695628b5c9d7709a8ced14d4e/sha256:b7e46c713eba8bc7f634629983628855425e0dbe0dfa8f546241b9ebf36f295c."
  -
    type: "status"
    at: "2026-08-27T22:23:47.666Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: resolved the documentation-only blocker through supported task doc set. Verify Steps now specifies the approved owner/identity/replay scenario and retains full CI; Findings records evidence and two deferred causes. Source code and required checks are unchanged. Request fresh supervisor verification and evaluation under the user-authorized refactoring operator exception."
  -
    type: "status"
    at: "2026-08-27T22:40:33.388Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: db40fc44542c. CLI accepted one state-bound external-agent semantic result."
    commit: "db40fc44542cedbf516d4fef901c76bb73fe7aec"
  -
    type: "verify"
    at: "2026-08-27T22:49:32.357Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-27T22:56:59.011Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "5d2f48ce48e8bf4538d9859cdd8544a0ef8d073e"
doc_version: 3
doc_updated_at: "2026-08-27T22:56:59.022Z"
doc_updated_by: "CODER"
description: "Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate."
sections:
  Summary: |-
    Resolve protected integration handoffs from their owning checkout

    Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
  Scope: |-
    - In scope: Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
    - Out of scope: unrelated refactors not required for "Resolve protected integration handoffs from their owning checkout".
  Plan: "Confirm the missing base-owned protected handoff in the failing route, then implement a bounded read-only ownership-aware reader using existing task execution and base-checkout resolution. Wire route/PR-flow and task handoff show/resume consumers to that reader. Keep the existing writer and artifact format unchanged. Preserve valid local/direct handoffs. Validate exact task identity and preserve downstream branch, HEAD, base, PR and adoption-token guards. Refuse malformed, mismatched, or ambiguous protected evidence. Cover persisted external-effect recovery, repeated reads, explicit legacy adoption and the following transition without mutating either checkout. Run the focused handoff and conflict suites, full CI, lint/format and diff check. Return blocked if the cause or required scope differs materially."
  Verify Steps: |-
    1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/pr/conflict-rework-recovery.test.ts --pool=forks --maxWorkers=1`. Expected: all 83 focused tests pass. Protected base-owned handoffs resolve from both the base checkout and task worktree. Repeated show/resume reads preserve heads, status and artifact bytes and create no copied handoff. Explicit legacy adoption and the following transition remain valid.
    2. Review negative and compatibility cases in the focused tests. Expected: wrong task, role, base, branch, head, PR identity, provider identity, malformed records and conflicting protected copies fail closed. Direct and ordinary worktree-local handoffs remain supported. Existing exact-authority, provider-head, queue and adoption-token guards are unchanged.
    3. Run `bun run ci:local:full`. Expected: every mandatory local check succeeds for the current task input. Do not relax required checks, add skips or extend timeouts. This is task verification, not final release prepublish qualification.
    4. Run `git diff --check`. Expected: no whitespace errors. Review the scoped diff for an owner-aware read-only reader and existing consumers only; no artifact copying, new state store or lifecycle bypass.
    5. Compare the result with the approved plan and Findings. Expected: the proved owner mismatch and verification evidence are recorded, incident verification-target and provider-neutral wording remain explicit separate causes, and local checks are not presented as hosted integration or release completion.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-27T22:15:27.248Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:134795c74a27965abb7b952f8fa80265b2bca277d1a6c042b7f29a46cbcb39ae, input_digest=sha256:793531f84417a29fbcb82431472b2d0e76f3afaf4150c877edda3734b7e8c550

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608272129-DVS5NN-resolve-protected-integration-handoffs-from-thei/.agentplane/tasks/202608272129-DVS5NN/blueprint/resolved-snapshot.json
    - old_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
    - current_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608272129-DVS5NN

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

    ### 2026-08-27T22:49:32.357Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:59b43f773c61e4b8a6973da88719b5b90b899dc4169fa4a5351e038006f864eb, input_digest=sha256:231424a8056ddc2df279d7e4304a9ceaddf4c70616375ccbe220d3e592f09cbb

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608272129-DVS5NN-resolve-protected-integration-handoffs-from-thei/.agentplane/tasks/202608272129-DVS5NN/blueprint/resolved-snapshot.json
    - old_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
    - current_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608272129-DVS5NN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608272129-DVS5NN
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
    Proved cause: protected integration persists its INTEGRATOR handoff in the base checkout, but task-worktree route hydration previously looked only in the task checkout and lost the valid legacy adoption route. The owner-aware shared reader now resolves the registered base checkout, validates task and protected identity, rejects malformed or conflicting evidence, and preserves direct/local behavior without copying or rewriting artifacts.

    Local evidence before documentation normalization: 83/83 focused owner-readback, negative, explicit-adoption, replay and next-transition tests passed; scoped lint, formatting, TypeScript build, diff and oversized-file checks passed. Independent manual full CI and supervisor-owned full CI passed for implementation bd72b49eaf67bd2cfcf8170232d6c365de4c572c. The broad core run retained one existing opt-in network packaging skip; this patch introduced no skip. Documentation changes require fresh supervisor verification and evaluation before publication.

    Residual causes: the incident post-closure verification-target mismatch and the provider-neutral integrate-error wording expectation are separate, unmodified follow-up work. No GitHub checks, integration, closure or release-prepublish success is claimed for this task yet.
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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:f5d15092e0d6f945c4e77d19b5f5db622dce50d0a53b3ab044a476858c80e760"
    grant_id: "8f672506-569a-454e-b6e0-fb6bbea002a4"
    issued_at: "2026-08-27T21:37:08.002Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:fd556db58392680ccb9422d01c483303effa306a11aa83d63d55e320b303e9f3"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608272129-DVS5NN"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T21:37:08.002Z"
        approved_by: "USER"
        approved_digest: "sha256:d4e602f5637f6025a37079f35f393e6a449494dc25e974efaabeab4ec7dfb009"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T21:32:57.895Z"
      digest: "sha256:d4e602f5637f6025a37079f35f393e6a449494dc25e974efaabeab4ec7dfb009"
      proposal:
        assumptions:
          - "One reader/owner mismatch is the bounded cause; implementation must confirm it with the actual failing route before changing behavior."
          - "The existing protected integration writer remains the owner on the base checkout; no state-store migration is needed."
          - "Read-only handoff resolution can be implemented using existing task/base identity; any material authority or ownership redesign requires scope review."
        planning_baseline:
          captured_at: "2026-08-27T21:30:11.713Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:6824d104908d2bdddace4f310347d160c8b89adb71e38b2b6e49f553d141f2a2"
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
            - ".agentplane/tasks/202608272129-DVS5NN/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "db908ae90dd32609c6d12454fe87166a08e6ec4e"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608272129-DVS5NN"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "The reproduced legacy adoption scenario succeeds through the existing explicit authority boundary after a base-owned protected handoff is read from task-worktree route/show/resume contexts. A fresh route diagnostic identifies the original missing evidence. Ordinary direct and worktree-local handoffs remain readable."
              id: "owner-readback"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Regression tests reject wrong task, branch, head, base and PR identities and malformed or ambiguous protected evidence. Repeated reads and recovery after the persisted external effect preserve both checkout HEADs, tracked/untracked state, and handoff bytes. The next adoption/route transition uses the existing exact-token guards and no self-issued approval."
              id: "identity-and-recovery"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts --pool=forks --maxWorkers=1. All existing and added scenarios pass without skips or timeout increases. Run scoped lint/format and full mandatory CI. No writer/state store/schema/authority/policy/CI/release/roadmap change. Record the two unrelated diagnostic failures as deferred, not solved."
              id: "bounded-verification"
              required: true
          evidence_fingerprint: "sha256:6824d104908d2bdddace4f310347d160c8b89adb71e38b2b6e49f553d141f2a2"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "The reproduced legacy adoption scenario succeeds through the existing explicit authority boundary after a base-owned protected handoff is read from task-worktree route/show/resume contexts. A fresh route diagnostic identifies the original missing evidence. Ordinary direct and worktree-local handoffs remain readable."
                  id: "owner-readback"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Regression tests reject wrong task, branch, head, base and PR identities and malformed or ambiguous protected evidence. Repeated reads and recovery after the persisted external effect preserve both checkout HEADs, tracked/untracked state, and handoff bytes. The next adoption/route transition uses the existing exact-token guards and no self-issued approval."
                  id: "identity-and-recovery"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts --pool=forks --maxWorkers=1. All existing and added scenarios pass without skips or timeout increases. Run scoped lint/format and full mandatory CI. No writer/state store/schema/authority/policy/CI/release/roadmap change. Record the two unrelated diagnostic failures as deferred, not solved."
                  id: "bounded-verification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                  - "packages/agentplane/src/commands/pr/conflict-rework-route-eligibility.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/task-handoff.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
                  - "packages/agentplane/src/commands/shared/route-decision.ts"
                  - "packages/agentplane/src/commands/task/handoff.shared.ts"
                  - "packages/agentplane/src/commands/task/handoff-show.command.ts"
                  - "packages/agentplane/src/commands/pr/flow-status.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
                symbol_hints:
                  - "resolveTaskHandoffPaths"
                  - "resolvePrFlowStatus"
                  - "loadTaskCommandContext"
                  - "buildTaskResumeContext"
              depends_on: []
              expected_outputs:
                - "artifact:handoff-readback-report"
              id: "repair-protected-handoff-readback"
              objective: "Confirm the missing base-owned protected handoff in the failing route, then implement a bounded read-only ownership-aware reader using existing task execution and base-checkout resolution. Wire route/PR-flow and task handoff show/resume consumers to that reader. Keep the existing writer and artifact format unchanged. Preserve valid local/direct handoffs. Validate exact task identity and preserve downstream branch, HEAD, base, PR and adoption-token guards. Refuse malformed, mismatched, or ambiguous protected evidence. Cover persisted external-effect recovery, repeated reads, explicit legacy adoption and the following transition without mutating either checkout. Run the focused handoff and conflict suites, full CI, lint/format and diff check. Return blocked if the cause or required scope differs materially."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/route-decision.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/handoff.shared.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/handoff-show.command.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/flow-status.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
                - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
                - "packages/agentplane/src/commands/shared/route-decision.ts"
                - "packages/agentplane/src/commands/task/handoff.shared.ts"
                - "packages/agentplane/src/commands/task/handoff-show.command.ts"
                - "packages/agentplane/src/commands/pr/flow-status.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "The reproduced legacy adoption scenario succeeds through the existing explicit authority boundary after a base-owned protected handoff is read from task-worktree route/show/resume contexts. A fresh route diagnostic identifies the original missing evidence. Ordinary direct and worktree-local handoffs remain readable."
                    id: "owner-readback"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Regression tests reject wrong task, branch, head, base and PR identities and malformed or ambiguous protected evidence. Repeated reads and recovery after the persisted external effect preserve both checkout HEADs, tracked/untracked state, and handoff bytes. The next adoption/route transition uses the existing exact-token guards and no self-issued approval."
                    id: "identity-and-recovery"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts --pool=forks --maxWorkers=1. All existing and added scenarios pass without skips or timeout increases. Run scoped lint/format and full mandatory CI. No writer/state store/schema/authority/policy/CI/release/roadmap change. Record the two unrelated diagnostic failures as deferred, not solved."
                    id: "bounded-verification"
                    required: true
                evidence_fingerprint: "sha256:6824d104908d2bdddace4f310347d160c8b89adb71e38b2b6e49f553d141f2a2"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608272129-DVS5NN"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608272129-DVS5NN"
            - "git:bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
          check_id: "full-ci"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-27T22:49:32.357Z"
          repository_snapshot_digest: "sha256:4c07c7fc3837fa3ed026e30f86274e9ecc58f4635b21d42579a9bbf3d5482ab7"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608272129-DVS5NN"
            - "git:bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
          check_id: "diff-check"
          command_identity: "git diff --check"
          detail: "Verified: CLI-owned checks passed before independent EVALUATOR review."
          exit_code: 0
          observed_at: "2026-08-27T22:49:32.357Z"
          repository_snapshot_digest: "sha256:4c07c7fc3837fa3ed026e30f86274e9ecc58f4635b21d42579a9bbf3d5482ab7"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608272129-DVS5NN"
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
      captured_at: "2026-08-27T21:29:51.777Z"
      constraints: []
      request: |-
        Resolve protected integration handoffs from their owning checkout

        Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
      task_id: "202608272129-DVS5NN"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 19
    schema_version: 1
    updated_at: "2026-08-27T22:56:59.011Z"
    work_items:
      repair-protected-handoff-readback:
        attempt: 1
        claim_id: null
        id: "repair-protected-handoff-readback"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a52391f9ef8f1d34dda4bc9b6ed2b76cb0d8a4c493a8eb4589f7b5b45999cb48"
            id: "artifact:handoff-readback-report"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608272129-DVS5NN"
              work_item_id: "repair-protected-handoff-readback"
            provenance:
              - "sha256:2f1d34a937c0167d99c4f5bcc98fc35da6f7e5b78b8b307d559ae4daab2e5dc8"
              - ".agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:42d1e6a03cf081034ba5b97d763562799ea518903a352ef66369c436f66e6c43"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-27T22:15:30.568Z"
              repository_snapshot_digest: "sha256:42d1e6a03cf081034ba5b97d763562799ea518903a352ef66369c436f66e6c43"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json"
              check_id: "diff-check"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-27T22:15:30.568Z"
              repository_snapshot_digest: "sha256:42d1e6a03cf081034ba5b97d763562799ea518903a352ef66369c436f66e6c43"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608272129-DVS5NN-executor-a881d964816373a63aae299b:
        aggregate_digest: "sha256:3ee81910a7ad74bf69dc8bcfff004a4571e0cbf65e49cf4dfc6e4a2e5abfb0d2"
        event:
          actor_id: "agentplane"
          at: "2026-08-27T22:15:30.575Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_4c2c90108a194224270d28d4"
          mutation_id: "external-result:work-order-202608272129-DVS5NN-executor-a881d964816373a63aae299b"
          plan_digest: "sha256:d4e602f5637f6025a37079f35f393e6a449494dc25e974efaabeab4ec7dfb009"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608272129-DVS5NN"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "repair-protected-handoff-readback"
        mutation_id: "external-result:work-order-202608272129-DVS5NN-executor-a881d964816373a63aae299b"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608272129-DVS5NN"
      legacy-finish:202608272129-DVS5NN:2026-08-27T22:49:32.357Z:bd72b49eaf67bd2cfcf8170232d6c365de4c572c:
        aggregate_digest: "sha256:40b5553ae7ddc9d0bb8a03d6727f7447df1b5de0cbafd5bbef91248a55e5fa6b"
        event:
          actor_id: "CODER"
          at: "2026-08-27T22:56:59.011Z"
          cause_refs:
            - "task-verification:202608272129-DVS5NN"
            - "git:bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
          entity: "task"
          from: "ACTIVE"
          id: "event_65ecdce1f2f02b11348fc3b3"
          mutation_id: "legacy-finish:202608272129-DVS5NN:2026-08-27T22:49:32.357Z:bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
          plan_digest: "sha256:d4e602f5637f6025a37079f35f393e6a449494dc25e974efaabeab4ec7dfb009"
          plan_revision: 1
          repository_fingerprint: "sha256:4c07c7fc3837fa3ed026e30f86274e9ecc58f4635b21d42579a9bbf3d5482ab7"
          schema_version: 1
          task_id: "202608272129-DVS5NN"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608272129-DVS5NN:2026-08-27T22:49:32.357Z:bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202608272129-DVS5NN"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "bd72b49eaf67bd2cfcf8170232d6c365de4c572c"
    message: "🚧 DVS5NN task: apply external agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "db908ae90dd32609c6d12454fe87166a08e6ec4e"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "db908ae90dd32609c6d12454fe87166a08e6ec4e"
    version: 1
id_source: "generated"
---
## Summary

Resolve protected integration handoffs from their owning checkout

Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.

## Scope

- In scope: Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
- Out of scope: unrelated refactors not required for "Resolve protected integration handoffs from their owning checkout".

## Plan

Confirm the missing base-owned protected handoff in the failing route, then implement a bounded read-only ownership-aware reader using existing task execution and base-checkout resolution. Wire route/PR-flow and task handoff show/resume consumers to that reader. Keep the existing writer and artifact format unchanged. Preserve valid local/direct handoffs. Validate exact task identity and preserve downstream branch, HEAD, base, PR and adoption-token guards. Refuse malformed, mismatched, or ambiguous protected evidence. Cover persisted external-effect recovery, repeated reads, explicit legacy adoption and the following transition without mutating either checkout. Run the focused handoff and conflict suites, full CI, lint/format and diff check. Return blocked if the cause or required scope differs materially.

## Verify Steps

1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/commands/pr/conflict-rework-recovery.test.ts --pool=forks --maxWorkers=1`. Expected: all 83 focused tests pass. Protected base-owned handoffs resolve from both the base checkout and task worktree. Repeated show/resume reads preserve heads, status and artifact bytes and create no copied handoff. Explicit legacy adoption and the following transition remain valid.
2. Review negative and compatibility cases in the focused tests. Expected: wrong task, role, base, branch, head, PR identity, provider identity, malformed records and conflicting protected copies fail closed. Direct and ordinary worktree-local handoffs remain supported. Existing exact-authority, provider-head, queue and adoption-token guards are unchanged.
3. Run `bun run ci:local:full`. Expected: every mandatory local check succeeds for the current task input. Do not relax required checks, add skips or extend timeouts. This is task verification, not final release prepublish qualification.
4. Run `git diff --check`. Expected: no whitespace errors. Review the scoped diff for an owner-aware read-only reader and existing consumers only; no artifact copying, new state store or lifecycle bypass.
5. Compare the result with the approved plan and Findings. Expected: the proved owner mismatch and verification evidence are recorded, incident verification-target and provider-neutral wording remain explicit separate causes, and local checks are not presented as hosted integration or release completion.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-27T22:15:27.248Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:134795c74a27965abb7b952f8fa80265b2bca277d1a6c042b7f29a46cbcb39ae, input_digest=sha256:793531f84417a29fbcb82431472b2d0e76f3afaf4150c877edda3734b7e8c550

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608272129-DVS5NN-resolve-protected-integration-handoffs-from-thei/.agentplane/tasks/202608272129-DVS5NN/blueprint/resolved-snapshot.json
- old_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
- current_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608272129-DVS5NN

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

### 2026-08-27T22:49:32.357Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:59b43f773c61e4b8a6973da88719b5b90b899dc4169fa4a5351e038006f864eb, input_digest=sha256:231424a8056ddc2df279d7e4304a9ceaddf4c70616375ccbe220d3e592f09cbb

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608272129-DVS5NN/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608272129-DVS5NN Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608272129-DVS5NN-resolve-protected-integration-handoffs-from-thei/.agentplane/tasks/202608272129-DVS5NN/blueprint/resolved-snapshot.json
- old_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
- current_digest: 44b77635db1ede03f74e71a46d3871a3ffc26b542d7f15c632f0216ebb67d1ff
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608272129-DVS5NN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608272129-DVS5NN
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

Proved cause: protected integration persists its INTEGRATOR handoff in the base checkout, but task-worktree route hydration previously looked only in the task checkout and lost the valid legacy adoption route. The owner-aware shared reader now resolves the registered base checkout, validates task and protected identity, rejects malformed or conflicting evidence, and preserves direct/local behavior without copying or rewriting artifacts.

Local evidence before documentation normalization: 83/83 focused owner-readback, negative, explicit-adoption, replay and next-transition tests passed; scoped lint, formatting, TypeScript build, diff and oversized-file checks passed. Independent manual full CI and supervisor-owned full CI passed for implementation bd72b49eaf67bd2cfcf8170232d6c365de4c572c. The broad core run retained one existing opt-in network packaging skip; this patch introduced no skip. Documentation changes require fresh supervisor verification and evaluation before publication.

Residual causes: the incident post-closure verification-target mismatch and the provider-neutral integrate-error wording expectation are separate, unmodified follow-up work. No GitHub checks, integration, closure or release-prepublish success is claimed for this task yet.

## Token Usage

- State: `unavailable`
- Completeness: `0/6` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:9bda54f4e0c028ef835a4e95997c3dde17f0e3c886668c0d73069f6c9f205a5b`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-27T22:56:59.011Z`
