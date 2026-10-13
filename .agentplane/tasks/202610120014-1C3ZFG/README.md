---
id: "202610120014-1C3ZFG"
title: "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 173
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane typecheck"
  - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
  - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
  - "npm run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-14T04:37:17.620Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-14T04:56:36.241Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-14T04:37:11.235Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "836789403c235346efe7539d6860ea79588b7b80"
  review_identity_digest: "sha256:0b2c2f2d8230f4522027dc00821871c5ed67aee002682dbf8aaed6ddff42bec3"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/e3211efdff4c8c9f8209823f31eb90c62ec067b5adeeacbeb44bb1f30f2d6db6/quality-report.json"
  findings:
    - "IndependentSOURCE/body/opreview042a39 preserves alloldertestcases/assertions/Bun/npm runner/150min default/explicitoverrides/full-versus-hosted checkbindings. OnlyexistingcommitAll/twomkGitRepoRoot/twofixturepackagecommits; existingtestkitcleanup. Other24/productionselector unchanged. ActualSOURCEpair54PASS includesolder42+qualification12; lint/format/typesPASS."
    - "Actualnative run072/073/074/075/076 PASS54/14/types/102/12 underfive native-default1800000ms. Completeuntruncated manifests/log hashes, WHOLEactualnativeinput equals expected64e1/0903. Public64e1/segment8a74/aggregate765a separatelyverified; no fabricatedENV equality."
    - "Authenticnativecommit ONEadmittedtest+ownTaskmetadata, all25working/committedbytes/modes/old7completed/Plan16/contracts/results/history/effects retained. Task141/claim291daa/13requiredEVALcontexts+fourrequiredinputs genuine; pathlessreportb922 retained."
    - "Independentactualaudit /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/source25-current141-EVALe321-independent-native5-actual-audit.v1.json SHA256 90fa16860a536f694dbd55418842a0aea6b0b81dc8fa08c29fe878b604be3613. HistoricalFULL577aba/fe8 FAILED retained, not retroPASS. Thisinspection is SOURCE1/native5, not finalFULL/C8/QAN delivery."
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
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
      - "packages/agentplane/src/commands/guard/impl/commit.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
      - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
  declaration:
    external_effects: []
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
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
      - "packages/agentplane/src/commands/guard/impl/commit.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
      - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
      - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
      - "packages/agentplane/src/commands/guard/impl/commit.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
      - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
      - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
      - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
      - "packages/agentplane/src/runner/process-supervision/run.ts"
      - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
      - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
          - "packages/agentplane/src/commands/guard/impl/commit.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
          - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
          - "packages/agentplane/src/runner/process-supervision/run.ts"
          - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:471e3115227cd824d718faacf2ea6ddf44b3b4b2decffb22ff417b2b98f26861"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/index.ts"
        - "central_component:packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_component:packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/replan-work-items.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_path:packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/replan-work-items.ts"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
          - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
          - "packages/agentplane/src/commands/guard/impl/commit.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
          - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
          - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
          - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
          - "packages/agentplane/src/runner/process-supervision/run.ts"
          - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
          - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "836789403c235346efe7539d6860ea79588b7b80"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-13T07:20:18.817Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "verify"
    at: "2026-10-14T04:56:36.241Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-14T04:56:37.442Z"
