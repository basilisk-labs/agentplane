---
id: "202608291006-255K66"
title: "Cut over to the canonical Task kernel and retire legacy core paths"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 139
origin:
  system: "manual"
depends_on:
  - "202608291006-2A6BJC"
  - "202608251706-V287W1"
tags:
  - "clean-core-rebuild"
  - "cutover"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run ci:local:full"
  - "bun run lifecycle:invariants"
  - "bun run qualification:mixed-scope-lifecycle"
plan_approval:
  state: "approved"
  updated_at: "2026-09-01T23:51:00.905Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-09-02T01:06:37.540Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-02T01:08:09.880Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 6 typed finding(s)."
  evaluated_sha: "1692b5eab62ec4ab274d5b9922fa7a441f9035be"
  blueprint_digest: "7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211"
  evidence_refs:
    - ".agentplane/tasks/202608291006-255K66/quality/20260902-010644629-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608291006-255K66/quality/20260902-010644629-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608291006-255K66/quality/objects/sha256/6bd7a849180aa88e5feeb7530aee4ce4bfabf1e21c9f077899f3a9b10e76c5d7.md"
    - ".agentplane/tasks/202608291006-255K66/quality/20260902-010644629-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608291006-255K66/quality/20260902-010644629-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608291006-255K66/quality/20260902-010644629-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608291006-255K66/README.md"
    - ".agentplane/tasks/202608291006-255K66/quality/objects/sha256/38f399fd9f3a71b8d2fe3916171cae20dcf2db822555d7cb9621537fd4441c43.patch"
    - ".agentplane/tasks/202608291006-255K66/quality/objects/sha256/262595476644035391c1845c94516f238be522ceb3bd5cc16bcc2c4a73457cc8.json"
    - ".agentplane/tasks/202608291006-255K66/verification/20260902010637540-95ed18c2ddfc30e8.json"
    - ".agentplane/tasks/202608291006-255K66/quality/objects/sha256/5f1d6507c6d4dfa68f2a2f1d8a557bbfe7cbf41cf20617d5791b41956381ea71.json"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
  findings:
    - "The frozen verification record is bound to implementation SHA 1692b5eab62ec4ab274d5b9922fa7a441f9035be and records all five declared supervisor checks as passing, including full local CI, lifecycle invariants, mixed-scope qualification, policy routing, and doctor."
    - "The production compatibility inventory still permits five exact import edges and reports 738 compatibility LOC. This satisfies the declared-adapter exception, but the adapters remain a residual maintenance boundary rather than evidence of total physical deletion."
    - "No publication, registry mutation, or hosted exact-head evidence exists. The user explicitly excluded release work from this goal, and the evaluator packet grants no external side effects, so these effects are correctly left unclaimed and must not be inferred from local real-E2E classification."
    - "The final two-file qualification adjustment is narrow: it preserves exact-commit PR routing while reducing the module to the hotspot ceiling and replaces a forbidden reduce with an equivalent loop. Focused tests and the full supervisor gate passed."
    - "Residual risk: Five allowlisted compatibility import edges and 738 compatibility LOC remain and require the fail-closed inventory to prevent authority growth."
    - "Residual risk: Hosted checks, registry behavior, and release publication remain unverified because release work is outside the user-approved goal."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
      - "ci"
    writable_roots:
      - "depcruise.config.cjs"
      - "docs/developer"
      - "docs/developer/harness-dev.mdx"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "package.json"
      - "packages/agentplane/src/adapters"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/schemas/agent-work-order-v2.schema.json"
      - "packages/core/src/runner/agent-semantic-result.test.ts"
      - "packages/core/src/runner/agent-semantic-result.ts"
      - "packages/core/src/runner/agent-work-order.test.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "packages/core/src/tasks"
      - "packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "packages/spec/schemas/agent-work-order-v2.schema.json"
      - "packages/testkit/src"
      - "schemas/agent-semantic-result.schema.json"
      - "schemas/agent-work-order-v2.schema.json"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/qualification"
      - "scripts/release/smoke-bun-compiled-cli.mjs"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Cutover changes persistent Task authority and every lifecycle consumer. Isolated branch review and exact-head qualification are required."
      - "External effects are limited to native integration, corpus migration and owned qualification resources. Individual semantic episodes must keep their emitted authority and cannot execute formal transitions."
      - "USER-approved blocked-result scope extension: roots=docs/developer/harness-dev.mdx; repository_effects=documentation,repository_write"
      - "USER-approved blocked-result scope extension: roots=packages/core/schemas/agent-work-order-v2.schema.json,packages/core/src/runner/agent-semantic-result.test.ts,packages/core/src/runner/agent-semantic-result.ts,packages/core/src/runner/agent-work-order.test.ts,packages/core/src/runner/agent-work-order.ts,packages/spec/schemas/agent-work-order-v2.schema.json,schemas/agent-semantic-result.schema.json,schemas/agent-work-order-v2.schema.json; repository_effects=schema,source_code,tests"
      - "USER-approved blocked-result scope extension: roots=packages/core/src/tasks/task-kernel/invariants.test.ts,packages/core/src/tasks/task-kernel/kernel.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=scripts/baselines/v0.7-compatibility-candidate.json; repository_effects=public_api,tests"
      - "USER-approved blocked-result scope extension: roots=scripts/checks/check-compatibility-contract-baseline.mjs; repository_effects=public_api,tests"
      - "USER-approved blocked-result scope extension: roots=scripts/release/smoke-bun-compiled-cli.mjs; repository_effects=repository_write,tests"
    repository_effects:
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "depcruise.config.cjs"
      - "docs/developer"
      - "docs/developer/harness-dev.mdx"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "package.json"
      - "packages/agentplane/src/adapters"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/schemas/agent-work-order-v2.schema.json"
      - "packages/core/src/runner/agent-semantic-result.test.ts"
      - "packages/core/src/runner/agent-semantic-result.ts"
      - "packages/core/src/runner/agent-work-order.test.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "packages/core/src/tasks"
      - "packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "packages/spec/schemas/agent-work-order-v2.schema.json"
      - "packages/testkit/src"
      - "schemas/agent-semantic-result.schema.json"
      - "schemas/agent-work-order-v2.schema.json"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/qualification"
      - "scripts/release/smoke-bun-compiled-cli.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/spec"
      - "schemas"
      - "scripts"
    changed_paths:
      - "docs/developer/clean-task-core-cutover.mdx"
      - "docs/developer/harness-dev.mdx"
      - "packages/agentplane/src/adapters/authority/user-approval-receipt.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-migration.test.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-record-invariants.ts"
      - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/guard/impl/allow.test.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.ts"
      - "packages/agentplane/src/commands/shared/verification-details.test.ts"
      - "packages/agentplane/src/commands/shared/verification-details.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/task/active.command.ts"
      - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/brief.command.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/execution-authority-context.test.ts"
      - "packages/agentplane/src/commands/task/execution-authority-context.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/kernel-advance.ts"
      - "packages/agentplane/src/commands/task/kernel-create.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/agentplane/src/commands/task/kernel-plan.ts"
      - "packages/agentplane/src/commands/task/kernel-read.ts"
      - "packages/agentplane/src/commands/task/kernel-run.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-run.ts"
      - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
      - "packages/agentplane/src/commands/task/kernel-work-order.ts"
      - "packages/agentplane/src/commands/task/new.spec.ts"
      - "packages/agentplane/src/commands/task/new.ts"
      - "packages/agentplane/src/commands/task/next-action.command.ts"
      - "packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "packages/agentplane/src/commands/task/plan-set.command.ts"
      - "packages/agentplane/src/commands/task/ready.ts"
      - "packages/agentplane/src/commands/task/run.command.ts"
      - "packages/agentplane/src/commands/task/show-kernel.test.ts"
      - "packages/agentplane/src/commands/task/show.ts"
      - "packages/agentplane/src/commands/task/status.command.ts"
      - "packages/agentplane/src/commands/task/update.ts"
      - "packages/agentplane/src/commands/task/user-approval-receipt.ts"
      - "packages/agentplane/src/ports/kernel-authority.ts"
      - "packages/agentplane/src/runner/observation/git-snapshot.test.ts"
      - "packages/agentplane/src/runner/observation/git-snapshot/capture.ts"
      - "packages/agentplane/src/runner/observation/git-snapshot/common.ts"
      - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
      - "packages/agentplane/src/runner/observation/git-snapshot/path-fingerprint.ts"
      - "packages/agentplane/src/runner/observation/kernel-repository.ts"
      - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
      - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "packages/core/schemas/agent-work-order-v2.schema.json"
      - "packages/core/src/runner/agent-semantic-result.test.ts"
      - "packages/core/src/runner/agent-semantic-result.ts"
      - "packages/core/src/runner/agent-work-order.test.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/kernel-semantic.ts"
      - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
      - "packages/core/src/tasks/task-kernel/digest.ts"
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "packages/core/src/tasks/task-kernel/invariants.ts"
      - "packages/core/src/tasks/task-kernel/kernel.test.ts"
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/model.ts"
      - "packages/spec/schemas/agent-work-order-v2.schema.json"
      - "schemas/agent-semantic-result.schema.json"
      - "schemas/agent-work-order-v2.schema.json"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/check-m3-legacy-authority-imports.mjs"
      - "scripts/qualification/check-m3-self-hosting.mjs"
      - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
      - "scripts/release/smoke-bun-compiled-cli.mjs"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "schema"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
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
          - "depcruise.config.cjs"
          - "docs/developer"
          - "docs/developer/harness-dev.mdx"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "package.json"
          - "packages/agentplane/src/adapters"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands"
          - "packages/agentplane/src/ports"
          - "packages/agentplane/src/runner"
          - "packages/core/schemas/agent-work-order-v2.schema.json"
          - "packages/core/src/runner/agent-semantic-result.test.ts"
          - "packages/core/src/runner/agent-semantic-result.ts"
          - "packages/core/src/runner/agent-work-order.test.ts"
          - "packages/core/src/runner/agent-work-order.ts"
          - "packages/core/src/tasks"
          - "packages/core/src/tasks/task-kernel/invariants.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.test.ts"
          - "packages/spec/schemas/agent-work-order-v2.schema.json"
          - "packages/testkit/src"
          - "schemas/agent-semantic-result.schema.json"
          - "schemas/agent-work-order-v2.schema.json"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/bench"
          - "scripts/checks"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/qualification"
          - "scripts/release/smoke-bun-compiled-cli.mjs"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:898599fcf3dcbcd4f4e14edd4b657689624e614b80ad4c366936febaddc8fdc5"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:packages/core/schemas/agent-work-order-v2.schema.json"
        - "central_component:packages/core/src/runner/agent-semantic-result.test.ts"
        - "central_component:packages/core/src/runner/agent-semantic-result.ts"
        - "central_component:packages/core/src/runner/agent-work-order.test.ts"
        - "central_component:packages/core/src/runner/agent-work-order.ts"
        - "central_component:packages/core/src/tasks"
        - "central_component:packages/core/src/tasks/task-kernel/invariants.test.ts"
        - "central_component:packages/core/src/tasks/task-kernel/kernel.test.ts"
        - "central_component:schemas/agent-semantic-result.schema.json"
        - "central_component:schemas/agent-work-order-v2.schema.json"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_component:scripts/release/smoke-bun-compiled-cli.mjs"
        - "central_path:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.ts"
        - "central_path:packages/agentplane/src/commands/shared/verification-details.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/verification-details.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/core/schemas/agent-work-order-v2.schema.json"
        - "central_path:packages/core/src/runner/agent-semantic-result.test.ts"
        - "central_path:packages/core/src/runner/agent-semantic-result.ts"
        - "central_path:packages/core/src/runner/agent-work-order.test.ts"
        - "central_path:packages/core/src/runner/agent-work-order.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/kernel-semantic.ts"
        - "central_path:packages/core/src/tasks/task-kernel/authority-lineage.ts"
        - "central_path:packages/core/src/tasks/task-kernel/digest.ts"
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.ts"
        - "central_path:schemas/agent-semantic-result.schema.json"
        - "central_path:schemas/agent-work-order-v2.schema.json"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:scripts/checks/check-m3-legacy-authority-imports.mjs"
        - "central_path:scripts/release/smoke-bun-compiled-cli.mjs"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
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
          - "packages/core"
          - "packages/spec"
          - "schemas"
          - "scripts"
        changed_files:
          - "docs/developer/clean-task-core-cutover.mdx"
          - "docs/developer/harness-dev.mdx"
          - "packages/agentplane/src/adapters/authority/user-approval-receipt.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-authority-schema.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-documents.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-migration.test.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-record-invariants.ts"
          - "packages/agentplane/src/adapters/task-backend/kernel-record.ts"
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/commands/guard/impl/allow.test.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.test.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/verify-log.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.ts"
          - "packages/agentplane/src/commands/shared/verification-details.test.ts"
          - "packages/agentplane/src/commands/shared/verification-details.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/task/active.command.ts"
          - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/brief.command.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/execution-authority-context.test.ts"
          - "packages/agentplane/src/commands/task/execution-authority-context.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/kernel-advance.ts"
          - "packages/agentplane/src/commands/task/kernel-create.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.ts"
          - "packages/agentplane/src/commands/task/kernel-plan.ts"
          - "packages/agentplane/src/commands/task/kernel-read.ts"
          - "packages/agentplane/src/commands/task/kernel-run.testkit.ts"
          - "packages/agentplane/src/commands/task/kernel-run.ts"
          - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
          - "packages/agentplane/src/commands/task/kernel-work-order.ts"
          - "packages/agentplane/src/commands/task/new.spec.ts"
          - "packages/agentplane/src/commands/task/new.ts"
          - "packages/agentplane/src/commands/task/next-action.command.ts"
          - "packages/agentplane/src/commands/task/plan-approve.command.ts"
          - "packages/agentplane/src/commands/task/plan-set.command.ts"
          - "packages/agentplane/src/commands/task/ready.ts"
          - "packages/agentplane/src/commands/task/run.command.ts"
          - "packages/agentplane/src/commands/task/show-kernel.test.ts"
          - "packages/agentplane/src/commands/task/show.ts"
          - "packages/agentplane/src/commands/task/status.command.ts"
          - "packages/agentplane/src/commands/task/update.ts"
          - "packages/agentplane/src/commands/task/user-approval-receipt.ts"
          - "packages/agentplane/src/ports/kernel-authority.ts"
          - "packages/agentplane/src/runner/observation/git-snapshot.test.ts"
          - "packages/agentplane/src/runner/observation/git-snapshot/capture.ts"
          - "packages/agentplane/src/runner/observation/git-snapshot/common.ts"
          - "packages/agentplane/src/runner/observation/git-snapshot/model.ts"
          - "packages/agentplane/src/runner/observation/git-snapshot/path-fingerprint.ts"
          - "packages/agentplane/src/runner/observation/kernel-repository.ts"
          - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
          - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.test.ts"
          - "packages/agentplane/src/runner/usecases/kernel-task-lifecycle.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
          - "packages/core/schemas/agent-work-order-v2.schema.json"
          - "packages/core/src/runner/agent-semantic-result.test.ts"
          - "packages/core/src/runner/agent-semantic-result.ts"
          - "packages/core/src/runner/agent-work-order.test.ts"
          - "packages/core/src/runner/agent-work-order.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/kernel-semantic.ts"
          - "packages/core/src/tasks/task-kernel/authority-lineage.ts"
          - "packages/core/src/tasks/task-kernel/digest.ts"
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/invariants.test.ts"
          - "packages/core/src/tasks/task-kernel/invariants.ts"
          - "packages/core/src/tasks/task-kernel/kernel.test.ts"
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/model.ts"
          - "packages/spec/schemas/agent-work-order-v2.schema.json"
          - "schemas/agent-semantic-result.schema.json"
          - "schemas/agent-work-order-v2.schema.json"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/checks/check-m3-legacy-authority-imports.mjs"
          - "scripts/qualification/check-m3-self-hosting.mjs"
          - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
          - "scripts/release/smoke-bun-compiled-cli.mjs"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "schema"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "1692b5eab62ec4ab274d5b9922fa7a441f9035be"
  message: "🚧 255K66 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 36e1575c028d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d154a7268f6a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 36aa33491d34. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7d3e7ba7fdf2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The newly approved plan re-materialized m3-projections and selected it for full-CI requalification. The observed required-CI blocker is in two core test files outside this packet. Existing projection implementation remains intact; no source changes were made. Recommended action: Use the native state-bound scope-extension operator action for exactly the two test files, then issue a fresh executor packet. Reuse the existing projection implementation and requalify it. Do not edit Task state or replay the projection implementation. Requested scope: roots=packages/core/src/tasks/task-kernel/invariants.test.ts,packages/core/src/tasks/task-kernel/kernel.test.ts; repository effects=tests; request digest=sha256:1ccea219956fc7611b0e680e909f9aee5f594d0c4b5cd01f0d7aaff9cb950dff. Agentplane receipt: external-agent-blocker/tr_17b15e89ebfae080f1a6f4326a5e479b/sha256:ea1f761fe8a34155ee2a0eb74797fbe4d35119f154348e40feba751562bc4aff/sha256:1ccea219956fc7611b0e680e909f9aee5f594d0c4b5cd01f0d7aaff9cb950dff."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/core/src/tasks/task-kernel/invariants.test.ts, packages/core/src/tasks/task-kernel/kernel.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f3ca64493952. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b6434d712561. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 50dfade20373. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Transport implementation requires the existing shared WorkOrder and semantic-result schema boundary. Partial implementation is preserved and does not satisfy this WorkItem. Recommended action: Extend only the listed schema source, test and generated artifact paths. Reissue the same transport implementation WorkItem. Preserve all existing changes and approval boundaries. Requested scope: roots=packages/core/schemas/agent-work-order-v2.schema.json,packages/core/src/runner/agent-semantic-result.test.ts,packages/core/src/runner/agent-semantic-result.ts,packages/core/src/runner/agent-work-order.test.ts,packages/core/src/runner/agent-work-order.ts,packages/spec/schemas/agent-work-order-v2.schema.json,schemas/agent-semantic-result.schema.json,schemas/agent-work-order-v2.schema.json; repository effects=schema,source_code,tests; request digest=sha256:66cfcdbaa532548a40d8c2c98bf5fe5664117026853e942e2867666da854a830. Agentplane receipt: external-agent-blocker/tr_fafb9003fb38969c14c05da994bb4786/sha256:96a19ca4979c3192f93252e565c1f2d0ec596d1d9d3fcebadb33b5b1f4c1c382/sha256:66cfcdbaa532548a40d8c2c98bf5fe5664117026853e942e2867666da854a830."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/core/schemas/agent-work-order-v2.schema.json, packages/core/src/runner/agent-semantic-result.test.ts, packages/core/src/runner/agent-semantic-result.ts, packages/core/src/runner/agent-work-order.test.ts, packages/core/src/runner/agent-work-order.ts, packages/spec/schemas/agent-work-order-v2.schema.json, schemas/agent-semantic-result.schema.json, schemas/agent-work-order-v2.schema.json; repository effects: schema, source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical CLI and managed transport implementation is preserved and locally qualified. Required full CI is blocked by the unrecorded additive task new --canonical option in the reviewed compatibility candidate, which is outside this WorkOrder scope. Recommended action: Authorize the native scope extension for scripts/baselines/v0.7-compatibility-candidate.json. Issue a fresh EXECUTOR packet. Verify and restore the preserved 37-file implementation. Record the exact additive CLI option delta and M3 provenance in the mutable candidate. Update the already-authorized critical CLI assertions. Preserve the immutable compatibility anchor, package versions and release authority boundaries. Re-run full CI and return the typed result. Requested scope: roots=scripts/baselines/v0.7-compatibility-candidate.json; repository effects=public_api,tests; request digest=sha256:51fb2d061d7c8cbf3abab00ad07c3136af08cab5f895028b0f58e17885ea5976. Agentplane receipt: external-agent-blocker/tr_9f515053b3ee5c6fbd284da1cf31b9b5/sha256:2da6a4669db46923b27f8f022e193f3fa811adfafbdb300b04479622ce657057/sha256:51fb2d061d7c8cbf3abab00ad07c3136af08cab5f895028b0f58e17885ea5976."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: scripts/baselines/v0.7-compatibility-candidate.json; repository effects: public_api, tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The authorized compatibility candidate is updated, but its exact checker whitelist requires one additional scoped file. Recommended action: Request USER approval for this one-file scope extension. Preserve the archived implementation. After approval, restore validated owned files, update the exact checker inventories and descriptors without removing assertions, and rerun focused checks and ci:local:full. Requested scope: roots=scripts/checks/check-compatibility-contract-baseline.mjs; repository effects=public_api,tests; request digest=sha256:6710e401e1ec2fe7911d5ab66c6579111b673dd54b2b2ce5d657a1bbf2f68512. Agentplane receipt: external-agent-blocker/tr_f61103be288912b14b2416eab678bda6/sha256:4c5a20eb1c9dacb990a7dddd1e4e7490a6e536df9389ed76700fdc961965c742/sha256:6710e401e1ec2fe7911d5ab66c6579111b673dd54b2b2ce5d657a1bbf2f68512."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: scripts/checks/check-compatibility-contract-baseline.mjs; repository effects: public_api, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 134bb1bbc03c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: aa93e1d10d69. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c30b3503903a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 10f2efcbcc64. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 71912f4add7d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The recorded m3-lifecycle validation is not successful. Full CI failed because docs/developer/harness-dev.mdx is not Prettier-clean and the core group exceeded its 15-minute timeout. The current WorkOrder does not authorize the documentation path required to repair the deterministic formatting failure."
  -
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The approved m3-lifecycle WorkItem needs a bounded scope refinement because its required full-CI gate deterministically fails on a documentation file changed during prior requalification, while the current execution contract excludes that file."
  -
    author: "ORCHESTRATOR"
    body: "Cross-machine goal handoff: resume this existing task; do not create a second Clean Core implementation task. Provider checkpoint must contain commit 71912f4add7df8db538392150ec634b2012770d1 plus this task artifact revision. Start with agentplane task resume-context 202608291006-255K66 --json, then use fresh agentplane task advance 202608291006-255K66 --agent-json packets only. Keep one WorkItem active at a time, minimize code, and reuse or delete existing mechanisms before adding abstractions. MPXQBK and the 0.7.8 release lane are not prerequisites. Before legacy retirement, require immutable evidence for candidate-runtime qualification, controller transfer, self-hosting canary, sustained self-hosting, observation, and rollback. Do not trust source main, the candidate branch, or an ambient CLI as controller without an explicit runtime authority receipt. Projection cleanup remains owned by Z7JBFH then WXP9JS."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The retained lifecycle foundation already contains the required semantic plan-binding test consolidation, and the focused concurrent active-claim retirement suite passes. Full native CI cannot become green under the current packet because its deterministic Prettier failure is in a document excluded from the packet's writable roots. Recommended action: Extend this WorkItem's writable roots by docs/developer/harness-dev.mdx with documentation and repository_write effects, then issue a fresh EXECUTOR packet. Requested scope: roots=docs/developer/harness-dev.mdx; repository effects=documentation,repository_write; request digest=sha256:bb8c59922ef25014cde80cc1056f7560b63a97f82c50c915cf018b25446026d0. Agentplane receipt: external-agent-blocker/tr_9c6ef61b40f4aef93071607487463c66/sha256:444fe6b582cbbba83d780f118027a165f1c0c9e390d5f3f313135ee769e73bb7/sha256:bb8c59922ef25014cde80cc1056f7560b63a97f82c50c915cf018b25446026d0."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: docs/developer/harness-dev.mdx; repository effects: documentation, repository_write."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c76590dcef51. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d26d9bace65f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 9207950b8fcc. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved m3-lifecycle WorkItem and this packet authorize the Bun smoke script, but the task-level execution contract omitted that exact root. Result admission therefore requires the matching state-bound scope extension before it can accept the already-qualified implementation. Recommended action: Extend task authority by scripts/release/smoke-bun-compiled-cli.mjs with repository_write and tests effects, then issue a fresh EXECUTOR packet. Requested scope: roots=scripts/release/smoke-bun-compiled-cli.mjs; repository effects=repository_write,tests; request digest=sha256:e66450e22342237954118ad1febee57b158f542518a3f3874827572acb5ff468. Agentplane receipt: external-agent-blocker/tr_d6b2efd3198d4dd24308765e1c4e2866/sha256:bd641f14a4d454547fb48e03394ffb6770b1159a61c0f5916bb244fecc523d9e/sha256:e66450e22342237954118ad1febee57b158f542518a3f3874827572acb5ff468."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: scripts/release/smoke-bun-compiled-cli.mjs; repository effects: repository_write, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 10afd7c227f3. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The regenerated m3-lifecycle WorkItem omitted ten exact resource claims already owned by its retained implementation checkpoint. Admission is blocked until those finite historical paths are restored to this WorkItem; no new implementation or behavioral scope is required. Recommended action: Approve the exact plan refinement and issue a fresh m3-lifecycle EXECUTOR packet with those ten roots. Agentplane receipt: external-agent-blocker/tr_9299f0dfadd41fa156f0938e5fa2d279/sha256:cb66290df8dca7811c06191034167289e63a4603be52a75ace8c504afd16e035."
  -
    author: "ORCHESTRATOR"
    body: "Resume to apply the recorded bounded m3-lifecycle resource-claim refinement."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c0cb0ea9dac3. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ec2b61568210. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2f4980c1f34d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 672838919143. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b1d64c2eb998. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 76f05d8ae609. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0020cbe98ffc. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b6ad0005f22f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 20b3af7e3442. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 98fae647679d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 072f8af45326. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1692b5eab62e. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-30T21:48:11.738Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T22:06:13.020Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 36e1575c028d. CLI accepted one state-bound external-agent semantic result."
    commit: "36e1575c028d8fe54efb664ac92f745fdcdbcff9"
  -
    type: "verify"
    at: "2026-08-30T22:13:21.915Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T22:19:09.690Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d154a7268f6a. CLI accepted one state-bound external-agent semantic result."
    commit: "d154a7268f6aa9f23e6fbf04ffd857f1a552cb86"
  -
    type: "verify"
    at: "2026-08-30T22:26:29.048Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T22:28:55.111Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 36aa33491d34. CLI accepted one state-bound external-agent semantic result."
    commit: "36aa33491d34d8e894252915636e48a50b8ffe61"
  -
    type: "verify"
    at: "2026-08-30T22:38:08.808Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T23:15:01.382Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7d3e7ba7fdf2. CLI accepted one state-bound external-agent semantic result."
    commit: "7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1"
  -
    type: "verify"
    at: "2026-08-30T23:22:26.285Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-31T07:28:36.362Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-31T07:33:58.931Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The newly approved plan re-materialized m3-projections and selected it for full-CI requalification. The observed required-CI blocker is in two core test files outside this packet. Existing projection implementation remains intact; no source changes were made. Recommended action: Use the native state-bound scope-extension operator action for exactly the two test files, then issue a fresh executor packet. Reuse the existing projection implementation and requalify it. Do not edit Task state or replay the projection implementation. Requested scope: roots=packages/core/src/tasks/task-kernel/invariants.test.ts,packages/core/src/tasks/task-kernel/kernel.test.ts; repository effects=tests; request digest=sha256:1ccea219956fc7611b0e680e909f9aee5f594d0c4b5cd01f0d7aaff9cb950dff. Agentplane receipt: external-agent-blocker/tr_17b15e89ebfae080f1a6f4326a5e479b/sha256:ea1f761fe8a34155ee2a0eb74797fbe4d35119f154348e40feba751562bc4aff/sha256:1ccea219956fc7611b0e680e909f9aee5f594d0c4b5cd01f0d7aaff9cb950dff."
  -
    type: "status"
    at: "2026-08-31T07:38:47.591Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f3ca64493952. CLI accepted one state-bound external-agent semantic result."
    commit: "f3ca64493952d9a37fb35cb5c12ef61a783623bc"
  -
    type: "verify"
    at: "2026-08-31T07:48:28.599Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-31T07:52:56.383Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b6434d712561. CLI accepted one state-bound external-agent semantic result."
    commit: "b6434d712561c91b64c87dcc7da732f5c8056c7f"
  -
    type: "verify"
    at: "2026-08-31T08:01:55.603Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-31T08:26:43.719Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 50dfade20373. CLI accepted one state-bound external-agent semantic result."
    commit: "50dfade2037390ba34469107b156075014aafc06"
  -
    type: "verify"
    at: "2026-08-31T08:35:25.130Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-31T09:12:16.094Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Transport implementation requires the existing shared WorkOrder and semantic-result schema boundary. Partial implementation is preserved and does not satisfy this WorkItem. Recommended action: Extend only the listed schema source, test and generated artifact paths. Reissue the same transport implementation WorkItem. Preserve all existing changes and approval boundaries. Requested scope: roots=packages/core/schemas/agent-work-order-v2.schema.json,packages/core/src/runner/agent-semantic-result.test.ts,packages/core/src/runner/agent-semantic-result.ts,packages/core/src/runner/agent-work-order.test.ts,packages/core/src/runner/agent-work-order.ts,packages/spec/schemas/agent-work-order-v2.schema.json,schemas/agent-semantic-result.schema.json,schemas/agent-work-order-v2.schema.json; repository effects=schema,source_code,tests; request digest=sha256:66cfcdbaa532548a40d8c2c98bf5fe5664117026853e942e2867666da854a830. Agentplane receipt: external-agent-blocker/tr_fafb9003fb38969c14c05da994bb4786/sha256:96a19ca4979c3192f93252e565c1f2d0ec596d1d9d3fcebadb33b5b1f4c1c382/sha256:66cfcdbaa532548a40d8c2c98bf5fe5664117026853e942e2867666da854a830."
  -
    type: "status"
    at: "2026-08-31T14:22:09.217Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical CLI and managed transport implementation is preserved and locally qualified. Required full CI is blocked by the unrecorded additive task new --canonical option in the reviewed compatibility candidate, which is outside this WorkOrder scope. Recommended action: Authorize the native scope extension for scripts/baselines/v0.7-compatibility-candidate.json. Issue a fresh EXECUTOR packet. Verify and restore the preserved 37-file implementation. Record the exact additive CLI option delta and M3 provenance in the mutable candidate. Update the already-authorized critical CLI assertions. Preserve the immutable compatibility anchor, package versions and release authority boundaries. Re-run full CI and return the typed result. Requested scope: roots=scripts/baselines/v0.7-compatibility-candidate.json; repository effects=public_api,tests; request digest=sha256:51fb2d061d7c8cbf3abab00ad07c3136af08cab5f895028b0f58e17885ea5976. Agentplane receipt: external-agent-blocker/tr_9f515053b3ee5c6fbd284da1cf31b9b5/sha256:2da6a4669db46923b27f8f022e193f3fa811adfafbdb300b04479622ce657057/sha256:51fb2d061d7c8cbf3abab00ad07c3136af08cab5f895028b0f58e17885ea5976."
  -
    type: "status"
    at: "2026-08-31T15:26:17.505Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The authorized compatibility candidate is updated, but its exact checker whitelist requires one additional scoped file. Recommended action: Request USER approval for this one-file scope extension. Preserve the archived implementation. After approval, restore validated owned files, update the exact checker inventories and descriptors without removing assertions, and rerun focused checks and ci:local:full. Requested scope: roots=scripts/checks/check-compatibility-contract-baseline.mjs; repository effects=public_api,tests; request digest=sha256:6710e401e1ec2fe7911d5ab66c6579111b673dd54b2b2ce5d657a1bbf2f68512. Agentplane receipt: external-agent-blocker/tr_f61103be288912b14b2416eab678bda6/sha256:4c5a20eb1c9dacb990a7dddd1e4e7490a6e536df9389ed76700fdc961965c742/sha256:6710e401e1ec2fe7911d5ab66c6579111b673dd54b2b2ce5d657a1bbf2f68512."
  -
    type: "status"
    at: "2026-08-31T16:56:08.983Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 134bb1bbc03c. CLI accepted one state-bound external-agent semantic result."
    commit: "134bb1bbc03cb4bd21354c366c8f5ead6ad2ea68"
  -
    type: "verify"
    at: "2026-08-31T17:05:02.300Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-31T21:26:25.011Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-31T21:33:22.441Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: aa93e1d10d69. CLI accepted one state-bound external-agent semantic result."
    commit: "aa93e1d10d69d8899af6e2e7bf3af5c25a0c87bb"
  -
    type: "verify"
    at: "2026-08-31T22:03:35.074Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-31T22:13:55.146Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c30b3503903a. CLI accepted one state-bound external-agent semantic result."
    commit: "c30b3503903ab702763a1b4883a1799d8347054f"
  -
    type: "verify"
    at: "2026-08-31T22:44:05.109Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-31T23:07:10.413Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 10f2efcbcc64. CLI accepted one state-bound external-agent semantic result."
    commit: "10f2efcbcc64b856aea2f0ffc979e45c99e941f0"
  -
    type: "status"
    at: "2026-08-31T23:08:30.422Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 71912f4add7d. CLI accepted one state-bound external-agent semantic result."
    commit: "71912f4add7df8db538392150ec634b2012770d1"
  -
    type: "comment"
    at: "2026-08-31T23:31:18.169Z"
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The recorded m3-lifecycle validation is not successful. Full CI failed because docs/developer/harness-dev.mdx is not Prettier-clean and the core group exceeded its 15-minute timeout. The current WorkOrder does not authorize the documentation path required to repair the deterministic formatting failure."
  -
    type: "comment"
    at: "2026-08-31T23:31:46.906Z"
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The approved m3-lifecycle WorkItem needs a bounded scope refinement because its required full-CI gate deterministically fails on a documentation file changed during prior requalification, while the current execution contract excludes that file."
  -
    type: "comment"
    at: "2026-09-01T22:14:14.033Z"
    author: "ORCHESTRATOR"
    body: "Cross-machine goal handoff: resume this existing task; do not create a second Clean Core implementation task. Provider checkpoint must contain commit 71912f4add7df8db538392150ec634b2012770d1 plus this task artifact revision. Start with agentplane task resume-context 202608291006-255K66 --json, then use fresh agentplane task advance 202608291006-255K66 --agent-json packets only. Keep one WorkItem active at a time, minimize code, and reuse or delete existing mechanisms before adding abstractions. MPXQBK and the 0.7.8 release lane are not prerequisites. Before legacy retirement, require immutable evidence for candidate-runtime qualification, controller transfer, self-hosting canary, sustained self-hosting, observation, and rollback. Do not trust source main, the candidate branch, or an ambient CLI as controller without an explicit runtime authority receipt. Projection cleanup remains owned by Z7JBFH then WXP9JS."
  -
    type: "status"
    at: "2026-09-01T22:49:51.507Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The retained lifecycle foundation already contains the required semantic plan-binding test consolidation, and the focused concurrent active-claim retirement suite passes. Full native CI cannot become green under the current packet because its deterministic Prettier failure is in a document excluded from the packet's writable roots. Recommended action: Extend this WorkItem's writable roots by docs/developer/harness-dev.mdx with documentation and repository_write effects, then issue a fresh EXECUTOR packet. Requested scope: roots=docs/developer/harness-dev.mdx; repository effects=documentation,repository_write; request digest=sha256:bb8c59922ef25014cde80cc1056f7560b63a97f82c50c915cf018b25446026d0. Agentplane receipt: external-agent-blocker/tr_9c6ef61b40f4aef93071607487463c66/sha256:444fe6b582cbbba83d780f118027a165f1c0c9e390d5f3f313135ee769e73bb7/sha256:bb8c59922ef25014cde80cc1056f7560b63a97f82c50c915cf018b25446026d0."
  -
    type: "status"
    at: "2026-09-01T23:08:13.855Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c76590dcef51. CLI accepted one state-bound external-agent semantic result."
    commit: "c76590dcef51f16aad20321840e5c147ca79085a"
  -
    type: "status"
    at: "2026-09-01T23:11:10.542Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-01T23:14:32.351Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d26d9bace65f. CLI accepted one state-bound external-agent semantic result."
    commit: "d26d9bace65f9b9eaa1289ba49dd88e329da4759"
  -
    type: "status"
    at: "2026-09-01T23:40:43.793Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 9207950b8fcc. CLI accepted one state-bound external-agent semantic result."
    commit: "9207950b8fcc29bb59840daf835528326c564699"
  -
    type: "status"
    at: "2026-09-01T23:43:04.301Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved m3-lifecycle WorkItem and this packet authorize the Bun smoke script, but the task-level execution contract omitted that exact root. Result admission therefore requires the matching state-bound scope extension before it can accept the already-qualified implementation. Recommended action: Extend task authority by scripts/release/smoke-bun-compiled-cli.mjs with repository_write and tests effects, then issue a fresh EXECUTOR packet. Requested scope: roots=scripts/release/smoke-bun-compiled-cli.mjs; repository effects=repository_write,tests; request digest=sha256:e66450e22342237954118ad1febee57b158f542518a3f3874827572acb5ff468. Agentplane receipt: external-agent-blocker/tr_d6b2efd3198d4dd24308765e1c4e2866/sha256:bd641f14a4d454547fb48e03394ffb6770b1159a61c0f5916bb244fecc523d9e/sha256:e66450e22342237954118ad1febee57b158f542518a3f3874827572acb5ff468."
  -
    type: "status"
    at: "2026-09-01T23:44:15.579Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 10afd7c227f3. CLI accepted one state-bound external-agent semantic result."
    commit: "10afd7c227f39ea036e250ea3dadae08b7f17373"
  -
    type: "status"
    at: "2026-09-01T23:48:23.312Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The regenerated m3-lifecycle WorkItem omitted ten exact resource claims already owned by its retained implementation checkpoint. Admission is blocked until those finite historical paths are restored to this WorkItem; no new implementation or behavioral scope is required. Recommended action: Approve the exact plan refinement and issue a fresh m3-lifecycle EXECUTOR packet with those ten roots. Agentplane receipt: external-agent-blocker/tr_9299f0dfadd41fa156f0938e5fa2d279/sha256:cb66290df8dca7811c06191034167289e63a4603be52a75ace8c504afd16e035."
  -
    type: "status"
    at: "2026-09-01T23:49:34.757Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume to apply the recorded bounded m3-lifecycle resource-claim refinement."
  -
    type: "status"
    at: "2026-09-01T23:51:52.659Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c0cb0ea9dac3. CLI accepted one state-bound external-agent semantic result."
    commit: "c0cb0ea9dac3ba0bfaaa065511a701bf23f038fb"
  -
    type: "status"
    at: "2026-09-01T23:52:47.878Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ec2b61568210. CLI accepted one state-bound external-agent semantic result."
    commit: "ec2b61568210b971d6167e7a8e74e29858032890"
  -
    type: "status"
    at: "2026-09-01T23:58:03.464Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2f4980c1f34d. CLI accepted one state-bound external-agent semantic result."
    commit: "2f4980c1f34dcc449db27f0fb3e19f8d4505b704"
  -
    type: "status"
    at: "2026-09-02T00:06:47.679Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 672838919143. CLI accepted one state-bound external-agent semantic result."
    commit: "67283891914318012ceda7d15eca342a539c3191"
  -
    type: "status"
    at: "2026-09-02T00:15:54.462Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b1d64c2eb998. CLI accepted one state-bound external-agent semantic result."
    commit: "b1d64c2eb998729ba751b11102f776b5bf5b5896"
  -
    type: "status"
    at: "2026-09-02T00:28:12.476Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 76f05d8ae609. CLI accepted one state-bound external-agent semantic result."
    commit: "76f05d8ae609e8d71b8fd6a9c7e35a2567784024"
  -
    type: "status"
    at: "2026-09-02T00:30:54.842Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0020cbe98ffc. CLI accepted one state-bound external-agent semantic result."
    commit: "0020cbe98ffc19db543461a6dfa6a1d2f3bda35c"
  -
    type: "status"
    at: "2026-09-02T00:35:24.703Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b6ad0005f22f. CLI accepted one state-bound external-agent semantic result."
    commit: "b6ad0005f22fdedc9c48fa3c605d8f286b24d46c"
  -
    type: "status"
    at: "2026-09-02T00:36:26.007Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 20b3af7e3442. CLI accepted one state-bound external-agent semantic result."
    commit: "20b3af7e344205b5705de1dc7b8af0d7efff5905"
  -
    type: "status"
    at: "2026-09-02T00:41:33.395Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 98fae647679d. CLI accepted one state-bound external-agent semantic result."
    commit: "98fae647679d3d10c9330a23b26323003482f3fb"
  -
    type: "status"
    at: "2026-09-02T00:43:24.241Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 072f8af45326. CLI accepted one state-bound external-agent semantic result."
    commit: "072f8af45326322e70c944837ea313e5d2cb3121"
  -
    type: "status"
    at: "2026-09-02T00:58:20.284Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1692b5eab62e. CLI accepted one state-bound external-agent semantic result."
    commit: "1692b5eab62ec4ab274d5b9922fa7a441f9035be"
  -
    type: "verify"
    at: "2026-09-02T01:06:37.540Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-02T01:06:38.743Z"
