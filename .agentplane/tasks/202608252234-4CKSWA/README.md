---
id: "202608252234-4CKSWA"
title: "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.8"
  - "exact-main"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "credentials"
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-25T22:41:17.308Z"
  updated_by: "USER"
  note: "User approved plan_digest sha256:c4dba10d7b4cb7bf6377f3066b543e2fc07efba3e36f03dc51d00264172edaae at state_fingerprint sha256:8f345d1b82e33d3b3bd36b7bf0b2384ae80a36a4c2be6298ac5e4527327c5685."
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
    - "effect_credentials"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "observed_effect_dependencies"
    - "observed_effect_public_api"
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
      - "release_metadata"
      - "repository_write"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "credentials"
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:source_code"
    changed_components:
      - ".agentplane"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "website"
    changed_paths:
      - ".agentplane/WORKFLOW.md"
      - "docs/releases/v0.7.8.md"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
    external_effects: []
    repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "observed_effect_dependencies"
    - "observed_effect_public_api"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "credentials"
      - "external_write"
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:credentials"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "credentials"
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:04e4c41d1e42886fa1d98d0f774ea74fd8b154144d86cc87268c6f36ad70c58e"
      escalation_reasons:
        - "central_path:packages/core/package.json"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:packages/spec/examples/acr.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - "docs"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "website"
        changed_files:
          - ".agentplane/WORKFLOW.md"
          - "docs/releases/v0.7.8.md"
          - "packages/agentplane/package.json"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/manifest.json"
        external_effects: []
        repository_effects:
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "source_code"
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
      - "external_effect:credentials"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "114ea1df0713d9ddadc63e429fa0b8d34bc5a951"
  message: "🚧 4CKSWA task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 114ea1df0713. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-25T22:41:25.038Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-25T23:07:02.886Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 114ea1df0713. CLI accepted one state-bound external-agent semantic result."
    commit: "114ea1df0713d9ddadc63e429fa0b8d34bc5a951"
