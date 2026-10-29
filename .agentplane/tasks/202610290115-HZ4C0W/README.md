---
id: "202610290115-HZ4C0W"
title: "Preserve frozen execution base while revalidating publication after main advances"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 70
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-29T07:11:37.881Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-29T07:56:29.342Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-29T07:11:37.881Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "b97ba766d42b93e35f8ecca034492c57c5ecba20"
  review_identity_digest: "sha256:e17a417da56dae7ec4e2f037a68451f865a1d0d38eee49232dded4ac92b1efdb"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610290115-HZ4C0W/f52b61672dd39d991a0bb14c15a48f4167da74a257875dbb7eda819a2ec89737/quality-report.json"
  findings:
    - "Reviewed the complete fresh EVALUATOR WorkOrder, all13 context blocks,4 required inputs and complete result schema; canonical digests match. Native repository evidence c2253d binds original frozen52302393, implementation/tree b97ba766/a7c7d1b5 and all27 scoped source paths. Current worktree and committed27SHA match freeze d635; remaining dirt is native task metadata only."
    - "C1-C4/C7/C15: named provider target observation requires exact local/live equality, frozen-base ancestry and repeated observations; source fork/stale tracking/missing/rewritten/ambiguous/racing evidence refuses. Prepare and protected handoff retain current R containment in exact H plus fresh verification/review/queue gates. Every ordinary provider merge/fallback rechecks H/R/identity and preserves typed refusals."
    - "C8-C13/C18-C19: append-only update evidence is bound to exact Task/provider/operation authority, completion digest and H/R merge parents. Provisional, failed, not_applied, unknown or tampered evidence grants no inherited scope. Full frozen verification range remains intact; only exact imported canonical mode/blob entries are attributed, while Task overlap/later edits remain scoped. Recovery preserves R0 versus laterR1 and both interruption windows without repeating provider PUT. Real Git/verifier/cmdVerifyParsed and fresh EVAL-routing tests exercise these invariants. Managed conflict/import attribution is explicitly unsupported, with original proof paths untouched."
    - "C16-C17: ordinary GitHub merge requires exact-target strict nonempty required checks and enforce_admins; source-fork review authority and unknown/loose policy refuse. Ordinary GitLab requires modeled ff/auto_rebase_enabled=false and squash:false, with unknown/unavailable policy refusing before PUT. Tests cover guards and fallback races. These modeled contracts do not qualify the actual Factory GitLab server or authorize a live merge."
    - "C6/C14/C20-C22: approved stale-dist and three hook-runner fixture changes retain assertions/controller guards. Seven Git preflight reads start once and all settle before the original typed value/error path; held-status regression failed before the production fix and passes with all21 prior cases retained. No exact ENOTEMPTY writer claim. Private case-sensitive test environment and three completed artifact holdings remain preserved; absent oldTMP is an explicit limitation."
    - "Fresh native003 focused199/14files and004CLI16 pass. Native005 mandatory full passes1250203ms on unchanged b97ba766: core7623/1existingSkip, runtime36,criticalCLI34,platform98,coverage105/17targets and docs/workflows. Old native002 FAIL is byte-exact; its mocked EPERM condition remains unconfirmed. Focused18PASS and the successful full do not prove the old failure was harmless or exclusively timing-related. No test/guard weakening or source edits were made for the one retry."
    - "Independent existing peer completed bounded READONLY review of all13blocks/4inputs/schema, both full reports, exact27SHA (rechecked after review), critical source/mutation guards and all23 retained native manifests/file digests; CLEAN with no new P1 or contract mismatch. Nested negative-fixture failures are expected within passing parent core; real prior native002 FAIL remains distinct. No source/provider/host mutations or tests were performed during this EVALUATOR episode."
token_usage:
  agent_runs: 0
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:ae0d6bdd5e644691ffd9b5bfcbf0e74892545409f1d84298d223f367eb818175"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "no_supervised_agent_runs"
  updated_at: "2026-10-29T08:03:16.601Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
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
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
      - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
      - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
      - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
      - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
      - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
      - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
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
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
          - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
          - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
          - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
          - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
          - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
          - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:487de8831ba3332e600dbbd1aaf1512492a76e2f85ace3234596ba15ab939b2e"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
        - "central_component:packages/agentplane/src/cli/stale-dist-readonly.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
        - "central_path:packages/agentplane/src/cli/stale-dist-readonly.test.ts"
        - "effect_security_boundary"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
          - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
          - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
          - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
          - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
          - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
          - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
          - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "da06db9aac3318b7d766c5924d353602642bd695"
  message: "🧩 HZ4C0W task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-10-29T07:31:31.513Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "verify"
    at: "2026-10-29T07:56:29.342Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-10-29T08:03:16.601Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "da06db9aac3318b7d766c5924d353602642bd695"
