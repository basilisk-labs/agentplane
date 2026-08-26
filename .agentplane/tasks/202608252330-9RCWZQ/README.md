---
id: "202608252330-9RCWZQ"
title: "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch"
result_summary: "pre-merge closure"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 51
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
  - "branch-pr"
  - "provider-base"
  - "regression"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "merge"
  - "external_system"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-26T01:59:47.289Z"
  updated_by: "USER"
  note: "User approved plan_digest sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f at state_fingerprint sha256:64e3cb82c3cabb6f93db912c4046b8d41545dea67e9d07c28bed53e01c5eca1a"
verification:
  state: "ok"
  updated_at: "2026-08-26T07:00:10.704Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-26T07:03:56.487Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 6 typed finding(s)."
  evaluated_sha: "1c53295ba0a1d77eb1d4adc93b8c1776dbad1a08"
  blueprint_digest: "aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c"
  evidence_refs:
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/20260826-070310593-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/20260826-070310593-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/objects/sha256/8a1ef0940b470595cf3e3209b465b2ce9530f92d52c47f596bd6d74f10de2bfe.md"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/20260826-070310593-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/20260826-070310593-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/20260826-070310593-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/20260826-070310593-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/README.md"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/objects/sha256/40b7d8dc17957fc877ffa91a1ef8afa3b513a03b896a29fa8ff477dc295356b0.patch"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/objects/sha256/4251f83662c7feb1c6f1907e716a13cbb523700a6a57e4a1bc1983d36d56ae6f.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/verification/20260826070010704-bb952dc1309ffb60.json"
    - ".agentplane/tasks/202608252330-9RCWZQ/quality/objects/sha256/cbf2a89c25f28cf78edbe7197684c73ad7e9a2d05109f7706d956a1390e66550.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The exact-SHA provider-base implementation and provider-boundary regressions are within scope and pass full CI."
    - "TaskAggregate records WI-1 READY and WI-2 PLANNED, but computeReadyWorkItems reports WI-1 false with input_missing for Task execution.base_ref and execution.base_sha, Configured or current repository base branch, and Live local and provider-visible branch heads."
    - "Those three values are context requirements, not output-manifest IDs; no predecessor WorkItem can produce them under the approved graph."
    - "WorkItemScheduler therefore returns an empty selection and recordTaskCentricExternalResult fails with The issued WorkItem is no longer present in the approved task plan."
    - "A validation-only material plan refinement is required before another verification: retain the same two WorkItems, scope, outputs, acceptance criteria, checks, and dependency WI-1 to WI-2, but remove prose context from required_inputs and keep it in context.required_sources/symbol_hints."
    - "Residual risk: Repeating implementation verification without correcting the plan graph will deterministically fail receipt recording again."
