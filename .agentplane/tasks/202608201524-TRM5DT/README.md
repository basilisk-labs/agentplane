---
id: "202608201524-TRM5DT"
title: "Implement provider-neutral GitHub and GitLab change-request lifecycle"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "backend"
  - "github"
  - "gitlab"
  - "provider"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "credentials"
  - "security"
  - "external_system"
blueprint_request: "code.branch_pr"
verify:
  - "agentplane doctor"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T15:38:27.925Z"
  updated_by: "USER"
  note: "User explicitly approved plan in Codex task on 2026-08-20."
verification:
  state: "ok"
  updated_at: "2026-08-20T17:34:32.863Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-20T19:16:43.681Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 4 typed finding(s)."
  evaluated_sha: "90f0339fdc8a99d2420933714b077854f356d482"
  blueprint_digest: "e79d8f93b29a9f61a846f9cb71db7cb76e99e0508d3bd4fab66e1fa9cc5c05be"
  evidence_refs:
    - ".agentplane/tasks/202608201524-TRM5DT/quality/20260820-191449349-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/20260820-191449349-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/objects/sha256/d2971268cbea2762c9a61e04c4f3def0ec551a6189c5e69927658bb8ee686d2c.md"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/20260820-191449349-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/20260820-191449349-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/20260820-191449349-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/20260820-191449349-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608201524-TRM5DT/README.md"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/objects/sha256/61b90cfb23cf87f45b1dc0314dadebf8b50860f91442635ef6df833ccc72ecb5.patch"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/objects/sha256/3578dd78f8157d4f40ac415a2e0324f0509f60b71b23db5b432e436e57854f81.json"
    - ".agentplane/tasks/202608201524-TRM5DT/verification/20260820173432863-3258d678de04d49b.json"
    - ".agentplane/tasks/202608201524-TRM5DT/quality/objects/sha256/529e1ac62387109b0d1bcae531e29149e71bbdffdbee3935a832c5c4aa77ee00.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "High: bun run docs:site:generate:check exits 1 because website/static/llms-full.txt is stale. This is a directly reproduced required full-regression failure and cannot be overridden by the task verification projection reporting ok."
    - "The provider-neutral GitHub/GitLab implementation, focused 41-file/304-test suite, full-fast groups, agentplane doctor, lint:core, typecheck, routing policy check, schema sync, and CLI docs freshness have passed according to the recorded execution evidence."
    - "The stale generated website artifact is outside the implementation episode's writable roots, so correcting it requires a fresh executor authority scope rather than an evaluator mutation."
    - "Residual risk: Real GitLab.com and self-managed GitLab qualification remains a later hosted/release gate because this implementation task forbids external-provider effects during tests."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/user"
      - "docs/workflow-guides"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/commands/task/hosted-merge-sync"
      - "packages/core/schemas"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/workflow"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Implementation and fixture verification are local-only; glab authentication remains user-owned and no provider or credential mutation is authorized."
      - "The feature crosses public metadata, provider routing, CLI transport, hosted checks, merge, recovery, tests, and documentation, so the listed roots are the minimal coherent lifecycle scope."
      - "The user explicitly approved an isolated branch implementation and the repository requires branch_pr worktree isolation."
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
      - "docs/user"
      - "docs/workflow-guides"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/commands/task/hosted-merge-sync"
      - "packages/core/schemas"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/workflow"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/spec"
      - "schemas"
    changed_paths:
      - "docs/user/branching-and-pr-artifacts.mdx"
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/commands.mdx"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/branch-publication.ts"
      - "packages/agentplane/src/commands/pr/check.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework-route-eligibility.ts"
      - "packages/agentplane/src/commands/pr/conflict-rework.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/pr/head-publication.ts"
      - "packages/agentplane/src/commands/pr/hosted-checks.gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/hosted-checks.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-protection.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-protection.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
      - "packages/agentplane/src/commands/pr/internal/change-request-model.ts"
      - "packages/agentplane/src/commands/pr/internal/change-request-provider.ts"
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
      - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
      - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-update-step.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/pr/pr.spec.ts"
      - "packages/agentplane/src/commands/pr/provider-head.test.ts"
      - "packages/agentplane/src/commands/pr/provider-head.ts"
      - "packages/agentplane/src/commands/shared/pr-meta.test.ts"
      - "packages/agentplane/src/commands/shared/pr-meta.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/builders.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/model.ts"
      - "packages/agentplane/src/commands/shared/pr-meta/parser.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
      - "packages/agentplane/src/commands/task/hosted-merge-sync.ts"
      - "packages/agentplane/src/commands/task/hosted-merge-sync/gitlab.lookup.test.ts"
      - "packages/agentplane/src/commands/task/hosted-merge-sync/gitlab.test.ts"
      - "packages/agentplane/src/commands/task/hosted-merge-sync/gitlab.ts"
      - "packages/agentplane/src/commands/task/hosted-merge-sync/model.ts"
      - "packages/agentplane/src/commands/task/hosted-merge-sync/provider.ts"
      - "packages/core/schemas/pr-meta.schema.json"
      - "packages/core/schemas/task-handoff.schema.json"
      - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
      - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
      - "packages/spec/schemas/pr-meta.schema.json"
      - "packages/spec/schemas/task-handoff.schema.json"
      - "schemas/pr-meta.schema.json"
      - "schemas/task-handoff.schema.json"
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
          - "docs/user"
          - "docs/workflow-guides"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/commands/task/hosted-merge-sync"
          - "packages/core/schemas"
          - "packages/core/src/tasks"
          - "packages/spec/schemas"
          - "schemas"
          - "scripts/workflow"
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
      digest: "sha256:310f7ede2f189eb9e204d034e9cead155534e8607afdd0139c09f30bdb7d2126"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.gitlab.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/builders.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/model.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta/parser.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
        - "central_path:packages/core/schemas/pr-meta.schema.json"
        - "central_path:packages/core/schemas/task-handoff.schema.json"
        - "central_path:packages/core/src/tasks/task-artifact-schema.handoff.ts"
        - "central_path:packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
        - "central_path:schemas/pr-meta.schema.json"
        - "central_path:schemas/task-handoff.schema.json"
        - "effect_public_api"
        - "effect_schema"
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
          - "packages/core"
          - "packages/spec"
          - "schemas"
        changed_files:
          - "docs/user/branching-and-pr-artifacts.mdx"
          - "docs/user/cli-reference.generated.mdx"
          - "docs/user/commands.mdx"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/branch-publication.ts"
          - "packages/agentplane/src/commands/pr/check.ts"
          - "packages/agentplane/src/commands/pr/conflict-rework-route-eligibility.ts"
          - "packages/agentplane/src/commands/pr/conflict-rework.ts"
          - "packages/agentplane/src/commands/pr/flow-status.ts"
          - "packages/agentplane/src/commands/pr/head-publication.ts"
          - "packages/agentplane/src/commands/pr/hosted-checks.gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/hosted-checks.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-protection.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-protection.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
          - "packages/agentplane/src/commands/pr/internal/change-request-model.ts"
          - "packages/agentplane/src/commands/pr/internal/change-request-provider.ts"
          - "packages/agentplane/src/commands/pr/internal/git-host-identity.test.ts"
          - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.test.ts"
          - "packages/agentplane/src/commands/pr/internal/glab-api.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-open-step.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-update-step.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/pr/pr.spec.ts"
          - "packages/agentplane/src/commands/pr/provider-head.test.ts"
          - "packages/agentplane/src/commands/pr/provider-head.ts"
          - "packages/agentplane/src/commands/shared/pr-meta.test.ts"
          - "packages/agentplane/src/commands/shared/pr-meta.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/builders.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/model.ts"
          - "packages/agentplane/src/commands/shared/pr-meta/parser.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
          - "packages/agentplane/src/commands/task/hosted-merge-sync.ts"
          - "packages/agentplane/src/commands/task/hosted-merge-sync/gitlab.lookup.test.ts"
          - "packages/agentplane/src/commands/task/hosted-merge-sync/gitlab.test.ts"
          - "packages/agentplane/src/commands/task/hosted-merge-sync/gitlab.ts"
          - "packages/agentplane/src/commands/task/hosted-merge-sync/model.ts"
          - "packages/agentplane/src/commands/task/hosted-merge-sync/provider.ts"
          - "packages/core/schemas/pr-meta.schema.json"
          - "packages/core/schemas/task-handoff.schema.json"
          - "packages/core/src/tasks/task-artifact-schema.handoff.ts"
          - "packages/core/src/tasks/task-artifact-schema.pr-metadata.ts"
          - "packages/spec/schemas/pr-meta.schema.json"
          - "packages/spec/schemas/task-handoff.schema.json"
          - "schemas/pr-meta.schema.json"
          - "schemas/task-handoff.schema.json"
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
  hash: "90f0339fdc8a99d2420933714b077854f356d482"
  message: "🚧 TRM5DT task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Recovery: retire the stale blocked external-agent exchange after completed implementation and verification evidence were produced."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 90f0339fdc8a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The evaluator finding is actionable, but the required generated website artifact is outside this executor episode's writable roots. Recommended action: Extend authority to website/static, run bun run docs:site:generate, verify only the expected generated projection changes, then rerun bun run docs:site:generate:check and bun run ci:local:full. Requested scope: roots=website/static; repository effects=documentation,repository_write; request digest=sha256:0b4196edbff440940b5a3c60e6dd21daeb847a67657de384812f5d36a620a595. Agentplane receipt: external-agent-blocker/tr_a5e0b3929c499e6a28f66ab5bf41e9b7/sha256:6d541590590589c1c64675f3b8bf4105544b30756040ab9eb08a7d3784a3db04/sha256:0b4196edbff440940b5a3c60e6dd21daeb847a67657de384812f5d36a620a595."