doc_version: 3
doc_updated_at: "2026-10-29T08:03:16.601Z"
doc_updated_by: "CODER"
description: "The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json."
sections:
  Summary: |-
    Preserve frozen execution base while revalidating publication after main advances

    The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json.
  Scope: |-
    - In scope: The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json.
    - Out of scope: unrelated refactors not required for "Preserve frozen execution base while revalidating publication after main advances".
  Plan: "1. Execute approved WorkItem publication-base-advance."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-29T07:31:31.513Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c7f40471aab7f29cb33117fa69b09c04daf0ab903aa1dd9b971374c6efdb5765, input_digest=sha256:a9653a7856f83e592ca8baddce69d50aa792fd9aa017c524cdd35dfb5e837bdb

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check full_regression

    Check: real_e2e
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17
    - policy_digest: sha256:35781f355aaa21293eb931f34639e0e5cad5380fea760bef8ef8e0fa5ae1c536
    - capability_digest: sha256:aa417008bff297f335bc36564e097d599b9d9ee93384f1f52e730016f6d50be8
    - checks_digest: sha256:bcfbf314e24fee5a826fe8bf8ee59f2e82eb6c796cc81c30b47924f031ae9234
    - identity_digest: sha256:2937358057e0c9ee7a52cbe81cb2adde158f8dcc19f64487a7c8babb7d27074b

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610290115-HZ4C0W
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-10-29T07:56:29.342Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c7f40471aab7f29cb33117fa69b09c04daf0ab903aa1dd9b971374c6efdb5765, input_digest=sha256:6cd55d5a39f9f907fc67b31617e229c6dc0b1fb09182c73cab7e8eff2de1dbab

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check full_regression

    Check: real_e2e
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17
    - policy_digest: sha256:35781f355aaa21293eb931f34639e0e5cad5380fea760bef8ef8e0fa5ae1c536
    - capability_digest: sha256:aa417008bff297f335bc36564e097d599b9d9ee93384f1f52e730016f6d50be8
    - checks_digest: sha256:5d6a8ca9eccf6a919240c43b2efb2dac031f4ee8a3fe3a1c23f8e874d54985e4
    - identity_digest: sha256:d59cebd84ccaf19085b02280c12d367bd157b9ddcaba25c91c1be96fe7ea40a1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610290115-HZ4C0W
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
    digest: "sha256:c80e1160f17554b58558d9e713f30c32fcd77c57d81e57296d527fdff3a840a3"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610290115-HZ4C0W/f52b61672dd39d991a0bb14c15a48f4167da74a257875dbb7eda819a2ec89737/quality-report.json"
    findings:
      - "Reviewed the complete fresh EVALUATOR WorkOrder, all13 context blocks,4 required inputs and complete result schema; canonical digests match. Native repository evidence c2253d binds original frozen52302393, implementation/tree b97ba766/a7c7d1b5 and all27 scoped source paths. Current worktree and committed27SHA match freeze d635; remaining dirt is native task metadata only."
      - "C1-C4/C7/C15: named provider target observation requires exact local/live equality, frozen-base ancestry and repeated observations; source fork/stale tracking/missing/rewritten/ambiguous/racing evidence refuses. Prepare and protected handoff retain current R containment in exact H plus fresh verification/review/queue gates. Every ordinary provider merge/fallback rechecks H/R/identity and preserves typed refusals."
      - "C8-C13/C18-C19: append-only update evidence is bound to exact Task/provider/operation authority, completion digest and H/R merge parents. Provisional, failed, not_applied, unknown or tampered evidence grants no inherited scope. Full frozen verification range remains intact; only exact imported canonical mode/blob entries are attributed, while Task overlap/later edits remain scoped. Recovery preserves R0 versus laterR1 and both interruption windows without repeating provider PUT. Real Git/verifier/cmdVerifyParsed and fresh EVAL-routing tests exercise these invariants. Managed conflict/import attribution is explicitly unsupported, with original proof paths untouched."
      - "C16-C17: ordinary GitHub merge requires exact-target strict nonempty required checks and enforce_admins; source-fork review authority and unknown/loose policy refuse. Ordinary GitLab requires modeled ff/auto_rebase_enabled=false and squash:false, with unknown/unavailable policy refusing before PUT. Tests cover guards and fallback races. These modeled contracts do not qualify the actual Factory GitLab server or authorize a live merge."
      - "C6/C14/C20-C22: approved stale-dist and three hook-runner fixture changes retain assertions/controller guards. Seven Git preflight reads start once and all settle before the original typed value/error path; held-status regression failed before the production fix and passes with all21 prior cases retained. No exact ENOTEMPTY writer claim. Private case-sensitive test environment and three completed artifact holdings remain preserved; absent oldTMP is an explicit limitation."
      - "Fresh native003 focused199/14files and004CLI16 pass. Native005 mandatory full passes1250203ms on unchanged b97ba766: core7623/1existingSkip, runtime36,criticalCLI34,platform98,coverage105/17targets and docs/workflows. Old native002 FAIL is byte-exact; its mocked EPERM condition remains unconfirmed. Focused18PASS and the successful full do not prove the old failure was harmless or exclusively timing-related. No test/guard weakening or source edits were made for the one retry."
      - "Independent existing peer completed bounded READONLY review of all13blocks/4inputs/schema, both full reports, exact27SHA (rechecked after review), critical source/mutation guards and all23 retained native manifests/file digests; CLEAN with no new P1 or contract mismatch. Nested negative-fixture failures are expected within passing parent core; real prior native002 FAIL remains distinct. No source/provider/host mutations or tests were performed during this EVALUATOR episode."
    implementation_commit: "b97ba766d42b93e35f8ecca034492c57c5ecba20"
    implementation_tree: "a7c7d1b5b3a871a1c37cec73583b1e251525e236"
    projected_at: "2026-10-29T07:11:37.881Z"
    review_identity_digest: "sha256:e17a417da56dae7ec4e2f037a68451f865a1d0d38eee49232dded4ac92b1efdb"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:ce94f5c169647a28e120ea32c6adbd760d481eabfd205f375a7e23707f90bc6a"
    work_order_id: "sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe"
  implementation_commit:
    hash: "b97ba766d42b93e35f8ecca034492c57c5ecba20"
    message: "🚧 HZ4C0W task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "52302393b857dc213764c7a22ba06df1d48afa01"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:64cb185b0cd6beff37fcf86b54ba292de3fa2077db08c5153092d29007b57f58"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:f16c962b5778732787d80ed90efc37c987cdb8a6165e0d6e7ed443b6674f35ab"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:301cc8d6c62fa5e41a5cfe2aa5b4c233a85c7ffcf2580a9d727cea570e663451"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:792711c2021456db18b1d38e36e51bc434857690dee4fd83f5e0f7afc369ce08"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:f16c962b5778732787d80ed90efc37c987cdb8a6165e0d6e7ed443b6674f35ab"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:301cc8d6c62fa5e41a5cfe2aa5b4c233a85c7ffcf2580a9d727cea570e663451"
              kind: "USER"
              parent_authority_digest: "sha256:64cb185b0cd6beff37fcf86b54ba292de3fa2077db08c5153092d29007b57f58"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:5c2afef8f9eeb965d97a0eaa32c9bd58d7c37e91b553764f1d5f67e808fc916d"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            request_digest: "sha256:ee7e9d0d259577a093f535b100a628cd0e41e50b9d142c0b88c98972f46e69f5"
            scope_request:
              attempt: 1
              claim_id: "sha256:2a4b29a64251bb79a20dd5ade6ef2b1614fa9d8aacaeda888f6dc59225de5c17"
              contract_digest: "sha256:c3267885595013fecfdf8826fd63d79af75136fde68ee2a4662e80fba978c5cc"
              intake_after_digest: "sha256:9def39c38e913687dcb2574f2105f71d8b570fd566744b3a5b7db2abe5528539"
              intake_before_digest: "sha256:a305cf01aaae3fa9ea46285e2a067e200d23e950031dd3e975051836a01d2d87"
              parent_authority_digest: "sha256:64cb185b0cd6beff37fcf86b54ba292de3fa2077db08c5153092d29007b57f58"
              plan_digest: "sha256:f16c962b5778732787d80ed90efc37c987cdb8a6165e0d6e7ed443b6674f35ab"
              plan_revision: 2
              record_digest: "sha256:9bb74b4e462e8c8ff5fc4f5549afbfc26955e66a4d1c6c3643b0bbf12ad57152"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:6c909f5286a1980b6ee5dbcfb46c616376fb74227d4a20e31c91ba0ff86f66fc"
              scope_roots:
                - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              stop_receipt_digest: "sha256:7fcaebbd28fd599c5f5eea946d080a8e488f2dcc8291efb08016e7742f55c103"
              task_id: "202610290115-HZ4C0W"
              task_revision: 9
              work_item_id: "publication-base-advance"
              work_order_id: "sha256:fd1be565397e9609c5e2f5bed67d9486c07d075a8537175b0a65eefb32dfb54f"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:dc3c24f1db25169176e719f662473015dc9eb99e0ed92c06406cdb20a734d695"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c17ea2d7e39cd570c487eb8465bd14bffefabc81d6b351e9a68acbb2b69e0914"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b56d8ab23f982b9b78be856b118b2459c8859207176de8a2ac7989a5b85c7a38"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:3c240de86dbb51ec3d006293b32feb2615bf2ce9e53a35d41d352215e058dfd1"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c17ea2d7e39cd570c487eb8465bd14bffefabc81d6b351e9a68acbb2b69e0914"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b56d8ab23f982b9b78be856b118b2459c8859207176de8a2ac7989a5b85c7a38"
              kind: "USER"
              parent_authority_digest: "sha256:dc3c24f1db25169176e719f662473015dc9eb99e0ed92c06406cdb20a734d695"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:2bf476830dd078a6b1e87254a872a38ff11586d2acb968346482237e8ca1b46e"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            request_digest: "sha256:fed03665185de2da0d8c9af33767b93294c69d36f9851e8694a67c95fa09c8e6"
            scope_request:
              attempt: 2
              claim_id: "sha256:8a225db877d616fee9ea4aac8f56b7aff39396b3c85e83bef9e0a5318ad923dd"
              contract_digest: "sha256:433801ee8ce72aaa26be49012c6ee6134d0e654fc8023b080fb84708b3c3e8c4"
              intake_after_digest: "sha256:cd02754b2e091079653af38b575849c6f75e169ef88da6e95d44aa27a9b3157b"
              intake_before_digest: "sha256:9def39c38e913687dcb2574f2105f71d8b570fd566744b3a5b7db2abe5528539"
              parent_authority_digest: "sha256:dc3c24f1db25169176e719f662473015dc9eb99e0ed92c06406cdb20a734d695"
              plan_digest: "sha256:c17ea2d7e39cd570c487eb8465bd14bffefabc81d6b351e9a68acbb2b69e0914"
              plan_revision: 3
              record_digest: "sha256:636828d85c936fa73b48a7ff62f0d89060276f9410b6545c3fe493f839244371"
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:ac7da44ec302b10128fd06fa273bf9f67cf85cd1913a834f75e1cb66622f9318"
              scope_roots:
                - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
              stop_receipt_digest: "sha256:f164a4fc2ca0285234215b838e4c56ee88db2ca6cf1cb85d2b5114d63897d1e1"
              task_id: "202610290115-HZ4C0W"
              task_revision: 15
              work_item_id: "publication-base-advance"
              work_order_id: "sha256:c5092f3768319d2fa264188a77a153dfb22a0d34fa661044e0e3c8771ed1cfe5"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:72942853036cbda4dd387bd7f73af8c981987ec2cde8f71e5567165d954cf51a"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9da2b54630060594a4e22706bbf015c1755a7a6920dc8bc2ee7f59ad742359e6"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:d7989887e040ae8fb15529ec1aa3c44a9abdb43032341c450bd57d190450b189"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:605f86d7bec7f1fdff04e98987812b48f669db41d35cfc4a7009ea54a3611304"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9da2b54630060594a4e22706bbf015c1755a7a6920dc8bc2ee7f59ad742359e6"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:d7989887e040ae8fb15529ec1aa3c44a9abdb43032341c450bd57d190450b189"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:72942853036cbda4dd387bd7f73af8c981987ec2cde8f71e5567165d954cf51a"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
            evidence_digest: "sha256:d7228ad3f9fe64253a2547ec5b6506c83d99e549ddf4db53399e00c623e10809"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:18dcccd3d48176800b20328f6627288f664f81439d97610ba56ad0d591cbaf25"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:9da2b54630060594a4e22706bbf015c1755a7a6920dc8bc2ee7f59ad742359e6"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:d7989887e040ae8fb15529ec1aa3c44a9abdb43032341c450bd57d190450b189"
              kind: "USER"
              parent_authority_digest: "sha256:605f86d7bec7f1fdff04e98987812b48f669db41d35cfc4a7009ea54a3611304"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:b6f0aa76d4b423d36a40bf308f9cd33e4dc36ec8cbc9d1c6130bb9817d2ec13b"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
            request_digest: "sha256:5532276481b536725a9a6dd24320305c509456dc1550a638b1753f5a511751fa"
            scope_request:
              attempt: 3
              claim_id: "sha256:4b1ea1fba3485c8225b8bbaf035b808cb87a4cc874a6dc8f9d793629db4e079c"
              contract_digest: "sha256:820b7ca61616cf68eca928b4af81f7958ece1935bb6362f70ace07e1ba9e7062"
              intake_after_digest: "sha256:07c6cccf3e1768bd3966e2103949f9d3555212813b26d66a47a61998901b73e9"
              intake_before_digest: "sha256:cd02754b2e091079653af38b575849c6f75e169ef88da6e95d44aa27a9b3157b"
              parent_authority_digest: "sha256:605f86d7bec7f1fdff04e98987812b48f669db41d35cfc4a7009ea54a3611304"
              plan_digest: "sha256:9da2b54630060594a4e22706bbf015c1755a7a6920dc8bc2ee7f59ad742359e6"
              plan_revision: 4
              record_digest: "sha256:e947880fce91509af7a29afbe970693360dbd5fa9db8297c7373e68636f6ba26"
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:1af0016a8ded68ae4f7265fe2599ac76b43e71edd6e9622853e805495bd4a410"
              scope_roots:
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              stop_receipt_digest: "sha256:0848708c065419da9da1e213ae560e0001b975b36b5d09df3813fa16bbd42b61"
              task_id: "202610290115-HZ4C0W"
              task_revision: 22
              work_item_id: "publication-base-advance"
              work_order_id: "sha256:6c9278322872f2850e7c739f72cd25d06ba7f3249619327134c38171685ca6dc"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a191a5c54808859f545ea5e033344dc98c8f7c1b8fbc5f858b2deb1663b13c2d"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:b2bbf42d1471d6e5d40233e3983781da366303633b37739b75ffeeac685233af"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:199ba92194af7d92fa880e8ac50b7f1a772b1a13853cc60f65a1153aefb7b5f0"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:12901659f199c37d81f805eb0e2c8c041e6d8defc8b53ef8a178e451e67d619f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:b2bbf42d1471d6e5d40233e3983781da366303633b37739b75ffeeac685233af"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:199ba92194af7d92fa880e8ac50b7f1a772b1a13853cc60f65a1153aefb7b5f0"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:a191a5c54808859f545ea5e033344dc98c8f7c1b8fbc5f858b2deb1663b13c2d"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            evidence_digest: "sha256:805aa0c3c3ca28ecce3d21db2a05cc82b6a53dd35b9da51d76364b84ca796be9"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0628cca08910f74c709bc8bde1f8ce0050de0d010e320c4e1f509461e2fd1def"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:b2bbf42d1471d6e5d40233e3983781da366303633b37739b75ffeeac685233af"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:199ba92194af7d92fa880e8ac50b7f1a772b1a13853cc60f65a1153aefb7b5f0"
              kind: "USER"
              parent_authority_digest: "sha256:12901659f199c37d81f805eb0e2c8c041e6d8defc8b53ef8a178e451e67d619f"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:a35e6860f046423e002d7e99d8ba3a6d984cfeea126787761073a008a9dbf26f"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
            request_digest: "sha256:7e5f62317853fcee1e36611f073165d571fa9ef3cde7847e8192da44fa370c31"
            scope_request:
              attempt: 4
              claim_id: "sha256:e4d80f43f0a4e66f274925a7d84fbde5edeaa4f2226a6e7a1d026b705549cfb2"
              contract_digest: "sha256:c9ee624d1270fec076bd10ca494864c2d973aad384746af0c8448e7114477358"
              intake_after_digest: "sha256:14c3a70975d64233199b6cd63ccc379ac3f0a3789af0d103a0f9b8a9c5cbe643"
              intake_before_digest: "sha256:07c6cccf3e1768bd3966e2103949f9d3555212813b26d66a47a61998901b73e9"
              parent_authority_digest: "sha256:12901659f199c37d81f805eb0e2c8c041e6d8defc8b53ef8a178e451e67d619f"
              plan_digest: "sha256:b2bbf42d1471d6e5d40233e3983781da366303633b37739b75ffeeac685233af"
              plan_revision: 5
              record_digest: "sha256:e33dd6da866400b7eed7ec40d521ac09017acfccbabcd601a241bc7a45c254a5"
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:28b549035741f8e7577b015b8cddab4fb4ac029261f9b605515a3c8563d42b61"
              scope_roots:
                - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              stop_receipt_digest: "sha256:5b53f25ea71b915306c4570a461afa5088b6fac17ea06b5f4cca602491282287"
              task_id: "202610290115-HZ4C0W"
              task_revision: 29
              work_item_id: "publication-base-advance"
              work_order_id: "sha256:2501edf9ceabefdf663bfbb5ca95c3162872113b8c14f5eb7b83f8ff8107b0b6"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:35b9141e584142b9d7f77b39e3e5bb7f42d509b8adcd636a8e5e78df4cec8679"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:48785bb6a373f4474e00bb940e9178853c25e13490f725920501fd73789a1469"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:24c32c6e2f86e2c501969093ac7a1cbbc3388003e3e910dd2ab30c81fc169630"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:c397c357d36b8d06c50d6cae8699fd30591d575e2f3040133a0ebc91c20f3fba"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:48785bb6a373f4474e00bb940e9178853c25e13490f725920501fd73789a1469"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:24c32c6e2f86e2c501969093ac7a1cbbc3388003e3e910dd2ab30c81fc169630"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:35b9141e584142b9d7f77b39e3e5bb7f42d509b8adcd636a8e5e78df4cec8679"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
            evidence_digest: "sha256:def8158a605a21ce11ee215842ae0984a797a033852cca5385e09da20f898cae"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:238e1b5a956ddbe7a91cedecf17a51c222c9c5f71095577b68cb6bf596a06f62"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:48785bb6a373f4474e00bb940e9178853c25e13490f725920501fd73789a1469"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:24c32c6e2f86e2c501969093ac7a1cbbc3388003e3e910dd2ab30c81fc169630"
              kind: "USER"
              parent_authority_digest: "sha256:c397c357d36b8d06c50d6cae8699fd30591d575e2f3040133a0ebc91c20f3fba"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:720ea1c5b57420d756cdd9abc7eff84746d513eefd5e88a6a1be8f05e886b317"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
            request_digest: "sha256:f720ae6b8632c4022989768b3a03e1495859536100fcfc8fe79b5bd5a44fbaa9"
            scope_request:
              attempt: 5
              claim_id: "sha256:1065bd0dbeda02502e63189d24efd03151e629dc1220724dac4fdbde470b68d0"
              contract_digest: "sha256:24ec7098122e7dfb6bc19687f63d3f5b70881698384b71beeb0630f4fca77bfe"
              intake_after_digest: "sha256:45f661c5f85c80e24760e86ff3f8ff6ca254cde68df4f1f1944c12f2e11bebe8"
              intake_before_digest: "sha256:14c3a70975d64233199b6cd63ccc379ac3f0a3789af0d103a0f9b8a9c5cbe643"
              parent_authority_digest: "sha256:c397c357d36b8d06c50d6cae8699fd30591d575e2f3040133a0ebc91c20f3fba"
              plan_digest: "sha256:48785bb6a373f4474e00bb940e9178853c25e13490f725920501fd73789a1469"
              plan_revision: 6
              record_digest: "sha256:3f657d837e11cd6eab09cb6761db78c7a2360d694e0cb056cbc8a8f056fdfc60"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:e6780f988f1640dddbeb8128d1d3598ea199386f84de03900f59fe1e582758b0"
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              stop_receipt_digest: "sha256:27f6212dbe8163f8f548e684f2501aa664bea6cb70b8269458daa393a0c0229c"
              task_id: "202610290115-HZ4C0W"
              task_revision: 36
              work_item_id: "publication-base-advance"
              work_order_id: "sha256:a1568b8a5eaafbf94ef10d8df5b545d95463c69605123de4447371c63f964e8c"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:910bd6f01a881aeb71b0d39c62d3fd44b6a921e88a384649c7662b9dd90689b2"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c34313da99c5ab1f6e5668434ff32153c212a008a71378e5e45513226e943cc6"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5296e357d0a44c8e4517f87749d0e64727a6887a3f6f6732c867b1a5185cb375"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:2ca636b6e2e529fd082a19d0154764a69f6bc85754ae42da7d4ec458777c172f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c34313da99c5ab1f6e5668434ff32153c212a008a71378e5e45513226e943cc6"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:5296e357d0a44c8e4517f87749d0e64727a6887a3f6f6732c867b1a5185cb375"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:910bd6f01a881aeb71b0d39c62d3fd44b6a921e88a384649c7662b9dd90689b2"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
            evidence_digest: "sha256:297d1a8ac3a73ad79f27700c2ee1eded099b93af889f1976ec1cd25495755361"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:17fbc6dd05e0f4723580d5d8ac14e2b6dfcaf6f7b3d1cf02834c2835871e3556"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:c34313da99c5ab1f6e5668434ff32153c212a008a71378e5e45513226e943cc6"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5296e357d0a44c8e4517f87749d0e64727a6887a3f6f6732c867b1a5185cb375"
              kind: "USER"
              parent_authority_digest: "sha256:2ca636b6e2e529fd082a19d0154764a69f6bc85754ae42da7d4ec458777c172f"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:0e787a3b5b2cfdedd3cd0941c452455c40b1dafb35afbdde8d6c7f6b185bc4d1"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
            request_digest: "sha256:3af6d91db823a1a2dc6c9374cd0767d00cc43494c82079323f462791243f9d5f"
            scope_request:
              attempt: 6
              claim_id: "sha256:6d2ea0119ce01f84890353e0e837d02e9f0906c1728131c284295c984a29f4c3"
              contract_digest: "sha256:18f0302b0cf7c22ab0db23c028c9d54665b405cc7997af7e55edaa0b26c94c88"
              intake_after_digest: "sha256:f55d59ff8ef3c23debca424fb6ff728b873f63f714c0e0ff2d783bbb8a3d97cf"
              intake_before_digest: "sha256:45f661c5f85c80e24760e86ff3f8ff6ca254cde68df4f1f1944c12f2e11bebe8"
              parent_authority_digest: "sha256:2ca636b6e2e529fd082a19d0154764a69f6bc85754ae42da7d4ec458777c172f"
              plan_digest: "sha256:c34313da99c5ab1f6e5668434ff32153c212a008a71378e5e45513226e943cc6"
              plan_revision: 7
              record_digest: "sha256:1645cb9ae861efb8e8fde4eea51e0db7c0fa75c0bedde3094a6a647858247c55"
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:4f3a482534db87fc3c34a842e31eb4b2d7c4aaafe6a7ca0426c99111aba0060d"
              scope_roots:
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
              stop_receipt_digest: "sha256:4b634e35686d0b25fa857920cad2eb16709a6810091791f2d337a5558fe8f1eb"
              task_id: "202610290115-HZ4C0W"
              task_revision: 43
              work_item_id: "publication-base-advance"
              work_order_id: "sha256:1392bedff2873eb3555f4040076f22bd53156fd3b0a139fed40f5f2e8a93149c"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f5e8a96f1f8cd5671f58eda0fde24f39bb0ed39d13ad42b8ad2ef6c1798cf317"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17"
            plan_revision: 8
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:61281f4ab9ce50a44d90cefe3c8bf0c57d266ae744bb21bdece0349cedd090c3"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
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
            digest: "sha256:5db9272178a24484a81c043c752ac5dace7fe2c59f03befd5e2fff7baba1dbbd"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17"
            plan_revision: 8
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:61281f4ab9ce50a44d90cefe3c8bf0c57d266ae744bb21bdece0349cedd090c3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f5e8a96f1f8cd5671f58eda0fde24f39bb0ed39d13ad42b8ad2ef6c1798cf317"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
              - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
              - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
            task_id: "202610290115-HZ4C0W"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
              - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
            evidence_digest: "sha256:2c292ca41929dd1a71b662b9518b8880aa94e535c833f74cdd41ed3cea038096"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:61281f4ab9ce50a44d90cefe3c8bf0c57d266ae744bb21bdece0349cedd090c3"
        digest: "sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17"
        revision: 8
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0b93a069a32baf796fae7174e677c2a8d813bf068d2efd7b1edf15f0550c6747"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
            expected_outputs:
              - "publication-base-advance-report"
            id: "publication-base-advance"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:ce94f5c169647a28e120ea32c6adbd760d481eabfd205f375a7e23707f90bc6a"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:598abfe6ac77556fc1b85e0bab5d51cf4c7cc6242b59ff46a6ba5fc6918c9917"
          environment_digest: "sha256:e49126adfffc07e1e2b9ee4dc108ae5e63659139d57578057be9cd40d636922e"
          implementation_identity: "sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
          toolchain_digest: "sha256:3dfe5bf0b88721f6099937c3446d7a7a244c097cb9af78a12aacb4da8a1bbaf6"
        observed_at: "2026-10-29T07:36:32.560Z"
        status: "PASSED"
      id: "202610290115-HZ4C0W"
      intent_digest: "sha256:1c9d6341ee7dce3db0fc899a8e7edda189ed6bb6b52022c610e159f045c6c653"
      migration_receipts: []
      mutation_receipts:
        capture:202610290115-HZ4C0W:
          after_revision: 1
          aggregate_digest: "sha256:92754d21fec3091226907c9e52de3a6454777bb524fa4f8b057764238161db82"
          before_revision: 0
          command_digest: "sha256:fed3a1443ba9cf585f93d918ba70432d711e6fe34eabb360d253961764455257"
          effect_ids: []
          event_digests:
            - "sha256:8ab54799933998a78012d07b0db75b54f2d9ff48fb8e2636092f2dd07b1ee206"
          mutation_id: "capture:202610290115-HZ4C0W"
        final-validation:sha256:313ac4d19dd0c3e64aec37300527d58979282fa665d6e25d72ab5f52c2296134:59:
          after_revision: 60
          aggregate_digest: "sha256:de4b5151a240bda8827a0c1d56a5bb79aef7831ed137ba4dd4279f3a2350c73e"
          before_revision: 59
          command_digest: "sha256:887adceff3d45fa21f84c9c17abd4f0ebcedcbb84cb1baac7e912b9e0de5877d"
          effect_ids: []
          event_digests:
            - "sha256:7e6df87c2606c61eff317ec7dfebfc208a9f5b6ea3d4ca243f175140d2224c84"
          mutation_id: "final-validation:sha256:313ac4d19dd0c3e64aec37300527d58979282fa665d6e25d72ab5f52c2296134:59"
        final-validation:sha256:ce94f5c169647a28e120ea32c6adbd760d481eabfd205f375a7e23707f90bc6a:60:
          after_revision: 61
          aggregate_digest: "sha256:ffbc5c1091164546d5e8e608e69e47a3af0189b8c65624293c0b5e110d9ae098"
          before_revision: 60
          command_digest: "sha256:f16593debf19cd5dfd5a586f25ba07af05fba08ec40fa49ed3f0830b405d0649"
          effect_ids: []
          event_digests:
            - "sha256:4baa0a50924ce338f70320005cba8c378174db99c460ed525cd5646aae4e2226"
          mutation_id: "final-validation:sha256:ce94f5c169647a28e120ea32c6adbd760d481eabfd205f375a7e23707f90bc6a:60"
        kernel_task_completion_required:sha256:e3388c336c1fe2494d7a2173347456e56655aaecfd442c5d6529966b42cf303b:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:
          after_revision: 62
          aggregate_digest: "sha256:6920fa0c02e2b951d4ec3a4f6681b5d96d889daaaac76d1c929831abda59afaa"
          before_revision: 61
          command_digest: "sha256:80e5d72afc60fb9ff817ef2466f23eb47bd2114fb4e05fb5416eaecec0e0144c"
          effect_ids: []
          event_digests:
            - "sha256:190c2ed8d2078be51a65190faedb137e402cebc81bf2d291d0b93795a098e20b"
          mutation_id: "kernel_task_completion_required:sha256:e3388c336c1fe2494d7a2173347456e56655aaecfd442c5d6529966b42cf303b:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        kernel_work_item_claim_required:sha256:0d5f968fd3efeee05844ec5c1479f99e9b384edec4d8e5933ec7bbfe1bebbc57:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985:
          after_revision: 33
          aggregate_digest: "sha256:0438a85e30b68f69839ae57fa6b92c42e82c8c30785a346608da1be48a0f15ce"
          before_revision: 32
          command_digest: "sha256:66203f0766d713bb3e7897cfd460727dd925303e8b254c1cf7a71d7c5b1694ef"
          effect_ids: []
          event_digests:
            - "sha256:72fe324cf5236fba14e144190a95a6915f1daf42a6de8371035dc1861f8fce7b"
          mutation_id: "kernel_work_item_claim_required:sha256:0d5f968fd3efeee05844ec5c1479f99e9b384edec4d8e5933ec7bbfe1bebbc57:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
        kernel_work_item_claim_required:sha256:3c5489adbd533a5a1a650711d258711a860de09c445fe2375029fbf6f77d59b8:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 19
          aggregate_digest: "sha256:211dca7f1e521fa44ef61265338136201aa5fce33f3d5834e787f3b1cd8232f5"
          before_revision: 18
          command_digest: "sha256:dbde186fc28502e8ac3e1524645e6d44ae626dc4abc92364932f0e3e4b56c6e4"
          effect_ids: []
          event_digests:
            - "sha256:9e03f77da5552b183d101efd832549a8bf4ebabf0350d0f4cc07f2faff8bf206"
          mutation_id: "kernel_work_item_claim_required:sha256:3c5489adbd533a5a1a650711d258711a860de09c445fe2375029fbf6f77d59b8:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_claim_required:sha256:5077c3844be561386e7e103651935827df947351d687eef995c5236fd6d6c88f:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165:
          after_revision: 40
          aggregate_digest: "sha256:7ae0c0fba97c4dca2a1b5b65183d0179a200e7c1bb5bf62449e20fe0b4a1ce6a"
          before_revision: 39
          command_digest: "sha256:2a9db52d031b499910bbc02fb93e18f67945ef41512d37189de0166016b2b5e5"
          effect_ids: []
          event_digests:
            - "sha256:c0f7bddef87424866e4d94d1ebc3a517ef2a27a0378aaa096690f30b8760ff79"
          mutation_id: "kernel_work_item_claim_required:sha256:5077c3844be561386e7e103651935827df947351d687eef995c5236fd6d6c88f:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
        kernel_work_item_claim_required:sha256:689e14e307a428c14b9570bf65ef413e7f005efb726f7689567c1ee812a0ca1c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2:
          after_revision: 47
          aggregate_digest: "sha256:b5731e2975616e805812efe96a8462c07193078bea4e34c048124e9899bee35e"
          before_revision: 46
          command_digest: "sha256:ad39ee728ed33e67508b9e797da2338a45f0a3027b306d62426d90b873cfcac5"
          effect_ids: []
          event_digests:
            - "sha256:4c8f491bc0a01feaa94492b1d087b732faefb514a3e13d41043f3e5a709a2a2b"
          mutation_id: "kernel_work_item_claim_required:sha256:689e14e307a428c14b9570bf65ef413e7f005efb726f7689567c1ee812a0ca1c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
        kernel_work_item_claim_required:sha256:7ffc1d9bb584f62f3a4c8a1225936c07609c21e95778605cba1d22b0b151831f:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 7
          aggregate_digest: "sha256:472e2a51faa8bf1bbbead7c23368c7d3f19bcf2ba6910523d8336bca81251ad0"
          before_revision: 6
          command_digest: "sha256:b35f1c7128a4b3c8b4b3e22d8fde0206bf7cf404a0dc5cbb91a73159ea78d80f"
          effect_ids: []
          event_digests:
            - "sha256:597f075decab628623c3e8386ecb815edb0b2367d976611daae3e09370927dfa"
          mutation_id: "kernel_work_item_claim_required:sha256:7ffc1d9bb584f62f3a4c8a1225936c07609c21e95778605cba1d22b0b151831f:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_claim_required:sha256:a8223ce40afb9be97cd0419464618fc63e575a8a7eee0ae407b26c50ed5d390a:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 13
          aggregate_digest: "sha256:0c37b55858ae355d2398f99a9c47790e96629540e052f272d19a7a79f9e0ba81"
          before_revision: 12
          command_digest: "sha256:90bd1191b49528e8ace7c6e3763a61591ba29c61394cfd51129e232ffbb8822f"
          effect_ids: []
          event_digests:
            - "sha256:2dd2648dee0182daffc55a59fedef44d910e4b42d8b5e6bbbd8e57e03cb51072"
          mutation_id: "kernel_work_item_claim_required:sha256:a8223ce40afb9be97cd0419464618fc63e575a8a7eee0ae407b26c50ed5d390a:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_claim_required:sha256:bd50a6f1e4880879d0a963ce1e499fe97cd6fdfd704ed9ae2c7d921a816fa5ee:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c:
          after_revision: 26
          aggregate_digest: "sha256:0cb2144dc6f7752cefc30bab055c469afe1e71b43fa9d9e2a7a211afba4e8883"
          before_revision: 25
          command_digest: "sha256:819706e1eab7fd7d7fbc07cc1c7bb786b1509e3cf3ffc3d667c7fdaf06b51733"
          effect_ids: []
          event_digests:
            - "sha256:9b8b35f6a1c6dc80add4aee3d735e04e57b3475b5f873823f06cddd3664ee66a"
          mutation_id: "kernel_work_item_claim_required:sha256:bd50a6f1e4880879d0a963ce1e499fe97cd6fdfd704ed9ae2c7d921a816fa5ee:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
        kernel_work_item_execution_required:sha256:54f5720b9fa2e8693e693e7efc9bd3c4850a7d0d646def743371c450a0682102:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:
          after_revision: 55
          aggregate_digest: "sha256:061886d5f2797ccdd610be1cd291a8d9c4c668be2b2a336f326c8ac158ee9eb7"
          before_revision: 54
          command_digest: "sha256:2c6df4afb2a53f558c604ab046bfe2081488266aed94dad3ab25c1a49140c656"
          effect_ids: []
          event_digests:
            - "sha256:2ea1f435210ddb5e0e767ce2bd20020e88b2126107619f3eef87e614a9440d0f"
          mutation_id: "kernel_work_item_execution_required:sha256:54f5720b9fa2e8693e693e7efc9bd3c4850a7d0d646def743371c450a0682102:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        kernel_work_item_execution_required:sha256:68b4ce54621041b3b5bdd8cc7254317419f951e88f2cb5486f96cfa35221075c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2:
          after_revision: 48
          aggregate_digest: "sha256:766eafc0b821ef9f60b428d5e236621430972cd5ea3dc5fd12c9d6edb3e43509"
          before_revision: 47
          command_digest: "sha256:bbad115a3f3320371fe04855ebca36661ae8bc0e51838d2c65a9597502f84f60"
          effect_ids: []
          event_digests:
            - "sha256:5da1447a6bc49823b0055f297c37afa0ef6b8d86944774d8f9b289c7b95dae9f"
          mutation_id: "kernel_work_item_execution_required:sha256:68b4ce54621041b3b5bdd8cc7254317419f951e88f2cb5486f96cfa35221075c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
        kernel_work_item_execution_required:sha256:7286122f0c6cff1c09f52a432bd1a6ee17d80b6cad5967b3f08cba298be49b39:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985:
          after_revision: 34
          aggregate_digest: "sha256:9769026787fc7c0c1ac1d32b69ebacee38b6230564ea2e9e16638fd8227311ec"
          before_revision: 33
          command_digest: "sha256:a48c6be6cff24df01ab3c9b41e54102695d9f7805969a53f417a5685e925436e"
          effect_ids: []
          event_digests:
            - "sha256:e19b3d71aba3f7138fe89c38003e7789407abf2ca252598d4329bca4df518a9c"
          mutation_id: "kernel_work_item_execution_required:sha256:7286122f0c6cff1c09f52a432bd1a6ee17d80b6cad5967b3f08cba298be49b39:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
        kernel_work_item_execution_required:sha256:9e68eef1aaa0729c5d165d9320545c712a5b49d389625a273122dde7b6911c98:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 8
          aggregate_digest: "sha256:30c1acc46e1ce002bd1aace079313d187af707bbccbdd2ecd7ad536060c767d5"
          before_revision: 7
          command_digest: "sha256:f89edc289fb983328a0d77ce995a7136a2d82cac7daafedc45e46aff249f725b"
          effect_ids: []
          event_digests:
            - "sha256:b90b0864418f917c2316e7e5602a84214a4404afdefb705205d7754cb8855a8e"
          mutation_id: "kernel_work_item_execution_required:sha256:9e68eef1aaa0729c5d165d9320545c712a5b49d389625a273122dde7b6911c98:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_execution_required:sha256:a27eed70105636a99aab397016c4cd01a8e160260407596b8e7231f4f315f6d2:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 20
          aggregate_digest: "sha256:6ade2a2bf0ab1bce193864b80b7e4835b79646345000bb5e6c0af8bea050d840"
          before_revision: 19
          command_digest: "sha256:7abd2214cd1c0177e639ee528815ec9a3655ee5944433e4c983d8d24768a3980"
          effect_ids: []
          event_digests:
            - "sha256:57b694389a02c4e51a1d54724282a6578d3dcf4c5bef7241553ddcc9b23738be"
          mutation_id: "kernel_work_item_execution_required:sha256:a27eed70105636a99aab397016c4cd01a8e160260407596b8e7231f4f315f6d2:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_execution_required:sha256:a87bc0c092bf64f6bc6b29b7daeb309f6e58ee6c8f0419b581f30caf7998abb7:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 14
          aggregate_digest: "sha256:50622308d430a847ba4ff77afd25556a148f0e60acce8b1cfc81ede9f6e4382b"
          before_revision: 13
          command_digest: "sha256:dec5840585f96cadea6b8fac5c3f2e7cd7f2ca6bb532aa8bf1f742641f66e1c4"
          effect_ids: []
          event_digests:
            - "sha256:e471ce1d42a19b82c790724f0517bcedb30d42bdce4f44f5d827bb2514d9167b"
          mutation_id: "kernel_work_item_execution_required:sha256:a87bc0c092bf64f6bc6b29b7daeb309f6e58ee6c8f0419b581f30caf7998abb7:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_execution_required:sha256:b7086d12b29514ac3f1d1e6ec0c3626204fc5e8f316ab716def233ff1f163e71:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165:
          after_revision: 41
          aggregate_digest: "sha256:bc9be2108aaa43fd1bf50666ec19dcadc0b63efc5b7763f157230573973b4625"
          before_revision: 40
          command_digest: "sha256:349645837b2511223e1e36ff42d4e3c021c1724c7a1cfe3bf9166e763e6a4188"
          effect_ids: []
          event_digests:
            - "sha256:3fcf34702f5e8c17f8de5ea92e69ff19b6f490809223604e8917940cea3c3243"
          mutation_id: "kernel_work_item_execution_required:sha256:b7086d12b29514ac3f1d1e6ec0c3626204fc5e8f316ab716def233ff1f163e71:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
        kernel_work_item_execution_required:sha256:c79e309c65db8d9df7a3ccdddc84b7adbeb21d8b34c54a9f8f0d2908ebb3e391:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c:
          after_revision: 27
          aggregate_digest: "sha256:c5f7324e157b77e74fb32d09d67ec6a546bf2cf14148796cc01e54a52b8ab58a"
          before_revision: 26
          command_digest: "sha256:ee4200ca1540378616d7d5443e17f4ef95e63c5b746a275ea53172c33bfb90c5"
          effect_ids: []
          event_digests:
            - "sha256:a85e8c53d5cb13d5205e0a93214f948c052d891941cda3a3ba7b6ba8c417833e"
          mutation_id: "kernel_work_item_execution_required:sha256:c79e309c65db8d9df7a3ccdddc84b7adbeb21d8b34c54a9f8f0d2908ebb3e391:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
        kernel_work_item_inspection_required:sha256:4f0c8926c4edabebdb9d4b8e9618be1f91a412fb9755d13dc5ba551f5137c456:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:
          after_revision: 57
          aggregate_digest: "sha256:01d7eec12f5c367cb6802ca85ee099df929d7276eff2d6eb065028d6afdaade5"
          before_revision: 56
          command_digest: "sha256:08dcd99bf34d069a705e35c691dab56675212f203476ab20af74155012e93711"
          effect_ids: []
          event_digests:
            - "sha256:68273d558f909a8cd7b54a5b484f01efba7fbd06f38e60ca6ade4d0a7605a5d2"
          mutation_id: "kernel_work_item_inspection_required:sha256:4f0c8926c4edabebdb9d4b8e9618be1f91a412fb9755d13dc5ba551f5137c456:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        kernel_work_item_inspection_required:sha256:f21c58be336ce8357ba63a49fcacf2b112be3bd05d2acc3b642507588738fdaf:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:
          after_revision: 51
          aggregate_digest: "sha256:630ca0177a9e9739c847d74a444256505f4a378d523891c711765ab5e91e0b12"
          before_revision: 50
          command_digest: "sha256:83ce27a94849a3b4b0e5ded17028c2fbeccadd0f97aa6a4dc5ad8a03a729434e"
          effect_ids: []
          event_digests:
            - "sha256:589bcf130f56ad4fbf599a114bb0039cbc3c7066cd87cafb4f305b43f8b2c963"
          mutation_id: "kernel_work_item_inspection_required:sha256:f21c58be336ce8357ba63a49fcacf2b112be3bd05d2acc3b642507588738fdaf:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        kernel_work_item_materialization_required:sha256:0d990835596b6d22bf5cd2a411e898da22c610297f959c921e1125aa43173ac6:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:
          after_revision: 6
          aggregate_digest: "sha256:3a7227f0181c931d54fed2625caab5393049ceecfc53c221e696fb7449d3f3e6"
          before_revision: 5
          command_digest: "sha256:073078cd7934f744868299f0b40a43645ef61c45bf029bf896f476b184eb0e29"
          effect_ids: []
          event_digests:
            - "sha256:360df23ed5d6d2d0b6ce6edbdfed240a5b297016dc9a7f42928be19b7c913aee"
          mutation_id: "kernel_work_item_materialization_required:sha256:0d990835596b6d22bf5cd2a411e898da22c610297f959c921e1125aa43173ac6:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        kernel_work_item_rework_claim_required:sha256:71073fdd890a9fc7f315e5c8c079936df79947d899d90cb21ed973ac49eadfb7:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:
          after_revision: 54
          aggregate_digest: "sha256:7d231b5d88205156d89c26b6c7b01986292808e222412befbd1952fbe2b680ad"
          before_revision: 53
          command_digest: "sha256:ed2237197c88dea0c54c0b71bf5a332f7471fbdaa8e2e4e12f2bb6c574aec540"
          effect_ids: []
          event_digests:
            - "sha256:3339dafca07e9114f1428393945aff176db829b1689d2909a918f0f8cfd17e1f"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:71073fdd890a9fc7f315e5c8c079936df79947d899d90cb21ed973ac49eadfb7:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        reject:sha256:a7e4b39cd358feeb46286b690e899df11c52947e64c4b8d078f2b036cdb7aa45:
          after_revision: 3
          aggregate_digest: "sha256:251ed4aa264ff3a486471d6285e32638fd30a5e6ee9611798d268f86a95a78e9"
          before_revision: 2
          command_digest: "sha256:94e0700ea905e0047e9216cb7b42acd3db6b2a40252e7f99efc3bb04d16e2bd3"
          effect_ids: []
          event_digests:
            - "sha256:5e374cbd8fd9dafd8068857a4b909d80f319ed71f0f2a9e8efeef78b8b8db3ff"
          mutation_id: "reject:sha256:a7e4b39cd358feeb46286b690e899df11c52947e64c4b8d078f2b036cdb7aa45"
        result:sha256:3734a042e159df2a4da76eb3089f7595e77acd3addc59dc19f18a7e08a3f7790:
          after_revision: 4
          aggregate_digest: "sha256:6792ac2e32eb3b44e1f7a4ee3c6f0f875a75dd356d435bf9eede91d259893d6e"
          before_revision: 3
          command_digest: "sha256:b1220ed9fe6849907e1c5eefc3b85c4ab644dceb62c97e7ac165a521128bbd80"
          effect_ids: []
          event_digests:
            - "sha256:ada79947d9f605f6e6d86a0bbf1e98e7d2e587cbf4fe207d1d3696a85c00bbb5"
          mutation_id: "result:sha256:3734a042e159df2a4da76eb3089f7595e77acd3addc59dc19f18a7e08a3f7790"
        result:sha256:46ed42e0a256c789bf3749ef8b64616ffdaff0c4b7e9a63b00aee3559959cdd7:
          after_revision: 24
          aggregate_digest: "sha256:dfdc2c0e1dd4e2ced2b18a300695ef7afd487a6f5613b2aa64cf1e430f278fd0"
          before_revision: 23
          command_digest: "sha256:9eaa2e71589571716fadd70db8a3e44edd3bcb97561e04f587b64fbcaadec622"
          effect_ids: []
          event_digests:
            - "sha256:46f84dee19fc60260b3548fa7084c7374f1fc7598707f68ead47c042bee819ad"
          mutation_id: "result:sha256:46ed42e0a256c789bf3749ef8b64616ffdaff0c4b7e9a63b00aee3559959cdd7"
        result:sha256:470a11a2f7c024aa4e19d47fd23cb53c903172291276ce6bf042a7727584cc0a:
          after_revision: 17
          aggregate_digest: "sha256:64fe5f3ec8c615477adc0580212d7bfe75f1e2c56217e983bc12036e8c51d0a1"
          before_revision: 16
          command_digest: "sha256:267fe45cc64e140d2f05a0ac847161e2a30eccb28d151f99243e99348f208543"
          effect_ids: []
          event_digests:
            - "sha256:ac23b8af193c0175435251dfea4e2a9793b9263e2092c6d7b6b8b3efa75b8fc2"
          mutation_id: "result:sha256:470a11a2f7c024aa4e19d47fd23cb53c903172291276ce6bf042a7727584cc0a"
        result:sha256:480dd08e61598fc3448bd7e8780c1dfbbd7ef75c6c7acca68b0dba1fdb2c53af:
          after_revision: 31
          aggregate_digest: "sha256:a7b4d38da07659a3917c31a8b547a566bb7855d8ced50a216fb8109078563819"
          before_revision: 30
          command_digest: "sha256:cd2a63bfce1debd815d383273aa427a9e51cca5bacb21e4dc3a8d8c50002cd44"
          effect_ids: []
          event_digests:
            - "sha256:645f8a507942ed025e231a2ceee8ac8cac6d821ee698dbe376dda14881ca2030"
          mutation_id: "result:sha256:480dd08e61598fc3448bd7e8780c1dfbbd7ef75c6c7acca68b0dba1fdb2c53af"
        result:sha256:4911be6daf0eaad8a65015df57c1da74a6b6aeef118a3f2fb5839cf47c47a5db:
          after_revision: 56
          aggregate_digest: "sha256:17a3aed42881150e7712f44fe324085bb7e6206156c1c0e77faa370ab952c667"
          before_revision: 55
          command_digest: "sha256:5879035fe6d13629b2f807ae3c09756efdb9c446101d9b5d7115f11609b29edf"
          effect_ids: []
          event_digests:
            - "sha256:cf85d2bfd5f1552fd2ae21a7787383b624fd090f19b32d2b36d6d11c8ba705ac"
          mutation_id: "result:sha256:4911be6daf0eaad8a65015df57c1da74a6b6aeef118a3f2fb5839cf47c47a5db"
        result:sha256:98f160e0cefdbda426740ebb431c6a627ba85aaf1f41196c7163b2f53194c98c:
          after_revision: 2
          aggregate_digest: "sha256:b44a76b9e00aca847259589610fb99f51bcdd8510947ad5c2819a36731e5e90a"
          before_revision: 1
          command_digest: "sha256:e4376539b711ec43afb9fc618525db07aac846e137646af75673ffa8f94b8868"
          effect_ids: []
          event_digests:
            - "sha256:31b5e394f763a0f2794fbb9c59f6e83fa90cdfc0d858123d392b3851264a652f"
          mutation_id: "result:sha256:98f160e0cefdbda426740ebb431c6a627ba85aaf1f41196c7163b2f53194c98c"
        result:sha256:9df589967936474abd8bd06cbbf73e26152f4d2cdea35c796337b6cc8c89d21e:
          after_revision: 11
          aggregate_digest: "sha256:a78c75169eca7195083ebb16de3618c3c867df06e5343ed32017251189f7889e"
          before_revision: 10
          command_digest: "sha256:9caaaa7a0926bdc943aed855f072748979ae3d310ace1863ccad2fb1d2fb3204"
          effect_ids: []
          event_digests:
            - "sha256:3dd51a0a7cdbf4c0e2967822abac4ebe120ce53764c651a17a7eef4214fed969"
          mutation_id: "result:sha256:9df589967936474abd8bd06cbbf73e26152f4d2cdea35c796337b6cc8c89d21e"
        result:sha256:aba575bbd47ade3a7efa0d47ac70fb7e1c2ca463983cbf8243ec09b02884dcb5:
          after_revision: 38
          aggregate_digest: "sha256:50106515d955cd3fce3b945755188ab8cbb4997a873ff95ed2f203bb611e1e08"
          before_revision: 37
          command_digest: "sha256:8a85418081a0d45a644f6529c4083eb6ebcbfb247cc613fbcc7c4c878f411d27"
          effect_ids: []
          event_digests:
            - "sha256:bd3c564392734d87920fc7766d47ca1cc17998ec76bdf218a52ef8fe599d21e0"
          mutation_id: "result:sha256:aba575bbd47ade3a7efa0d47ac70fb7e1c2ca463983cbf8243ec09b02884dcb5"
        result:sha256:acceb9ba5b6d38c72fc315478acf866cb7fd445887923ad1626f72a0ffc65ffb:
          after_revision: 45
          aggregate_digest: "sha256:ebf3fa23b162306a781c5623f72104437339ec25c51de18f84167bfb1b677246"
          before_revision: 44
          command_digest: "sha256:ccd96d6738efc45bbb4d0c56c19f6649f17eba7fa9b00a2fe74bc810e8ab2d30"
          effect_ids: []
          event_digests:
            - "sha256:f02d7388fd15a400028c1c8c32b37d708c0a888e4fb459188dc4dbf8aaf0fb8a"
          mutation_id: "result:sha256:acceb9ba5b6d38c72fc315478acf866cb7fd445887923ad1626f72a0ffc65ffb"
        result:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe:
          after_revision: 50
          aggregate_digest: "sha256:72fdfb173b2c897f99434a41afe01f16dce28b958be1be60bd19fa074f753812"
          before_revision: 49
          command_digest: "sha256:ba8be4c33f9fe3aed296015d2dfc8a2c4c75f3685f791a18d322476fb75e51b4"
          effect_ids: []
          event_digests:
            - "sha256:ed0bf1f901f1ddba7d68e6519c5ad3c81057c28a32cad9bddd4fea15e3e40e3c"
          mutation_id: "result:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe"
        scope-request:sha256:3af6d91db823a1a2dc6c9374cd0767d00cc43494c82079323f462791243f9d5f:
          after_revision: 44
          aggregate_digest: "sha256:234308c3d53a790275ed5141b0fe0962969c710e39e23365284173a5736b4e23"
          before_revision: 43
          command_digest: "sha256:ea4dd44d046fbed17b68d9b99a8e651e8af887008723275ca0780c61c40515ce"
          effect_ids: []
          event_digests:
            - "sha256:01aec934ee95c2ef173356feb91626ae3cdc3c92839ae5e3d1e827eae9db2161"
          mutation_id: "scope-request:sha256:3af6d91db823a1a2dc6c9374cd0767d00cc43494c82079323f462791243f9d5f"
        scope-request:sha256:5532276481b536725a9a6dd24320305c509456dc1550a638b1753f5a511751fa:
          after_revision: 23
          aggregate_digest: "sha256:757ed23dfec0b925637e1e60ec71ecfba28e7eddfebcc8c959da334d1d535322"
          before_revision: 22
          command_digest: "sha256:86a48f76c9ea473b2e57972ce230c94abcfec841aa5f87f8672369086046318c"
          effect_ids: []
          event_digests:
            - "sha256:818c9a57a2b8105ad0bf406ca5cabf23e5ed5a3e1eae054a25133507764ab753"
          mutation_id: "scope-request:sha256:5532276481b536725a9a6dd24320305c509456dc1550a638b1753f5a511751fa"
        scope-request:sha256:7e5f62317853fcee1e36611f073165d571fa9ef3cde7847e8192da44fa370c31:
          after_revision: 30
          aggregate_digest: "sha256:e9b69de6c0b5898a77fbf1d7a22ba23e5c37fcda8738a912c210c5cbbde8b8cb"
          before_revision: 29
          command_digest: "sha256:91357e6932f4ea03b709e784fd6ece0a291dc95f8031429c7e4c28632dca6319"
          effect_ids: []
          event_digests:
            - "sha256:4705e232587b6032b0bb6891f34654ff8834f5f091f79c7446a7154ba9404c1f"
          mutation_id: "scope-request:sha256:7e5f62317853fcee1e36611f073165d571fa9ef3cde7847e8192da44fa370c31"
        scope-request:sha256:ee7e9d0d259577a093f535b100a628cd0e41e50b9d142c0b88c98972f46e69f5:
          after_revision: 10
          aggregate_digest: "sha256:5f9c351b8539c1cde6cfcc336b54edae9b2fef307b4dcda74542c1d2535731de"
          before_revision: 9
          command_digest: "sha256:f860ff4d18aab8871a25bef6422115782103a721f040220d336e44d2b9a61712"
          effect_ids: []
          event_digests:
            - "sha256:e6631bbaf2c7cdcab4720bc299ab770ef4a0a5c9e3d7269728eef342ee6b559e"
          mutation_id: "scope-request:sha256:ee7e9d0d259577a093f535b100a628cd0e41e50b9d142c0b88c98972f46e69f5"
        scope-request:sha256:f720ae6b8632c4022989768b3a03e1495859536100fcfc8fe79b5bd5a44fbaa9:
          after_revision: 37
          aggregate_digest: "sha256:a7278085446d37ecac8f897b7d87cacc8098e66225c94caafce34f04f69f3b8e"
          before_revision: 36
          command_digest: "sha256:1f863f1cfcaec7c6b00652d9b379761130a5b69f4f179dcc291f0afe2b93c872"
          effect_ids: []
          event_digests:
            - "sha256:f264aaef5e17d644b1f807a94bd8474c926c0ab568e4553f52b97ef9baf094d0"
          mutation_id: "scope-request:sha256:f720ae6b8632c4022989768b3a03e1495859536100fcfc8fe79b5bd5a44fbaa9"
        scope-request:sha256:fed03665185de2da0d8c9af33767b93294c69d36f9851e8694a67c95fa09c8e6:
          after_revision: 16
          aggregate_digest: "sha256:c61993bacbc8e982278edf187affd4f46de508a799ffbeb02b2b4f096e7385ee"
          before_revision: 15
          command_digest: "sha256:baee9f7d2d4dc76595a433fbf6f76bf1227d69d2494fb34eabd9b8f12a1ba866"
          effect_ids: []
          event_digests:
            - "sha256:79998ef6dcee918691f6e8e3894080a62ff810fd2683ba71ad321fabdc87a0d5"
          mutation_id: "scope-request:sha256:fed03665185de2da0d8c9af33767b93294c69d36f9851e8694a67c95fa09c8e6"
        semantic-stop:sha256:1392bedff2873eb3555f4040076f22bd53156fd3b0a139fed40f5f2e8a93149c:
          after_revision: 43
          aggregate_digest: "sha256:f7ac1826d78b601d5ccedddaad544a2bd9f46580dcda70564630149abed1c807"
          before_revision: 42
          command_digest: "sha256:f17cd8119decc8129f8beb26093c9a4c9144ce8e66754081241a0f29dc7e8cbe"
          effect_ids: []
          event_digests:
            - "sha256:4f155cd9ce167edca1e171e9bbbb068e34ced808d2f7ab518fa81d8d1cb281dc"
          mutation_id: "semantic-stop:sha256:1392bedff2873eb3555f4040076f22bd53156fd3b0a139fed40f5f2e8a93149c"
        semantic-stop:sha256:2501edf9ceabefdf663bfbb5ca95c3162872113b8c14f5eb7b83f8ff8107b0b6:
          after_revision: 29
          aggregate_digest: "sha256:2d8a27b327ea743b1eef3883691558a425d83308d8477948f89199f67408b4f3"
          before_revision: 28
          command_digest: "sha256:1f1401827c06ccb9182d80877667b48450d2e2dbed2a85f5c09f0433e252be06"
          effect_ids: []
          event_digests:
            - "sha256:67492745d3eec22669fe07c81cf647c0c659f6e393f081bc13a1e7dd2610977a"
          mutation_id: "semantic-stop:sha256:2501edf9ceabefdf663bfbb5ca95c3162872113b8c14f5eb7b83f8ff8107b0b6"
        semantic-stop:sha256:6c9278322872f2850e7c739f72cd25d06ba7f3249619327134c38171685ca6dc:
          after_revision: 22
          aggregate_digest: "sha256:2634d29de8b99b75a33092c3c305f42360aa712e310c7ac4599a37af3b3604a0"
          before_revision: 21
          command_digest: "sha256:49a7b4c550c52f6e5981cd192d8dd03601628f0194e0c33372dce96129af965e"
          effect_ids: []
          event_digests:
            - "sha256:dd5b1dc1e5c195cf30ad0d51f4d261880993d23b91144654be4f3ac7c3d63da6"
          mutation_id: "semantic-stop:sha256:6c9278322872f2850e7c739f72cd25d06ba7f3249619327134c38171685ca6dc"
        semantic-stop:sha256:a1568b8a5eaafbf94ef10d8df5b545d95463c69605123de4447371c63f964e8c:
          after_revision: 36
          aggregate_digest: "sha256:6ea6c138a24df25811e9235395ce2d435616b3753d3051a32e0196c7de3b9c4e"
          before_revision: 35
          command_digest: "sha256:62834578b55c3fcda8546388c829c571dc7764a9cce6e4a1b203c45d41f347f7"
          effect_ids: []
          event_digests:
            - "sha256:df6ddafc9c907951a2c211086af1e52a3dfc24b90911077d0a7b8c58b23cf530"
          mutation_id: "semantic-stop:sha256:a1568b8a5eaafbf94ef10d8df5b545d95463c69605123de4447371c63f964e8c"
        semantic-stop:sha256:c5092f3768319d2fa264188a77a153dfb22a0d34fa661044e0e3c8771ed1cfe5:
          after_revision: 15
          aggregate_digest: "sha256:15228daaac6dbb9122630ac70fac26a6833e46ec83bfa17c3917b583dad42ad0"
          before_revision: 14
          command_digest: "sha256:e35953097b1fe227625a06c61a696f3b3a3cf4173ff7b3dd6f04c1ad5380f8ac"
          effect_ids: []
          event_digests:
            - "sha256:29714e3c46f7d542a7d396f55755982d4e5eb3f2f583b800aedd3addd10eb9e6"
          mutation_id: "semantic-stop:sha256:c5092f3768319d2fa264188a77a153dfb22a0d34fa661044e0e3c8771ed1cfe5"
        semantic-stop:sha256:fd1be565397e9609c5e2f5bed67d9486c07d075a8537175b0a65eefb32dfb54f:
          after_revision: 9
          aggregate_digest: "sha256:d9916978557b6c2e62c7a2073a33b582573609bbdc1c2ca66a19b0146162e035"
          before_revision: 8
          command_digest: "sha256:c4270644e6d777b25bcdbfc5aaf635e2890e00cc1b8c58c32a2b452e9fe6558e"
          effect_ids: []
          event_digests:
            - "sha256:4a31a9b89c1b0871f4736d2985813dc13801aba555da0e6562caa674ec6d2d0a"
          mutation_id: "semantic-stop:sha256:fd1be565397e9609c5e2f5bed67d9486c07d075a8537175b0a65eefb32dfb54f"
        sha256:115bb7d71369d5667d895a67e1a26f10bc0aab15ca1501f06b32111e26e70c27:
          after_revision: 25
          aggregate_digest: "sha256:f89005d38a6f66a12c1d8f36a7f95531f537bdda40a5d1d7c847d26ba3c5d787"
          before_revision: 24
          command_digest: "sha256:2fa2cddddce68e7a3e002bbfebf7ae42cd5e9cb9f0edaa731fb0234a47492688"
          effect_ids: []
          event_digests:
            - "sha256:ad8f7992d25d3a19326bda6823df087b73218b69d4d7e6c5a6417c955a678cdc"
          mutation_id: "sha256:115bb7d71369d5667d895a67e1a26f10bc0aab15ca1501f06b32111e26e70c27"
        sha256:5262e4b20fd185738740eef2ff07646db040c77e4a0c13b8e3d54f34e1cfebdc:
          after_revision: 28
          aggregate_digest: "sha256:e06e214dc1dd7d9b0763562f3530a64fe2a909ba92686db783998c5b9fe61d3a"
          before_revision: 27
          command_digest: "sha256:3f80b0f0149853b41a04bc4b5d4ac6f4c50fb410e85cb07c9df197f331fbed06"
          effect_ids: []
          event_digests:
            - "sha256:c7f91c1f47742a02fbd8b2d0d1579c2d4c2057b8c56bc29e65923c8277a8c090"
          mutation_id: "sha256:5262e4b20fd185738740eef2ff07646db040c77e4a0c13b8e3d54f34e1cfebdc"
        sha256:60de23650542106806a07f68e814d4b058aaf77cc568c2961c8f742e3605bedd:
          after_revision: 42
          aggregate_digest: "sha256:52d65f9797511aad83c2e64cf0ca3fd1c5c0d1d7259c512174f23b0c062e6836"
          before_revision: 41
          command_digest: "sha256:b1881557448e49ef0534b3d1d3a226da7a1d39b6853d5e96e560cd489ec49649"
          effect_ids: []
          event_digests:
            - "sha256:ed7aeba3a3ee44fb6bd9299f1c63266a3d1cd160597e9774d7314635033a7963"
          mutation_id: "sha256:60de23650542106806a07f68e814d4b058aaf77cc568c2961c8f742e3605bedd"
        sha256:60e3e539c4c09bf098c045814ce5a8d11fa6cd6a541cd942dea61100af9359d7:
          after_revision: 39
          aggregate_digest: "sha256:41259cad6b415cd707980404d3dbc500e88c8f5089bdb738e9c661b5454ebcd3"
          before_revision: 38
          command_digest: "sha256:14a52f06752d44136365888a161a74e4962cfb8e06599caf067eb845e30a5afe"
          effect_ids: []
          event_digests:
            - "sha256:15637ba4a82b091acb68afe7f4555e329195765921b167b9145f73f806bf1f83"
          mutation_id: "sha256:60e3e539c4c09bf098c045814ce5a8d11fa6cd6a541cd942dea61100af9359d7"
        sha256:65d4f36a59e21798768f14937c6e9be09f220582f6c55342372d9c8a5b11dff4:
          after_revision: 5
          aggregate_digest: "sha256:8899b8d42f665d812630ee58ab05dfc5c5ddef71798f5c15ffa7b6c499a5b1b5"
          before_revision: 4
          command_digest: "sha256:9835e63cc8a59f709c960d12fe04d44c0d43ef526eaee6a2584a2f65a980df09"
          effect_ids: []
          event_digests:
            - "sha256:c992e5f12e0cb994d144b661b696f8bee05fe79a69add76ddbaa4a4c083a0b5a"
          mutation_id: "sha256:65d4f36a59e21798768f14937c6e9be09f220582f6c55342372d9c8a5b11dff4"
        sha256:6669c8441141a910e5edaa5193c4d762f51058c4f653600378d09267f7559b66:
          after_revision: 32
          aggregate_digest: "sha256:2ae6e21a3b5f87699b5019568d7878ed6b270653fe41156806f21b56bfde9773"
          before_revision: 31
          command_digest: "sha256:32e4d9b6806563bbc1b8dac815d12bfd2a10bfaccca5918430c72ee16ea5e360"
          effect_ids: []
          event_digests:
            - "sha256:213f2c6b1ed56fc99dc3632df41a8f0d81c68231fb19f0b9d1d36895eca9d8de"
          mutation_id: "sha256:6669c8441141a910e5edaa5193c4d762f51058c4f653600378d09267f7559b66"
        sha256:6e590f0890468c5e066a5b314eed359001d39c1c4597ff1de2e902d203b358dc:
          after_revision: 21
          aggregate_digest: "sha256:f44f772a3932efcfc9950beb528be19d6da15222fac7fdb6a7345b7d14e11b89"
          before_revision: 20
          command_digest: "sha256:f6463d79b720b779684d4873176aa856c69283f7761844ac72045a318c584a62"
          effect_ids: []
          event_digests:
            - "sha256:4249516bae9bf97d6fd8c7028409e8756760eae6722ca0e525954049c527dfc2"
          mutation_id: "sha256:6e590f0890468c5e066a5b314eed359001d39c1c4597ff1de2e902d203b358dc"
        sha256:7bf564b98ca36459f04e9e73a6f977d37c3ffd588a7f8e4c4c933c170ceb4adb:
          after_revision: 35
          aggregate_digest: "sha256:2672342dd1b293ef19055ad12a6de80e4bf4d1eb0f8532083ba5924467e2f0d7"
          before_revision: 34
          command_digest: "sha256:111de501fac432125855584e34922c4aa89693aacdcf15dffedd47b3f251f918"
          effect_ids: []
          event_digests:
            - "sha256:0f39a788f9a9f06bacfd945061b5509e1a4b56570238c815494b3d29f8fe896f"
          mutation_id: "sha256:7bf564b98ca36459f04e9e73a6f977d37c3ffd588a7f8e4c4c933c170ceb4adb"
        sha256:a2355827f4b05d1c55c81a650798cd340fce7e8117d654e2d000b8943dc392f7:
          after_revision: 18
          aggregate_digest: "sha256:c2c568f59bc04697534476788b5d6226e7bae7768d38b91fc728002da7358527"
          before_revision: 17
          command_digest: "sha256:f6f327463778ed6c0989893d330805d2a11093bc561cb61ae7f6bcc44a73e3e3"
          effect_ids: []
          event_digests:
            - "sha256:33dcd7108b5b87ed3e5b632e7f4cf81fe50bd66d1414b11ee17e4dd63f9d3625"
          mutation_id: "sha256:a2355827f4b05d1c55c81a650798cd340fce7e8117d654e2d000b8943dc392f7"
        sha256:d7e2558c2e4c48ae0f3fc2490cb7331c6b386beb137d25d3a56fa19b0ab8ff60:
          after_revision: 46
          aggregate_digest: "sha256:4e43dfb39ecc37c3460dfb51d7e398e768cacd06295aa87aca28e215797af764"
          before_revision: 45
          command_digest: "sha256:00e18228f45b400f23995c846028a6e1e610753dee22678692685d6152f94a9a"
          effect_ids: []
          event_digests:
            - "sha256:24a652d83a3c57f3136ab5c8b315cf5065d1e625d9a6cba6e40070c87afb6726"
          mutation_id: "sha256:d7e2558c2e4c48ae0f3fc2490cb7331c6b386beb137d25d3a56fa19b0ab8ff60"
        sha256:ef23f6010e3914c561afd02d2a45e41175c02c39e7703a3e526f5079b277bd5b:
          after_revision: 49
          aggregate_digest: "sha256:f9536d82765d90d280198f96e3abbbabc38970c3a97fa34c81e2885827d58b11"
          before_revision: 48
          command_digest: "sha256:26a08fab2722a98b6b4f99af4f503f19c7e3326ba111a3d52e82c33c76f89fb5"
          effect_ids: []
          event_digests:
            - "sha256:1b1049e6f0b4013aee71d50a9e2f42d9470bee6e386a2f078fd01ff395639908"
          mutation_id: "sha256:ef23f6010e3914c561afd02d2a45e41175c02c39e7703a3e526f5079b277bd5b"
        sha256:f7ee0efca82a55a0199d2eab173d1366b3cc8b36cb19ed914c8cc5fb11f6a673:
          after_revision: 12
          aggregate_digest: "sha256:e598410bf7e205054f1b9f8a6837468296ec712f0a42f67df527c1a6253fd74a"
          before_revision: 11
          command_digest: "sha256:3cd305995a04758e4626efd75b119e0774690353d1f5953f417a5111d4cc10dc"
          effect_ids: []
          event_digests:
            - "sha256:e904b8c7aa5b239eb1e11e48fa9b07af75dcbc3dce39a449036df1d590088b3e"
          mutation_id: "sha256:f7ee0efca82a55a0199d2eab173d1366b3cc8b36cb19ed914c8cc5fb11f6a673"
        validation-resolution:sha256:2876119731236c20ad9ef0d5d4fe62f1da1bcd7c00c3ed76557fd35527301b99:
          after_revision: 59
          aggregate_digest: "sha256:a7a3f7871c283c80ed03a2ab89c1bb55eef0d89c7fe66f38591b5c6b9e752dd8"
          before_revision: 58
          command_digest: "sha256:d7fc1344860ff34fd28278aeef2947e3583ec04648bb72b04b6ff9ecb4c85b8a"
          effect_ids: []
          event_digests:
            - "sha256:b7a01ca3d79958aaecd7f452d1e50d986793698a6c4d19e53808ced097f31b74"
          mutation_id: "validation-resolution:sha256:2876119731236c20ad9ef0d5d4fe62f1da1bcd7c00c3ed76557fd35527301b99"
        validation-resolution:sha256:ec8aea2c6a1e4d5565700b764d1b936715ac65c386f9d70e678bac8ca9153c45:
          after_revision: 53
          aggregate_digest: "sha256:281f87b66c8111d73db1232da7fdd7549dcce52625a110dcebab9b748716fe57"
          before_revision: 52
          command_digest: "sha256:092a49ab5e0d3ab2ce4137ec2f8c1e3af67b8292ba0140c05580c84b48275d5b"
          effect_ids: []
          event_digests:
            - "sha256:3ec0267610804422b208894eeee6644c56f2f54f5d0eaa63266a248d9111dc15"
          mutation_id: "validation-resolution:sha256:ec8aea2c6a1e4d5565700b764d1b936715ac65c386f9d70e678bac8ca9153c45"
        validation:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe:
          after_revision: 52
          aggregate_digest: "sha256:02a6c69fd770428efa070a09924edacfe0d19ab76618711d15b66298a1f9254b"
          before_revision: 51
          command_digest: "sha256:77a9696369d0fc6248e8c649fdf95e16328b1d0bc06ec4d6aee95e17253cde70"
          effect_ids: []
          event_digests:
            - "sha256:7265b81217fcc97af4bfbbacc8ce0f7359f58e420896b2d159938dc73bb3f391"
          mutation_id: "validation:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe"
        validation:sha256:f52b61672dd39d991a0bb14c15a48f4167da74a257875dbb7eda819a2ec89737:
          after_revision: 58
          aggregate_digest: "sha256:a01d6ea510eebfb351f6ee88c4b6b4f3ced604ef5e64522281ab63c2f5ed5ea7"
          before_revision: 57
          command_digest: "sha256:a96a9926a5115682ba92ac4f6f230cd173afdaa9f2f3f5a5a94881d430125772"
          effect_ids: []
          event_digests:
            - "sha256:a54a2653988e61e3613dde3fe6dd6bdcb34b6dde6d3ccfa4f28682cc4a74494b"
          mutation_id: "validation:sha256:f52b61672dd39d991a0bb14c15a48f4167da74a257875dbb7eda819a2ec89737"
      plan_history:
        -
          approval_actor_id: null
          approval_evidence_digest: null
          digest: "sha256:24cdfa034ebaa53670eb711642bae478a51ba9c0308f440b85720581dbe7e39d"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:91856b1a0ebf95d8425154baf31f8c3e485ccddf148317cac686c1ff10779c36"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:301cc8d6c62fa5e41a5cfe2aa5b4c233a85c7ffcf2580a9d727cea570e663451"
          digest: "sha256:f16c962b5778732787d80ed90efc37c987cdb8a6165e0d6e7ed443b6674f35ab"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:c3267885595013fecfdf8826fd63d79af75136fde68ee2a4662e80fba978c5cc"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:b56d8ab23f982b9b78be856b118b2459c8859207176de8a2ac7989a5b85c7a38"
          digest: "sha256:c17ea2d7e39cd570c487eb8465bd14bffefabc81d6b351e9a68acbb2b69e0914"
          revision: 3
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:433801ee8ce72aaa26be49012c6ee6134d0e654fc8023b080fb84708b3c3e8c4"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:d7989887e040ae8fb15529ec1aa3c44a9abdb43032341c450bd57d190450b189"
          digest: "sha256:9da2b54630060594a4e22706bbf015c1755a7a6920dc8bc2ee7f59ad742359e6"
          revision: 4
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:820b7ca61616cf68eca928b4af81f7958ece1935bb6362f70ace07e1ba9e7062"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                  - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                  - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:199ba92194af7d92fa880e8ac50b7f1a772b1a13853cc60f65a1153aefb7b5f0"
          digest: "sha256:b2bbf42d1471d6e5d40233e3983781da366303633b37739b75ffeeac685233af"
          revision: 5
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:c9ee624d1270fec076bd10ca494864c2d973aad384746af0c8448e7114477358"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                  - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                  - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                  - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:24c32c6e2f86e2c501969093ac7a1cbbc3388003e3e910dd2ab30c81fc169630"
          digest: "sha256:48785bb6a373f4474e00bb940e9178853c25e13490f725920501fd73789a1469"
          revision: 6
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:24ec7098122e7dfb6bc19687f63d3f5b70881698384b71beeb0630f4fca77bfe"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                  - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                  - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                  - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
                  - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:5296e357d0a44c8e4517f87749d0e64727a6887a3f6f6732c867b1a5185cb375"
          digest: "sha256:c34313da99c5ab1f6e5668434ff32153c212a008a71378e5e45513226e943cc6"
          revision: 7
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:18f0302b0cf7c22ab0db23c028c9d54665b405cc7997af7e55edaa0b26c94c88"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                  - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                  - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                  - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                  - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                  - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
                  - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                  - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              expected_outputs:
                - "publication-base-advance-report"
              id: "publication-base-advance"
              optional: false
              required_inputs: []
      revision: 62
      schema_version: 1
      state: "COMPLETED"
      work_items:
        publication-base-advance:
          attempt: 8
          claim_id: "sha256:cdc11784502825c22215bc8c3e4370ab3a955b634048998dbc3c919278c9c015"
          definition:
            contract_digest: "sha256:0b93a069a32baf796fae7174e677c2a8d813bf068d2efd7b1edf15f0550c6747"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/provider-base.ts"
                - "packages/agentplane/src/commands/pr/internal/provider-base.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/cli/stale-dist-readonly.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts"
                - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                - "packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.ts"
                - "packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.ts"
                - "packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
                - "packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
            expected_outputs:
              - "publication-base-advance-report"
            id: "publication-base-advance"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 8
              digest: "sha256:be193056cc790a4cdfecd5e812feb730197988348b529d1e389cbf2413ed2912"
              id: "publication-base-advance-report"
              kind: "report"
              plan_revision: 8
              repository_fingerprint: "sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
              task_id: "202610290115-HZ4C0W"
              work_item_id: "publication-base-advance"
          result_digest: "sha256:5cbef7d03863ae4cdcb5bfa6f8b4c0af98e1d8d2b63ba8c5ba1cc3f84ff5d767"
          revision: 43
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ecc504961d87d79e358c18ee77b903056643ace77363d3a98239198e7e3345a2"
              - "sha256:e17a417da56dae7ec4e2f037a68451f865a1d0d38eee49232dded4ac92b1efdb"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:598abfe6ac77556fc1b85e0bab5d51cf4c7cc6242b59ff46a6ba5fc6918c9917"
              environment_digest: "sha256:0a78e23c2b7a37247084c669208b2484f1f008c2d6f1a5477ca448b00c0355b9"
              implementation_identity: "sha256:5cbef7d03863ae4cdcb5bfa6f8b4c0af98e1d8d2b63ba8c5ba1cc3f84ff5d767"
              toolchain_digest: "sha256:d2c612397df84c985d305c9e00234d88e65624eefb509b6cf6045ed92e3f5918"
            observed_at: "2026-10-29T07:11:37.881Z"
            status: "PASSED"
    digest: "sha256:3c7a1aea120876f90cd0c9cfb5e46bbd0514d5e550ec1db89a765f0352efa59a"
    documents:
      contracts:
        sha256:0b93a069a32baf796fae7174e677c2a8d813bf068d2efd7b1edf15f0550c6747:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
            - "Apply only the exact two-line child process environment isolation from native VPBGBK5745 to stale-dist-readonly.test.ts. Keep inherited controller AGENTPLANE_DEV_AUTO_BOOTSTRAP=0, all assertions and production code unchanged. Execute stale-dist-readonly under project agentplane and the public pr-open suite under project cli-core."
            - "Before any integration/provider merge require current named canonical base R to be contained in exact task head Hprime, while retaining fresh verification and evaluator binding to that head. If containment is absent or unknown, stop before effects even when provider reports CLEAN or old-head CI is green. Cover both provider identities, missing evidence and base/head drift. Existing provider update may repair GitHub behind state; unsupported cases must expose an honest native boundary."
            - "Persist a narrow append-only native provider-update verification proof only after updateProviderBranch returns ancestry-proven updated and local alignment succeeds. Bind original H, canonical R, observed Hprime, exact provider/Task identity, native operation key/digest/authority, and completion. Refuse occupied differing slots, preserve uncertain operation evidence, and never mint proof for not_applied, unknown or failed outcomes. Use existing stable/atomic file primitives. Do not accept a caller-supplied base override or arbitrary receipt as native truth."
            - "Verification retains complete frozen B..Hprime coverage. Attribute imported canonical paths as inherited only from a matching protected native update proof and authenticated completed supervisor operation. Check exact Git objects/ancestry and that excluded file modes/blob contents equal the proved canonical R. Real Task edits, including overlap and later changes, must remain scoped. Missing/tampered/foreign/unknown proof preserves fail-closed behavior. Original B/Kernel/failed receipts and previous EVAL remain immutable."
            - "Add a regression containing completed canonical Kernel, exactSHA frozen B, foreign canonical source paths outside Task scope, native provider update to Hprime containing H and R, then actual fresh verification/EVAL routing. Prove no scope widening or stale PASS adoption; changed R/Hprime/identity/proof/result/unknown operation refuses. Static existence of fresh EVAL dispatch is not enough."
            - "Reuse a pre-existing authenticated native conflict/import proof when it establishes the same exact H/R/head and immutable-base invariants. Do not invent a second receipt merely for stylistic consistency. Never infer combined proof solely from providerState behind/CLEAN, old head CI or completion status. Refresh current base/head evidence before a merge attempt and keep actual post-merge canonical CI/readback mandatory before any Factory/host effect. Return the exact unimplemented boundary when current roots or provider APIs cannot preserve these properties."
            - "The existing authenticated effect recovery must produce the same usable update proof after proving the actual hosted merge and local alignment. Cover interruption after provider/local effects before proof publication, and proof publication before journal completion. Recovery must not repeat provider PUT. Provisional proof without matching completed native journal refuses. Existing not_applied already yields failed and no postconditions; preserve it."
            - "Exercise a second genuine canonical base advance and provider update in the same original Task. Permit only proved metadata-only descendants after Hprime. Keep Task edits, overlapping edits and later foreign changes scoped. Never widen scope or rewrite frozen B/Kernel/history."
            - "Recover and verify a private case-sensitive local test filesystem before full validation. The old private temporary directory is absent; do not claim its contents or session98919 result preserved or passed. Preserve all remaining work and report the environment loss explicitly."
            - "Carry the exact qualified integration head H and canonical base R captured by prepare through cmd and every GitHub/GitLab merge mutation and fallback. Immediately before effects require clean worktree, unchanged local qualified H, exact current canonical R, containment R ancestor H, and fresh hosted head/base equality to that pair. Protected-base handoff must compare the fresh hosted base to captured R, not merely accept a nonempty base. Preserve queue locks, checks, review and evaluator gates. Any drift or unknown observation refuses before provider mutation."
            - "A client-side recheck is not an atomic base CAS. Qualify the actual target server merge contract for the remaining read-to-PUT race. Resolve protection against hosted identity targetProject/hostname/targetUrl, never a default source fork. Require a server-enforced up-to-date-head rule applicable to the authenticated merge actor, including admin/bypass semantics, or an equally strong exact-base/fast-forward contract. Unknown, unavailable, bypassable or unsupported policy must fail closed with a typed actionable native boundary. Do not change protection, permissions, authentication or provider settings. Preserve supported reviewed/adoption paths with their existing exact authority; do not infer their safety from ordinary PR status."
            - "Add regressions at actual provider mutation boundaries and fallback paths, for both providers: canonical R advances after prepare, during review/handoff and between attempts; hosted head/base disagreement; actor bypass or missing strict server enforcement; exact target versus source fork; unknown policy. Assert no merge PUT/POST occurs when evidence is stale or insufficient. Distinguish a modeled server contract in tests from live server acceptance."
            - "Retain the repaired recovery distinction: original_base_sha binds the operation R0 while observed_base_sha may be later R1 only with proven R0 ancestor R1. Exact merge parents remain original H/R0; later R1 is not thereby contained or qualified. Both interruption windows, with and without later advancement, must recover without repeated PUT; preserve an existing normal provisional commitment byte-for-byte and refuse tampered original/observed bases."
            - "Explicit C11 boundary: this implementation currently consumes only its authenticated provider-update proof. Existing managed conflict/import proofs remain untouched and are not automatically converted into inherited-path authority. If their equivalent provenance cannot be consumed within these 27 roots, report that exact unsupported path; do not mint a duplicate proof, widen scope or claim end-to-end managed-conflict/GitLab recovery. Fresh actual verifier and EVAL routing tests are not a live evaluator PASS."
            - "Historical full73683 cancelled143, full92452 FAILED1 (core3hookfixturefailures/7619passed/1skip), and full96403 FAILED1 (one ENOTEMPTY in teardown/7621passed/1skip, other groups passed) remain retained and never relabeled PASS. Focused177/publicCLI16/lint/type/format qualify only the prior25-root source. After the final27-root delta, freeze one exact source, run fresh focused/publicCLI/lint/type and one mandatory full, obtain independent static review and genuine native evaluator. Do not infer PASS across source versions."
            - "Apply only the directly human-approved child-process environment isolation in packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts: set AGENTPLANE_HOOK_RUNNER to empty in the three synthetic timeout/signal/stdin child invocations so their installed synthetic runner is selected. Preserve all assertions, explicit-runner coverage, production hook shim, controller AGENTPLANE_HOOK_RUNNER and AGENTPLANE_DEV_AUTO_BOOTSTRAP=0. Reproduce the inherited-runner regression and verify all13 fixture tests pass with the controller environment retained. Preserve the separately quarantined generated undefined artifact; no deletion or ignore/scope workaround."
            - "Apply the directly human-approved V2 preflight join correction in provider-update-branch-local.ts and its nearest test. Start the same seven Git reads once, await all of their settlement before returning either success or failure, then retain original typed values, branch/head/clean/tracking/URL/ancestry guards and generic failure outcome. Add the deterministic held-status/config-rejection regression: demonstrate failure on unchanged old production code, then require no failure return before held read release, release/await/restore on every test path and preserve all existing21 cases. No process reexecution, cleanup retry, skip, global environment or provider settings change. The exact ENOTEMPTY writer was not observed; distinguish the confirmed subprocess lifetime defect from a proven sole cause of that historical teardown error. Preserve both completed generated-artifact holdings."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run ci:local:full"
        sha256:18f0302b0cf7c22ab0db23c028c9d54665b405cc7997af7e55edaa0b26c94c88:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
            - "Apply only the exact two-line child process environment isolation from native VPBGBK5745 to stale-dist-readonly.test.ts. Keep inherited controller AGENTPLANE_DEV_AUTO_BOOTSTRAP=0, all assertions and production code unchanged. Execute stale-dist-readonly under project agentplane and the public pr-open suite under project cli-core."
            - "Before any integration/provider merge require current named canonical base R to be contained in exact task head Hprime, while retaining fresh verification and evaluator binding to that head. If containment is absent or unknown, stop before effects even when provider reports CLEAN or old-head CI is green. Cover both provider identities, missing evidence and base/head drift. Existing provider update may repair GitHub behind state; unsupported cases must expose an honest native boundary."
            - "Persist a narrow append-only native provider-update verification proof only after updateProviderBranch returns ancestry-proven updated and local alignment succeeds. Bind original H, canonical R, observed Hprime, exact provider/Task identity, native operation key/digest/authority, and completion. Refuse occupied differing slots, preserve uncertain operation evidence, and never mint proof for not_applied, unknown or failed outcomes. Use existing stable/atomic file primitives. Do not accept a caller-supplied base override or arbitrary receipt as native truth."
            - "Verification retains complete frozen B..Hprime coverage. Attribute imported canonical paths as inherited only from a matching protected native update proof and authenticated completed supervisor operation. Check exact Git objects/ancestry and that excluded file modes/blob contents equal the proved canonical R. Real Task edits, including overlap and later changes, must remain scoped. Missing/tampered/foreign/unknown proof preserves fail-closed behavior. Original B/Kernel/failed receipts and previous EVAL remain immutable."
            - "Add a regression containing completed canonical Kernel, exactSHA frozen B, foreign canonical source paths outside Task scope, native provider update to Hprime containing H and R, then actual fresh verification/EVAL routing. Prove no scope widening or stale PASS adoption; changed R/Hprime/identity/proof/result/unknown operation refuses. Static existence of fresh EVAL dispatch is not enough."
            - "Reuse a pre-existing authenticated native conflict/import proof when it establishes the same exact H/R/head and immutable-base invariants. Do not invent a second receipt merely for stylistic consistency. Never infer combined proof solely from providerState behind/CLEAN, old head CI or completion status. Refresh current base/head evidence before a merge attempt and keep actual post-merge canonical CI/readback mandatory before any Factory/host effect. Return the exact unimplemented boundary when current roots or provider APIs cannot preserve these properties."
            - "The existing authenticated effect recovery must produce the same usable update proof after proving the actual hosted merge and local alignment. Cover interruption after provider/local effects before proof publication, and proof publication before journal completion. Recovery must not repeat provider PUT. Provisional proof without matching completed native journal refuses. Existing not_applied already yields failed and no postconditions; preserve it."
            - "Exercise a second genuine canonical base advance and provider update in the same original Task. Permit only proved metadata-only descendants after Hprime. Keep Task edits, overlapping edits and later foreign changes scoped. Never widen scope or rewrite frozen B/Kernel/history."
            - "Recover and verify a private case-sensitive local test filesystem before full validation. The old private temporary directory is absent; do not claim its contents or session98919 result preserved or passed. Preserve all remaining work and report the environment loss explicitly."
            - "Carry the exact qualified integration head H and canonical base R captured by prepare through cmd and every GitHub/GitLab merge mutation and fallback. Immediately before effects require clean worktree, unchanged local qualified H, exact current canonical R, containment R ancestor H, and fresh hosted head/base equality to that pair. Protected-base handoff must compare the fresh hosted base to captured R, not merely accept a nonempty base. Preserve queue locks, checks, review and evaluator gates. Any drift or unknown observation refuses before provider mutation."
            - "A client-side recheck is not an atomic base CAS. Qualify the actual target server merge contract for the remaining read-to-PUT race. Resolve protection against hosted identity targetProject/hostname/targetUrl, never a default source fork. Require a server-enforced up-to-date-head rule applicable to the authenticated merge actor, including admin/bypass semantics, or an equally strong exact-base/fast-forward contract. Unknown, unavailable, bypassable or unsupported policy must fail closed with a typed actionable native boundary. Do not change protection, permissions, authentication or provider settings. Preserve supported reviewed/adoption paths with their existing exact authority; do not infer their safety from ordinary PR status."
            - "Add regressions at actual provider mutation boundaries and fallback paths, for both providers: canonical R advances after prepare, during review/handoff and between attempts; hosted head/base disagreement; actor bypass or missing strict server enforcement; exact target versus source fork; unknown policy. Assert no merge PUT/POST occurs when evidence is stale or insufficient. Distinguish a modeled server contract in tests from live server acceptance."
            - "Retain the repaired recovery distinction: original_base_sha binds the operation R0 while observed_base_sha may be later R1 only with proven R0 ancestor R1. Exact merge parents remain original H/R0; later R1 is not thereby contained or qualified. Both interruption windows, with and without later advancement, must recover without repeated PUT; preserve an existing normal provisional commitment byte-for-byte and refuse tampered original/observed bases."
            - "Explicit C11 boundary: this implementation currently consumes only its authenticated provider-update proof. Existing managed conflict/import proofs remain untouched and are not automatically converted into inherited-path authority. If their equivalent provenance cannot be consumed within these 25 roots, report that exact unsupported path; do not mint a duplicate proof, widen scope or claim end-to-end managed-conflict/GitLab recovery. Fresh actual verifier and EVAL routing tests are not a live evaluator PASS."
            - "Historical full73683 cancelled143 and full92452 FAILED1 (core3failed/7619passed/1skipped, othergroups passed) remain retained, never relabeled PASS. After the final fixture delta, freeze one exact25-root source, run fresh focused/publicCLI/lint/type and one mandatory full, obtain independent static review and genuine native evaluator. No full/native/hosted/runtime PASS may be inferred across source versions."
            - "Apply only the directly human-approved child-process environment isolation in packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts: set AGENTPLANE_HOOK_RUNNER to empty in the three synthetic timeout/signal/stdin child invocations so their installed synthetic runner is selected. Preserve all assertions, explicit-runner coverage, production hook shim, controller AGENTPLANE_HOOK_RUNNER and AGENTPLANE_DEV_AUTO_BOOTSTRAP=0. Reproduce the inherited-runner regression and verify all13 fixture tests pass with the controller environment retained. Preserve the separately quarantined generated undefined artifact; no deletion or ignore/scope workaround."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run ci:local:full"
        sha256:24ec7098122e7dfb6bc19687f63d3f5b70881698384b71beeb0630f4fca77bfe:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
            - "Apply only the exact two-line child process environment isolation from native VPBGBK5745 to stale-dist-readonly.test.ts. Keep inherited controller AGENTPLANE_DEV_AUTO_BOOTSTRAP=0, all assertions and production code unchanged. Execute stale-dist-readonly under project agentplane and the public pr-open suite under project cli-core."
            - "Before any integration/provider merge require current named canonical base R to be contained in exact task head Hprime, while retaining fresh verification and evaluator binding to that head. If containment is absent or unknown, stop before effects even when provider reports CLEAN or old-head CI is green. Cover both provider identities, missing evidence and base/head drift. Existing provider update may repair GitHub behind state; unsupported cases must expose an honest native boundary."
            - "Persist a narrow append-only native provider-update verification proof only after updateProviderBranch returns ancestry-proven updated and local alignment succeeds. Bind original H, canonical R, observed Hprime, exact provider/Task identity, native operation key/digest/authority, and completion. Refuse occupied differing slots, preserve uncertain operation evidence, and never mint proof for not_applied, unknown or failed outcomes. Use existing stable/atomic file primitives. Do not accept a caller-supplied base override or arbitrary receipt as native truth."
            - "Verification retains complete frozen B..Hprime coverage. Attribute imported canonical paths as inherited only from a matching protected native update proof and authenticated completed supervisor operation. Check exact Git objects/ancestry and that excluded file modes/blob contents equal the proved canonical R. Real Task edits, including overlap and later changes, must remain scoped. Missing/tampered/foreign/unknown proof preserves fail-closed behavior. Original B/Kernel/failed receipts and previous EVAL remain immutable."
            - "Add a regression containing completed canonical Kernel, exactSHA frozen B, foreign canonical source paths outside Task scope, native provider update to Hprime containing H and R, then actual fresh verification/EVAL routing. Prove no scope widening or stale PASS adoption; changed R/Hprime/identity/proof/result/unknown operation refuses. Static existence of fresh EVAL dispatch is not enough."
            - "Reuse a pre-existing authenticated native conflict/import proof when it establishes the same exact H/R/head and immutable-base invariants. Do not invent a second receipt merely for stylistic consistency. Never infer combined proof solely from providerState behind/CLEAN, old head CI or completion status. Refresh current base/head evidence before a merge attempt and keep actual post-merge canonical CI/readback mandatory before any Factory/host effect. Return the exact unimplemented boundary when current roots or provider APIs cannot preserve these properties."
            - "The existing authenticated effect recovery must produce the same usable update proof after proving the actual hosted merge and local alignment. Cover interruption after provider/local effects before proof publication, and proof publication before journal completion. Recovery must not repeat provider PUT. Provisional proof without matching completed native journal refuses. Existing not_applied already yields failed and no postconditions; preserve it."
            - "Exercise a second genuine canonical base advance and provider update in the same original Task. Permit only proved metadata-only descendants after Hprime. Keep Task edits, overlapping edits and later foreign changes scoped. Never widen scope or rewrite frozen B/Kernel/history."
            - "Recover and verify a private case-sensitive local test filesystem before full validation. The old private temporary directory is absent; do not claim its contents or session98919 result preserved or passed. Preserve all remaining work and report the environment loss explicitly."
            - "Carry the exact qualified integration head H and canonical base R captured by prepare through cmd and every GitHub/GitLab merge mutation and fallback. Immediately before effects require clean worktree, unchanged local qualified H, exact current canonical R, containment R ancestor H, and fresh hosted head/base equality to that pair. Protected-base handoff must compare the fresh hosted base to captured R, not merely accept a nonempty base. Preserve queue locks, checks, review and evaluator gates. Any drift or unknown observation refuses before provider mutation."
            - "A client-side recheck is not an atomic base CAS. Qualify the actual target server merge contract for the remaining read-to-PUT race. Resolve protection against hosted identity targetProject/hostname/targetUrl, never a default source fork. Require a server-enforced up-to-date-head rule applicable to the authenticated merge actor, including admin/bypass semantics, or an equally strong exact-base/fast-forward contract. Unknown, unavailable, bypassable or unsupported policy must fail closed with a typed actionable native boundary. Do not change protection, permissions, authentication or provider settings. Preserve supported reviewed/adoption paths with their existing exact authority; do not infer their safety from ordinary PR status."
            - "Add regressions at actual provider mutation boundaries and fallback paths, for both providers: canonical R advances after prepare, during review/handoff and between attempts; hosted head/base disagreement; actor bypass or missing strict server enforcement; exact target versus source fork; unknown policy. Assert no merge PUT/POST occurs when evidence is stale or insufficient. Distinguish a modeled server contract in tests from live server acceptance."
            - "Retain the repaired recovery distinction: original_base_sha binds the operation R0 while observed_base_sha may be later R1 only with proven R0 ancestor R1. Exact merge parents remain original H/R0; later R1 is not thereby contained or qualified. Both interruption windows, with and without later advancement, must recover without repeated PUT; preserve an existing normal provisional commitment byte-for-byte and refuse tampered original/observed bases."
            - "Explicit C11 boundary: this implementation currently consumes only its authenticated provider-update proof. Existing managed conflict/import proofs remain untouched and are not automatically converted into inherited-path authority. If their equivalent provenance cannot be consumed within these 24 roots, report that exact unsupported path; do not mint a duplicate proof, widen scope or claim end-to-end managed-conflict/GitLab recovery. Fresh actual verifier and EVAL routing tests are not a live evaluator PASS."
            - "Historical full73683 was cancelled exit143 after independent P1 discovery; preserve cancellation evidence and all prior failures. Current focused100 and lint0 qualify only the prior fourteen-root source. After the final expanded delta, run fresh focused/public CLI/type/lint and one mandatory full against one frozen source, obtain independent static review and genuine native evaluator. No full/native/hosted/runtime PASS may be inferred across source versions."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run ci:local:full"
        sha256:433801ee8ce72aaa26be49012c6ee6134d0e654fc8023b080fb84708b3c3e8c4:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
            - "Apply only the exact two-line child process environment isolation from native VPBGBK5745 to stale-dist-readonly.test.ts. Keep inherited controller AGENTPLANE_DEV_AUTO_BOOTSTRAP=0, all assertions and production code unchanged. Explicit cli-core focused commands must actually execute both CLI suites, not merely pass another project."
            - "Independent static review found that existing integration base/head race checks do not imply current provider base R is contained in head H, and frozen exact B causes inherited canonical paths to be charged to Task scope after native provider update. Before claiming this task complete, reproduce those cases. If the four current roots cannot protect current-main integration and fresh verification, return a bounded native scope request for integrate/internal/prepare.ts, prepare.test.ts, task/verify-record-observed-changes.ts and a focused inherited-observation regression test. Do not edit outside current authority or silently treat preservation of old gates as proof."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/stale-dist-readonly.test.ts"
            - "bun run ci:local:full"
        sha256:820b7ca61616cf68eca928b4af81f7958ece1935bb6362f70ace07e1ba9e7062:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
            - "Apply only the exact two-line child process environment isolation from native VPBGBK5745 to stale-dist-readonly.test.ts. Keep inherited controller AGENTPLANE_DEV_AUTO_BOOTSTRAP=0, all assertions and production code unchanged. Explicit cli-core focused commands must actually execute both CLI suites, not merely pass another project."
            - "Before any integration/provider merge require current named canonical base R to be contained in exact task head Hprime, while retaining fresh verification and evaluator binding to that head. If containment is absent or unknown, stop before effects even when provider reports CLEAN or old-head CI is green. Cover both provider identities, missing evidence and base/head drift. Existing provider update may repair GitHub behind state; unsupported cases must expose an honest native boundary."
            - "Persist a narrow append-only native provider-update verification proof only after updateProviderBranch returns ancestry-proven updated and local alignment succeeds. Bind original H, canonical R, observed Hprime, exact provider/Task identity, native operation key/digest/authority, and completion. Refuse occupied differing slots, preserve uncertain operation evidence, and never mint proof for not_applied, unknown or failed outcomes. Use existing stable/atomic file primitives. Do not accept a caller-supplied base override or arbitrary receipt as native truth."
            - "Verification retains complete frozen B..Hprime coverage. Attribute imported canonical paths as inherited only from a matching protected native update proof and authenticated completed supervisor operation. Check exact Git objects/ancestry and that excluded file modes/blob contents equal the proved canonical R. Real Task edits, including overlap and later changes, must remain scoped. Missing/tampered/foreign/unknown proof preserves fail-closed behavior. Original B/Kernel/failed receipts and previous EVAL remain immutable."
            - "Add a regression containing completed canonical Kernel, exactSHA frozen B, foreign canonical source paths outside Task scope, native provider update to Hprime containing H and R, then actual fresh verification/EVAL routing. Prove no scope widening or stale PASS adoption; changed R/Hprime/identity/proof/result/unknown operation refuses. Static existence of fresh EVAL dispatch is not enough."
            - "Reuse a pre-existing authenticated native conflict/import proof when it establishes the same exact H/R/head and immutable-base invariants. Do not invent a second receipt merely for stylistic consistency. Never infer combined proof solely from providerState behind/CLEAN, old head CI or completion status. Refresh current base/head evidence before a merge attempt and keep actual post-merge canonical CI/readback mandatory before any Factory/host effect. Return the exact unimplemented boundary when current roots or provider APIs cannot preserve these properties."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts"
            - "bun run ci:local:full"
        sha256:91856b1a0ebf95d8425154baf31f8c3e485ccddf148317cac686c1ff10779c36:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:vitest -- --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run ci:local:full"
        sha256:c3267885595013fecfdf8826fd63d79af75136fde68ee2a4662e80fba978c5cc:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run ci:local:full"
        sha256:c9ee624d1270fec076bd10ca494864c2d973aad384746af0c8448e7114477358:
          acceptance_criteria:
            - "Preserve frozen Task execution base_ref/base_sha and comparison scope. Map it to the configured provider branch only when exact frozen identity is internally consistent, local branch equals live target branch and the frozen commit is a proven ancestor of that current branch. Equality remains valid. Never accept missing objects, unrelated or rewritten history, stale tracking-only evidence, invalid refs, missing/multiple remote rows or unknown ancestry."
            - "A local/live mismatch still refuses before push. Repeat live and local observations after ancestry proof so evidence drift during resolution refuses. Use the resolved target URL, not source fork. Preserve named-base and reviewed-import paths. No provider writes, Task/Kernel edits or authority changes inside resolver."
            - "Use real local Git histories and a bare target for both GitHub and GitLab identities. Cover ordinary forward advancement, repeated advancement without another Task, frozen base immutability, local/provider disagreement, missing source objects, divergence/rewind, remote ambiguity and races. Public CLI fixtures prove refusals happen before push and PR POST; allowed advancement retains frozen comparison metadata."
            - "Publication does not claim current-main integration verification. Preserve existing provider behind/conflict routing, mandatory exact-current-head hosted checks, independent evaluation and integration queue head/base race guards. Read these paths and report any uncovered route before claiming end-to-end recovery. Do not replace them with the old full/EVAL verdict."
            - "Run focused tests and mandatory full regression. Report command evidence truthfully. Native controller must persist checks and require genuine evaluator. Original VPBGBK/Factory tasks, source, receipts, failed histories, credentials, runtime guards and all user work remain unchanged. No publication or host effects during semantic implementation."
            - "Apply only the exact two-line child process environment isolation from native VPBGBK5745 to stale-dist-readonly.test.ts. Keep inherited controller AGENTPLANE_DEV_AUTO_BOOTSTRAP=0, all assertions and production code unchanged. Execute stale-dist-readonly under project agentplane and the public pr-open suite under project cli-core."
            - "Before any integration/provider merge require current named canonical base R to be contained in exact task head Hprime, while retaining fresh verification and evaluator binding to that head. If containment is absent or unknown, stop before effects even when provider reports CLEAN or old-head CI is green. Cover both provider identities, missing evidence and base/head drift. Existing provider update may repair GitHub behind state; unsupported cases must expose an honest native boundary."
            - "Persist a narrow append-only native provider-update verification proof only after updateProviderBranch returns ancestry-proven updated and local alignment succeeds. Bind original H, canonical R, observed Hprime, exact provider/Task identity, native operation key/digest/authority, and completion. Refuse occupied differing slots, preserve uncertain operation evidence, and never mint proof for not_applied, unknown or failed outcomes. Use existing stable/atomic file primitives. Do not accept a caller-supplied base override or arbitrary receipt as native truth."
            - "Verification retains complete frozen B..Hprime coverage. Attribute imported canonical paths as inherited only from a matching protected native update proof and authenticated completed supervisor operation. Check exact Git objects/ancestry and that excluded file modes/blob contents equal the proved canonical R. Real Task edits, including overlap and later changes, must remain scoped. Missing/tampered/foreign/unknown proof preserves fail-closed behavior. Original B/Kernel/failed receipts and previous EVAL remain immutable."
            - "Add a regression containing completed canonical Kernel, exactSHA frozen B, foreign canonical source paths outside Task scope, native provider update to Hprime containing H and R, then actual fresh verification/EVAL routing. Prove no scope widening or stale PASS adoption; changed R/Hprime/identity/proof/result/unknown operation refuses. Static existence of fresh EVAL dispatch is not enough."
            - "Reuse a pre-existing authenticated native conflict/import proof when it establishes the same exact H/R/head and immutable-base invariants. Do not invent a second receipt merely for stylistic consistency. Never infer combined proof solely from providerState behind/CLEAN, old head CI or completion status. Refresh current base/head evidence before a merge attempt and keep actual post-merge canonical CI/readback mandatory before any Factory/host effect. Return the exact unimplemented boundary when current roots or provider APIs cannot preserve these properties."
            - "The existing authenticated effect recovery must produce the same usable update proof after proving the actual hosted merge and local alignment. Cover interruption after provider/local effects before proof publication, and proof publication before journal completion. Recovery must not repeat provider PUT. Provisional proof without matching completed native journal refuses. Existing not_applied already yields failed and no postconditions; preserve it."
            - "Exercise a second genuine canonical base advance and provider update in the same original Task. Permit only proved metadata-only descendants after Hprime. Keep Task edits, overlapping edits and later foreign changes scoped. Never widen scope or rewrite frozen B/Kernel/history."
            - "Recover and verify a private case-sensitive local test filesystem before full validation. The old private temporary directory is absent; do not claim its contents or session98919 result preserved or passed. Preserve all remaining work and report the environment loss explicitly."
          objective: "Allow authenticated descendant advancement of a named provider base without rewriting the frozen execution/comparison base or weakening current-main merge validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts"
            - "bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json."
        objective: "Preserve frozen execution base while revalidating publication after main advances"
    events:
      -
        command_digest: "sha256:fed3a1443ba9cf585f93d918ba70432d711e6fe34eabb360d253961764455257"
        id: "capture:202610290115-HZ4C0W:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610290115-HZ4C0W"
        occurred_at: "2026-10-29T01:15:07.213Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610290115-HZ4C0W"
        task_revision: 1
      -
        command_digest: "sha256:e4376539b711ec43afb9fc618525db07aac846e137646af75673ffa8f94b8868"
        id: "result:sha256:98f160e0cefdbda426740ebb431c6a627ba85aaf1f41196c7163b2f53194c98c:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:98f160e0cefdbda426740ebb431c6a627ba85aaf1f41196c7163b2f53194c98c"
        occurred_at: "2026-10-29T01:16:46.175Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610290115-HZ4C0W"
        task_revision: 2
      -
        command_digest: "sha256:94e0700ea905e0047e9216cb7b42acd3db6b2a40252e7f99efc3bb04d16e2bd3"
        id: "reject:sha256:a7e4b39cd358feeb46286b690e899df11c52947e64c4b8d078f2b036cdb7aa45:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:a7e4b39cd358feeb46286b690e899df11c52947e64c4b8d078f2b036cdb7aa45"
        occurred_at: "2026-10-29T01:18:36.397Z"
        payload_digest: "sha256:f76f52e46a9a473f664d6880376e5e3bbb28ec8f6d1d1f757d97b13f8ef2e515"
        task_id: "202610290115-HZ4C0W"
        task_revision: 3
      -
        command_digest: "sha256:b1220ed9fe6849907e1c5eefc3b85c4ab644dceb62c97e7ac165a521128bbd80"
        id: "result:sha256:3734a042e159df2a4da76eb3089f7595e77acd3addc59dc19f18a7e08a3f7790:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:3734a042e159df2a4da76eb3089f7595e77acd3addc59dc19f18a7e08a3f7790"
        occurred_at: "2026-10-29T01:19:34.408Z"
        payload_digest: "sha256:9fb6e714c1d35f269caef869a37f51c0d6a7b57788eef62e8709474eb8800912"
        task_id: "202610290115-HZ4C0W"
        task_revision: 4
      -
        command_digest: "sha256:9835e63cc8a59f709c960d12fe04d44c0d43ef526eaee6a2584a2f65a980df09"
        id: "sha256:65d4f36a59e21798768f14937c6e9be09f220582f6c55342372d9c8a5b11dff4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:65d4f36a59e21798768f14937c6e9be09f220582f6c55342372d9c8a5b11dff4"
        occurred_at: "2026-10-29T01:21:37.383Z"
        payload_digest: "sha256:8a776757da7d6a19bcb9eddbb1195bb8b62a15183771fcf5d94e28fabcbcf80b"
        task_id: "202610290115-HZ4C0W"
        task_revision: 5
      -
        command_digest: "sha256:073078cd7934f744868299f0b40a43645ef61c45bf029bf896f476b184eb0e29"
        id: "kernel_work_item_materialization_required:sha256:0d990835596b6d22bf5cd2a411e898da22c610297f959c921e1125aa43173ac6:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0d990835596b6d22bf5cd2a411e898da22c610297f959c921e1125aa43173ac6:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:22:21.876Z"
        payload_digest: "sha256:c532b93ef93d1dda7b1bee756cca4653aef833f0cbc5065011a2d61bf6619da3"
        task_id: "202610290115-HZ4C0W"
        task_revision: 6
      -
        command_digest: "sha256:b35f1c7128a4b3c8b4b3e22d8fde0206bf7cf404a0dc5cbb91a73159ea78d80f"
        id: "kernel_work_item_claim_required:sha256:7ffc1d9bb584f62f3a4c8a1225936c07609c21e95778605cba1d22b0b151831f:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7ffc1d9bb584f62f3a4c8a1225936c07609c21e95778605cba1d22b0b151831f:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:22:52.367Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610290115-HZ4C0W"
        task_revision: 7
      -
        command_digest: "sha256:f89edc289fb983328a0d77ce995a7136a2d82cac7daafedc45e46aff249f725b"
        id: "kernel_work_item_execution_required:sha256:9e68eef1aaa0729c5d165d9320545c712a5b49d389625a273122dde7b6911c98:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9e68eef1aaa0729c5d165d9320545c712a5b49d389625a273122dde7b6911c98:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:28:02.021Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202610290115-HZ4C0W"
        task_revision: 8
      -
        command_digest: "sha256:c4270644e6d777b25bcdbfc5aaf635e2890e00cc1b8c58c32a2b452e9fe6558e"
        id: "semantic-stop:sha256:fd1be565397e9609c5e2f5bed67d9486c07d075a8537175b0a65eefb32dfb54f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:fd1be565397e9609c5e2f5bed67d9486c07d075a8537175b0a65eefb32dfb54f"
        occurred_at: "2026-10-29T01:29:59.677Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610290115-HZ4C0W"
        task_revision: 9
      -
        command_digest: "sha256:f860ff4d18aab8871a25bef6422115782103a721f040220d336e44d2b9a61712"
        id: "scope-request:sha256:ee7e9d0d259577a093f535b100a628cd0e41e50b9d142c0b88c98972f46e69f5:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:ee7e9d0d259577a093f535b100a628cd0e41e50b9d142c0b88c98972f46e69f5"
        occurred_at: "2026-10-29T01:32:24.316Z"
        payload_digest: "sha256:d42e4c3f4f23941c9e28ed51e703175fe4267eec5ad592a2cb62353c000540c4"
        task_id: "202610290115-HZ4C0W"
        task_revision: 10
      -
        command_digest: "sha256:9caaaa7a0926bdc943aed855f072748979ae3d310ace1863ccad2fb1d2fb3204"
        id: "result:sha256:9df589967936474abd8bd06cbbf73e26152f4d2cdea35c796337b6cc8c89d21e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:9df589967936474abd8bd06cbbf73e26152f4d2cdea35c796337b6cc8c89d21e"
        occurred_at: "2026-10-29T01:35:29.386Z"
        payload_digest: "sha256:e0d452990b6eb5dd98f8397db506d86c162d8e3c30d6db88280f0da96c2f6388"
        task_id: "202610290115-HZ4C0W"
        task_revision: 11
      -
        command_digest: "sha256:3cd305995a04758e4626efd75b119e0774690353d1f5953f417a5111d4cc10dc"
        id: "sha256:f7ee0efca82a55a0199d2eab173d1366b3cc8b36cb19ed914c8cc5fb11f6a673:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:f7ee0efca82a55a0199d2eab173d1366b3cc8b36cb19ed914c8cc5fb11f6a673"
        occurred_at: "2026-10-29T01:35:55.376Z"
        payload_digest: "sha256:616390747ab9d860e49efb7e5b8a8861a2a9dafb43d1537a980e5ea108ccc9d5"
        task_id: "202610290115-HZ4C0W"
        task_revision: 12
      -
        command_digest: "sha256:90bd1191b49528e8ace7c6e3763a61591ba29c61394cfd51129e232ffbb8822f"
        id: "kernel_work_item_claim_required:sha256:a8223ce40afb9be97cd0419464618fc63e575a8a7eee0ae407b26c50ed5d390a:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a8223ce40afb9be97cd0419464618fc63e575a8a7eee0ae407b26c50ed5d390a:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:37:43.341Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610290115-HZ4C0W"
        task_revision: 13
      -
        command_digest: "sha256:dec5840585f96cadea6b8fac5c3f2e7cd7f2ca6bb532aa8bf1f742641f66e1c4"
        id: "kernel_work_item_execution_required:sha256:a87bc0c092bf64f6bc6b29b7daeb309f6e58ee6c8f0419b581f30caf7998abb7:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a87bc0c092bf64f6bc6b29b7daeb309f6e58ee6c8f0419b581f30caf7998abb7:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:38:10.939Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610290115-HZ4C0W"
        task_revision: 14
      -
        command_digest: "sha256:e35953097b1fe227625a06c61a696f3b3a3cf4173ff7b3dd6f04c1ad5380f8ac"
        id: "semantic-stop:sha256:c5092f3768319d2fa264188a77a153dfb22a0d34fa661044e0e3c8771ed1cfe5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:c5092f3768319d2fa264188a77a153dfb22a0d34fa661044e0e3c8771ed1cfe5"
        occurred_at: "2026-10-29T01:39:48.406Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610290115-HZ4C0W"
        task_revision: 15
      -
        command_digest: "sha256:baee9f7d2d4dc76595a433fbf6f76bf1227d69d2494fb34eabd9b8f12a1ba866"
        id: "scope-request:sha256:fed03665185de2da0d8c9af33767b93294c69d36f9851e8694a67c95fa09c8e6:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:fed03665185de2da0d8c9af33767b93294c69d36f9851e8694a67c95fa09c8e6"
        occurred_at: "2026-10-29T01:40:54.815Z"
        payload_digest: "sha256:13e5558930eb60bfa137e212a60c72a8ba2a497f933e383b94305a04b179d1d3"
        task_id: "202610290115-HZ4C0W"
        task_revision: 16
      -
        command_digest: "sha256:267fe45cc64e140d2f05a0ac847161e2a30eccb28d151f99243e99348f208543"
        id: "result:sha256:470a11a2f7c024aa4e19d47fd23cb53c903172291276ce6bf042a7727584cc0a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:470a11a2f7c024aa4e19d47fd23cb53c903172291276ce6bf042a7727584cc0a"
        occurred_at: "2026-10-29T01:43:11.531Z"
        payload_digest: "sha256:4edd1534acb9ad82e94e2a0c9e0feee50285c8d2cd32b42b32ac7feaf9ccfff5"
        task_id: "202610290115-HZ4C0W"
        task_revision: 17
      -
        command_digest: "sha256:f6f327463778ed6c0989893d330805d2a11093bc561cb61ae7f6bcc44a73e3e3"
        id: "sha256:a2355827f4b05d1c55c81a650798cd340fce7e8117d654e2d000b8943dc392f7:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a2355827f4b05d1c55c81a650798cd340fce7e8117d654e2d000b8943dc392f7"
        occurred_at: "2026-10-29T01:43:34.318Z"
        payload_digest: "sha256:bcd44e11b42648a8542c93fd7cdb72070e7c1364e017121856e60c14542d4f57"
        task_id: "202610290115-HZ4C0W"
        task_revision: 18
      -
        command_digest: "sha256:dbde186fc28502e8ac3e1524645e6d44ae626dc4abc92364932f0e3e4b56c6e4"
        id: "kernel_work_item_claim_required:sha256:3c5489adbd533a5a1a650711d258711a860de09c445fe2375029fbf6f77d59b8:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3c5489adbd533a5a1a650711d258711a860de09c445fe2375029fbf6f77d59b8:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:44:16.391Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610290115-HZ4C0W"
        task_revision: 19
      -
        command_digest: "sha256:7abd2214cd1c0177e639ee528815ec9a3655ee5944433e4c983d8d24768a3980"
        id: "kernel_work_item_execution_required:sha256:a27eed70105636a99aab397016c4cd01a8e160260407596b8e7231f4f315f6d2:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a27eed70105636a99aab397016c4cd01a8e160260407596b8e7231f4f315f6d2:sha256:c5c9dd4299c213499d3e34727d95b1418936fe5bf84ab0a9bd2407dda3000cbe"
        occurred_at: "2026-10-29T01:44:24.839Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610290115-HZ4C0W"
        task_revision: 20
      -
        command_digest: "sha256:f6463d79b720b779684d4873176aa856c69283f7761844ac72045a318c584a62"
        id: "sha256:6e590f0890468c5e066a5b314eed359001d39c1c4597ff1de2e902d203b358dc:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6e590f0890468c5e066a5b314eed359001d39c1c4597ff1de2e902d203b358dc"
        occurred_at: "2026-10-29T02:49:31.782Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202610290115-HZ4C0W"
        task_revision: 21
      -
        command_digest: "sha256:49a7b4c550c52f6e5981cd192d8dd03601628f0194e0c33372dce96129af965e"
        id: "semantic-stop:sha256:6c9278322872f2850e7c739f72cd25d06ba7f3249619327134c38171685ca6dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:6c9278322872f2850e7c739f72cd25d06ba7f3249619327134c38171685ca6dc"
        occurred_at: "2026-10-29T02:49:33.750Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610290115-HZ4C0W"
        task_revision: 22
      -
        command_digest: "sha256:86a48f76c9ea473b2e57972ce230c94abcfec841aa5f87f8672369086046318c"
        id: "scope-request:sha256:5532276481b536725a9a6dd24320305c509456dc1550a638b1753f5a511751fa:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:5532276481b536725a9a6dd24320305c509456dc1550a638b1753f5a511751fa"
        occurred_at: "2026-10-29T02:49:45.336Z"
        payload_digest: "sha256:373cc2de90f80f49c7c76eba35616ba6bcedb27df42d0145534cad85691cd417"
        task_id: "202610290115-HZ4C0W"
        task_revision: 23
      -
        command_digest: "sha256:9eaa2e71589571716fadd70db8a3e44edd3bcb97561e04f587b64fbcaadec622"
        id: "result:sha256:46ed42e0a256c789bf3749ef8b64616ffdaff0c4b7e9a63b00aee3559959cdd7:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:46ed42e0a256c789bf3749ef8b64616ffdaff0c4b7e9a63b00aee3559959cdd7"
        occurred_at: "2026-10-29T02:50:33.911Z"
        payload_digest: "sha256:080081903d7600c91b0c3bdbd8a8852c69fcc398fc134f996c90bee01a99a9dd"
        task_id: "202610290115-HZ4C0W"
        task_revision: 24
      -
        command_digest: "sha256:2fa2cddddce68e7a3e002bbfebf7ae42cd5e9cb9f0edaa731fb0234a47492688"
        id: "sha256:115bb7d71369d5667d895a67e1a26f10bc0aab15ca1501f06b32111e26e70c27:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:115bb7d71369d5667d895a67e1a26f10bc0aab15ca1501f06b32111e26e70c27"
        occurred_at: "2026-10-29T02:50:45.512Z"
        payload_digest: "sha256:01a5c24b17c7ddda89f61936dfe7fdd8d2bf46c2fc4f1e10aa28e6237d97cb56"
        task_id: "202610290115-HZ4C0W"
        task_revision: 25
      -
        command_digest: "sha256:819706e1eab7fd7d7fbc07cc1c7bb786b1509e3cf3ffc3d667c7fdaf06b51733"
        id: "kernel_work_item_claim_required:sha256:bd50a6f1e4880879d0a963ce1e499fe97cd6fdfd704ed9ae2c7d921a816fa5ee:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:bd50a6f1e4880879d0a963ce1e499fe97cd6fdfd704ed9ae2c7d921a816fa5ee:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
        occurred_at: "2026-10-29T02:51:22.332Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610290115-HZ4C0W"
        task_revision: 26
      -
        command_digest: "sha256:ee4200ca1540378616d7d5443e17f4ef95e63c5b746a275ea53172c33bfb90c5"
        id: "kernel_work_item_execution_required:sha256:c79e309c65db8d9df7a3ccdddc84b7adbeb21d8b34c54a9f8f0d2908ebb3e391:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c79e309c65db8d9df7a3ccdddc84b7adbeb21d8b34c54a9f8f0d2908ebb3e391:sha256:0b5bd1fa493a41089843ee6d2684464c7ba198c1d248f04d0bee3cfd1c4a720c"
        occurred_at: "2026-10-29T02:51:24.354Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202610290115-HZ4C0W"
        task_revision: 27
      -
        command_digest: "sha256:3f80b0f0149853b41a04bc4b5d4ac6f4c50fb410e85cb07c9df197f331fbed06"
        id: "sha256:5262e4b20fd185738740eef2ff07646db040c77e4a0c13b8e3d54f34e1cfebdc:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:5262e4b20fd185738740eef2ff07646db040c77e4a0c13b8e3d54f34e1cfebdc"
        occurred_at: "2026-10-29T03:37:05.704Z"
        payload_digest: "sha256:758d046bb700bfb388afb5f242615a0666d8c68a77abc7d727af5deb3ef3a0b2"
        task_id: "202610290115-HZ4C0W"
        task_revision: 28
      -
        command_digest: "sha256:1f1401827c06ccb9182d80877667b48450d2e2dbed2a85f5c09f0433e252be06"
        id: "semantic-stop:sha256:2501edf9ceabefdf663bfbb5ca95c3162872113b8c14f5eb7b83f8ff8107b0b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:2501edf9ceabefdf663bfbb5ca95c3162872113b8c14f5eb7b83f8ff8107b0b6"
        occurred_at: "2026-10-29T03:37:11.334Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202610290115-HZ4C0W"
        task_revision: 29
      -
        command_digest: "sha256:91357e6932f4ea03b709e784fd6ece0a291dc95f8031429c7e4c28632dca6319"
        id: "scope-request:sha256:7e5f62317853fcee1e36611f073165d571fa9ef3cde7847e8192da44fa370c31:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:7e5f62317853fcee1e36611f073165d571fa9ef3cde7847e8192da44fa370c31"
        occurred_at: "2026-10-29T03:37:50.240Z"
        payload_digest: "sha256:27c4df128e1c33812d175cd0d110f1246ae750e5340cc97b5fe38702f3c071ec"
        task_id: "202610290115-HZ4C0W"
        task_revision: 30
      -
        command_digest: "sha256:cd2a63bfce1debd815d383273aa427a9e51cca5bacb21e4dc3a8d8c50002cd44"
        id: "result:sha256:480dd08e61598fc3448bd7e8780c1dfbbd7ef75c6c7acca68b0dba1fdb2c53af:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:480dd08e61598fc3448bd7e8780c1dfbbd7ef75c6c7acca68b0dba1fdb2c53af"
        occurred_at: "2026-10-29T03:41:33.616Z"
        payload_digest: "sha256:10c97864ae8609e499f8be28346bd20d9b72b1eaeca55f107b59ce5b71d709ce"
        task_id: "202610290115-HZ4C0W"
        task_revision: 31
      -
        command_digest: "sha256:32e4d9b6806563bbc1b8dac815d12bfd2a10bfaccca5918430c72ee16ea5e360"
        id: "sha256:6669c8441141a910e5edaa5193c4d762f51058c4f653600378d09267f7559b66:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:6669c8441141a910e5edaa5193c4d762f51058c4f653600378d09267f7559b66"
        occurred_at: "2026-10-29T03:41:47.419Z"
        payload_digest: "sha256:ce9fee7131f57a718865b1a2c673e524730392143d562621bb05211e606b632c"
        task_id: "202610290115-HZ4C0W"
        task_revision: 32
      -
        command_digest: "sha256:66203f0766d713bb3e7897cfd460727dd925303e8b254c1cf7a71d7c5b1694ef"
        id: "kernel_work_item_claim_required:sha256:0d5f968fd3efeee05844ec5c1479f99e9b384edec4d8e5933ec7bbfe1bebbc57:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0d5f968fd3efeee05844ec5c1479f99e9b384edec4d8e5933ec7bbfe1bebbc57:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
        occurred_at: "2026-10-29T03:42:06.628Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202610290115-HZ4C0W"
        task_revision: 33
      -
        command_digest: "sha256:a48c6be6cff24df01ab3c9b41e54102695d9f7805969a53f417a5685e925436e"
        id: "kernel_work_item_execution_required:sha256:7286122f0c6cff1c09f52a432bd1a6ee17d80b6cad5967b3f08cba298be49b39:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7286122f0c6cff1c09f52a432bd1a6ee17d80b6cad5967b3f08cba298be49b39:sha256:abc36a09ca94b75d9330f47070485b000d0c31923ecf7d93c3e15cfe0bce9985"
        occurred_at: "2026-10-29T03:42:08.555Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202610290115-HZ4C0W"
        task_revision: 34
      -
        command_digest: "sha256:111de501fac432125855584e34922c4aa89693aacdcf15dffedd47b3f251f918"
        id: "sha256:7bf564b98ca36459f04e9e73a6f977d37c3ffd588a7f8e4c4c933c170ceb4adb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7bf564b98ca36459f04e9e73a6f977d37c3ffd588a7f8e4c4c933c170ceb4adb"
        occurred_at: "2026-10-29T04:20:22.814Z"
        payload_digest: "sha256:75eef70cc13c1d872989b912fbe0608a2ada7fb14cc4e2cf8fdb81e61d77e7bd"
        task_id: "202610290115-HZ4C0W"
        task_revision: 35
      -
        command_digest: "sha256:62834578b55c3fcda8546388c829c571dc7764a9cce6e4a1b203c45d41f347f7"
        id: "semantic-stop:sha256:a1568b8a5eaafbf94ef10d8df5b545d95463c69605123de4447371c63f964e8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:a1568b8a5eaafbf94ef10d8df5b545d95463c69605123de4447371c63f964e8c"
        occurred_at: "2026-10-29T04:20:27.418Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202610290115-HZ4C0W"
        task_revision: 36
      -
        command_digest: "sha256:1f863f1cfcaec7c6b00652d9b379761130a5b69f4f179dcc291f0afe2b93c872"
        id: "scope-request:sha256:f720ae6b8632c4022989768b3a03e1495859536100fcfc8fe79b5bd5a44fbaa9:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:f720ae6b8632c4022989768b3a03e1495859536100fcfc8fe79b5bd5a44fbaa9"
        occurred_at: "2026-10-29T04:24:14.124Z"
        payload_digest: "sha256:46201fb673d6474963b350b05653aba071f57651ac3afe79b0fb01020bced1e9"
        task_id: "202610290115-HZ4C0W"
        task_revision: 37
      -
        command_digest: "sha256:8a85418081a0d45a644f6529c4083eb6ebcbfb247cc613fbcc7c4c878f411d27"
        id: "result:sha256:aba575bbd47ade3a7efa0d47ac70fb7e1c2ca463983cbf8243ec09b02884dcb5:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:aba575bbd47ade3a7efa0d47ac70fb7e1c2ca463983cbf8243ec09b02884dcb5"
        occurred_at: "2026-10-29T04:25:55.307Z"
        payload_digest: "sha256:91d8f25117391f8faadc2eff7d92bd9b5b194fa9a70788f147d3ef7f4a007bef"
        task_id: "202610290115-HZ4C0W"
        task_revision: 38
      -
        command_digest: "sha256:14a52f06752d44136365888a161a74e4962cfb8e06599caf067eb845e30a5afe"
        id: "sha256:60e3e539c4c09bf098c045814ce5a8d11fa6cd6a541cd942dea61100af9359d7:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:60e3e539c4c09bf098c045814ce5a8d11fa6cd6a541cd942dea61100af9359d7"
        occurred_at: "2026-10-29T04:26:44.126Z"
        payload_digest: "sha256:eb8289478fb20f50b1e6779121f933021f52c08377e66c653763c80f9f95ebff"
        task_id: "202610290115-HZ4C0W"
        task_revision: 39
      -
        command_digest: "sha256:2a9db52d031b499910bbc02fb93e18f67945ef41512d37189de0166016b2b5e5"
        id: "kernel_work_item_claim_required:sha256:5077c3844be561386e7e103651935827df947351d687eef995c5236fd6d6c88f:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:5077c3844be561386e7e103651935827df947351d687eef995c5236fd6d6c88f:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
        occurred_at: "2026-10-29T04:27:28.009Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202610290115-HZ4C0W"
        task_revision: 40
      -
        command_digest: "sha256:349645837b2511223e1e36ff42d4e3c021c1724c7a1cfe3bf9166e763e6a4188"
        id: "kernel_work_item_execution_required:sha256:b7086d12b29514ac3f1d1e6ec0c3626204fc5e8f316ab716def233ff1f163e71:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b7086d12b29514ac3f1d1e6ec0c3626204fc5e8f316ab716def233ff1f163e71:sha256:7cae806afd603d1e8c7759713f2abb7ac8b73de046d9cf9822dba4b5cf879165"
        occurred_at: "2026-10-29T04:27:43.708Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202610290115-HZ4C0W"
        task_revision: 41
      -
        command_digest: "sha256:b1881557448e49ef0534b3d1d3a226da7a1d39b6853d5e96e560cd489ec49649"
        id: "sha256:60de23650542106806a07f68e814d4b058aaf77cc568c2961c8f742e3605bedd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:60de23650542106806a07f68e814d4b058aaf77cc568c2961c8f742e3605bedd"
        occurred_at: "2026-10-29T04:59:40.071Z"
        payload_digest: "sha256:bc22c1e4d22a7f545c38c3a7bb4c7f40467d501da3b54b80b0c1d9ef24a482a1"
        task_id: "202610290115-HZ4C0W"
        task_revision: 42
      -
        command_digest: "sha256:f17cd8119decc8129f8beb26093c9a4c9144ce8e66754081241a0f29dc7e8cbe"
        id: "semantic-stop:sha256:1392bedff2873eb3555f4040076f22bd53156fd3b0a139fed40f5f2e8a93149c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:1392bedff2873eb3555f4040076f22bd53156fd3b0a139fed40f5f2e8a93149c"
        occurred_at: "2026-10-29T04:59:42.241Z"
        payload_digest: "sha256:0bcd5e2250d1b29f52698da2f1f0735696491baf0d0977d6ec4841af151706da"
        task_id: "202610290115-HZ4C0W"
        task_revision: 43
      -
        command_digest: "sha256:ea4dd44d046fbed17b68d9b99a8e651e8af887008723275ca0780c61c40515ce"
        id: "scope-request:sha256:3af6d91db823a1a2dc6c9374cd0767d00cc43494c82079323f462791243f9d5f:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:3af6d91db823a1a2dc6c9374cd0767d00cc43494c82079323f462791243f9d5f"
        occurred_at: "2026-10-29T05:35:56.324Z"
        payload_digest: "sha256:e4b13bfedb33728c5bd9cc3306d31a68280ad9d477c816d8087d167eb1267a79"
        task_id: "202610290115-HZ4C0W"
        task_revision: 44
      -
        command_digest: "sha256:ccd96d6738efc45bbb4d0c56c19f6649f17eba7fa9b00a2fe74bc810e8ab2d30"
        id: "result:sha256:acceb9ba5b6d38c72fc315478acf866cb7fd445887923ad1626f72a0ffc65ffb:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:acceb9ba5b6d38c72fc315478acf866cb7fd445887923ad1626f72a0ffc65ffb"
        occurred_at: "2026-10-29T05:37:35.214Z"
        payload_digest: "sha256:1f4dfc1bb9747c2bbcd749c4cd33419016c0df1516dcc7300d60faed886a365e"
        task_id: "202610290115-HZ4C0W"
        task_revision: 45
      -
        command_digest: "sha256:00e18228f45b400f23995c846028a6e1e610753dee22678692685d6152f94a9a"
        id: "sha256:d7e2558c2e4c48ae0f3fc2490cb7331c6b386beb137d25d3a56fa19b0ab8ff60:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d7e2558c2e4c48ae0f3fc2490cb7331c6b386beb137d25d3a56fa19b0ab8ff60"
        occurred_at: "2026-10-29T05:38:29.653Z"
        payload_digest: "sha256:246b183ad707246793a61cdcd82fe75736cb0751b37bf224e1437be43fa07b40"
        task_id: "202610290115-HZ4C0W"
        task_revision: 46
      -
        command_digest: "sha256:ad39ee728ed33e67508b9e797da2338a45f0a3027b306d62426d90b873cfcac5"
        id: "kernel_work_item_claim_required:sha256:689e14e307a428c14b9570bf65ef413e7f005efb726f7689567c1ee812a0ca1c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:689e14e307a428c14b9570bf65ef413e7f005efb726f7689567c1ee812a0ca1c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
        occurred_at: "2026-10-29T05:38:49.589Z"
        payload_digest: "sha256:aad38a57b30211b5e7c8a3e705c00172ac1ec5a3fcea34eb7b37c2a16409188d"
        task_id: "202610290115-HZ4C0W"
        task_revision: 47
      -
        command_digest: "sha256:bbad115a3f3320371fe04855ebca36661ae8bc0e51838d2c65a9597502f84f60"
        id: "kernel_work_item_execution_required:sha256:68b4ce54621041b3b5bdd8cc7254317419f951e88f2cb5486f96cfa35221075c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:68b4ce54621041b3b5bdd8cc7254317419f951e88f2cb5486f96cfa35221075c:sha256:ad96e1e5783e6d16685af117e9a28c1618a085d92362925b0a4146cde87756a2"
        occurred_at: "2026-10-29T05:38:51.831Z"
        payload_digest: "sha256:49a5ab2916791286794d7b8826aec0460831d51f8d946e88087187ad77c32af1"
        task_id: "202610290115-HZ4C0W"
        task_revision: 48
      -
        command_digest: "sha256:26a08fab2722a98b6b4f99af4f503f19c7e3326ba111a3d52e82c33c76f89fb5"
        id: "sha256:ef23f6010e3914c561afd02d2a45e41175c02c39e7703a3e526f5079b277bd5b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ef23f6010e3914c561afd02d2a45e41175c02c39e7703a3e526f5079b277bd5b"
        occurred_at: "2026-10-29T06:12:37.964Z"
        payload_digest: "sha256:50684e1f1d08e38732ff461a733b43df64fb05c0b37504f765c7634af8a838dc"
        task_id: "202610290115-HZ4C0W"
        task_revision: 49
      -
        command_digest: "sha256:ba8be4c33f9fe3aed296015d2dfc8a2c4c75f3685f791a18d322476fb75e51b4"
        id: "result:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe"
        occurred_at: "2026-10-29T06:12:40.699Z"
        payload_digest: "sha256:8d464fee679c6b794e01406079e25e93c79d7e3f40f2dead09e07a5f85a8b449"
        task_id: "202610290115-HZ4C0W"
        task_revision: 50
      -
        command_digest: "sha256:83ce27a94849a3b4b0e5ded17028c2fbeccadd0f97aa6a4dc5ad8a03a729434e"
        id: "kernel_work_item_inspection_required:sha256:f21c58be336ce8357ba63a49fcacf2b112be3bd05d2acc3b642507588738fdaf:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f21c58be336ce8357ba63a49fcacf2b112be3bd05d2acc3b642507588738fdaf:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        occurred_at: "2026-10-29T06:12:42.944Z"
        payload_digest: "sha256:023c3c4aa353c9a91d5e1dc6a053957a44051d661b29b8c78a9c9589791f6fde"
        task_id: "202610290115-HZ4C0W"
        task_revision: 51
      -
        command_digest: "sha256:77a9696369d0fc6248e8c649fdf95e16328b1d0bc06ec4d6aee95e17253cde70"
        id: "validation:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b72c8f6713e038bba4648fc5b453fdc43ba0506dc093e9b5122ed514cbee6bfe"
        occurred_at: "2026-10-29T06:33:34.173Z"
        payload_digest: "sha256:e6749dfd638ee5fef19e00822c217171e7fa38d08b2f7ff1ec985971b65fcfe8"
        task_id: "202610290115-HZ4C0W"
        task_revision: 52
      -
        command_digest: "sha256:092a49ab5e0d3ab2ce4137ec2f8c1e3af67b8292ba0140c05580c84b48275d5b"
        id: "validation-resolution:sha256:ec8aea2c6a1e4d5565700b764d1b936715ac65c386f9d70e678bac8ca9153c45:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ec8aea2c6a1e4d5565700b764d1b936715ac65c386f9d70e678bac8ca9153c45"
        occurred_at: "2026-10-29T06:33:35.663Z"
        payload_digest: "sha256:8cfb7d7a7bab1f0a496322b68afe9e57edc1e5dbd14af67ef3b6dfd2ea0d07e6"
        task_id: "202610290115-HZ4C0W"
        task_revision: 53
      -
        command_digest: "sha256:ed2237197c88dea0c54c0b71bf5a332f7471fbdaa8e2e4e12f2bb6c574aec540"
        id: "kernel_work_item_rework_claim_required:sha256:71073fdd890a9fc7f315e5c8c079936df79947d899d90cb21ed973ac49eadfb7:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:71073fdd890a9fc7f315e5c8c079936df79947d899d90cb21ed973ac49eadfb7:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        occurred_at: "2026-10-29T06:33:38.481Z"
        payload_digest: "sha256:95261d0951c6a1d6d2b46eaa2016ffc47eee6bc6509507bc60402cf421be1cc9"
        task_id: "202610290115-HZ4C0W"
        task_revision: 54
      -
        command_digest: "sha256:2c6df4afb2a53f558c604ab046bfe2081488266aed94dad3ab25c1a49140c656"
        id: "kernel_work_item_execution_required:sha256:54f5720b9fa2e8693e693e7efc9bd3c4850a7d0d646def743371c450a0682102:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:54f5720b9fa2e8693e693e7efc9bd3c4850a7d0d646def743371c450a0682102:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        occurred_at: "2026-10-29T06:33:40.749Z"
        payload_digest: "sha256:f45b55230035d9446470efeb8317eb2ab86b7e3cb37cbe75bd650d7ecfe3360e"
        task_id: "202610290115-HZ4C0W"
        task_revision: 55
      -
        command_digest: "sha256:5879035fe6d13629b2f807ae3c09756efdb9c446101d9b5d7115f11609b29edf"
        id: "result:sha256:4911be6daf0eaad8a65015df57c1da74a6b6aeef118a3f2fb5839cf47c47a5db:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4911be6daf0eaad8a65015df57c1da74a6b6aeef118a3f2fb5839cf47c47a5db"
        occurred_at: "2026-10-29T06:38:33.051Z"
        payload_digest: "sha256:f0e2991aa5917ae086b8238278a77d9d55915d4faa208521066f8e4fddd13007"
        task_id: "202610290115-HZ4C0W"
        task_revision: 56
      -
        command_digest: "sha256:08dcd99bf34d069a705e35c691dab56675212f203476ab20af74155012e93711"
        id: "kernel_work_item_inspection_required:sha256:4f0c8926c4edabebdb9d4b8e9618be1f91a412fb9755d13dc5ba551f5137c456:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:4f0c8926c4edabebdb9d4b8e9618be1f91a412fb9755d13dc5ba551f5137c456:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        occurred_at: "2026-10-29T06:38:35.326Z"
        payload_digest: "sha256:683c413683c848a8f021ba3cad0592d934438debd0bcd6265bfae229b6a2f64a"
        task_id: "202610290115-HZ4C0W"
        task_revision: 57
      -
        command_digest: "sha256:a96a9926a5115682ba92ac4f6f230cd173afdaa9f2f3f5a5a94881d430125772"
        id: "validation:sha256:f52b61672dd39d991a0bb14c15a48f4167da74a257875dbb7eda819a2ec89737:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f52b61672dd39d991a0bb14c15a48f4167da74a257875dbb7eda819a2ec89737"
        occurred_at: "2026-10-29T07:11:39.909Z"
        payload_digest: "sha256:f1eeba706832f103dcf284b0d41c7f260682571f55b9ab9553938f2b0ad622f4"
        task_id: "202610290115-HZ4C0W"
        task_revision: 58
      -
        command_digest: "sha256:d7fc1344860ff34fd28278aeef2947e3583ec04648bb72b04b6ff9ecb4c85b8a"
        id: "validation-resolution:sha256:2876119731236c20ad9ef0d5d4fe62f1da1bcd7c00c3ed76557fd35527301b99:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2876119731236c20ad9ef0d5d4fe62f1da1bcd7c00c3ed76557fd35527301b99"
        occurred_at: "2026-10-29T07:11:41.244Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202610290115-HZ4C0W"
        task_revision: 59
      -
        command_digest: "sha256:887adceff3d45fa21f84c9c17abd4f0ebcedcbb84cb1baac7e912b9e0de5877d"
        id: "final-validation:sha256:313ac4d19dd0c3e64aec37300527d58979282fa665d6e25d72ab5f52c2296134:59:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:313ac4d19dd0c3e64aec37300527d58979282fa665d6e25d72ab5f52c2296134:59"
        occurred_at: "2026-10-29T07:31:30.550Z"
        payload_digest: "sha256:c7d1d84116545068ce2e8f1d72f06b262dcc51e47e03f8e256fbafbe41cf2344"
        task_id: "202610290115-HZ4C0W"
        task_revision: 60
      -
        command_digest: "sha256:f16593debf19cd5dfd5a586f25ba07af05fba08ec40fa49ed3f0830b405d0649"
        id: "final-validation:sha256:ce94f5c169647a28e120ea32c6adbd760d481eabfd205f375a7e23707f90bc6a:60:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:ce94f5c169647a28e120ea32c6adbd760d481eabfd205f375a7e23707f90bc6a:60"
        occurred_at: "2026-10-29T07:56:28.299Z"
        payload_digest: "sha256:8f17db85f5fccaaa95cb3a1b4ded160403d3e7831bab6fde2f140e48f15fc0fd"
        task_id: "202610290115-HZ4C0W"
        task_revision: 61
      -
        command_digest: "sha256:80e5d72afc60fb9ff817ef2466f23eb47bd2114fb4e05fb5416eaecec0e0144c"
        id: "kernel_task_completion_required:sha256:e3388c336c1fe2494d7a2173347456e56655aaecfd442c5d6529966b42cf303b:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:e3388c336c1fe2494d7a2173347456e56655aaecfd442c5d6529966b42cf303b:sha256:a33aff011036e99331fd630e3e36922636321114291eb0e306e6e589b5e90d27"
        occurred_at: "2026-10-29T07:56:33.803Z"
        payload_digest: "sha256:90a6610db8fe167c6e8ca4b9f3a89abca9edd9c4549c35bd60956f52de318231"
        task_id: "202610290115-HZ4C0W"
        task_revision: 62
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve frozen execution base while revalidating publication after main advances