token_usage:
  agent_runs: 20
  input_tokens: null
  journal_digest: "sha256:fcba95c8f75d346e20d11dc6f3d6e5534f1f6dd2e25599da7655e931309451a2"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-26T06:40:21.700Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/commands/pr"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The existing 0.7.8 candidate remains unchanged and is resumed only after this blocker is integrated."
      - "The fix changes provider-facing PR construction and therefore needs focused regression evidence before integration."
      - "The repository requires branch_pr for source changes and hosted integration."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/commands/pr"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
      - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
          - "packages/agentplane/src/commands/pr"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:80ca17cd727aa7c9c05c4f769bbe409998c624d872e548262db65ad793236f63"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
          - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
          - "packages/agentplane/src/commands/pr/internal/sync.ts"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "0db1d23aa83bc72acdf22080f0c4843af16da93d"
  message: "🚧 9RCWZQ task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f6d0ecf41b10. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: dfb1a8ffb9a2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: fed82c864bfd. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The remaining dirty README is intended AgentPlane-owned supervisor evidence produced after successful full verification and evaluator processing. No implementation path is dirty and no repository mutation is required from the semantic agent."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The four remaining untracked paths are a single internally consistent AgentPlane-generated evaluator evidence packet for the current Task and evaluated head. No product, test, policy, CI, release, or provider artifact path is dirty, so no semantic implementation mutation is required."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The only dirty path is the active Task README, and its diff contains intended AgentPlane-owned evaluator and refreshed pre-merge-closure evidence. No product, test, policy, CI, release, or provider artifact is dirty."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Recovery: project the already verified implementation through canonical WI-1 and WI-2 so TaskAggregate completion matches the legacy DONE evidence."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a375a1f236a6. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The sole dirty path is intended AgentPlane-owned pre-merge-close evidence produced by the failed closeout recovery. No product, test, policy, provider, or release-candidate path is dirty."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The only dirty path is an intended AgentPlane-owned refreshed pre-merge closure projection produced after the accepted evaluator result. Product implementation and release-candidate paths remain clean."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The sole dirty path is the intended AgentPlane-owned refreshed pre-merge closure evidence from the failed closeout attempt. Product and release-candidate paths remain clean."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1c53295ba0a1. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0db1d23aa83b. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-26T02:00:01.156Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-26T02:09:57.786Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f6d0ecf41b10. CLI accepted one state-bound external-agent semantic result."
    commit: "f6d0ecf41b10ab511286ed89cdacb19c13362f70"
  -
    type: "verify"
    at: "2026-08-26T02:09:59.975Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-26T02:25:57.947Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: dfb1a8ffb9a2. CLI accepted one state-bound external-agent semantic result."
    commit: "dfb1a8ffb9a2b9b3f1308c61d7dfe6f18f9a5b23"
  -
    type: "verify"
    at: "2026-08-26T02:32:20.159Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-26T02:36:06.627Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: fed82c864bfd. CLI accepted one state-bound external-agent semantic result."
    commit: "fed82c864bfdc690c735b5dab3dca2e1201c7203"
  -
    type: "verify"
    at: "2026-08-26T02:43:03.650Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-26T02:47:51.832Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "d982b3c15cc9dd50f05b52b1e8148ee749d901fe"
  -
    type: "comment"
    at: "2026-08-26T02:48:47.293Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The remaining dirty README is intended AgentPlane-owned supervisor evidence produced after successful full verification and evaluator processing. No implementation path is dirty and no repository mutation is required from the semantic agent."
  -
    type: "comment"
    at: "2026-08-26T02:55:23.801Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The four remaining untracked paths are a single internally consistent AgentPlane-generated evaluator evidence packet for the current Task and evaluated head. No product, test, policy, CI, release, or provider artifact path is dirty, so no semantic implementation mutation is required."
  -
    type: "status"
    at: "2026-08-26T02:58:19.276Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "f2e5e300bf5c3a28b607125324632f11db9e8ef4"
  -
    type: "comment"
    at: "2026-08-26T03:00:09.807Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The only dirty path is the active Task README, and its diff contains intended AgentPlane-owned evaluator and refreshed pre-merge-closure evidence. No product, test, policy, CI, release, or provider artifact is dirty."
  -
    type: "status"
    at: "2026-08-26T03:03:41.411Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "cdb866979b1d52cf4d5cf56d8687328c6a3ba30e"
  -
    type: "status"
    at: "2026-08-26T05:44:50.967Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "c507c80a1bcfe218ce5b6b878538adae060483d6"
  -
    type: "status"
    at: "2026-08-26T05:49:18.630Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "705d34d2590a73b7383f359bf556b71f3d094454"
  -
    type: "status"
    at: "2026-08-26T05:59:44.110Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "3fb2802f533261e10fa29e306d9e5111c736acf4"
  -
    type: "status"
    at: "2026-08-26T06:03:04.674Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Recovery: project the already verified implementation through canonical WI-1 and WI-2 so TaskAggregate completion matches the legacy DONE evidence."
  -
    type: "verify"
    at: "2026-08-26T06:07:01.268Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: canonical WorkItem completion receipts are missing despite passing product verification."
  -
    type: "status"
    at: "2026-08-26T06:10:09.749Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a375a1f236a6. CLI accepted one state-bound external-agent semantic result."
    commit: "a375a1f236a6876cd0ad951138019de16fc0f95e"
  -
    type: "verify"
    at: "2026-08-26T06:27:18.487Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-08-26T06:31:21.808Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "bd453fe55214fdfa442854a88b2ca5245289a388"
  -
    type: "comment"
    at: "2026-08-26T06:33:05.183Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The sole dirty path is intended AgentPlane-owned pre-merge-close evidence produced by the failed closeout recovery. No product, test, policy, provider, or release-candidate path is dirty."
  -
    type: "status"
    at: "2026-08-26T06:37:59.644Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "22b379d2e62d1f0b72c2aea34a3bd22d0ddee056"
  -
    type: "comment"
    at: "2026-08-26T06:39:06.032Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The only dirty path is an intended AgentPlane-owned refreshed pre-merge closure projection produced after the accepted evaluator result. Product implementation and release-candidate paths remain clean."
  -
    type: "status"
    at: "2026-08-26T06:40:21.700Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "5275137c701057e68bf2527ad928e62e3764297b"
  -
    type: "comment"
    at: "2026-08-26T06:42:48.186Z"
    author: "SUPERVISOR"
    body: "Read-only worktree observation (completed): The sole dirty path is the intended AgentPlane-owned refreshed pre-merge closure evidence from the failed closeout attempt. Product and release-candidate paths remain clean."
  -
    type: "status"
    at: "2026-08-26T06:53:02.911Z"
    author: "SUPERVISOR"
    from: "DONE"
    to: "DOING"
    note: "Implementation committed: 1c53295ba0a1. CLI accepted one state-bound external-agent semantic result."
    commit: "1c53295ba0a1d77eb1d4adc93b8c1776dbad1a08"
  -
    type: "verify"
    at: "2026-08-26T07:00:10.704Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-26T07:07:44.063Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0db1d23aa83b. CLI accepted one state-bound external-agent semantic result."
    commit: "0db1d23aa83bc72acdf22080f0c4843af16da93d"