events:
  -
    type: "status"
    at: "2026-08-20T16:09:36.533Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "comment"
    at: "2026-08-20T17:30:50.337Z"
    author: "CODER"
    body: "Recovery: retire the stale blocked external-agent exchange after completed implementation and verification evidence were produced."
  -
    type: "status"
    at: "2026-08-20T17:31:51.543Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 90f0339fdc8a. CLI accepted one state-bound external-agent semantic result."
    commit: "90f0339fdc8a99d2420933714b077854f356d482"
  -
    type: "verify"
    at: "2026-08-20T17:34:32.863Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-20T19:17:34.410Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The evaluator finding is actionable, but the required generated website artifact is outside this executor episode's writable roots. Recommended action: Extend authority to website/static, run bun run docs:site:generate, verify only the expected generated projection changes, then rerun bun run docs:site:generate:check and bun run ci:local:full. Requested scope: roots=website/static; repository effects=documentation,repository_write; request digest=sha256:0b4196edbff440940b5a3c60e6dd21daeb847a67657de384812f5d36a620a595. Agentplane receipt: external-agent-blocker/tr_a5e0b3929c499e6a28f66ab5bf41e9b7/sha256:6d541590590589c1c64675f3b8bf4105544b30756040ab9eb08a7d3784a3db04/sha256:0b4196edbff440940b5a3c60e6dd21daeb847a67657de384812f5d36a620a595."
