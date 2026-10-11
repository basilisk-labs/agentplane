---
id: "202610101141-AGRARP"
title: "Admit exact pre-effect scope requests through native USER approval"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 37
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "v0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run format:check"
  - "bun run lint"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-11T01:08:45.496Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-10T23:44:22.687Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:15cecb064163bdb94b6378638dc2e8c47c7bb97dd4dc4f571341db9cf1b10063"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-10T23:44:22.687Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "5596b8a4b8f1aa1606a6447be17a5febfbb51c96"
  review_identity_digest: "sha256:3eecd9ee55afead873931599e8c5fa998288572cd9475c04910d266eeb713be6"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610101141-AGRARP/f61a2280b66e1724fedefd655b67a8bf257c44b276a0153c2fd726e401523547/quality-report.json"
  findings:
    - "All 13 required context blocks and manifest 2be1b5efdd07f1813653fdfd69ab95621acd463e18e8ad06efb3850e5f8093c0 were read and hash-verified. Accepted result, repository evidence and native validation bind this exact item, claim, attempt, plan and controller commit."
    - "All 22 current source hashes match the independently reviewed frozen manifest c404dd3567522fbf68ae19db37f3c29b65b1550bf29a54b07c3fee1095e041cf. Current working changes are native own-task artifacts only. No remaining actionable source review findings were identified."
    - "State-bound prospective scope admission preserves the trusted intake ceiling, security checks and exact USER provenance. Fresh planning retains unchanged completed definitions, accepted outputs, validation and attempt history; changed or removed completed work rejects."
    - "The explicit restoration selector and read-only preview authenticate accepted result, independent inspection, native validation, completion and reset lineage. Later proof inventory derives from authenticated event kinds, including nonstandard mutation-ID rejection; forged, missing, stale, active or newer accepted work fails closed. Restoration appends a receipt without consumer effects or implicit final completion."
    - "The report raw digest 521a73b4f5b04dc5cfe068b24189103e532d12d8569c7fe3adc594950071fb1d, ten paired check receipts/logs and six additional evidence files verify. Earlier 22-test coverage is labeled pre-incremental; final affected repeated-review/path cases pass three tests and final event-kind restoration case passes one. Core regression records 65 passing tests before the final targeted correction."
    - "All three native mandatory checks passed at the exact commit: typecheck, lint and format. Three manifest hashes and all nine raw observation files verify. Lint has zero errors and four retained duplicate-import warnings. Runtime/toolchain/environment bindings were inspected; no new tests were run by this evaluator."
    - "Generic command compatibility artifacts and generated-reference freshness are qualified; immutable baseline remains unchanged. Historical failed evidence is retained. No Factory-specific product branch or actual consumer restoration is claimed."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
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
      - "task.verify"
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "artifacts/compatibility"
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
      - "packages/spec"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "artifacts/compatibility"
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
      - "packages/spec"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
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
          - "artifacts/compatibility"
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner/usecases"
          - "packages/core/src/runner"
          - "packages/core/src/tasks"
          - "packages/spec"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:62a4976d044aae65180457cddd50bfe0fccfe70101c198b1f618a049776278bc"
      escalation_reasons:
        - "central_component:packages/core/src/runner"
        - "central_component:packages/core/src/tasks"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
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
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "5596b8a4b8f1aa1606a6447be17a5febfbb51c96"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-10T11:42:26.287Z"
doc_updated_by: "CODER"
description: "Repair canonical blocked implementation scope_extension_request dead end. Retain exact task record plan attempt claim result authority checkpoint bindings; require explicit USER approval of exact repository roots/effects with security-policy validation; native trusted intake amendment and fresh plan/resume. Preserve ordinary plan ceiling, repository-drift extension, failures and no pre-approval writes. No Factory or WS mutations."
sections:
  Summary: |-
    Admit exact pre-effect scope requests through native USER approval

    Repair canonical blocked implementation scope_extension_request dead end. Retain exact task record plan attempt claim result authority checkpoint bindings; require explicit USER approval of exact repository roots/effects with security-policy validation; native trusted intake amendment and fresh plan/resume. Preserve ordinary plan ceiling, repository-drift extension, failures and no pre-approval writes. No Factory or WS mutations.
  Scope: |-
    - In scope: Repair canonical blocked implementation scope_extension_request dead end. Retain exact task record plan attempt claim result authority checkpoint bindings; require explicit USER approval of exact repository roots/effects with security-policy validation; native trusted intake amendment and fresh plan/resume. Preserve ordinary plan ceiling, repository-drift extension, failures and no pre-approval writes. No Factory or WS mutations.
    - Out of scope: unrelated refactors not required for "Admit exact pre-effect scope requests through native USER approval".
  Plan: |-
    1. Execute approved WorkItem admit-pre-effect-scope-request.
    2. Execute approved WorkItem final-correction-037394fb27c7.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:9e553bf3ab4aeb08f88ccf9a74d72a507edf23c8c58f951e3e6c9624d72c2480"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610101141-AGRARP/f61a2280b66e1724fedefd655b67a8bf257c44b276a0153c2fd726e401523547/quality-report.json"
    findings:
      - "All 13 required context blocks and manifest 2be1b5efdd07f1813653fdfd69ab95621acd463e18e8ad06efb3850e5f8093c0 were read and hash-verified. Accepted result, repository evidence and native validation bind this exact item, claim, attempt, plan and controller commit."
      - "All 22 current source hashes match the independently reviewed frozen manifest c404dd3567522fbf68ae19db37f3c29b65b1550bf29a54b07c3fee1095e041cf. Current working changes are native own-task artifacts only. No remaining actionable source review findings were identified."
      - "State-bound prospective scope admission preserves the trusted intake ceiling, security checks and exact USER provenance. Fresh planning retains unchanged completed definitions, accepted outputs, validation and attempt history; changed or removed completed work rejects."
      - "The explicit restoration selector and read-only preview authenticate accepted result, independent inspection, native validation, completion and reset lineage. Later proof inventory derives from authenticated event kinds, including nonstandard mutation-ID rejection; forged, missing, stale, active or newer accepted work fails closed. Restoration appends a receipt without consumer effects or implicit final completion."
      - "The report raw digest 521a73b4f5b04dc5cfe068b24189103e532d12d8569c7fe3adc594950071fb1d, ten paired check receipts/logs and six additional evidence files verify. Earlier 22-test coverage is labeled pre-incremental; final affected repeated-review/path cases pass three tests and final event-kind restoration case passes one. Core regression records 65 passing tests before the final targeted correction."
      - "All three native mandatory checks passed at the exact commit: typecheck, lint and format. Three manifest hashes and all nine raw observation files verify. Lint has zero errors and four retained duplicate-import warnings. Runtime/toolchain/environment bindings were inspected; no new tests were run by this evaluator."
      - "Generic command compatibility artifacts and generated-reference freshness are qualified; immutable baseline remains unchanged. Historical failed evidence is retained. No Factory-specific product branch or actual consumer restoration is claimed."
    implementation_commit: "5596b8a4b8f1aa1606a6447be17a5febfbb51c96"
    implementation_tree: "bc2d22f6ab6a210910ef8025194b735d21c78a52"
    projected_at: "2026-10-10T23:44:22.687Z"
    review_identity_digest: "sha256:3eecd9ee55afead873931599e8c5fa998288572cd9475c04910d266eeb713be6"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:15cecb064163bdb94b6378638dc2e8c47c7bb97dd4dc4f571341db9cf1b10063"
    work_order_id: "sha256:d29112739fb10fc11c5bf8576a91da433c4545684e2e397a6fc13eb866773e91"
  task_execution_context:
    base_ref: "main"
    base_sha: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f072d542dc6fad2ff22e115b72e66096a1e1221a8fa58d1ca3f37471424665f2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/compatibility"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
            task_id: "202610101141-AGRARP"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:72d346bd1760a30e7a828a54dfb36f1aa199c645bf503fe598fe2fe75b9305c3"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f072d542dc6fad2ff22e115b72e66096a1e1221a8fa58d1ca3f37471424665f2"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/compatibility"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:50c803989c7906b6070379b7d25e530f1317e281dbb1f6337a924189b2d393d2"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:743d664124c610f37ca801da491537e49bc54cae44cd973b46ef1d75a26f50a9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
              kind: "USER"
              parent_authority_digest: "sha256:72d346bd1760a30e7a828a54dfb36f1aa199c645bf503fe598fe2fe75b9305c3"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/compatibility"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - ".agentplane/policy/context.must.md"
              - ".agentplane/policy/dod.core.md"
              - ".agentplane/policy/dod.docs.md"
              - ".agentplane/policy/examples/migration-note.md"
              - ".agentplane/policy/governance.md"
              - ".agentplane/policy/security.must.md"
              - ".agentplane/policy/workflow.branch_pr.md"
              - ".agentplane/policy/workflow.direct.md"
              - ".agentplane/policy/workflow.md"
              - ".agentplane/policy/workflow.release.md"
              - ".agentplane/policy/workflow.upgrade.md"
              - ".prettierignore"
              - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
              - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
              - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
              - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
              - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
              - "bun.lock"
              - "context/wiki/index.md"
              - "context/wiki/proposals/index.md"
              - "context/wiki/proposals/task-harvest/index.md"
              - "context/wiki/release-docs/concepts/index.md"
              - "context/wiki/release-docs/domains/index.md"
              - "context/wiki/release-docs/release-lines/index.md"
              - "context/wiki/reports/index.md"
              - "context/wiki/task-harvest/index.md"
              - "docs/developer/modular-prompt-assembly.mdx"
              - "docs/developer/testing-and-quality.mdx"
              - "docs/releases/v0.7.1.md"
              - "docs/releases/v0.7.13-acceptance.md"
              - "docs/releases/v0.7.13.md"
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "eslint.config.cjs"
              - "package.json"
              - "packages/agentplane/assets/AGENTS.md"
              - "packages/agentplane/assets/RUNNER.md"
              - "packages/agentplane/assets/policy/context.must.md"
              - "packages/agentplane/assets/policy/dod.core.md"
              - "packages/agentplane/assets/policy/dod.docs.md"
              - "packages/agentplane/assets/policy/examples/migration-note.md"
              - "packages/agentplane/assets/policy/governance.md"
              - "packages/agentplane/assets/policy/security.must.md"
              - "packages/agentplane/assets/policy/workflow.branch_pr.md"
              - "packages/agentplane/assets/policy/workflow.direct.md"
              - "packages/agentplane/assets/policy/workflow.md"
              - "packages/agentplane/assets/policy/workflow.release.md"
              - "packages/agentplane/assets/policy/workflow.upgrade.md"
              - "packages/agentplane/package.json"
              - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-projector.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/agents/agents-template.test.ts"
              - "packages/agentplane/src/agents/agents-template.ts"
              - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
              - "packages/agentplane/src/backends/task-backend/shared/types.ts"
              - "packages/agentplane/src/cli/command-invocations.ts"
              - "packages/agentplane/src/cli/error-map.ts"
              - "packages/agentplane/src/cli/help.all-commands.contract.test.ts"
              - "packages/agentplane/src/cli/reason-codes.ts"
              - "packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
              - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
              - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
              - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
              - "packages/agentplane/src/cli/run-cli/globals.ts"
              - "packages/agentplane/src/cli/spec/help.ts"
              - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
              - "packages/agentplane/src/cli/verification-contract.test.ts"
              - "packages/agentplane/src/commands/branch/cleanup-merged-proof.ts"
              - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
              - "packages/agentplane/src/commands/context/assimilation-supervisor.unit.test.ts"
              - "packages/agentplane/src/commands/context/context.spec.ts"
              - "packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
              - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
              - "packages/agentplane/src/commands/evidence/evidence.command.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-close.ts"
              - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
              - "packages/agentplane/src/commands/guard/impl/commit.ts"
              - "packages/agentplane/src/commands/pr/flow-status.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
              - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
              - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
              - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
              - "packages/agentplane/src/commands/recipes.list.test.ts"
              - "packages/agentplane/src/commands/recipes/impl/index.ts"
              - "packages/agentplane/src/commands/shared/canonical-task-owner.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/shared/hook-shim-template.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
              - "packages/agentplane/src/commands/shared/native-task-identity.ts"
              - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
              - "packages/agentplane/src/commands/shared/reconcile-canonical-scope.test.ts"
              - "packages/agentplane/src/commands/shared/reconcile-check.ts"
              - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
              - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
              - "packages/agentplane/src/commands/shared/route-guidance.ts"
              - "packages/agentplane/src/commands/shared/route-oracle.ts"
              - "packages/agentplane/src/commands/shared/source-confidence.ts"
              - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
              - "packages/agentplane/src/commands/shared/task-backend.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
              - "packages/agentplane/src/commands/shared/task-mutation.ts"
              - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
              - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
              - "packages/agentplane/src/commands/task/active.command.ts"
              - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
              - "packages/agentplane/src/commands/task/close-duplicate.command.ts"
              - "packages/agentplane/src/commands/task/close-duplicate.ts"
              - "packages/agentplane/src/commands/task/close-noop.command.ts"
              - "packages/agentplane/src/commands/task/close-noop.ts"
              - "packages/agentplane/src/commands/task/comment.ts"
              - "packages/agentplane/src/commands/task/comment.unit.test.ts"
              - "packages/agentplane/src/commands/task/configured-authority.test.ts"
              - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
              - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
              - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
              - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
              - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
              - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
              - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
              - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-authority-delta-stop.ts"
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
              - "packages/agentplane/src/commands/task/kernel-bookkeeping.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
              - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-cutover.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
              - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
              - "packages/agentplane/src/commands/task/kernel-work-order.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-preparation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-preparation.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/new-duplicates.test.ts"
              - "packages/agentplane/src/commands/task/new-duplicates.ts"
              - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/agentplane/src/commands/task/run-render.ts"
              - "packages/agentplane/src/commands/task/scaffold.ts"
              - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
              - "packages/agentplane/src/commands/task/verification-observation.test.ts"
              - "packages/agentplane/src/commands/task/verification-observation.ts"
              - "packages/agentplane/src/commands/workflow.test.ts"
              - "packages/agentplane/src/context/ingest-task-pack.test.ts"
              - "packages/agentplane/src/context/ingest-task.ts"
              - "packages/agentplane/src/context/knowledge-ref.ts"
              - "packages/agentplane/src/harness/state-machine.ts"
              - "packages/agentplane/src/policy/taxonomy.ts"
              - "packages/agentplane/src/ports/kernel-authority.ts"
              - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
              - "packages/agentplane/src/runner/context/recipe-role-context.ts"
              - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
              - "packages/agentplane/src/runner/context/work-order-context.ts"
              - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
              - "packages/agentplane/src/runner/result-manifest.ts"
              - "packages/agentplane/src/runner/run-record-profile.ts"
              - "packages/agentplane/src/runner/types/state.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
              - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority-validation.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
              - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
              - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
              - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
              - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
              - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
              - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
              - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
              - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
              - "packages/agentplane/src/runtime/harness/types.ts"
              - "packages/agentplane/src/runtime/prompt-modules/model.ts"
              - "packages/agentplane/src/runtime/sgr/contract-types.ts"
              - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
              - "packages/agentplane/src/runtime/task-execution-context/model.ts"
              - "packages/agentplane/src/shared/package-paths.ts"
              - "packages/agentplane/src/shared/preparation-trace.ts"
              - "packages/agentplane/src/shared/sqlite-driver.ts"
              - "packages/agentplane/src/workflow-runtime/migration.ts"
              - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
              - "packages/core/package.json"
              - "packages/core/schemas/agent-work-order-v2.schema.json"
              - "packages/core/schemas/config.schema.json"
              - "packages/core/schemas/task-handoff.schema.json"
              - "packages/core/schemas/task-readme-frontmatter.schema.json"
              - "packages/core/schemas/tasks-export.schema.json"
              - "packages/core/schemas/workflow.schema.json"
              - "packages/core/src/config/schema.impl.ts"
              - "packages/core/src/git/git-utils.ts"
              - "packages/core/src/index.ts"
              - "packages/core/src/process/run-process.observation.test.ts"
              - "packages/core/src/process/run-process.ts"
              - "packages/core/src/runner/agent-work-order.ts"
              - "packages/core/src/runner/knowledge-ref.ts"
              - "packages/core/src/runner/recipe-role-context.test.ts"
              - "packages/core/src/runner/recipe-role-context.ts"
              - "packages/core/src/runner/runner-effect-operation.ts"
              - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
              - "packages/core/src/runner/supervisor-execution-episode.ts"
              - "packages/core/src/schemas/index.ts"
              - "packages/core/src/schemas/iso-timestamp.test.ts"
              - "packages/core/src/schemas/iso-timestamp.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/kernel-plan-refinement.ts"
              - "packages/core/src/tasks/kernel-semantic.ts"
              - "packages/core/src/tasks/plan-execution-grant.ts"
              - "packages/core/src/tasks/supplied-plan-aggregate.ts"
              - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
              - "packages/core/src/tasks/task-artifact-schema.shared.ts"
              - "packages/core/src/tasks/task-centric/model.ts"
              - "packages/core/src/tasks/task-centric/schema.ts"
              - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/bookkeeping.test.ts"
              - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
              - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
              - "packages/core/src/tasks/task-kernel/final-recovery.test.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/invariants.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-store.ts"
              - "packages/recipes/package.json"
              - "packages/recipes/src/compiled-contracts.ts"
              - "packages/recipes/src/manifest-contracts.ts"
              - "packages/recipes/src/manifest.ts"
              - "packages/spec/schemas/agent-work-order-v2.schema.json"
              - "packages/spec/schemas/config.schema.json"
              - "packages/spec/schemas/task-handoff.schema.json"
              - "packages/spec/schemas/task-readme-frontmatter.schema.json"
              - "packages/spec/schemas/tasks-export.schema.json"
              - "packages/spec/schemas/workflow.schema.json"
              - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
              - "schemas/agent-semantic-result.schema.json"
              - "schemas/agent-work-order-v2.schema.json"
              - "schemas/config.schema.json"
              - "schemas/execution-receipt.schema.json"
              - "schemas/task-handoff.schema.json"
              - "schemas/task-readme-frontmatter.schema.json"
              - "schemas/tasks-export.schema.json"
              - "schemas/workflow.schema.json"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/baselines/v0.7-pr6095-cli-review.json"
              - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
              - "scripts/bench/internal/paired-m05/app-server-port.mjs"
              - "scripts/bench/internal/paired-m05/boundary.mjs"
              - "scripts/bench/internal/paired-m05/boundary.test.mjs"
              - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
              - "scripts/bench/internal/paired-m05/broker-worker.mjs"
              - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
              - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
              - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
              - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-host.mjs"
              - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
              - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
              - "scripts/bench/internal/paired-m05/contract.mjs"
              - "scripts/bench/internal/paired-m05/isolation.mjs"
              - "scripts/bench/internal/paired-m05/isolation.test.mjs"
              - "scripts/bench/internal/paired-m05/journal.mjs"
              - "scripts/bench/internal/paired-m05/landlock-runner.py"
              - "scripts/bench/internal/paired-m05/ledger.mjs"
              - "scripts/bench/internal/paired-m05/ledger.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
              - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
              - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
              - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
              - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
              - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
              - "scripts/bench/internal/paired-m05/report.mjs"
              - "scripts/bench/internal/paired-m05/report.test.mjs"
              - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
              - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
              - "scripts/bench/internal/paired-m05/stable-file.mjs"
              - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
              - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
              - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
              - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
              - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
              - "scripts/bench/internal/paired-m05/subscription-report.mjs"
              - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
              - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
              - "scripts/bench/internal/paired-m05/subscription.test.mjs"
              - "scripts/bench/paired-live-codex-launcher.mjs"
              - "scripts/bench/paired-live-codex-launcher.test.mjs"
              - "scripts/bench/paired-m05-offline.test.mjs"
              - "scripts/bench/paired-m05-setup.mjs"
              - "scripts/bench/paired-production-driver.mjs"
              - "scripts/bench/paired-production-driver.test.mjs"
              - "scripts/bench/paired-result-report.mjs"
              - "scripts/bench/paired-result-report.test.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/run-local-ci-group.mjs"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-failures-reporter.mjs"
              - "scripts/lib/verification-observation.mjs"
              - "scripts/lib/verification-observation.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
              - "scripts/lib/verification-scheduler.test.mjs"
              - "scripts/release/check-local-tarball-install-smoke.mjs"
              - "scripts/release/installed-recipe-matrix.mjs"
              - "vitest.config.ts"
            evidence_digest: "sha256:dad3deb2f86a811a2d240166df5c3f00f9b82927d98e8e160534bdfd87fc382c"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
            repository_evidence_digest: "sha256:9a54c75b1f2c89fa80f94eb4ddd7178245780dddf73a1875ffcb5bd2a4928f87"
            request_digest: "sha256:d113ad6cc8f4d7788116579fe6d9db612fc2f851f1b61d2bb3e2c9012843e67d"
            request_task_revision: 7
            reviewed_base_import:
              canonical_record_digest: "sha256:5e7ac4d26d9bb69da01ad8b245218f2d6868e02d8f15e1182ec5b06f3df649b4"
              checkpoint_digest: "sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
              imported_paths:
                - ".agentplane/policy/context.must.md"
                - ".agentplane/policy/dod.core.md"
                - ".agentplane/policy/dod.docs.md"
                - ".agentplane/policy/examples/migration-note.md"
                - ".agentplane/policy/governance.md"
                - ".agentplane/policy/security.must.md"
                - ".agentplane/policy/workflow.branch_pr.md"
                - ".agentplane/policy/workflow.direct.md"
                - ".agentplane/policy/workflow.md"
                - ".agentplane/policy/workflow.release.md"
                - ".agentplane/policy/workflow.upgrade.md"
                - ".prettierignore"
                - "artifacts/bench/m05-live-0.7.13/broker-qualification.md"
                - "artifacts/bench/m05-live-0.7.13/coding-corpus-qualification.json"
                - "artifacts/bench/m05-live-0.7.13/oracle-framing-qualification.json"
                - "artifacts/bench/m05-live-0.7.13/subscription-protocol.md"
                - "artifacts/bench/m05-live-0.7.13/subscription-registration.json"
                - "bun.lock"
                - "context/wiki/index.md"
                - "context/wiki/proposals/index.md"
                - "context/wiki/proposals/task-harvest/index.md"
                - "context/wiki/release-docs/concepts/index.md"
                - "context/wiki/release-docs/domains/index.md"
                - "context/wiki/release-docs/release-lines/index.md"
                - "context/wiki/reports/index.md"
                - "context/wiki/task-harvest/index.md"
                - "docs/developer/modular-prompt-assembly.mdx"
                - "docs/developer/testing-and-quality.mdx"
                - "docs/releases/v0.7.1.md"
                - "docs/releases/v0.7.13-acceptance.md"
                - "docs/releases/v0.7.13.md"
                - "docs/user/cli-reference.generated.mdx"
                - "docs/user/task-lifecycle.mdx"
                - "eslint.config.cjs"
                - "package.json"
                - "packages/agentplane/assets/AGENTS.md"
                - "packages/agentplane/assets/RUNNER.md"
                - "packages/agentplane/assets/policy/context.must.md"
                - "packages/agentplane/assets/policy/dod.core.md"
                - "packages/agentplane/assets/policy/dod.docs.md"
                - "packages/agentplane/assets/policy/examples/migration-note.md"
                - "packages/agentplane/assets/policy/governance.md"
                - "packages/agentplane/assets/policy/security.must.md"
                - "packages/agentplane/assets/policy/workflow.branch_pr.md"
                - "packages/agentplane/assets/policy/workflow.direct.md"
                - "packages/agentplane/assets/policy/workflow.md"
                - "packages/agentplane/assets/policy/workflow.release.md"
                - "packages/agentplane/assets/policy/workflow.upgrade.md"
                - "packages/agentplane/package.json"
                - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-backend-reconciliation.test.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-projector.ts"
                - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
                - "packages/agentplane/src/agents/agents-template.test.ts"
                - "packages/agentplane/src/agents/agents-template.ts"
                - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                - "packages/agentplane/src/backends/task-backend/shared/types.ts"
                - "packages/agentplane/src/cli/command-invocations.ts"
                - "packages/agentplane/src/cli/error-map.ts"
                - "packages/agentplane/src/cli/help.all-commands.contract.test.ts"
                - "packages/agentplane/src/cli/reason-codes.ts"
                - "packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-projection.testkit.ts"
                - "packages/agentplane/src/cli/run-cli.core.roadmap-recipe-v2-entrypoint.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog-loader.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/command-session.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
                - "packages/agentplane/src/cli/run-cli/commands/core/preflight-report-drift.ts"
                - "packages/agentplane/src/cli/run-cli/commands/init/model.ts"
                - "packages/agentplane/src/cli/run-cli/deferred-runtime-loader.ts"
                - "packages/agentplane/src/cli/run-cli/globals.ts"
                - "packages/agentplane/src/cli/spec/help.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/agentplane/src/cli/verification-contract.test.ts"
                - "packages/agentplane/src/commands/branch/cleanup-merged-proof.ts"
                - "packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                - "packages/agentplane/src/commands/context/assimilation-supervisor.unit.test.ts"
                - "packages/agentplane/src/commands/context/context.spec.ts"
                - "packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-artifact-port.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-evidence-store.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-work-order.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator.command.ts"
                - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
                - "packages/agentplane/src/commands/evidence/evidence.command.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-close.ts"
                - "packages/agentplane/src/commands/guard/impl/commit-diagnostics.ts"
                - "packages/agentplane/src/commands/guard/impl/commit.ts"
                - "packages/agentplane/src/commands/pr/flow-status.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.protected-base.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
                - "packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts"
                - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
                - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-frozen-base.test.ts"
                - "packages/agentplane/src/commands/recipes.list.test.ts"
                - "packages/agentplane/src/commands/recipes/impl/index.ts"
                - "packages/agentplane/src/commands/shared/canonical-task-owner.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/shared/hook-shim-template.ts"
                - "packages/agentplane/src/commands/shared/native-task-identity-fixture.ts"
                - "packages/agentplane/src/commands/shared/native-task-identity.ts"
                - "packages/agentplane/src/commands/shared/prompt-graph-diagnostics.ts"
                - "packages/agentplane/src/commands/shared/reconcile-canonical-scope.test.ts"
                - "packages/agentplane/src/commands/shared/reconcile-check.ts"
                - "packages/agentplane/src/commands/shared/reconcile-native-applicability.test.ts"
                - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
                - "packages/agentplane/src/commands/shared/route-guidance.ts"
                - "packages/agentplane/src/commands/shared/route-oracle.ts"
                - "packages/agentplane/src/commands/shared/source-confidence.ts"
                - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-mutation.ts"
                - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-history-proof.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts"
                - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts"
                - "packages/agentplane/src/commands/task/active.command.ts"
                - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
                - "packages/agentplane/src/commands/task/advance-task-step.ts"
                - "packages/agentplane/src/commands/task/agent-work-context-contract.ts"
                - "packages/agentplane/src/commands/task/close-duplicate.command.ts"
                - "packages/agentplane/src/commands/task/close-duplicate.ts"
                - "packages/agentplane/src/commands/task/close-noop.command.ts"
                - "packages/agentplane/src/commands/task/close-noop.ts"
                - "packages/agentplane/src/commands/task/comment.ts"
                - "packages/agentplane/src/commands/task/comment.unit.test.ts"
                - "packages/agentplane/src/commands/task/configured-authority.test.ts"
                - "packages/agentplane/src/commands/task/corrective-authority.command.ts"
                - "packages/agentplane/src/commands/task/create-plan-proposal.test.ts"
                - "packages/agentplane/src/commands/task/create-plan-proposal.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-observation.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.observability.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-input.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts"
                - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
                - "packages/agentplane/src/commands/task/hosted-close-pr.types.ts"
                - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
                - "packages/agentplane/src/commands/task/kernel-accepted-repository-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-authority-delta-stop.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.test.ts"
                - "packages/agentplane/src/commands/task/kernel-bookkeeping.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.test.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-native-review.ts"
                - "packages/agentplane/src/commands/task/kernel-corrective-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-corrective-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-cutover.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.test.ts"
                - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.test.ts"
                - "packages/agentplane/src/commands/task/kernel-operational-projection.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.test.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-plan-proposal.ts"
                - "packages/agentplane/src/commands/task/kernel-plan.ts"
                - "packages/agentplane/src/commands/task/kernel-recipe-admission.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.test.ts"
                - "packages/agentplane/src/commands/task/kernel-report-only-completion.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-types.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-discovery.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.test.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-tree.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-diagnostics.test.ts"
                - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
                - "packages/agentplane/src/commands/task/kernel-work-order.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-preparation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-preparation.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "packages/agentplane/src/commands/task/new-duplicates.test.ts"
                - "packages/agentplane/src/commands/task/new-duplicates.ts"
                - "packages/agentplane/src/commands/task/plan-approve-reviewed-base.test.ts"
                - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                - "packages/agentplane/src/commands/task/run-render.ts"
                - "packages/agentplane/src/commands/task/scaffold.ts"
                - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                - "packages/agentplane/src/commands/task/verification-observation.test.ts"
                - "packages/agentplane/src/commands/task/verification-observation.ts"
                - "packages/agentplane/src/commands/workflow.test.ts"
                - "packages/agentplane/src/context/ingest-task-pack.test.ts"
                - "packages/agentplane/src/context/ingest-task.ts"
                - "packages/agentplane/src/context/knowledge-ref.ts"
                - "packages/agentplane/src/harness/state-machine.ts"
                - "packages/agentplane/src/policy/taxonomy.ts"
                - "packages/agentplane/src/ports/kernel-authority.ts"
                - "packages/agentplane/src/runner/context/prompt-module-bridge.ts"
                - "packages/agentplane/src/runner/context/recipe-role-context.ts"
                - "packages/agentplane/src/runner/context/roadmap-recipe-prompt.test.ts"
                - "packages/agentplane/src/runner/context/work-order-context.ts"
                - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
                - "packages/agentplane/src/runner/result-manifest.ts"
                - "packages/agentplane/src/runner/run-record-profile.ts"
                - "packages/agentplane/src/runner/types/state.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                - "packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority-validation.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
                - "packages/agentplane/src/runner/usecases/kernel-policy-renewal.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-retrieval-query.ts"
                - "packages/agentplane/src/runner/usecases/task-knowledge-semantic-escalation.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim-record.ts"
                - "packages/agentplane/src/runner/usecases/task-run-active-claim.testkit.ts"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                - "packages/agentplane/src/runner/usecases/task-run-effect-resolution.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-lifecycle-result.ts"
                - "packages/agentplane/src/runner/usecases/task-run-missing-state-authority.ts"
                - "packages/agentplane/src/runner/usecases/task-run-orphaned-effect-guard.ts"
                - "packages/agentplane/src/runtime/harness/types.ts"
                - "packages/agentplane/src/runtime/prompt-modules/model.ts"
                - "packages/agentplane/src/runtime/sgr/contract-types.ts"
                - "packages/agentplane/src/runtime/shared/repo-cli-version.ts"
                - "packages/agentplane/src/runtime/task-execution-context/model.ts"
                - "packages/agentplane/src/shared/package-paths.ts"
                - "packages/agentplane/src/shared/preparation-trace.ts"
                - "packages/agentplane/src/shared/sqlite-driver.ts"
                - "packages/agentplane/src/workflow-runtime/migration.ts"
                - "packages/agentplane/test-fixtures/task-worktree-foreign-artifact-repair-fixture.ts"
                - "packages/core/package.json"
                - "packages/core/schemas/agent-work-order-v2.schema.json"
                - "packages/core/schemas/config.schema.json"
                - "packages/core/schemas/task-handoff.schema.json"
                - "packages/core/schemas/task-readme-frontmatter.schema.json"
                - "packages/core/schemas/tasks-export.schema.json"
                - "packages/core/schemas/workflow.schema.json"
                - "packages/core/src/config/schema.impl.ts"
                - "packages/core/src/git/git-utils.ts"
                - "packages/core/src/index.ts"
                - "packages/core/src/process/run-process.observation.test.ts"
                - "packages/core/src/process/run-process.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "packages/core/src/runner/knowledge-ref.ts"
                - "packages/core/src/runner/recipe-role-context.test.ts"
                - "packages/core/src/runner/recipe-role-context.ts"
                - "packages/core/src/runner/runner-effect-operation.ts"
                - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/schemas/index.ts"
                - "packages/core/src/schemas/iso-timestamp.test.ts"
                - "packages/core/src/schemas/iso-timestamp.ts"
                - "packages/core/src/tasks/index.ts"
                - "packages/core/src/tasks/kernel-plan-refinement.ts"
                - "packages/core/src/tasks/kernel-semantic.ts"
                - "packages/core/src/tasks/plan-execution-grant.ts"
                - "packages/core/src/tasks/supplied-plan-aggregate.ts"
                - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
                - "packages/core/src/tasks/task-artifact-schema.shared.ts"
                - "packages/core/src/tasks/task-centric/model.ts"
                - "packages/core/src/tasks/task-centric/schema.ts"
                - "packages/core/src/tasks/task-kernel/authority-delta.test.ts"
                - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
                - "packages/core/src/tasks/task-kernel/bookkeeping.test.ts"
                - "packages/core/src/tasks/task-kernel/corrective-authority.test.ts"
                - "packages/core/src/tasks/task-kernel/corrective-authority.ts"
                - "packages/core/src/tasks/task-kernel/final-recovery.test.ts"
                - "packages/core/src/tasks/task-kernel/index.ts"
                - "packages/core/src/tasks/task-kernel/invariants.ts"
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/model.ts"
                - "packages/core/src/tasks/task-store.ts"
                - "packages/recipes/package.json"
                - "packages/recipes/src/compiled-contracts.ts"
                - "packages/recipes/src/manifest-contracts.ts"
                - "packages/recipes/src/manifest.ts"
                - "packages/spec/schemas/agent-work-order-v2.schema.json"
                - "packages/spec/schemas/config.schema.json"
                - "packages/spec/schemas/task-handoff.schema.json"
                - "packages/spec/schemas/task-readme-frontmatter.schema.json"
                - "packages/spec/schemas/tasks-export.schema.json"
                - "packages/spec/schemas/workflow.schema.json"
                - "packages/testkit/src/cli-harness/temp-root-cleanup.integration.test.ts"
                - "schemas/agent-semantic-result.schema.json"
                - "schemas/agent-work-order-v2.schema.json"
                - "schemas/config.schema.json"
                - "schemas/execution-receipt.schema.json"
                - "schemas/task-handoff.schema.json"
                - "schemas/task-readme-frontmatter.schema.json"
                - "schemas/tasks-export.schema.json"
                - "schemas/workflow.schema.json"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/baselines/v0.7-pr6095-cli-review.json"
                - "scripts/bench/internal/paired-m05/app-server-host-probe.mjs"
                - "scripts/bench/internal/paired-m05/app-server-port.mjs"
                - "scripts/bench/internal/paired-m05/boundary.mjs"
                - "scripts/bench/internal/paired-m05/boundary.test.mjs"
                - "scripts/bench/internal/paired-m05/broker-configuration.mjs"
                - "scripts/bench/internal/paired-m05/broker-worker.mjs"
                - "scripts/bench/internal/paired-m05/broker-worker.test.mjs"
                - "scripts/bench/internal/paired-m05/brokered-app-server.mjs"
                - "scripts/bench/internal/paired-m05/brokered-app-server.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-corpus.mjs"
                - "scripts/bench/internal/paired-m05/coding-corpus.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-host.mjs"
                - "scripts/bench/internal/paired-m05/coding-host.test.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe-package.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe.mjs"
                - "scripts/bench/internal/paired-m05/coding-recipe.test.mjs"
                - "scripts/bench/internal/paired-m05/contract.mjs"
                - "scripts/bench/internal/paired-m05/isolation.mjs"
                - "scripts/bench/internal/paired-m05/isolation.test.mjs"
                - "scripts/bench/internal/paired-m05/journal.mjs"
                - "scripts/bench/internal/paired-m05/landlock-runner.py"
                - "scripts/bench/internal/paired-m05/ledger.mjs"
                - "scripts/bench/internal/paired-m05/ledger.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-cli.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-evidence.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-loop.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-loop.test.mjs"
                - "scripts/bench/internal/paired-m05/native-coding-port.mjs"
                - "scripts/bench/internal/paired-m05/public-compiler-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-compiler-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-interface-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-interface-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-package-feedback.mjs"
                - "scripts/bench/internal/paired-m05/public-package-feedback.test.mjs"
                - "scripts/bench/internal/paired-m05/public-product-contract.mjs"
                - "scripts/bench/internal/paired-m05/qualify-oracle-framing.mjs"
                - "scripts/bench/internal/paired-m05/report.mjs"
                - "scripts/bench/internal/paired-m05/report.test.mjs"
                - "scripts/bench/internal/paired-m05/semantic-coding-port.mjs"
                - "scripts/bench/internal/paired-m05/semantic-coding-port.test.mjs"
                - "scripts/bench/internal/paired-m05/stable-file.mjs"
                - "scripts/bench/internal/paired-m05/stable-file.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription-analysis.mjs"
                - "scripts/bench/internal/paired-m05/subscription-boundary.mjs"
                - "scripts/bench/internal/paired-m05/subscription-contract.mjs"
                - "scripts/bench/internal/paired-m05/subscription-ledger.mjs"
                - "scripts/bench/internal/paired-m05/subscription-registration.mjs"
                - "scripts/bench/internal/paired-m05/subscription-report.mjs"
                - "scripts/bench/internal/paired-m05/subscription-report.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription-setup-host.mjs"
                - "scripts/bench/internal/paired-m05/subscription-setup-host.test.mjs"
                - "scripts/bench/internal/paired-m05/subscription.test.mjs"
                - "scripts/bench/paired-live-codex-launcher.mjs"
                - "scripts/bench/paired-live-codex-launcher.test.mjs"
                - "scripts/bench/paired-m05-offline.test.mjs"
                - "scripts/bench/paired-m05-setup.mjs"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/run-local-ci-group.mjs"
                - "scripts/checks/run-local-ci.mjs"
                - "scripts/lib/local-ci-resource-profile.mjs"
                - "scripts/lib/local-ci-resource-profile.test.mjs"
                - "scripts/lib/verification-failures-reporter.mjs"
                - "scripts/lib/verification-observation.mjs"
                - "scripts/lib/verification-observation.test.mjs"
                - "scripts/lib/verification-scheduler.d.ts"
                - "scripts/lib/verification-scheduler.mjs"
                - "scripts/lib/verification-scheduler.test.mjs"
                - "scripts/release/check-local-tarball-install-smoke.mjs"
                - "scripts/release/installed-recipe-matrix.mjs"
                - "vitest.config.ts"
              mutation_receipt_digest: "sha256:ade4fdd2c0cc763d0037f204e141c5078f563dc65a988a3eec1874ce6c3ae93a"
              new_commit: "017f21d326d151c5ce6cbec4425ff112f4918095"
              old_commit: "3147d4ac685e60d4c93f1519f8b3825d3de5d7b1"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:302ed42f0ec64f12e4514e2e9e0742be8c6626ee48ca4ef6ae3ce0d1b3263493"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a1037e632113e19336df5536e1a46d5d2b79141b2b9eafcc9512773dee3cc288"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
              kind: "USER"
              parent_authority_digest: "sha256:743d664124c610f37ca801da491537e49bc54cae44cd973b46ef1d75a26f50a9"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:be17aee1d1aba371560214615dc02ab005fccce1fd5171fefcfa0864c90da992"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/compatibility"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "repository_write"
              - "source_code"
            added_scope_roots:
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            changed_paths:
              - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-request-adapter.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task-recovery.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request-paths.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/commands/task/scope-approve-request.command.ts"
              - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.test.ts"
              - "packages/core/src/tasks/task-kernel/prospective-scope.ts"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            evidence_digest: "sha256:e68ad3dc2177e747b1c9463aa3bc23e6311b74ee01fa2e89616e8fba04a81c6f"
            kind: "authority_delta"
            previous_fingerprint: "sha256:d29669a68097b4418cb7d156d65b9d5dc196769dc0510c6e70a804988f89e12e"
            repository_evidence_digest: "sha256:d27eff564cd290024e7842cef69b59e322d8b0a56a79424d676202b9935de56b"
            request_digest: "sha256:78764807327a890c64e61899b21d45c5b68299c1ddef904ad83d26912fd191cb"
            request_task_revision: 8
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:49cf816c9c0f387f789a8ed634c49b0480df61a06aa7b891d19ff03b33e8d012"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
              kind: "USER"
              parent_authority_digest: "sha256:a1037e632113e19336df5536e1a46d5d2b79141b2b9eafcc9512773dee3cc288"
            repository_effects:
              - "public_api"
              - "repository_write"
              - "schema"
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
              - "artifacts/compatibility"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/candidate-publication.md"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task-candidate.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
              - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-model.ts"
              - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
              - "packages/agentplane/src/commands/pr/internal/sync.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-store.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority-store.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
              - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
              - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
              - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-publication-spec.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
              - "packages/agentplane/src/commands/shared/workflow-step.ts"
              - "packages/agentplane/src/commands/task/authority-grant.command.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-admission.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-context.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-context.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-executor.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-executor.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-git.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-git.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-receipt.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-request.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-request.ts"
              - "packages/agentplane/src/commands/task/candidate-publication-tree.ts"
              - "packages/agentplane/src/commands/task/candidate-publication.command.test.ts"
              - "packages/agentplane/src/commands/task/candidate-publication.command.ts"
              - "packages/agentplane/src/commands/task/configured-authority.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
              - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.ts"
              - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
              - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
              - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
              - "packages/agentplane/src/shared/candidate-pre-push-script.ts"
              - "packages/testkit/src/agentplane-internal.ts"
              - "packages/testkit/src/candidate-publication.ts"
              - "packages/testkit/src/task.ts"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            evidence_digest: "sha256:da7c022722f910e95ecb289a0d02871e2d2a7194d87e28fc208bc225248bce2b"
            kind: "policy_renewal"
            previous_fingerprint: "sha256:be17aee1d1aba371560214615dc02ab005fccce1fd5171fefcfa0864c90da992"
            repository_evidence_digest: "sha256:e8c2831b02fc9128e971275b12b112e78b294a3dda0823cd66e206b804fd1499"
            request_digest: "sha256:7a4f652f79bbd86d2ae4e5dcdc1b58997611ab44c2a55994075dbeb412b2216d"
            request_task_revision: 9
            reviewed_base_import:
              canonical_record_digest: "sha256:cbb7d1e683a6bd01fd0f8cdafc4895d80940c27b28753dd3877b7e132ea60255"
              checkpoint_digest: "sha256:be17aee1d1aba371560214615dc02ab005fccce1fd5171fefcfa0864c90da992"
              imported_paths:
                - "docs/user/candidate-publication.md"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task-candidate.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.test.ts"
                - "packages/agentplane/src/commands/pr/internal/reviewed-publication-base.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-model.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
                - "packages/agentplane/src/commands/pr/internal/sync.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority-policy.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority-store.test.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority-store.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
                - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
                - "packages/agentplane/src/commands/shared/workflow-operation-effects.ts"
                - "packages/agentplane/src/commands/shared/workflow-operation-prefix.ts"
                - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
                - "packages/agentplane/src/commands/shared/workflow-postconditions.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-publication-spec.ts"
                - "packages/agentplane/src/commands/shared/workflow-step.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step.ts"
                - "packages/agentplane/src/commands/task/authority-grant.command.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-admission.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-context.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-context.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-executor.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-executor.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-git.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-git.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-receipt.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-request.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-request.ts"
                - "packages/agentplane/src/commands/task/candidate-publication-tree.ts"
                - "packages/agentplane/src/commands/task/candidate-publication.command.test.ts"
                - "packages/agentplane/src/commands/task/candidate-publication.command.ts"
                - "packages/agentplane/src/commands/task/configured-authority.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
                - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts"
                - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-reviewed-base-import.test.ts"
                - "packages/agentplane/src/commands/task/kernel-rework-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request-evidence.ts"
                - "packages/agentplane/src/commands/task/kernel-scope-request.ts"
                - "packages/agentplane/src/commands/task/kernel-scoped-intake.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.test.ts"
                - "packages/agentplane/src/commands/task/kernel-semantic-result.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
                - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
                - "packages/agentplane/src/shared/candidate-pre-push-script.ts"
                - "packages/testkit/src/agentplane-internal.ts"
                - "packages/testkit/src/candidate-publication.ts"
                - "packages/testkit/src/task.ts"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              mutation_receipt_digest: "sha256:ade4fdd2c0cc763d0037f204e141c5078f563dc65a988a3eec1874ce6c3ae93a"
              new_commit: "7b46bd63fa10785c36420ee627c01d814171497b"
              old_commit: "b44a9feef5a80f8d1f2363ce45655b89a9e27267"
              overlay_digest: "sha256:4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945"
              work_order_digest: "sha256:dd7c9cc94f10e6d3dd0aaa530f35d62c183f44550edf087f046398801e350346"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ba87415845657f70d1166d458ff99bfefed5b8649ed4acb7dc3545fa2ab5a29c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
              kind: "USER"
              parent_authority_digest: "sha256:49cf816c9c0f387f789a8ed634c49b0480df61a06aa7b891d19ff03b33e8d012"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
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
              - "artifacts/compatibility"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:a82c680a470a6d103d2830d9b18b9db25cf49043a0cebdc5fa9de116517c6e7d"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            request_digest: "sha256:3fbd6313f7392dd9dc4364d0cbdb25fe69a7cfbd86d4fdc13096497cc2c6a506"
            scope_request:
              attempt: 2
              claim_id: "sha256:54729800e423aa0333d37cf0af09be123d40f0384e3228cc7efe33fbc2223342"
              contract_digest: "sha256:594500aa3a54c55b558a412fd6ee406fe00345efd631cb78ccb49be0dbafa876"
              intake_after_digest: "sha256:3509696f3c92b256bb7743918b7bdf70175c7571b8ecf4ad66586bbba4bb086c"
              intake_before_digest: "sha256:cd5aa58b62977dc263cbd771a70ef4693ec974db32ebff88ade123c4118e5d50"
              parent_authority_digest: "sha256:49cf816c9c0f387f789a8ed634c49b0480df61a06aa7b891d19ff03b33e8d012"
              plan_digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
              plan_revision: 1
              record_digest: "sha256:210546274d0db20715f959f43e58013077d87347aca2279388a8133e94455792"
              repository_effects:
                - "documentation"
                - "repository_write"
                - "source_code"
              repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:b58919226eea823a71fe1a42dd751b8162e3c9e03200ea038eb5d794e41ffc59"
              scope_roots:
                - "docs/user/cli-reference.generated.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              stop_receipt_digest: "sha256:bcec74124a27508f3711c8b03216ab73692b35419b0a8b484a3f8171e6b294a6"
              task_id: "202610101141-AGRARP"
              task_revision: 17
              work_item_id: "admit-pre-effect-scope-request"
              work_order_id: "sha256:012c6e99b5daa39deab0710a4fd1659b468950e55194b6f33b346999fc696941"
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:8ad440ac0f80d2c578006bf5781faa8978d7838f305057e1f162c72848304010"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:011302671fa3ee91e0159fedd44bdb59b61a4c7f056c1b7797fcbb333f1b9b62"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2c5662e9f5a7bfb090ffcab646fe13a8b02d9a960cbc32f103d9fdf4ea9edb7b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
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
              - "artifacts/compatibility"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b38bb1664861fa40945f6abd86520f888fef224c4c9a71d1b90bdfcebdb1d44a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:011302671fa3ee91e0159fedd44bdb59b61a4c7f056c1b7797fcbb333f1b9b62"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2c5662e9f5a7bfb090ffcab646fe13a8b02d9a960cbc32f103d9fdf4ea9edb7b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:8ad440ac0f80d2c578006bf5781faa8978d7838f305057e1f162c72848304010"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/compatibility"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.test.ts"
              - "packages/agentplane/src/adapters/task-backend/kernel-scope-intake.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task-recovery.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/kernel-completion-restoration-evidence.test.ts"
              - "packages/agentplane/src/commands/task/kernel-completion-restoration-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-exchange.ts"
              - "packages/agentplane/src/commands/task/kernel-recovery-evidence.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-replan-inputs.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.test.ts"
              - "packages/agentplane/src/commands/task/kernel-scope-request.ts"
              - "packages/agentplane/src/commands/task/kernel-work-item-restore-completion.command.ts"
              - "packages/agentplane/src/commands/task/kernel-work-item-restore-completion.test.ts"
              - "packages/agentplane/src/commands/task/kernel-work-item-restore-completion.ts"
              - "packages/core/src/tasks/task-kernel/completion-restoration.ts"
              - "packages/core/src/tasks/task-kernel/index.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.test.ts"
              - "packages/core/src/tasks/task-kernel/replan-work-items.ts"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            evidence_digest: "sha256:19cd061fe789f6c888a6ee891cd28501deb57df73e768897cd317a9bd6e4b53c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:94f5b52fed305df6acefe06b86d7b1a6c345a997c6dba1cdf3e8e47c016c1aa4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:76317420030ec162aacf57a7947e06ec6dff1d76f746e2c946b954e16f4e866f"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2c5662e9f5a7bfb090ffcab646fe13a8b02d9a960cbc32f103d9fdf4ea9edb7b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b38bb1664861fa40945f6abd86520f888fef224c4c9a71d1b90bdfcebdb1d44a"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "schema"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/compatibility"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/adapters/task-backend"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
              - "packages/spec"
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
            task_id: "202610101141-AGRARP"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:e2edf3e5e68971d7ea0e4d4181188dacc3e6f68828222375d2076b06b0cd8d8e"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:dd0221d4645dda9adf118508e4735194eed499ac79623b537b8b860c9225ccb4"
        digest: "sha256:76317420030ec162aacf57a7947e06ec6dff1d76f746e2c946b954e16f4e866f"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:cf6c4a0b5849987d193336aa37d30f07dce04f28b7a685e70fb54b4aaf6f6044"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "schema"
                - "security_boundary"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
                - "packages/spec"
                - "artifacts/compatibility"
                - "docs/user/cli-reference.generated.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "scope-request-correction-evidence"
            id: "admit-pre-effect-scope-request"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:6e9c01c5d34a03b9845a60d061a2b225ed11fe6691241f5e7da2f9f9ade63acd"
            depends_on:
              - "admit-pre-effect-scope-request"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "documentation"
                - "public_api"
                - "repository_write"
                - "schema"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "artifacts/compatibility"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/spec"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "final-correction-037394fb27c7-evidence"
            id: "final-correction-037394fb27c7"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610101141-AGRARP"
      intent_digest: "sha256:794bccebb3c9456bb7d3a59998fae7ff97a50767a00cb84b8f9c9926fb58e8d0"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:76317420030ec162aacf57a7947e06ec6dff1d76f746e2c946b954e16f4e866f:
          after_revision: 30
          aggregate_digest: "sha256:2ff286db816a745a20f61da5bebc1602bf6a798cc30683fd0db87da5c90b7e7f"
          before_revision: 29
          command_digest: "sha256:0107b41bf2c1258593d7b199651f351da187bacf6a566314192d37bc25b1b1df"
          effect_ids: []
          event_digests:
            - "sha256:3b8528982ec2c6fade36bcfb5428a9dc1b7ee32bf41d33271a3a11595df41e7f"
          mutation_id: "amend:sha256:76317420030ec162aacf57a7947e06ec6dff1d76f746e2c946b954e16f4e866f"
        capture:202610101141-AGRARP:
          after_revision: 1
          aggregate_digest: "sha256:10188b7b0597c792b2769c892fb3d14182946506ee40364dcc164e984d97f5a1"
          before_revision: 0
          command_digest: "sha256:2150ac2bbe51519ab663f183f9ac2329d474adc7b9d8b06b35b09915ee504e74"
          effect_ids: []
          event_digests:
            - "sha256:69ac89d67fedfaf980b25fddf70d6b8ae84120de1b44465a135983b0a90bae94"
          mutation_id: "capture:202610101141-AGRARP"
        final-validation:sha256:037394fb27c75ddf179f45f5e2eaa9af8cc39baff7fa4820be5446335e36b418:28:
          after_revision: 29
          aggregate_digest: "sha256:1f5956f83e590beeeeda20678cef76218f192574eb33e0d4fb5e25da631e09da"
          before_revision: 28
          command_digest: "sha256:b090bac30ccb2a5c7a9558d3b6c487cf793553d90678817fdd738aba57080b92"
          effect_ids: []
          event_digests:
            - "sha256:0cb2c8baf9259e197db2df31b786e5b6c804e2bf098ed8e5f85557e47414733f"
          mutation_id: "final-validation:sha256:037394fb27c75ddf179f45f5e2eaa9af8cc39baff7fa4820be5446335e36b418:28"
        kernel_work_item_claim_required:sha256:111d5dbe60c415bc379c18c96c3858f6df90dc4ba25f74928dd97ddfac73e242:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 5
          aggregate_digest: "sha256:7d0bdd2f2f4a174bc3b83c306639be1f34a8663d07a47f464b0690cc3fe1c7cc"
          before_revision: 4
          command_digest: "sha256:a9a4a59ca929e43b2aae654aa3c8a8dde0f5e96eb57e816565caa709ff022b05"
          effect_ids: []
          event_digests:
            - "sha256:7570d4311893c438ec01843207826a7fa5369d0f525535afbc976166c5bfd7f7"
          mutation_id: "kernel_work_item_claim_required:sha256:111d5dbe60c415bc379c18c96c3858f6df90dc4ba25f74928dd97ddfac73e242:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        kernel_work_item_claim_required:sha256:8ba9b1969b3bd04c0da6f53d328c046504139a5de4973a6ee5696e1c4116bb4b:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc:
          after_revision: 32
          aggregate_digest: "sha256:4ff25c6b934cb95392677b142658bdfe76b9ec3144c5a83797b26eaf56cf838b"
          before_revision: 31
          command_digest: "sha256:8de58d07dbb61bb76b2f99e85344ade2ce3fe46d452af0e3998a09b4d758752d"
          effect_ids: []
          event_digests:
            - "sha256:40bcfe8038ae1d62f6933916cd92570cd4313be77d551bf48e143daece7dc1fe"
          mutation_id: "kernel_work_item_claim_required:sha256:8ba9b1969b3bd04c0da6f53d328c046504139a5de4973a6ee5696e1c4116bb4b:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
        kernel_work_item_claim_required:sha256:d338ce6b3859bd9a64b2906ca27e9f8b531acc717263462bd278ddd96fdd99a6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 22
          aggregate_digest: "sha256:afc5ba93e5f1e157f039c4df98d4d6c5f75c3827bb3e7da946b7e077470749e6"
          before_revision: 21
          command_digest: "sha256:bc76c67be5ea9026762ff95007059a8ca66fcb3dd292b49344d301ad3865ad74"
          effect_ids: []
          event_digests:
            - "sha256:8f21aefbac0544a1aa98eb58772f25576a24e0d20d0a9f68283cb4dd178c24e0"
          mutation_id: "kernel_work_item_claim_required:sha256:d338ce6b3859bd9a64b2906ca27e9f8b531acc717263462bd278ddd96fdd99a6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:03b31d88289e66dbeb2727c19923a7b77e37dfb4d127051fe0400772165b448e:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:
          after_revision: 7
          aggregate_digest: "sha256:495e83dd0f9e0d720839fc95aa6e2cfeeb6923ee0e72dc91094ab7276546ddcb"
          before_revision: 6
          command_digest: "sha256:9e6d35a919fb7c68e444c244e331f5b399429c839e458a9e51cc8a02002acf92"
          effect_ids: []
          event_digests:
            - "sha256:61ca7459a5a7b972d2cdee4202224b514e23f73bffe4cd2de658446e74af802a"
          mutation_id: "kernel_work_item_execution_required:sha256:03b31d88289e66dbeb2727c19923a7b77e37dfb4d127051fe0400772165b448e:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        kernel_work_item_execution_required:sha256:a3b81bef6e4434f4189ec85e4a9d82eddd09a898151ff5d18f59a85f94aa95ba:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 23
          aggregate_digest: "sha256:d7afc8368992a2da9e46712402aa3628cdd64b5436f173f1a0fa48b53f114750"
          before_revision: 22
          command_digest: "sha256:c60e2c04dec45516fb89098f0854605112e22dee16d2a5b51f385f9876bece10"
          effect_ids: []
          event_digests:
            - "sha256:0670b8ca1e9090ee5bf4234990dd0991b51abebde9771101f90b00d55aadd725"
          mutation_id: "kernel_work_item_execution_required:sha256:a3b81bef6e4434f4189ec85e4a9d82eddd09a898151ff5d18f59a85f94aa95ba:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:c3892ba489f264125542ff3d16fb06fd6a590424ae25708a8d70bf0cab672a5e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 16
          aggregate_digest: "sha256:e4f9904f5ee58ce6510f5f74dd22662bc32a9ef5b9dbb1758f2307ff02af06c4"
          before_revision: 15
          command_digest: "sha256:53b63f10d4ff94ff08bec9d94d0f5587a99073e490453418aa1031577c71fc4d"
          effect_ids: []
          event_digests:
            - "sha256:8aa8473a45c1ab894d4dea84cea34727bd1593381fe2320e99e8f6ca46d1430f"
          mutation_id: "kernel_work_item_execution_required:sha256:c3892ba489f264125542ff3d16fb06fd6a590424ae25708a8d70bf0cab672a5e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:d061c8b202ad89801cbe4e55644e33fd25a4dcf7f601cb8d9cf352ec9c0d8588:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc:
          after_revision: 33
          aggregate_digest: "sha256:d359db55c44110c69bfd0a56d125fd52304265ff105123f59c86dd1ba8677639"
          before_revision: 32
          command_digest: "sha256:39ca93fbd761a51c8558bbe0df7505772d69948ccd9bf5d791ff7e12ddde3509"
          effect_ids: []
          event_digests:
            - "sha256:c7b85d7869e1fd68d0e4c6f520e0d7a01c50b238883f6aca29030b5c2dc40f2c"
          mutation_id: "kernel_work_item_execution_required:sha256:d061c8b202ad89801cbe4e55644e33fd25a4dcf7f601cb8d9cf352ec9c0d8588:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
        kernel_work_item_inspection_required:sha256:b940977d61a8460e855dfc824835d2cd9724ff6163cbd24b38ba6aa82424cec5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 12
          aggregate_digest: "sha256:c8ef79cbf3cb5e39722a109415de6a64feb19a0dce2bb4285bd332e907244639"
          before_revision: 11
          command_digest: "sha256:6b961e23f5e5673d641888730cc8db920d46409bd6ad1c0a061ccc634260457d"
          effect_ids: []
          event_digests:
            - "sha256:5a066feddc4c2f9363c227c243848dc06a1669f7053ccee091e9571de3da1d71"
          mutation_id: "kernel_work_item_inspection_required:sha256:b940977d61a8460e855dfc824835d2cd9724ff6163cbd24b38ba6aa82424cec5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_inspection_required:sha256:d0939c895f1affb308a1a06e6c9b3cf091fb4bf402a681b2d6a0d428316a3e95:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc:
          after_revision: 26
          aggregate_digest: "sha256:28d4259894560e7f789b79f6e3f2c050947c8cc9c1a94a46ef267fb2cbd76c60"
          before_revision: 25
          command_digest: "sha256:01a88c331ba6ff3f5bfa0e4bfa247f35be78d4e4208a068bfaee611ff5628230"
          effect_ids: []
          event_digests:
            - "sha256:8a020b74a964f2eec29f548dd9f9fa65366bf8b340dff0286f9ad163d9f1c509"
          mutation_id: "kernel_work_item_inspection_required:sha256:d0939c895f1affb308a1a06e6c9b3cf091fb4bf402a681b2d6a0d428316a3e95:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
        kernel_work_item_materialization_required:sha256:2bab57df526ed9b18002f125c324b4ada6e2fb254e145cef9e55cc8275eba158:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:
          after_revision: 4
          aggregate_digest: "sha256:71be5ed4bca7d64ec3efea4223a414b1d8ea091c2e8d8657dd799b1594cce21d"
          before_revision: 3
          command_digest: "sha256:759959dea5c0314ac9101623ee13858a07c05999c794ee28af113b3739f4d6ff"
          effect_ids: []
          event_digests:
            - "sha256:13a5a8c571dc3a96b4f04e1c440a594204c792a51318baa793353c6e23c04b80"
          mutation_id: "kernel_work_item_materialization_required:sha256:2bab57df526ed9b18002f125c324b4ada6e2fb254e145cef9e55cc8275eba158:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        kernel_work_item_materialization_required:sha256:59e914b0a2c5dcea16ceae94aeb222fa6d056387649282038e2a98680e8ebe68:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 21
          aggregate_digest: "sha256:c372a07cb7efa8c084bab1d62775b62aa13bc70ff5735f395203ba8cfd4b4e26"
          before_revision: 20
          command_digest: "sha256:1de5d25e9f1c5865765d306eb936cf83b4dbcfb1596eec3a882abea804b16962"
          effect_ids: []
          event_digests:
            - "sha256:0b00201efe1da5ca419f2b59c62996870f430ff4ff325fac9cdb6a8804337f85"
          mutation_id: "kernel_work_item_materialization_required:sha256:59e914b0a2c5dcea16ceae94aeb222fa6d056387649282038e2a98680e8ebe68:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_rework_claim_required:sha256:90eab13fce3150e792a5af71acfe7c57e1fe901eeac790442640d72b8dad7476:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 15
          aggregate_digest: "sha256:ce870386e35be819776da960a4ca63112de0838a53cb03a50a760ff05e9d2ffb"
          before_revision: 14
          command_digest: "sha256:f5e5f76a05e64b4e632b3d2651491e40d2987855fb5e18d14288acd971feee36"
          effect_ids: []
          event_digests:
            - "sha256:6106b944aeea2c7d9242ab471c7fa30cbf8720c7ce362f63e4d6694c13a77cb3"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:90eab13fce3150e792a5af71acfe7c57e1fe901eeac790442640d72b8dad7476:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        result:sha256:0a3aa2adadc9f270a952224b4f75f2fd9dc05d158a0c164845ba70e10178e4f7:
          after_revision: 2
          aggregate_digest: "sha256:91bc82e219fb021c4f69d1cd974e2d578c2b41aa9ab71a1b9a68147c51171da6"
          before_revision: 1
          command_digest: "sha256:50efef9f10e0f8c26703754361d1bf30423faadd41aa17068c4733aa57be3282"
          effect_ids: []
          event_digests:
            - "sha256:7b9c1f6db249b1517f20c305c9e94057fd6696be32296cf0b5f84e74c052e0e2"
          mutation_id: "result:sha256:0a3aa2adadc9f270a952224b4f75f2fd9dc05d158a0c164845ba70e10178e4f7"
        result:sha256:0da5bceeef4ef6ec3127e68fe26b316d138bee4f26c2bb2da03c036292c3338f:
          after_revision: 11
          aggregate_digest: "sha256:9a33b1e92494bd89e3b9e59da5d5aa4cdf94c08f56e1bc2b8f12e6efb919d2a6"
          before_revision: 10
          command_digest: "sha256:294cb80c3a470b68fec91df2b59c5deb7ef1316aee13dd5b6aea9aeb0612d3d9"
          effect_ids: []
          event_digests:
            - "sha256:fe5047cbf05084f7d439c4f871f14a20f7a8c12231335b9a2239485b0688d305"
          mutation_id: "result:sha256:0da5bceeef4ef6ec3127e68fe26b316d138bee4f26c2bb2da03c036292c3338f"
        result:sha256:32782d3c8cad99087550ed20ae7e6cca9801bf898058e26ae153c82e50eda9c0:
          after_revision: 19
          aggregate_digest: "sha256:bdf3f509962d77e7adfed4a6a04966d0efee1d6077ae20b2a0c529c4a964aee5"
          before_revision: 18
          command_digest: "sha256:aa54e282904122f9c94d1da60cf8895ed407e046889038d37f5c5e1a27e8e634"
          effect_ids: []
          event_digests:
            - "sha256:cbe88acce83b813c017052c454501efd29f74ccb9bed222ec27e23ffc99deeb5"
          mutation_id: "result:sha256:32782d3c8cad99087550ed20ae7e6cca9801bf898058e26ae153c82e50eda9c0"
        result:sha256:d29112739fb10fc11c5bf8576a91da433c4545684e2e397a6fc13eb866773e91:
          after_revision: 25
          aggregate_digest: "sha256:a6cad035a089dcd830469598ad0210a891557ecbdd0578220037cecdb9122246"
          before_revision: 24
          command_digest: "sha256:47c64ed626de61734935ae0591f3c1c5d3c43db14f176635e59f78922b43fc35"
          effect_ids: []
          event_digests:
            - "sha256:3aa86f877ef0a10b0aa22f41656fb6f608f881b6f74c98dbb1a19bcbe9d2e04b"
          mutation_id: "result:sha256:d29112739fb10fc11c5bf8576a91da433c4545684e2e397a6fc13eb866773e91"
        scope-request:sha256:3fbd6313f7392dd9dc4364d0cbdb25fe69a7cfbd86d4fdc13096497cc2c6a506:
          after_revision: 18
          aggregate_digest: "sha256:b57575b9c3518cd41d381e46cb027ed9b7e45103ba9722d7cdfbdd01b6ff9f14"
          before_revision: 17
          command_digest: "sha256:c7f5121dc88feea68cbc5fe59befd0114169f7b717459328a031af2f4a367ee1"
          effect_ids: []
          event_digests:
            - "sha256:c6f82addd078525024b027299e987518f5c531e3544c8f6775a081aa5a26986f"
          mutation_id: "scope-request:sha256:3fbd6313f7392dd9dc4364d0cbdb25fe69a7cfbd86d4fdc13096497cc2c6a506"
        semantic-stop:sha256:012c6e99b5daa39deab0710a4fd1659b468950e55194b6f33b346999fc696941:
          after_revision: 17
          aggregate_digest: "sha256:66021dad4e57446754332044ee136fb4a4ead892f0e8629115996260f12b2b73"
          before_revision: 16
          command_digest: "sha256:b430ea33e122c78c831fdb585c05403e6b75d3468e20d18bd16dd7d3cd4280bf"
          effect_ids: []
          event_digests:
            - "sha256:f5b43502c402e0cb5806668847a0b5e9960fd1078df1cded81dadf9dba452903"
          mutation_id: "semantic-stop:sha256:012c6e99b5daa39deab0710a4fd1659b468950e55194b6f33b346999fc696941"
        sha256:09b3fad1afdd6c62825b4059823980f47449acb6c54d38a0b91be474feb3f099:
          after_revision: 3
          aggregate_digest: "sha256:d946a3710176d116cdbc932e835917d8b103d1e7e4768ea9ac9444cc169e1284"
          before_revision: 2
          command_digest: "sha256:a78dc68e7894b258d13576e5046e8a06bbb33b7bec8bfb06dee1889357bc0861"
          effect_ids: []
          event_digests:
            - "sha256:00eb6b898beb810d9a31a7aa12362f790236cecd42140089ebcf51551fea797a"
          mutation_id: "sha256:09b3fad1afdd6c62825b4059823980f47449acb6c54d38a0b91be474feb3f099"
        sha256:2cf233af326875e5a11131538342756b739150d31f208a753150824c3f76afe9:
          after_revision: 31
          aggregate_digest: "sha256:d57c29681cf08c97909fb9c119b587abfb56047602ecf056350f7f62f1edd541"
          before_revision: 30
          command_digest: "sha256:f2db279cc16b0285310e6ff2754b33450fe38c485bf1511ea7d5cdd235ec593f"
          effect_ids: []
          event_digests:
            - "sha256:259791f2ee502eddeec895e73d9768ad129d001d78758f6421a6f4fbed5acf3a"
          mutation_id: "sha256:2cf233af326875e5a11131538342756b739150d31f208a753150824c3f76afe9"
        sha256:4613ac757b936a0ab306611e8def5722f3f51493c40cc54ede27efa4a4d9e44e:
          after_revision: 10
          aggregate_digest: "sha256:0b194d1786402a5f5bd872c058c34bf6ffee041d99987925824fc6a93476e4ff"
          before_revision: 9
          command_digest: "sha256:91f459382c4ad37f81a50eca7fecbd1ce05fbce724d007572e60f4995b5d15cf"
          effect_ids: []
          event_digests:
            - "sha256:cbaa83b8ef945aa6abdd7ad06bbcfe80fa8b903eaa9135d8e93c9b61469d68e0"
          mutation_id: "sha256:4613ac757b936a0ab306611e8def5722f3f51493c40cc54ede27efa4a4d9e44e"
        sha256:4761e4c2e5fd95e498122b75dc9f1b3e4bead02e7178d120f0a8fa72774c65c3:
          after_revision: 6
          aggregate_digest: "sha256:324dfb2ce1fb314aabbbec926fd54144d5a57032ab4c32844317d31aa6be5d88"
          before_revision: 5
          command_digest: "sha256:f72d82a0ee6d5085cab7e97790d67aea346285e3fced71a20de00cc1dde0e8b3"
          effect_ids: []
          event_digests:
            - "sha256:e9ca47f94fa626a93d988a6fdc46364a4a0a0ffdd68671527beacd7581ba5572"
          mutation_id: "sha256:4761e4c2e5fd95e498122b75dc9f1b3e4bead02e7178d120f0a8fa72774c65c3"
        sha256:833ab0b7ade75009689a89cd510ca7821cccd86bf92929dd02694cde68310d15:
          after_revision: 24
          aggregate_digest: "sha256:120d0c070926bf290ce03c982eac334fc402189fd4255f8ccffeed8fe480c15f"
          before_revision: 23
          command_digest: "sha256:781088426b3391485fc2665b43184a360fc6215a5e319fb9ac176237db83fb66"
          effect_ids: []
          event_digests:
            - "sha256:e88875f8e08a074fbb6b8c6d3705b84df173ecc0e4a0f74e415514be8615a453"
          mutation_id: "sha256:833ab0b7ade75009689a89cd510ca7821cccd86bf92929dd02694cde68310d15"
        sha256:cbb82d1968d1a5c423312f4fc082817c3ac7d292d8d33c610662e164ba05f491:
          after_revision: 9
          aggregate_digest: "sha256:44ba9522303d74f32b9ec96b5d11ac469d9b8b3416cdf45a7997a90eb909896c"
          before_revision: 8
          command_digest: "sha256:d12fd538978e29c4e6f813ec2b8bc7daca027e2d361754f8520d8024c3fae072"
          effect_ids: []
          event_digests:
            - "sha256:6386ef163b636f58ea3f7282e944f7efd0155751d00a9819e8dd7463333a71d7"
          mutation_id: "sha256:cbb82d1968d1a5c423312f4fc082817c3ac7d292d8d33c610662e164ba05f491"
        sha256:f952b4da84a3c90736c2db018c0d7fcc9f1069673a32048cdfe5a5d25482cfdc:
          after_revision: 20
          aggregate_digest: "sha256:e7a63a7ffa0edd0f7afd2d3d5c5244dd334f4b79deb4ca096aa2b0123162bad5"
          before_revision: 19
          command_digest: "sha256:2e525ebe8766f838ed4bef385981c90becdc2408a9b0c62add0282beebc745f6"
          effect_ids: []
          event_digests:
            - "sha256:ad6957a68fc7867db5f093f77c244ef1f11b869204096cdab74aa26a61581fc8"
          mutation_id: "sha256:f952b4da84a3c90736c2db018c0d7fcc9f1069673a32048cdfe5a5d25482cfdc"
        sha256:fd3d4126f8955cc25af69c4c086ee1bc3bf3caa470d004320d445e5f12c9cbd7:
          after_revision: 8
          aggregate_digest: "sha256:a50b1659f777c9fb7f5522a37536e22663433ed23694c6bd1c70b3f10de25cd9"
          before_revision: 7
          command_digest: "sha256:0277b9ae30c67fca213e1e661213f5ba7e568789d8babe755ce7643c69882d53"
          effect_ids: []
          event_digests:
            - "sha256:e58df984fee035fec34289864b0dd7045ea2f9803e06cc4496ce53a86112558f"
          mutation_id: "sha256:fd3d4126f8955cc25af69c4c086ee1bc3bf3caa470d004320d445e5f12c9cbd7"
        validation-resolution:sha256:ad400f7110c64addca14ec91a1c41474d302024bdf0959428b9fa56cdd493e30:
          after_revision: 14
          aggregate_digest: "sha256:7484505c563ef79022c05dbc21c80578ecb307ac51c84ebaf79b2d48d47d14d4"
          before_revision: 13
          command_digest: "sha256:5994857b3c15579f127ed52c7c47394b9bb5afc92784db516cbf1390ce4f5468"
          effect_ids: []
          event_digests:
            - "sha256:3f957062a92a0fbfb53d0c41649e5aa9d7c3b7bea660b2be403beb6d81335269"
          mutation_id: "validation-resolution:sha256:ad400f7110c64addca14ec91a1c41474d302024bdf0959428b9fa56cdd493e30"
        validation-resolution:sha256:dd34b6d057d439d97a20e0c12a3257aa41f8095c5841b56da4efdd0325fafa99:
          after_revision: 28
          aggregate_digest: "sha256:86ed7f56cebe661f7bc848aa8b402ef50c889a614f2e655507e1ec38a489153f"
          before_revision: 27
          command_digest: "sha256:8a029a2241d03a526c7c6595ab0000f4cd12d19216aa0d0974659907735d54b0"
          effect_ids: []
          event_digests:
            - "sha256:90db60bf8de8ccf49a04f060831e59d6f0a748cfbe375d4b8841c89f5d970c57"
          mutation_id: "validation-resolution:sha256:dd34b6d057d439d97a20e0c12a3257aa41f8095c5841b56da4efdd0325fafa99"
        validation:sha256:52c20f47647a9cf5dba0ec6275a783324ace1919fd7d2651714320e76e6afc7a:
          after_revision: 13
          aggregate_digest: "sha256:e4e47d6b39f1039d8eefe4d5842d7f86156dc1165cd22e4c69dd124822448830"
          before_revision: 12
          command_digest: "sha256:3ffc9b4d985d6ac94ab86ba395455a3eaba5e28d84fdf2564f26b300b2a40d52"
          effect_ids: []
          event_digests:
            - "sha256:0eabcbb7270b1401847f308cb53293c17dbcc6dc526351007a906bc8672a19c7"
          mutation_id: "validation:sha256:52c20f47647a9cf5dba0ec6275a783324ace1919fd7d2651714320e76e6afc7a"
        validation:sha256:f61a2280b66e1724fedefd655b67a8bf257c44b276a0153c2fd726e401523547:
          after_revision: 27
          aggregate_digest: "sha256:030c502b08db1a08509f5fd52a073c768c1e85788be857a93967b7477d59c79d"
          before_revision: 26
          command_digest: "sha256:8a9094773b4ba9b84db985533652803b8d8537f55f479343ee792ab38298acea"
          effect_ids: []
          event_digests:
            - "sha256:297d6d72332e86c34a9d5753752cb92234f5dbbf2df23a9b3cf69b69768d75e3"
          mutation_id: "validation:sha256:f61a2280b66e1724fedefd655b67a8bf257c44b276a0153c2fd726e401523547"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:267b630cf76a54313f021aff77b8f4a45c317236dfb29983dacda3aafc7088f2"
          digest: "sha256:afac76ef829ab941609117f62be481882dce43903eee5898aaa8368e98f7f3f2"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:594500aa3a54c55b558a412fd6ee406fe00345efd631cb78ccb49be0dbafa876"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "public_api"
                  - "schema"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                  - "packages/core/src/runner"
                  - "packages/spec"
                  - "artifacts/compatibility"
              expected_outputs:
                - "scope-request-correction-evidence"
              id: "admit-pre-effect-scope-request"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:2c5662e9f5a7bfb090ffcab646fe13a8b02d9a960cbc32f103d9fdf4ea9edb7b"
          digest: "sha256:011302671fa3ee91e0159fedd44bdb59b61a4c7f056c1b7797fcbb333f1b9b62"
          revision: 2
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:cf6c4a0b5849987d193336aa37d30f07dce04f28b7a685e70fb54b4aaf6f6044"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                  - "task.verify"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "public_api"
                  - "schema"
                  - "security_boundary"
                  - "documentation"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/runner/usecases"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                  - "packages/core/src/runner"
                  - "packages/spec"
                  - "artifacts/compatibility"
                  - "docs/user/cli-reference.generated.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
              expected_outputs:
                - "scope-request-correction-evidence"
              id: "admit-pre-effect-scope-request"
              optional: false
              required_inputs: []
      revision: 33
      schema_version: 1
      state: "ACTIVE"
      work_items:
        admit-pre-effect-scope-request:
          attempt: 1
          claim_id: "sha256:68f0d9df49d9ec288365c909db26d2cc7290c1443131a42ebd1b0a8f39d96675"
          definition:
            contract_digest: "sha256:cf6c4a0b5849987d193336aa37d30f07dce04f28b7a685e70fb54b4aaf6f6044"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "schema"
                - "security_boundary"
                - "documentation"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
                - "packages/spec"
                - "artifacts/compatibility"
                - "docs/user/cli-reference.generated.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "scope-request-correction-evidence"
            id: "admit-pre-effect-scope-request"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:521a73b4f5b04dc5cfe068b24189103e532d12d8569c7fe3adc594950071fb1d"
              id: "scope-request-correction-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
              task_id: "202610101141-AGRARP"
              work_item_id: "admit-pre-effect-scope-request"
          result_digest: "sha256:70cb34e939c8d56ae07e9cab6939a203b7ddfa16973a14bed3a7a960fd1ddfbd"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:5c01acc04a995630310360393eda6c2ff7968e84096a6b85c1879b97facd9a91"
              - "sha256:3eecd9ee55afead873931599e8c5fa998288572cd9475c04910d266eeb713be6"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:2f81e55f5a9605fa581766de14cb40386913e376d43458050b8dcd0f7373557b"
              environment_digest: "sha256:e90becf2fe344665efb4c7f8b8dd99c42cdadfe4bbeda6d6a51dbe20e8761179"
              implementation_identity: "sha256:70cb34e939c8d56ae07e9cab6939a203b7ddfa16973a14bed3a7a960fd1ddfbd"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-10T23:44:22.687Z"
            status: "PASSED"
        final-correction-037394fb27c7:
          attempt: 1
          claim_id: "sha256:c2af1f8d0151c14b28299c796ab95cd87a7790414b1653204b7dcb09e35db99a"
          definition:
            contract_digest: "sha256:6e9c01c5d34a03b9845a60d061a2b225ed11fe6691241f5e7da2f9f9ade63acd"
            depends_on:
              - "admit-pre-effect-scope-request"
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "documentation"
                - "public_api"
                - "repository_write"
                - "schema"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "artifacts/compatibility"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/spec"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "final-correction-037394fb27c7-evidence"
            id: "final-correction-037394fb27c7"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:9d2fb0151a0479afa0cbd83833f5712824a11ff2a59ae7347ccc6686711938d3"
    documents:
      contracts:
        sha256:594500aa3a54c55b558a412fd6ee406fe00345efd631cb78ccb49be0dbafa876:
          acceptance_criteria:
            - "Retain a blocked implementation scope request before any outside-scope write, bound to exact task record, approved plan, current claim/attempt, accepted semantic result, parent authority and repository checkpoint. Emit a concrete USER approval action."
            - "Admit only exact normalized repository roots and repository effects through a native state-bound operator command. Validate security policy, protected paths and forbidden effects even for USER approval. Do not add external effects, credentials, network or arbitrary capabilities."
            - "Update the trusted intake contract through authenticated native persistence with immutable request/approval provenance and atomic or recoverable idempotent application. Require fresh plan admission and approval plus existing resume; no implicit completion or old authority reuse."
            - "Keep ordinary plan set unable to exceed intake. Keep existing observed repository-drift scope extension behavior unchanged. Do not fabricate legacy SUPERVISOR receipts or induce unauthorized writes to manufacture a delta."
            - "Add actual native episode integration regression blocked request to exact USER approval to fresh plan/authority/execution, plus stale record/plan/claim/checkpoint, altered result, wider grant, unauthorized actor, replay, invalid phase and forbidden effect negatives. Preserve failure history."
            - "Run focused meaningful tests for request admission, intake ceiling, semantic stops, existing scope extension and native replay; run typecheck lint and format. Synchronize only affected public command/schema compatibility artifacts without rewriting immutable baselines. Obtain independent review before publication."
            - "Implement only the reviewed prospective scope-request repair. Do not mutate Factory, WS, 35N0ZK, M05 or shared primary source. Work on the isolated native task branch and stop for material scope changes."
          objective: "Implement a native pre-effect typed scope-request approval path with exact USER authority, preserved trusted intake/security invariants and real lifecycle regressions."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run lint"
            - "bun run format:check"
        sha256:6e9c01c5d34a03b9845a60d061a2b225ed11fe6691241f5e7da2f9f9ade63acd:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:037394fb27c75ddf179f45f5e2eaa9af8cc39baff7fa4820be5446335e36b418. Read /home/agentplane/workspace/agentplane/.git/agentplane/kernel/exchanges/202610101141-AGRARP/f63af0b405232b1fbd9eb3636826c11ea9bd84aa45f12ae34363e4f43948bb55/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run lint"
            - "bun run format:check"
        sha256:cf6c4a0b5849987d193336aa37d30f07dce04f28b7a685e70fb54b4aaf6f6044:
          acceptance_criteria:
            - "Retain a blocked implementation scope request before any outside-scope write, bound to exact task record, approved plan, current claim/attempt, accepted semantic result, parent authority and repository checkpoint. Emit a concrete USER approval action."
            - "Admit only exact normalized repository roots and repository effects through a native state-bound operator command. Validate security policy, protected paths and forbidden effects even for USER approval. Do not add external effects, credentials, network or arbitrary capabilities."
            - "Update the trusted intake contract through authenticated native persistence with immutable request/approval provenance and atomic or recoverable idempotent application. Require fresh plan admission and approval plus existing resume; no implicit completion or old authority reuse."
            - "Keep ordinary plan set unable to exceed intake. Keep existing observed repository-drift scope extension behavior unchanged. Do not fabricate legacy SUPERVISOR receipts or induce unauthorized writes to manufacture a delta."
            - "Add actual native episode integration regression blocked request to exact USER approval to fresh plan/authority/execution, plus stale record/plan/claim/checkpoint, altered result, wider grant, unauthorized actor, replay, invalid phase and forbidden effect negatives. Preserve failure history."
            - "Run focused meaningful tests for request admission, intake ceiling, semantic stops, existing scope extension and native replay; run typecheck lint and format. Synchronize only affected public command/schema compatibility artifacts without rewriting immutable baselines. Obtain independent review before publication."
            - "Implement only the reviewed prospective scope-request repair. Do not mutate Factory, WS, 35N0ZK, M05 or shared primary source. Work on the isolated native task branch and stop for material scope changes."
            - "Preserve unchanged completed WorkItem definitions, accepted results, output manifests, validation and historical attempts across scope-triggered fresh planning. Reject alteration or removal of completed definitions. Initialize only genuinely added or changed eligible unfinished work and retain fresh plan approval."
            - "Provide one bounded generic task work-item restore-completion operator route with an explicit historical inspection WorkOrder selector and a read-only dry-run. Require exact current record and proof digests plus explicit USER attribution. Do not scan history during ordinary task advance."
            - "Restore one unchanged completed WorkItem only from authenticated native accepted output, passed validation, independent inspection and completion mutation receipts, with exact task, plan, definition, attempt, claim and reset-lineage bindings. Reject untrusted snapshots, missing or altered proof, changed completed contracts, current active or newer accepted work, and pending or in-doubt effects. Preserve the current aggregate history and append an auditable restoration receipt without dispatching external effects."
            - "Qualify a real multi-item native journey with a completed predecessor and accepted output, blocked requesting item, added prerequisite and unchanged downstream work. Reproduce the historical reset and prove authenticated restoration without re-executing the completed predecessor; cover stale, forged, missing, wider and replay negatives."
            - "Synchronize only the approved generated CLI reference and mutable compatibility inventory/checker for the new restoration command. Keep the immutable v0.6.24 baseline unchanged. Preserve prior failures, unresolved macOS timeout evidence and original mandatory checks."
          objective: "Implement a native pre-effect typed scope-request approval path with exact USER authority, preserved trusted intake/security invariants and real lifecycle regressions. Preserve completed work across fresh planning and provide bounded authenticated recovery for the historical reset defect."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bun run lint"
            - "bun run format:check"
      intent:
        context: "Repair canonical blocked implementation scope_extension_request dead end. Retain exact task record plan attempt claim result authority checkpoint bindings; require explicit USER approval of exact repository roots/effects with security-policy validation; native trusted intake amendment and fresh plan/resume. Preserve ordinary plan ceiling, repository-drift extension, failures and no pre-approval writes. No Factory or WS mutations."
        objective: "Admit exact pre-effect scope requests through native USER approval"
    events:
      -
        command_digest: "sha256:2150ac2bbe51519ab663f183f9ac2329d474adc7b9d8b06b35b09915ee504e74"
        id: "capture:202610101141-AGRARP:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610101141-AGRARP"
        occurred_at: "2026-10-10T11:42:26.051Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610101141-AGRARP"
        task_revision: 1
      -
        command_digest: "sha256:50efef9f10e0f8c26703754361d1bf30423faadd41aa17068c4733aa57be3282"
        id: "result:sha256:0a3aa2adadc9f270a952224b4f75f2fd9dc05d158a0c164845ba70e10178e4f7:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:0a3aa2adadc9f270a952224b4f75f2fd9dc05d158a0c164845ba70e10178e4f7"
        occurred_at: "2026-10-10T11:44:06.347Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610101141-AGRARP"
        task_revision: 2
      -
        command_digest: "sha256:a78dc68e7894b258d13576e5046e8a06bbb33b7bec8bfb06dee1889357bc0861"
        id: "sha256:09b3fad1afdd6c62825b4059823980f47449acb6c54d38a0b91be474feb3f099:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:09b3fad1afdd6c62825b4059823980f47449acb6c54d38a0b91be474feb3f099"
        occurred_at: "2026-10-10T11:44:28.768Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610101141-AGRARP"
        task_revision: 3
      -
        command_digest: "sha256:759959dea5c0314ac9101623ee13858a07c05999c794ee28af113b3739f4d6ff"
        id: "kernel_work_item_materialization_required:sha256:2bab57df526ed9b18002f125c324b4ada6e2fb254e145cef9e55cc8275eba158:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2bab57df526ed9b18002f125c324b4ada6e2fb254e145cef9e55cc8275eba158:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:45:01.364Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610101141-AGRARP"
        task_revision: 4
      -
        command_digest: "sha256:a9a4a59ca929e43b2aae654aa3c8a8dde0f5e96eb57e816565caa709ff022b05"
        id: "kernel_work_item_claim_required:sha256:111d5dbe60c415bc379c18c96c3858f6df90dc4ba25f74928dd97ddfac73e242:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:111d5dbe60c415bc379c18c96c3858f6df90dc4ba25f74928dd97ddfac73e242:sha256:bba0d2161bb25ba503c690fcb78a8709c25c007924885540267a534e6f955bb8"
        occurred_at: "2026-10-10T11:45:33.462Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610101141-AGRARP"
        task_revision: 5
      -
        command_digest: "sha256:f72d82a0ee6d5085cab7e97790d67aea346285e3fced71a20de00cc1dde0e8b3"
        id: "sha256:4761e4c2e5fd95e498122b75dc9f1b3e4bead02e7178d120f0a8fa72774c65c3:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4761e4c2e5fd95e498122b75dc9f1b3e4bead02e7178d120f0a8fa72774c65c3"
        occurred_at: "2026-10-10T11:47:25.272Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610101141-AGRARP"
        task_revision: 6
      -
        command_digest: "sha256:9e6d35a919fb7c68e444c244e331f5b399429c839e458a9e51cc8a02002acf92"
        id: "kernel_work_item_execution_required:sha256:03b31d88289e66dbeb2727c19923a7b77e37dfb4d127051fe0400772165b448e:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:03b31d88289e66dbeb2727c19923a7b77e37dfb4d127051fe0400772165b448e:sha256:151a8bee9c7022c20fe9616492f43569841818cfb4d47863c836d27f70b26337"
        occurred_at: "2026-10-10T11:48:08.513Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610101141-AGRARP"
        task_revision: 7
      -
        command_digest: "sha256:0277b9ae30c67fca213e1e661213f5ba7e568789d8babe755ce7643c69882d53"
        id: "sha256:fd3d4126f8955cc25af69c4c086ee1bc3bf3caa470d004320d445e5f12c9cbd7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:fd3d4126f8955cc25af69c4c086ee1bc3bf3caa470d004320d445e5f12c9cbd7"
        occurred_at: "2026-10-10T11:49:13.833Z"
        payload_digest: "sha256:091791069d94218d4e5cb430d38bb9b9386610c2f3faf8fe11181e8417113cf8"
        task_id: "202610101141-AGRARP"
        task_revision: 8
      -
        command_digest: "sha256:d12fd538978e29c4e6f813ec2b8bc7daca027e2d361754f8520d8024c3fae072"
        id: "sha256:cbb82d1968d1a5c423312f4fc082817c3ac7d292d8d33c610662e164ba05f491:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cbb82d1968d1a5c423312f4fc082817c3ac7d292d8d33c610662e164ba05f491"
        occurred_at: "2026-10-10T15:26:10.405Z"
        payload_digest: "sha256:14ca5341800a9534e0fafd4e74a2cc88f4b2e5a3b008d958f8420632261ee823"
        task_id: "202610101141-AGRARP"
        task_revision: 9
      -
        command_digest: "sha256:91f459382c4ad37f81a50eca7fecbd1ce05fbce724d007572e60f4995b5d15cf"
        id: "sha256:4613ac757b936a0ab306611e8def5722f3f51493c40cc54ede27efa4a4d9e44e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:4613ac757b936a0ab306611e8def5722f3f51493c40cc54ede27efa4a4d9e44e"
        occurred_at: "2026-10-10T15:30:28.383Z"
        payload_digest: "sha256:df849bed7b7ecf2928e40574d03e8178feeed4d2bab05dca57b0b86f1b72a828"
        task_id: "202610101141-AGRARP"
        task_revision: 10
      -
        command_digest: "sha256:294cb80c3a470b68fec91df2b59c5deb7ef1316aee13dd5b6aea9aeb0612d3d9"
        id: "result:sha256:0da5bceeef4ef6ec3127e68fe26b316d138bee4f26c2bb2da03c036292c3338f:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:0da5bceeef4ef6ec3127e68fe26b316d138bee4f26c2bb2da03c036292c3338f"
        occurred_at: "2026-10-10T16:11:33.554Z"
        payload_digest: "sha256:0508cb1e60214cfb7e616ad8d2e6b4cac82a226c1675813f37405703eb72a28b"
        task_id: "202610101141-AGRARP"
        task_revision: 11
      -
        command_digest: "sha256:6b961e23f5e5673d641888730cc8db920d46409bd6ad1c0a061ccc634260457d"
        id: "kernel_work_item_inspection_required:sha256:b940977d61a8460e855dfc824835d2cd9724ff6163cbd24b38ba6aa82424cec5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:b940977d61a8460e855dfc824835d2cd9724ff6163cbd24b38ba6aa82424cec5:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T16:11:58.854Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610101141-AGRARP"
        task_revision: 12
      -
        command_digest: "sha256:3ffc9b4d985d6ac94ab86ba395455a3eaba5e28d84fdf2564f26b300b2a40d52"
        id: "validation:sha256:52c20f47647a9cf5dba0ec6275a783324ace1919fd7d2651714320e76e6afc7a:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:52c20f47647a9cf5dba0ec6275a783324ace1919fd7d2651714320e76e6afc7a"
        occurred_at: "2026-10-10T16:47:31.800Z"
        payload_digest: "sha256:d5b1492177228ee4c6895730e7b9da8023f64906588aefff05694568455eb341"
        task_id: "202610101141-AGRARP"
        task_revision: 13
      -
        command_digest: "sha256:5994857b3c15579f127ed52c7c47394b9bb5afc92784db516cbf1390ce4f5468"
        id: "validation-resolution:sha256:ad400f7110c64addca14ec91a1c41474d302024bdf0959428b9fa56cdd493e30:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ad400f7110c64addca14ec91a1c41474d302024bdf0959428b9fa56cdd493e30"
        occurred_at: "2026-10-10T16:48:03.340Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610101141-AGRARP"
        task_revision: 14
      -
        command_digest: "sha256:f5e5f76a05e64b4e632b3d2651491e40d2987855fb5e18d14288acd971feee36"
        id: "kernel_work_item_rework_claim_required:sha256:90eab13fce3150e792a5af71acfe7c57e1fe901eeac790442640d72b8dad7476:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:90eab13fce3150e792a5af71acfe7c57e1fe901eeac790442640d72b8dad7476:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T16:49:20.158Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610101141-AGRARP"
        task_revision: 15
      -
        command_digest: "sha256:53b63f10d4ff94ff08bec9d94d0f5587a99073e490453418aa1031577c71fc4d"
        id: "kernel_work_item_execution_required:sha256:c3892ba489f264125542ff3d16fb06fd6a590424ae25708a8d70bf0cab672a5e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c3892ba489f264125542ff3d16fb06fd6a590424ae25708a8d70bf0cab672a5e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T16:50:18.273Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610101141-AGRARP"
        task_revision: 16
      -
        command_digest: "sha256:b430ea33e122c78c831fdb585c05403e6b75d3468e20d18bd16dd7d3cd4280bf"
        id: "semantic-stop:sha256:012c6e99b5daa39deab0710a4fd1659b468950e55194b6f33b346999fc696941:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:012c6e99b5daa39deab0710a4fd1659b468950e55194b6f33b346999fc696941"
        occurred_at: "2026-10-10T16:53:24.996Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610101141-AGRARP"
        task_revision: 17
      -
        command_digest: "sha256:c7f5121dc88feea68cbc5fe59befd0114169f7b717459328a031af2f4a367ee1"
        id: "scope-request:sha256:3fbd6313f7392dd9dc4364d0cbdb25fe69a7cfbd86d4fdc13096497cc2c6a506:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:3fbd6313f7392dd9dc4364d0cbdb25fe69a7cfbd86d4fdc13096497cc2c6a506"
        occurred_at: "2026-10-10T16:55:23.878Z"
        payload_digest: "sha256:081d67c06e936b740a518fc54e272e93cef0237b5d5568bc81e75cbe0b73faa3"
        task_id: "202610101141-AGRARP"
        task_revision: 18
      -
        command_digest: "sha256:aa54e282904122f9c94d1da60cf8895ed407e046889038d37f5c5e1a27e8e634"
        id: "result:sha256:32782d3c8cad99087550ed20ae7e6cca9801bf898058e26ae153c82e50eda9c0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:32782d3c8cad99087550ed20ae7e6cca9801bf898058e26ae153c82e50eda9c0"
        occurred_at: "2026-10-10T16:58:37.195Z"
        payload_digest: "sha256:8b2273723f09043e78db604be1df9899c57bc31eef7b3494ebda5b63893267c8"
        task_id: "202610101141-AGRARP"
        task_revision: 19
      -
        command_digest: "sha256:2e525ebe8766f838ed4bef385981c90becdc2408a9b0c62add0282beebc745f6"
        id: "sha256:f952b4da84a3c90736c2db018c0d7fcc9f1069673a32048cdfe5a5d25482cfdc:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:f952b4da84a3c90736c2db018c0d7fcc9f1069673a32048cdfe5a5d25482cfdc"
        occurred_at: "2026-10-10T16:59:10.510Z"
        payload_digest: "sha256:f732d91d0099a835ae963e335cda9be1bcde3c06bea10481ac2c1534f8ec58f1"
        task_id: "202610101141-AGRARP"
        task_revision: 20
      -
        command_digest: "sha256:1de5d25e9f1c5865765d306eb936cf83b4dbcfb1596eec3a882abea804b16962"
        id: "kernel_work_item_materialization_required:sha256:59e914b0a2c5dcea16ceae94aeb222fa6d056387649282038e2a98680e8ebe68:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:59e914b0a2c5dcea16ceae94aeb222fa6d056387649282038e2a98680e8ebe68:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T16:59:45.838Z"
        payload_digest: "sha256:57ce51f93a67dda4cc2bbde92a6a724aa00a738d75da472ef8927fe03c18ffbb"
        task_id: "202610101141-AGRARP"
        task_revision: 21
      -
        command_digest: "sha256:bc76c67be5ea9026762ff95007059a8ca66fcb3dd292b49344d301ad3865ad74"
        id: "kernel_work_item_claim_required:sha256:d338ce6b3859bd9a64b2906ca27e9f8b531acc717263462bd278ddd96fdd99a6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d338ce6b3859bd9a64b2906ca27e9f8b531acc717263462bd278ddd96fdd99a6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T17:00:31.626Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610101141-AGRARP"
        task_revision: 22
      -
        command_digest: "sha256:c60e2c04dec45516fb89098f0854605112e22dee16d2a5b51f385f9876bece10"
        id: "kernel_work_item_execution_required:sha256:a3b81bef6e4434f4189ec85e4a9d82eddd09a898151ff5d18f59a85f94aa95ba:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a3b81bef6e4434f4189ec85e4a9d82eddd09a898151ff5d18f59a85f94aa95ba:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-10T17:01:12.185Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610101141-AGRARP"
        task_revision: 23
      -
        command_digest: "sha256:781088426b3391485fc2665b43184a360fc6215a5e319fb9ac176237db83fb66"
        id: "sha256:833ab0b7ade75009689a89cd510ca7821cccd86bf92929dd02694cde68310d15:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:833ab0b7ade75009689a89cd510ca7821cccd86bf92929dd02694cde68310d15"
        occurred_at: "2026-10-10T18:30:29.377Z"
        payload_digest: "sha256:dca1098603ce6f943770c1c0e5fb8c5d89e1d0e9fd4c1961e5bdce8dcece254d"
        task_id: "202610101141-AGRARP"
        task_revision: 24
      -
        command_digest: "sha256:47c64ed626de61734935ae0591f3c1c5d3c43db14f176635e59f78922b43fc35"
        id: "result:sha256:d29112739fb10fc11c5bf8576a91da433c4545684e2e397a6fc13eb866773e91:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:d29112739fb10fc11c5bf8576a91da433c4545684e2e397a6fc13eb866773e91"
        occurred_at: "2026-10-10T18:30:57.444Z"
        payload_digest: "sha256:1298c91fe9ff5eece3f1c7b6c378c60c1f090d34bd13611ed755d43deea0fd1c"
        task_id: "202610101141-AGRARP"
        task_revision: 25
      -
        command_digest: "sha256:01a88c331ba6ff3f5bfa0e4bfa247f35be78d4e4208a068bfaee611ff5628230"
        id: "kernel_work_item_inspection_required:sha256:d0939c895f1affb308a1a06e6c9b3cf091fb4bf402a681b2d6a0d428316a3e95:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:d0939c895f1affb308a1a06e6c9b3cf091fb4bf402a681b2d6a0d428316a3e95:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
        occurred_at: "2026-10-10T18:31:27.868Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610101141-AGRARP"
        task_revision: 26
      -
        command_digest: "sha256:8a9094773b4ba9b84db985533652803b8d8537f55f479343ee792ab38298acea"
        id: "validation:sha256:f61a2280b66e1724fedefd655b67a8bf257c44b276a0153c2fd726e401523547:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f61a2280b66e1724fedefd655b67a8bf257c44b276a0153c2fd726e401523547"
        occurred_at: "2026-10-10T23:44:41.049Z"
        payload_digest: "sha256:666b11d7134363d8110da06d5a50eb65c044c01c2086a8c4529e987b20956149"
        task_id: "202610101141-AGRARP"
        task_revision: 27
      -
        command_digest: "sha256:8a029a2241d03a526c7c6595ab0000f4cd12d19216aa0d0974659907735d54b0"
        id: "validation-resolution:sha256:dd34b6d057d439d97a20e0c12a3257aa41f8095c5841b56da4efdd0325fafa99:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:dd34b6d057d439d97a20e0c12a3257aa41f8095c5841b56da4efdd0325fafa99"
        occurred_at: "2026-10-10T23:44:47.326Z"
        payload_digest: "sha256:23532dbce000d1f0f79e31749079afe2ef833ccc76bde8a0b5d96138f25c1d3e"
        task_id: "202610101141-AGRARP"
        task_revision: 28
      -
        command_digest: "sha256:b090bac30ccb2a5c7a9558d3b6c487cf793553d90678817fdd738aba57080b92"
        id: "final-validation:sha256:037394fb27c75ddf179f45f5e2eaa9af8cc39baff7fa4820be5446335e36b418:28:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:037394fb27c75ddf179f45f5e2eaa9af8cc39baff7fa4820be5446335e36b418:28"
        occurred_at: "2026-10-11T01:07:29.446Z"
        payload_digest: "sha256:e0d821c69bbed42d7a9c5eda916a909864767cc217a8d0cb6c5e591bfd724218"
        task_id: "202610101141-AGRARP"
        task_revision: 29
      -
        command_digest: "sha256:0107b41bf2c1258593d7b199651f351da187bacf6a566314192d37bc25b1b1df"
        id: "amend:sha256:76317420030ec162aacf57a7947e06ec6dff1d76f746e2c946b954e16f4e866f:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:76317420030ec162aacf57a7947e06ec6dff1d76f746e2c946b954e16f4e866f"
        occurred_at: "2026-10-11T01:08:07.340Z"
        payload_digest: "sha256:04d7011f9ff2e5da4a2a5f7c749e8073471b4b8b1c89b7042be53338070f4be2"
        task_id: "202610101141-AGRARP"
        task_revision: 30
      -
        command_digest: "sha256:f2db279cc16b0285310e6ff2754b33450fe38c485bf1511ea7d5cdd235ec593f"
        id: "sha256:2cf233af326875e5a11131538342756b739150d31f208a753150824c3f76afe9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2cf233af326875e5a11131538342756b739150d31f208a753150824c3f76afe9"
        occurred_at: "2026-10-11T01:08:24.377Z"
        payload_digest: "sha256:f8f92483994f2aeee36455a8aef37798ccb0aa0f98a768f9257fd5f3451c0f68"
        task_id: "202610101141-AGRARP"
        task_revision: 31
      -
        command_digest: "sha256:8de58d07dbb61bb76b2f99e85344ade2ce3fe46d452af0e3998a09b4d758752d"
        id: "kernel_work_item_claim_required:sha256:8ba9b1969b3bd04c0da6f53d328c046504139a5de4973a6ee5696e1c4116bb4b:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8ba9b1969b3bd04c0da6f53d328c046504139a5de4973a6ee5696e1c4116bb4b:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
        occurred_at: "2026-10-11T01:08:55.675Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202610101141-AGRARP"
        task_revision: 32
      -
        command_digest: "sha256:39ca93fbd761a51c8558bbe0df7505772d69948ccd9bf5d791ff7e12ddde3509"
        id: "kernel_work_item_execution_required:sha256:d061c8b202ad89801cbe4e55644e33fd25a4dcf7f601cb8d9cf352ec9c0d8588:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d061c8b202ad89801cbe4e55644e33fd25a4dcf7f601cb8d9cf352ec9c0d8588:sha256:b50440124745dbbf2fc846f1da1cd71a84b60bbb76316fdfc09527e217d02ffc"
        occurred_at: "2026-10-11T01:09:11.637Z"
        payload_digest: "sha256:e14313ad63cc38e30e2db52adf8f8fc2babbc3ae4a41e0fcc66a82921e297fd9"
        task_id: "202610101141-AGRARP"
        task_revision: 33
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Admit exact pre-effect scope requests through native USER approval

Repair canonical blocked implementation scope_extension_request dead end. Retain exact task record plan attempt claim result authority checkpoint bindings; require explicit USER approval of exact repository roots/effects with security-policy validation; native trusted intake amendment and fresh plan/resume. Preserve ordinary plan ceiling, repository-drift extension, failures and no pre-approval writes. No Factory or WS mutations.

## Scope

- In scope: Repair canonical blocked implementation scope_extension_request dead end. Retain exact task record plan attempt claim result authority checkpoint bindings; require explicit USER approval of exact repository roots/effects with security-policy validation; native trusted intake amendment and fresh plan/resume. Preserve ordinary plan ceiling, repository-drift extension, failures and no pre-approval writes. No Factory or WS mutations.
- Out of scope: unrelated refactors not required for "Admit exact pre-effect scope requests through native USER approval".

## Plan

1. Execute approved WorkItem admit-pre-effect-scope-request.
2. Execute approved WorkItem final-correction-037394fb27c7.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