doc_updated_by: "SUPERVISOR"
description: "Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness."
sections:
  Summary: |-
    Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main

    Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
  Scope: |-
    - In scope: Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
    - Out of scope: unrelated refactors not required for "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main".
  Plan: |-
    1. Execute approved WorkItem integrate-reviewed-nine-sources.
    2. Execute approved WorkItem final-correction-12acd7c9fe60.
    3. Execute approved WorkItem final-correction-cca82dcaef21.
    4. Execute approved WorkItem correct-authenticated-fixture-size-baseline.
    5. Execute approved WorkItem final-correction-54d63c107316.
    6. Execute approved WorkItem canonical-full-clean-checkout-prerequisite.
    7. Execute approved WorkItem final-correction-ec8e8e56f09c.
    8. Execute approved WorkItem final-correction-577aba1eacec.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run --filter=agentplane typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `npm run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-13T07:20:18.817Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ee8f743f83de02f293d70a318330c6138b6eb92ab99223b805bd326adb038400, input_digest=sha256:1b2e04f44a62848fa890ba63a647385d7fa60e7fb2a6b892f556ec4148fe46c1

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (5/5)

    NativeTaskIdentityRef:
    - plan_digest: sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc
    - policy_digest: sha256:b0f3ed8717357e14968093aaf83e3059ba55a248477be0e758cb9ae571d6f7ac
    - capability_digest: sha256:7d33ab1461544ce8dc79659115dade0a885488dad196eb6c615faf6c9af4adf8
    - checks_digest: sha256:c77576d083b486c7008b93168bdb90a4ae1e720d6719a7309805400ec7baf415
    - identity_digest: sha256:d909a3617b9757242fe9455e8dc0b9d07b4bb7af5bfe42d044bf04eb537dfd30

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610120014-1C3ZFG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-10-14T04:56:36.241Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ee8f743f83de02f293d70a318330c6138b6eb92ab99223b805bd326adb038400, input_digest=sha256:285dd6cb454fae9e742f75384c2891ecd0166667f8e3964fa187f6db25518959

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (1/6)

    Check: affected_unit_integration
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (2/6)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (3/6)

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (4/6)

    Check: affected_unit_integration
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (5/6)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (6/6)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (1/6)

    Check: critical_paths
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (2/6)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (3/6)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (4/6)

    Check: critical_paths
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (5/6)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (6/6)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (1/6)

    Check: task_outcome
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (2/6)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (3/6)

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (4/6)

    Check: task_outcome
    Command: bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (5/6)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (6/6)

    NativeTaskIdentityRef:
    - plan_digest: sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45
    - policy_digest: sha256:b0f3ed8717357e14968093aaf83e3059ba55a248477be0e758cb9ae571d6f7ac
    - capability_digest: sha256:ae3e60b0e354e870e15d67f489ecfe4a417bc2b06a4d5b37e2f1f2de54918b98
    - checks_digest: sha256:177a843180ab8d98aee34f9d1eaf16799344f8b0e879bf531c5f65aa1c9690b1
    - identity_digest: sha256:8d3efdbf613027660060c262c3e4c2492b0ef8791c32bc4ca2312749248c784e

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610120014-1C3ZFG
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
    digest: "sha256:b6e9d3c955e11d400f2dd9fba737e33010d9b637728a23805380097d8b42d104"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/e3211efdff4c8c9f8209823f31eb90c62ec067b5adeeacbeb44bb1f30f2d6db6/quality-report.json"
    findings:
      - "IndependentSOURCE/body/opreview042a39 preserves alloldertestcases/assertions/Bun/npm runner/150min default/explicitoverrides/full-versus-hosted checkbindings. OnlyexistingcommitAll/twomkGitRepoRoot/twofixturepackagecommits; existingtestkitcleanup. Other24/productionselector unchanged. ActualSOURCEpair54PASS includesolder42+qualification12; lint/format/typesPASS."
      - "Actualnative run072/073/074/075/076 PASS54/14/types/102/12 underfive native-default1800000ms. Completeuntruncated manifests/log hashes, WHOLEactualnativeinput equals expected64e1/0903. Public64e1/segment8a74/aggregate765a separatelyverified; no fabricatedENV equality."
      - "Authenticnativecommit ONEadmittedtest+ownTaskmetadata, all25working/committedbytes/modes/old7completed/Plan16/contracts/results/history/effects retained. Task141/claim291daa/13requiredEVALcontexts+fourrequiredinputs genuine; pathlessreportb922 retained."
      - "Independentactualaudit /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/source25-current141-EVALe321-independent-native5-actual-audit.v1.json SHA256 90fa16860a536f694dbd55418842a0aea6b0b81dc8fa08c29fe878b604be3613. HistoricalFULL577aba/fe8 FAILED retained, not retroPASS. Thisinspection is SOURCE1/native5, not finalFULL/C8/QAN delivery."
    implementation_commit: "836789403c235346efe7539d6860ea79588b7b80"
    implementation_tree: "a918ebed9c18e80ce30bca011ba55bbfcdbefabf"
    projected_at: "2026-10-14T04:37:11.235Z"
    review_identity_digest: "sha256:0b2c2f2d8230f4522027dc00821871c5ed67aee002682dbf8aaed6ddff42bec3"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:04a097a96754fd8a9a92d69e4b7ef2ee011fbc63b69ae457348f80427d4acb9d"
    work_order_id: "sha256:171ac6d10900de00332ad3c3ceb340827e255b54432ee8bca609c7a5ec938f30"
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
            digest: "sha256:539a6b1e9eb4d959734b0f6766067a435322fd4f1f33a7157a85d0b053713232"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e16dab7c90622938d52df6cd0a36b7e68601f036a01a3cd91fdc68c264e9b259"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
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
            digest: "sha256:9c0b0ece30b5966a8c0a293ade91d2373868096aeae3933bc9d33734124d46cd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e16dab7c90622938d52df6cd0a36b7e68601f036a01a3cd91fdc68c264e9b259"
              kind: "USER"
              parent_authority_digest: "sha256:539a6b1e9eb4d959734b0f6766067a435322fd4f1f33a7157a85d0b053713232"
            repository_effects:
              - "repository_write"
              - "security_boundary"
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:249e2a8fc12c38d2c1f1e3fcb63a50eff8b8b104dc21031ca28f0d71dd36d72b"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            request_digest: "sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
            scope_request:
              attempt: 1
              claim_id: "sha256:8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b"
              contract_digest: "sha256:128748307635320a795e1f3361b14b80175834307631dc650e041e70753caf77"
              intake_after_digest: "sha256:71fb1bc85ace415bad00d1535f3040f48bbc68879c45ab868a5990855e940e21"
              intake_before_digest: "sha256:4d45a9c176b7e03fd9b34325799c2e1773ae9609f3e3d7a27934c6ce3e5d9890"
              parent_authority_digest: "sha256:539a6b1e9eb4d959734b0f6766067a435322fd4f1f33a7157a85d0b053713232"
              plan_digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
              plan_revision: 1
              record_digest: "sha256:84488479752d3b483b5686f3d95a84c1286e706e13e811ad9b3ce627b9628fa9"
              repository_effects: []
              repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:bef1874535b2af8dd0b68aaecbc48740860b540502171f4c328e5a4250eb59bd"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              stop_receipt_digest: "sha256:b4f1c401184e75a6a06aff6441ca5cc08bec752874e5b3a37cdd70b8a59fc2cc"
              task_id: "202610120014-1C3ZFG"
              task_revision: 7
              work_item_id: "integrate-reviewed-nine-sources"
              work_order_id: "sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c7ce1e708b33007e759c841c82bcebe02f5aa2f1be9e637ee81440f6f2ee40e2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47a8364a6762d41ca569f119563ea3789d47cbaabad9474590f4be1194b1f71c"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
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
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:5fc9be8965dce7a00140764a781cfe7ccb240dd87faf5d4ef2548f433a56418a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47a8364a6762d41ca569f119563ea3789d47cbaabad9474590f4be1194b1f71c"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c7ce1e708b33007e759c841c82bcebe02f5aa2f1be9e637ee81440f6f2ee40e2"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            evidence_digest: "sha256:545111aa1da2823864ed4d75e96f0a9795f8c21d4b94d65449217146a83e984a"
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
            digest: "sha256:3715fc22cc3b1871939c952cf7e9513597a037bd3785cc78affb9a95ccd7ec10"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5fc9be8965dce7a00140764a781cfe7ccb240dd87faf5d4ef2548f433a56418a"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:2d676dca32fe53f5303027347cc7b0a75e549c36c9256be72d8d7d58da2af0a1"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0ca6529ef7b80c027d0256419e83c9b470fcc7c3977591c1ed70e4266e722227"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3715fc22cc3b1871939c952cf7e9513597a037bd3785cc78affb9a95ccd7ec10"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
            evidence_digest: "sha256:aef12a68cceed3a71bf23653b6fc7a82576312c7ed9de24b2e6b1f523624f64d"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b71155adcb39cd55eae902a60ea7f0212a96864e76f194466400c670f8cfd351"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
              kind: "USER"
              parent_authority_digest: "sha256:0ca6529ef7b80c027d0256419e83c9b470fcc7c3977591c1ed70e4266e722227"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:e1b98a57c1f7eeb8c87cddc5814184d917a72785de8ccd2afe5d2b06190384d3"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
            request_digest: "sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8"
            scope_request:
              attempt: 4
              claim_id: "sha256:f23068fa8e569a422fd3b2a25a4b1528db802132874af2bb254667cfa875ab67"
              contract_digest: "sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e"
              intake_after_digest: "sha256:2aeb0d264db4258ed73dd5294f513f14228b102368ed41d2cebe658ee19fce1e"
              intake_before_digest: "sha256:71fb1bc85ace415bad00d1535f3040f48bbc68879c45ab868a5990855e940e21"
              parent_authority_digest: "sha256:0ca6529ef7b80c027d0256419e83c9b470fcc7c3977591c1ed70e4266e722227"
              plan_digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
              plan_revision: 3
              record_digest: "sha256:23f08c37be25d4edd9287f3b050c3d1817d41cb739b6c7cd82a8c857f99201b9"
              repository_effects:
                - "security_boundary"
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:5b050622fe1e6f81bb3de3ea1c959821b3aebde31fa16c156bbcb72ac8590eb9"
              scope_roots:
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              stop_receipt_digest: "sha256:483c4c5c8ea9312b7d21a91f4c2194fbcfe62397c75f096a7f88ce26db269f08"
              task_id: "202610120014-1C3ZFG"
              task_revision: 26
              work_item_id: "integrate-reviewed-nine-sources"
              work_order_id: "sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:feeadf855d918ad0da14b7062bb618aeab18305a0d9be59e45bef27cee6f48c8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:2f39a04c16d27fce94634555b7d9a4e0f65479c62d50fa0a6880709a43c5e0e0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
            plan_revision: 4
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:feeadf855d918ad0da14b7062bb618aeab18305a0d9be59e45bef27cee6f48c8"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            evidence_digest: "sha256:1e0ea05b17d88951ee654fea9e1c6c9e68595bf1c9cec62c20f7d62ddd334964"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:31bc7b9f2b74f65a5789d967028f360f1fea00c9794c6e160ffb6d502bc8f4b7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2f39a04c16d27fce94634555b7d9a4e0f65479c62d50fa0a6880709a43c5e0e0"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:890b6ba87a83562a52f39edab5b0c5ca4f2ae63866885a981c73dbd68ba4ca9a"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a69ffe1125100ab60dc49c3e8f040f65265071b36c42ea807810768584e7f3ed"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
            plan_revision: 5
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:31bc7b9f2b74f65a5789d967028f360f1fea00c9794c6e160ffb6d502bc8f4b7"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
            evidence_digest: "sha256:2ba4668aaf27aa197db6197085b4cb28a1d3d3b4e81bd33112caf03cf263f410"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d3501461bed92f4d3bb1d25699f8fb4abcf616def96ac556dafd85edfdac7281"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:a69ffe1125100ab60dc49c3e8f040f65265071b36c42ea807810768584e7f3ed"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:dc53aada530f5cadf3d495bcc1ddc9065bb948382703b98945cbfd344e41eda8"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:455e006bd39438ac4d51b314c1ddfcb85d2c9944e8b36a9d4550051a0d3fcb56"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
            plan_revision: 6
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
              kind: "USER"
              parent_authority_digest: "sha256:d3501461bed92f4d3bb1d25699f8fb4abcf616def96ac556dafd85edfdac7281"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:47ecaa3f55e926c128ddded5cb5fb2b1107dd731f63af880d92ca206738d6dd0"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
            request_digest: "sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32"
            scope_request:
              attempt: 1
              claim_id: "sha256:703d3b34b74f9018b4d7b2912164915c6b30e960ac7ab71545ddcf42944ab981"
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              intake_after_digest: "sha256:0c15215af6a651228d83528e33e5d252362a77ff7d741473b52d7eef48d4099e"
              intake_before_digest: "sha256:2aeb0d264db4258ed73dd5294f513f14228b102368ed41d2cebe658ee19fce1e"
              parent_authority_digest: "sha256:d3501461bed92f4d3bb1d25699f8fb4abcf616def96ac556dafd85edfdac7281"
              plan_digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
              plan_revision: 6
              record_digest: "sha256:da0a4f368b9438730cfbb0e55c873ef2414dabc09a93a3ed6f889aa294231155"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:4465bedd41f427f4cf44e386616b84a4bea7d654d8377cc1154be9200cef219c"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              stop_receipt_digest: "sha256:091580e948dee8318b37116e0141acedfa086ecd257ddf2a192bf9f475093e40"
              task_id: "202610120014-1C3ZFG"
              task_revision: 52
              work_item_id: "final-correction-cca82dcaef21"
              work_order_id: "sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2e2b13dec9479c8f90995eab8470684272f53abf83d98b9dde423d7e27b03e82"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:7a0629fd6498b8812a81205555f95f3cf2c64c4bea64f9fb9f748f975f37e68d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2e2b13dec9479c8f90995eab8470684272f53abf83d98b9dde423d7e27b03e82"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
            evidence_digest: "sha256:2f928c45a6b5e1c09e176518b399616558e9f220e9eb7451bc654e2923e2df43"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:85b6279045980b7669fa2998742e1f7805430c33cb08ff590ddacf6e020a97b4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
            plan_revision: 7
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
              kind: "USER"
              parent_authority_digest: "sha256:7a0629fd6498b8812a81205555f95f3cf2c64c4bea64f9fb9f748f975f37e68d"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:b87bc995c850d109a0375f09ae2741a8d69e88cb4ba62c6c1c0ecbffccd56e5c"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
            request_digest: "sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe"
            scope_request:
              attempt: 2
              claim_id: "sha256:85dab8846a5096a51e0044c65e40a337c0d1b88fca88a75efbc32ef1b59fe550"
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              intake_after_digest: "sha256:4ce5b62304809804366a927d9922fe49e8236c88da3acbbf9ea057da525e692d"
              intake_before_digest: "sha256:0c15215af6a651228d83528e33e5d252362a77ff7d741473b52d7eef48d4099e"
              parent_authority_digest: "sha256:7a0629fd6498b8812a81205555f95f3cf2c64c4bea64f9fb9f748f975f37e68d"
              plan_digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
              plan_revision: 7
              record_digest: "sha256:b0ff55cf7108a0e86eafc42f6fe6a12822879bc2102a44577603b7a58803c5fe"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:8e60c08bc74d839150d2446d624ea9fb5d778fde6a45b81100227d1e6fd762ba"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
              stop_receipt_digest: "sha256:9243351a8a4a024097c9f63b9962f4e4db0d60573bf3b47584e21ead05da077e"
              task_id: "202610120014-1C3ZFG"
              task_revision: 59
              work_item_id: "final-correction-cca82dcaef21"
              work_order_id: "sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d22edfe5bc7b1e508f4320b5dcb6544871e57676e622e1bef76b43902e339c35"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
            plan_revision: 8
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:0427f0ff270015dd0de8f07c46cdccdbba442edbfdc58e2ee7adbb45f3227989"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
            plan_revision: 8
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d22edfe5bc7b1e508f4320b5dcb6544871e57676e622e1bef76b43902e339c35"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
            evidence_digest: "sha256:b08b8b40ce9276b7ad96d5686d7e927024b413a5518c7efa3c8d08b2c90f14b2"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b4859162324c0ec77210e1f5cd24c1073ea0195be3ae66e240c79a47b96630fe"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
            plan_revision: 8
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0427f0ff270015dd0de8f07c46cdccdbba442edbfdc58e2ee7adbb45f3227989"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            evidence_digest: "sha256:eecf91f2e02ba945be83c95216f7be2c7a449d55c3a122b1ac894a23919456e3"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e5d403cf6d4b1a0cc82bfb8ff91b80a93cda46ec5473ea8dc066817da008d706"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d"
            plan_revision: 9
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b4859162324c0ec77210e1f5cd24c1073ea0195be3ae66e240c79a47b96630fe"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:a70bcdaf3589a8a18115a921decf53c8438f3a317a78e841d676cc33fe0a929b"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b5b61c35b3b85309d7b40c145e8e1e1d7f78bd45f0d7e875211be11421f7081e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d"
            plan_revision: 9
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e5d403cf6d4b1a0cc82bfb8ff91b80a93cda46ec5473ea8dc066817da008d706"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
            evidence_digest: "sha256:a3469f89b6d29aacd38f3b1c0ab5ddc57c469ceab50ef8116462cb7e1ce86b9e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d24862c0e1e7df3a32a9aa483859ab467e880025b045d7ecc2c9df9db234dccf"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7"
            plan_revision: 10
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b5b61c35b3b85309d7b40c145e8e1e1d7f78bd45f0d7e875211be11421f7081e"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:f04d8a18c3ae31cf90bb9a96a8cf381795658cce3c3de348f35c0a399ab3d3de"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5d68461530e22f4314a44af924221704d3a0234735caf7eb125fc55c82bc6514"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7"
            plan_revision: 10
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
              kind: "USER"
              parent_authority_digest: "sha256:d24862c0e1e7df3a32a9aa483859ab467e880025b045d7ecc2c9df9db234dccf"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:b8a4bb939b5a9cd7e7d8a0c7525cbd9ca89560504003f063c00625f3a74d4db5"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
            request_digest: "sha256:24922491a25803503a1b002fc1e55b2cf1988d179ce7aeada9fe568fe9c5873c"
            scope_request:
              attempt: 1
              claim_id: "sha256:77c0e4f05f7d251c0cd3067058110e4581ddeaec9b0c383aba480a3089adbc74"
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              intake_after_digest: "sha256:38ec08a61a5ed8ec646720b54c3ee2e04057b27c655a0913b84a2155386ac79e"
              intake_before_digest: "sha256:4ce5b62304809804366a927d9922fe49e8236c88da3acbbf9ea057da525e692d"
              parent_authority_digest: "sha256:d24862c0e1e7df3a32a9aa483859ab467e880025b045d7ecc2c9df9db234dccf"
              plan_digest: "sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7"
              plan_revision: 10
              record_digest: "sha256:69704242c1ebbfec4966f346e639250b1a6bb425d894d92fb0466a7fb0ef48e0"
              repository_effects:
                - "tests"
              repository_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:a250b45589ffd8e11343b34b65d10c569e20d8f71246a9405ca9d62ee70abe87"
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              stop_receipt_digest: "sha256:c67a1c939dd14eeaf7c0fa99d4b4fbc0af2df0d0b63fb8822f936017738c4cbd"
              task_id: "202610120014-1C3ZFG"
              task_revision: 91
              work_item_id: "final-correction-54d63c107316"
              work_order_id: "sha256:4e0a3ff62e56c2f72d093e828e4136b20ecf9c86f6bccce6a8187e5be5993a1f"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5a44b2ca6a3ba79567067b36fa293ba50e2f8dd9151fb68595d6bfa6e966533d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc"
            plan_revision: 11
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a12860cc0ad632d104bf6cb9a43676ffba1219f6caf6d4f9aaa2319c2f59015b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:3add250dafad8ca7ce9e9a4c03a58aebda57895523dd257a549f01851a0e2aea"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc"
            plan_revision: 11
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a12860cc0ad632d104bf6cb9a43676ffba1219f6caf6d4f9aaa2319c2f59015b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5a44b2ca6a3ba79567067b36fa293ba50e2f8dd9151fb68595d6bfa6e966533d"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
            evidence_digest: "sha256:5f616ff0b0ce5baa28cddf9125241068f96218a577e7ad65b7302ee02837eda7"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:925ed83386e96e4d91543f1ba647c635b3158f0714553b90eee8fbf3c406f9a9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab"
            plan_revision: 12
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a12860cc0ad632d104bf6cb9a43676ffba1219f6caf6d4f9aaa2319c2f59015b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3add250dafad8ca7ce9e9a4c03a58aebda57895523dd257a549f01851a0e2aea"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:73c60fd85996602c5ff1b33c971e8be0277bc38141b33228198162cfbf598b5a"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7a309868ff904efa140a1b40824d8132437a6697bde28d586c75f1d676a5b154"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab"
            plan_revision: 12
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a12860cc0ad632d104bf6cb9a43676ffba1219f6caf6d4f9aaa2319c2f59015b"
              kind: "USER"
              parent_authority_digest: "sha256:925ed83386e96e4d91543f1ba647c635b3158f0714553b90eee8fbf3c406f9a9"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:43a23c89e2b7437965831ffc4342cffdf9d664327eae26be32b0f18579500a12"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
            request_digest: "sha256:ea5dccc0aa0a255cf536f1d9ede68d26f0d92937a54bf72a5a46d6996d5cf43e"
            scope_request:
              attempt: 1
              claim_id: "sha256:ba26a98ee73c760177fc4754a644abc1092c9ee8700ea05ef7dbe403778c9f19"
              contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
              intake_after_digest: "sha256:63c253b80642150078386bf2d136936c8a48927091e77461cfe46811feca45b3"
              intake_before_digest: "sha256:38ec08a61a5ed8ec646720b54c3ee2e04057b27c655a0913b84a2155386ac79e"
              parent_authority_digest: "sha256:925ed83386e96e4d91543f1ba647c635b3158f0714553b90eee8fbf3c406f9a9"
              plan_digest: "sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab"
              plan_revision: 12
              record_digest: "sha256:1ae6bd92da0763ac9f7a610be093e5a6f37ee85b16adb05824d6da0bbda109da"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:599e6b7ea67a7edb268afc5ac5333b49748e32d7749c937fb17de853303b76ab"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              stop_receipt_digest: "sha256:34127de42403bcd3265c3150833b6871244b48e00bfee44c0022e661d7c7e11c"
              task_id: "202610120014-1C3ZFG"
              task_revision: 107
              work_item_id: "canonical-full-clean-checkout-prerequisite"
              work_order_id: "sha256:a0fefec86d03c9cbc2f191dc4f304f955d5829d727db4fb1bd48112c5afc9cef"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0d3b875441787c4edacddceefc2715b516620033454172eede2fbb57df55329b"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1"
            plan_revision: 13
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:d56179ee12fb44c85ae30ca882851038b1f7863da6d2d7992fc23a4041bc6dcd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1"
            plan_revision: 13
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0d3b875441787c4edacddceefc2715b516620033454172eede2fbb57df55329b"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            evidence_digest: "sha256:b31b794104770db973b283d412180ce604368c967a336f2ea35434213b80162c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6717bc5f42357ebc766b9a93954d4e6abdafe9ba846188b0aea744efb777c8b8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567"
            plan_revision: 14
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d56179ee12fb44c85ae30ca882851038b1f7863da6d2d7992fc23a4041bc6dcd"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:cc89de3811826ee85294ca6412dbff1ae227b80c1d2cfa444ed6aafa18e3728e"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:7ac34cae875b300b93b24873c936f6bc12557ee4e92a059ffb62d9d3ae77eab5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567"
            plan_revision: 14
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6717bc5f42357ebc766b9a93954d4e6abdafe9ba846188b0aea744efb777c8b8"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
            evidence_digest: "sha256:df5b8d5873965594e1771a3758b92555d8461319d272001ecb33741eb3aa50aa"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:867756798b14311670d550d6798714ad42afe817886c6ab30732a95d3a40327a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053"
            plan_revision: 15
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:7ac34cae875b300b93b24873c936f6bc12557ee4e92a059ffb62d9d3ae77eab5"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            evidence_digest: "sha256:9c8b4c6c1669c53740d134b3eb9e429b58ac28139362cd1bbdc345960785f623"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:afcab416d85b293e71354b522bd13c9d70401c5447937cb8345c2fd0891f2442"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053"
            plan_revision: 15
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
              kind: "USER"
              parent_authority_digest: "sha256:867756798b14311670d550d6798714ad42afe817886c6ab30732a95d3a40327a"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:a91bac96280104ebb3b0c0cc34781d86c282e003b0f95de85990e48310d539ee"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
            request_digest: "sha256:0b31982ac6369b63c478a1372431651f6e579c15628ae99812b2951e11325b51"
            scope_request:
              attempt: 1
              claim_id: "sha256:73b42d84dcbbb25ed1c21a660275396389228659a3055cfdbc71c5ab61d88221"
              contract_digest: "sha256:8726e673df43e4bfa54a282ff6a72a3018e74fea7e89481c322717d08b0d64e9"
              intake_after_digest: "sha256:1258dd8c614092185464107c83825996e54db5498aade32ee031b0ed9c4d66f1"
              intake_before_digest: "sha256:63c253b80642150078386bf2d136936c8a48927091e77461cfe46811feca45b3"
              parent_authority_digest: "sha256:867756798b14311670d550d6798714ad42afe817886c6ab30732a95d3a40327a"
              plan_digest: "sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053"
              plan_revision: 15
              record_digest: "sha256:58c632c7747d2748fbd08bb42a578edde9c86a9eca9672fb969da08fce676e60"
              repository_effects:
                - "source_code"
                - "tests"
              repository_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:2bed424eaa021e4f3ec175947fff527409bcb89eaac86cb9c4e3375e43b725ac"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              stop_receipt_digest: "sha256:f4d66081a9e394c43a80a3503915f95abe6090b4f05d0793ae9e279ec65bd1ae"
              task_id: "202610120014-1C3ZFG"
              task_revision: 133
              work_item_id: "final-correction-577aba1eacec"
              work_order_id: "sha256:7f4ac438def0408250f9f47515a3ceb35f39cf8813127295f6fac869bfa4584d"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c9b7b3265072e62b62ece22aca039b652e5986764fd92ffdd244043674efa932"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45"
            plan_revision: 16
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:09ed1beae2c7eb04d3dd1066fc8e5ce4066127ca84c4dad970388d47718e1181"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
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
            digest: "sha256:6c94d23c95d292acf0250bf7e764675f8e6d86ba68d80ad72db34ea32d63f010"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45"
            plan_revision: 16
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:09ed1beae2c7eb04d3dd1066fc8e5ce4066127ca84c4dad970388d47718e1181"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c9b7b3265072e62b62ece22aca039b652e5986764fd92ffdd244043674efa932"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/open.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
              - "packages/agentplane/src/runner/process-supervision/run.ts"
              - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            task_id: "202610120014-1C3ZFG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            evidence_digest: "sha256:81a83828991dae5e68494f4e03bb6311dcaf08183d4390ddf24f1e357b974404"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:09ed1beae2c7eb04d3dd1066fc8e5ce4066127ca84c4dad970388d47718e1181"
        digest: "sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45"
        revision: 16
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
            expected_outputs:
              - "nine-source-adoption-report"
            id: "integrate-reviewed-nine-sources"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
            depends_on:
              - "integrate-reviewed-nine-sources"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-12acd7c9fe60-evidence"
            id: "final-correction-12acd7c9fe60"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
            expected_outputs:
              - "final-correction-cca82dcaef21-evidence"
            id: "final-correction-cca82dcaef21"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
            expected_outputs:
              - "authenticated-fixture-size-correction-evidence"
            id: "correct-authenticated-fixture-size-baseline"
            optional: false
            required_inputs:
              - "nine-source-adoption-report"
              - "final-correction-12acd7c9fe60-evidence"
              - "final-correction-cca82dcaef21-evidence"
          -
            contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-54d63c107316-evidence"
            id: "final-correction-54d63c107316"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
              - "final-correction-54d63c107316"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "canonical-full-clean-checkout-evidence"
            id: "canonical-full-clean-checkout-prerequisite"
            optional: false
            required_inputs:
              - "nine-source-adoption-report"
              - "final-correction-12acd7c9fe60-evidence"
              - "final-correction-cca82dcaef21-evidence"
              - "authenticated-fixture-size-correction-evidence"
              - "final-correction-54d63c107316-evidence"
          -
            contract_digest: "sha256:eea8dcf3e830d0284789d3c0e022a446e2b7ced4259d8732e393e148197f49bb"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
              - "final-correction-54d63c107316"
              - "canonical-full-clean-checkout-prerequisite"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-ec8e8e56f09c-evidence"
            id: "final-correction-ec8e8e56f09c"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:8726e673df43e4bfa54a282ff6a72a3018e74fea7e89481c322717d08b0d64e9"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
              - "final-correction-54d63c107316"
              - "canonical-full-clean-checkout-prerequisite"
              - "final-correction-ec8e8e56f09c"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-577aba1eacec-evidence"
            id: "final-correction-577aba1eacec"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:f5f04889ff026c9ecf1dd52e6b9dbbab16c0583013811cda9d23bc1b7bb5b4af"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:a61eb8d6ce6558430bc2af653aa1f10c06201cb51a7f85eafc84dce299e8ae0a"
          environment_digest: "sha256:ed4a02c0afb0fffa67680957ea73325b74eb6cd8803921ea6d94ea7d0d887f2a"
          implementation_identity: "sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d"
          toolchain_digest: "sha256:403827e137bc4606dde6214b90247d2f53903a0295bf1c65f3587cbdb063e4c1"
        observed_at: "2026-10-14T04:37:18.599Z"
        status: "PASSED"
      id: "202610120014-1C3ZFG"
      intent_digest: "sha256:6e3252e21e771218324d5799c5624bd2bc12ef7eb9b22d8e67ca0c7f2cd48d12"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053:
          after_revision: 129
          aggregate_digest: "sha256:27fd2ba9d3d415ae2bbfc1212fdd75489f70e5b2f67ffb7523c09d3bdd981da6"
          before_revision: 128
          command_digest: "sha256:b033a57a69e40e031fc6900f161d2e60f8834685dea8ed749098f01f047e0fd9"
          effect_ids: []
          event_digests:
            - "sha256:0ed33d554c443f7cd7357160c9234a27b20d9319aae2400be4fb785fd918aea1"
          mutation_id: "amend:sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053"
        amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a:
          after_revision: 15
          aggregate_digest: "sha256:456531d0722c38facf39b826c5e0701895cb3c1a29b1121beaabb96b3b5e8e3b"
          before_revision: 14
          command_digest: "sha256:d72fae62d33f32f17bbf52d5cc7a726df271423cd196d5d323a2cfcb4e922529"
          effect_ids: []
          event_digests:
            - "sha256:302a68ad1a0b4a34fe1f8ad025cfca0cf19792fd37dc83771162ff834d6e88aa"
          mutation_id: "amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
        amend:sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567:
          after_revision: 119
          aggregate_digest: "sha256:5b179103561675a9abc2dd5a17d2b16232dc7215b9e34a5c2f244cd16d090709"
          before_revision: 118
          command_digest: "sha256:5e2c919fa7814f497489d70e9ee6adf23475fcb251bf86d902b278c4cf4a9d15"
          effect_ids: []
          event_digests:
            - "sha256:4ffe196c58f6a05b7585e2e1285a170af0d0254720cf7fd17c6e75a06df8915f"
          mutation_id: "amend:sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567"
        amend:sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d:
          after_revision: 77
          aggregate_digest: "sha256:98532aa53355a3a74efe0a89e681f9c0b8d5b4d738959a6a4ac8da640ace7761"
          before_revision: 76
          command_digest: "sha256:1daad70638b75476ac1a656859ec2e26b9447ae40533d05e6b8f107784bd3492"
          effect_ids: []
          event_digests:
            - "sha256:98b310098c95816bde5b4e2f30c6e253c36e915ad8f40cc79039c48e30a34702"
          mutation_id: "amend:sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d"
        amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e:
          after_revision: 38
          aggregate_digest: "sha256:800c4f931f9421b0dcc6217b94589638e74a1a189ca0fdc7663ce78b7290ab55"
          before_revision: 37
          command_digest: "sha256:caf1f5214eb39986751da09a7d8ae67a4d30b1dc779858746e79f3bb9339fb47"
          effect_ids: []
          event_digests:
            - "sha256:246433deaf9d36c1e459ef4d53a5b88c6555f1121c4839aedf91376a9a324d0a"
          mutation_id: "amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
        amend:sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab:
          after_revision: 103
          aggregate_digest: "sha256:60865a59e3d18aa18c732f9659ec069106a01bf55263452316091cf1936a9439"
          before_revision: 102
          command_digest: "sha256:b503a68506a8943e32712cc3d932c0c47b869a66e388eeb160656a0257faa488"
          effect_ids: []
          event_digests:
            - "sha256:bac0303239707acd96f6c8ccae0bfa41eba98844b77b68e1a1009267e626b308"
          mutation_id: "amend:sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab"
        amend:sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7:
          after_revision: 87
          aggregate_digest: "sha256:2949501d0dcbb3e88987bf9c1e026be6905f32cf58a7958251c278eea9469176"
          before_revision: 86
          command_digest: "sha256:17c48f43c32e460d81c1f7e09deb87cc65e63d98b997641685825fae5059fa87"
          effect_ids: []
          event_digests:
            - "sha256:d2cb09ff5bc4c9af4e131fdb06c3a888d172ca82833b7b78a758e5d9abed410e"
          mutation_id: "amend:sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7"
        amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215:
          after_revision: 48
          aggregate_digest: "sha256:247270b92deae27ce66ec0be9e73466ff09e9557e0453c594054f83869ccd1de"
          before_revision: 47
          command_digest: "sha256:4c1d32c162d28b154a9f80499d41e367ce89bd94ceadf75315959840521ed3cb"
          effect_ids: []
          event_digests:
            - "sha256:2e7aec175237ab9362e9ed7108f85965c7ddcd84a34664ad2dd6f8ddc1a86413"
          mutation_id: "amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
        capture:202610120014-1C3ZFG:
          after_revision: 1
          aggregate_digest: "sha256:2aa9c62c53ba9d034aadecb212dcec78d1f744e47e17238bc565f92d40c6ea0c"
          before_revision: 0
          command_digest: "sha256:e65c42f6e12a2bc40436a043475b62760bdb86069baf58bf89ef40820d4aa372"
          effect_ids: []
          event_digests:
            - "sha256:648281817048191f4a538e41fe5c12c3e4c4bb7c818905d8b1d786898d4c09a7"
          mutation_id: "capture:202610120014-1C3ZFG"
        final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36:
          after_revision: 37
          aggregate_digest: "sha256:c59f06f1ff958950ebdb1b2fb1d723184a7e10d0536d2543b7d34dd65973e801"
          before_revision: 36
          command_digest: "sha256:49ba5ee6c487533388c0ff75667edf2d9ae5c3ceba07f40095f74b72f5b20064"
          effect_ids: []
          event_digests:
            - "sha256:be743d36e37658904a43d6e91b2b22b42220a83d41edd7398b242e68de8c49ed"
          mutation_id: "final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36"
        final-validation:sha256:2454199eb4a322ff83694c46e399ff9f182a8354bb718002fe39ee714b492164:101:
          after_revision: 102
          aggregate_digest: "sha256:570a2123a048b46496416aa280c78880e1dcec2ecaa2f9d378211908a0f18d12"
          before_revision: 101
          command_digest: "sha256:36226fbadbde4e48f0fc6bfe378c107f989191d1ab0306554b823a9a928823a5"
          effect_ids: []
          event_digests:
            - "sha256:4560dd9f633c528d64406ee312818a85e5b49755c3f2cee4af99cb053a39b7cc"
          mutation_id: "final-validation:sha256:2454199eb4a322ff83694c46e399ff9f182a8354bb718002fe39ee714b492164:101"
        final-validation:sha256:54d63c1073166df60929a4fe5e37185b8290f745249fe41e15a17f44f5434fe0:85:
          after_revision: 86
          aggregate_digest: "sha256:72fed97e4856e77dbabfef810e4da063d943a23ef3248f9921bc4fc709946d4d"
          before_revision: 85
          command_digest: "sha256:0edca84f7360b67b1e4c63887631d765f02ffe396425a1ec9351e46ea0f3c189"
          effect_ids: []
          event_digests:
            - "sha256:baf69210d85099bb10b49cf2cb98e704a52cec3b2f564572b66b463fe2358c9f"
          mutation_id: "final-validation:sha256:54d63c1073166df60929a4fe5e37185b8290f745249fe41e15a17f44f5434fe0:85"
        final-validation:sha256:577aba1eacec9828a31c5f4e68bd3aedcf3d283ae796bf4648c80e5d1c458b4a:127:
          after_revision: 128
          aggregate_digest: "sha256:5e2e736dd4e34d7118d6932370e858dc711ae4da4f153e33f54f24be024b83a6"
          before_revision: 127
          command_digest: "sha256:1576f548f04eca5f485545e7970c11533c25dbab6df3d02a1f8170bba309dfa6"
          effect_ids: []
          event_digests:
            - "sha256:fbc1f50f63d299638a8f3e23743c150d4239edecca052e4f4c58efcee45b1344"
          mutation_id: "final-validation:sha256:577aba1eacec9828a31c5f4e68bd3aedcf3d283ae796bf4648c80e5d1c458b4a:127"
        final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46:
          after_revision: 47
          aggregate_digest: "sha256:089ddd5e86ddafa63b9a7b7acb4e82dcac87afe643465ac0999431cc1f5d7da6"
          before_revision: 46
          command_digest: "sha256:7833125078f252f8f5b8de69d4cc14f63ccdd6c713724ca53e27d6490cb58c56"
          effect_ids: []
          event_digests:
            - "sha256:713aa4aa5c481d044e74850c8d8c4f07c63dd0db0385c46ead8b6e4af1800421"
          mutation_id: "final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46"
        final-validation:sha256:ec8e8e56f09c5645861e7eb5e5bc20c58cfd5954a0940ee336bdc8d523f97a74:117:
          after_revision: 118
          aggregate_digest: "sha256:0c54bf85c912da85a247b62b33ccb3a186e049eb03742fb4eedf9e582f1679ed"
          before_revision: 117
          command_digest: "sha256:42c898ae37dee2f89ac52caf59c34e757d482e7ccb8d75f29167e919761d4849"
          effect_ids: []
          event_digests:
            - "sha256:c983f587f3fed02b68c68e8655cdf683c34b3de6cc22d12da930dd6803c8e25b"
          mutation_id: "final-validation:sha256:ec8e8e56f09c5645861e7eb5e5bc20c58cfd5954a0940ee336bdc8d523f97a74:117"
        final-validation:sha256:f5f04889ff026c9ecf1dd52e6b9dbbab16c0583013811cda9d23bc1b7bb5b4af:143:
          after_revision: 144
          aggregate_digest: "sha256:a85d3080eacb21b52362a642a412484d8d3f16aa58230d769a6e0f3d7ce6b984"
          before_revision: 143
          command_digest: "sha256:0df3b1332d1186f24f4afb912c161ab8bc996f60b1914c78680bc26d4ba5fe5e"
          effect_ids: []
          event_digests:
            - "sha256:865379b4de0792ffbf258783fec79acd09621c1b829fc1636364757d7d631853"
          mutation_id: "final-validation:sha256:f5f04889ff026c9ecf1dd52e6b9dbbab16c0583013811cda9d23bc1b7bb5b4af:143"
        kernel_work_item_claim_required:sha256:0a84763185cb84a7fb9d7d648e78248b2d6116c60cb125075359e1930681cb99:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:
          after_revision: 131
          aggregate_digest: "sha256:7c0ed3695954de1f4819eeffc0cd487fdf7390642e5a7ffc5615974311c51dd9"
          before_revision: 130
          command_digest: "sha256:47a5cff2a1d71263e4b79ec467ec5b61dac50d9677d3ad3702f5abbacac99b63"
          effect_ids: []
          event_digests:
            - "sha256:125dc60573fba83b3cf909786aca09269958e55f23fe944b994f98e9420d9f79"
          mutation_id: "kernel_work_item_claim_required:sha256:0a84763185cb84a7fb9d7d648e78248b2d6116c60cb125075359e1930681cb99:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 30
          aggregate_digest: "sha256:38081bbeb829d5dda6f92455e3874e44a5d490e86b72e7881ee24afb97079698"
          before_revision: 29
          command_digest: "sha256:d97aa1acba58707ac413a8c5aa470d6cfef0f2f9fe682f137b57dbde55c86ca7"
          effect_ids: []
          event_digests:
            - "sha256:7dbd81cc6c572e80d9d15852bb941571b550764e176c73f1c2890673608efe5b"
          mutation_id: "kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_claim_required:sha256:3e356de1bb8350944be948f614bb0c97a9727bf038fd0006830bbdd94b53927e:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:
          after_revision: 137
          aggregate_digest: "sha256:9b03ec735e69434366b4891b6862730ca443d976ef17eb96f216aad8e35e50b3"
          before_revision: 136
          command_digest: "sha256:4853d5f0150b7c18908df895a63f9753f42ff3dee5022cb95977ad25305d7044"
          effect_ids: []
          event_digests:
            - "sha256:079991646a7228827a85d3f54a6a7c3f06c0eefd30dd16f65b3d9ddf1391a54c"
          mutation_id: "kernel_work_item_claim_required:sha256:3e356de1bb8350944be948f614bb0c97a9727bf038fd0006830bbdd94b53927e:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        kernel_work_item_claim_required:sha256:43caa3afeca5a06e7dd08f7231324ce6e5da716e9bc87362ec7d225d14e9df34:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8:
          after_revision: 121
          aggregate_digest: "sha256:e51e6ffe6c9bfadb89c563d277a1929eaff15348ba118e664d408950f32f2872"
          before_revision: 120
          command_digest: "sha256:c4c536f28c170b65058d7acff46ee3eb36cb5d6c4e8408c307561845241c2ba9"
          effect_ids: []
          event_digests:
            - "sha256:b9d33901d111616e91ad3ec0a3f1601a88b12843885831002b5a06c8cc7fada5"
          mutation_id: "kernel_work_item_claim_required:sha256:43caa3afeca5a06e7dd08f7231324ce6e5da716e9bc87362ec7d225d14e9df34:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:f40283c800bb11255e8fe475f32dfeac83e78b9eedbf07e2e00ded0262cea693"
          before_revision: 4
          command_digest: "sha256:f8586dcbbd9eda77119c392b468bd933e85c94c327a6ed2c2e6fb4d198b101ce"
          effect_ids: []
          event_digests:
            - "sha256:85ffb66057543622631d3dbc6a182c60212d41739ad2c819bce42f0af4e03430"
          mutation_id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:7003298028b6682c565cece96b27036a56903ce6f38bdb36f189f806ca2194d3:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:
          after_revision: 89
          aggregate_digest: "sha256:8c975ed786c641b439104ec0e932ed19f0e8769696759fa180fe71a04048c65d"
          before_revision: 88
          command_digest: "sha256:957608c3dcf0c91e03026f68f2a8452b5ff9f76fabced1d82fe3d3108272768d"
          effect_ids: []
          event_digests:
            - "sha256:c815b31009c5b79f7a2b5f4a874b71886e83ad23f6f8dd93835a2b14ccf53d2c"
          mutation_id: "kernel_work_item_claim_required:sha256:7003298028b6682c565cece96b27036a56903ce6f38bdb36f189f806ca2194d3:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 50
          aggregate_digest: "sha256:a4ca8da777b631f8e7162d82eedaa1b4b3aadc40bab83740391fe97aedec57c4"
          before_revision: 49
          command_digest: "sha256:a6dbed824a9b14322886a5c201152f17619812832525f3a6a1f25c6926442f98"
          effect_ids: []
          event_digests:
            - "sha256:941ca2a53029074c268eb85a49ff122f7add157204e2dae5a578ffe8adcd0179"
          mutation_id: "kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_claim_required:sha256:75c8a7bc7a9ee50393d41b8937bddf1a8f3e34eaf21b6fb1f202f3001d8bbed7:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788:
          after_revision: 79
          aggregate_digest: "sha256:518ecf540a86b56cea8632b38785534e6f36ab9fd90bd15f9480e1ef7bc14baf"
          before_revision: 78
          command_digest: "sha256:654caec31c1555421b246e4fd9838b7fd8349e5109c02156fd16bd102632ef8c"
          effect_ids: []
          event_digests:
            - "sha256:c7df1ccbe4146b97f7aa825f44b90d83d299565e25f4fbfd9e8b753cd1d04354"
          mutation_id: "kernel_work_item_claim_required:sha256:75c8a7bc7a9ee50393d41b8937bddf1a8f3e34eaf21b6fb1f202f3001d8bbed7:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 11
          aggregate_digest: "sha256:0b1f680515c11cc2bfbd2f5cca73b2a7f3bb91581e19189d663c05a3b60236cd"
          before_revision: 10
          command_digest: "sha256:7d992a86e371c839df36b3b4d67bdf446346682339d27ca6e43693cce63cd4cf"
          effect_ids: []
          event_digests:
            - "sha256:d5d39e799a765fc094ea16f7ae3d3a565028d0e8b28ec981784f4211f8904abb"
          mutation_id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_claim_required:sha256:88f2cbad13c64bcaa0ffbd8c74e7fe3d46b898d8a07e89ed78a5b9f9f3d2fe85:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:
          after_revision: 111
          aggregate_digest: "sha256:a804a9268d38a18c34004fe9099ea072d0fa02cb35ac2b49715a562042d9aca6"
          before_revision: 110
          command_digest: "sha256:59169f38fd44e55dbbf6f643cb1d6a964a7de870f1617d524296158b69c32cbf"
          effect_ids: []
          event_digests:
            - "sha256:c908331f32a51bd8331b4e003c24dbe7de69b3893b77fbe1cb07781893c22fc4"
          mutation_id: "kernel_work_item_claim_required:sha256:88f2cbad13c64bcaa0ffbd8c74e7fe3d46b898d8a07e89ed78a5b9f9f3d2fe85:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        kernel_work_item_claim_required:sha256:8a130403bb74df593cc90daa6a2c4d942f5824a2d6c0500925646f35c9477561:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:
          after_revision: 95
          aggregate_digest: "sha256:acbb94856c1420983529e0bc6e1be2e3888dabf25eefdbe89dd92bc20aee986e"
          before_revision: 94
          command_digest: "sha256:2b485c0f140da2f8e0a3870f1442812c8b79fb96d8a7efbdb9dabc2bf3525da9"
          effect_ids: []
          event_digests:
            - "sha256:1bfefbeff69a7c1e0df85c031708f64995f1ec90479db550a9aac1802a0015fd"
          mutation_id: "kernel_work_item_claim_required:sha256:8a130403bb74df593cc90daa6a2c4d942f5824a2d6c0500925646f35c9477561:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        kernel_work_item_claim_required:sha256:8f495a42d3a5fa279102be2d44969999068575220769f37702fa297c6a208d8c:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:
          after_revision: 105
          aggregate_digest: "sha256:9a6db9ecf933e3491e540446d7ce5123f78a8739c7dcd5622150d2e920ac862c"
          before_revision: 104
          command_digest: "sha256:1aec261e2ee6073ca4dc2fda0bc0a47cf458f31acaac5334d96671d0b558dc5c"
          effect_ids: []
          event_digests:
            - "sha256:c54b29665480128edfb4d5a17641291a246bfac541c0ac807edfe404bae97efa"
          mutation_id: "kernel_work_item_claim_required:sha256:8f495a42d3a5fa279102be2d44969999068575220769f37702fa297c6a208d8c:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:
          after_revision: 40
          aggregate_digest: "sha256:30a45c9d31e7b6aec1f987c9b9fa804c8245724d4902320823f0b93666c1b759"
          before_revision: 39
          command_digest: "sha256:1f30d66cf3598a56573830b09444d0df290b24fda4c972e1f24de053b506e695"
          effect_ids: []
          event_digests:
            - "sha256:039bdbe7de39c9e5152ac550e8d9cfa9cbb98710a0953689cdd460720f0d548d"
          mutation_id: "kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 56
          aggregate_digest: "sha256:f046655ba2c5e9d714693553aeb56d8b85031dc4af0790d2f7f5343bff3743f7"
          before_revision: 55
          command_digest: "sha256:0638bcf1850bbbee27f8ac7e43a036738970f498fa22e674cddfd0cb8b5ccef7"
          effect_ids: []
          event_digests:
            - "sha256:02acb95f8e54a65100cf9be0049b5cf2cf81275c4bbd2dededdbbc90a1da5a63"
          mutation_id: "kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:
          after_revision: 63
          aggregate_digest: "sha256:3f605d1891b210a8d47b42ff42749c36e3a591a6543dc042190c585fcf50bf34"
          before_revision: 62
          command_digest: "sha256:ae2652bf2f4e4ca9147ed9c4700f7f1c801512e715e450c4ca4d522bc1eaef57"
          effect_ids: []
          event_digests:
            - "sha256:fffde09c30beffaca05ecde50ba26806bb01d29bc43b826100ae36cece562d71"
          mutation_id: "kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:
          after_revision: 17
          aggregate_digest: "sha256:c890c40e5b9c6e1342c69093d24b328e6cddcb6f129b257bc1c45f906e17c76c"
          before_revision: 16
          command_digest: "sha256:d460efc3a38a416813fa540aa18ed5c528b7f44aec584e9add0f7b71444a570f"
          effect_ids: []
          event_digests:
            - "sha256:53bb61d3daa69587a898b638930158672c8e911ffad72f12578c43ac09c4c4ba"
          mutation_id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        kernel_work_item_execution_required:sha256:069bf617a82be40d5d06f61c1d83669032d76aa7a73e443297ee1e906a5fe842:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:
          after_revision: 96
          aggregate_digest: "sha256:7e6f4525946f693fadbeaf1dea6f3493327b091ab7c8b27f6c75195791c69f29"
          before_revision: 95
          command_digest: "sha256:54a80f62f86c81f58200eb32cab534c6194ef472917781d274ae5d6201ebbead"
          effect_ids: []
          event_digests:
            - "sha256:780a2abb72b9e6a3722394512738e39e2d26416daa912bc2ec1dd7b1dd7e8b86"
          mutation_id: "kernel_work_item_execution_required:sha256:069bf617a82be40d5d06f61c1d83669032d76aa7a73e443297ee1e906a5fe842:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        kernel_work_item_execution_required:sha256:13862147e7c613369dbaaafbad7370616ed77a36c5d0641a89da21e4cf0e3c74:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788:
          after_revision: 80
          aggregate_digest: "sha256:ea7694fee5ca672c7519cf7b0bf937b57900f5c64176566cbdd6e60c49e3a8d0"
          before_revision: 79
          command_digest: "sha256:9518a3fcf9f862cd1131c24c9534fbc8037c7fb177b9d2a886984f1276a2af53"
          effect_ids: []
          event_digests:
            - "sha256:8a40929c9fd4d5e60a9730c332e042a432a83819de3f3e6ead677a95ac17ba71"
          mutation_id: "kernel_work_item_execution_required:sha256:13862147e7c613369dbaaafbad7370616ed77a36c5d0641a89da21e4cf0e3c74:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:
          after_revision: 64
          aggregate_digest: "sha256:857aed4b26aced3b839c9b24033ef5c2c9d10426a32b94f58bbcb66da7c381af"
          before_revision: 63
          command_digest: "sha256:911cf86af313ce9d6a54fab99ca5d87ae99462484eb5ae66aaa8c3e7421d85ad"
          effect_ids: []
          event_digests:
            - "sha256:f8267003b40a2828e0ada717a88486d1374bc7aa56be7fb9821de9d444f1d13d"
          mutation_id: "kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 51
          aggregate_digest: "sha256:f104d1c853150d4c11e8544eac927bacf170d25d88b1c4f928c3ec167eca0983"
          before_revision: 50
          command_digest: "sha256:a07704bf98bc1771f05d5e180c58582550a81c53fe17c82f42a005b33f8b02db"
          effect_ids: []
          event_digests:
            - "sha256:bbe40793c7fc0f6ecc3251c29b603fc839f58421690c4dd97915d44ab8103839"
          mutation_id: "kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_execution_required:sha256:49f5a3b36ee8378d7b734414c884f12541bd5a9a9aca92e02d5fba8259b97747:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8:
          after_revision: 122
          aggregate_digest: "sha256:0b5f514ceca8b0d987e307b6165d498405c45c7c8cefd9be6b351fae226288a9"
          before_revision: 121
          command_digest: "sha256:24afcacd5eb9ac9f47fbbc0f2addbd8a0721596896f1dbb20eed017bed67316f"
          effect_ids: []
          event_digests:
            - "sha256:f96c1eb46ea44d68dadbf5bc9ba03445bd04cb0b6db1061065685ee90e43965e"
          mutation_id: "kernel_work_item_execution_required:sha256:49f5a3b36ee8378d7b734414c884f12541bd5a9a9aca92e02d5fba8259b97747:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:9f5a3630d28cad263938a1397d9ef9613461e1aed04753f2e9536812eeef5a15"
          before_revision: 5
          command_digest: "sha256:09de1609ff9b6573ef6a9d5f264b2fbf6610c35dbc026c67edde92d034d2a6db"
          effect_ids: []
          event_digests:
            - "sha256:6580fdded75b3ed5d394d66c93c4bd2c970d1b08c653f8b68eb5448ec41f3037"
          mutation_id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 31
          aggregate_digest: "sha256:08bd24fb9794ffa8f04a50f3df743864f59b00e419ec32e72342114f22b49cf5"
          before_revision: 30
          command_digest: "sha256:d5eab8bb4f02d0084c4f49b1622a78e704298f211072e3907c7927a34ffdb13c"
          effect_ids: []
          event_digests:
            - "sha256:f53bb2adefcda44f068c7c9f65f1874735c2690dbab870f3afd009a35a763424"
          mutation_id: "kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 57
          aggregate_digest: "sha256:06e0669bb607c6ff89a209b4a08f800392923656eb2beb554debab138ecd8154"
          before_revision: 56
          command_digest: "sha256:5446a0d42eaf2da3083c8081376b239267ec14f4ef58ef837fce0a70cf1ce99d"
          effect_ids: []
          event_digests:
            - "sha256:1c44ff81d67b669456b2579d0e8f6505eaa01a8ee33bb7cc8541856bb7a10957"
          mutation_id: "kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_execution_required:sha256:6ef2b86405b930255f61ab32130b48aad73ea230d34fc1596a647c64ace432a1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:
          after_revision: 132
          aggregate_digest: "sha256:6d4e44f8b3eeea4ef9f76d4910a833385de68428c5aa18dd7275f7d3e5751a78"
          before_revision: 131
          command_digest: "sha256:f3fd3ce2cdf45549b784f8bd9b4348b966c6c78951783847013a87b714bdabbb"
          effect_ids: []
          event_digests:
            - "sha256:4ea60c1c3c93b61649f9a2494b28ca07b9643135fcfd0ee238ab63ec0e185b67"
          mutation_id: "kernel_work_item_execution_required:sha256:6ef2b86405b930255f61ab32130b48aad73ea230d34fc1596a647c64ace432a1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        kernel_work_item_execution_required:sha256:784dce4c8bf2308f8260db0dd40886c4e9d60fe6cc0bc2d02c0253b1bc624c27:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:
          after_revision: 106
          aggregate_digest: "sha256:5ca1e829a54d94a271a0a032d4828b06403625a5a35b12547c85bde6f6d2be46"
          before_revision: 105
          command_digest: "sha256:be64c7ea429f3ed78dd8954a688066f541cf05eb37a6f6479a2cd0c2d35505ad"
          effect_ids: []
          event_digests:
            - "sha256:f5d559bc48ed8790f94b13f801ca7bee68ad24593f99379fe0b2a9902d6d77d6"
          mutation_id: "kernel_work_item_execution_required:sha256:784dce4c8bf2308f8260db0dd40886c4e9d60fe6cc0bc2d02c0253b1bc624c27:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        kernel_work_item_execution_required:sha256:97abdceb4ed7b063b0d4402b3041bb7063ad99f357ec655d570097d8fca9c87d:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:
          after_revision: 90
          aggregate_digest: "sha256:9709d975d297aa119187e8727654e7189d54fd5b8d7f5fef6e9047a353ee0a21"
          before_revision: 89
          command_digest: "sha256:bdbcf23a913db34fc22ef5bd181becd79161124bf772b66fe24c31e91ed37d67"
          effect_ids: []
          event_digests:
            - "sha256:3a04864075e12e19dfe46d8382dd99bcc6ec711d178c5e7072e63b3b13cf818e"
          mutation_id: "kernel_work_item_execution_required:sha256:97abdceb4ed7b063b0d4402b3041bb7063ad99f357ec655d570097d8fca9c87d:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:
          after_revision: 41
          aggregate_digest: "sha256:ed41ab1e5bacf854dd1494d0106c92cefee8fc18a36ef879431361cbddb1c245"
          before_revision: 40
          command_digest: "sha256:9852af0c74f4e84d1545ff8666fac3ed706ab05521944454abb10ad4b69d764c"
          effect_ids: []
          event_digests:
            - "sha256:e4ebe3817467af64dc07c161dedaed7b6460ec2e555d5d563379ed44a965e346"
          mutation_id: "kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        kernel_work_item_execution_required:sha256:a5345527fd97af64da2df9dc9a343c3c0515350facd99c97787b88ef1ddf5772:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:
          after_revision: 112
          aggregate_digest: "sha256:bb3757f9dac2071168ff6e5e6294cefb9683bb75de016f4a945cec0326957c45"
          before_revision: 111
          command_digest: "sha256:c13f7f36a9cc91d2354b79ac7b15efc9df327f02336fa1d6a0c96eab90f6af8f"
          effect_ids: []
          event_digests:
            - "sha256:0be75f40ade151d094fa8a847261e74c3866ce370c1e6a6320e6cfe5809081e7"
          mutation_id: "kernel_work_item_execution_required:sha256:a5345527fd97af64da2df9dc9a343c3c0515350facd99c97787b88ef1ddf5772:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 12
          aggregate_digest: "sha256:1c2dff652cfd3da6bf507d063dc4b203abfeb701e2fda3501b387aca60489f44"
          before_revision: 11
          command_digest: "sha256:eed8ea15fecd5132089edd890cdb6ac133fa6f5737fa19017c8d7d8450b3bade"
          effect_ids: []
          event_digests:
            - "sha256:a049ad230e9778c3b18547e003fb93a9579838c8e0ac066c094f39e1bfdcd035"
          mutation_id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:ad1b3521db8a635f1720143bc8ba33b07419b584136a8ed03676ec31cc6b8063:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd:
          after_revision: 71
          aggregate_digest: "sha256:51c60ef947b2b620382f71a8ed2805be50fe306bf8a029d8237e88ff4363b19f"
          before_revision: 70
          command_digest: "sha256:14478b9fee710a8077a5cbef71aeff9b7d48375cb797deb658ad655c387e7e17"
          effect_ids: []
          event_digests:
            - "sha256:8d04d1240cade924d978beae97b9e40414c8c7707cd0952a3bb9e30f75e58aa2"
          mutation_id: "kernel_work_item_execution_required:sha256:ad1b3521db8a635f1720143bc8ba33b07419b584136a8ed03676ec31cc6b8063:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 25
          aggregate_digest: "sha256:129a13ec082e22639cc48beb0736d784eed326342e103588cee0223dfa4892ea"
          before_revision: 24
          command_digest: "sha256:e990acdcd312088c023474e79037ebbc4c601ab8cd9560fd9d89add29c89d22c"
          effect_ids: []
          event_digests:
            - "sha256:a37c39b0c4d8a227cfa356370d620328d90a6f63492fbcac0453b4a22ca6ffb5"
          mutation_id: "kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:
          after_revision: 18
          aggregate_digest: "sha256:c8dc5826b3602ccc11d6ff358b26c24ad1c94936f83823d4e586a69780f0d0cc"
          before_revision: 17
          command_digest: "sha256:dcaa9209d35bde8ce88f3c2061eb2d661819946318b74830a2e06bd0c63384a1"
          effect_ids: []
          event_digests:
            - "sha256:58243b1b35fe6eb795c4e259bbbac72f351cd97062e0a4d62e9ee52228808d27"
          mutation_id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        kernel_work_item_execution_required:sha256:f50155e2e171ece6cc44fbe4a3c884716703cbe731fc82b382ad84efd4e928f1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:
          after_revision: 138
          aggregate_digest: "sha256:19de13ff10f0c4c5b9ae51ec7986ed35643ff2e41562ca4908fa3bc3848cc95a"
          before_revision: 137
          command_digest: "sha256:d74eb7a78cbe5d910933205a47186e730f06eb1942df4d2db3eadb7727b3c26a"
          effect_ids: []
          event_digests:
            - "sha256:da0d6c86bc263b4d4468fee6ae54bae90488abee9ce735310899228ed45f7fc2"
          mutation_id: "kernel_work_item_execution_required:sha256:f50155e2e171ece6cc44fbe4a3c884716703cbe731fc82b382ad84efd4e928f1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        kernel_work_item_inspection_required:sha256:36ec65679f8828c3b196133e6362cc2527f502b9c109628a66c27951f1130401:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd:
          after_revision: 67
          aggregate_digest: "sha256:66ddf38a746c86c974302567f0c78f8aaff5f384c96e70898c58918e04fc9ef6"
          before_revision: 66
          command_digest: "sha256:e6579f765705e62f93a2f8c5a58d52cb79ebdbaf2162692120cfbcec2147f99f"
          effect_ids: []
          event_digests:
            - "sha256:3b17c49e7dfa227a6d6b62a9f07be48262d7624848c6e276e19ef914a3325775"
          mutation_id: "kernel_work_item_inspection_required:sha256:36ec65679f8828c3b196133e6362cc2527f502b9c109628a66c27951f1130401:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        kernel_work_item_inspection_required:sha256:41c1753b5cbbd70c38f2cf70a49854cba20fff0a61192ad2e11102a94960e27d:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:
          after_revision: 125
          aggregate_digest: "sha256:d4628b5d7636f190aa1935f53d31579dd437591f47b5d507a0ccae22e1f83f19"
          before_revision: 124
          command_digest: "sha256:773f804e0e7a7527aa9db9e2cff882bc7f713fbc5b2b679bd1b5781671959723"
          effect_ids: []
          event_digests:
            - "sha256:76505c475c9fc63437e0cb1bf43fe5f316478b10476dc49be7e0e69ecf243f49"
          mutation_id: "kernel_work_item_inspection_required:sha256:41c1753b5cbbd70c38f2cf70a49854cba20fff0a61192ad2e11102a94960e27d:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:
          after_revision: 34
          aggregate_digest: "sha256:f77e89bd404f4e67e60704e831952f1a2bc109a678b74169bf80d962031f9238"
          before_revision: 33
          command_digest: "sha256:a4a0ff167233d2173004bdcbcad3829fd861c5f7a74da989aa8a10091017840d"
          effect_ids: []
          event_digests:
            - "sha256:80c631a3177def4df6478740f2e009f6bddc0977f82469d7773827bf229355e5"
          mutation_id: "kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        kernel_work_item_inspection_required:sha256:92dcbcf8d9b31ef278e9b0d6e35a3b7ffa8677e8b3a9e144f91f1304956809ee:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8:
          after_revision: 115
          aggregate_digest: "sha256:762f7d59dc2b95bb3f8e81cff3359b6beab709d36a49e7ea48fb95ef10c2d503"
          before_revision: 114
          command_digest: "sha256:38d72e5ed3a6e5153f54c417b601f792632e745516d3c51327623fbac799256e"
          effect_ids: []
          event_digests:
            - "sha256:891d1a0167025d116660c59a1ef806a35ac0ead80320943d74e5e6b0b7e5d4bb"
          mutation_id: "kernel_work_item_inspection_required:sha256:92dcbcf8d9b31ef278e9b0d6e35a3b7ffa8677e8b3a9e144f91f1304956809ee:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        kernel_work_item_inspection_required:sha256:baec0ec70f1a4df3bb847374859f993da2e996d0bc2c738220440e93a778a57d:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:
          after_revision: 99
          aggregate_digest: "sha256:d1d46c32858abf6eea2bbb40651083c89f7e5fdc1b8ef0359383b54c1c10a041"
          before_revision: 98
          command_digest: "sha256:69e5d97db5a6dba7603f4cae56914ab5c15458e23024dff81a4ef85ecf3cae6a"
          effect_ids: []
          event_digests:
            - "sha256:a63467a53e42cd1f07cf55876c4f7451f4d51f10771ad2e25d19b32da8c88d72"
          mutation_id: "kernel_work_item_inspection_required:sha256:baec0ec70f1a4df3bb847374859f993da2e996d0bc2c738220440e93a778a57d:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:
          after_revision: 44
          aggregate_digest: "sha256:01b34d9335578c53cfd8f1cb7bf592b62ea80da011612ff2186eb6c3abeb8777"
          before_revision: 43
          command_digest: "sha256:36c5ec75dffd803c3836c0ad0f00a32e17ffd1bbcf1eec5a76317942209f92da"
          effect_ids: []
          event_digests:
            - "sha256:32f80357b07b3154b31fab891edcdfebf8dbdbe95860a60110667a1f83bec944"
          mutation_id: "kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        kernel_work_item_inspection_required:sha256:e1304d9cfd1d863bc88bfcc4c9c2a56528f3271b71105c24e634851e2570f043:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788:
          after_revision: 74
          aggregate_digest: "sha256:c13cc598967b627f4e3f9bc4c5fd1fa109f4aaf1869c6ba2a643691077fb2539"
          before_revision: 73
          command_digest: "sha256:37d92a640e3ac0842d38bc73ac1095d4fc6a10da0972227d6ecb2b151edd0494"
          effect_ids: []
          event_digests:
            - "sha256:b90ce1ac261d0e18acaeea925534a4ce8154ee62bb7e926df78010f5011f6faa"
          mutation_id: "kernel_work_item_inspection_required:sha256:e1304d9cfd1d863bc88bfcc4c9c2a56528f3271b71105c24e634851e2570f043:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        kernel_work_item_inspection_required:sha256:ea21f1c74477d0294d58c09a0e3eb8fb7245475fddea84448afedeccc592b012:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:
          after_revision: 83
          aggregate_digest: "sha256:d8c9f56424f72cddb6db0e1e4352b273c3131d963bdb2ab12cb53cc1e4ef997c"
          before_revision: 82
          command_digest: "sha256:94aaacdd4d109f025dbfd6961d7fcded0f80cc60d348826527483c8584bfb7fb"
          effect_ids: []
          event_digests:
            - "sha256:8ad24d6ea8664884d532fe14ec640ed49a66d98859f9f37d62a7ffa644e18eda"
          mutation_id: "kernel_work_item_inspection_required:sha256:ea21f1c74477d0294d58c09a0e3eb8fb7245475fddea84448afedeccc592b012:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        kernel_work_item_inspection_required:sha256:ea698c484bbcb4f64055e75d0926b08c172e5fbcf4c36026a25310112c27da3d:sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d:
          after_revision: 141
          aggregate_digest: "sha256:787206fa74426828ad9a62cd196755fb6e4bd0e192c2ec7781e66586527d2511"
          before_revision: 140
          command_digest: "sha256:1f8a100a32cd7883242902aebf5713082159c9cf244b6982c91d1c00632119d3"
          effect_ids: []
          event_digests:
            - "sha256:ef3784974e48835e5ada3c91ebdedb0d32d5d90a993aa828b3a73d3f7c272e3b"
          mutation_id: "kernel_work_item_inspection_required:sha256:ea698c484bbcb4f64055e75d0926b08c172e5fbcf4c36026a25310112c27da3d:sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d"
        kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 21
          aggregate_digest: "sha256:2bcb206f50df02111c1acf67f6b0133edcea2f6111f05dce360822246c2a5be6"
          before_revision: 20
          command_digest: "sha256:8c9f1d3ae662b6b2af626fcc5290ac533fd32c21eaac3cf5e48c8f64e96acac6"
          effect_ids: []
          event_digests:
            - "sha256:6fcec704371c111b52ce0ba5aff704f2b3c993ac21ab069d8cb2d256bbc57f24"
          mutation_id: "kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:03c9d6d246fb9330bc55c24863dd9358137eae61338ffeeb39f0c603ec6d30db"
          before_revision: 3
          command_digest: "sha256:e6f3141ad5b0173ceab73a702b5c1946f3f7e29aa9202ce9e23cbb6a6367e3eb"
          effect_ids: []
          event_digests:
            - "sha256:d07380ac2471b0fce70f434bdf741b528662dcd55285deb706cd450870e0de76"
          mutation_id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_rework_claim_required:sha256:0bf53fa1e9d4e33a23c7ba99c67f74b4291f41b8f7ced4aa0fdba9505cd65716:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd:
          after_revision: 70
          aggregate_digest: "sha256:a56ea8163e73a49f35808bcca8142dd8da673894dd2ceef64bff30bbf9138c3f"
          before_revision: 69
          command_digest: "sha256:0a50f6e992c783c7002dbe6868912d79e3166da84fb26af65970a29fbeb9c453"
          effect_ids: []
          event_digests:
            - "sha256:3a0035b01001b5a7870b01be57f96f3b902a27459c48864cddc188f74d8bc138"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:0bf53fa1e9d4e33a23c7ba99c67f74b4291f41b8f7ced4aa0fdba9505cd65716:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:
          after_revision: 24
          aggregate_digest: "sha256:2f6a60567b5d273d07ab23fcca750ae0a71193e9e9404172800c9074d10b787e"
          before_revision: 23
          command_digest: "sha256:449080242560682004edd6ae9bfa49efa730a4272ee1f14f4ab07cfbba18331e"
          effect_ids: []
          event_digests:
            - "sha256:e7ff1394ca0617b6aeffa71607d00e599c138e3b4083229b9c084097b37d4c20"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18:
          after_revision: 28
          aggregate_digest: "sha256:b59acfd7e746648c1231a46efd423e039787afc7df0a6e82017223f062cc81b1"
          before_revision: 27
          command_digest: "sha256:230cc3f20d2aaadf30f0d93c8e56e2bc2457f7f88b1542c42651ab1a3b3dbab3"
          effect_ids: []
          event_digests:
            - "sha256:5e489d899f35e73e8dd42777a0fdbe5af1d9c0b73d650cb63d2baaa3140d5d22"
          mutation_id: "plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
        plan:sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1:
          after_revision: 109
          aggregate_digest: "sha256:ca282b92973bf86924dfb6145280526ec4c4df11d75e339ccb36adab237b25b7"
          before_revision: 108
          command_digest: "sha256:0a74a2826ced7218175f78c5edf1b9714b6d5756b68597c0e2956aa32cd58607"
          effect_ids: []
          event_digests:
            - "sha256:92f803b078f2a1405cdf9471b41acbc219b69cfdbd4fd62e881eb40818c69842"
          mutation_id: "plan:sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1"
        plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e:
          after_revision: 61
          aggregate_digest: "sha256:e6a92997c970ab19e77829835ef26ac999949ddf5bc1497ed61e041e6b17ed2b"
          before_revision: 60
          command_digest: "sha256:43aae2c0c63bbac0dcc96280567c67d47ee45851d4797a12b65530d3c96e5499"
          effect_ids: []
          event_digests:
            - "sha256:ea7f884c50901d4d26fe8983ac0b8c8adf1a6e1afbe475a94e848c91a07a7501"
          mutation_id: "plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
        plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8:
          after_revision: 54
          aggregate_digest: "sha256:c08051b44974b55593cc8e330e7b2e5498c6a1c8ac600334f83ae5cd53675eee"
          before_revision: 53
          command_digest: "sha256:c971c13886d9a0311852fa09f6c07381b8275a6eb317d0974a4fc586f497dacd"
          effect_ids: []
          event_digests:
            - "sha256:d4260577f8f8b6fb6b0be39a57ab3781b397d50abd8af69712ebbdc2510c3611"
          mutation_id: "plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
        plan:sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc:
          after_revision: 93
          aggregate_digest: "sha256:fdff4b18f0901350b02c1cf61ee8453ccbfb96a0ef8634e2c8933654e995e767"
          before_revision: 92
          command_digest: "sha256:26a6d0da41206bb7e3cdcfd507c91f98cbffc472374f5e7e2d9cc1ed43f3c5d8"
          effect_ids: []
          event_digests:
            - "sha256:b73ccd1cfb7eeac888e9e6840caaf1d50c78e9b581cb7bc0f7ac28722f8df6c4"
          mutation_id: "plan:sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc"
        plan:sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45:
          after_revision: 135
          aggregate_digest: "sha256:200184a5353b72bf6371d474ac753782aa4739fe46d17586530bee58fc046943"
          before_revision: 134
          command_digest: "sha256:bd2d82420ab694172bf7e4a8522f9209a9bc5bdd9125fc998d7d57e86ae2e8c1"
          effect_ids: []
          event_digests:
            - "sha256:f8e0b4e056d79a6ff3552bd28411b3a4b3b2109df7286a3fa006fb42886246f5"
          mutation_id: "plan:sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45"
        result:sha256:03a517944d86d9900bcf84f7811b1d3f722414825b4abcdf4365d1e6451d801c:
          after_revision: 66
          aggregate_digest: "sha256:8e2efff0a50afd14b31894afbddd690ea6d8fedd4274777737d29814f884b22b"
          before_revision: 65
          command_digest: "sha256:c2340a78dcc11549505c5121316f0efae4930a041b116af769cb919e5a98ba14"
          effect_ids: []
          event_digests:
            - "sha256:c939da5c6f284f0eab6d6496d0d6588129ec4c985658e8521b0ac1cc04f17c87"
          mutation_id: "result:sha256:03a517944d86d9900bcf84f7811b1d3f722414825b4abcdf4365d1e6451d801c"
        result:sha256:0527c5133d99a461a47d63282f250020fabf7fbeadbe08420570269beeec03f5:
          after_revision: 73
          aggregate_digest: "sha256:4eefc9e28e11db4a731dabef4c84486fbfa37ef52372a3f3757f4aac85dafc9d"
          before_revision: 72
          command_digest: "sha256:18ca7bcce6ff85cce76a947a57591be9243717e8696b5513ec0c260dae573791"
          effect_ids: []
          event_digests:
            - "sha256:dc7a9840e8cb42926687bb4c48a2d173b72ddb8ff2bdbd852529961424236acb"
          mutation_id: "result:sha256:0527c5133d99a461a47d63282f250020fabf7fbeadbe08420570269beeec03f5"
        result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:
          after_revision: 20
          aggregate_digest: "sha256:b10b630c6d3e61b1eba684b1357c12b2decd42b97d576d78301f7f0d76f9ca21"
          before_revision: 19
          command_digest: "sha256:93134fb7744d2fee4ab4db31daa4fe8d59548ea30c25505e75dff4ea5439df1e"
          effect_ids: []
          event_digests:
            - "sha256:00d8979a0669d1ea3a49bf94e7d8a7e9febca1a2c538971a463703df37d20926"
          mutation_id: "result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        result:sha256:171ac6d10900de00332ad3c3ceb340827e255b54432ee8bca609c7a5ec938f30:
          after_revision: 140
          aggregate_digest: "sha256:a04edd04536ab4dabc7dbb31a7d2e6118bb05b6e52f794e3e5bbb161118f1901"
          before_revision: 139
          command_digest: "sha256:cffa22f10f83a59e2b6c2f254c33e3fb8cadda83f0efe2d91e68cffbb561762d"
          effect_ids: []
          event_digests:
            - "sha256:f8dd3b62d9b1beb907c276b51da35dc5d35239f9294c7906db594b22b3544749"
          mutation_id: "result:sha256:171ac6d10900de00332ad3c3ceb340827e255b54432ee8bca609c7a5ec938f30"
        result:sha256:2450fdcb74217b1c866d895fb84468937e95ba87f7ffabb4e09bd5d31b66c89d:
          after_revision: 124
          aggregate_digest: "sha256:5d46c1dc5a9f6d651f508957d89236c2825bc29f80a96668da49a44628584ec2"
          before_revision: 123
          command_digest: "sha256:3a2a1a9bd15369903e70e65673220151df527cbf45ebface8c4454e6bf642e52"
          effect_ids: []
          event_digests:
            - "sha256:c4167dd862f7739edd0031ceae0f008d0d703b2c49365842e047416fe9ea0411"
          mutation_id: "result:sha256:2450fdcb74217b1c866d895fb84468937e95ba87f7ffabb4e09bd5d31b66c89d"
        result:sha256:2b790b82421e9e288914f852763e75f062f17b6cc80ef49c9ca1d67b48a0f8fa:
          after_revision: 98
          aggregate_digest: "sha256:df30b271248c6d0f501d8dbc36352cde189331c124190ef1caaf05490c355bf6"
          before_revision: 97
          command_digest: "sha256:484c8f8877fea9d6829bd41c6256d4baed38c266bcaaa8ef84a3b43ee855ca14"
          effect_ids: []
          event_digests:
            - "sha256:1afd851a99b8372fb1b89bfcdbd329485d3de9a02878f194bd96cc4dfbd853ba"
          mutation_id: "result:sha256:2b790b82421e9e288914f852763e75f062f17b6cc80ef49c9ca1d67b48a0f8fa"
        result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe:
          after_revision: 9
          aggregate_digest: "sha256:bb1cbf811a6df73e541b1647fd0bd221cdefda8637a18dbb63b27d80990e7a44"
          before_revision: 8
          command_digest: "sha256:bd2b5074cf41c47c10b435a5ff961f3c64faff40c5266fdcd402e7ea4a15db4e"
          effect_ids: []
          event_digests:
            - "sha256:9568a50f03b2a66df24a2cdd030f66000a42d5b51f394983bbb19063164dc5d8"
          mutation_id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe"
        result:sha256:432101ab6c0086a71af527b028d328c19272124a8aa3bb872755a90e7339584b:
          after_revision: 82
          aggregate_digest: "sha256:0206093b1a487b613f0a211fdd329818fbc58915ad609824da20c5d065032604"
          before_revision: 81
          command_digest: "sha256:f3a9db58945c9928dd1290d2eb5fbd54e9fc9d2e4cd1251afd85696c2a065db6"
          effect_ids: []
          event_digests:
            - "sha256:4f32499ea0253c9090d883a35d3d222a1be8f356605025ccb207f358f63f3401"
          mutation_id: "result:sha256:432101ab6c0086a71af527b028d328c19272124a8aa3bb872755a90e7339584b"
        result:sha256:abb62f9ff8151737698b17037b17c0467118045a204abbe29b993b441e87dfec:
          after_revision: 114
          aggregate_digest: "sha256:a33329e63571ae6ca10a8f31c41ba98dde054e196251aa2f856483c3fe1f791b"
          before_revision: 113
          command_digest: "sha256:00a2062c2fff72006f0c42674476a286f8b5ac0568dd4d38b6b2711a7b654736"
          effect_ids: []
          event_digests:
            - "sha256:bf2f09e6910fc9b03140984ada7ff935b82c2942324daabc2ef4f8defc0eff29"
          mutation_id: "result:sha256:abb62f9ff8151737698b17037b17c0467118045a204abbe29b993b441e87dfec"
        result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8:
          after_revision: 43
          aggregate_digest: "sha256:9257e902513088f00684e3e683f64b730c4b7142c0c030bed3ab03d706c2ad52"
          before_revision: 42
          command_digest: "sha256:d68d54e689cdedddd78a70ae665e6250815f48ec165e9c938a833644fabcc87d"
          effect_ids: []
          event_digests:
            - "sha256:b5b2adc51790b85f4d0860c356b0583d75187e9feaf61a8435b2326dd1efb790"
          mutation_id: "result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8"
        result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad:
          after_revision: 2
          aggregate_digest: "sha256:04173ad7410a0ef616843c131f5222043d75bb031a8c1c21f1b56afb8ca527fb"
          before_revision: 1
          command_digest: "sha256:952cdb3d83f6314434f794c1c9e75e49a07f1c347e2f9a369f64969768bfb6d4"
          effect_ids: []
          event_digests:
            - "sha256:af15c77b1c7288289d6b152c77a644696b1a24ec49fe8b9bd1faffb3eaab5e9e"
          mutation_id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad"
        result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca:
          after_revision: 33
          aggregate_digest: "sha256:4979d01ebadc7bc0e70d3f3ea29aa72332a12068e89eeda9ca73fd1c54badde8"
          before_revision: 32
          command_digest: "sha256:106e5bb727f0b66cdd0b920e5e67284fe4c1df859192f0d6170ed9a4c7fff2dd"
          effect_ids: []
          event_digests:
            - "sha256:1cfd18d3664376da7231c607933502954735247b2f9b86d28d64d161ba57c262"
          mutation_id: "result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca"
        scope-request:sha256:0b31982ac6369b63c478a1372431651f6e579c15628ae99812b2951e11325b51:
          after_revision: 134
          aggregate_digest: "sha256:749b6421aad9e857d76e80aec5cb29288d31922c7e920a6acacaafd3ea736a40"
          before_revision: 133
          command_digest: "sha256:5ae70d0c3eb610ed6eed5f2a8a3046ed4ae730af33b6ed1812bc4b63700a4ebc"
          effect_ids: []
          event_digests:
            - "sha256:0d9538168be1ae66c41d43a82e302650065f077c2c6afd4ca85832e6c37420b3"
          mutation_id: "scope-request:sha256:0b31982ac6369b63c478a1372431651f6e579c15628ae99812b2951e11325b51"
        scope-request:sha256:24922491a25803503a1b002fc1e55b2cf1988d179ce7aeada9fe568fe9c5873c:
          after_revision: 92
          aggregate_digest: "sha256:bd2697c5ca28cead02695777bab9f5c2f08d6331c34de19ba44a8595a49f7fa0"
          before_revision: 91
          command_digest: "sha256:b286c707c84bedabb4f3834947a39b39a7fcd91486709722d0c2cb6c2fbf382b"
          effect_ids: []
          event_digests:
            - "sha256:63354f4ef8efbb41b696b1857c5100148abe8c0633d2b88bb99493e044748974"
          mutation_id: "scope-request:sha256:24922491a25803503a1b002fc1e55b2cf1988d179ce7aeada9fe568fe9c5873c"
        scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff:
          after_revision: 8
          aggregate_digest: "sha256:4720dac7e6149b0609253362036d0c45166f56890507608707cf7ffcb378213f"
          before_revision: 7
          command_digest: "sha256:305e7853d27c1e50e870111ea916540be1996938f30160766bb4474de15ca4c0"
          effect_ids: []
          event_digests:
            - "sha256:5389939cc7f6a48a4a6f3d8c7ce37a649ca250b7c9b4d6e0d9285ba05cc91656"
          mutation_id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
        scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8:
          after_revision: 27
          aggregate_digest: "sha256:b09a42cc9e81850661a4631ca4db33eac884edf8a4ed1f93779ccdf091388296"
          before_revision: 26
          command_digest: "sha256:e14767721e3fd4ca6544d6cf02a1774d969b01e71047adcecb3c6bc035436f20"
          effect_ids: []
          event_digests:
            - "sha256:333a32a0dc00cdcd7e5c060229c4d5d512170a70d19b7c52ff0bc226a7de0ddc"
          mutation_id: "scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8"
        scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe:
          after_revision: 60
          aggregate_digest: "sha256:decc1bef820b625d1e17c6ac720f8aca92b78ff3208b501c2103532729e70a19"
          before_revision: 59
          command_digest: "sha256:cf312a219b3a1690c3129752520704267414290b4301598d7ffcb08f972d362a"
          effect_ids: []
          event_digests:
            - "sha256:575150e4bbca65984f40c9e94c4b62cf71be0b413fa95a23441910a8c864045e"
          mutation_id: "scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe"
        scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32:
          after_revision: 53
          aggregate_digest: "sha256:83c3d7022a6ae8627ac41260685bc4538c62be62576af46345fc070aee3f8f63"
          before_revision: 52
          command_digest: "sha256:78d7bf6a6e2ae412f55773e7233434dc43aade87f063c423f820d0d8e1243b5f"
          effect_ids: []
          event_digests:
            - "sha256:f892053b8a56ed9fce5b716652070dc7535c138f54083435a2114d9169b1853b"
          mutation_id: "scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32"
        scope-request:sha256:ea5dccc0aa0a255cf536f1d9ede68d26f0d92937a54bf72a5a46d6996d5cf43e:
          after_revision: 108
          aggregate_digest: "sha256:a8bd646b131436b54969672555ca66b8b3aae1ee05cf52275186e58cf1d02017"
          before_revision: 107
          command_digest: "sha256:ef49d4784305fce31fe05306ff25215eb5a66f280ee013aed529c7b06c6cc2f3"
          effect_ids: []
          event_digests:
            - "sha256:0f21e47abf724f7ae705a97de9219d9108dda68bfb9a0e737a42ef64438149bb"
          mutation_id: "scope-request:sha256:ea5dccc0aa0a255cf536f1d9ede68d26f0d92937a54bf72a5a46d6996d5cf43e"
        semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c:
          after_revision: 14
          aggregate_digest: "sha256:e27ce0f1a5000f66f38d78becd331e5a8e636d4f415eed1bf71f3056cc70dab0"
          before_revision: 13
          command_digest: "sha256:ca6efe6cc0ab8e4a42e8a4e0eeb2ca2a2ffabff976500cd9d35514e4aed891e3"
          effect_ids: []
          event_digests:
            - "sha256:20f473e32bf80f060ba572bd87119a83cfae9402320e05ecc4e6c3815190fb70"
          mutation_id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c"
        semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e:
          after_revision: 26
          aggregate_digest: "sha256:f762997bb4102386758a21b4ac7b7d23e38b9ca8ad6437e95793230750e23708"
          before_revision: 25
          command_digest: "sha256:4bd8c85958721881899129ded4c2dac0f6e4dcd8dade37aae643b7f0383c7baf"
          effect_ids: []
          event_digests:
            - "sha256:16b19d843c4f5935882c5aba65083ebfa7105c5d7208d7f8a9134554c229d125"
          mutation_id: "semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e"
        semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4:
          after_revision: 52
          aggregate_digest: "sha256:b7ef2502bc2b01a7d35b4bf004999bfdfaa6ba106f1043598a16d294032fbf9a"
          before_revision: 51
          command_digest: "sha256:35aeaecf1a8e4af931c350829c513628f983a976b810c1b35458d6391dc9c6ed"
          effect_ids: []
          event_digests:
            - "sha256:ad6a35b1490a88890be8744c0b3735895a9ee8b23cdc5526f02ebd4919cdbf87"
          mutation_id: "semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4"
        semantic-stop:sha256:4e0a3ff62e56c2f72d093e828e4136b20ecf9c86f6bccce6a8187e5be5993a1f:
          after_revision: 91
          aggregate_digest: "sha256:e493e9b3a5f9286fd9740166486adbb4c52a4901cb71251fc8f024ffed1fa722"
          before_revision: 90
          command_digest: "sha256:225b792a2b6bab558b61e6533aad2a37fef5cd0bc27b4821d3ebacf17d5ea2e9"
          effect_ids: []
          event_digests:
            - "sha256:405bd66547a05655e1f7739c91ddd56f4b26a255d9450f13875ea840da826ab4"
          mutation_id: "semantic-stop:sha256:4e0a3ff62e56c2f72d093e828e4136b20ecf9c86f6bccce6a8187e5be5993a1f"
        semantic-stop:sha256:7f4ac438def0408250f9f47515a3ceb35f39cf8813127295f6fac869bfa4584d:
          after_revision: 133
          aggregate_digest: "sha256:76dac7fb6b9d5770dbf76360549ca54b70f02dc54e07fe9210055abc179aa87d"
          before_revision: 132
          command_digest: "sha256:4e223828977e0d88ed604fdf33b5e0b87eada4a936d320413771fb56932d45f5"
          effect_ids: []
          event_digests:
            - "sha256:9427750194e236cf2356f9c081de072deaa8ffb8ae3f3fc87b544d7c21e409cc"
          mutation_id: "semantic-stop:sha256:7f4ac438def0408250f9f47515a3ceb35f39cf8813127295f6fac869bfa4584d"
        semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a:
          after_revision: 59
          aggregate_digest: "sha256:1fad26d589964098a6c568259cd7fe1a2c7ca46c7362f9c3690f1203e07ec228"
          before_revision: 58
          command_digest: "sha256:72a6cefe860a457114fa2f5bc9a2c9dac6717b15434caf11871aa06b05df4c83"
          effect_ids: []
          event_digests:
            - "sha256:f78e38b576888788e65c41fdfdc7dedcb0a3ef73acbca2cca235f07d171ee4b5"
          mutation_id: "semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a"
        semantic-stop:sha256:a0fefec86d03c9cbc2f191dc4f304f955d5829d727db4fb1bd48112c5afc9cef:
          after_revision: 107
          aggregate_digest: "sha256:01569c56fcc93f747124abf162c3b426900cb3ebc03ebd839fd511e1bf76b1ad"
          before_revision: 106
          command_digest: "sha256:61c8d2ac7b92609cd7f29e94e1041e5d711dfecf083a749c89125395de2bd27f"
          effect_ids: []
          event_digests:
            - "sha256:5ae56547bdd410889c29fb7b87b99d93d78453f1d3adcb015c1bdf4bf5ef088a"
          mutation_id: "semantic-stop:sha256:a0fefec86d03c9cbc2f191dc4f304f955d5829d727db4fb1bd48112c5afc9cef"
        semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1:
          after_revision: 7
          aggregate_digest: "sha256:f3101bc1eb9899d88ab2d2e2375ca0881a269601367e79c0848bee94f597cdf5"
          before_revision: 6
          command_digest: "sha256:3e7cd6c9cff8f299fa6234ab6182eae55725ff6e2ecf6f18adb621b773352cc7"
          effect_ids: []
          event_digests:
            - "sha256:a2ba7b554d0f2bbb95497bae921312f2144de57cafbf929c18053c4f76aec65b"
          mutation_id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d:
          after_revision: 55
          aggregate_digest: "sha256:6b87cf1c2da1f54cc9e7c1e2a28cc2becffd16a26b8cbca09f2eb8e7c1493c5c"
          before_revision: 54
          command_digest: "sha256:5aa3834370b484ea28cc8ef607f6d324ba7eaa65dbb8530484435ef653a3c177"
          effect_ids: []
          event_digests:
            - "sha256:e915a68ed0116b4b5d41dc1d0ead3acfd365ec27a80b2bc03b537fa86c92cdb6"
          mutation_id: "sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d"
        sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac:
          after_revision: 13
          aggregate_digest: "sha256:ff2c9f808f16f00c58c125da1237ef48c95153ea4183f1684e0110609d72bfa1"
          before_revision: 12
          command_digest: "sha256:8b1a46410805bddff1cb4cc2c9e834a994d13cbd3980f44d3eb6568daab0c546"
          effect_ids: []
          event_digests:
            - "sha256:129928421e6ebbb5ba023114f0bc42724e7a1e2f94fa77cb12bad0b7ceb4b9e5"
          mutation_id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac"
        sha256:1dad580eb6a73de05ca51e52b3314ce61b8851ae8805771f87dc2fca5cebdeb9:
          after_revision: 65
          aggregate_digest: "sha256:59247762a646860f1bbbcda19bb2cec4b411a5b2dae300a338914af6d3f35d2d"
          before_revision: 64
          command_digest: "sha256:4cc87f591863e9ec388c43496a327a6d7598761accff63e0dca758cd6741ae69"
          effect_ids: []
          event_digests:
            - "sha256:0ea9bed60e531787ec90fb52436dabc0c0af954c98421ce5fea578272edfd358"
          mutation_id: "sha256:1dad580eb6a73de05ca51e52b3314ce61b8851ae8805771f87dc2fca5cebdeb9"
        sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6:
          after_revision: 19
          aggregate_digest: "sha256:dd9eecc5160ba45e332eee10c1a800d14e9bf9ddcece52a63f0471cc19b37ece"
          before_revision: 18
          command_digest: "sha256:741226c92ac9925e2a5d4aa25f036a6bb10ab43889298bff52c487012adf6f35"
          effect_ids: []
          event_digests:
            - "sha256:e33dd701e2c11ef94cc147f0080d5cc2024451c38313a26d3500e155ca62738e"
          mutation_id: "sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6"
        sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144:
          after_revision: 29
          aggregate_digest: "sha256:98279cda39d460dd8d54b9a8fa3c597aad96cc96966e2a808cd8370aae2bca3b"
          before_revision: 28
          command_digest: "sha256:96432550502c9feebe327c8d5ea60ef17ed19b481d320520387a2f02642c1a83"
          effect_ids: []
          event_digests:
            - "sha256:1c3c287d47068b2b9b08c03e7121b31a5d0c9b8122f4e84b040329ae8f07ec41"
          mutation_id: "sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144"
        sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256:
          after_revision: 32
          aggregate_digest: "sha256:292fccec241f6941a3490fe441524e840664e28414872def39f9c36f635cf750"
          before_revision: 31
          command_digest: "sha256:c28c053ad02ee0d0d4ff8c84b3d3f16450f751a04c145702ab3677ec220db38b"
          effect_ids: []
          event_digests:
            - "sha256:046f97a826d75ec3efe0ceeb9b9a0d49486fd87fbcaef04be17559a99b811962"
          mutation_id: "sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256"
        sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a:
          after_revision: 58
          aggregate_digest: "sha256:4f7b852dc060be58464fb226072f05fedc4c0cae4fff152e7ac6465d8fec8b5b"
          before_revision: 57
          command_digest: "sha256:f41e7214de0180ae90dcc3d43a4cc0b199b8152146472083248ac6e09fb5bb61"
          effect_ids: []
          event_digests:
            - "sha256:a5f5a3d1c0cfcb0a9431a33c622840373af39e8d34a610a08f4d4d877d8e1862"
          mutation_id: "sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a"
        sha256:466635706b2ab165d9b8a717749ae8ec79ecf77a574dfabeb444a0acd1b6b080:
          after_revision: 130
          aggregate_digest: "sha256:d886c2b03f64a3d4602ae611d00c027a155bfab43c08852f4d1f60a666c2e5e5"
          before_revision: 129
          command_digest: "sha256:bd719d40ec964b0e2729d3e3cfa12a4fcfcf6de3221997bf0c6a311b2db6e74c"
          effect_ids: []
          event_digests:
            - "sha256:aa440206c2f711e34c0546644d3834d1f6cf4e2a6659aa34173faa711ecfb7e6"
          mutation_id: "sha256:466635706b2ab165d9b8a717749ae8ec79ecf77a574dfabeb444a0acd1b6b080"
        sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7:
          after_revision: 49
          aggregate_digest: "sha256:410572b2c734ea845d88d4575771bb6aed23a7d5f185ba6b338c41aa27f1deb2"
          before_revision: 48
          command_digest: "sha256:c20d235e9fc781e5991ec1d7be8019552162da7ee7808fff0d54f4bc10169447"
          effect_ids: []
          event_digests:
            - "sha256:26fdf470bbe3ec513083e3077610174fa6843da75b10978140d0fc913ded8e8a"
          mutation_id: "sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7"
        sha256:4bc761d68844020b74dd45bd583cbdb531669bab10dc479715165ae759bdc99d:
          after_revision: 113
          aggregate_digest: "sha256:84e51645fc709d89172c9129f7dc0749264f08b22904a4344730e0f26b9f79e9"
          before_revision: 112
          command_digest: "sha256:63b5ba79fe87a304a6607a2ee39f5d9b188824e2bceea231215514660f2cced0"
          effect_ids: []
          event_digests:
            - "sha256:1b8af7b347c9382a0d01c8d6b8a44aa1198e6c1cc8a7af1cc4fee8e2e9c7f953"
          mutation_id: "sha256:4bc761d68844020b74dd45bd583cbdb531669bab10dc479715165ae759bdc99d"
        sha256:562c8ec8e726f18c7425dd86b0395152aa3ee7ff0008cf739b34c8279a9834fd:
          after_revision: 97
          aggregate_digest: "sha256:1532209f74f7c8ef4f00841b23257dc1663328168c5e156d173b29ffc103b2ef"
          before_revision: 96
          command_digest: "sha256:583f60931d950325bf6581ee74beb02d68df063403356faab8c2d7157161b296"
          effect_ids: []
          event_digests:
            - "sha256:a68db4284a93a8cc06cab937973e253db857a5e32136471bd0cbde29f54f8fd2"
          mutation_id: "sha256:562c8ec8e726f18c7425dd86b0395152aa3ee7ff0008cf739b34c8279a9834fd"
        sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701:
          after_revision: 62
          aggregate_digest: "sha256:f3f0a0a293975f32d8c2c6024338171dcab46790b941be4bcb63f0951a733135"
          before_revision: 61
          command_digest: "sha256:565c4e096e9126e639ca52820243fb99534131e09455f9f8a9270db08e22d073"
          effect_ids: []
          event_digests:
            - "sha256:de131819154f35eefc4fdf059a42183931f0787ff2d6da77886c8f5a0e4acb57"
          mutation_id: "sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701"
        sha256:5efdbc671198394f4c5c0d140b732c49439e164405247e80383d792389d07c25:
          after_revision: 104
          aggregate_digest: "sha256:1edb3226d6743ca6b81164620b485f51ad8684fa8c14f24485e487be093d5983"
          before_revision: 103
          command_digest: "sha256:6602dad66c21879ff2542cfadcc16a8fcd584a5b433bf07ea62df6af6827b279"
          effect_ids: []
          event_digests:
            - "sha256:1b684c80f229db95b70e1c20fcd3ed451ccc9cc890877f94b6a063cdabd294c9"
          mutation_id: "sha256:5efdbc671198394f4c5c0d140b732c49439e164405247e80383d792389d07c25"
        sha256:6b72d0eeada22d6bbb91cca37a6ffba905406ec6c494ab2ebf2b0ae0f415258b:
          after_revision: 120
          aggregate_digest: "sha256:3f8637826eb1c3ca665a8ce32d1ac2c453e903d5545a1c9e91203ab157cb4c2f"
          before_revision: 119
          command_digest: "sha256:46a62de4e81704501b549e00e23b1f475f6edc6bbc9d18a1a4a9cf87d5eb3e7e"
          effect_ids: []
          event_digests:
            - "sha256:f2de31cd5a0e068c847a4f9186493c71132fa30d2198534c7434ea0b178710fc"
          mutation_id: "sha256:6b72d0eeada22d6bbb91cca37a6ffba905406ec6c494ab2ebf2b0ae0f415258b"
        sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e:
          after_revision: 39
          aggregate_digest: "sha256:36df9c206608b92e06281f850479cd2e049290b5fa979a34777b0403d0ae8656"
          before_revision: 38
          command_digest: "sha256:a23fbe5e508fa1d2f8df461f589440d4f3aea293a93d47ddb2b3df58efb9e001"
          effect_ids: []
          event_digests:
            - "sha256:d31a9896c0eb8bc02f43d3a5725db60e1330e25215aab22f4fd7a22b405dff5d"
          mutation_id: "sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e"
        sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a:
          after_revision: 3
          aggregate_digest: "sha256:c98a2d9d53fdfdef862fed9f860b167830ca6f2b02137964e0b3a45dc69a8c03"
          before_revision: 2
          command_digest: "sha256:1b3d501550908aa1fb04c713a56340dcec200a85f7df3a70d5a6f80a67091b50"
          effect_ids: []
          event_digests:
            - "sha256:3111602d00f5c7d4b5e442876474967b3bb809502d1a3216409da08035cd7732"
          mutation_id: "sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a"
        sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67:
          after_revision: 16
          aggregate_digest: "sha256:4519e08069e54da1a6058d5e54a7dfa9f9464c74ab5af18058ccf87eff9637c3"
          before_revision: 15
          command_digest: "sha256:99d5b9c5c5aa2db6629231b004cae00762b5285091ba4a10a5975359f3ec1773"
          effect_ids: []
          event_digests:
            - "sha256:43605c14cec41a93cf0ee27ae0f813914ab9b5e4f9f8f30a111a9d4563877288"
          mutation_id: "sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67"
        sha256:99ef90b0f96fd6b145146790cf3f7ae1a39cd8b38e4952e71de12a84bd3f318d:
          after_revision: 81
          aggregate_digest: "sha256:19ac6e2f9260f9cfbfa9e184894db8059ce46db5014ec83c414c6190f6e705b4"
          before_revision: 80
          command_digest: "sha256:b8208ad5490839e6d09aaee93c20586152070ae6cfc5d89246f534e3a779a18c"
          effect_ids: []
          event_digests:
            - "sha256:458dffb35e102e5d2e757ede727b9997e3bf343cfb41cca06f4a1a4469cc93ed"
          mutation_id: "sha256:99ef90b0f96fd6b145146790cf3f7ae1a39cd8b38e4952e71de12a84bd3f318d"
        sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb:
          after_revision: 42
          aggregate_digest: "sha256:5f5f7559bd1329e9068aef798fe15038f6e7e563c00238f7e9bd274cb629095e"
          before_revision: 41
          command_digest: "sha256:b1a71b2fd321bbb90ad9f62d1d42783481425bf4718b120a05c0a290aef1a4c8"
          effect_ids: []
          event_digests:
            - "sha256:47203c0438cc236d8c5bdb8315ffb1d9a8326d01ee103bffe9c782988e199725"
          mutation_id: "sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb"
        sha256:a55620a23d0acaf7530922a132e9cd608fe4a5b104920e596f991d5a513828b8:
          after_revision: 110
          aggregate_digest: "sha256:eefebce5ee35f1b4c22bcbba3f9a7bed6f1005a2e77d969c83d12294c8db86c5"
          before_revision: 109
          command_digest: "sha256:238c3ed2bdb59161c1e52dfec5a9ad72628a75cf80a31710f991508691703900"
          effect_ids: []
          event_digests:
            - "sha256:35e1af13845bec4d0952cd9a0f988a619e74df89bebf29af74d72bc6fc2c4ae5"
          mutation_id: "sha256:a55620a23d0acaf7530922a132e9cd608fe4a5b104920e596f991d5a513828b8"
        sha256:abf78cf4e3843ed5f091ee8415ea1992d0b65f85ecf53279fbd4f70de76cf216:
          after_revision: 139
          aggregate_digest: "sha256:ff7dd1a96c2d14df123779e55f176ca16a2040f2d3fb62f31346678fcb5e868f"
          before_revision: 138
          command_digest: "sha256:1d5e5b84e83e72ae9f487a210c61a4ae90f7e6bff4c33bcb774bb49b67f009c5"
          effect_ids: []
          event_digests:
            - "sha256:ce49169a4376bae2613037335e9212a4b91a842c9018eb86e991f299273b6f54"
          mutation_id: "sha256:abf78cf4e3843ed5f091ee8415ea1992d0b65f85ecf53279fbd4f70de76cf216"
        sha256:ae1cf4c6cbc50ebee891b0454b97dd5719394b4750d3e859ff66853acff54aed:
          after_revision: 72
          aggregate_digest: "sha256:587f2a014eeed9737d6094dc743c26429f0fdfafbbd8700f8d427ee6cc9f3393"
          before_revision: 71
          command_digest: "sha256:db298fce2469da146b496a261281e133db28efb5265dd12bfd1b4635dfa154c3"
          effect_ids: []
          event_digests:
            - "sha256:be97a2fb228d7b84ee56e5fdd67c8391dc4b14fd179177aedd15e619778aa02d"
          mutation_id: "sha256:ae1cf4c6cbc50ebee891b0454b97dd5719394b4750d3e859ff66853acff54aed"
        sha256:b39622eb4e6027983e0966bb1f599d922a5013cfc798b8fa075287715c43ff9f:
          after_revision: 88
          aggregate_digest: "sha256:ecee143ecfac2ca28631e95b3097a274178c9a000c9ba4a51007e75912c291de"
          before_revision: 87
          command_digest: "sha256:a5edcfaf3c10bff2edd2f455972a3b81ef8ecc617eb6345cb605a2faab3e2a0a"
          effect_ids: []
          event_digests:
            - "sha256:1a5e70f63f148f0db4df04b39e52d0d229ad52f547f07098fce2f1ead5fe66b8"
          mutation_id: "sha256:b39622eb4e6027983e0966bb1f599d922a5013cfc798b8fa075287715c43ff9f"
        sha256:b99350206d1c6511e0da1b25d7f4f243ef66ee1024dd2e656f8c928ad1667c32:
          after_revision: 136
          aggregate_digest: "sha256:7122e786c5efd43e199120e70a10eb3b6a401f6c80ad7e9548d20a9087af05b3"
          before_revision: 135
          command_digest: "sha256:2e1c65e4ee4bfc9fe8dbdfd7a851159d6afaea53046d73507ba796c70ffcbc76"
          effect_ids: []
          event_digests:
            - "sha256:85f3d7d283000b8e6c44f5e4a9a1cc6618684dfc3278d7a1ec4afed8385ee70a"
          mutation_id: "sha256:b99350206d1c6511e0da1b25d7f4f243ef66ee1024dd2e656f8c928ad1667c32"
        sha256:bdbd78ba4c4b32be4169e7c30c6cffdc974fb8d5e2a1dca6a7a7478fa89ff997:
          after_revision: 78
          aggregate_digest: "sha256:16c90e2cc58c26f163c5a26b4ef70041baff96562926b37fab5715b520d4993a"
          before_revision: 77
          command_digest: "sha256:28bd663811658ab66593504366e833c8313f1b42f172298f8ed8bb3c2f3d03ff"
          effect_ids: []
          event_digests:
            - "sha256:503295ab64ddfa4a4d369f613156e4124b2f0b564a27e71a01c1930845c89b97"
          mutation_id: "sha256:bdbd78ba4c4b32be4169e7c30c6cffdc974fb8d5e2a1dca6a7a7478fa89ff997"
        sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37:
          after_revision: 10
          aggregate_digest: "sha256:7d468978fe92a9bcdcda206b43d9ad012af60f4c8e5eda27d6716bd4722db8d8"
          before_revision: 9
          command_digest: "sha256:39b6d944e8e1cf557573f112f45cecb626891bf92e2bceb471740775d8690385"
          effect_ids: []
          event_digests:
            - "sha256:bd413e3a4a4c3070565a2dc11fd939b25fb20e4d61757481888d1b8e024dde6a"
          mutation_id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37"
        sha256:de9e50cb7484172ecdc6b47eb45fc3e83e69993922d48b2c0e597b43211c3141:
          after_revision: 123
          aggregate_digest: "sha256:e90fcbbb9929e1e4c1f3230e5882a42b4f54dd0a387f496165d2e992b0b7a7f3"
          before_revision: 122
          command_digest: "sha256:d39e0fb7fc6d550cc441bc340c57601adb11581df197af862f9c05b9e94a3d84"
          effect_ids: []
          event_digests:
            - "sha256:1a0041ed6df5e83613800ed04b3dd022c98522ce446b1ad6be596575693b9407"
          mutation_id: "sha256:de9e50cb7484172ecdc6b47eb45fc3e83e69993922d48b2c0e597b43211c3141"
        sha256:e8706db81b9b60e8756958fff8ec095183701457e5c5f9ed4f9cca07bbd2a36b:
          after_revision: 94
          aggregate_digest: "sha256:ac5db9d0bed454477a5bd0ea503ccb86b720dc0a76807d1c165cdd3b14e7ca25"
          before_revision: 93
          command_digest: "sha256:559853bbee52de9c181ac3ec7bff305de8a32b355e229ffc025b21188c50ef94"
          effect_ids: []
          event_digests:
            - "sha256:9896c4742942de72d605f4fc8527034303d0437598f8a2fcd85ca912a543c5e3"
          mutation_id: "sha256:e8706db81b9b60e8756958fff8ec095183701457e5c5f9ed4f9cca07bbd2a36b"
        validation-resolution:sha256:044ab8028f6d15e4ffd4f9466db5523e2b83026da874c40963ea193a67fabe75:
          after_revision: 127
          aggregate_digest: "sha256:b6e46c29db72e054eaf2a20fa997ba76784a056b3bea6d709acc8e5dbbccdb07"
          before_revision: 126
          command_digest: "sha256:0ced365276aa405f032f88396a6fb9ed12aa57678f2194b0d7a352364054d9b0"
          effect_ids: []
          event_digests:
            - "sha256:035c646f82c073a772ce180d3fd41f3702580db61f81b5ba2e4016a77ae3c097"
          mutation_id: "validation-resolution:sha256:044ab8028f6d15e4ffd4f9466db5523e2b83026da874c40963ea193a67fabe75"
        validation-resolution:sha256:061136f11bfe8a769f338be683c041131e2140f90d069817a036151069ea85fb:
          after_revision: 85
          aggregate_digest: "sha256:5f02e8af6e28d337b31e550eda1db307d03cc275933bb5ab5c567362a5a33f95"
          before_revision: 84
          command_digest: "sha256:69de00dd143b99d029a778a97fe2722cc5d07c7837162784a9ffa50734adddb5"
          effect_ids: []
          event_digests:
            - "sha256:75af64ddf95f1d89045b43dbaa900bf6de9f8131fc764ade192e5faa6902a3d6"
          mutation_id: "validation-resolution:sha256:061136f11bfe8a769f338be683c041131e2140f90d069817a036151069ea85fb"
        validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe:
          after_revision: 46
          aggregate_digest: "sha256:47a8ab1a7151b7a5956f672466babb3648c2b9e5864b9a98b329bc18319c98e9"
          before_revision: 45
          command_digest: "sha256:d0b517ed66737dd17cc4533485158bcbe20756d66dcf45299eeb31f6f0089d97"
          effect_ids: []
          event_digests:
            - "sha256:9aa541316f4265cab791fb64038ee4ac3a7ca61f5868f0d6964fb012ab48b796"
          mutation_id: "validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe"
        validation-resolution:sha256:334669be6bbf6ef2cb0ee8f1fe337e206a3813f6db79c619ed3895aa94933236:
          after_revision: 117
          aggregate_digest: "sha256:5c358eba6b0d21f60219daf28a0640b74ec7a2e99ab25bfb9cfafc6f54b507c4"
          before_revision: 116
          command_digest: "sha256:2c2b0bd21c531c0f48f4e07cc0de50d76c42746fa92c0eb16a6cc83eb33be0c1"
          effect_ids: []
          event_digests:
            - "sha256:a3f10e3a946313d3dcbdf751853088e2841e9158d6c1c0abc16740a0839a423e"
          mutation_id: "validation-resolution:sha256:334669be6bbf6ef2cb0ee8f1fe337e206a3813f6db79c619ed3895aa94933236"
        validation-resolution:sha256:41bcb45c5ae6baac7e340dcf7715f17a0fc851678274be5b060bbbf1c0b6ed61:
          after_revision: 101
          aggregate_digest: "sha256:b80bbdf646d34deeeb82245e323bb7849d656d591e7019f7688ad9e57db996b0"
          before_revision: 100
          command_digest: "sha256:ec445af7be037a1fe848fb3f14ddb1ff9f8e1b13897dbb5e839a4f259bf5152c"
          effect_ids: []
          event_digests:
            - "sha256:a974a66a95c4224b38c57559c4df98280d81caf94f7b2ae285923cf10bf8148d"
          mutation_id: "validation-resolution:sha256:41bcb45c5ae6baac7e340dcf7715f17a0fc851678274be5b060bbbf1c0b6ed61"
        validation-resolution:sha256:6f40c31c7a26cb86044e92f1b6d40f5d08c3e29024fe5e9bc73d3da63c9466f0:
          after_revision: 76
          aggregate_digest: "sha256:442521269e8e77151bae80540fda591ec9c7249220db617da0ad4fd615be59a0"
          before_revision: 75
          command_digest: "sha256:df24e09b7b0c410f1067a26c2946e3069c102875af2aab8d047ada44405d1d96"
          effect_ids: []
          event_digests:
            - "sha256:f60572c1f7c7b03df6cfd1fb27cc8b0bdd9dd6fff63db7e895ed1df58746608c"
          mutation_id: "validation-resolution:sha256:6f40c31c7a26cb86044e92f1b6d40f5d08c3e29024fe5e9bc73d3da63c9466f0"
        validation-resolution:sha256:8d28fc1f91cf22aff00d8110e3fb092c874f457188fe5a2601d4432cb207c409:
          after_revision: 69
          aggregate_digest: "sha256:394a1a464075e521aed093cdd01f0cf0f4ede70e4b8e3a1ff9e31c293d09cb72"
          before_revision: 68
          command_digest: "sha256:cfce466525cb10c94e27613b579990ae399ef205e68af6d507d63cf35d91840e"
          effect_ids: []
          event_digests:
            - "sha256:3e724e055800b34d4a12792a53ffe12a3e417396a0ba02ccdc796c17c118bb98"
          mutation_id: "validation-resolution:sha256:8d28fc1f91cf22aff00d8110e3fb092c874f457188fe5a2601d4432cb207c409"
        validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a:
          after_revision: 23
          aggregate_digest: "sha256:f17c518559669eccd5ae049ba930e332c12e968aff6b02a61de1106f59ffe35d"
          before_revision: 22
          command_digest: "sha256:f3fe1dc72d0e7ea514a8f965053924e5810fed0b7653feda6c4d54ff12568b4a"
          effect_ids: []
          event_digests:
            - "sha256:0455adf95cc1734edc508049b130c537f3839ff4c4d0af23b9127ccbffd5ea4f"
          mutation_id: "validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a"
        validation-resolution:sha256:fdaaf3857ca1d8cd6c54bbda49664d792279616ef388a81cabeb614bc58983e1:
          after_revision: 143
          aggregate_digest: "sha256:93ef51732e5da18ddc827950082cb221886a662aa2b4407099d64a96f635e90d"
          before_revision: 142
          command_digest: "sha256:26ee4e629a41a5d382d4dba7a1b5cc25a4a5c35247e2ed014185e38031266d01"
          effect_ids: []
          event_digests:
            - "sha256:c8d0222d396b2e631aedfdf764d5e87c88e60dd1a623de83a7018d424c8d29bc"
          mutation_id: "validation-resolution:sha256:fdaaf3857ca1d8cd6c54bbda49664d792279616ef388a81cabeb614bc58983e1"
        validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a:
          after_revision: 36
          aggregate_digest: "sha256:4f5f7aba1fef6e01684664af2633a34c6bfd05d16bab96263048b6e3bb28de89"
          before_revision: 35
          command_digest: "sha256:ea2246ebf0b05fe728aebf3d5eee0bbc0719c2f76a8cc8c86f94f9ebd76ec5b0"
          effect_ids: []
          event_digests:
            - "sha256:4e8323adfa7c4a4803ca2e96302d8b0d1535ae7f3b7f359ca27e5119890db0a2"
          mutation_id: "validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a"
        validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:
          after_revision: 22
          aggregate_digest: "sha256:8b9bd59d792ec2996ed3881bc18c8fe32dfe16c7ae711d44a7dc481dfe11a28a"
          before_revision: 21
          command_digest: "sha256:5e221507be75cee3754ee78506adb637c90840c1a25e751bb4a10643a6114a74"
          effect_ids: []
          event_digests:
            - "sha256:2280ed8f22e0434833fc33796eb4a54190c841872b3b27ae84b73ffd494d2d5c"
          mutation_id: "validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        validation:sha256:65003ee2f77c247d8660636b677ac98298b33587f3df93ae30cf52ffea6a86b0:
          after_revision: 84
          aggregate_digest: "sha256:3c753325f8972f46772507b67daf2abb404c0e4aeb7f218659618a92e7e65d06"
          before_revision: 83
          command_digest: "sha256:c43dd1669cd2c6fd7babd98610ea0c5c75f78073c581e57a9e3925984cecfd16"
          effect_ids: []
          event_digests:
            - "sha256:ed90a69781fe708278eba5ab1a018f99461d25afc780ace69b616d6a071885bd"
          mutation_id: "validation:sha256:65003ee2f77c247d8660636b677ac98298b33587f3df93ae30cf52ffea6a86b0"
        validation:sha256:6e0dc9d789e055871e7c027287309ebb05105114f9c1ef432874cc1c3feaf6c5:
          after_revision: 126
          aggregate_digest: "sha256:8cfdd4e243ad27f4208635d1f47ea407033bf971634aac5874cbfd92dad6ee52"
          before_revision: 125
          command_digest: "sha256:93bc2707a504df617d042a7ce4f666f4d282d545b80d9d7ce474feb5a68b542b"
          effect_ids: []
          event_digests:
            - "sha256:e104917b482f6787c51b71ffb35149fd2b69f907d07821087692a6652f01e39e"
          mutation_id: "validation:sha256:6e0dc9d789e055871e7c027287309ebb05105114f9c1ef432874cc1c3feaf6c5"
        validation:sha256:c3da1679275df47facc927ec6cf7d32f226f80c1479ed9bd967623381373af3d:
          after_revision: 75
          aggregate_digest: "sha256:74a95c42d0d5bc60ace115a490ae37ae8a21b6b9fa596b4dfae1aa0496d4e4ef"
          before_revision: 74
          command_digest: "sha256:45497536023c4969b0941acdf7ebc9d7b5a00c07c699feb7baf47103e3b0b428"
          effect_ids: []
          event_digests:
            - "sha256:65e6644d9821fe95940ba7e95b63340a96d7509177f3d5e8b134693c43171a8c"
          mutation_id: "validation:sha256:c3da1679275df47facc927ec6cf7d32f226f80c1479ed9bd967623381373af3d"
        validation:sha256:d37649c60a27c0e76da41a8caf537e4c5449b0caa1d9941e555648b2da2c3740:
          after_revision: 68
          aggregate_digest: "sha256:79a5b6a4a9ef14644e9ca6b95c525889ab0db2b748f37681cd865700218b15cf"
          before_revision: 67
          command_digest: "sha256:86aefab79ddd9b91435cb884c42204d91d7bbaccbf9c02e9ead5ff116b284f1e"
          effect_ids: []
          event_digests:
            - "sha256:a3658f6aba4f4509b5333ea85641e92dbd210fa7e3e294848cba6d7c902cda63"
          mutation_id: "validation:sha256:d37649c60a27c0e76da41a8caf537e4c5449b0caa1d9941e555648b2da2c3740"
        validation:sha256:e0c79ca4f1c43356c48b82bf405d3706bd51cfb5afdaeac22a6b19ca605ce7b2:
          after_revision: 116
          aggregate_digest: "sha256:8b482d3774b996f090b47eb4d0a1d1d8152cd233a7e41bdbfdc0c5fd431ab94d"
          before_revision: 115
          command_digest: "sha256:d6320a76e7e55237cd3dac2fb767b05fb37f67735a42b899d640638804207100"
          effect_ids: []
          event_digests:
            - "sha256:445c1039f90250ad8192a6027f7854478299c80a98b67033be018a33acc17404"
          mutation_id: "validation:sha256:e0c79ca4f1c43356c48b82bf405d3706bd51cfb5afdaeac22a6b19ca605ce7b2"
        validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc:
          after_revision: 45
          aggregate_digest: "sha256:b803818e921d7d2b3654b36523431178bbbf39a5ed61e030c27ab26bdaf284e9"
          before_revision: 44
          command_digest: "sha256:55b93883d7a2b97089fb5e2bc6d38e411830f9b785ffb7bbed5dc4ffbed8bf4f"
          effect_ids: []
          event_digests:
            - "sha256:4bcfad58e34780643ab8e191195b3b426c00efded79ec7b3fb03579795c1dbc1"
          mutation_id: "validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc"
        validation:sha256:e3211efdff4c8c9f8209823f31eb90c62ec067b5adeeacbeb44bb1f30f2d6db6:
          after_revision: 142
          aggregate_digest: "sha256:1f45814b41ab644211842b78afae05496a3862bff62eea8fb4d3d56965a41fe7"
          before_revision: 141
          command_digest: "sha256:f5ffc95246e1609cea6bdf353646613ec9ea65da755a946202f0323db0219857"
          effect_ids: []
          event_digests:
            - "sha256:f7848a25da27f4962f40c6e920ad0b3d28f3a8ce6e793ebb9871137d91fa5b2e"
          mutation_id: "validation:sha256:e3211efdff4c8c9f8209823f31eb90c62ec067b5adeeacbeb44bb1f30f2d6db6"
        validation:sha256:edb370953f4afae4647d077c471fb0003ee692782ccd03eca5b6215e09769605:
          after_revision: 100
          aggregate_digest: "sha256:0a0d2046ef4fb88c95c47f48627d81c67528623a57533e3ca33b974c6bfde0cc"
          before_revision: 99
          command_digest: "sha256:1d972321f339ae0bdf923ba7428ad9f6545e9d79dd2d72044e9c4d5d6401a255"
          effect_ids: []
          event_digests:
            - "sha256:dc51f5c1b77237fd5236b80c4807f035e82ff620d34e693de4786a945a95c33e"
          mutation_id: "validation:sha256:edb370953f4afae4647d077c471fb0003ee692782ccd03eca5b6215e09769605"
        validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf:
          after_revision: 35
          aggregate_digest: "sha256:5bfe05429f416ca93c550a4a8e6efe2e28b10aa822756e75c485b7957773f33b"
          before_revision: 34
          command_digest: "sha256:c242e284bcd7d0cadd0a84033dd81133c6623dad12b7823342ecc3349c640547"
          effect_ids: []
          event_digests:
            - "sha256:09e64c06300e3570847226462c52913dd9aab5daedd5ea71cb6a930cae7c55db"
          mutation_id: "validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:e16dab7c90622938d52df6cd0a36b7e68601f036a01a3cd91fdc68c264e9b259"
          digest: "sha256:fd06ffdd2632a437eee0b99837d7c271cc0301428e307dbd7daf952b2e685e21"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:128748307635320a795e1f3361b14b80175834307631dc650e041e70753caf77"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:49a2c904033f855a3300d68bea644d390772c7598398919e397dca13f93e9195"
          digest: "sha256:47a8364a6762d41ca569f119563ea3789d47cbaabad9474590f4be1194b1f71c"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:06d5154b59be5fe7886d81c9973e9b1476dafd57ee9758cfb7b44233bc32f589"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:d0be380a9b8c076de4758197cc98c9cc4c5f77a5d7e021b8191d2a28316b768b"
          digest: "sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
          revision: 3
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:eec18593f29d333b85d627209058bef57688b191ede1845dba7acbe4430eafde"
          digest: "sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
          revision: 4
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:b2b1783f096b1f86d250514ba4d87b0a8044bc87c5df90f15fc9ce40f8966b24"
          digest: "sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
          revision: 5
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:da6ffed0dcab52486133cb55d9684b6a361d9552b6e37bd497739dee84afb5bf"
          digest: "sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
          revision: 6
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:83d036ea635695fece06589615f23b02ab371d81f35aeee97794e42d7e0c11b3"
          digest: "sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
          revision: 7
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:7f38e3b25025e9da24e26784b0670f742ec60e6adbd24bb51259fb3780ecf9ec"
          digest: "sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
          revision: 8
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:c9112602c52f2613360db35532bab78ea71b5faabe774c35bf9d6e6436b1a410"
          digest: "sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d"
          revision: 9
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:b05660e55b185e473a4e486b109cb7f4103077bc4abd6be72b4d934a14ae7dbd"
          digest: "sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7"
          revision: 10
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
            -
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-54d63c107316-evidence"
              id: "final-correction-54d63c107316"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:a12860cc0ad632d104bf6cb9a43676ffba1219f6caf6d4f9aaa2319c2f59015b"
          digest: "sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc"
          revision: 11
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
            -
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-54d63c107316-evidence"
              id: "final-correction-54d63c107316"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:ad03895dbd4ab0a831100922f841e87ecf737b7d2fdb73fb1d19293fc7b4ba5b"
          digest: "sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab"
          revision: 12
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
            -
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-54d63c107316-evidence"
              id: "final-correction-54d63c107316"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
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
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "canonical-full-clean-checkout-evidence"
              id: "canonical-full-clean-checkout-prerequisite"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
                - "authenticated-fixture-size-correction-evidence"
                - "final-correction-54d63c107316-evidence"
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:a423f7bf2017d5bf14daca54d4f2c871088c71aa7bbac812a6c0504cd753344c"
          digest: "sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1"
          revision: 13
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
            -
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-54d63c107316-evidence"
              id: "final-correction-54d63c107316"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
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
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "canonical-full-clean-checkout-evidence"
              id: "canonical-full-clean-checkout-prerequisite"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
                - "authenticated-fixture-size-correction-evidence"
                - "final-correction-54d63c107316-evidence"
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:a7b077b6bcf5da2bd47348458b0b91b4720c21a0bd5abf02822cc6fdd69420b1"
          digest: "sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567"
          revision: 14
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
            -
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-54d63c107316-evidence"
              id: "final-correction-54d63c107316"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
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
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "canonical-full-clean-checkout-evidence"
              id: "canonical-full-clean-checkout-prerequisite"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
                - "authenticated-fixture-size-correction-evidence"
                - "final-correction-54d63c107316-evidence"
            -
              contract_digest: "sha256:eea8dcf3e830d0284789d3c0e022a446e2b7ced4259d8732e393e148197f49bb"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
                - "canonical-full-clean-checkout-prerequisite"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-ec8e8e56f09c-evidence"
              id: "final-correction-ec8e8e56f09c"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:6c1e43b75ba22c55c2027a90e6c4057a8d878a19b9dc2e53a85f5a19ae23ffe9"
          digest: "sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053"
          revision: 15
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
              expected_outputs:
                - "nine-source-adoption-report"
              id: "integrate-reviewed-nine-sources"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
              depends_on:
                - "integrate-reviewed-nine-sources"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-12acd7c9fe60-evidence"
              id: "final-correction-12acd7c9fe60"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
              expected_outputs:
                - "final-correction-cca82dcaef21-evidence"
              id: "final-correction-cca82dcaef21"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
              expected_outputs:
                - "authenticated-fixture-size-correction-evidence"
              id: "correct-authenticated-fixture-size-baseline"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
            -
              contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-54d63c107316-evidence"
              id: "final-correction-54d63c107316"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
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
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "canonical-full-clean-checkout-evidence"
              id: "canonical-full-clean-checkout-prerequisite"
              optional: false
              required_inputs:
                - "nine-source-adoption-report"
                - "final-correction-12acd7c9fe60-evidence"
                - "final-correction-cca82dcaef21-evidence"
                - "authenticated-fixture-size-correction-evidence"
                - "final-correction-54d63c107316-evidence"
            -
              contract_digest: "sha256:eea8dcf3e830d0284789d3c0e022a446e2b7ced4259d8732e393e148197f49bb"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
                - "canonical-full-clean-checkout-prerequisite"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-ec8e8e56f09c-evidence"
              id: "final-correction-ec8e8e56f09c"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:8726e673df43e4bfa54a282ff6a72a3018e74fea7e89481c322717d08b0d64e9"
              depends_on:
                - "integrate-reviewed-nine-sources"
                - "final-correction-12acd7c9fe60"
                - "final-correction-cca82dcaef21"
                - "correct-authenticated-fixture-size-baseline"
                - "final-correction-54d63c107316"
                - "canonical-full-clean-checkout-prerequisite"
                - "final-correction-ec8e8e56f09c"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "security_boundary"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                  - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                  - "packages/agentplane/src/runner/process-supervision.test.ts"
                  - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                  - "packages/agentplane/src/runner/process-supervision/run.ts"
                  - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                  - "packages/core/src/tasks/task-kernel/index.ts"
                  - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                  - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              expected_outputs:
                - "final-correction-577aba1eacec-evidence"
              id: "final-correction-577aba1eacec"
              optional: false
              required_inputs: []
      revision: 144
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        canonical-full-clean-checkout-prerequisite:
          attempt: 2
          claim_id: "sha256:fe594bdc978f0f193a09e213e6e00214f84e7d03da4151fdcb7f727e30cf0c56"
          definition:
            contract_digest: "sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
              - "final-correction-54d63c107316"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "canonical-full-clean-checkout-evidence"
            id: "canonical-full-clean-checkout-prerequisite"
            optional: false
            required_inputs:
              - "nine-source-adoption-report"
              - "final-correction-12acd7c9fe60-evidence"
              - "final-correction-cca82dcaef21-evidence"
              - "authenticated-fixture-size-correction-evidence"
              - "final-correction-54d63c107316-evidence"
          output_manifests:
            -
              attempt: 2
              digest: "sha256:b4f92c510ec2ee9228de322698d688e07cf276f76d68682deff2dcdd8558e658"
              id: "canonical-full-clean-checkout-evidence"
              kind: "report"
              plan_revision: 13
              repository_fingerprint: "sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "canonical-full-clean-checkout-prerequisite"
          result_digest: "sha256:a0f67999d0997da71e41a82bec1efc9472611015ad1e712834176efb7708f83d"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:cb46e8aa4af61c98019262d400760e6c89f5a6f397dea2f51088b5af05e619c8"
              - "sha256:bc27c0eccaf4ed48a5ad127f0f59c8ccae0e4daf4cbb5aa709026c35467e8dec"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:58245bf91e5583f9dd845615bb7281634f5ab93c22fc5c64c35d23a7b27c0fba"
              environment_digest: "sha256:fafe9d475b644a4e48c57c03d1704f673c259469a01614bf2dcae028d9cbb6b8"
              implementation_identity: "sha256:a0f67999d0997da71e41a82bec1efc9472611015ad1e712834176efb7708f83d"
              toolchain_digest: "sha256:7aa1cc15ff3d94a1557ca19eddc531701402a14e0d766aaa3da65f5468db5390"
            observed_at: "2026-10-13T14:04:49.939Z"
            status: "PASSED"
        correct-authenticated-fixture-size-baseline:
          attempt: 1
          claim_id: "sha256:83345d8e9654b2bae76dc46e5b66d9e190156f69a6cc7338c322e721d7945fdb"
          definition:
            contract_digest: "sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
            expected_outputs:
              - "authenticated-fixture-size-correction-evidence"
            id: "correct-authenticated-fixture-size-baseline"
            optional: false
            required_inputs:
              - "nine-source-adoption-report"
              - "final-correction-12acd7c9fe60-evidence"
              - "final-correction-cca82dcaef21-evidence"
          output_manifests:
            -
              attempt: 1
              digest: "sha256:8bfb77ea1055bd14e511d92c2b2ee0edc2518bea018dc62724de735df3d70f41"
              id: "authenticated-fixture-size-correction-evidence"
              kind: "report"
              plan_revision: 9
              repository_fingerprint: "sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "correct-authenticated-fixture-size-baseline"
          result_digest: "sha256:cb2d5a58daa2cd4be2bce0192629b860661095c98623c4218cf3bce03060536e"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:0262e6f93a21fa004743864d23fd2f62c7c685d938484c0c52408969537706c6"
              - "sha256:b350b8e14e14f6d2822d395ecc5884535806645a4ac2e81ae8907f8c242b96c9"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:4d0f55c8783eac01faf3280d9bde35038a1f140cbcf42888e357a8a7a0f48b00"
              implementation_identity: "sha256:cb2d5a58daa2cd4be2bce0192629b860661095c98623c4218cf3bce03060536e"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-13T04:04:57.540Z"
            status: "PASSED"
        final-correction-12acd7c9fe60:
          attempt: 1
          claim_id: "sha256:f4566c63e51adc76127388bae6a192ea86b06088e1c131e027e6939501544d93"
          definition:
            contract_digest: "sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5"
            depends_on:
              - "integrate-reviewed-nine-sources"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-12acd7c9fe60-evidence"
            id: "final-correction-12acd7c9fe60"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:efccd2433174815ab254fc203e3307b3a245811323978ada32438c1af239505f"
              id: "final-correction-12acd7c9fe60-evidence"
              kind: "report"
              plan_revision: 5
              repository_fingerprint: "sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "final-correction-12acd7c9fe60"
          result_digest: "sha256:bac6813074cf6b6f35e79cec95ebd46abfb2c6381751f44ab6c4aa9916b01b76"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:49ee02f853ff3332a9119442bd1d4ed3f58dc4542bd9efef2c5bf3cc423347f1"
              - "sha256:9efb379137bbf4403bd2caea53fc151dbb432ef646d0cd917d8d3fee0784adc0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:e98a14de71d7e4cad52e42e6b968aae78544de4acf3ee2a8179c30497e32aae7"
              implementation_identity: "sha256:bac6813074cf6b6f35e79cec95ebd46abfb2c6381751f44ab6c4aa9916b01b76"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-12T19:51:16.526Z"
            status: "PASSED"
        final-correction-54d63c107316:
          attempt: 2
          claim_id: "sha256:1c9701b775f53181d5bbf64c28035954d198845807bc62a1278f752a330c584f"
          definition:
            contract_digest: "sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-54d63c107316-evidence"
            id: "final-correction-54d63c107316"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:853c935678c1da31743a79a8fe2da8d4cb534268cb3392c8757cb6cedb7e6984"
              id: "final-correction-54d63c107316-evidence"
              kind: "report"
              plan_revision: 11
              repository_fingerprint: "sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "final-correction-54d63c107316"
          result_digest: "sha256:512e36b87e491f320b272915637ef321a173a853856e43f5f5dbd201cedfd5da"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:412e4ffe3b9317cf64db773272e28f405a6134aae7bd3f816a29ebd27329bff8"
              - "sha256:a66eddefdd1c0d87b8fa76c1c168d2ee2c59cc4aa031dc5d3adc758163d1888e"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:1d03fd584e6588ce1e8dcb8828ced2a3e593b5da2493d93d427e241a19b8708c"
              implementation_identity: "sha256:512e36b87e491f320b272915637ef321a173a853856e43f5f5dbd201cedfd5da"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-13T07:00:11.062Z"
            status: "PASSED"
        final-correction-577aba1eacec:
          attempt: 2
          claim_id: "sha256:291daa2a2c8d0a2da8a24e18d91545276a87efd87e6636cfbe68faf2a17637b9"
          definition:
            contract_digest: "sha256:8726e673df43e4bfa54a282ff6a72a3018e74fea7e89481c322717d08b0d64e9"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
              - "final-correction-54d63c107316"
              - "canonical-full-clean-checkout-prerequisite"
              - "final-correction-ec8e8e56f09c"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-577aba1eacec-evidence"
            id: "final-correction-577aba1eacec"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:b922df07c96807e48a1085e3dcb5cd54cddbe6a6af57e2163f0fe8c7db3f703f"
              id: "final-correction-577aba1eacec-evidence"
              kind: "report"
              plan_revision: 16
              repository_fingerprint: "sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "final-correction-577aba1eacec"
          result_digest: "sha256:403b4a4c482a874281893eb52fba22f11d32ec9001c8f85e29c5f90845cdcc8c"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:eb08c3dd54f064078d9244e87bc4dbb20477aeefd5783794d65a266bcf37344a"
              - "sha256:0b2c2f2d8230f4522027dc00821871c5ed67aee002682dbf8aaed6ddff42bec3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:a61eb8d6ce6558430bc2af653aa1f10c06201cb51a7f85eafc84dce299e8ae0a"
              environment_digest: "sha256:a0ccd27258883768caf4d6cdeebb0073de80956944d09cf84db6a3cf6cf95eb0"
              implementation_identity: "sha256:403b4a4c482a874281893eb52fba22f11d32ec9001c8f85e29c5f90845cdcc8c"
              toolchain_digest: "sha256:bb92198bd58f64625cfa6c3168844bda302f030d6fa90162ff54359bb841eb2b"
            observed_at: "2026-10-14T04:37:11.235Z"
            status: "PASSED"
        final-correction-cca82dcaef21:
          attempt: 4
          claim_id: "sha256:552c82af73fb9f929d7ecd77a5cfcd2f5f5e60625e49c1a32a85d39a7e9d2440"
          definition:
            contract_digest: "sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
            expected_outputs:
              - "final-correction-cca82dcaef21-evidence"
            id: "final-correction-cca82dcaef21"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 4
              digest: "sha256:2273d33c7be77d409f8b41f090cbc45e01e3ec25111a169fc73cb90c3fab0e5d"
              id: "final-correction-cca82dcaef21-evidence"
              kind: "report"
              plan_revision: 8
              repository_fingerprint: "sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "final-correction-cca82dcaef21"
          result_digest: "sha256:268dea0ce452409ba5685ed5b0e2e85ee41f743e2901395e15b89ae86f55236c"
          revision: 24
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:92dbb6c58437ce080cf58bc305c77308cdb3dab60fa6a39606d006be4733372e"
              - "sha256:c43dd8f743f58abdf3d6bec551077bc16c0dfb28c23afd724645df29f4b6914c"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:46318e9a64049e147878856a4e9a8019ce5bd73c3b2291d1b9f03f0418b1fb7b"
              implementation_identity: "sha256:268dea0ce452409ba5685ed5b0e2e85ee41f743e2901395e15b89ae86f55236c"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-13T00:29:39.649Z"
            status: "PASSED"
        final-correction-ec8e8e56f09c:
          attempt: 1
          claim_id: "sha256:14f16d95e44a5bdb41e6fa1aa8382c7e682f00bbbe366bf757563727504f36dc"
          definition:
            contract_digest: "sha256:eea8dcf3e830d0284789d3c0e022a446e2b7ced4259d8732e393e148197f49bb"
            depends_on:
              - "integrate-reviewed-nine-sources"
              - "final-correction-12acd7c9fe60"
              - "final-correction-cca82dcaef21"
              - "correct-authenticated-fixture-size-baseline"
              - "final-correction-54d63c107316"
              - "canonical-full-clean-checkout-prerequisite"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-lineage.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
            expected_outputs:
              - "final-correction-ec8e8e56f09c-evidence"
            id: "final-correction-ec8e8e56f09c"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:56e23e157cfbabbbdc259a1f97d421174cb23363ee59347f2983cf07e8b4d734"
              id: "final-correction-ec8e8e56f09c-evidence"
              kind: "report"
              plan_revision: 14
              repository_fingerprint: "sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "final-correction-ec8e8e56f09c"
          result_digest: "sha256:a337d3e564314a741813d275d69cb2748c1902608efd5a4ca2a98af8ef92d35c"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:9fcda5e4f9a564b1ca73a79458869249b3deed0170d32c152480c25ee3cf0850"
              - "sha256:0af1751a09c798d4a1685246b05946148ba8a5013bd60cae86e0ab7011c538c4"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:a61eb8d6ce6558430bc2af653aa1f10c06201cb51a7f85eafc84dce299e8ae0a"
              environment_digest: "sha256:b243a261a2b17871139808ad7165bdae1c3c0db6dcc07348cb7b67c53d886f4a"
              implementation_identity: "sha256:a337d3e564314a741813d275d69cb2748c1902608efd5a4ca2a98af8ef92d35c"
              toolchain_digest: "sha256:bb92198bd58f64625cfa6c3168844bda302f030d6fa90162ff54359bb841eb2b"
            observed_at: "2026-10-13T15:07:41.219Z"
            status: "PASSED"
        integrate-reviewed-nine-sources:
          attempt: 5
          claim_id: "sha256:f0cdf2a08a1fc5a6c8bc45893872301e939625a471e694cdbbac301b1f38c26f"
          definition:
            contract_digest: "sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f"
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
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-refresh.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
                - "packages/agentplane/src/runner/process-supervision/timeout-controller.ts"
                - "packages/agentplane/src/runner/process-supervision/run.ts"
                - "packages/agentplane/src/runner/process-supervision/process-tree.ts"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
                - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel-replan.test.ts"
            expected_outputs:
              - "nine-source-adoption-report"
            id: "integrate-reviewed-nine-sources"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 5
              digest: "sha256:1fbf4716b3687742bf7a33d097c121c7196f17d25157504957e843b8bda55dfa"
              id: "nine-source-adoption-report"
              kind: "report"
              plan_revision: 4
              repository_fingerprint: "sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
              task_id: "202610120014-1C3ZFG"
              work_item_id: "integrate-reviewed-nine-sources"
          result_digest: "sha256:986efb3ef62ab424d3f78ada8d709015d0f9773a462c404432edf3ec8e257dec"
          revision: 28
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d02cc06a56b56579a24334fe6395746846e62b97f1582663d8ae5ccfd9ad29c8"
              - "sha256:01a152d9e53e89f1a7387ce020197bb96c1c0306363117b95404f1b5e9408f78"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:249871c812cad6ce44e5d28f6bc3fa2ceae4feeff85c3576a9f6d1d48a94c564"
              environment_digest: "sha256:112a4f7ea7e92a125b9e1a578c12255a3fd882882167b875401ce0f0adf1d595"
              implementation_identity: "sha256:986efb3ef62ab424d3f78ada8d709015d0f9773a462c404432edf3ec8e257dec"
              toolchain_digest: "sha256:de7caaff5fc64387bfaf5ff732723614a21ac38ba04d851a26a4f3486739fc5b"
            observed_at: "2026-10-12T18:04:44.260Z"
            status: "PASSED"
    digest: "sha256:1aae14e7d32479bd82a68516470f99f209a9a3bb8d1f2017d2d6d22914985a99"
    documents:
      contracts:
        sha256:06d5154b59be5fe7886d81c9973e9b1476dafd57ee9758cfb7b44233bc32f589:
          acceptance_criteria:
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the four correctly routed mandatory commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After local native final checks pass, require separately native-authorized exact-SHA hosted publication, CI and canonical integration readback. The actual USER scope2 admission is retained, but compatibility/current-caller proof still needs fresh verification. Do not infer full AP/Factory0.4.0 acceptance from this eleven-path integration."
            - "Integrate the combined canonical-to-qualified recovery-evidence2 delta, not merely donor2df parent delta: authenticate saved stop command/result/event/receipt before target selection; keep exact current-Plan and admitted prospective-scope behavior; accept native-authenticated target stops across genuine consecutive approved Plan history only when complete target definition is unchanged throughout. Reject tampered/missing/duplicate approvals or receipts, altered then restored targets, stale task/repo/claim/attempt/contracts and unauthenticated unrelated evidence."
            - "Use the canonical-to-qualified patch5ea37c9366fa832b29742e536c20f81cb5b052617038cb2129667c72ea2914ac only after current two canonical preimages and unique contexts match. Preserve current canonical retainedIssuanceAuthority and all unrelated kernel-rework-lineage behavior. Do not copy a donor checkout or import a third lineage source. Test actual canonical kernel-recovery-evidence and kernel-rework-lineage callers plus the mandatory full regression."
            - "Use current root registered bun run typecheck for explicit Plan2 verification. It executes scripts/checks/run-typescript-build.mjs with the root project graph. This intentionally replaces Plan1 legacy bun run --filter=agentplane typecheck; preserve the old literal and all its historical receipts in Plan1. Keep both original test commands unchanged and add the actual recovery/lineage suite. Do not treat historical legacy remap as fresh canonical type proof."
            - "Preserve original Plan1, BLOCKED attempt1 claim8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b, received bef187 result and authenticated request66ca/USERgrant9c0b history. Let native reconciliation apply the changed definition: PLANNED/current claimnull with old attempt1 retained, then obtain a fresh issued EXEC/claim before source edits. No manual state reset, receipt rewrite, old result replay or status fabrication."
          objective: "Integrate exactly eleven reviewed canonical deltas onto d886917970bc0724b419074b7d575d47d9c95c1b. Preserve current hook readiness/taskIds and every unselected canonical file. Source9 accepted XTX767e460334dd0f3739bea997265c141d85d5ad74/M293438ee27f258e8a13c3e55207e917d465c14462/S899eb5f28ef4d5d24268bb3a1e2525a41be14732b and combined recovery2 donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da require narrow patch application with verified current preimages. Use existing frozen reports /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json and /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/7GA2-compatibility-addendum.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts=2f3957f3a50eb94886d1ace054f0c2be6cfe18732e2063259fda4f06d0e08ba9; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts=172a8c78db090147d4eb1097d57e5bd1da5a215040f1ef53fab262bf9015971b; packages/agentplane/src/runner/process-supervision/timeout-controller.ts=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114; packages/agentplane/src/commands/task/kernel-recovery-evidence.ts=3c64a6385a1149bc1d4b216c33c7a428689fe2b6658bebbc9d6c1b0112a0b4bf; packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts=2338be34b330280923a5728543b18ddb222ee4667f5231b3053fb3b0b36cf673. Stop before implementation-result intake for distinct source review; output only the actual source adoption proof, not future native/EVAL/provider receipts."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:10516f3971aa2aafe6cd7dba29bb4f7d2611c6f6078c6de042dd63fc19093502:
          acceptance_criteria:
            - "Both existing test files <=1000 lines; canonical hotspots:check passes without baseline/policy changes."
            - "Keep mixed approved/rejected/superseded provenance, exact receipt/event/actor/fingerprint/currenttarget/claim failclosed assertions, concurrent-WI selectors and realScopeRequest lifecycle. Nearest two existing files and original four mandatory commands pass."
            - "Only two admitted test paths change; other18 source pins and old3completed/nativeFAIL+STOP history remain. Formatter/lint/types complete; original fullCI/hosted obligations remain mandatory."
          objective: "Correct genuine native docs-schema oversized-test baseline failure under run034/children/run002 on source8361. Reduce duplicated fixture/test expansion in exactly these two existing files to <=1000 lines each, retaining all authentication invariants, meaningful positive/negative assertions and genuine public lifecycle coverage. Reuse nearest existing fixtures and parameterization. No new testing infrastructure/module, no baseline/policy waiver, no production behavior change. Preserve three completed WorkItems and all source/evidence/history; additive corrective work, not replacement or false failed-final grading."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:128748307635320a795e1f3361b14b80175834307631dc650e041e70753caf77:
          acceptance_criteria:
            - "Before any implementation, report the missing two required recovery-evidence paths through the genuine fresh EXEC typed blocked scope_request. Request only kernel-recovery-evidence.ts and its existing test file under packages/agentplane/src/commands/task; keep external effects empty. Do not write code or mark this work item complete before native request approval and an admitted replacement Plan. Keep this initial Plan within all nine intake scope roots."
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the three correctly routed mandatory focused commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After current local final checks pass, require separate native-authorized exact-SHA hosted publication, CI and canonical integration readback. No source task grant permits those effects. The new 7GA recovery-evidence two-path delivery remains an open compatibility and genuine scope-admission gate. Nine-path success is not complete AP/Factory0.4.0 release acceptance."
            - "The subsequent eleven-root Plan must preserve all existing nine target pins and mandatory commands/full CI. It must state the combined earlier qualified recovery semantics and 7GA unchanged-approved-history behavior from donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da relative to canonical d886, not only donor-parent delta. Preserve current canonical retainedIssuanceAuthority and unrelated lineage behavior. Require fresh kernel-recovery-evidence and kernel-rework-lineage tests on actual current callers, then integrated native ci:local:full. Do not import a third lineage source or claim pending 7GA EVAL completed."
          objective: "FIRST, before any source or dependency change, inspect the required current canonical recovery-evidence integration prerequisites. The accepted nine-source integration now requires two additional files: packages/agentplane/src/commands/task/kernel-recovery-evidence.ts, packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts. They are outside this Plan and current trusted nine-root ceiling. Return an honest typed BLOCKED scope_request for precisely these two paths with no new external effects, using the actual fresh EXEC binding and native request schema. Do not fabricate a request, edit outside scope, adopt nine source files first, or claim completion. Let the native controller emit an authentic request and its USER approval route. Only a later genuine approved replacement Plan and fresh EXEC may integrate all eleven paths. Preserve these downstream nine-source requirements: Integrate only accepted XTX3 commit767e460334dd0f3739bea997265c141d85d5ad74, M2 commit93438ee27f258e8a13c3e55207e917d465c14462 and S8runner4 commit99eb5f28ef4d5d24268bb3a1e2525a41be14732b into canonical d886917970bc0724b419074b7d575d47d9c95c1b using reviewed patch df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef. Source provenance report is /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts targetSHA256=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts targetSHA256=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts targetSHA256=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts targetSHA256=2f3957f3a50eb94886d1ace054f0c2be6cfe18732e2063259fda4f06d0e08ba9; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts targetSHA256=172a8c78db090147d4eb1097d57e5bd1da5a215040f1ef53fab262bf9015971b; packages/agentplane/src/runner/process-supervision/timeout-controller.ts targetSHA256=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts targetSHA256=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts targetSHA256=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts targetSHA256=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114"
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run --filter=agentplane typecheck"
        sha256:5c6567ecbd1f513ca8041f90ad4068c8a7614b61b7804dec5a43fe31bf08bb4f:
          acceptance_criteria:
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the four correctly routed mandatory commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After local native final checks pass, require separately native-authorized exact-SHA hosted publication, CI and canonical integration readback. The actual USER scope2 admission is retained, but compatibility/current-caller proof still needs fresh verification. Do not infer full AP/Factory0.4.0 acceptance from this eleven-path integration."
            - "Integrate the combined canonical-to-qualified recovery-evidence2 delta, not merely donor2df parent delta: authenticate saved stop command/result/event/receipt before target selection; keep exact current-Plan and admitted prospective-scope behavior; accept native-authenticated target stops across genuine consecutive approved Plan history only when complete target definition is unchanged throughout. Reject tampered/missing/duplicate approvals or receipts, altered then restored targets, stale task/repo/claim/attempt/contracts and unauthenticated unrelated evidence."
            - "Use the canonical-to-qualified patch5ea37c9366fa832b29742e536c20f81cb5b052617038cb2129667c72ea2914ac only after current two canonical preimages and unique contexts match. Preserve current canonical retainedIssuanceAuthority and all unrelated kernel-rework-lineage behavior. Do not copy a donor checkout or import a third lineage source. Test actual canonical kernel-recovery-evidence and kernel-rework-lineage callers plus the mandatory full regression."
            - "Use current root registered bun run typecheck for explicit Plan2 verification. It executes scripts/checks/run-typescript-build.mjs with the root project graph. This intentionally replaces Plan1 legacy bun run --filter=agentplane typecheck; preserve the old literal and all its historical receipts in Plan1. Keep both original test commands unchanged and add the actual recovery/lineage suite. Do not treat historical legacy remap as fresh canonical type proof."
            - "Preserve original Plan1, BLOCKED attempt1 claim8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b, received bef187 result and authenticated request66ca/USERgrant9c0b history. Let native reconciliation apply the changed definition: PLANNED/current claimnull with old attempt1 retained, then obtain a fresh issued EXEC/claim before source edits. No manual state reset, receipt rewrite, old result replay or status fabrication."
            - "Integrate only the selected canonical-core retained-work prerequisite from existing C6 source. Authenticate native scope-request receipts before preserving unchanged blocked/completed runtimes; reset only changed unfinished definitions; reject missing or tampered grants, removal of started work and pending effects. Preserve historical stop and approval evidence. Never inject fake retained state in fixtures. Exact selected pins: [{\"path\":\"packages/core/src/tasks/task-kernel/kernel.ts\",\"preimage_sha256\":\"130ceed7723c22a57e541eb0670261f1025d63da5cea654f919574d4c9f35b6e\",\"postimage_sha256\":\"1940760a3f348445988ef142e0685f715131f4580af9ff4c21a6a77e3f964871\",\"postimage_bytes\":59136,\"mode\":\"100644\"},{\"path\":\"packages/core/src/tasks/task-kernel/replan-work-items.ts\",\"preimage_sha256\":null,\"postimage_sha256\":\"1144c6b17acd7a24f49e7e779d99809f31a6c193fa3a8a0ae478862d8aa1ceb7\",\"postimage_bytes\":6795,\"mode\":\"100644\"},{\"path\":\"packages/core/src/tasks/task-kernel/replan-work-items.test.ts\",\"preimage_sha256\":null,\"postimage_sha256\":\"6ff774a9efceb744e6a2baf03dceafbdf1107eba53989466bcdbb139b7f16908\",\"postimage_bytes\":8410,\"mode\":\"100644\"},{\"path\":\"packages/core/src/tasks/task-kernel/kernel-replan.test.ts\",\"preimage_sha256\":\"90b20f1ab99b701c924e7bee7890a7a16eff8afdae8248b7bde47af23f4ae850\",\"postimage_sha256\":\"2cc2fa8a92ea5b15887ce53b806db9db2872688f7a8404d866977266869324a5\",\"postimage_bytes\":13586,\"mode\":\"100644\"}]"
          objective: "Prerequisite correction: preserve accepted eleven-source commit32302c24113bfc2e4bff6f7861eca3c2ced90c8e and all native history. After genuine scope grant and fresh EXEC, apply only the selected four-path authenticated retained-work replanning patch source11-core-prerequisite-selected-PROPOSED.patch (SHA256 5e166881eec17c3ec96e32b2cadb97698693b893f2399b7c7b452ed146a988e9). Require exact canonical preimages/postimages and exclude unrelated completion restoration. Existing eleven targets, mandatory requirements and verification commands follow unchanged. Current normative frozen AP9 preflight/patch for this refined contract is /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/reviewed-publication-correction2-proposed-freeze.v2.json (raw SHA256 fd92f2cb0a558abdd38c3fce4297129083db93d0dbd84aa70c486f325f742497) and its exact referenced patch SHA256 673684b58ff96fe5c078f50f447d07e4948b471f9772daa74ae6bc2850bc2dca. The two corrected postimages are proposed in-memory, not applied or tested; obtain fresh source execution and all existing native gates. This freeze supersedes ONLY the open.ts and existing pr-open validation test target pins from Plan2; the other nine targets/preimages/modes, all twelve mandatory acceptance criteria and all four verification commands remain unchanged. Original adoption hash verification is historical evidence, not a claim that its two faulty final targets satisfy the refined contract. Integrate exactly eleven reviewed canonical deltas onto d886917970bc0724b419074b7d575d47d9c95c1b. Preserve current hook readiness/taskIds and every unselected canonical file. Source9 accepted XTX767e460334dd0f3739bea997265c141d85d5ad74/M293438ee27f258e8a13c3e55207e917d465c14462/S899eb5f28ef4d5d24268bb3a1e2525a41be14732b and combined recovery2 donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da require narrow patch application with verified current preimages. Historical original adoption references (retained unchanged; superseded only for the two publication target pins below): /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json and /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/7GA2-compatibility-addendum.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts=3f7f41126f26d43acfbdeaa0bc233ea3b9a1c81b6d139a917191c6ea412dce00; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts=53f84c9e9d2b7a574015b8b52033b537e2bae41f37d541a01d183c5f22832378; packages/agentplane/src/runner/process-supervision/timeout-controller.ts=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114; packages/agentplane/src/commands/task/kernel-recovery-evidence.ts=3c64a6385a1149bc1d4b216c33c7a428689fe2b6658bebbc9d6c1b0112a0b4bf; packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts=2338be34b330280923a5728543b18ddb222ee4667f5231b3053fb3b0b36cf673. Stop before implementation-result intake for distinct source review; output only the actual source adoption proof, not future native/EVAL/provider receipts."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:698b668a6eb02899f287fa77d4ca10fc90285d4ac9d9589555777472858f8b4a:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/dba35701b30cae372aa916fbe4c9791a6a1bbbebc96fe88e57c46a68ae121957/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:8726e673df43e4bfa54a282ff6a72a3018e74fea7e89481c322717d08b0d64e9:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:577aba1eacec9828a31c5f4e68bd3aedcf3d283ae796bf4648c80e5d1c458b4a. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/4a688de5e2528964a242ee1a2e57c08882285a42fdbfa6e182f8c82b0335bc2a/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
        sha256:a3adf7ad91213de3c5be42dbba9f224fe5f5cbe52a3d4eccf6e96508adc4c823:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:54d63c1073166df60929a4fe5e37185b8290f745249fe41e15a17f44f5434fe0. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/2ec744b5f38c4c6a961e308359a48283e6d0ac83e1f63cfd60d56360723261a9/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:c2e9de51841e0be8bc93e6e09fc7cc63f5df4432797af1277380b8fb8166fdf5:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/1bdea0ef3dc8dcdef774f8e98e2d25cae0450f369521828d38feffe7c107ded9/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
        sha256:d74afec43512e20a637ee0a1693083f0def81dd1bf101256cdeeed5d02ab32c9:
          acceptance_criteria:
            - "The existing ci:local:full parsed script selects the same isolated committed-HEAD verification checkout as qualification gates; original dirty tracked/untracked files and staged index remain intact."
            - "Nearest existing qualification tests prove committed HEAD identity and clean checkout, original-file/index preservation, successful and dependency-setup-failure cleanup, and unchanged native full default9000000ms plus explicit deadline handling. No new infrastructure or production authority bypass."
            - "Only the two requested existing paths may change after actual native USER scope admission/fresh EXEC; current22 source, old5 completed outputs/history and original fullCI/hosted obligations remain."
          objective: "Diagnose and correct the existing canonical ci:local:full verification checkout selection using the existing detached committed-HEAD worktree, dependency aliases and cleanup primitive. Preserve original QAN historical reports, staged metadata, criteria and all prior completed evidence. Before edits, request genuine scope admission for exactly direct-task-verification.ts and direct-task-verification.qualification.test.ts; both are outside the current intake ceiling. No immutable C7 edits, new harness, ignore/stash/reset, dependency install or timeout weakening."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
            - "bun run typecheck"
        sha256:eea8dcf3e830d0284789d3c0e022a446e2b7ced4259d8732e393e148197f49bb:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:ec8e8e56f09c5645861e7eb5e5bc20c58cfd5954a0940ee336bdc8d523f97a74. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610120014-1C3ZFG/59990891bfc04b4db934b2998ae3aa2e679a8f9a044b1333d7e573265164bb25/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
        sha256:fee731108c11b8502e73e6e8e6199ade2ca89c30530dc77713815f67dbdbea1e:
          acceptance_criteria:
            - "Adopt exactly the nine selected deltas and target hashes from the frozen AP9 preflight/patch. Recheck all nine canonical preimages. Stop on changed base, changed source pin or nonunique hunk. Use narrow selected XTX hunks where donor and canonical preimages differ; no whole donor checkout copy."
            - "Preserve canonical assertHookRunnerReady import/call, ensureReconciledBeforeMutation taskIds:[opts.taskId] and its test assertion. Preserve every unrelated current canonical path, provider-base guard and historical Task/quality/PR evidence."
            - "Keep selected-commit requireClean false limited to the reviewed scoped caller. Keep default strict cleanliness. Keep pre-push provider-base validation and late race check. Do not publish a component branch based on obsolete main."
            - "Preserve S8 exact failed SIGKILL provenance, committed timeout, successful TERM, actual owned child close and exact negative owned-group probe ESRCH within the existing shared1000ms budget. Preserve TERM/live/unknown/artifact/control errors,120/1000/0 fixture policy and escalation assertions. Do not infer the historical failed PID cause."
            - "Return one source adoption report with donor commits, canonical preimages, selected hunk and target hashes/modes, actual diff and current EXEC binding. Stop before result consumption for ROOT and distinct source review. Do not include future controller/EVAL/provider receipts as implementation outputs."
            - "Run the four correctly routed mandatory commands through native verification after admitted source output. Historical component passes do not count as integrated checks. A genuine independent EVAL and mandatory native npm run ci:local:full are required before delivery. Preserve every historical failed final receipt."
            - "Use only own isolated dependency aliases/store with declared frozen locks. No shared root install or source/lock changes. Serialize all heavy checks with ROOT. Before the final full command, read its actual native deadline and use an outer bound above it (9000s native/9600s outer currently), with reviewed storage cap/free floor and owned-process cleanup."
            - "After local native final checks pass, require separately native-authorized exact-SHA hosted publication, CI and canonical integration readback. The actual USER scope2 admission is retained, but compatibility/current-caller proof still needs fresh verification. Do not infer full AP/Factory0.4.0 acceptance from this eleven-path integration."
            - "Integrate the combined canonical-to-qualified recovery-evidence2 delta, not merely donor2df parent delta: authenticate saved stop command/result/event/receipt before target selection; keep exact current-Plan and admitted prospective-scope behavior; accept native-authenticated target stops across genuine consecutive approved Plan history only when complete target definition is unchanged throughout. Reject tampered/missing/duplicate approvals or receipts, altered then restored targets, stale task/repo/claim/attempt/contracts and unauthenticated unrelated evidence."
            - "Use the canonical-to-qualified patch5ea37c9366fa832b29742e536c20f81cb5b052617038cb2129667c72ea2914ac only after current two canonical preimages and unique contexts match. Preserve current canonical retainedIssuanceAuthority and all unrelated kernel-rework-lineage behavior. Do not copy a donor checkout or import a third lineage source. Test actual canonical kernel-recovery-evidence and kernel-rework-lineage callers plus the mandatory full regression."
            - "Use current root registered bun run typecheck for explicit Plan2 verification. It executes scripts/checks/run-typescript-build.mjs with the root project graph. This intentionally replaces Plan1 legacy bun run --filter=agentplane typecheck; preserve the old literal and all its historical receipts in Plan1. Keep both original test commands unchanged and add the actual recovery/lineage suite. Do not treat historical legacy remap as fresh canonical type proof."
            - "Preserve original Plan1, BLOCKED attempt1 claim8f4cb3bc1842060456732d66542ce8dc7d071eefd9b312c77cbbcb1b838b951b, received bef187 result and authenticated request66ca/USERgrant9c0b history. Let native reconciliation apply the changed definition: PLANNED/current claimnull with old attempt1 retained, then obtain a fresh issued EXEC/claim before source edits. No manual state reset, receipt rewrite, old result replay or status fabrication."
          objective: "Current normative frozen AP9 preflight/patch for this refined contract is /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/reviewed-publication-correction2-proposed-freeze.v2.json (raw SHA256 fd92f2cb0a558abdd38c3fce4297129083db93d0dbd84aa70c486f325f742497) and its exact referenced patch SHA256 673684b58ff96fe5c078f50f447d07e4948b471f9772daa74ae6bc2850bc2dca. The two corrected postimages are proposed in-memory, not applied or tested; obtain fresh source execution and all existing native gates. This freeze supersedes ONLY the open.ts and existing pr-open validation test target pins from Plan2; the other nine targets/preimages/modes, all twelve mandatory acceptance criteria and all four verification commands remain unchanged. Original adoption hash verification is historical evidence, not a claim that its two faulty final targets satisfy the refined contract. Integrate exactly eleven reviewed canonical deltas onto d886917970bc0724b419074b7d575d47d9c95c1b. Preserve current hook readiness/taskIds and every unselected canonical file. Source9 accepted XTX767e460334dd0f3739bea997265c141d85d5ad74/M293438ee27f258e8a13c3e55207e917d465c14462/S899eb5f28ef4d5d24268bb3a1e2525a41be14732b and combined recovery2 donor2df89005f2097cb76fbb8f1f9b3cfe5417c7b4da require narrow patch application with verified current preimages. Historical original adoption references (retained unchanged; superseded only for the two publication target pins below): /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/preflight-plan-v2.json and /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/AP9-canonical-d886-integration-readonly-20261012-v1/7GA2-compatibility-addendum.json. Target pins: packages/agentplane/src/commands/guard/impl/commit.ts=78dad780782ee6e103192796142a0ca0c41b8744d09fe6e65d9db2c95c2c0aad; packages/agentplane/src/commands/guard/impl/commit-refresh.ts=f1b6786770bd25077d854786062351164dc02563699bef77975c308add098c9d; packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts=ed2fd2628ecbb4faa18e4e703007b318284848de6513e0b0c1bfd2f507b177ea; packages/agentplane/src/commands/pr/open.ts=3f7f41126f26d43acfbdeaa0bc233ea3b9a1c81b6d139a917191c6ea412dce00; packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts=53f84c9e9d2b7a574015b8b52033b537e2bae41f37d541a01d183c5f22832378; packages/agentplane/src/runner/process-supervision/timeout-controller.ts=a4c68a029ac942b686ba4d8dcf64dfaf3b21d7a50d9002526d2cf8c3d2016623; packages/agentplane/src/runner/process-supervision/run.ts=4d4c59172391fa5dc6ffd51cb5a5a537a2a3cf3accfb32b7ea1439441031e49a; packages/agentplane/src/runner/process-supervision/process-tree.ts=4c09e212e300762db7e87b3bb396f8ce098c548f4071d6e256764acae3fc713b; packages/agentplane/src/runner/process-supervision.test.ts=803a67298fefb35f74b73ef25c806306a16c612635290052ad0ed43d3aea5114; packages/agentplane/src/commands/task/kernel-recovery-evidence.ts=3c64a6385a1149bc1d4b216c33c7a428689fe2b6658bebbc9d6c1b0112a0b4bf; packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts=2338be34b330280923a5728543b18ddb222ee4667f5231b3053fb3b0b36cf673. Stop before implementation-result intake for distinct source review; output only the actual source adoption proof, not future native/EVAL/provider receipts."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts"
            - "bun run typecheck"
            - "bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts"
      intent:
        context: "Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness."
        objective: "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main"
    events:
      -
        command_digest: "sha256:e65c42f6e12a2bc40436a043475b62760bdb86069baf58bf89ef40820d4aa372"
        id: "capture:202610120014-1C3ZFG:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610120014-1C3ZFG"
        occurred_at: "2026-10-12T00:14:19.697Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 1
      -
        command_digest: "sha256:952cdb3d83f6314434f794c1c9e75e49a07f1c347e2f9a369f64969768bfb6d4"
        id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:bd0b06fac0b6ea84d6ad844d081ebd71e81b72a68aa80f3bbb79e8265fc5a6ad"
        occurred_at: "2026-10-12T01:15:49.775Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 2
      -
        command_digest: "sha256:1b3d501550908aa1fb04c713a56340dcec200a85f7df3a70d5a6f80a67091b50"
        id: "sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8b51547bc9a69c151845459f78131f8584083a9a84fa17507d8731a9b56a170a"
        occurred_at: "2026-10-12T01:15:53.359Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610120014-1C3ZFG"
        task_revision: 3
      -
        command_digest: "sha256:e6f3141ad5b0173ceab73a702b5c1946f3f7e29aa9202ce9e23cbb6a6367e3eb"
        id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4a337599dbb1638a33afe04537fd0de05ee8c5f0434eb5a5a8d0113df977aa32:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T01:15:56.777Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 4
      -
        command_digest: "sha256:f8586dcbbd9eda77119c392b468bd933e85c94c327a6ed2c2e6fb4d198b101ce"
        id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6017458d71be66402b624d57d0e204037ad27087cfc3848462da927ee9ddf8f5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T01:16:01.279Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 5
      -
        command_digest: "sha256:09de1609ff9b6573ef6a9d5f264b2fbf6610c35dbc026c67edde92d034d2a6db"
        id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:55a1f880fd6c7fdd6d3f43af2c717bfd827bac06bbb8b98e5bc67ba0b75aefce:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T01:32:46.980Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610120014-1C3ZFG"
        task_revision: 6
      -
        command_digest: "sha256:3e7cd6c9cff8f299fa6234ab6182eae55725ff6e2ecf6f18adb621b773352cc7"
        id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:d364fd869e3f70c134d7f1e04bc3af05f81ba6b9f079626e9e650d1cf040d9e1"
        occurred_at: "2026-10-12T01:50:48.305Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 7
      -
        command_digest: "sha256:305e7853d27c1e50e870111ea916540be1996938f30160766bb4474de15ca4c0"
        id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:66ca5972760986bf5f956ac9294208d6fbdec10253a8b3908d4c6955881a82ff"
        occurred_at: "2026-10-12T01:58:52.756Z"
        payload_digest: "sha256:6d4864c6e4d0c5594bd4a31a49dfe348c20c67cd0af684ed6be79b7296cf62d9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 8
      -
        command_digest: "sha256:bd2b5074cf41c47c10b435a5ff961f3c64faff40c5266fdcd402e7ea4a15db4e"
        id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:37cb73e25926ea19f8a3332e53432dde40b766c6967d0c45f206c42b1494d4fe"
        occurred_at: "2026-10-12T06:57:48.215Z"
        payload_digest: "sha256:f80912d878ce58d21ba34768e330f6973abfbf9bf6a3eda182ae6d678dbee5c4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 9
      -
        command_digest: "sha256:39b6d944e8e1cf557573f112f45cecb626891bf92e2bceb471740775d8690385"
        id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d7a217403368cc0dc5f8001552ca242d2c9d28e7993cdd267423fefcd2524e37"
        occurred_at: "2026-10-12T06:57:50.727Z"
        payload_digest: "sha256:f0ae1b10cd0c3234aabbd723e45e4261948525d979de764450f482c176e17b05"
        task_id: "202610120014-1C3ZFG"
        task_revision: 10
      -
        command_digest: "sha256:7d992a86e371c839df36b3b4d67bdf446346682339d27ca6e43693cce63cd4cf"
        id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:77280ec1e42a363da31ecad9c68560dae5f77efb40cb2642986f87ddf157a94f:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T06:57:54.137Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610120014-1C3ZFG"
        task_revision: 11
      -
        command_digest: "sha256:eed8ea15fecd5132089edd890cdb6ac133fa6f5737fa19017c8d7d8450b3bade"
        id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a5855e69c07c5f2af7c27828de08f4ba29c5184c1f2a53985992a2d6d63117d7:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-12T06:57:56.729Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 12
      -
        command_digest: "sha256:8b1a46410805bddff1cb4cc2c9e834a994d13cbd3980f44d3eb6568daab0c546"
        id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1d7f87efaf6da12038c4c25fbac465a45995d06ed17f60fc2b4b81e60e551cac"
        occurred_at: "2026-10-12T08:20:13.715Z"
        payload_digest: "sha256:5ddca350e3d922e32801a968518ee6b89afaf32271d2c1266857b9fa8c5d8c8d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 13
      -
        command_digest: "sha256:ca6efe6cc0ab8e4a42e8a4e0eeb2ca2a2ffabff976500cd9d35514e4aed891e3"
        id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:19c965d508a22ff82f1319d9d2b6ebde15af7fabe45babc62f29bd600ba1e71c"
        occurred_at: "2026-10-12T08:20:15.805Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610120014-1C3ZFG"
        task_revision: 14
      -
        command_digest: "sha256:d72fae62d33f32f17bbf52d5cc7a726df271423cd196d5d323a2cfcb4e922529"
        id: "amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:47b98b7c61c63b94817c885ef29ed6d266c844369c8ffa145794b243e8a50d1a"
        occurred_at: "2026-10-12T08:20:20.854Z"
        payload_digest: "sha256:36be904ca7a7b0203be7b7ae9baf0f6b429970e74f83ac756501ba6bd5218510"
        task_id: "202610120014-1C3ZFG"
        task_revision: 15
      -
        command_digest: "sha256:99d5b9c5c5aa2db6629231b004cae00762b5285091ba4a10a5975359f3ec1773"
        id: "sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:90b0733be344ac7af2f2b8044701a6e10d34c377e4f796d01a797a597031ce67"
        occurred_at: "2026-10-12T08:20:22.345Z"
        payload_digest: "sha256:78dd6ac649c565c35490aeb70160706aa88aa733ec122055c0a70e463bd68bc9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 16
      -
        command_digest: "sha256:d460efc3a38a416813fa540aa18ed5c528b7f44aec584e9add0f7b71444a570f"
        id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f86521b2c97cabea0a210d8176495aa9a34d4576fdf1a0460e1c47e1866706f5:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        occurred_at: "2026-10-12T08:59:10.895Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610120014-1C3ZFG"
        task_revision: 17
      -
        command_digest: "sha256:dcaa9209d35bde8ce88f3c2061eb2d661819946318b74830a2e06bd0c63384a1"
        id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ea015a8f0681be5eb52f78c1fdde802cbea6a2587ee3277cf573c408280d41f7:sha256:947c0d20cc3bef237ea3f8388dd155ab441a18a1d9db6984a6d7d31911b1389b"
        occurred_at: "2026-10-12T08:59:13.082Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 18
      -
        command_digest: "sha256:741226c92ac9925e2a5d4aa25f036a6bb10ab43889298bff52c487012adf6f35"
        id: "sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:23b4eea27d3430dacec41c22d594ab7f0403a8be4fcb845a15cac248a675cbe6"
        occurred_at: "2026-10-12T15:29:28.156Z"
        payload_digest: "sha256:1223dab77db4a4ff6e2209fcb4238433d8fa95a7c34d0ffd01b6eba93b722354"
        task_id: "202610120014-1C3ZFG"
        task_revision: 19
      -
        command_digest: "sha256:93134fb7744d2fee4ab4db31daa4fe8d59548ea30c25505e75dff4ea5439df1e"
        id: "result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        occurred_at: "2026-10-12T15:29:34.212Z"
        payload_digest: "sha256:f294013879eb217102bc0fab0f1e7a244e1201c6c32880d918fa6d1433411da7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 20
      -
        command_digest: "sha256:8c9f1d3ae662b6b2af626fcc5290ac533fd32c21eaac3cf5e48c8f64e96acac6"
        id: "kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f85f777763901207f9a6af09f64fb84e4bde97e6ff25113fe722b0c0ef6a8436:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T15:29:38.859Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 21
      -
        command_digest: "sha256:5e221507be75cee3754ee78506adb637c90840c1a25e751bb4a10643a6114a74"
        id: "validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:08cf82fed512b4c39014fcd40847fa2df58251e0ad4e8ec4e8629f5dae2add65"
        occurred_at: "2026-10-12T15:30:43.491Z"
        payload_digest: "sha256:08536a509deeac3624c331473c2ac63c8c443337a83d4affeb97a578108721c6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 22
      -
        command_digest: "sha256:f3fe1dc72d0e7ea514a8f965053924e5810fed0b7653feda6c4d54ff12568b4a"
        id: "validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8db1316406e72547b76e9cb07e6ae601ea36132c0d45fd5e99cf11600a9b7c4a"
        occurred_at: "2026-10-12T15:30:46.767Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 23
      -
        command_digest: "sha256:449080242560682004edd6ae9bfa49efa730a4272ee1f14f4ab07cfbba18331e"
        id: "kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:5aaeeaba7df5f77ff837c8a8ad8d7a541a1ecc81d898e32f61bfdc403ad206b8:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T15:30:52.797Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202610120014-1C3ZFG"
        task_revision: 24
      -
        command_digest: "sha256:e990acdcd312088c023474e79037ebbc4c601ab8cd9560fd9d89add29c89d22c"
        id: "kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c48a1d69ba84459d8bea873937273923716b49edb220fc888a18af7650388d4e:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T15:30:58.120Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610120014-1C3ZFG"
        task_revision: 25
      -
        command_digest: "sha256:4bd8c85958721881899129ded4c2dac0f6e4dcd8dade37aae643b7f0383c7baf"
        id: "semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:1cd685e18245fe18a6b75e66f91438585f5d907be67aebf0fe4f473c60f8a09e"
        occurred_at: "2026-10-12T15:46:27.627Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 26
      -
        command_digest: "sha256:e14767721e3fd4ca6544d6cf02a1774d969b01e71047adcecb3c6bc035436f20"
        id: "scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:6f1d243509d5f2d3a38916911fc3d2f00018540ed2e0bff42e18ba86b0ff69d8"
        occurred_at: "2026-10-12T15:55:35.346Z"
        payload_digest: "sha256:10a5fac7a4609b5a9a0f38b2c977bf8bd7cb0dab0bbdcec02582c141843ead42"
        task_id: "202610120014-1C3ZFG"
        task_revision: 27
      -
        command_digest: "sha256:230cc3f20d2aaadf30f0d93c8e56e2bc2457f7f88b1542c42651ab1a3b3dbab3"
        id: "plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:4d2e8be25f8a6cf1aedb04b4c38d88834c29c26a2efee42f5e1143922f7e4f18"
        occurred_at: "2026-10-12T16:21:43.918Z"
        payload_digest: "sha256:abb509d7cac4387e94d375f5d441d48393830df3ebeba29149ddc9596c5a00e3"
        task_id: "202610120014-1C3ZFG"
        task_revision: 28
      -
        command_digest: "sha256:96432550502c9feebe327c8d5ea60ef17ed19b481d320520387a2f02642c1a83"
        id: "sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:28262e1557eaa45f0463ce4e2565fdc8b6858eca6a3876fe26e4c08385572144"
        occurred_at: "2026-10-12T16:21:59.490Z"
        payload_digest: "sha256:6c919ca94c72d1ed2bed44df0f7b3dd208c9d70f6d41f76f5cd115be81328ada"
        task_id: "202610120014-1C3ZFG"
        task_revision: 29
      -
        command_digest: "sha256:d97aa1acba58707ac413a8c5aa470d6cfef0f2f9fe682f137b57dbde55c86ca7"
        id: "kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:132e074c22cff8d3c87f8c31a94822d9c03fcea96e3a2d352b3942059409bb4b:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T16:22:10.106Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 30
      -
        command_digest: "sha256:d5eab8bb4f02d0084c4f49b1622a78e704298f211072e3907c7927a34ffdb13c"
        id: "kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:57d42e6d2d7a52f17fc3fd97035d0ca4b8540b0dabfee9594f6389f76fae77ca:sha256:a70c576cf61413563caa5e2707abc1b76a24beef5fbecaf4c287ec820a719beb"
        occurred_at: "2026-10-12T16:22:18.139Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202610120014-1C3ZFG"
        task_revision: 31
      -
        command_digest: "sha256:c28c053ad02ee0d0d4ff8c84b3d3f16450f751a04c145702ab3677ec220db38b"
        id: "sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2c2be190896a2ba4fb192e71bae071676fdfb1cf637976ceeaceb16db20d1256"
        occurred_at: "2026-10-12T17:15:36.065Z"
        payload_digest: "sha256:6b0f9b979513ff748ce5c95191c6a22e38213e59f0f8c1b26ecc8051ae00244f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 32
      -
        command_digest: "sha256:106e5bb727f0b66cdd0b920e5e67284fe4c1df859192f0d6170ed9a4c7fff2dd"
        id: "result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:eb71c6ee25e66f46d18d63f9f1b67c7d4d30321ca4bf56ce76a894538ca09bca"
        occurred_at: "2026-10-12T17:15:38.768Z"
        payload_digest: "sha256:4e6ec474019f9f32fede48c2482516e9f75081f1db21ed0ffa7571504c3beefb"
        task_id: "202610120014-1C3ZFG"
        task_revision: 33
      -
        command_digest: "sha256:a4a0ff167233d2173004bdcbcad3829fd861c5f7a74da989aa8a10091017840d"
        id: "kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:6de81442a3a92a440aade474ab81b3f6d9030808a5c857de21c52142fb5bea28:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        occurred_at: "2026-10-12T17:15:40.879Z"
        payload_digest: "sha256:2c8825f2df1e5d586f549f034a6d8d55cf0206c93a79a641b229b209ac66991e"
        task_id: "202610120014-1C3ZFG"
        task_revision: 34
      -
        command_digest: "sha256:c242e284bcd7d0cadd0a84033dd81133c6623dad12b7823342ecc3349c640547"
        id: "validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f1ddee7bb4e046cb446ad0ac13d1cc7bb7a72237c6a2c515276cb408a3fee6bf"
        occurred_at: "2026-10-12T18:04:46.514Z"
        payload_digest: "sha256:f32cb43ac4dc4e8451aa0a1807099f16fb062a8b8f0c027384e9fd99102cfad4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 35
      -
        command_digest: "sha256:ea2246ebf0b05fe728aebf3d5eee0bbc0719c2f76a8cc8c86f94f9ebd76ec5b0"
        id: "validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ffdd9178029756a507adc3d9043d89fb3800fe79afa032901863d50e39af227a"
        occurred_at: "2026-10-12T18:04:47.924Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 36
      -
        command_digest: "sha256:49ba5ee6c487533388c0ff75667edf2d9ae5c3ceba07f40095f74b72f5b20064"
        id: "final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:12acd7c9fe60ad5c6e0528ea7f7ae33497c325e68a3350ad9e84379c1f551f12:36"
        occurred_at: "2026-10-12T18:08:52.387Z"
        payload_digest: "sha256:92a4fab225c857dfcce5484cce459df722f79ef35103384e34d0cf6a014be1b7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 37
      -
        command_digest: "sha256:caf1f5214eb39986751da09a7d8ae67a4d30b1dc779858746e79f3bb9339fb47"
        id: "amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:85025e3a4f8dde5ae4584e306af37afa3aa03de28830f50998c8946f638ff38e"
        occurred_at: "2026-10-12T18:29:03.619Z"
        payload_digest: "sha256:fd0e8ab1aa350c81694a5e5ac8711b0d960ce32f70ffa2beffa41224cd31f6c4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 38
      -
        command_digest: "sha256:a23fbe5e508fa1d2f8df461f589440d4f3aea293a93d47ddb2b3df58efb9e001"
        id: "sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:78685e806c20ca1e7dc587d733bcfe8a181ebeeae7d90fa40fd0ef78a839952e"
        occurred_at: "2026-10-12T18:29:05.037Z"
        payload_digest: "sha256:ccfc3d6a41a895c4897d0031547f1cc8c36461950f21965445727e4fc380ad09"
        task_id: "202610120014-1C3ZFG"
        task_revision: 39
      -
        command_digest: "sha256:1f30d66cf3598a56573830b09444d0df290b24fda4c972e1f24de053b506e695"
        id: "kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a494ae5f25a88cf5a014956094536da834a602d96aca9967b99e57db8fcc1224:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        occurred_at: "2026-10-12T18:29:13.119Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202610120014-1C3ZFG"
        task_revision: 40
      -
        command_digest: "sha256:9852af0c74f4e84d1545ff8666fac3ed706ab05521944454abb10ad4b69d764c"
        id: "kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a2945d52476499d5d6cb8cf20f8eae53972b9adea2ae8541556413802727c2c4:sha256:ee1c37a92064e1e3bd983e4af3887530061dc9bfce2fcbeb404dc7026a398c98"
        occurred_at: "2026-10-12T18:29:15.530Z"
        payload_digest: "sha256:6d756eeb8cec9f82fc6087e919673e23c7375d61274786e32bffd6144934d617"
        task_id: "202610120014-1C3ZFG"
        task_revision: 41
      -
        command_digest: "sha256:b1a71b2fd321bbb90ad9f62d1d42783481425bf4718b120a05c0a290aef1a4c8"
        id: "sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a45a74e16e70da6c9385b35f7f99ea1886223b2a95df2153832e6b6893d81bdb"
        occurred_at: "2026-10-12T19:35:12.764Z"
        payload_digest: "sha256:bc22c1e4d22a7f545c38c3a7bb4c7f40467d501da3b54b80b0c1d9ef24a482a1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 42
      -
        command_digest: "sha256:d68d54e689cdedddd78a70ae665e6250815f48ec165e9c938a833644fabcc87d"
        id: "result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:acd48dedc9ded2c824e5fec36310bec32e867ed49c8ba78012228a010f2f28f8"
        occurred_at: "2026-10-12T19:35:15.516Z"
        payload_digest: "sha256:8591beb254a01de2f1ed038e1e6e45784c01c17f4ed6f6958695b3ac368ec430"
        task_id: "202610120014-1C3ZFG"
        task_revision: 43
      -
        command_digest: "sha256:36c5ec75dffd803c3836c0ad0f00a32e17ffd1bbcf1eec5a76317942209f92da"
        id: "kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:cb55ccd378d4dc2089bdda7038506ba35562240e431a421a2481a61e58e0ea48:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T19:35:17.696Z"
        payload_digest: "sha256:2b8db6629fc3661083d28fd293ac8310cb672336c3c50ee40666eb183bba0e78"
        task_id: "202610120014-1C3ZFG"
        task_revision: 44
      -
        command_digest: "sha256:55b93883d7a2b97089fb5e2bc6d38e411830f9b785ffb7bbed5dc4ffbed8bf4f"
        id: "validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e21cb493e2ec63f49e0e97fb33a713a266101e9e9093f9836564033f3d1717dc"
        occurred_at: "2026-10-12T19:51:18.778Z"
        payload_digest: "sha256:97a0c4555fec1019f1d07853abfb743833c95a2df4b9727a6cb5c1b6b102baef"
        task_id: "202610120014-1C3ZFG"
        task_revision: 45
      -
        command_digest: "sha256:d0b517ed66737dd17cc4533485158bcbe20756d66dcf45299eeb31f6f0089d97"
        id: "validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1c1a67905c2a366e4ad81d9c7186b7f745c60b8f83055049ff5419a671a7bebe"
        occurred_at: "2026-10-12T19:51:20.240Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 46
      -
        command_digest: "sha256:7833125078f252f8f5b8de69d4cc14f63ccdd6c713724ca53e27d6490cb58c56"
        id: "final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:cca82dcaef2143a430bd52f24c60c813f5d765974061169ca552a34217cd3631:46"
        occurred_at: "2026-10-12T20:08:09.464Z"
        payload_digest: "sha256:afa818f8a119a87ad3e3f94f5a70d1508d81877d531dd7ccf52723c446e1e3ea"
        task_id: "202610120014-1C3ZFG"
        task_revision: 47
      -
        command_digest: "sha256:4c1d32c162d28b154a9f80499d41e367ce89bd94ceadf75315959840521ed3cb"
        id: "amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:dd2b7918033a665342c7a4b15429b1cf408a9bac9450ac4e81ae4dcf76499215"
        occurred_at: "2026-10-12T20:20:00.717Z"
        payload_digest: "sha256:d9a8e2106d7eb33fcfcd59d8bb202efea6d34c0de02c29b5d917bb3593e29851"
        task_id: "202610120014-1C3ZFG"
        task_revision: 48
      -
        command_digest: "sha256:c20d235e9fc781e5991ec1d7be8019552162da7ee7808fff0d54f4bc10169447"
        id: "sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:47a0acfe11a0f7f6b18835674743e3bfea97f6d0b218235f079d8bb36eb94ca7"
        occurred_at: "2026-10-12T20:20:02.225Z"
        payload_digest: "sha256:50684e1f1d08e38732ff461a733b43df64fb05c0b37504f765c7634af8a838dc"
        task_id: "202610120014-1C3ZFG"
        task_revision: 49
      -
        command_digest: "sha256:a6dbed824a9b14322886a5c201152f17619812832525f3a6a1f25c6926442f98"
        id: "kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7148d99b8badfdc92d87b940d26704c9d57e0d9cbcd5ba56553d4506fd8da577:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:20:10.305Z"
        payload_digest: "sha256:73adb8c182f05db4f2e6a5193e7e62702fd8c6989dbbc34809a9f59bc5dc8825"
        task_id: "202610120014-1C3ZFG"
        task_revision: 50
      -
        command_digest: "sha256:a07704bf98bc1771f05d5e180c58582550a81c53fe17c82f42a005b33f8b02db"
        id: "kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:318f554dfaf01326a1d456bbd91e39568780f06d2e48691fd032796e56ac01e9:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:20:12.454Z"
        payload_digest: "sha256:023c3c4aa353c9a91d5e1dc6a053957a44051d661b29b8c78a9c9589791f6fde"
        task_id: "202610120014-1C3ZFG"
        task_revision: 51
      -
        command_digest: "sha256:35aeaecf1a8e4af931c350829c513628f983a976b810c1b35458d6391dc9c6ed"
        id: "semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:40b51991647e6544362edf52505d529e0f29dc5f1ae585d7d1a092f0ca2659b4"
        occurred_at: "2026-10-12T20:29:07.541Z"
        payload_digest: "sha256:b88fe73b96a21b8cd9734beda39a60b9174f6dcc3838ea4cfb914bd024c71e20"
        task_id: "202610120014-1C3ZFG"
        task_revision: 52
      -
        command_digest: "sha256:78d7bf6a6e2ae412f55773e7233434dc43aade87f063c423f820d0d8e1243b5f"
        id: "scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:ab52074e416020f970443bbf983f8f3ccb4af7126360c36bd14634eee0891f32"
        occurred_at: "2026-10-12T20:38:18.930Z"
        payload_digest: "sha256:39153af9c01de1971fb7afa0630a44898643d24683f72b48a81fe5ab021918df"
        task_id: "202610120014-1C3ZFG"
        task_revision: 53
      -
        command_digest: "sha256:c971c13886d9a0311852fa09f6c07381b8275a6eb317d0974a4fc586f497dacd"
        id: "plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:d956c284810418822557d552d9aed15a8c3fbc3d17a95e56443b2fc2b41bbff8"
        occurred_at: "2026-10-12T20:38:26.282Z"
        payload_digest: "sha256:bf6be5aa1382591c5eaf43d97e07a7bd7e056d57b0376a563d245c3d5741455d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 54
      -
        command_digest: "sha256:5aa3834370b484ea28cc8ef607f6d324ba7eaa65dbb8530484435ef653a3c177"
        id: "sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:0935ff9e133cd57d34037a4346e0f0240f764f14e1c646d794546cca58c4a58d"
        occurred_at: "2026-10-12T20:38:32.932Z"
        payload_digest: "sha256:bf2349062a7d7b48ea3162f9b6529dcbb841c1b5ca23dd6e524df67be1d49741"
        task_id: "202610120014-1C3ZFG"
        task_revision: 55
      -
        command_digest: "sha256:0638bcf1850bbbee27f8ac7e43a036738970f498fa22e674cddfd0cb8b5ccef7"
        id: "kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a6ebbe034df3c7cb74e59120a445691fc3dba515970c9690cb22dad38475bcbc:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:38:35.884Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202610120014-1C3ZFG"
        task_revision: 56
      -
        command_digest: "sha256:5446a0d42eaf2da3083c8081376b239267ec14f4ef58ef837fce0a70cf1ce99d"
        id: "kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:606ba7f346be591acef1eb5a6b19cab9a1eefcb00f161b41ed30b67ceb0616c3:sha256:f88c413b7bcef4a49d22e389b12d5d6d44f94cffa3338b3dc5c5a84a8b922a9f"
        occurred_at: "2026-10-12T20:38:38.388Z"
        payload_digest: "sha256:683c413683c848a8f021ba3cad0592d934438debd0bcd6265bfae229b6a2f64a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 57
      -
        command_digest: "sha256:f41e7214de0180ae90dcc3d43a4cc0b199b8152146472083248ac6e09fb5bb61"
        id: "sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2f892666d3c05ff431b15fd992557feeda35d416d04c7ff19d5cb609efa1d65a"
        occurred_at: "2026-10-12T21:15:29.495Z"
        payload_digest: "sha256:39d425cf18273386ba7397dc1e9c5041b3c512ad002f60a70b6c06bdd62c9545"
        task_id: "202610120014-1C3ZFG"
        task_revision: 58
      -
        command_digest: "sha256:72a6cefe860a457114fa2f5bc9a2c9dac6717b15434caf11871aa06b05df4c83"
        id: "semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:875d303645f1bb13e610a4f61b5f952c91216924c31167d7874f42f1f839f51a"
        occurred_at: "2026-10-12T21:15:31.707Z"
        payload_digest: "sha256:d5b7e61f92a6ab990035c37b1be8a81831983e46adeaeb195ef1dc1e0df6f932"
        task_id: "202610120014-1C3ZFG"
        task_revision: 59
      -
        command_digest: "sha256:cf312a219b3a1690c3129752520704267414290b4301598d7ffcb08f972d362a"
        id: "scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:6f55761ea9e4e53ec779ce95514a031ced4bbde813e77896e61b57cbdf6ef4fe"
        occurred_at: "2026-10-12T21:21:22.036Z"
        payload_digest: "sha256:33df5c6d3c5e313366b12002cc89ceaf8bc6adbaf73fdac66507f7118745a59d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 60
      -
        command_digest: "sha256:43aae2c0c63bbac0dcc96280567c67d47ee45851d4797a12b65530d3c96e5499"
        id: "plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:bc98ba600f8ca3d0e86c2745a3b66437d08f96b22ddcac53589ee877c2289e7e"
        occurred_at: "2026-10-12T21:21:30.213Z"
        payload_digest: "sha256:02b541b3899f780f591035f2949e4f16188c5c99d213510d7adc797c20f7e7d2"
        task_id: "202610120014-1C3ZFG"
        task_revision: 61
      -
        command_digest: "sha256:565c4e096e9126e639ca52820243fb99534131e09455f9f8a9270db08e22d073"
        id: "sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5766c219bdf07b1d7ebf80d5b6bb35631f7e22c5544875445ef9e7e1f2c13701"
        occurred_at: "2026-10-12T21:21:37.659Z"
        payload_digest: "sha256:0dbeca067eb8f5ba1f8cc59f6e317dd615ebbe91e168a3a6064f519fff724e5b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 62
      -
        command_digest: "sha256:ae2652bf2f4e4ca9147ed9c4700f7f1c801512e715e450c4ca4d522bc1eaef57"
        id: "kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:b59edca87317e4d78365ff99d04a85e15037c89a764b5280736beadce0e851c4:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        occurred_at: "2026-10-12T21:21:41.115Z"
        payload_digest: "sha256:257b3d825f9d2b38f2f52032d48050f5fb8ecfc7aaf5b5c7002a6c079d4b28f5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 63
      -
        command_digest: "sha256:911cf86af313ce9d6a54fab99ca5d87ae99462484eb5ae66aaa8c3e7421d85ad"
        id: "kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:13f30ff4cb956078c359fec20d5c0d2bb20c599b7fcb7f6946a04d68c84f0fa8:sha256:79cbddb40cf2b1cc3733c1e7d7a4a66add07220687540c4e251f56a0fec5585a"
        occurred_at: "2026-10-12T21:21:43.721Z"
        payload_digest: "sha256:3eb3595534644a655247e4b007a0c5d10060724324be31ca06aa8f91ffc1c15a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 64
      -
        command_digest: "sha256:4cc87f591863e9ec388c43496a327a6d7598761accff63e0dca758cd6741ae69"
        id: "sha256:1dad580eb6a73de05ca51e52b3314ce61b8851ae8805771f87dc2fca5cebdeb9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1dad580eb6a73de05ca51e52b3314ce61b8851ae8805771f87dc2fca5cebdeb9"
        occurred_at: "2026-10-12T22:02:16.297Z"
        payload_digest: "sha256:6ad7720c76ee716265d8c67bdc035d0d98393a05a3667c3d18b00fcee67ad5cf"
        task_id: "202610120014-1C3ZFG"
        task_revision: 65
      -
        command_digest: "sha256:c2340a78dcc11549505c5121316f0efae4930a041b116af769cb919e5a98ba14"
        id: "result:sha256:03a517944d86d9900bcf84f7811b1d3f722414825b4abcdf4365d1e6451d801c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:03a517944d86d9900bcf84f7811b1d3f722414825b4abcdf4365d1e6451d801c"
        occurred_at: "2026-10-12T22:02:19.026Z"
        payload_digest: "sha256:412f0719f655c66e94fb9f86c88b7af4a91426fe0d9165cb3a29935b9dd512d6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 66
      -
        command_digest: "sha256:e6579f765705e62f93a2f8c5a58d52cb79ebdbaf2162692120cfbcec2147f99f"
        id: "kernel_work_item_inspection_required:sha256:36ec65679f8828c3b196133e6362cc2527f502b9c109628a66c27951f1130401:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:36ec65679f8828c3b196133e6362cc2527f502b9c109628a66c27951f1130401:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        occurred_at: "2026-10-12T22:02:21.326Z"
        payload_digest: "sha256:782554f23622b30225fdce6a02a58285801a25cec6e0200798d3a6870c8b63c8"
        task_id: "202610120014-1C3ZFG"
        task_revision: 67
      -
        command_digest: "sha256:86aefab79ddd9b91435cb884c42204d91d7bbaccbf9c02e9ead5ff116b284f1e"
        id: "validation:sha256:d37649c60a27c0e76da41a8caf537e4c5449b0caa1d9941e555648b2da2c3740:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:d37649c60a27c0e76da41a8caf537e4c5449b0caa1d9941e555648b2da2c3740"
        occurred_at: "2026-10-12T23:10:07.854Z"
        payload_digest: "sha256:117b973bc8da84213df7c3cc1c0df364ee84af1126fe43241d53bc4e4327f51e"
        task_id: "202610120014-1C3ZFG"
        task_revision: 68
      -
        command_digest: "sha256:cfce466525cb10c94e27613b579990ae399ef205e68af6d507d63cf35d91840e"
        id: "validation-resolution:sha256:8d28fc1f91cf22aff00d8110e3fb092c874f457188fe5a2601d4432cb207c409:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8d28fc1f91cf22aff00d8110e3fb092c874f457188fe5a2601d4432cb207c409"
        occurred_at: "2026-10-12T23:10:09.328Z"
        payload_digest: "sha256:7d4b139564b9a67f1091c7c1addafc180cb4b3e2633b3372211ea7ca2e0318b4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 69
      -
        command_digest: "sha256:0a50f6e992c783c7002dbe6868912d79e3166da84fb26af65970a29fbeb9c453"
        id: "kernel_work_item_rework_claim_required:sha256:0bf53fa1e9d4e33a23c7ba99c67f74b4291f41b8f7ced4aa0fdba9505cd65716:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:0bf53fa1e9d4e33a23c7ba99c67f74b4291f41b8f7ced4aa0fdba9505cd65716:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        occurred_at: "2026-10-12T23:10:12.274Z"
        payload_digest: "sha256:a2da109a8b181cb6be40337d65b7b1c1a58280bbcff3b880a0a3b52ae2157b03"
        task_id: "202610120014-1C3ZFG"
        task_revision: 70
      -
        command_digest: "sha256:14478b9fee710a8077a5cbef71aeff9b7d48375cb797deb658ad655c387e7e17"
        id: "kernel_work_item_execution_required:sha256:ad1b3521db8a635f1720143bc8ba33b07419b584136a8ed03676ec31cc6b8063:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:ad1b3521db8a635f1720143bc8ba33b07419b584136a8ed03676ec31cc6b8063:sha256:de750ca2a6c57461a4ec68d71b542613ef60bc2a44b53117502d951590b327fd"
        occurred_at: "2026-10-12T23:10:14.563Z"
        payload_digest: "sha256:b378fe5734cbbb391393dfe2f7931f259d545a7efe8feb838a3dc4f3db0a6f2e"
        task_id: "202610120014-1C3ZFG"
        task_revision: 71
      -
        command_digest: "sha256:db298fce2469da146b496a261281e133db28efb5265dd12bfd1b4635dfa154c3"
        id: "sha256:ae1cf4c6cbc50ebee891b0454b97dd5719394b4750d3e859ff66853acff54aed:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ae1cf4c6cbc50ebee891b0454b97dd5719394b4750d3e859ff66853acff54aed"
        occurred_at: "2026-10-12T23:54:58.164Z"
        payload_digest: "sha256:f7e324bb95f2498f2d4a035690a2e2e765ac90b8601e2486c45024a4220938ad"
        task_id: "202610120014-1C3ZFG"
        task_revision: 72
      -
        command_digest: "sha256:18ca7bcce6ff85cce76a947a57591be9243717e8696b5513ec0c260dae573791"
        id: "result:sha256:0527c5133d99a461a47d63282f250020fabf7fbeadbe08420570269beeec03f5:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:0527c5133d99a461a47d63282f250020fabf7fbeadbe08420570269beeec03f5"
        occurred_at: "2026-10-12T23:55:01.733Z"
        payload_digest: "sha256:b179e1e7b20a7455ee985f592f4849e64a4e3227686872796bcad4f032cad3a3"
        task_id: "202610120014-1C3ZFG"
        task_revision: 73
      -
        command_digest: "sha256:37d92a640e3ac0842d38bc73ac1095d4fc6a10da0972227d6ecb2b151edd0494"
        id: "kernel_work_item_inspection_required:sha256:e1304d9cfd1d863bc88bfcc4c9c2a56528f3271b71105c24e634851e2570f043:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e1304d9cfd1d863bc88bfcc4c9c2a56528f3271b71105c24e634851e2570f043:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        occurred_at: "2026-10-12T23:55:04.636Z"
        payload_digest: "sha256:e70bb3ef9d7db65312b566644faeaf56ffdc5fdfa0b31c81d8bd968bb3869244"
        task_id: "202610120014-1C3ZFG"
        task_revision: 74
      -
        command_digest: "sha256:45497536023c4969b0941acdf7ebc9d7b5a00c07c699feb7baf47103e3b0b428"
        id: "validation:sha256:c3da1679275df47facc927ec6cf7d32f226f80c1479ed9bd967623381373af3d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c3da1679275df47facc927ec6cf7d32f226f80c1479ed9bd967623381373af3d"
        occurred_at: "2026-10-13T00:29:41.868Z"
        payload_digest: "sha256:4ae2502aad39de95fca0021f2d7a86c5820ee4c5d03173077b066990c632eb06"
        task_id: "202610120014-1C3ZFG"
        task_revision: 75
      -
        command_digest: "sha256:df24e09b7b0c410f1067a26c2946e3069c102875af2aab8d047ada44405d1d96"
        id: "validation-resolution:sha256:6f40c31c7a26cb86044e92f1b6d40f5d08c3e29024fe5e9bc73d3da63c9466f0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:6f40c31c7a26cb86044e92f1b6d40f5d08c3e29024fe5e9bc73d3da63c9466f0"
        occurred_at: "2026-10-13T00:29:43.421Z"
        payload_digest: "sha256:31978fb432bc4b25d6d267e138e01022e0f316fe9783dc8b5cc475166e4e3d8b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 76
      -
        command_digest: "sha256:1daad70638b75476ac1a656859ec2e26b9447ae40533d05e6b8f107784bd3492"
        id: "amend:sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:6e083b1a74a6f5c1ee9c8be083f9c89c262cb550e7f530bbab7e81a817d3172d"
        occurred_at: "2026-10-13T01:03:27.201Z"
        payload_digest: "sha256:c2292431f56840fa3dd47b637d5ad2618d3b3c8c79e594858e1d3fe58ed7bb3a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 77
      -
        command_digest: "sha256:28bd663811658ab66593504366e833c8313f1b42f172298f8ed8bb3c2f3d03ff"
        id: "sha256:bdbd78ba4c4b32be4169e7c30c6cffdc974fb8d5e2a1dca6a7a7478fa89ff997:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bdbd78ba4c4b32be4169e7c30c6cffdc974fb8d5e2a1dca6a7a7478fa89ff997"
        occurred_at: "2026-10-13T01:03:28.731Z"
        payload_digest: "sha256:53a1d94a947b753c028e4995a529ed5d9113e48b75d577567cbc8c27dc6a1e59"
        task_id: "202610120014-1C3ZFG"
        task_revision: 78
      -
        command_digest: "sha256:654caec31c1555421b246e4fd9838b7fd8349e5109c02156fd16bd102632ef8c"
        id: "kernel_work_item_claim_required:sha256:75c8a7bc7a9ee50393d41b8937bddf1a8f3e34eaf21b6fb1f202f3001d8bbed7:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:75c8a7bc7a9ee50393d41b8937bddf1a8f3e34eaf21b6fb1f202f3001d8bbed7:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        occurred_at: "2026-10-13T01:03:36.827Z"
        payload_digest: "sha256:ec9d535941637a80d41295c363d82dd28a32f15be7f44c47d154d97291d3f5ab"
        task_id: "202610120014-1C3ZFG"
        task_revision: 79
      -
        command_digest: "sha256:9518a3fcf9f862cd1131c24c9534fbc8037c7fb177b9d2a886984f1276a2af53"
        id: "kernel_work_item_execution_required:sha256:13862147e7c613369dbaaafbad7370616ed77a36c5d0641a89da21e4cf0e3c74:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:13862147e7c613369dbaaafbad7370616ed77a36c5d0641a89da21e4cf0e3c74:sha256:52fb3ba7baf8c4181ebb5f012e3b3fda5de9e1faf835be9ba817624748a16788"
        occurred_at: "2026-10-13T01:03:39.143Z"
        payload_digest: "sha256:6215d74f6748cdb78013a5b43cff756f904381a9068e419c0c650244b31e0a31"
        task_id: "202610120014-1C3ZFG"
        task_revision: 80
      -
        command_digest: "sha256:b8208ad5490839e6d09aaee93c20586152070ae6cfc5d89246f534e3a779a18c"
        id: "sha256:99ef90b0f96fd6b145146790cf3f7ae1a39cd8b38e4952e71de12a84bd3f318d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:99ef90b0f96fd6b145146790cf3f7ae1a39cd8b38e4952e71de12a84bd3f318d"
        occurred_at: "2026-10-13T03:36:24.426Z"
        payload_digest: "sha256:7d535c21c7f6f671e3dc24d2c5a7624cccef8f3d203acaf98d23a5c69e580a39"
        task_id: "202610120014-1C3ZFG"
        task_revision: 81
      -
        command_digest: "sha256:f3a9db58945c9928dd1290d2eb5fbd54e9fc9d2e4cd1251afd85696c2a065db6"
        id: "result:sha256:432101ab6c0086a71af527b028d328c19272124a8aa3bb872755a90e7339584b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:432101ab6c0086a71af527b028d328c19272124a8aa3bb872755a90e7339584b"
        occurred_at: "2026-10-13T03:36:30.688Z"
        payload_digest: "sha256:5c1203dd7b21496b02128af89f84e7c61bd0684130781706df6e68e9073563d5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 82
      -
        command_digest: "sha256:94aaacdd4d109f025dbfd6961d7fcded0f80cc60d348826527483c8584bfb7fb"
        id: "kernel_work_item_inspection_required:sha256:ea21f1c74477d0294d58c09a0e3eb8fb7245475fddea84448afedeccc592b012:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ea21f1c74477d0294d58c09a0e3eb8fb7245475fddea84448afedeccc592b012:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        occurred_at: "2026-10-13T03:36:35.833Z"
        payload_digest: "sha256:ade48133883f8a35e548486afd95eff5c45c8bf74f0a39885330c4cdfd27f6a6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 83
      -
        command_digest: "sha256:c43dd1669cd2c6fd7babd98610ea0c5c75f78073c581e57a9e3925984cecfd16"
        id: "validation:sha256:65003ee2f77c247d8660636b677ac98298b33587f3df93ae30cf52ffea6a86b0:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:65003ee2f77c247d8660636b677ac98298b33587f3df93ae30cf52ffea6a86b0"
        occurred_at: "2026-10-13T04:04:59.866Z"
        payload_digest: "sha256:716fddad3e2a0c06ffb934ed802bfdd4218142261bfd9a0ae0b43b512ec7128d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 84
      -
        command_digest: "sha256:69de00dd143b99d029a778a97fe2722cc5d07c7837162784a9ffa50734adddb5"
        id: "validation-resolution:sha256:061136f11bfe8a769f338be683c041131e2140f90d069817a036151069ea85fb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:061136f11bfe8a769f338be683c041131e2140f90d069817a036151069ea85fb"
        occurred_at: "2026-10-13T04:05:01.563Z"
        payload_digest: "sha256:9c28730bd3ea9670de6d4b3f193b59bf885fb5618a1690b985d78b1d82010fa2"
        task_id: "202610120014-1C3ZFG"
        task_revision: 85
      -
        command_digest: "sha256:0edca84f7360b67b1e4c63887631d765f02ffe396425a1ec9351e46ea0f3c189"
        id: "final-validation:sha256:54d63c1073166df60929a4fe5e37185b8290f745249fe41e15a17f44f5434fe0:85:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:54d63c1073166df60929a4fe5e37185b8290f745249fe41e15a17f44f5434fe0:85"
        occurred_at: "2026-10-13T04:28:08.423Z"
        payload_digest: "sha256:98378f4a8f6be418701bc4708a4e1e07abc2629b81133715992f206d6143dae7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 86
      -
        command_digest: "sha256:17c48f43c32e460d81c1f7e09deb87cc65e63d98b997641685825fae5059fa87"
        id: "amend:sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:ce9e2663d919a32bb24e5f59e5a4ac1656784e5df8f27ecfb4c2d795f24c16e7"
        occurred_at: "2026-10-13T04:42:27.848Z"
        payload_digest: "sha256:b5efffc634ce5cc4ed258be8914a360601c4f173158f5f5d16b1f4399df66ac7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 87
      -
        command_digest: "sha256:a5edcfaf3c10bff2edd2f455972a3b81ef8ecc617eb6345cb605a2faab3e2a0a"
        id: "sha256:b39622eb4e6027983e0966bb1f599d922a5013cfc798b8fa075287715c43ff9f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b39622eb4e6027983e0966bb1f599d922a5013cfc798b8fa075287715c43ff9f"
        occurred_at: "2026-10-13T04:42:32.669Z"
        payload_digest: "sha256:327ab3d03a839dc4bab3bcf45ad5e2a5cc448be3bdad24211b9dd35cae916ef3"
        task_id: "202610120014-1C3ZFG"
        task_revision: 88
      -
        command_digest: "sha256:957608c3dcf0c91e03026f68f2a8452b5ff9f76fabced1d82fe3d3108272768d"
        id: "kernel_work_item_claim_required:sha256:7003298028b6682c565cece96b27036a56903ce6f38bdb36f189f806ca2194d3:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7003298028b6682c565cece96b27036a56903ce6f38bdb36f189f806ca2194d3:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        occurred_at: "2026-10-13T04:42:54.802Z"
        payload_digest: "sha256:a667a0534249b9baa7375298a3879bbe7fec5279bd5bd4164e75e9e82058a40b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 89
      -
        command_digest: "sha256:bdbcf23a913db34fc22ef5bd181becd79161124bf772b66fe24c31e91ed37d67"
        id: "kernel_work_item_execution_required:sha256:97abdceb4ed7b063b0d4402b3041bb7063ad99f357ec655d570097d8fca9c87d:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:97abdceb4ed7b063b0d4402b3041bb7063ad99f357ec655d570097d8fca9c87d:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        occurred_at: "2026-10-13T04:43:01.788Z"
        payload_digest: "sha256:aa0f8579f93c7e0ba180b83911f7088f83b00ce7a93098f84201a541ace52ead"
        task_id: "202610120014-1C3ZFG"
        task_revision: 90
      -
        command_digest: "sha256:225b792a2b6bab558b61e6533aad2a37fef5cd0bc27b4821d3ebacf17d5ea2e9"
        id: "semantic-stop:sha256:4e0a3ff62e56c2f72d093e828e4136b20ecf9c86f6bccce6a8187e5be5993a1f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:4e0a3ff62e56c2f72d093e828e4136b20ecf9c86f6bccce6a8187e5be5993a1f"
        occurred_at: "2026-10-13T04:52:56.496Z"
        payload_digest: "sha256:3e47fbd0a34294b5fe8c4dd7744b0c51d40d91cbc982dd99f689f7cffdb80694"
        task_id: "202610120014-1C3ZFG"
        task_revision: 91
      -
        command_digest: "sha256:b286c707c84bedabb4f3834947a39b39a7fcd91486709722d0c2cb6c2fbf382b"
        id: "scope-request:sha256:24922491a25803503a1b002fc1e55b2cf1988d179ce7aeada9fe568fe9c5873c:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:24922491a25803503a1b002fc1e55b2cf1988d179ce7aeada9fe568fe9c5873c"
        occurred_at: "2026-10-13T04:59:48.840Z"
        payload_digest: "sha256:366862815a5c598e566b9789c988013e935021dc802a0c1f68406c6c6f00cf07"
        task_id: "202610120014-1C3ZFG"
        task_revision: 92
      -
        command_digest: "sha256:26a6d0da41206bb7e3cdcfd507c91f98cbffc472374f5e7e2d9cc1ed43f3c5d8"
        id: "plan:sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc"
        occurred_at: "2026-10-13T04:59:56.855Z"
        payload_digest: "sha256:ef8b0d4d1b55bcd376e64ca2355fac90ca97230331694e0e9abba78d66cd24e9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 93
      -
        command_digest: "sha256:559853bbee52de9c181ac3ec7bff305de8a32b355e229ffc025b21188c50ef94"
        id: "sha256:e8706db81b9b60e8756958fff8ec095183701457e5c5f9ed4f9cca07bbd2a36b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:e8706db81b9b60e8756958fff8ec095183701457e5c5f9ed4f9cca07bbd2a36b"
        occurred_at: "2026-10-13T05:00:03.232Z"
        payload_digest: "sha256:81223dbd425ac0612bc317225b841f41adb6548d3666ed4e2d9fe0f69936b9b2"
        task_id: "202610120014-1C3ZFG"
        task_revision: 94
      -
        command_digest: "sha256:2b485c0f140da2f8e0a3870f1442812c8b79fb96d8a7efbdb9dabc2bf3525da9"
        id: "kernel_work_item_claim_required:sha256:8a130403bb74df593cc90daa6a2c4d942f5824a2d6c0500925646f35c9477561:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8a130403bb74df593cc90daa6a2c4d942f5824a2d6c0500925646f35c9477561:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        occurred_at: "2026-10-13T05:00:06.490Z"
        payload_digest: "sha256:7859991db4d99cb7be9a6505540c65b3d8dbf4c6b5c6081df01223962f3e42a5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 95
      -
        command_digest: "sha256:54a80f62f86c81f58200eb32cab534c6194ef472917781d274ae5d6201ebbead"
        id: "kernel_work_item_execution_required:sha256:069bf617a82be40d5d06f61c1d83669032d76aa7a73e443297ee1e906a5fe842:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:069bf617a82be40d5d06f61c1d83669032d76aa7a73e443297ee1e906a5fe842:sha256:10b6043e2de3f96125837bf2b1376dcf6b2533ba8b9873f70385ec7c112a10b6"
        occurred_at: "2026-10-13T05:00:09.012Z"
        payload_digest: "sha256:9c2653849ef2bade961401a3e11c1894cae0468c6fc1cafa77ee96c6a56e6ff5"
        task_id: "202610120014-1C3ZFG"
        task_revision: 96
      -
        command_digest: "sha256:583f60931d950325bf6581ee74beb02d68df063403356faab8c2d7157161b296"
        id: "sha256:562c8ec8e726f18c7425dd86b0395152aa3ee7ff0008cf739b34c8279a9834fd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:562c8ec8e726f18c7425dd86b0395152aa3ee7ff0008cf739b34c8279a9834fd"
        occurred_at: "2026-10-13T05:28:54.265Z"
        payload_digest: "sha256:bd142d9f42cc3ae558258855f336bbf206e1814f6e19484dd4c3a0b57cfa28b2"
        task_id: "202610120014-1C3ZFG"
        task_revision: 97
      -
        command_digest: "sha256:484c8f8877fea9d6829bd41c6256d4baed38c266bcaaa8ef84a3b43ee855ca14"
        id: "result:sha256:2b790b82421e9e288914f852763e75f062f17b6cc80ef49c9ca1d67b48a0f8fa:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2b790b82421e9e288914f852763e75f062f17b6cc80ef49c9ca1d67b48a0f8fa"
        occurred_at: "2026-10-13T05:28:57.543Z"
        payload_digest: "sha256:4a5801d3f5c9782d1bfc6dfefa52abc8e85fb60d023edde81df9afb8325dcf69"
        task_id: "202610120014-1C3ZFG"
        task_revision: 98
      -
        command_digest: "sha256:69e5d97db5a6dba7603f4cae56914ab5c15458e23024dff81a4ef85ecf3cae6a"
        id: "kernel_work_item_inspection_required:sha256:baec0ec70f1a4df3bb847374859f993da2e996d0bc2c738220440e93a778a57d:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:baec0ec70f1a4df3bb847374859f993da2e996d0bc2c738220440e93a778a57d:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        occurred_at: "2026-10-13T05:29:00.491Z"
        payload_digest: "sha256:5583b0225b1f78f895b6068784b238279be5961b523f271b6918bc8c20ade1cb"
        task_id: "202610120014-1C3ZFG"
        task_revision: 99
      -
        command_digest: "sha256:1d972321f339ae0bdf923ba7428ad9f6545e9d79dd2d72044e9c4d5d6401a255"
        id: "validation:sha256:edb370953f4afae4647d077c471fb0003ee692782ccd03eca5b6215e09769605:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:edb370953f4afae4647d077c471fb0003ee692782ccd03eca5b6215e09769605"
        occurred_at: "2026-10-13T07:00:13.342Z"
        payload_digest: "sha256:adae31a6342390fb8d449ccd48849f36538a3b941d7cd76bbd38dde96a85e7af"
        task_id: "202610120014-1C3ZFG"
        task_revision: 100
      -
        command_digest: "sha256:ec445af7be037a1fe848fb3f14ddb1ff9f8e1b13897dbb5e839a4f259bf5152c"
        id: "validation-resolution:sha256:41bcb45c5ae6baac7e340dcf7715f17a0fc851678274be5b060bbbf1c0b6ed61:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:41bcb45c5ae6baac7e340dcf7715f17a0fc851678274be5b060bbbf1c0b6ed61"
        occurred_at: "2026-10-13T07:00:14.986Z"
        payload_digest: "sha256:0080b27b6c554256594f9d42c304ccbb4ef14ca92c26e4913bdc31c3fafcf850"
        task_id: "202610120014-1C3ZFG"
        task_revision: 101
      -
        command_digest: "sha256:36226fbadbde4e48f0fc6bfe378c107f989191d1ab0306554b823a9a928823a5"
        id: "final-validation:sha256:2454199eb4a322ff83694c46e399ff9f182a8354bb718002fe39ee714b492164:101:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:2454199eb4a322ff83694c46e399ff9f182a8354bb718002fe39ee714b492164:101"
        occurred_at: "2026-10-13T07:20:16.988Z"
        payload_digest: "sha256:56257d158dad1ca5325112752125d834c3e1e40d01a91dde71ecfe1f490ae8c6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 102
      -
        command_digest: "sha256:b503a68506a8943e32712cc3d932c0c47b869a66e388eeb160656a0257faa488"
        id: "amend:sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:bf8c3f706fa1542b216b27fc9ce22c7e44efe2f1263efead4cebb0a19ca3d1ab"
        occurred_at: "2026-10-13T11:55:18.091Z"
        payload_digest: "sha256:4218ea1bd114087bbe6d28f51825fe55e3396a0b8b5dd4930ec2569ced49b9c4"
        task_id: "202610120014-1C3ZFG"
        task_revision: 103
      -
        command_digest: "sha256:6602dad66c21879ff2542cfadcc16a8fcd584a5b433bf07ea62df6af6827b279"
        id: "sha256:5efdbc671198394f4c5c0d140b732c49439e164405247e80383d792389d07c25:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:5efdbc671198394f4c5c0d140b732c49439e164405247e80383d792389d07c25"
        occurred_at: "2026-10-13T11:55:19.739Z"
        payload_digest: "sha256:ec241489e58819bfa93d38514b725f1118aca4455e6d06fa107c4410bc948b8d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 104
      -
        command_digest: "sha256:1aec261e2ee6073ca4dc2fda0bc0a47cf458f31acaac5334d96671d0b558dc5c"
        id: "kernel_work_item_claim_required:sha256:8f495a42d3a5fa279102be2d44969999068575220769f37702fa297c6a208d8c:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8f495a42d3a5fa279102be2d44969999068575220769f37702fa297c6a208d8c:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        occurred_at: "2026-10-13T11:55:29.862Z"
        payload_digest: "sha256:f90873b78923c6f8fb285d1df1545b42313cb26b86edf2bf6daeefb889dec8d3"
        task_id: "202610120014-1C3ZFG"
        task_revision: 105
      -
        command_digest: "sha256:be64c7ea429f3ed78dd8954a688066f541cf05eb37a6f6479a2cd0c2d35505ad"
        id: "kernel_work_item_execution_required:sha256:784dce4c8bf2308f8260db0dd40886c4e9d60fe6cc0bc2d02c0253b1bc624c27:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:784dce4c8bf2308f8260db0dd40886c4e9d60fe6cc0bc2d02c0253b1bc624c27:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        occurred_at: "2026-10-13T11:55:32.333Z"
        payload_digest: "sha256:a0bc2fb4beda4c019bb13e7aef680b89bc1cc1ea4ee41b6307d8934def4aa2d3"
        task_id: "202610120014-1C3ZFG"
        task_revision: 106
      -
        command_digest: "sha256:61c8d2ac7b92609cd7f29e94e1041e5d711dfecf083a749c89125395de2bd27f"
        id: "semantic-stop:sha256:a0fefec86d03c9cbc2f191dc4f304f955d5829d727db4fb1bd48112c5afc9cef:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:a0fefec86d03c9cbc2f191dc4f304f955d5829d727db4fb1bd48112c5afc9cef"
        occurred_at: "2026-10-13T12:04:30.250Z"
        payload_digest: "sha256:11c8949fcd2259f50d73a372aee32b83b279bf01370d592ec3b4c0be99cc4c0d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 107
      -
        command_digest: "sha256:ef49d4784305fce31fe05306ff25215eb5a66f280ee013aed529c7b06c6cc2f3"
        id: "scope-request:sha256:ea5dccc0aa0a255cf536f1d9ede68d26f0d92937a54bf72a5a46d6996d5cf43e:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:ea5dccc0aa0a255cf536f1d9ede68d26f0d92937a54bf72a5a46d6996d5cf43e"
        occurred_at: "2026-10-13T12:16:16.835Z"
        payload_digest: "sha256:6bfedea076896adee95617740d7923985afd9ac7d56b9cb4f5bcf36288729a7b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 108
      -
        command_digest: "sha256:0a74a2826ced7218175f78c5edf1b9714b6d5756b68597c0e2956aa32cd58607"
        id: "plan:sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:ab2db20caa1bf8a93f613faabb3fc9e675a3347bf403cfa55f91d467d22beef1"
        occurred_at: "2026-10-13T12:29:01.661Z"
        payload_digest: "sha256:5b710e11915b8722ce08440b7520a5611d4650b17283fabec82defc1faed4da6"
        task_id: "202610120014-1C3ZFG"
        task_revision: 109
      -
        command_digest: "sha256:238c3ed2bdb59161c1e52dfec5a9ad72628a75cf80a31710f991508691703900"
        id: "sha256:a55620a23d0acaf7530922a132e9cd608fe4a5b104920e596f991d5a513828b8:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a55620a23d0acaf7530922a132e9cd608fe4a5b104920e596f991d5a513828b8"
        occurred_at: "2026-10-13T12:29:08.617Z"
        payload_digest: "sha256:cae0b3e55c2afd4cc5d03152754b5ebe24bb902909bfdc8564509d7a407b2da8"
        task_id: "202610120014-1C3ZFG"
        task_revision: 110
      -
        command_digest: "sha256:59169f38fd44e55dbbf6f643cb1d6a964a7de870f1617d524296158b69c32cbf"
        id: "kernel_work_item_claim_required:sha256:88f2cbad13c64bcaa0ffbd8c74e7fe3d46b898d8a07e89ed78a5b9f9f3d2fe85:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:88f2cbad13c64bcaa0ffbd8c74e7fe3d46b898d8a07e89ed78a5b9f9f3d2fe85:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        occurred_at: "2026-10-13T12:29:11.782Z"
        payload_digest: "sha256:bf50ae11fbdbcb96ba8883b95102e492d738c8def9b22a8ba9fc45f08e8cf1f9"
        task_id: "202610120014-1C3ZFG"
        task_revision: 111
      -
        command_digest: "sha256:c13f7f36a9cc91d2354b79ac7b15efc9df327f02336fa1d6a0c96eab90f6af8f"
        id: "kernel_work_item_execution_required:sha256:a5345527fd97af64da2df9dc9a343c3c0515350facd99c97787b88ef1ddf5772:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a5345527fd97af64da2df9dc9a343c3c0515350facd99c97787b88ef1ddf5772:sha256:5194c211644c5dfcf20de991a0d6778bf2d8ec6484fe6c15ce4958addf8bef30"
        occurred_at: "2026-10-13T12:29:14.302Z"
        payload_digest: "sha256:98513aa62999b2e9d508dfdafeefa02866ae2873079190fb6c3b8deb4fb5b20c"
        task_id: "202610120014-1C3ZFG"
        task_revision: 112
      -
        command_digest: "sha256:63b5ba79fe87a304a6607a2ee39f5d9b188824e2bceea231215514660f2cced0"
        id: "sha256:4bc761d68844020b74dd45bd583cbdb531669bab10dc479715165ae759bdc99d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4bc761d68844020b74dd45bd583cbdb531669bab10dc479715165ae759bdc99d"
        occurred_at: "2026-10-13T13:32:15.236Z"
        payload_digest: "sha256:6db957a2514e0f1fcc399b470c13388d0ce70d1b7be0ede29fb7f7cace609100"
        task_id: "202610120014-1C3ZFG"
        task_revision: 113
      -
        command_digest: "sha256:00a2062c2fff72006f0c42674476a286f8b5ac0568dd4d38b6b2711a7b654736"
        id: "result:sha256:abb62f9ff8151737698b17037b17c0467118045a204abbe29b993b441e87dfec:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:abb62f9ff8151737698b17037b17c0467118045a204abbe29b993b441e87dfec"
        occurred_at: "2026-10-13T13:32:18.208Z"
        payload_digest: "sha256:7b2375cf9dcf35625156b7b8117f79b7e23cfb5b922011f7e1c92cd1bc8bcfe1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 114
      -
        command_digest: "sha256:38d72e5ed3a6e5153f54c417b601f792632e745516d3c51327623fbac799256e"
        id: "kernel_work_item_inspection_required:sha256:92dcbcf8d9b31ef278e9b0d6e35a3b7ffa8677e8b3a9e144f91f1304956809ee:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:92dcbcf8d9b31ef278e9b0d6e35a3b7ffa8677e8b3a9e144f91f1304956809ee:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        occurred_at: "2026-10-13T13:32:20.811Z"
        payload_digest: "sha256:0167921e0e206b3b0703f5f883c941a06585f61a4c15e2bbcf3b3b0e910e2262"
        task_id: "202610120014-1C3ZFG"
        task_revision: 115
      -
        command_digest: "sha256:d6320a76e7e55237cd3dac2fb767b05fb37f67735a42b899d640638804207100"
        id: "validation:sha256:e0c79ca4f1c43356c48b82bf405d3706bd51cfb5afdaeac22a6b19ca605ce7b2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e0c79ca4f1c43356c48b82bf405d3706bd51cfb5afdaeac22a6b19ca605ce7b2"
        occurred_at: "2026-10-13T14:04:52.194Z"
        payload_digest: "sha256:758573bfaa8e8e49717bcd9b7da3bf4be3a253749bb5327d61a761a0df9a817d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 116
      -
        command_digest: "sha256:2c2b0bd21c531c0f48f4e07cc0de50d76c42746fa92c0eb16a6cc83eb33be0c1"
        id: "validation-resolution:sha256:334669be6bbf6ef2cb0ee8f1fe337e206a3813f6db79c619ed3895aa94933236:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:334669be6bbf6ef2cb0ee8f1fe337e206a3813f6db79c619ed3895aa94933236"
        occurred_at: "2026-10-13T14:04:53.869Z"
        payload_digest: "sha256:8370f411e204ebd746c55f5312906fadfbfe2fd028da921f0adeb4caece0b884"
        task_id: "202610120014-1C3ZFG"
        task_revision: 117
      -
        command_digest: "sha256:42c898ae37dee2f89ac52caf59c34e757d482e7ccb8d75f29167e919761d4849"
        id: "final-validation:sha256:ec8e8e56f09c5645861e7eb5e5bc20c58cfd5954a0940ee336bdc8d523f97a74:117:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:ec8e8e56f09c5645861e7eb5e5bc20c58cfd5954a0940ee336bdc8d523f97a74:117"
        occurred_at: "2026-10-13T14:09:15.521Z"
        payload_digest: "sha256:818aeaf6b3dea1e42c43bb7827b3bd218e354445648dd6dd732451580bef5378"
        task_id: "202610120014-1C3ZFG"
        task_revision: 118
      -
        command_digest: "sha256:5e2c919fa7814f497489d70e9ee6adf23475fcb251bf86d902b278c4cf4a9d15"
        id: "amend:sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:4caf3b35798b802b0b3edfd5c7e1db52e1a881f14bf81e390c2a7c02e40d4567"
        occurred_at: "2026-10-13T14:30:47.533Z"
        payload_digest: "sha256:582ae29e21a3b3c2d19668a38ac5676165a49858785cd4d06ccd7a1940f7a666"
        task_id: "202610120014-1C3ZFG"
        task_revision: 119
      -
        command_digest: "sha256:46a62de4e81704501b549e00e23b1f475f6edc6bbc9d18a1a4a9cf87d5eb3e7e"
        id: "sha256:6b72d0eeada22d6bbb91cca37a6ffba905406ec6c494ab2ebf2b0ae0f415258b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6b72d0eeada22d6bbb91cca37a6ffba905406ec6c494ab2ebf2b0ae0f415258b"
        occurred_at: "2026-10-13T14:30:49.266Z"
        payload_digest: "sha256:bda6cafd4e2a8c2f37989d1809d9fc836b8c02b497e293aa643c5f741c01d44a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 120
      -
        command_digest: "sha256:c4c536f28c170b65058d7acff46ee3eb36cb5d6c4e8408c307561845241c2ba9"
        id: "kernel_work_item_claim_required:sha256:43caa3afeca5a06e7dd08f7231324ce6e5da716e9bc87362ec7d225d14e9df34:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:43caa3afeca5a06e7dd08f7231324ce6e5da716e9bc87362ec7d225d14e9df34:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        occurred_at: "2026-10-13T14:30:57.725Z"
        payload_digest: "sha256:3e0ef55ae51b33c5f036a78c54789da9018bd0ec65056a7b495697e2c73a1a6a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 121
      -
        command_digest: "sha256:24afcacd5eb9ac9f47fbbc0f2addbd8a0721596896f1dbb20eed017bed67316f"
        id: "kernel_work_item_execution_required:sha256:49f5a3b36ee8378d7b734414c884f12541bd5a9a9aca92e02d5fba8259b97747:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:49f5a3b36ee8378d7b734414c884f12541bd5a9a9aca92e02d5fba8259b97747:sha256:20fe7316924e5c0970ec51c65561c9fed9874defd2ded6d18eb621b00a9e7fd8"
        occurred_at: "2026-10-13T14:31:00.269Z"
        payload_digest: "sha256:b19362f20da48fba6564b68e03af1aec6d34edebc3114ddfd48c93a3ab2b1273"
        task_id: "202610120014-1C3ZFG"
        task_revision: 122
      -
        command_digest: "sha256:d39e0fb7fc6d550cc441bc340c57601adb11581df197af862f9c05b9e94a3d84"
        id: "sha256:de9e50cb7484172ecdc6b47eb45fc3e83e69993922d48b2c0e597b43211c3141:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:de9e50cb7484172ecdc6b47eb45fc3e83e69993922d48b2c0e597b43211c3141"
        occurred_at: "2026-10-13T14:53:39.908Z"
        payload_digest: "sha256:0f03349589012f8a93ddc5e0eba1b78a5c55c57308185c87e7537206b26c13be"
        task_id: "202610120014-1C3ZFG"
        task_revision: 123
      -
        command_digest: "sha256:3a2a1a9bd15369903e70e65673220151df527cbf45ebface8c4454e6bf642e52"
        id: "result:sha256:2450fdcb74217b1c866d895fb84468937e95ba87f7ffabb4e09bd5d31b66c89d:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2450fdcb74217b1c866d895fb84468937e95ba87f7ffabb4e09bd5d31b66c89d"
        occurred_at: "2026-10-13T14:53:42.957Z"
        payload_digest: "sha256:9bd0e30891e7d1d0734265241e634e9ac79df32a80073270d46f588c39fd3ce1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 124
      -
        command_digest: "sha256:773f804e0e7a7527aa9db9e2cff882bc7f713fbc5b2b679bd1b5781671959723"
        id: "kernel_work_item_inspection_required:sha256:41c1753b5cbbd70c38f2cf70a49854cba20fff0a61192ad2e11102a94960e27d:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:41c1753b5cbbd70c38f2cf70a49854cba20fff0a61192ad2e11102a94960e27d:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        occurred_at: "2026-10-13T14:53:45.589Z"
        payload_digest: "sha256:8811c14a6ced80c5af22632972def1063fcb43cec3b5a9136134099306fd27aa"
        task_id: "202610120014-1C3ZFG"
        task_revision: 125
      -
        command_digest: "sha256:93bc2707a504df617d042a7ce4f666f4d282d545b80d9d7ce474feb5a68b542b"
        id: "validation:sha256:6e0dc9d789e055871e7c027287309ebb05105114f9c1ef432874cc1c3feaf6c5:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6e0dc9d789e055871e7c027287309ebb05105114f9c1ef432874cc1c3feaf6c5"
        occurred_at: "2026-10-13T15:07:43.541Z"
        payload_digest: "sha256:aaa0a53e120829da044820d7e0a603cde926c900adb9ca40f9648f244a3c09f1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 126
      -
        command_digest: "sha256:0ced365276aa405f032f88396a6fb9ed12aa57678f2194b0d7a352364054d9b0"
        id: "validation-resolution:sha256:044ab8028f6d15e4ffd4f9466db5523e2b83026da874c40963ea193a67fabe75:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:044ab8028f6d15e4ffd4f9466db5523e2b83026da874c40963ea193a67fabe75"
        occurred_at: "2026-10-13T15:07:45.338Z"
        payload_digest: "sha256:dc0df4cc990fa7d489459b5a26a8422107f4cefaa01b58a22838f5ff3e934d5b"
        task_id: "202610120014-1C3ZFG"
        task_revision: 127
      -
        command_digest: "sha256:1576f548f04eca5f485545e7970c11533c25dbab6df3d02a1f8170bba309dfa6"
        id: "final-validation:sha256:577aba1eacec9828a31c5f4e68bd3aedcf3d283ae796bf4648c80e5d1c458b4a:127:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:577aba1eacec9828a31c5f4e68bd3aedcf3d283ae796bf4648c80e5d1c458b4a:127"
        occurred_at: "2026-10-13T15:25:00.361Z"
        payload_digest: "sha256:6c73c62f7c6ff70076c2d99abe490232fcc88c5593ba540067cc4b9cc356a88f"
        task_id: "202610120014-1C3ZFG"
        task_revision: 128
      -
        command_digest: "sha256:b033a57a69e40e031fc6900f161d2e60f8834685dea8ed749098f01f047e0fd9"
        id: "amend:sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:445be82ef87d511b78bee75a04723f30c44f0cac8d518e7bbce1078a81420053"
        occurred_at: "2026-10-13T15:40:50.009Z"
        payload_digest: "sha256:a3bf19373902dd943db8f487d51920c740490e2ff4d54aa077a71a6335d595cc"
        task_id: "202610120014-1C3ZFG"
        task_revision: 129
      -
        command_digest: "sha256:bd719d40ec964b0e2729d3e3cfa12a4fcfcf6de3221997bf0c6a311b2db6e74c"
        id: "sha256:466635706b2ab165d9b8a717749ae8ec79ecf77a574dfabeb444a0acd1b6b080:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:466635706b2ab165d9b8a717749ae8ec79ecf77a574dfabeb444a0acd1b6b080"
        occurred_at: "2026-10-13T15:40:51.779Z"
        payload_digest: "sha256:b57dab0294ab61a37dc5b60b9a0aa257209e997c94269e251ae2565dafc66633"
        task_id: "202610120014-1C3ZFG"
        task_revision: 130
      -
        command_digest: "sha256:47a5cff2a1d71263e4b79ec467ec5b61dac50d9677d3ad3702f5abbacac99b63"
        id: "kernel_work_item_claim_required:sha256:0a84763185cb84a7fb9d7d648e78248b2d6116c60cb125075359e1930681cb99:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0a84763185cb84a7fb9d7d648e78248b2d6116c60cb125075359e1930681cb99:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        occurred_at: "2026-10-13T15:41:00.536Z"
        payload_digest: "sha256:b7383a9788d2dbcc1f9243376928cb997386938640987d40070c09a73dd6752a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 131
      -
        command_digest: "sha256:f3fd3ce2cdf45549b784f8bd9b4348b966c6c78951783847013a87b714bdabbb"
        id: "kernel_work_item_execution_required:sha256:6ef2b86405b930255f61ab32130b48aad73ea230d34fc1596a647c64ace432a1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6ef2b86405b930255f61ab32130b48aad73ea230d34fc1596a647c64ace432a1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        occurred_at: "2026-10-13T15:41:03.105Z"
        payload_digest: "sha256:2196cf7bbdd4cc0cef17eafee80e96737df0ae4a909e101eaa2570a2c7cd705d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 132
      -
        command_digest: "sha256:4e223828977e0d88ed604fdf33b5e0b87eada4a936d320413771fb56932d45f5"
        id: "semantic-stop:sha256:7f4ac438def0408250f9f47515a3ceb35f39cf8813127295f6fac869bfa4584d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:7f4ac438def0408250f9f47515a3ceb35f39cf8813127295f6fac869bfa4584d"
        occurred_at: "2026-10-13T15:50:16.029Z"
        payload_digest: "sha256:15251e60979dc8cf26c80975b9c103fc40b251392a833c66b9a56c7860ac2d56"
        task_id: "202610120014-1C3ZFG"
        task_revision: 133
      -
        command_digest: "sha256:5ae70d0c3eb610ed6eed5f2a8a3046ed4ae730af33b6ed1812bc4b63700a4ebc"
        id: "scope-request:sha256:0b31982ac6369b63c478a1372431651f6e579c15628ae99812b2951e11325b51:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:0b31982ac6369b63c478a1372431651f6e579c15628ae99812b2951e11325b51"
        occurred_at: "2026-10-13T16:06:02.774Z"
        payload_digest: "sha256:b7f5f04be5fbdc66b91fe3678214ef5688534360609743b35978adde16a35851"
        task_id: "202610120014-1C3ZFG"
        task_revision: 134
      -
        command_digest: "sha256:bd2d82420ab694172bf7e4a8522f9209a9bc5bdd9125fc998d7d57e86ae2e8c1"
        id: "plan:sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45"
        occurred_at: "2026-10-13T16:27:36.944Z"
        payload_digest: "sha256:3b48c4762f292a3d93fb85c3e576bbbc2762cf60ea89aba6561112ab095a273a"
        task_id: "202610120014-1C3ZFG"
        task_revision: 135
      -
        command_digest: "sha256:2e1c65e4ee4bfc9fe8dbdfd7a851159d6afaea53046d73507ba796c70ffcbc76"
        id: "sha256:b99350206d1c6511e0da1b25d7f4f243ef66ee1024dd2e656f8c928ad1667c32:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b99350206d1c6511e0da1b25d7f4f243ef66ee1024dd2e656f8c928ad1667c32"
        occurred_at: "2026-10-13T16:27:44.019Z"
        payload_digest: "sha256:c689db6acb0668fb8d43689682a853dabfb6701e5fc7502b3b8810092484165d"
        task_id: "202610120014-1C3ZFG"
        task_revision: 136
      -
        command_digest: "sha256:4853d5f0150b7c18908df895a63f9753f42ff3dee5022cb95977ad25305d7044"
        id: "kernel_work_item_claim_required:sha256:3e356de1bb8350944be948f614bb0c97a9727bf038fd0006830bbdd94b53927e:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3e356de1bb8350944be948f614bb0c97a9727bf038fd0006830bbdd94b53927e:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        occurred_at: "2026-10-13T16:27:47.349Z"
        payload_digest: "sha256:787c797627dc978f0bd75cbaf8a07272253632c6031ea71ad716c83706ada927"
        task_id: "202610120014-1C3ZFG"
        task_revision: 137
      -
        command_digest: "sha256:d74eb7a78cbe5d910933205a47186e730f06eb1942df4d2db3eadb7727b3c26a"
        id: "kernel_work_item_execution_required:sha256:f50155e2e171ece6cc44fbe4a3c884716703cbe731fc82b382ad84efd4e928f1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f50155e2e171ece6cc44fbe4a3c884716703cbe731fc82b382ad84efd4e928f1:sha256:aadad2f2f78f388340ba051d29d4c8c1f912fc9051aa2066562d1893062971ea"
        occurred_at: "2026-10-13T16:27:49.888Z"
        payload_digest: "sha256:022e603ecc958de1cb9a4a72d4482a84bd346c545fdf268864229785922790d8"
        task_id: "202610120014-1C3ZFG"
        task_revision: 138
      -
        command_digest: "sha256:1d5e5b84e83e72ae9f487a210c61a4ae90f7e6bff4c33bcb774bb49b67f009c5"
        id: "sha256:abf78cf4e3843ed5f091ee8415ea1992d0b65f85ecf53279fbd4f70de76cf216:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:abf78cf4e3843ed5f091ee8415ea1992d0b65f85ecf53279fbd4f70de76cf216"
        occurred_at: "2026-10-13T16:53:31.454Z"
        payload_digest: "sha256:151a994a9dedf818a29b6667d31d24ee84ee0dc01a2bedd69bb155ff93c09ec1"
        task_id: "202610120014-1C3ZFG"
        task_revision: 139
      -
        command_digest: "sha256:cffa22f10f83a59e2b6c2f254c33e3fb8cadda83f0efe2d91e68cffbb561762d"
        id: "result:sha256:171ac6d10900de00332ad3c3ceb340827e255b54432ee8bca609c7a5ec938f30:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:171ac6d10900de00332ad3c3ceb340827e255b54432ee8bca609c7a5ec938f30"
        occurred_at: "2026-10-13T16:53:34.777Z"
        payload_digest: "sha256:d53823d7b9821afaec773efc760bb8ce30bf5bd3ab3f43dfceed83200de14846"
        task_id: "202610120014-1C3ZFG"
        task_revision: 140
      -
        command_digest: "sha256:1f8a100a32cd7883242902aebf5713082159c9cf244b6982c91d1c00632119d3"
        id: "kernel_work_item_inspection_required:sha256:ea698c484bbcb4f64055e75d0926b08c172e5fbcf4c36026a25310112c27da3d:sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:ea698c484bbcb4f64055e75d0926b08c172e5fbcf4c36026a25310112c27da3d:sha256:30dab009abc943ae5bebe7da4dbc2e4fc4cac603a0e707466269e5a912ace46d"
        occurred_at: "2026-10-13T16:53:37.653Z"
        payload_digest: "sha256:103de303da505f0add34434918af2352dfbe09939f5cc0fedec68df01d38e9c7"
        task_id: "202610120014-1C3ZFG"
        task_revision: 141
      -
        command_digest: "sha256:f5ffc95246e1609cea6bdf353646613ec9ea65da755a946202f0323db0219857"
        id: "validation:sha256:e3211efdff4c8c9f8209823f31eb90c62ec067b5adeeacbeb44bb1f30f2d6db6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e3211efdff4c8c9f8209823f31eb90c62ec067b5adeeacbeb44bb1f30f2d6db6"
        occurred_at: "2026-10-14T04:37:13.626Z"
        payload_digest: "sha256:c6412e76377efcf0bd358883bfbd0bb8ea14f292dfa010fcaf217074df0b2b89"
        task_id: "202610120014-1C3ZFG"
        task_revision: 142
      -
        command_digest: "sha256:26ee4e629a41a5d382d4dba7a1b5cc25a4a5c35247e2ed014185e38031266d01"
        id: "validation-resolution:sha256:fdaaf3857ca1d8cd6c54bbda49664d792279616ef388a81cabeb614bc58983e1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fdaaf3857ca1d8cd6c54bbda49664d792279616ef388a81cabeb614bc58983e1"
        occurred_at: "2026-10-14T04:37:15.531Z"
        payload_digest: "sha256:098e8eaff554ad01d71e155a0f482020dceb1764c9c3c359fdbf4fc9a02af7ef"
        task_id: "202610120014-1C3ZFG"
        task_revision: 143
      -
        command_digest: "sha256:0df3b1332d1186f24f4afb912c161ab8bc996f60b1914c78680bc26d4ba5fe5e"
        id: "final-validation:sha256:f5f04889ff026c9ecf1dd52e6b9dbbab16c0583013811cda9d23bc1b7bb5b4af:143:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:f5f04889ff026c9ecf1dd52e6b9dbbab16c0583013811cda9d23bc1b7bb5b4af:143"
        occurred_at: "2026-10-14T04:56:34.160Z"
        payload_digest: "sha256:e4a3b9294828289d3aeb468163b664916247821809a4cf5b719642adac67b6bb"
        task_id: "202610120014-1C3ZFG"
        task_revision: 144
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main

Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.

## Scope

- In scope: Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
- Out of scope: unrelated refactors not required for "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main".

## Plan

1. Execute approved WorkItem integrate-reviewed-nine-sources.
2. Execute approved WorkItem final-correction-12acd7c9fe60.
3. Execute approved WorkItem final-correction-cca82dcaef21.
4. Execute approved WorkItem correct-authenticated-fixture-size-baseline.
5. Execute approved WorkItem final-correction-54d63c107316.
6. Execute approved WorkItem canonical-full-clean-checkout-prerequisite.
7. Execute approved WorkItem final-correction-ec8e8e56f09c.
8. Execute approved WorkItem final-correction-577aba1eacec.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run --filter=agentplane typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `npm run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-13T07:20:18.817Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ee8f743f83de02f293d70a318330c6138b6eb92ab99223b805bd326adb038400, input_digest=sha256:1b2e04f44a62848fa890ba63a647385d7fa60e7fb2a6b892f556ec4148fe46c1

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (5/5)

