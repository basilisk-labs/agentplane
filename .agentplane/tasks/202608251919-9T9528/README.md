---
id: "202608251919-9T9528"
title: "Make task-worktree dependency preparation independent of foreign worktree package layouts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "self-hosting"
  - "dependencies"
  - "recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun test packages/agentplane/src/commands/task"
plan_approval:
  state: "approved"
  updated_at: "2026-08-25T19:28:52.853Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:e725cfeaba050cab602a513763a89d3433b11325d235342a604f1cecbce647c6"
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
    - "effect_ci"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "scripts/workflow/bootstrap-framework-dev.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch isolation preserves blocked NJQVAX and the existing release recovery worktrees."
      - "The two production reuse boundaries and their focused regressions fully contain the proven defect."
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "scripts/workflow/bootstrap-framework-dev.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "scripts/workflow/bootstrap-framework-dev.mjs"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
          - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "scripts/workflow/bootstrap-framework-dev.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:a2693e4a0cd95f6dec740cd3a5e9e969551c6f04bee39be9736eb3443b04ab53"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
        - "central_component:scripts/workflow/bootstrap-framework-dev.mjs"
        - "central_path:packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
        - "central_path:scripts/workflow/bootstrap-framework-dev.mjs"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "scripts/workflow/bootstrap-framework-dev.mjs"
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
      - "repository_effect:ci"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "db29ee1ce79e66dc8edb6afaa0cba12dcef9fadd"
  message: "🚧 9T9528 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: db29ee1ce79e. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-25T19:29:07.650Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-25T19:36:57.529Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: db29ee1ce79e. CLI accepted one state-bound external-agent semantic result."
    commit: "db29ee1ce79e66dc8edb6afaa0cba12dcef9fadd"