doc_updated_by: "SUPERVISOR"
description: "After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence."
sections:
  Summary: |-
    Cut over to the canonical Task kernel and retire legacy core paths

    After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
  Scope: |-
    - In scope: After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
    - Out of scope: unrelated refactors not required for "Cut over to the canonical Task kernel and retire legacy core paths".
  Plan: "Preserved the approved M3 WorkItem graph and restored only the ten exact m3-lifecycle resource claims required to admit its retained implementation checkpoint."
  Verify Steps: |-
    PLANNER fallback scaffold for "Cut over to the canonical Task kernel and retire legacy core paths". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Cut over to the canonical Task kernel and retire legacy core paths". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T22:13:21.915Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:1d3f9ef9693d7e0ddb5a5bb53efbf7ef423d277c12454a560fea222153023b32

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-30T22:26:29.048Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:18f9370d036593551fe4c629bdb8e27d65371788641b60a7c3c89a10c4d22972

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-30T22:38:08.808Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:4ed01a1636f61d7bb5cf34951dac6cc8b078037b30df76bffab188fabd4d0749

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-30T23:22:26.285Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:897f7059ff4cb8d19824b61e65e265be9e275e1a169e9fd6e7e9101829668f0a

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-31T07:48:28.599Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:f8549963ee5be01355c4e2f1f932a905dfbb432c6b1a9b16467e1521140a15dd

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-31T08:01:55.603Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:4f0090bfe93d4ac1a47557f2069c1c04f257d5c6c58fa1191bc7460e508e5d9f

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-31T08:35:25.130Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:b81cddc63c39533e83771280cc0d1461eeca8c2ed56a05f8fec5214eb1e79ca7

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-31T17:05:02.300Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:fad6092e72ea1f067e43cde4b601f44d537fbda03a29ec128be22667c86de093

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-31T22:03:35.074Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:b0d43269250ecf30e79fa540307d225e6e90ec3f17461b1e28e4826f6cbeed02

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-08-31T22:44:05.109Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:589d2fc7463432d4cf07c6820a8ceaf6ab7762e5bacfaedcf568b9fa199096cc

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

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

    ### 2026-09-02T01:06:37.540Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:82436dfa5c7435a48470ff031a61dc084b95e4ab4efa04c31deffc0aaa132b87

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

    Check: docs_contract
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run qualification:mixed-scope-lifecycle
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291006-255K66
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
    - Observation: Plan replacement reset the m3-lifecycle resource claims for ten paths already present in its retained implementation checkpoint.
      Impact: The supervisor cannot admit the completed rework receipt until the WorkItem definition again owns those exact historical paths.
      Resolution: Apply one bounded plan refinement restoring only the ten reported roots; preserve outputs, acceptance, risk, dependencies, architecture, external effects, and other WorkItems.

    - Observation: The supervisor full gate selected stale Node 20.18.2 because verificationChildEnv promoted inherited NVM_BIN ahead of the already-selected parent PATH.
      Impact: Repository checks that require the declared Node 24 runtime failed during Vitest ESM startup before testing implementation behavior.
      Resolution: Keep the selected parent PATH first for verification children and retain inherited manager directories as fallback; cover the ordering in verify-log tests.