NativeTaskIdentityRef:
- plan_digest: sha256:e80b349e09db24ffdb2310396beac05c5492329f7de025af24e7488f4879c3fc
- policy_digest: sha256:b0f3ed8717357e14968093aaf83e3059ba55a248477be0e758cb9ae571d6f7ac
- capability_digest: sha256:7d33ab1461544ce8dc79659115dade0a885488dad196eb6c615faf6c9af4adf8
- checks_digest: sha256:c77576d083b486c7008b93168bdb90a4ae1e720d6719a7309805400ec7baf415
- identity_digest: sha256:d909a3617b9757242fe9455e8dc0b9d07b4bb7af5bfe42d044bf04eb537dfd30

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610120014-1C3ZFG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-10-14T04:56:36.241Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ee8f743f83de02f293d70a318330c6138b6eb92ab99223b805bd326adb038400, input_digest=sha256:285dd6cb454fae9e742f75384c2891ecd0166667f8e3964fa187f6db25518959

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (1/6)

Check: affected_unit_integration
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (2/6)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (3/6)

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (4/6)

Check: affected_unit_integration
Command: bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (5/6)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check affected_unit_integration (6/6)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (1/6)

Check: critical_paths
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (2/6)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (3/6)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (4/6)

Check: critical_paths
Command: bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (5/6)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check critical_paths (6/6)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check full_regression

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts packages/agentplane/src/commands/pr/internal/provider-base.test.ts packages/agentplane/src/commands/pr/internal/sync-open-provider-base.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/process-supervision/timeout-controller.test.ts packages/agentplane/src/runner/process-supervision/process-tree.test.ts packages/agentplane/src/runner/process-supervision/termination-arbitration.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (1/6)

Check: task_outcome
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (2/6)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (3/6)

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts packages/agentplane/src/commands/task/kernel-rework-lineage.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (4/6)

Check: task_outcome
Command: bun run test:project agentplane packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (5/6)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610120014-1C3ZFG/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610120014-1C3ZFG Verification Contract check task_outcome (6/6)

NativeTaskIdentityRef:
- plan_digest: sha256:ea8ec528a361f616f80f132168e462bfd215192896fe92f03c414cea2b2e5b45
- policy_digest: sha256:b0f3ed8717357e14968093aaf83e3059ba55a248477be0e758cb9ae571d6f7ac
- capability_digest: sha256:ae3e60b0e354e870e15d67f489ecfe4a417bc2b06a4d5b37e2f1f2de54918b98
- checks_digest: sha256:177a843180ab8d98aee34f9d1eaf16799344f8b0e879bf531c5f65aa1c9690b1
- identity_digest: sha256:8d3efdbf613027660060c262c3e4c2492b0ef8791c32bc4ca2312749248c784e

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610120014-1C3ZFG
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
