---
id: "202608291006-2A6BJC"
title: "Add compatibility adapters and replay migration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608292032-1K47B8"
tags:
  - "clean-core-rebuild"
  - "migration"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run arch:check"
  - "bun run lifecycle:invariants"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T04:03:02.075Z"
  updated_by: "USER"
  note: "Denis approved all subsequent in-scope clean-core plans and instructed continuation to completion. This approval records that standing user decision for M2 plan cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0; no release publication or production data migration is included."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli/run-cli"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel"
      - "packages/testkit/src"
      - "scripts/bench"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "M0 defines migration and replay acceptance. M1 is integrated at cbc5d79d1510293de3b4c30b61679cdef85d0fdb. Changes are limited to adapter, storage, CLI boundary, replay fixtures and supporting documentation. No production data migration, release publication or legacy removal occurs during implementation episodes."
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
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli/run-cli"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel"
      - "packages/testkit/src"
      - "scripts/bench"
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
          - "docs/developer"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli/run-cli"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/ports"
          - "packages/agentplane/src/runner"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-kernel"
          - "packages/testkit/src"
          - "scripts/bench"
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
      digest: "sha256:7a619a368593fa4aa4a89d1125e0dd4eaa07d466e77238770817c5773cbdf9cd"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli"
        - "central_component:packages/core/src/tasks/index.ts"
        - "central_component:packages/core/src/tasks/task-kernel"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-30T04:09:19.341Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-30T04:09:19.341Z"
doc_updated_by: "CODER"
description: "Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts."
sections:
  Summary: |-
    Add compatibility adapters and replay migration

    Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
  Scope: |-
    - In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
    - Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".
  Plan: "Implement M2 in three dependent WorkItems: canonical adapter boundary, reversible explicit migration, and exact-anchor replay/dual-run qualification. Reuse existing transactional storage and provider contracts. Keep M3 cutover and release publication outside this milestone."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add compatibility adapters and replay migration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add compatibility adapters and replay migration". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
    completion_contract_digest: "sha256:3aa962fe6733f58b5d54f6fbe8f4fd4d6872f975810025922344952639197cb0"
    digest: "sha256:e0abfa69cc9745dbb476dc7f1820b64367f239f946fc8fb854419280d1542989"
    grant_id: "53c0ff5a-6e5a-4365-ad02-cc03f6cfe0d5"
    issued_at: "2026-08-30T04:03:02.075Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:f5e9486f3f9e24ed424639284299de18d84da5f2d93dba64a540538c87ced921"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:e258ddeedc305dcd7b5973bb80268af1359486e241b54d90daf4722c0b34d586"
    status: "active"
    task_id: "202608291006-2A6BJC"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T04:03:02.075Z"
        approved_by: "USER"
        approved_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T04:02:39.666Z"
      digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
      proposal:
        assumptions:
          - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
          - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
          - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
        planning_baseline:
          captured_at: "2026-08-30T03:46:07.431Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:80ce56f4d8c3464cc1c68b48bab1221743c35996e574eefdcde94604b1200d12"
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
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:3"
        schema_version: 1
        task_id: "202608291006-2A6BJC"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "m2-architecture"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "m2-invariants"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "m2-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "m2-types"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "m2-diff"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
              id: "m2-boundaries"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
              id: "m2-migration"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
              id: "m2-replay"
              required: true
          evidence_fingerprint: "sha256:1a8107c0bd0bd527e216d9591d1a109811c9e2251dc643b789e6985bb965de79"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                  id: "m2-boundaries"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on: []
              expected_outputs:
                - "m2-boundaries-implementation"
              id: "m2-boundaries"
              objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
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
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
                    required: true
                evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                  id: "m2-migration"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-boundaries"
              expected_outputs:
                - "m2-migration-implementation"
              id: "m2-migration"
              objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
              optional: false
              priority: 1
              required_inputs:
                - "m2-boundaries-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
                    required: true
                evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                  id: "m2-replay"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-migration"
              expected_outputs:
                - "m2-replay-implementation"
              id: "m2-replay"
              objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
              optional: false
              priority: 2
              required_inputs:
                - "m2-migration-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                    id: "m2-replay"
                    required: true
                evidence_fingerprint: "sha256:7d4f3aaaf4541496cee38a9111c105ed610f3c228f3fe8f8ca0bff29a232ce07"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608291006-2A6BJC"
    event_cursor: 0
    final_validation: null
    id: "202608291006-2A6BJC"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lifecycle:invariants"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run test:fast"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-4"
          required: true
      captured_at: "2026-08-29T10:06:15.754Z"
      constraints: []
      request: |-
        Add compatibility adapters and replay migration

        Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
      task_id: "202608291006-2A6BJC"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 4
    schema_version: 1
    updated_at: "2026-08-30T04:03:02.075Z"
    work_items:
      m2-boundaries:
        attempt: 0
        claim_id: null
        id: "m2-boundaries"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      m2-migration:
        attempt: 0
        claim_id: null
        id: "m2-migration"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m2-replay:
        attempt: 0
        claim_id: null
        id: "m2-replay"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
    version: 1
id_source: "generated"
---
## Summary

Add compatibility adapters and replay migration

Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.

## Scope

- In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
- Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".

## Plan

Implement M2 in three dependent WorkItems: canonical adapter boundary, reversible explicit migration, and exact-anchor replay/dual-run qualification. Reuse existing transactional storage and provider contracts. Keep M3 cutover and release publication outside this milestone.

## Verify Steps

PLANNER fallback scaffold for "Add compatibility adapters and replay migration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add compatibility adapters and replay migration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