extensions:
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:dab3bd4435772ce3e20ded54713ca730f67341d929c1f350446f1cf2fe653c80"
    digest: "sha256:cc5127f595191c23a69433e75a198e3187367ed06e664fa7c2540b8d3f529882"
    grant_id: "8d5dbf2a-d493-48b8-bd81-384f13b9e4dd"
    issued_at: "2026-09-01T23:51:00.905Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ffb0baae0c5ffeec098a82699f11b07cd5e4fa9595c4dd2f05028d2a5a630cdd"
    plan_revision: 99
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:bf7e0b78c96fdf79b23edb6eaae30cdf7cf405e2f6fabf8c72b3b30074e7dc29"
    status: "active"
    task_id: "202608291006-255K66"
  agentplane.scope_extension_request:
    applied_at: "2026-09-01T23:43:09.828Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:bd641f14a4d454547fb48e03394ffb6770b1159a61c0f5916bb244fecc523d9e"
    kind: "task_scope_extension_request"
    request:
      rationale: "The approved m3-lifecycle full native CI repair requires ad-hoc signing of the generated temporary Bun executable on macOS; the WorkItem and packet already authorize this exact file."
      repository_effects:
        - "repository_write"
        - "tests"
      schema_version: 1
      scope_roots:
        - "scripts/release/smoke-bun-compiled-cli.mjs"
    request_digest: "sha256:e66450e22342237954118ad1febee57b158f542518a3f3874827572acb5ff468"
    schema_version: 1
    status: "applied"
    transition_id: "tr_d6b2efd3198d4dd24308765e1c4e2866"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-01T23:51:00.905Z"
        approved_by: "USER"
        approved_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-01T23:50:54.952Z"
      digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
      proposal:
        assumptions:
          - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
          - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
          - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
          - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
          - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
          - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          - "The macOS Bun compiled smoke failure is an invalid ad-hoc signature on the generated temporary executable. Re-signing only that temporary executable is a local qualification repair; it does not publish a release or change release metadata."
          - "The plan replacement reset ten resource claims already owned by the retained m3-lifecycle checkpoint. This refinement restores only those exact paths and preserves every WorkItem objective, dependency, output, acceptance criterion, validation check, risk, and all saved runtime evidence."
        planning_baseline:
          captured_at: "2026-09-01T23:49:41.958Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a9c5e60a5f78d6a98feeb2a58f47adeba0aaab4b20c20a5155644d0b55846320"
          dirty_paths:
            - ".agentplane/tasks/202608291006-255K66/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "f1042dee4e05e023bb150f6e23b9c4868bd5cd9a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:98"
        schema_version: 1
        task_id: "202608291006-255K66"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "m3-full"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "m3-invariants"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run qualification:mixed-scope-lifecycle"
              id: "m3-packaged"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "m3-full"
                - "m3-invariants"
                - "m3-packaged"
              description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
              id: "m3-complete"
              required: true
          evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                  id: "m3-projections-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on: []
              expected_outputs:
                - "m3-projections-evidence"
              id: "m3-projections"
              objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
              risk: "high"
              scope_roots:
                - "docs/developer"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                    - "m3-full"
                  description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                  id: "m3-lifecycle-acceptance"
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
                  - "KernelTaskLifecycle"
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "compareExecutionAuthority"
              depends_on:
                - "m3-projections"
              expected_outputs:
                - "m3-lifecycle-evidence"
              id: "m3-lifecycle"
              objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer/harness-dev.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/release/smoke-bun-compiled-cli.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-semantic-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-work-order.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-work-order.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas/agent-semantic-result.schema.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas/agent-work-order-v2.schema.json"
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
                - "docs/developer/harness-dev.mdx"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks"
                - "packages/testkit/src"
                - "scripts/release/smoke-bun-compiled-cli.mjs"
                - "packages/core/schemas/agent-work-order-v2.schema.json"
                - "packages/core/src/runner/agent-semantic-result.test.ts"
                - "packages/core/src/runner/agent-semantic-result.ts"
                - "packages/core/src/runner/agent-work-order.test.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "packages/spec/schemas/agent-work-order-v2.schema.json"
                - "schemas/agent-semantic-result.schema.json"
                - "schemas/agent-work-order-v2.schema.json"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "m3-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
                    required: true
                evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                    - "m3-full"
                  description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                  id: "m3-lifecycle-authority-acceptance"
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
                  - "KernelTaskLifecycle"
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "compareExecutionAuthority"
              depends_on:
                - "m3-lifecycle"
              expected_outputs:
                - "m3-lifecycle-authority-evidence"
              id: "m3-lifecycle-authority"
              objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "m3-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
                    required: true
                evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                    - "m3-full"
                  description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                  id: "m3-lifecycle-transport-acceptance"
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
                  - "KernelTaskLifecycle"
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "compareExecutionAuthority"
              depends_on:
                - "m3-lifecycle-authority"
              expected_outputs:
                - "m3-lifecycle-transport-evidence"
              id: "m3-lifecycle-transport"
              objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-semantic-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-work-order.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/agent-work-order.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas/agent-semantic-result.schema.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas/agent-work-order-v2.schema.json"
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
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/core/schemas/agent-work-order-v2.schema.json"
                - "packages/core/src/runner/agent-semantic-result.test.ts"
                - "packages/core/src/runner/agent-semantic-result.ts"
                - "packages/core/src/runner/agent-work-order.test.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "packages/core/src/tasks"
                - "packages/spec/schemas/agent-work-order-v2.schema.json"
                - "packages/testkit/src"
                - "schemas/agent-semantic-result.schema.json"
                - "schemas/agent-work-order-v2.schema.json"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "m3-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
                    required: true
                evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                  id: "m3-effects-validation-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-lifecycle-transport"
              expected_outputs:
                - "m3-effects-validation-evidence"
              id: "m3-effects-validation"
              objective: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
              optional: false
              priority: 2
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/runner"
                - "packages/testkit/src"
                - "scripts/qualification"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                    id: "m3-effects-validation-acceptance"
                    required: true
                evidence_fingerprint: "sha256:c6f4e3c73cd3fa83ac3bcad06e0a629874c8c6eb6b2549dcf7013b03061b0167"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                  id: "m3-effects-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-effects-validation"
              expected_outputs:
                - "m3-effects-evidence"
              id: "m3-effects"
              objective: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
              optional: false
              priority: 2
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                    id: "m3-effects-acceptance"
                    required: true
                evidence_fingerprint: "sha256:5222e7336b44df822f7c82bf4c2bdd6d2138f7c3e79246a4e5a15fc6d4b4ddc5"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                  id: "m3-task-classes-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-effects"
              expected_outputs:
                - "m3-task-classes-evidence"
              id: "m3-task-classes"
              objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
              optional: false
              priority: 3
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "packages/testkit/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                  id: "m3-crash-migration-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-task-classes"
              expected_outputs:
                - "m3-crash-migration-evidence"
              id: "m3-crash-migration"
              objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
              optional: false
              priority: 4
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "docs/developer"
                - "packages/testkit/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                  id: "m3-self-hosting-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-crash-migration"
              expected_outputs:
                - "m3-self-hosting-evidence"
              id: "m3-self-hosting"
              objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
              optional: false
              priority: 5
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters"
                - "scripts/qualification"
                - "docs/developer"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                  id: "m3-retirement-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-self-hosting"
              expected_outputs:
                - "m3-retirement-evidence"
              id: "m3-retirement"
              objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
              optional: false
              priority: 6
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "scripts/checks"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "package.json"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                  id: "m3-final-qualification-acceptance"
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
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-retirement"
              expected_outputs:
                - "m3-final-qualification-evidence"
              id: "m3-final-qualification"
              objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
              optional: false
              priority: 7
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "scripts/checks"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "package.json"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
      revision: 11
      schema_version: 1
      task_id: "202608291006-255K66"
    event_cursor: 6
    final_validation: null
    id: "202608291006-255K66"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lifecycle:invariants"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run qualification:mixed-scope-lifecycle"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-29T10:06:25.960Z"
      constraints: []
      request: |-
        Cut over to the canonical Task kernel and retire legacy core paths

        After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
      task_id: "202608291006-255K66"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-30T18:48:25.201Z"
          approved_by: "USER"
          approved_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T18:48:04.947Z"
        digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
          planning_baseline:
            captured_at: "2026-08-30T18:45:09.785Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
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
              - ".agentplane/tasks/202608291006-255K66/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "36741ce5160d452ca9660a388241cb4da32f842a"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt to KernelBackendAdapter and reduceTaskCommand. Reuse M1 authority comparison and M2 atomic adapters. CLI and managed runner share one application service. No implicit migration or second writable lifecycle source. Preserve current WorkItem results under non-material refinements. Test local and cloud fake paths and exact mutation identity."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt to KernelBackendAdapter and reduceTaskCommand. Reuse M1 authority comparison and M2 atomic adapters. CLI and managed runner share one application service. No implicit migration or second writable lifecycle source. Preserve current WorkItem results under non-material refinements. Test local and cloud fake paths and exact mutation identity."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt to KernelBackendAdapter and reduceTaskCommand. Reuse M1 authority comparison and M2 atomic adapters. CLI and managed runner share one application service. No implicit migration or second writable lifecycle source. Preserve current WorkItem results under non-material refinements. Test local and cloud fake paths and exact mutation identity."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-08-31T07:28:23.692Z"
          approved_by: "USER"
          approved_digest: "sha256:c8e7a9ef42c56d7b5517853463ac80914ba12c3aa496246a43db928dc841f804"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T23:29:34.902Z"
        digest: "sha256:c8e7a9ef42c56d7b5517853463ac80914ba12c3aa496246a43db928dc841f804"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-30T23:22:31.535Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1c428af83d509256b5e1e2f92879625d60089bd958f5265efacfc74c88043291"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/pr/github-body.md"
              - ".agentplane/tasks/202608291006-255K66/pr/meta.json"
              - ".agentplane/tasks/202608291006-255K66/pr/review.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-255K66/verification/20260830232226285-85c9df8e9b3e28cc.json"
            git:
              kind: "commit"
              ref: null
              sha: "7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:22"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-08-31T07:34:05.931Z"
          approved_by: "USER"
          approved_digest: "sha256:dec68171cf2360f480968302f4f8c1941163c7437e7510d9090cbf7d959002f7"
          policy_facts:
            - "state_bound_scope_extension:sha256:1ccea219956fc7611b0e680e909f9aee5f594d0c4b5cd01f0d7aaff9cb950dff"
          state: "approved"
        created_at: "2026-08-31T07:34:05.931Z"
        digest: "sha256:dec68171cf2360f480968302f4f8c1941163c7437e7510d9090cbf7d959002f7"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-30T23:22:31.535Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1c428af83d509256b5e1e2f92879625d60089bd958f5265efacfc74c88043291"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/pr/github-body.md"
              - ".agentplane/tasks/202608291006-255K66/pr/meta.json"
              - ".agentplane/tasks/202608291006-255K66/pr/review.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-255K66/verification/20260830232226285-85c9df8e9b3e28cc.json"
            git:
              kind: "commit"
              ref: null
              sha: "7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:22"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-08-31T13:30:45.337Z"
          approved_by: "USER"
          approved_digest: "sha256:160138cbd3659ba5efe5ae021fc64c61c7099ff189361919afb1a9c5043deb28"
          policy_facts:
            - "state_bound_scope_extension:sha256:66cfcdbaa532548a40d8c2c98bf5fe5664117026853e942e2867666da854a830"
          state: "approved"
        created_at: "2026-08-31T13:30:45.337Z"
        digest: "sha256:160138cbd3659ba5efe5ae021fc64c61c7099ff189361919afb1a9c5043deb28"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-30T23:22:31.535Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1c428af83d509256b5e1e2f92879625d60089bd958f5265efacfc74c88043291"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/pr/github-body.md"
              - ".agentplane/tasks/202608291006-255K66/pr/meta.json"
              - ".agentplane/tasks/202608291006-255K66/pr/review.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-255K66/verification/20260830232226285-85c9df8e9b3e28cc.json"
            git:
              kind: "commit"
              ref: null
              sha: "7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:22"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 4
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-08-31T15:18:08.312Z"
          approved_by: "USER"
          approved_digest: "sha256:fc40a9434cb7850edd8b4cc008a445bd74c8f1091d5c9b5e14095b2ec1700f22"
          policy_facts:
            - "state_bound_scope_extension:sha256:51fb2d061d7c8cbf3abab00ad07c3136af08cab5f895028b0f58e17885ea5976"
          state: "approved"
        created_at: "2026-08-31T15:18:08.312Z"
        digest: "sha256:fc40a9434cb7850edd8b4cc008a445bd74c8f1091d5c9b5e14095b2ec1700f22"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-30T23:22:31.535Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1c428af83d509256b5e1e2f92879625d60089bd958f5265efacfc74c88043291"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/pr/github-body.md"
              - ".agentplane/tasks/202608291006-255K66/pr/meta.json"
              - ".agentplane/tasks/202608291006-255K66/pr/review.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-255K66/verification/20260830232226285-85c9df8e9b3e28cc.json"
            git:
              kind: "commit"
              ref: null
              sha: "7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:22"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 5
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-08-31T16:45:50.902Z"
          approved_by: "USER"
          approved_digest: "sha256:65cb03d9aba5e6757c983cb354956587b566aac9647eff41a531d2eca68c5dfe"
          policy_facts:
            - "state_bound_scope_extension:sha256:6710e401e1ec2fe7911d5ab66c6579111b673dd54b2b2ce5d657a1bbf2f68512"
          state: "approved"
        created_at: "2026-08-31T16:45:50.902Z"
        digest: "sha256:65cb03d9aba5e6757c983cb354956587b566aac9647eff41a531d2eca68c5dfe"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-30T23:22:31.535Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1c428af83d509256b5e1e2f92879625d60089bd958f5265efacfc74c88043291"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/pr/github-body.md"
              - ".agentplane/tasks/202608291006-255K66/pr/meta.json"
              - ".agentplane/tasks/202608291006-255K66/pr/review.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-255K66/verification/20260830232226285-85c9df8e9b3e28cc.json"
            git:
              kind: "commit"
              ref: null
              sha: "7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:22"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
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
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 6
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-08-31T21:26:09.994Z"
          approved_by: "USER"
          approved_digest: "sha256:2e7e3719fd04d1ca8a43ef5f8903910b36449dd5299d5338bcc1cb26ef89defa"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-31T21:23:35.300Z"
        digest: "sha256:2e7e3719fd04d1ca8a43ef5f8903910b36449dd5299d5338bcc1cb26ef89defa"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-31T21:10:53.482Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:edf3813a21888862a3d648bfca62e383fa42ad04e41d0bf225b43e36fe3b23aa"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "7ac36db054d7f33c5d2abacafa39419c99bb1cdf"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:54"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
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
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                    id: "m3-effects-validation-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-validation-evidence"
                id: "m3-effects-validation"
                objective: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runner"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                      id: "m3-effects-validation-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:c6f4e3c73cd3fa83ac3bcad06e0a629874c8c6eb6b2549dcf7013b03061b0167"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects-validation"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:5222e7336b44df822f7c82bf4c2bdd6d2138f7c3e79246a4e5a15fc6d4b4ddc5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 7
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-09-01T22:51:56.090Z"
          approved_by: "USER"
          approved_digest: "sha256:db6f024a33dc2f07fb08a7f1090086da2f073de94ee9154c02f15091b9925e56"
          policy_facts:
            - "state_bound_scope_extension:sha256:bb8c59922ef25014cde80cc1056f7560b63a97f82c50c915cf018b25446026d0"
          state: "approved"
        created_at: "2026-09-01T22:51:56.090Z"
        digest: "sha256:db6f024a33dc2f07fb08a7f1090086da2f073de94ee9154c02f15091b9925e56"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
          planning_baseline:
            captured_at: "2026-08-31T21:10:53.482Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:edf3813a21888862a3d648bfca62e383fa42ad04e41d0bf225b43e36fe3b23aa"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "7ac36db054d7f33c5d2abacafa39419c99bb1cdf"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:54"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer/harness-dev.mdx"
                risk: "high"
                scope_roots:
                  - "docs/developer/harness-dev.mdx"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
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
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                    id: "m3-effects-validation-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-validation-evidence"
                id: "m3-effects-validation"
                objective: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runner"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                      id: "m3-effects-validation-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:c6f4e3c73cd3fa83ac3bcad06e0a629874c8c6eb6b2549dcf7013b03061b0167"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects-validation"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:5222e7336b44df822f7c82bf4c2bdd6d2138f7c3e79246a4e5a15fc6d4b4ddc5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 8
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-09-01T23:11:03.937Z"
          approved_by: "USER"
          approved_digest: "sha256:84f46ef2d063893a56d7632df4097767c4e809a924046dce02259f238f6a2ada"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-01T23:10:25.377Z"
        digest: "sha256:84f46ef2d063893a56d7632df4097767c4e809a924046dce02259f238f6a2ada"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
            - "The macOS Bun compiled smoke failure is an invalid ad-hoc signature on the generated temporary executable. Re-signing only that temporary executable is a local qualification repair; it does not publish a release or change release metadata."
          planning_baseline:
            captured_at: "2026-09-01T23:08:44.004Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1ba1adf82bcb34fed091826e2e64bcc52061a32d80768a8dd9fb80a6ed3a2a7c"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
            git:
              kind: "commit"
              ref: null
              sha: "c76590dcef51f16aad20321840e5c147ca79085a"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:80"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer/harness-dev.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/release/smoke-bun-compiled-cli.mjs"
                risk: "high"
                scope_roots:
                  - "docs/developer/harness-dev.mdx"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/testkit/src"
                  - "scripts/release/smoke-bun-compiled-cli.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
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
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                    id: "m3-effects-validation-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-validation-evidence"
                id: "m3-effects-validation"
                objective: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runner"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                      id: "m3-effects-validation-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:c6f4e3c73cd3fa83ac3bcad06e0a629874c8c6eb6b2549dcf7013b03061b0167"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects-validation"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:5222e7336b44df822f7c82bf4c2bdd6d2138f7c3e79246a4e5a15fc6d4b4ddc5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 9
        schema_version: 1
        task_id: "202608291006-255K66"
      -
        approval:
          approved_at: "2026-09-01T23:43:09.828Z"
          approved_by: "USER"
          approved_digest: "sha256:50b2d1536a4f390109160a5e495e3cea7398ec3b822770a2cd06ccd1d0bde4bb"
          policy_facts:
            - "state_bound_scope_extension:sha256:e66450e22342237954118ad1febee57b158f542518a3f3874827572acb5ff468"
          state: "approved"
        created_at: "2026-09-01T23:43:09.828Z"
        digest: "sha256:50b2d1536a4f390109160a5e495e3cea7398ec3b822770a2cd06ccd1d0bde4bb"
        proposal:
          assumptions:
            - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
            - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
            - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
            - "The foundation implementation is committed at 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Focused tests passed 357/357. Native runtime, core and CLI groups passed, but docs-schema failed the unchanged test-size budget. The failure must be repaired and full CI repeated in m3-lifecycle."
            - "This plan redistributes the original lifecycle acceptance across three bounded WorkItems. It changes no repository scope, external-effect authority, stable-publication exclusion or final M3 gate. The completed m3-projections definition is byte-for-byte preserved and its saved result/validation must not be reset."
            - "Twenty real sequential self-hosting Tasks and three real clean release drills remain mandatory. Model fixtures, local tests or a submitted provider request cannot substitute for hosted delivery evidence."
            - "The macOS Bun compiled smoke failure is an invalid ad-hoc signature on the generated temporary executable. Re-signing only that temporary executable is a local qualification repair; it does not publish a release or change release metadata."
          planning_baseline:
            captured_at: "2026-09-01T23:08:44.004Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1ba1adf82bcb34fed091826e2e64bcc52061a32d80768a8dd9fb80a6ed3a2a7c"
            dirty_paths:
              - ".agentplane/tasks/202608291006-255K66/README.md"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-255K66/supervision/implementation-evidence.json"
            git:
              kind: "commit"
              ref: null
              sha: "c76590dcef51f16aad20321840e5c147ca79085a"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:80"
          schema_version: 1
          task_id: "202608291006-255K66"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "m3-full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m3-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "m3-packaged"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "m3-full"
                  - "m3-invariants"
                  - "m3-packaged"
                description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
                id: "m3-complete"
                required: true
            evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on: []
                expected_outputs:
                  - "m3-projections-evidence"
                id: "m3-projections"
                objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel/kernel.test.ts"
                risk: "high"
                scope_roots:
                  - "docs/developer"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/core/src/tasks/task-kernel/invariants.test.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                      id: "m3-projections-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                    id: "m3-lifecycle-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-projections"
                expected_outputs:
                  - "m3-lifecycle-evidence"
                id: "m3-lifecycle"
                objective: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer/harness-dev.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/release/smoke-bun-compiled-cli.mjs"
                risk: "high"
                scope_roots:
                  - "docs/developer/harness-dev.mdx"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/testkit/src"
                  - "scripts/release/smoke-bun-compiled-cli.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Retain and qualify the canonical lifecycle foundation committed in 7d3e7ba7fdf2bc66bbd0e049a4752190721dafe1. Immutable intent and semantic WorkItem contracts must persist atomically with the canonical aggregate and be digest-bound to the approved plan. The shared KernelTaskLifecycle application service must use KernelBackendAdapter and reduceTaskCommand for creation, planning, approval, readiness, claim, bounded WorkOrder and exact result receipt. Qualify local and cloud-fake CAS, concurrent begin, lost responses, mutation-id conflicts, stale attempt and claim rejection, immutable documents, no implicit migration, and result preservation under non-material refinement. Fix the observed native full-CI hotspot failure by moving the new semantic plan-binding test from the 1011-line kernel.test.ts into the existing invariants.test.ts suite, or by an equally scoped consolidation; retain all assertions and do not raise limits or baseline budgets. Full native CI must pass before this foundation is accepted. Do not claim public CLI or managed-runner cutover; those acceptance obligations remain in m3-lifecycle-authority and m3-lifecycle-transport."
                      id: "m3-lifecycle-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                    id: "m3-lifecycle-authority-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle"
                expected_outputs:
                  - "m3-lifecycle-authority-evidence"
                id: "m3-lifecycle-authority"
                objective: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Implement one canonical authority parser and resolver for production lifecycle callers. Reuse the existing verified signed-user-receipt parser, host-user-decision parser and explicit manual operator approval contract. Bind approval to the exact canonical Task, proposed plan digest and fresh repository identity and fingerprint. Define one canonical persistence and lineage contract for approved and derived execution authority; do not restore a second writable legacy ExecutionGrant source. Derived authority must never claim USER provenance. Reuse M1 compareExecutionAuthority across scope, effects, capabilities, resources, risk, reversibility, validation, policy and completion requirements. Handle approved non-material continuation and native implementation/result observations with explicit provenance and scope checks; never silently retarget a fingerprint or waive the comparator. Reject untrusted issuers, bad signatures, stale plans, foreign repositories, expired grants, forged agent approval, missing authority and material expansion. Preserve configured trust modes and require native delta-only operator approval when expansion is material. Only verified native operator/controller observations may issue authority; arbitrary JSON and semantic result claims may not. Add exact binding and approval-mode regressions while preserving existing authority tests."
                      id: "m3-lifecycle-authority-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                      - "m3-full"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                    id: "m3-lifecycle-transport-acceptance"
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
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "compareExecutionAuthority"
                depends_on:
                  - "m3-lifecycle-authority"
                expected_outputs:
                  - "m3-lifecycle-transport-evidence"
                id: "m3-lifecycle-transport"
                objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-semantic-result.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner/agent-work-order.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas/agent-work-order-v2.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-semantic-result.schema.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas/agent-work-order-v2.schema.json"
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
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/core/schemas/agent-work-order-v2.schema.json"
                  - "packages/core/src/runner/agent-semantic-result.test.ts"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/runner/agent-work-order.test.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                  - "packages/core/src/tasks"
                  - "packages/spec/schemas/agent-work-order-v2.schema.json"
                  - "packages/testkit/src"
                  - "schemas/agent-semantic-result.schema.json"
                  - "schemas/agent-work-order-v2.schema.json"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "m3-full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                        - "m3-full"
                      description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt from actual CLI and managed-runner entrypoints to the same KernelTaskLifecycle application service and canonical authority resolver. Native AgentPlane must own formal transitions and fresh command identity; frontends must not choose transitions using legacy status or synthesize a second writable aggregate. Preserve existing unmigrated inspection and require explicit migration before mutating legacy records. Carry exact Task, plan revision/digest, WorkItem, claim, attempt, contract, authority and repository fingerprint through host exchange and managed invocation. A replay or uncertain begin cannot dispatch twice. Creation is canonical in its first atomic write. Preserve completed WorkItem results under non-material refinements. Exercise real CLI paths, both host and managed transports, local storage and cloud fake paths. Repair the existing task-next-action-json fixture by establishing real WorkItem completion without weakening its expected approval.pr.open route. Retain every original m3-lifecycle requirement, including all application, authority, result and atomicity behavior. Do not claim effect, task-class, migration or final qualification delivery before their subsequent WorkItems pass."
                      id: "m3-lifecycle-transport-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:ba37d936f0b8badea252aee9366ac19814bc2a8ff58691805d666605dd923592"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                    id: "m3-effects-validation-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-lifecycle-transport"
                expected_outputs:
                  - "m3-effects-validation-evidence"
                id: "m3-effects-validation"
                objective: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/runner"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Move final validation, EVALUATOR decisions, verification evidence persistence, task-outcome projection, retry freshness checks and the M2 DONE-evaluator artifact-freshness loop to canonical commands. Preserve exact Task, plan, WorkItem, claim, attempt, repository and evidence identity. A retry must neither replay completed implementation nor convert stale or missing evidence into success. Do not dispatch repository or provider effects in this WorkItem."
                      id: "m3-effects-validation-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:c6f4e3c73cd3fa83ac3bcad06e0a629874c8c6eb6b2549dcf7013b03061b0167"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                    id: "m3-effects-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects-validation"
                expected_outputs:
                  - "m3-effects-evidence"
                id: "m3-effects"
                objective: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After canonical validation and evidence projection pass, move commit, PR, merge, hosted close, cleanup and base-synchronization decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries and effect reconciliation. A retry must not duplicate an effect, replay completed implementation or bypass the preceding validation evidence."
                      id: "m3-effects-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:5222e7336b44df822f7c82bf4c2bdd6d2138f7c3e79246a4e5a15fc6d4b4ddc5"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-effects"
                expected_outputs:
                  - "m3-task-classes-evidence"
                id: "m3-task-classes"
                objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                optional: false
                priority: 3
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                      id: "m3-task-classes-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-task-classes"
                expected_outputs:
                  - "m3-crash-migration-evidence"
                id: "m3-crash-migration"
                objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                optional: false
                priority: 4
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "docs/developer"
                  - "packages/testkit/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                      id: "m3-crash-migration-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-crash-migration"
                expected_outputs:
                  - "m3-self-hosting-evidence"
                id: "m3-self-hosting"
                objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                optional: false
                priority: 5
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/adapters"
                  - "scripts/qualification"
                  - "docs/developer"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                      id: "m3-self-hosting-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-self-hosting"
                expected_outputs:
                  - "m3-retirement-evidence"
                id: "m3-retirement"
                objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                optional: false
                priority: 6
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                      id: "m3-retirement-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
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
                    - "KernelBackendAdapter"
                    - "reduceTaskCommand"
                    - "readKernelNextAction"
                depends_on:
                  - "m3-retirement"
                expected_outputs:
                  - "m3-final-qualification-evidence"
                id: "m3-final-qualification"
                objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                optional: false
                priority: 7
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/developer"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "depcruise.config.cjs"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/adapters"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/testkit/src"
                  - "scripts/qualification"
                  - "scripts/checks"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "package.json"
                  - "depcruise.config.cjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m3-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                  criteria:
                    -
                      check_ids:
                        - "m3-invariants"
                      description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                      id: "m3-final-qualification-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                  schema_version: 1
        revision: 10
        schema_version: 1
        task_id: "202608291006-255K66"
    revision: 137
    schema_version: 1
    updated_at: "2026-09-02T00:58:21.433Z"
    work_items:
      m3-crash-migration:
        attempt: 1
        claim_id: null
        id: "m3-crash-migration"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:3402202d255659f3755962e5757c116d4a8660b143ebcc64aa6d3623ded3830e"
            id: "m3-crash-migration-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-crash-migration"
            provenance:
              - "sha256:72ff166076c39c24c67a4ae3429a04181df1b30373a44641dcc5d1ed7f148b2c"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8ad079fc7ee01111e2f3865e33d10182f336b646e0bb62fba109a1e5687b5907"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:36:27.054Z"
              repository_snapshot_digest: "sha256:8ad079fc7ee01111e2f3865e33d10182f336b646e0bb62fba109a1e5687b5907"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-effects:
        attempt: 1
        claim_id: null
        id: "m3-effects"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:92b08b1d1a1b8858856800fb39f0257f97c09fd9bbdfb15c17d9dc3678dd8600"
            id: "m3-effects-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-effects"
            provenance:
              - "sha256:a93ac3e15d296b6a7ecf55f0ea22b8cd6cc817d4aa4d7964d4f64a7420b2c9d6"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:fc402df107be798ea6ba323359ff3da226c20dbb0412e0e4230a100f5031ca08"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:30:55.966Z"
              repository_snapshot_digest: "sha256:fc402df107be798ea6ba323359ff3da226c20dbb0412e0e4230a100f5031ca08"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-effects-validation:
        attempt: 1
        claim_id: null
        id: "m3-effects-validation"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a18ce920e756c212373676c1b7c9fd3e5086d551b2174e5f420a4fb73d5cc3fb"
            id: "m3-effects-validation-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-effects-validation"
            provenance:
              - "sha256:f9fbcb29ccabd158ad5a1483b36267872ee73dbd010d8925166c16be42dc94fd"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:6a22f578d4aa6b574186b8fe3f3c63b56d56099c914cc17ba816a55f0fd2db74"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:28:13.565Z"
              repository_snapshot_digest: "sha256:6a22f578d4aa6b574186b8fe3f3c63b56d56099c914cc17ba816a55f0fd2db74"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-final-qualification:
        attempt: 1
        claim_id: null
        id: "m3-final-qualification"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:5affc5fe2b6d8db350ceff47de78cede0c0b39712d65263f8f3e969fd5ddbc9d"
            id: "m3-final-qualification-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-final-qualification"
            provenance:
              - "sha256:85eaa804460891da37d377bd1fc0e64658bada467386e6fe746e5fc1b9b893eb"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:fe4b1f2116bd92f0cb831d408692e8b17138f1e873941bd810ebb5db48524bb6"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:58:21.343Z"
              repository_snapshot_digest: "sha256:fe4b1f2116bd92f0cb831d408692e8b17138f1e873941bd810ebb5db48524bb6"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-lifecycle:
        attempt: 2
        claim_id: null
        id: "m3-lifecycle"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:78c9c0defac081ce26489d7a1ff3cb97752c78b5190805b80c2e4b7d659da3f5"
            id: "m3-lifecycle-evidence"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-lifecycle"
            provenance:
              - "sha256:3cd6f9694356a281f5a273eab838aeef0937eb788e7c07399add6c9bf22cdbbb"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:cc9c85494f84a97e9f98089b0a70c37084dca43433fb2d579f1113807e4b364e"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:05:31.222Z"
              repository_snapshot_digest: "sha256:cc9c85494f84a97e9f98089b0a70c37084dca43433fb2d579f1113807e4b364e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-02T00:05:31.222Z"
              repository_snapshot_digest: "sha256:cc9c85494f84a97e9f98089b0a70c37084dca43433fb2d579f1113807e4b364e"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-lifecycle-authority:
        attempt: 1
        claim_id: null
        id: "m3-lifecycle-authority"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a5921e0c090454adfe76f70b193e41eb01054cf2131410a66daddcd306335bc3"
            id: "m3-lifecycle-authority-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-lifecycle-authority"
            provenance:
              - "sha256:92cbd7939efbe04d9d9805be616d328aa00072159b05d322cc9b796a8a9e72a6"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:04522d18243b13a3553fbb3b7123bf024ebe4808d908d3a1ab4a9eb42e2e108e"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:14:21.286Z"
              repository_snapshot_digest: "sha256:04522d18243b13a3553fbb3b7123bf024ebe4808d908d3a1ab4a9eb42e2e108e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-02T00:14:21.286Z"
              repository_snapshot_digest: "sha256:04522d18243b13a3553fbb3b7123bf024ebe4808d908d3a1ab4a9eb42e2e108e"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-lifecycle-transport:
        attempt: 1
        claim_id: null
        id: "m3-lifecycle-transport"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:87950266a088f8c0edb75791168df161735f799ba9502fd4e2ff7f068ebda46b"
            id: "m3-lifecycle-transport-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-lifecycle-transport"
            provenance:
              - "sha256:ad141ff970661ca927e7795ed4873e374e3432f8652f1ed8297367caff2299f8"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:b74654df46fe7059bc96478d5e45f502f9f6a43233af235e593e527d2f520090"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:23:45.665Z"
              repository_snapshot_digest: "sha256:b74654df46fe7059bc96478d5e45f502f9f6a43233af235e593e527d2f520090"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-02T00:23:45.665Z"
              repository_snapshot_digest: "sha256:b74654df46fe7059bc96478d5e45f502f9f6a43233af235e593e527d2f520090"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-projections:
        attempt: 1
        claim_id: null
        id: "m3-projections"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:07669c2f2d5e9fd52b92124e723f013ea7c6b2fc063124f6821b3e2fcafedeeb"
            id: "m3-projections-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-projections"
            provenance:
              - "sha256:5d84cd8adb6e4a954166488262f045c79d48b9e2317df41ed151eb827c81368b"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:c95d0456a77b475a48392d11cacc3dff8be776544326f5c0c607cc1a25f586eb"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-01T23:51:53.717Z"
              repository_snapshot_digest: "sha256:c95d0456a77b475a48392d11cacc3dff8be776544326f5c0c607cc1a25f586eb"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-retirement:
        attempt: 1
        claim_id: null
        id: "m3-retirement"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:1fff4ee14ffff7715079b0d6ad5edfc4b0abfa316dec287937d698ede5e339ae"
            id: "m3-retirement-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-retirement"
            provenance:
              - "sha256:444ef26768ef8be3c3f40565a46a952dc446ffc56e974309c82ff3426173e898"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:90c4e114f0d26bc97438ce74fdcb991e6733f0b23dd65821eacd6450cd83d96e"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:43:25.280Z"
              repository_snapshot_digest: "sha256:90c4e114f0d26bc97438ce74fdcb991e6733f0b23dd65821eacd6450cd83d96e"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-self-hosting:
        attempt: 1
        claim_id: null
        id: "m3-self-hosting"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:2e7393935b76b73802b259303a1fb404fcf58160fdb2139b775ced685dc4b907"
            id: "m3-self-hosting-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-self-hosting"
            provenance:
              - "sha256:a512631b7a021c74dedef2964c56ebdbed90d6008b3829d2f2f74468c7e53e2c"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:e0b49bf028ae685ef955a83e77067fa5f03e5872787d5448c44379ed779453b4"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:41:34.425Z"
              repository_snapshot_digest: "sha256:e0b49bf028ae685ef955a83e77067fa5f03e5872787d5448c44379ed779453b4"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      m3-task-classes:
        attempt: 1
        claim_id: null
        id: "m3-task-classes"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:427d5bebf26db39fac2682a3c04e8b68fd9681bc34ac287f77c1f690157db9aa"
            id: "m3-task-classes-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 11
              task_id: "202608291006-255K66"
              work_item_id: "m3-task-classes"
            provenance:
              - "sha256:1f46301fdd676db5f75de147bfedc23773f1ca681127ab32aac7ce5c9fa8d4d1"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8964d9b11e37484ebc6d30be8e954395a1771e0a4e0a58a31f0466fda2370d42"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T00:35:25.750Z"
              repository_snapshot_digest: "sha256:8964d9b11e37484ebc6d30be8e954395a1771e0a4e0a58a31f0466fda2370d42"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608291006-255K66-executor-0f5e2912ad3f1f9035d0e922:
        aggregate_digest: "sha256:c6cdb04fd917f55bad38ecb817e556473c9091e87170f2b33eab1b1b41959657"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:35:25.829Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_bb674677057222751e594835"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-0f5e2912ad3f1f9035d0e922"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 124
          to: "COMPLETED"
          work_item_id: "m3-task-classes"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-0f5e2912ad3f1f9035d0e922"
        next_revision: 125
        previous_revision: 124
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-2d62f576f00fbb0671aebd97:
        aggregate_digest: "sha256:0d550d27bf120b5def2053f5681a24f698c78ca70e2fefa1a726decf0a16d06a"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:30:56.038Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_6683623f4b4dfb9cfce38916"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-2d62f576f00fbb0671aebd97"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 121
          to: "COMPLETED"
          work_item_id: "m3-effects"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-2d62f576f00fbb0671aebd97"
        next_revision: 122
        previous_revision: 121
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-300287213b594d39f872a713:
        aggregate_digest: "sha256:1c6df76d2dfd66c0ea0243386bbf182295247ef33b9f4c884b2047e25552ef0f"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T17:05:06.080Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_c5fa6ed097d64a090f93876b"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-300287213b594d39f872a713"
          plan_digest: "sha256:65cb03d9aba5e6757c983cb354956587b566aac9647eff41a531d2eca68c5dfe"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 52
          to: "COMPLETED"
          work_item_id: "m3-lifecycle-transport"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-300287213b594d39f872a713"
        next_revision: 53
        previous_revision: 52
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-3897f0fd3e2fb7ead1dece35:
        aggregate_digest: "sha256:144c689a56f8bc6d8c9001810602cc772f2adbe3be73a668b80cb82d7caefcdb"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:28:13.632Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_3284a2de5623d38709b8ce75"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-3897f0fd3e2fb7ead1dece35"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 118
          to: "COMPLETED"
          work_item_id: "m3-effects-validation"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-3897f0fd3e2fb7ead1dece35"
        next_revision: 119
        previous_revision: 118
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-3c723149e2bb89659d983ba6:
        aggregate_digest: "sha256:62cadfd0634ac235cbc4db6490cb4e22ce508c70988ad3211674b8736b23290f"
        event:
          actor_id: "agentplane"
          at: "2026-09-01T23:53:14.704Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_79b005cdc1b90cb2f0807894"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-3c723149e2bb89659d983ba6"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 105
          to: "REWORK_READY"
          work_item_id: "m3-lifecycle"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-3c723149e2bb89659d983ba6"
        next_revision: 106
        previous_revision: 105
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-3fa29c4eda693286825c99e0:
        aggregate_digest: "sha256:1d66426a5c6d6522c36030b800103c33f8a6ff508012918834323c3a627f1556"
        event:
          actor_id: "agentplane"
          at: "2026-09-01T23:14:33.423Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_68528873253d41bf76d84188"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-3fa29c4eda693286825c99e0"
          plan_digest: "sha256:84f46ef2d063893a56d7632df4097767c4e809a924046dce02259f238f6a2ada"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 85
          to: "COMPLETED"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-3fa29c4eda693286825c99e0"
        next_revision: 86
        previous_revision: 85
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-4080fd0e80c7708157210584:
        aggregate_digest: "sha256:948694febb8023bc9e0c9aa106eace7fce845c62b3f9610bf9d94934bd0c741c"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:43:25.355Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_8ad6dd0ba6f0092d50aad70d"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-4080fd0e80c7708157210584"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 133
          to: "COMPLETED"
          work_item_id: "m3-retirement"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-4080fd0e80c7708157210584"
        next_revision: 134
        previous_revision: 133
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-49319a23087663f788759c14:
        aggregate_digest: "sha256:bf2e2800e76ee79ee3876a827dbd485cc1419b6f4acaf1d6e82bcb910c9aa63e"
        event:
          actor_id: "agentplane"
          at: "2026-09-01T23:51:53.798Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_4d2c4294511cfd0dbab2743d"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-49319a23087663f788759c14"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 102
          to: "COMPLETED"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-49319a23087663f788759c14"
        next_revision: 103
        previous_revision: 102
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-58df34845f4a7b8651a609b1:
        aggregate_digest: "sha256:e9e5cd95c7fa59b8a8867c4688c9f2ded307408211917a71a96bbd1a3fa93ff6"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T23:29:20.541Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_795282362119053302821812"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-58df34845f4a7b8651a609b1"
          plan_digest: "sha256:2e7e3719fd04d1ca8a43ef5f8903910b36449dd5299d5338bcc1cb26ef89defa"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 70
          to: "REWORK_READY"
          work_item_id: "m3-lifecycle"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-58df34845f4a7b8651a609b1"
        next_revision: 71
        previous_revision: 70
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-5b2095a81f8da9305ea824ff:
        aggregate_digest: "sha256:bbfb95c573ec347d8826c081f731df921b2d85c0b6d14f7836d45b3ec1e723cc"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T22:38:12.105Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_91a6f16938d4d377ef4a97a8"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-5b2095a81f8da9305ea824ff"
          plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 17
          to: "COMPLETED"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-5b2095a81f8da9305ea824ff"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-6e62b32bc555e1f94c3145f2:
        aggregate_digest: "sha256:21e1fde12f6691e70acc9c2fbc9e2c683b7352cc72878051209a1c59f24591e3"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T22:13:25.123Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_c1a17c5cacb34f497f6343f9"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-6e62b32bc555e1f94c3145f2"
          plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 9
          to: "REWORK_READY"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-6e62b32bc555e1f94c3145f2"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-6ed5d24e43949781cb477abc:
        aggregate_digest: "sha256:7ebafe2ddfc7b667af5f5fbcb1d8dfef02adb7f757e7c5509beec2e8861f4f84"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:58:21.433Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_b895ceaaf43ba0acdcec2f14"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-6ed5d24e43949781cb477abc"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 136
          to: "COMPLETED"
          work_item_id: "m3-final-qualification"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-6ed5d24e43949781cb477abc"
        next_revision: 137
        previous_revision: 136
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-7d2f4709e4045d7407f115fc:
        aggregate_digest: "sha256:18f96cf08b3e5595f865d69e83134c03f94d79c2aae2acb3de89a35e67bd7de4"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:14:21.357Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_27c888ee2184ada2016412c9"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-7d2f4709e4045d7407f115fc"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 112
          to: "COMPLETED"
          work_item_id: "m3-lifecycle-authority"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-7d2f4709e4045d7407f115fc"
        next_revision: 113
        previous_revision: 112
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-7da8102b7dbb1a880d097fce:
        aggregate_digest: "sha256:d35b472a550d64869016d0976bd66a8039106b86bf0b331654f4f3c37e428cbd"
        event:
          actor_id: "agentplane"
          at: "2026-09-01T23:44:43.203Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_2ad2a42aee190a4933f2a82e"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-7da8102b7dbb1a880d097fce"
          plan_digest: "sha256:50b2d1536a4f390109160a5e495e3cea7398ec3b822770a2cd06ccd1d0bde4bb"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 93
          to: "REWORK_READY"
          work_item_id: "m3-lifecycle"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-7da8102b7dbb1a880d097fce"
        next_revision: 94
        previous_revision: 93
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-a4615afe7b772bbb51040f72:
        aggregate_digest: "sha256:18a9e68672ecedccdcce9213edc180dbad6c726aab7d59d8dd7cf71bef21e947"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T08:01:58.996Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_90a2b2630f19bf204ff17b0a"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-a4615afe7b772bbb51040f72"
          plan_digest: "sha256:dec68171cf2360f480968302f4f8c1941163c7437e7510d9090cbf7d959002f7"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 35
          to: "COMPLETED"
          work_item_id: "m3-lifecycle"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-a4615afe7b772bbb51040f72"
        next_revision: 36
        previous_revision: 35
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-ade8b094a6b9a505ecbd88a3:
        aggregate_digest: "sha256:48625b4fd04e31fa14163e2738f6f65105f6621a6cb0d01a39848309385191cb"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T07:48:31.911Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_0b9ee6f5cb5564c0edc351a9"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-ade8b094a6b9a505ecbd88a3"
          plan_digest: "sha256:dec68171cf2360f480968302f4f8c1941163c7437e7510d9090cbf7d959002f7"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 31
          to: "COMPLETED"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-ade8b094a6b9a505ecbd88a3"
        next_revision: 32
        previous_revision: 31
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-b07f33461ddf9f5c2d8e2843:
        aggregate_digest: "sha256:d1a9ddfacbe67474192f6f2c3ee36b22fa3ee14110cfded199723e1783e425be"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T22:44:42.881Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_52bf2c4612130e8940c5bfd5"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-b07f33461ddf9f5c2d8e2843"
          plan_digest: "sha256:2e7e3719fd04d1ca8a43ef5f8903910b36449dd5299d5338bcc1cb26ef89defa"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 64
          to: "REWORK_READY"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-b07f33461ddf9f5c2d8e2843"
        next_revision: 65
        previous_revision: 64
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-b5c41d6f45098e5e2d453baa:
        aggregate_digest: "sha256:9a6f4835197cf50552f0034f2280a1fd723b39e279529cab4640416ee61691fa"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:36:27.136Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_04be9626174db0812c92446c"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-b5c41d6f45098e5e2d453baa"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 127
          to: "COMPLETED"
          work_item_id: "m3-crash-migration"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-b5c41d6f45098e5e2d453baa"
        next_revision: 128
        previous_revision: 127
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-bf2785583fed4c8df073f5e8:
        aggregate_digest: "sha256:a4f459c343eb04e1c237e1264cafee80dcdca52d5835eb160a4bb80233d4a5c8"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T22:26:42.503Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_b57f13f8000e6f943b07d5b1"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-bf2785583fed4c8df073f5e8"
          plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 13
          to: "REWORK_READY"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-bf2785583fed4c8df073f5e8"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-dc133f4bc18eea0feea7ba5f:
        aggregate_digest: "sha256:a1a865e69ada30caa80f41a70a928a463c40e532d3e975e05c2aacac3cf96282"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:23:45.738Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_9c56dfc3714ba61f934573b4"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-dc133f4bc18eea0feea7ba5f"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 115
          to: "COMPLETED"
          work_item_id: "m3-lifecycle-transport"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-dc133f4bc18eea0feea7ba5f"
        next_revision: 116
        previous_revision: 115
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-e10511b4664ca1b8f940076a:
        aggregate_digest: "sha256:eeabc87c9c76b8f97fd3694bfb522efc8e0a49148648b3459c9c78d148802672"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T08:35:28.440Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_74827e8b62629a9fec191f9f"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-e10511b4664ca1b8f940076a"
          plan_digest: "sha256:dec68171cf2360f480968302f4f8c1941163c7437e7510d9090cbf7d959002f7"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 39
          to: "COMPLETED"
          work_item_id: "m3-lifecycle-authority"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-e10511b4664ca1b8f940076a"
        next_revision: 40
        previous_revision: 39
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-e29903f6de79a7de85e8925e:
        aggregate_digest: "sha256:bcfedff04f4f71c6cf513445f3bf63e41924acb94a63387dd1c784cc3e77a2a6"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T22:05:08.431Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_914ed8d58e3374fe263657c7"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-e29903f6de79a7de85e8925e"
          plan_digest: "sha256:2e7e3719fd04d1ca8a43ef5f8903910b36449dd5299d5338bcc1cb26ef89defa"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 60
          to: "REWORK_READY"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-e29903f6de79a7de85e8925e"
        next_revision: 61
        previous_revision: 60
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-f4f15ef08bb166541335221f:
        aggregate_digest: "sha256:17696508f350bab734d422fb4a598abbb39e0d6133d12b56b1cbb6ddf9d84fe4"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:41:34.509Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_a361b731b2359900d7c26f1e"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-f4f15ef08bb166541335221f"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 130
          to: "COMPLETED"
          work_item_id: "m3-self-hosting"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-f4f15ef08bb166541335221f"
        next_revision: 131
        previous_revision: 130
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-f7580132433f3dc53c7c277a:
        aggregate_digest: "sha256:04cd00c1adae142dc0082a6b5e5f246ecb9d55059151b7e9c56ea403d73b69dc"
        event:
          actor_id: "agentplane"
          at: "2026-08-31T23:07:11.311Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_401413a1843cf50d84f4171b"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-f7580132433f3dc53c7c277a"
          plan_digest: "sha256:2e7e3719fd04d1ca8a43ef5f8903910b36449dd5299d5338bcc1cb26ef89defa"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 67
          to: "COMPLETED"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-f7580132433f3dc53c7c277a"
        next_revision: 68
        previous_revision: 67
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-fca56959b3d05065735b9f42:
        aggregate_digest: "sha256:2e48effeaebe81c698da4160aa26a18db982ed54b447728496cccb9eb5eaaa2c"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T00:05:31.295Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_b616bfe5ee1a1803f1eef6fc"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-fca56959b3d05065735b9f42"
          plan_digest: "sha256:2765ec831cb06d66900e16983e4aaaf4fbb75f08b2830ab9365cabf65b0b6467"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 109
          to: "COMPLETED"
          work_item_id: "m3-lifecycle"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-fca56959b3d05065735b9f42"
        next_revision: 110
        previous_revision: 109
        schema_version: 1
        task_id: "202608291006-255K66"
      plan-refinement:work-order-202608291006-255K66-executor-0cbf5f78caa9bc3f54bc94a2:
        aggregate_digest: "sha256:24722ca93d771d22276073eea17e91e85cf61d90cb4571f33a9e25d8c9c00b0c"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-01T23:08:41.817Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_71f7912a75cd81483cf951ce"
          mutation_id: "plan-refinement:work-order-202608291006-255K66-executor-0cbf5f78caa9bc3f54bc94a2"
          plan_digest: "sha256:db6f024a33dc2f07fb08a7f1090086da2f073de94ee9154c02f15091b9925e56"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 79
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-255K66-executor-0cbf5f78caa9bc3f54bc94a2"
        next_revision: 80
        previous_revision: 79
        schema_version: 1
        task_id: "202608291006-255K66"
      plan-refinement:work-order-202608291006-255K66-executor-a0cda798d0a0cf653b984ea2:
        aggregate_digest: "sha256:fc6c3f5530e5da9344a4a03f935d2e55459aecf91e0f3c292d3e796bd57e9a5d"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-30T23:22:29.679Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_40f01c0173f56c568c21086c"
          mutation_id: "plan-refinement:work-order-202608291006-255K66-executor-a0cda798d0a0cf653b984ea2"
          plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 21
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-255K66-executor-a0cda798d0a0cf653b984ea2"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202608291006-255K66"
      plan-refinement:work-order-202608291006-255K66-executor-e2d54a8e748ea25b411d0dbd:
        aggregate_digest: "sha256:9f591f6f7b120f982f9987de9c112a485fc1a997957606788bc736593cd656c6"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-31T21:10:51.139Z"
          cause_refs:
            - "outputs_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_cc6dd3e11e205124c69fcf19"
          mutation_id: "plan-refinement:work-order-202608291006-255K66-executor-e2d54a8e748ea25b411d0dbd"
          plan_digest: "sha256:65cb03d9aba5e6757c983cb354956587b566aac9647eff41a531d2eca68c5dfe"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 53
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-255K66-executor-e2d54a8e748ea25b411d0dbd"
        next_revision: 54
        previous_revision: 53
        schema_version: 1
        task_id: "202608291006-255K66"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "1692b5eab62ec4ab274d5b9922fa7a441f9035be"
  task_execution_context:
    base_ref: "main"
    base_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  task_planning_base_recovery:
    branch: "task/202608291006-255K66/cut-over-to-the-canonical-task-kernel-and-retire"
    from_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    observed_head: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    revision: 4
    schema_version: 1
    state: "applied"
    target_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    task_id: "202608291006-255K66"
    token: "sha256:6919b5884d7ced0ee28006b79cb7dc7c1ba2b1ef8b8b99117fa42683d68f16bc"
    worktree: "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire"
  workflow_route_baseline:
    start_head_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    version: 1