doc_version: 3
doc_updated_at: "2026-08-26T07:07:44.087Z"
doc_updated_by: "SUPERVISOR"
description: "Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA."
sections:
  Summary: |-
    Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

    Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
  Scope: |-
    - In scope: Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
    - Out of scope: unrelated refactors not required for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch".
  Plan: "Prepared a bounded branch_pr plan to preserve the frozen execution base while resolving an exact matching provider base branch for hosted PR creation, with fail-closed mismatch behavior and focused regressions."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-26T02:09:59.975Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:54518848ea3ce8749692e02636d8f32f64f8ee06e3a821b45d62f008a969f4ed

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
    - old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

    ### 2026-08-26T02:32:20.159Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:97dea2f42075bb700152668a30e95d8df7162460dcf1614ccedc9f3bc5e51e83

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
    - old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

    ### 2026-08-26T02:43:03.650Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:14ce0519b7384d2f1c38a958669e05616265c1e940822d980948a9c96a0037a2

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check critical_paths

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check real_e2e

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
    - old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

    ### 2026-08-26T06:07:01.268Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: canonical WorkItem completion receipts are missing despite passing product verification.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:bd054e6e75d88ec8025e25f059a6b73efa2f9357947dae38ebfc4bc1a85f7628

    Details:

    Command: agentplane finish 202608252330-9RCWZQ --pre-merge-closure
    Result: fail
    Evidence: required_work_item_incomplete:WI-1 and required_work_item_incomplete:WI-2
    Scope: canonical TaskAggregate projection only; implementation and full regression evidence remain passing.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
    - old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

    ### 2026-08-26T06:27:18.487Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:fe9ce988ba142453e7d03728e42961a4440f179c1f0e6a8850ab2a3f668ac143

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check critical_paths

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check real_e2e

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
    - old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608252330-9RCWZQ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-26T07:00:10.704Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:96066252b9616fe64426bfa6460ba8d12bde374951d9dab5defed3b5f7d591eb

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check critical_paths

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check real_e2e

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
    - old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608252330-9RCWZQ
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
    completion_contract_digest: "sha256:eb99fc494c3b962e340ff87de629edc93bafdb74f8bcd7882f7b2048ca5b217c"
    digest: "sha256:4e7df4df11538e01efe8c761b143e3f1169dbc652be76280c13b66f8456e446c"
    grant_id: "f4db21f8-dc04-47f1-9d56-884e862c80bb"
    issued_at: "2026-08-26T01:59:47.289Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c4ca7a0fd65f4ec25a485f23a6b84211fe5569e18d88ea1cc5bc78068ec73eb1"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:1a8e009a74a6a60da0c9acf5ab642363ce87f6e0c2cfb72131207c1038c3823b"
    status: "active"
    task_id: "202608252330-9RCWZQ"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-26T01:59:47.289Z"
        approved_by: "USER"
        approved_digest: "sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-25T23:35:03.814Z"
      digest: "sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f"
      proposal:
        assumptions:
          - "The frozen execution base SHA is already present locally and is the exact required merge base for the release candidate."
          - "The normal configured/current provider base is main and must resolve to the same exact SHA before PR creation is allowed."
          - "No release candidate file changes are required to repair this control-plane defect."
        planning_baseline:
          captured_at: "2026-08-25T23:30:39.356Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c28d4dfbea6245e64acc2093c2b7f9113d721ce20dff853c67d41fb2081dd328"
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
            - ".agentplane/tasks/202608252330-9RCWZQ/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608252330-9RCWZQ"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts --pool=forks --maxWorkers 1"
              id: "check-pr-open-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "structural"
              required: true
              timeout_ms: 180000
          criteria:
            -
              check_ids:
                - "check-pr-open-focused"
                - "check-typecheck"
              description: "Exact-SHA release tasks can open a hosted PR only against a uniquely matching provider branch, with the frozen task execution evidence unchanged."
              id: "TOP-AC-1"
              required: true
            -
              check_ids:
                - "check-pr-open-focused"
              description: "The implementation remains within PR routing and focused regression-test scope and introduces no release candidate changes."
              id: "TOP-AC-2"
              required: true
          evidence_fingerprint: "sha256:21401199c28421eb1593ac9659bdcc9775d509b4fd8a303c3535fe3c22d79ebd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-pr-open-focused"
                  description: "A 40-hex execution base whose SHA equals the resolved protected branch head produces the branch name as provider base while preserving task execution.base_ref/base_sha."
                  id: "WI-1-AC-1"
                  required: true
                -
                  check_ids:
                    - "check-pr-open-focused"
                  description: "Mismatch, multiple matches, or missing branch evidence fails before hosted PR creation and does not rewrite task or PR identity state."
                  id: "WI-1-AC-2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                  - "packages/agentplane/src/commands/pr/branch-publication.ts"
                required_sources:
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                  - "packages/core/src/tasks/task-execution-base.ts"
                symbol_hints:
                  - "tryCreateGithubPr"
                  - "syncPrArtifacts"
                  - "execution.base_ref"
                  - "execution.base_sha"
              depends_on: []
              expected_outputs:
                - "A provider-neutral base resolver used by PR open/update"
                - "Exact matching branch name for provider requests when the frozen base is an OID"
                - "Fail-closed errors for mismatch, ambiguity, or unavailable evidence"
              id: "WI-1"
              objective: "Resolve a provider-compatible base branch for an exact-OID execution base without changing the frozen task execution evidence."
              optional: false
              priority: 100
              required_inputs:
                - "Task execution.base_ref and execution.base_sha"
                - "Configured or current repository base branch"
                - "Live local and provider-visible branch heads"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/pr"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts --pool=forks --maxWorkers 1"
                    id: "check-pr-open-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-pr-open-focused"
                    description: "Focused PR-open tests prove exact-SHA resolution preserves frozen task execution evidence."
                    id: "WI-1-AC-1"
                    required: true
                  -
                    check_ids:
                      - "check-pr-open-focused"
                    description: "Focused PR-open tests prove mismatch, ambiguity, and missing evidence fail before provider creation."
                    id: "WI-1-AC-2"
                    required: true
                evidence_fingerprint: "sha256:34ac73a306a3f3feef45a1506f659ebb61a5d6210638a7edde66f16a9adbb0f8"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-pr-open-focused"
                    - "check-typecheck"
                  description: "Regression tests prove exact-SHA success and fail-closed mismatch/ambiguity without regressing ordinary branch-base PR creation."
                  id: "WI-2-AC-1"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/internal/sync-github.test.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                symbol_hints:
                  - "pr open"
                  - "base"
                  - "remote_failed"
                  - "provider base"
              depends_on:
                - "WI-1"
              expected_outputs:
                - "Regression tests for exact-SHA success, mismatch, ambiguity, and ordinary branch bases"
                - "Passing focused PR-open test evidence"
                - "Passing AgentPlane typecheck evidence"
              id: "WI-2"
              objective: "Lock the exact-SHA PR base invariant with regression tests and verify the complete bounded change."
              optional: false
              priority: 90
              required_inputs:
                - "WI-1 provider base resolver"
                - "Existing GitHub and GitLab PR-open test fixtures"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                - "packages/agentplane/src/commands/pr"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts --pool=forks --maxWorkers 1"
                    id: "check-pr-open-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "structural"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-pr-open-focused"
                      - "check-typecheck"
                    description: "All focused PR-open tests and repository typecheck pass."
                    id: "WI-2-AC-1"
                    required: true
                evidence_fingerprint: "sha256:e1467fd6b9924d45f1c07b2a2823834b280f0dd8dc43df494c8a113d25be6ba5"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608252330-9RCWZQ"
    event_cursor: 0
    final_validation: null
    id: "202608252330-9RCWZQ"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-25T23:30:32.161Z"
      constraints: []
      request: |-
        Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

        Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
      task_id: "202608252330-9RCWZQ"
    lifecycle: "PLANNING"
    plan_amendments: []
    plan_history: []
    revision: 51
    schema_version: 1
    updated_at: "2026-08-26T07:09:13.717Z"
    work_items:
      WI-1:
        attempt: 0
        claim_id: null
        id: "WI-1"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      WI-2:
        attempt: 0
        claim_id: null
        id: "WI-2"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_replan_required:
    reason_code: "dependencies_changed"
    schema_version: 1
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      plan-refinement:work-order-202608252330-9RCWZQ-executor-b4dfcf505df05aedb2551b93:
        aggregate_digest: "sha256:ecba6f31315a6ae2934916df767c7a1c7ecc638aaa87354275fd33b226dde3dc"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-26T07:09:13.717Z"
          cause_refs:
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_86c3845e3afa6ff8d91df595"
          mutation_id: "plan-refinement:work-order-202608252330-9RCWZQ-executor-b4dfcf505df05aedb2551b93"
          plan_digest: "sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608252330-9RCWZQ"
          task_revision: 50
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608252330-9RCWZQ-executor-b4dfcf505df05aedb2551b93"
        next_revision: 51
        previous_revision: 50
        schema_version: 1
        task_id: "202608252330-9RCWZQ"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "0db1d23aa83bc72acdf22080f0c4843af16da93d"
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

Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.