doc_version: 3
doc_updated_at: "2026-08-20T19:17:34.410Z"
doc_updated_by: "SUPERVISOR"
description: "Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests."
sections:
  Summary: |-
    Implement provider-neutral GitHub and GitLab change-request lifecycle

    Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.
  Scope: |-
    - In scope: Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.
    - Out of scope: unrelated refactors not required for "Implement provider-neutral GitHub and GitLab change-request lifecycle".
  Plan: "Implement GitHub/GitLab support as one provider-neutral change-request lifecycle in branch_pr isolation. First extract the shared repository identity, authenticated CLI transport, normalized change-request observation, and provider registry while keeping the existing GitHub adapter behavior-compatible. Then add a GitLab adapter backed by external glab authentication and explicit glab api calls, resolving host and project from the actual publication remote and never reading, storing, or initiating credentials. Migrate PR metadata and artifacts compatibly, route open/update/check/head/merge/conflict/reconciliation through the provider contract, preserve exact-head and effect-journal safety, add focused fixtures for GitLab.com/self-managed/fork/error/recovery cases, update user documentation, and run targeted plus full regression gates. No live provider writes or credential changes are part of implementation verification; real hosted qualification remains a separately authorized release gate."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-20T17:34:32.863Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8ce1b958938f29e73b53fa760eadeb68d2a1b636dd8d53ce755683ef086bfaab, input_digest=sha256:8bf115b30da65212ace4337d2ca6c9c2ec1ddda97293c84e9cbf05916253b376

    Details:

    Check: affected_unit_integration
    Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608201524-TRM5DT Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608201524-TRM5DT Verification Contract check critical_paths

    Check: docs_contract
    Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608201524-TRM5DT Verification Contract check docs_contract

    Check: full_regression
    Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608201524-TRM5DT Verification Contract check full_regression

    Check: hosted_integration
    Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608201524-TRM5DT Verification Contract check hosted_integration

    Check: task_outcome
    Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608201524-TRM5DT Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608201524-TRM5DT-implement-provider-neutral-github-and-gitlab-cha/.agentplane/tasks/202608201524-TRM5DT/blueprint/resolved-snapshot.json
    - old_digest: e79d8f93b29a9f61a846f9cb71db7cb76e99e0508d3bd4fab66e1fa9cc5c05be
    - current_digest: e79d8f93b29a9f61a846f9cb71db7cb76e99e0508d3bd4fab66e1fa9cc5c05be
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608201524-TRM5DT

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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:6d541590590589c1c64675f3b8bf4105544b30756040ab9eb08a7d3784a3db04"
    kind: "task_scope_extension_request"
    request:
      rationale: "The provider-neutral implementation changes public CLI and documentation content consumed by the generated llms-full projection. The full documentation gate requires that checked-in projection to be regenerated before PR publication."
      repository_effects:
        - "documentation"
        - "repository_write"
      schema_version: 1
      scope_roots:
        - "website/static"
    request_digest: "sha256:0b4196edbff440940b5a3c60e6dd21daeb847a67657de384812f5d36a620a595"
    schema_version: 1
    status: "pending"
    transition_id: "tr_a5e0b3929c499e6a28f66ab5bf41e9b7"
  implementation_commit:
    hash: "90f0339fdc8a99d2420933714b077854f356d482"
  workflow_route_baseline:
    start_head_sha: "292b232b3160b22c47c6cc206fade625e9377fed"
    version: 1