doc_version: 3
doc_updated_at: "2026-08-25T19:36:57.529Z"
doc_updated_by: "SUPERVISOR"
description: "Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets."
sections:
  Summary: |-
    Make task-worktree dependency preparation independent of foreign worktree package layouts

    Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.
  Scope: |-
    - In scope: Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.
    - Out of scope: unrelated refactors not required for "Make task-worktree dependency preparation independent of foreign worktree package layouts".
  Plan: "Planned one bounded self-hosting fix that prevents task worktrees from inheriting an unhealthy shared dependency tree and makes framework bootstrap repair the same proven stale-link layout."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make task-worktree dependency preparation independent of foreign worktree package layouts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make task-worktree dependency preparation independent of foreign worktree package layouts". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:e725cfeaba050cab602a513763a89d3433b11325d235342a604f1cecbce647c6"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:529710c08d24e61c12f0e1588e695c6c6cd542b5c2f35c536ba7dfc9e66bbcdf"
    digest: "sha256:29b4de9d581ef8ae2404d653a9a7d12a8fd800efff328cd96311e0ef20ff8db1"
    grant_id: "860cf2c1-8147-4064-ace6-1f679efdd47b"
    issued_at: "2026-08-25T19:28:52.853Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ec057bf81d18b0274672377fb26a2f58271f5beb0e9702b251ecdb1cf2c2d8e6"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c6c9e697a522b2f54be36910d921e8bdba1d9082f7afd4982cdb0c6dfce545ac"
    status: "active"
    task_id: "202608251919-9T9528"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-25T19:28:52.853Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:0a9e251ffee642a75609b9705f28e30fc7467ea4ee635dc82298a8860feed77d"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-25T19:24:15.839Z"
      digest: "sha256:0a9e251ffee642a75609b9705f28e30fc7467ea4ee635dc82298a8860feed77d"
      proposal:
        assumptions:
          - "The root package.json dependencies and devDependencies are the bounded load-bearing set required to detect the observed broken shared layout without recursively scanning every transitive package."
          - "A direct dependency target under .agentplane/worktrees is transient even when it is still present, while ordinary workspace-package targets elsewhere inside the source repository remain valid."
          - "The existing post-integration framework bootstrap will repair the base dependency root after this watched runtime change is integrated."
        planning_baseline:
          captured_at: "2026-08-25T19:19:07.652Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:2f57c18f79e413b982381da35279c3e04882192b78619dbcf36a4edb61d285c7"
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
            - ".agentplane/tasks/202608251919-9T9528/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608251919-9T9528"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
              id: "check-install-layout-regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "check-install-layout-regressions"
              description: "A task worktree never inherits the proven stale foreign-worktree dependency layout, and the canonical framework bootstrap repairs that layout before subsequent self-hosting checks."
              id: "criterion-deterministic-worktree-install-layout"
              required: true
          evidence_fingerprint: "sha256:50bbc2fe6713c91667d4d3e15cae196b746dab58302255b016818a93934a0a57"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-install-layout-regressions"
                  description: "Task-worktree materialization does not link a candidate node_modules tree when a declared direct dependency path is dangling or resolves through another .agentplane/worktrees checkout."
                  id: "criterion-worktree-reuse-health"
                  required: true
                -
                  check_ids:
                    - "check-install-layout-regressions"
                  description: "Framework bootstrap treats the same unhealthy local install layout as missing, removes only the known install-layout roots, and runs bun install --ignore-scripts before build verification."
                  id: "criterion-bootstrap-repair"
                  required: true
                -
                  check_ids:
                    - "check-install-layout-regressions"
                  description: "Healthy direct dependency layouts, package-local layout materialization, website dependencies, and recipes reuse retain their current behavior."
                  id: "criterion-healthy-reuse-preserved"
                  required: true
                -
                  check_ids:
                    - "check-install-layout-regressions"
                  description: "NJQVAX, 6Q6APW, and WBV804 source and task state are not modified; after integration NJQVAX is resumed only through a fresh base-checkout route."
                  id: "criterion-recovery-isolated"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 196608
                optional_sources:
                  - "packages/agentplane/src/commands/branch/work-start.ts"
                  - "package.json"
                required_sources:
                  - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  - "scripts/workflow/bootstrap-framework-dev.mjs"
                  - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
                symbol_hints:
                  - "materializeRepoLocalInstallLayoutForWorktree"
                  - "linkDirectoryIntoWorktree"
                  - "removeForeignInstallLayouts"
                  - "hasBootstrapBuildInstallLayout"
                  - "pathResolvesWithinRepo"
              depends_on: []
              expected_outputs:
                - "load-bearing-direct-dependency-layout-health-check"
                - "fail-closed-task-worktree-dependency-reuse"
                - "bootstrap-repair-for-stale-foreign-worktree-links"
                - "focused-stale-link-regressions"
              id: "reject-and-repair-foreign-install-layout"
              objective: "Validate declared direct dependency targets before sharing or reusing node_modules, prevent an unhealthy source layout from reaching a task worktree, and make framework bootstrap reinstall the proven dangling or foreign-worktree layout."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/workflow/bootstrap-framework-dev.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
                - "scripts/workflow/bootstrap-framework-dev.mjs"
                - "packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts"
                    id: "check-install-layout-regressions"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-install-layout-regressions"
                    description: "Task-worktree materialization does not link a candidate node_modules tree when a declared direct dependency path is dangling or resolves through another .agentplane/worktrees checkout."
                    id: "criterion-worktree-reuse-health"
                    required: true
                  -
                    check_ids:
                      - "check-install-layout-regressions"
                    description: "Framework bootstrap treats the same unhealthy local install layout as missing, removes only the known install-layout roots, and runs bun install --ignore-scripts before build verification."
                    id: "criterion-bootstrap-repair"
                    required: true
                  -
                    check_ids:
                      - "check-install-layout-regressions"
                    description: "Healthy direct dependency layouts, package-local layout materialization, website dependencies, and recipes reuse retain their current behavior."
                    id: "criterion-healthy-reuse-preserved"
                    required: true
                  -
                    check_ids:
                      - "check-install-layout-regressions"
                    description: "NJQVAX, 6Q6APW, and WBV804 source and task state are not modified; after integration NJQVAX is resumed only through a fresh base-checkout route."
                    id: "criterion-recovery-isolated"
                    required: true
                evidence_fingerprint: "sha256:8be4422a9312466f68eddd9105c685e4865ffafb0e4c04fa4ee359307ab73358"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608251919-9T9528"
    event_cursor: 0
    final_validation: null
    id: "202608251919-9T9528"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/commands/task"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-25T19:19:02.228Z"
      constraints: []
      request: |-
        Make task-worktree dependency preparation independent of foreign worktree package layouts

        Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.
      task_id: "202608251919-9T9528"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-25T19:28:52.853Z"
    work_items:
      reject-and-repair-foreign-install-layout:
        attempt: 0
        claim_id: null
        id: "reject-and-repair-foreign-install-layout"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  implementation_commit:
    hash: "db29ee1ce79e66dc8edb6afaa0cba12dcef9fadd"
  task_execution_context:
    base_ref: "main"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

Make task-worktree dependency preparation independent of foreign worktree package layouts

Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.

## Scope

- In scope: Self-hosting blocker for 202608251755-NJQVAX. Symptom: the NJQVAX authoritative task checkout links node_modules to the base checkout, but base node_modules/eslint points into the NJ6Y8B worktree's removed pnpm layout, so node scripts/checks/run-local-ci-group.mjs core fails before lint or tests with MODULE_NOT_FOUND. Violated invariant: a task worktree prepared from current main must resolve declared dependencies deterministically and must not depend on another task worktree's transient package-manager layout. Proven root cause: shared node_modules contains absolute/generated package links whose targets are owned by a foreign worktree and no longer exist after the Bun layout transition. Recovery: preserve blocked NJQVAX and do not copy dependencies or source changes between worktrees manually. Permanent fix: make the canonical worktree dependency preparation validate and provide a self-contained or otherwise stable dependency root, fail closed on broken foreign-worktree links, and add a regression reproducing a stale foreign-worktree package target. After integration, resume NJQVAX through fresh ap task active and ap task advance packets.
- Out of scope: unrelated refactors not required for "Make task-worktree dependency preparation independent of foreign worktree package layouts".

## Plan

Planned one bounded self-hosting fix that prevents task worktrees from inheriting an unhealthy shared dependency tree and makes framework bootstrap repair the same proven stale-link layout.

## Verify Steps

PLANNER fallback scaffold for "Make task-worktree dependency preparation independent of foreign worktree package layouts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make task-worktree dependency preparation independent of foreign worktree package layouts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