## Scope

- In scope: Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
- Out of scope: unrelated refactors not required for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch".

## Plan

Prepared a bounded branch_pr plan to preserve the frozen execution base while resolving an exact matching provider base branch for hosted PR creation, with fail-closed mismatch behavior and focused regressions.

## Verify Steps

PLANNER fallback scaffold for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-26T02:09:59.975Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:54518848ea3ce8749692e02636d8f32f64f8ee06e3a821b45d62f008a969f4ed

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
- old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

### 2026-08-26T02:32:20.159Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:97dea2f42075bb700152668a30e95d8df7162460dcf1614ccedc9f3bc5e51e83

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
- old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

### 2026-08-26T02:43:03.650Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:14ce0519b7384d2f1c38a958669e05616265c1e940822d980948a9c96a0037a2

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check critical_paths

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check real_e2e

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
- old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

### 2026-08-26T06:07:01.268Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: canonical WorkItem completion receipts are missing despite passing product verification.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:bd054e6e75d88ec8025e25f059a6b73efa2f9357947dae38ebfc4bc1a85f7628

Details:

Command: agentplane finish 202608252330-9RCWZQ --pre-merge-closure
Result: fail
Evidence: required_work_item_incomplete:WI-1 and required_work_item_incomplete:WI-2
Scope: canonical TaskAggregate projection only; implementation and full regression evidence remain passing.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
- old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

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

### 2026-08-26T06:27:18.487Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:fe9ce988ba142453e7d03728e42961a4440f179c1f0e6a8850ab2a3f668ac143

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check critical_paths

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check real_e2e

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
- old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608252330-9RCWZQ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-26T07:00:10.704Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14ca98416f46528351c89e86e566836bc53af75fa6b934e64efd313ae710de4a, input_digest=sha256:96066252b9616fe64426bfa6460ba8d12bde374951d9dab5defed3b5f7d591eb

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check critical_paths

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check real_e2e

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608252330-9RCWZQ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608252330-9RCWZQ Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608252330-9RCWZQ-allow-exact-sha-release-tasks-to-open-hosted-prs/.agentplane/tasks/202608252330-9RCWZQ/blueprint/resolved-snapshot.json
- old_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- current_digest: aa295e3444593a86ec0dc8fc32bc9200896f9cb6616bc177a87661d6efc67b0c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608252330-9RCWZQ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608252330-9RCWZQ
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
- Completeness: `0/20` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:fcba95c8f75d346e20d11dc6f3d6e5534f1f6dd2e25599da7655e931309451a2`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-26T06:40:21.700Z`