id_source: "generated"
---
## Summary

Implement provider-neutral GitHub and GitLab change-request lifecycle

Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.

## Scope

- In scope: Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.
- Out of scope: unrelated refactors not required for "Implement provider-neutral GitHub and GitLab change-request lifecycle".

## Plan

Implement GitHub/GitLab support as one provider-neutral change-request lifecycle in branch_pr isolation. First extract the shared repository identity, authenticated CLI transport, normalized change-request observation, and provider registry while keeping the existing GitHub adapter behavior-compatible. Then add a GitLab adapter backed by external glab authentication and explicit glab api calls, resolving host and project from the actual publication remote and never reading, storing, or initiating credentials. Migrate PR metadata and artifacts compatibly, route open/update/check/head/merge/conflict/reconciliation through the provider contract, preserve exact-head and effect-journal safety, add focused fixtures for GitLab.com/self-managed/fork/error/recovery cases, update user documentation, and run targeted plus full regression gates. No live provider writes or credential changes are part of implementation verification; real hosted qualification remains a separately authorized release gate.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-20T17:34:32.863Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:8ce1b958938f29e73b53fa760eadeb68d2a1b636dd8d53ce755683ef086bfaab, input_digest=sha256:8bf115b30da65212ace4337d2ca6c9c2ec1ddda97293c84e9cbf05916253b376

Details:

Check: affected_unit_integration
Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
Scope: branch_pr task 202608201524-TRM5DT Verification Contract check affected_unit_integration

Check: critical_paths
Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
Scope: branch_pr task 202608201524-TRM5DT Verification Contract check critical_paths

Check: docs_contract
Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
Scope: branch_pr task 202608201524-TRM5DT Verification Contract check docs_contract

Check: full_regression
Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
Scope: branch_pr task 202608201524-TRM5DT Verification Contract check full_regression

Check: hosted_integration
Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
Scope: branch_pr task 202608201524-TRM5DT Verification Contract check hosted_integration

Check: task_outcome
Command: agentplane doctor && bun run lint:core && bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608201524-TRM5DT/supervision/declared-checks.json#checks
Scope: branch_pr task 202608201524-TRM5DT Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608201524-TRM5DT-implement-provider-neutral-github-and-gitlab-cha/.agentplane/tasks/202608201524-TRM5DT/blueprint/resolved-snapshot.json
- old_digest: e79d8f93b29a9f61a846f9cb71db7cb76e99e0508d3bd4fab66e1fa9cc5c05be
- current_digest: e79d8f93b29a9f61a846f9cb71db7cb76e99e0508d3bd4fab66e1fa9cc5c05be
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608201524-TRM5DT

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