id_source: "generated"
---
## Summary

Cut over to the canonical Task kernel and retire legacy core paths

After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.

## Scope

- In scope: After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
- Out of scope: unrelated refactors not required for "Cut over to the canonical Task kernel and retire legacy core paths".

## Plan

Preserved the approved M3 WorkItem graph and restored only the ten exact m3-lifecycle resource claims required to admit its retained implementation checkpoint.

## Verify Steps

PLANNER fallback scaffold for "Cut over to the canonical Task kernel and retire legacy core paths". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Cut over to the canonical Task kernel and retire legacy core paths". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T22:13:21.915Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:1d3f9ef9693d7e0ddb5a5bb53efbf7ef423d277c12454a560fea222153023b32

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-30T22:26:29.048Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:18f9370d036593551fe4c629bdb8e27d65371788641b60a7c3c89a10c4d22972

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-30T22:38:08.808Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:4ed01a1636f61d7bb5cf34951dac6cc8b078037b30df76bffab188fabd4d0749

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-30T23:22:26.285Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:897f7059ff4cb8d19824b61e65e265be9e275e1a169e9fd6e7e9101829668f0a

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-31T07:48:28.599Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:f8549963ee5be01355c4e2f1f932a905dfbb432c6b1a9b16467e1521140a15dd

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-31T08:01:55.603Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:4f0090bfe93d4ac1a47557f2069c1c04f257d5c6c58fa1191bc7460e508e5d9f

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-31T08:35:25.130Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:b81cddc63c39533e83771280cc0d1461eeca8c2ed56a05f8fec5214eb1e79ca7

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-31T17:05:02.300Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:fad6092e72ea1f067e43cde4b601f44d537fbda03a29ec128be22667c86de093

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-31T22:03:35.074Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:b0d43269250ecf30e79fa540307d225e6e90ec3f17461b1e28e4826f6cbeed02

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-08-31T22:44:05.109Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:589d2fc7463432d4cf07c6820a8ceaf6ab7762e5bacfaedcf568b9fa199096cc

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

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

### 2026-09-02T01:06:37.540Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:82436dfa5c7435a48470ff031a61dc084b95e4ab4efa04c31deffc0aaa132b87

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check critical_paths (5/5)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (1/5)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (2/5)

Check: docs_contract
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (3/5)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (4/5)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check docs_contract (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run qualification:mixed-scope-lifecycle
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-255K66 Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291006-255K66
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

- Observation: Plan replacement reset the m3-lifecycle resource claims for ten paths already present in its retained implementation checkpoint.
  Impact: The supervisor cannot admit the completed rework receipt until the WorkItem definition again owns those exact historical paths.
  Resolution: Apply one bounded plan refinement restoring only the ten reported roots; preserve outputs, acceptance, risk, dependencies, architecture, external effects, and other WorkItems.

- Observation: The supervisor full gate selected stale Node 20.18.2 because verificationChildEnv promoted inherited NVM_BIN ahead of the already-selected parent PATH.
  Impact: Repository checks that require the declared Node 24 runtime failed during Vitest ESM startup before testing implementation behavior.
  Resolution: Keep the selected parent PATH first for verification children and retain inherited manager directories as fallback; cover the ordering in verify-log tests.