The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json.

## Scope

- In scope: The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json.
- Out of scope: unrelated refactors not required for "Preserve frozen execution base while revalidating publication after main advances".

## Plan

1. Execute approved WorkItem publication-base-advance.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-29T07:31:31.513Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c7f40471aab7f29cb33117fa69b09c04daf0ab903aa1dd9b971374c6efdb5765, input_digest=sha256:a9653a7856f83e592ca8baddce69d50aa792fd9aa017c524cdd35dfb5e837bdb

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check full_regression

Check: real_e2e
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17
- policy_digest: sha256:35781f355aaa21293eb931f34639e0e5cad5380fea760bef8ef8e0fa5ae1c536
- capability_digest: sha256:aa417008bff297f335bc36564e097d599b9d9ee93384f1f52e730016f6d50be8
- checks_digest: sha256:bcfbf314e24fee5a826fe8bf8ee59f2e82eb6c796cc81c30b47924f031ae9234
- identity_digest: sha256:2937358057e0c9ee7a52cbe81cb2adde158f8dcc19f64487a7c8babb7d27074b

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610290115-HZ4C0W
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-10-29T07:56:29.342Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c7f40471aab7f29cb33117fa69b09c04daf0ab903aa1dd9b971374c6efdb5765, input_digest=sha256:6cd55d5a39f9f907fc67b31617e229c6dc0b1fb09182c73cab7e8eff2de1dbab

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check full_regression

Check: real_e2e
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: bun run test:project agentplane --run packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/provider-update-verification-proof.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/provider-update-effect-recovery.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge-strategy.test.ts packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/pr/provider-update-branch-local.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run test:project cli-core --run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610290115-HZ4C0W/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610290115-HZ4C0W Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:5703760d385f79fe3ea864e808bf800491da0dc765ba5420ba3e2aaef6276a17
- policy_digest: sha256:35781f355aaa21293eb931f34639e0e5cad5380fea760bef8ef8e0fa5ae1c536
- capability_digest: sha256:aa417008bff297f335bc36564e097d599b9d9ee93384f1f52e730016f6d50be8
- checks_digest: sha256:5d6a8ca9eccf6a919240c43b2efb2dac031f4ee8a3fe3a1c23f8e874d54985e4
- identity_digest: sha256:d59cebd84ccaf19085b02280c12d367bd157b9ddcaba25c91c1be96fe7ea40a1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610290115-HZ4C0W
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
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:ae0d6bdd5e644691ffd9b5bfcbf0e74892545409f1d84298d223f367eb818175`
- Unavailable reason: `no_supervised_agent_runs`
- Updated at: `2026-10-29T08:03:16.601Z`