doc_version: 3
doc_updated_at: "2026-08-25T23:07:02.886Z"
doc_updated_by: "SUPERVISOR"
description: "Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs."
sections:
  Summary: |-
    Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360

    Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.
  Scope: |-
    - In scope: Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.
    - Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360".
  Plan: "Prepared a four-stage exact-base release plan for AgentPlane 0.7.8 with a strict release-blocker firewall, bounded metadata changes, exact-candidate gates, protected publication, and independent readback."
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360". Expected: the visible result matches ## Summary and stays inside approved scope.
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
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:1f30a90e7394c7cb274138433bf6f79f299649ba8c8140d9162f87a15acda530"
    digest: "sha256:835defc05f513c06300ee41b707e9248de317a820265ce4a6d8f3da7718c5850"
    grant_id: "5297e19d-70be-4bde-9d3e-a0b12756c11a"
    issued_at: "2026-08-25T22:41:17.308Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:30a7ecc27506dfb268c9f4801e6ca885a2a784dcc78d63520395ff2f15938bfe"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:ccd70d786f49e4a3280b85f58a7784446268ed8b8c6102aee8eeaec7d2fa18ee"
    status: "active"
    task_id: "202608252234-4CKSWA"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-25T22:41:17.308Z"
        approved_by: "USER"
        approved_digest: "sha256:c4dba10d7b4cb7bf6377f3066b543e2fc07efba3e36f03dc51d00264172edaae"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-25T22:40:22.497Z"
      digest: "sha256:c4dba10d7b4cb7bf6377f3066b543e2fc07efba3e36f03dc51d00264172edaae"
      proposal:
        assumptions:
          - "Stable 0.7.8 publication uses the repository's protected publish workflow and npm tag latest."
          - "Only failures satisfying the Task's four-part release-blocker firewall may expand candidate implementation scope."
          - "Branch-only dogfooding and recovery fixes remain deferred unless a required exact-candidate gate proves they affect release behavior."
          - "Every external effect-in-doubt is read back from GitHub or npm before retry."
        planning_baseline:
          captured_at: "2026-08-25T22:34:40.539Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:ddc1eadd12f745ee872f4b42889cdd1d0b2454f5275f18386cb9f7c527cc7b4b"
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
          git:
            kind: "commit"
            ref: null
            sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608252234-4CKSWA"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:parity"
              id: "release-parity"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              id: "release-scope-review"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "release-prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run release:e2e:local"
              id: "release-local-e2e"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              id: "hosted-release-checks"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "protected-publication"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              command: "bun run release:smoke:published -- --spec agentplane@0.7.8 --spec @agentplaneorg/core@0.7.8 --spec @agentplaneorg/recipes@0.7.8"
              id: "published-package-smoke"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              id: "provider-release-readback"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              command: "bun run release:postpublish:audit"
              id: "postpublish-audit"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "release-parity"
                - "release-scope-review"
              description: "The release candidate is based on frozen main 8ea1cefbbc96a8da5595fce36325ec0c1194a360 and contains only approved release changes."
              id: "release-candidate-bounded"
              required: true
            -
              check_ids:
                - "release-prepublish"
                - "release-local-e2e"
                - "hosted-release-checks"
              description: "All release-specific local and hosted gates pass on the exact candidate SHA."
              id: "release-candidate-qualified"
              required: true
            -
              check_ids:
                - "protected-publication"
                - "published-package-smoke"
                - "provider-release-readback"
                - "postpublish-audit"
              description: "Protected publication and independent npm, GitHub, exact-SHA, and installed-CLI readback all pass."
              id: "release-published-proved"
              required: true
          evidence_fingerprint: "sha256:0c471a54a6c5c0e8bd20dd951bcc0634b89de710df4ff56b9a03d697cca261f1"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-parity"
                  description: "Every required version surface resolves to stable 0.7.8 and release parity passes."
                  id: "metadata-version-parity"
                  required: true
                -
                  check_ids:
                    - "registry-availability"
                  description: "Version 0.7.8 is not already published or otherwise burned for any release participant."
                  id: "metadata-registry-available"
                  required: true
                -
                  check_ids:
                    - "release-scope-review"
                  description: "The candidate diff contains only the approved stable version transition, release notes, and required generated artifacts."
                  id: "metadata-bounded-scope"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "website/static/img/social/manifest.json"
                  - "scripts/release/check-release-version.mjs"
                required_sources:
                  - "scripts/release/version-surfaces.json"
                  - "scripts/release/version-bump.mjs"
                  - "docs/releases/v0.7.7.md"
                  - "package.json"
                symbol_hints:
                  - "listReleaseVersionSurfacePaths"
                  - "applyReleaseVersionSurfaces"
              depends_on: []
              expected_outputs:
                - "All required release version surfaces set to 0.7.8"
                - "docs/releases/v0.7.8.md with exact candidate scope"
                - "Only required generated release artifacts"
                - "Evidence that 0.7.8 is available for publication"
              id: "release-metadata"
              objective: "Create the bounded 0.7.8 candidate metadata and release notes from frozen base 8ea1cefbbc96a8da5595fce36325ec0c1194a360 without unrelated implementation changes."
              optional: false
              priority: 100
              required_inputs:
                - "Frozen repository snapshot 8ea1cefbbc96a8da5595fce36325ec0c1194a360"
                - "scripts/release/version-surfaces.json"
                - "Existing v0.7.7 release-note format"
                - "Release blocker firewall from the Task objective"
              resource_claims:
                -
                  kind: "exclusive"
                  mode: "exclusive"
                  resource: "release:0.7.8"
              risk: "medium"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - ".agentplane/config.json"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/recipes/src/index.ts"
                - "packages/spec/examples/acr.json"
                - "packages/testkit/package.json"
                - "docs/releases/v0.7.8.md"
                - "website/static/img/social/docs/releases/v0.7.8.png"
                - "website/static/img/social/manifest.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:parity"
                    id: "release-parity"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run release:check:registry -- --version 0.7.8"
                    id: "registry-availability"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    id: "release-scope-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release-parity"
                    description: "Every required version surface resolves to stable 0.7.8 and release parity passes."
                    id: "metadata-version-parity"
                    required: true
                  -
                    check_ids:
                      - "registry-availability"
                    description: "Version 0.7.8 remains available in npm."
                    id: "metadata-registry-available"
                    required: true
                  -
                    check_ids:
                      - "release-scope-review"
                    description: "No unrelated repository mutation enters the release candidate."
                    id: "metadata-bounded-scope"
                    required: true
                evidence_fingerprint: "sha256:5e228109e4ebc04c02a8e93df429772b630c441c017e9cff89b0de639ef63944"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-prepublish"
                  description: "The canonical full prepublish gate passes on the exact candidate SHA."
                  id: "candidate-prepublish-pass"
                  required: true
                -
                  check_ids:
                    - "release-local-e2e"
                  description: "The local release E2E, including packaged clean-install behavior, passes on the exact candidate."
                  id: "candidate-local-e2e-pass"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 400000
                optional_sources:
                  - ".github/workflows/core-ci.yml"
                required_sources:
                  - "package.json"
                  - "scripts/release"
                  - "scripts/qualification"
                symbol_hints:
                  - "release:prepublish"
                  - "release:e2e:local"
                  - "package:install-smoke"
              depends_on:
                - "release-metadata"
              expected_outputs:
                - "Successful release:prepublish evidence"
                - "Successful local release E2E evidence"
                - "Successful package tarball and clean installed-CLI smoke evidence"
                - "Exact qualified candidate SHA"
              id: "candidate-qualification"
              objective: "Qualify the exact bounded 0.7.8 candidate locally through release-specific build, test, packaging, tarball, installed-CLI, and real-E2E gates."
              optional: false
              priority: 90
              required_inputs:
                - "Committed bounded 0.7.8 candidate"
                - "Canonical release scripts from package.json"
                - "Clean candidate worktree"
              resource_claims:
                -
                  kind: "exclusive"
                  mode: "exclusive"
                  resource: "release:0.7.8"
              risk: "medium"
              scope_roots: []
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release-prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "bun run release:e2e:local"
                    id: "release-local-e2e"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "release-prepublish"
                    description: "The canonical full prepublish gate passes on the exact candidate SHA."
                    id: "candidate-prepublish-pass"
                    required: true
                  -
                    check_ids:
                      - "release-local-e2e"
                    description: "The local release E2E passes on the exact candidate SHA."
                    id: "candidate-local-e2e-pass"
                    required: true
                evidence_fingerprint: "sha256:9d73ca1eb9c8ed9db2d3473f024d45fbde7c3d12a10384a0b97d1e1088b20e89"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "hosted-release-checks"
                  description: "Every required hosted release check passes on the exact PR head candidate SHA."
                  id: "hosted-exact-head-pass"
                  required: true
                -
                  check_ids:
                    - "protected-integration"
                  description: "The candidate is integrated only by the AgentPlane protected PR route and the integrated main SHA is recorded."
                  id: "hosted-protected-integration"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 250000
                optional_sources: []
                required_sources:
                  - ".github/workflows"
                  - "AgentPlane hosted PR state"
                  - "Exact candidate commit identity"
                symbol_hints:
                  - "Release-ready manifest"
                  - "PR verification"
              depends_on:
                - "candidate-qualification"
              expected_outputs:
                - "PR bound to the exact candidate SHA"
                - "All required hosted release checks successful on that SHA"
                - "Protected integration receipt and exact integrated main SHA"
              id: "hosted-integration"
              objective: "Publish the candidate branch through the normal PR route, require hosted release checks on the exact candidate SHA, and integrate only after every required check passes."
              optional: false
              priority: 80
              required_inputs:
                - "Exact locally qualified candidate SHA"
                - "Protected branch and PR policy"
                - "Hosted Core CI and release-ready manifest"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "github:basilisk-labs/agentplane"
              risk: "high"
              scope_roots: []
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "hosted-release-checks"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "protected-integration"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "hosted-release-checks"
                    description: "Required hosted release checks pass on the exact candidate SHA."
                    id: "hosted-exact-head-pass"
                    required: true
                  -
                    check_ids:
                      - "protected-integration"
                    description: "Protected integration completes and records the resulting main SHA."
                    id: "hosted-protected-integration"
                    required: true
                evidence_fingerprint: "sha256:fb73e8f07acc84eeee0ac403708b1d61a9927b29810e64be0a8b8718d066771a"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "protected-publication"
                  description: "The protected publish effect succeeds exactly once, or an uncertain effect is reconciled by provider readback before any retry."
                  id: "publication-effect-once"
                  required: true
                -
                  check_ids:
                    - "published-package-smoke"
                  description: "All three npm packages and their latest dist-tags resolve to 0.7.8."
                  id: "publication-registry-parity"
                  required: true
                -
                  check_ids:
                    - "provider-release-readback"
                  description: "Git tag v0.7.8 and the GitHub Release resolve to the exact published main SHA."
                  id: "publication-provider-parity"
                  required: true
                -
                  check_ids:
                    - "postpublish-audit"
                  description: "A clean installation of the public package reports AgentPlane 0.7.8 and passes postpublication audit."
                  id: "publication-installed-cli"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "npm registry readback"
                  - "GitHub tag and release readback"
                required_sources:
                  - ".github/workflows/publish.yml"
                  - "scripts/release/check-published-packages.mjs"
                  - "scripts/release/audit-platform-publication.mjs"
                  - "Exact integrated main SHA"
                symbol_hints:
                  - "release:smoke:published"
                  - "release:postpublish:audit"
              depends_on:
                - "hosted-integration"
              expected_outputs:
                - "Protected successful publish workflow receipt"
                - "agentplane, @agentplaneorg/core, and @agentplaneorg/recipes published as 0.7.8"
                - "npm latest dist-tags read back as 0.7.8"
                - "v0.7.8 Git tag and GitHub Release bound to the exact release SHA"
                - "Clean installed AgentPlane CLI reports 0.7.8"
                - "Postpublication audit and exact-SHA parity evidence"
              id: "publish-and-readback"
              objective: "Publish v0.7.8 from the exact integrated release SHA through the protected workflow, reconcile uncertain effects by readback, and independently prove registry, tag, GitHub Release, dist-tag, and installed CLI parity."
              optional: false
              priority: 70
              required_inputs:
                - "Exact integrated main SHA"
                - "Protected publish authority"
                - "npm and GitHub provider state"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "release:0.7.8"
              risk: "high"
              scope_roots: []
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "protected-publication"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run release:smoke:published -- --spec agentplane@0.7.8 --spec @agentplaneorg/core@0.7.8 --spec @agentplaneorg/recipes@0.7.8"
                    id: "published-package-smoke"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "provider-release-readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run release:postpublish:audit"
                    id: "postpublish-audit"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "protected-publication"
                    description: "Protected publication succeeds exactly once or is reconciled before retry."
                    id: "publication-effect-once"
                    required: true
                  -
                    check_ids:
                      - "published-package-smoke"
                    description: "All public npm packages resolve to 0.7.8."
                    id: "publication-registry-parity"
                    required: true
                  -
                    check_ids:
                      - "provider-release-readback"
                    description: "GitHub tag and Release bind to the exact release SHA."
                    id: "publication-provider-parity"
                    required: true
                  -
                    check_ids:
                      - "postpublish-audit"
                    description: "Clean installed CLI and postpublication audit pass."
                    id: "publication-installed-cli"
                    required: true
                evidence_fingerprint: "sha256:5b3b9f0dde065d05a984074f259e590ce32708e3776bffbbd961921d3cd5901c"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608252234-4CKSWA"
    event_cursor: 0
    final_validation: null
    id: "202608252234-4CKSWA"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-25T22:34:32.494Z"
      constraints: []
      request: |-
        Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360

        Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.
      task_id: "202608252234-4CKSWA"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-25T22:41:17.308Z"
    work_items:
      candidate-qualification:
        attempt: 0
        claim_id: null
        id: "candidate-qualification"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      hosted-integration:
        attempt: 0
        claim_id: null
        id: "hosted-integration"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      publish-and-readback:
        attempt: 0
        claim_id: null
        id: "publish-and-readback"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      release-metadata:
        attempt: 0
        claim_id: null
        id: "release-metadata"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  implementation_commit:
    hash: "114ea1df0713d9ddadc63e429fa0b8d34bc5a951"
  task_execution_context:
    base_ref: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360

Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.

## Scope

- In scope: Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.
- Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360".

## Plan

Prepared a four-stage exact-base release plan for AgentPlane 0.7.8 with a strict release-blocker firewall, bounded metadata changes, exact-candidate gates, protected publication, and independent readback.

## Verify Steps

PLANNER fallback scaffold for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
