---
id: "202609061750-Z0XXVD"
title: "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 24
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
  - "bun run qualification:mixed-scope-lifecycle"
  - "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
  - "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
plan_approval:
  state: "approved"
  updated_at: "2026-09-06T18:20:14.031Z"
  updated_by: "USER"
  note: "Relay of the user authorization to fix all required 0.7.8 release preparation. Fresh plan 3265ee89 adds only the generated version headers, two release social images and their manifest demanded by the existing prepublish gate. Preserve the approved version, two opening paragraphs, all checks and publication boundaries."
verification:
  state: "needs_rework"
  updated_at: "2026-09-06T18:16:28.303Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run release:prepublish"
  attempts: 1
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
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
      - "schema"
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/WORKFLOW.md"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.8-evidence"
      - "docs/releases/v0.7.8.md"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases"
      - "website/static/img/social/manifest.json"
      - "website/static/llms-full.txt"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Network reads install the known published baseline and package dependencies. Actual package publishing and protected integration retain separate native operator authority."
      - "Prepare only the exact approved release candidate and its evidence in an isolated native task worktree."
    repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/WORKFLOW.md"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.8-evidence"
      - "docs/releases/v0.7.8.md"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases"
      - "website/static/img/social/manifest.json"
      - "website/static/llms-full.txt"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "website"
    changed_paths:
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers/adr.svg"
      - "docs/assets/readme-headers/agentplane-cli.svg"
      - "docs/assets/readme-headers/agentplane.svg"
      - "docs/assets/readme-headers/core.svg"
      - "docs/assets/readme-headers/docs.svg"
      - "docs/assets/readme-headers/humanizer.svg"
      - "docs/assets/readme-headers/recipes.svg"
      - "docs/assets/readme-headers/releases.svg"
      - "docs/assets/readme-headers/schemas.svg"
      - "docs/assets/readme-headers/scripts.svg"
      - "docs/assets/readme-headers/skills.svg"
      - "docs/assets/readme-headers/spec.svg"
      - "docs/assets/readme-headers/testkit.svg"
      - "website/static/img/social/docs/releases/v0.7.8-evidence/preparation.png"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_dependencies"
    - "effect_public_api"
    - "effect_release_metadata"
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
          - ".agentplane/WORKFLOW.md"
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.8-evidence"
          - "docs/releases/v0.7.8.md"
          - "packages/agentplane/package.json"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "website/static/img/social/docs/releases"
          - "website/static/img/social/manifest.json"
          - "website/static/llms-full.txt"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:8be0c8e375514987869690ef8bfe03a65a00a280bfeb977e995027ede87c3be5"
      escalation_reasons:
        - "central_component:packages/core/package.json"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "website"
        changed_files:
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers/adr.svg"
          - "docs/assets/readme-headers/agentplane-cli.svg"
          - "docs/assets/readme-headers/agentplane.svg"
          - "docs/assets/readme-headers/core.svg"
          - "docs/assets/readme-headers/docs.svg"
          - "docs/assets/readme-headers/humanizer.svg"
          - "docs/assets/readme-headers/recipes.svg"
          - "docs/assets/readme-headers/releases.svg"
          - "docs/assets/readme-headers/schemas.svg"
          - "docs/assets/readme-headers/scripts.svg"
          - "docs/assets/readme-headers/skills.svg"
          - "docs/assets/readme-headers/spec.svg"
          - "docs/assets/readme-headers/testkit.svg"
          - "website/static/img/social/docs/releases/v0.7.8-evidence/preparation.png"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/manifest.json"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
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
      - "hosted_integration"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "bcd1de2213d918ce9fe5fc0eba592b7809e265f6"
  message: "🚧 Z0XXVD task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 529e290f2539. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bcd1de2213d9. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-06T17:54:49.426Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-06T18:13:31.704Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 529e290f2539. CLI accepted one state-bound external-agent semantic result."
    commit: "529e290f25392071470a7f6f5b1a1d9646688504"
  -
    type: "verify"
    at: "2026-09-06T18:16:28.303Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run release:prepublish"
  -
    type: "status"
    at: "2026-09-06T18:25:15.275Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bcd1de2213d9. CLI accepted one state-bound external-agent semantic result."
    commit: "bcd1de2213d918ce9fe5fc0eba592b7809e265f6"
doc_version: 3
doc_updated_at: "2026-09-06T18:25:15.275Z"
doc_updated_by: "SUPERVISOR"
description: "Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope."
sections:
  Summary: |-
    Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

    Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
  Scope: |-
    - In scope: Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
    - Out of scope: unrelated refactors not required for "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication".
  Plan: "Complete stable 0.7.8 release preparation with the required generated README headers and release-page social artifacts."
  Verify Steps: |-
    1. Run `bun run release:prepublish`. Expected: the committed 0.7.8 candidate passes canonical release CI, package checks, active-incident cleanup, version parity and generated-document freshness.
    2. Run `bun run qualification:mixed-scope-lifecycle`. Expected: the installed packed candidate completes the mixed source, test and documentation lifecycle with correct replay, stale-result, projection and cleanup behavior.
    3. Run `node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs`. Expected: published 0.7.7 direct and branch_pr fixtures upgrade using packed 0.7.8, preserve existing task identity, content and DOING state, produce the dedicated upgrade commit, pass routing and doctor, and make no changes on an actual repeated upgrade.
    4. Run `node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417`. Expected: valid English template sections and complete planned change coverage. Review the first two prose paragraphs for a clear explanation of practical user outcomes.
    5. Review the final diff and observed evidence. Expected: only approved release metadata, notes, generated references and qualification artifacts changed; publication remains explicitly pending until exact-SHA hosted release-ready and canonical publish-result evidence exist.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-06T18:16:28.303Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run release:prepublish
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:860a8441b86236b4176982b3b7cc53b92a7cc2d7a60ae35921ca43cf99931621, input_digest=sha256:5db480110194b3a749db12713701ab37ef4728721168a51473e08b55e832c317

    Details:

    Command: bun run release:prepublish
    Result: fail
    Evidence: .agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609061750-Z0XXVD declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609061750-Z0XXVD-prepare-and-qualify-agentplane-0-7-8-for-exact-s/.agentplane/tasks/202609061750-Z0XXVD/blueprint/resolved-snapshot.json
    - old_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
    - current_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609061750-Z0XXVD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609061750-Z0XXVD
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
    completion_contract_digest: "sha256:3dd28e0ddacc64658f92645f9f978f02cf04e445bdaf3e4c80fd698719700d88"
    digest: "sha256:d1b3aee111f5fa619deae26af54f85fa12291097bc8e8c64f57c7c0d90fe486d"
    grant_id: "03416d41-d763-45d9-ad20-bf0893dbc9f0"
    issued_at: "2026-09-06T18:20:14.031Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:73adedfd6902dadbc03677a4ac51add4a617533e1b16349067e7e451c977f31a"
    plan_revision: 21
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:dfcf17c2402a7a7ef380f235ab372b7fc8d1cf85896e338299ea8ab45655a3fc"
    status: "active"
    task_id: "202609061750-Z0XXVD"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-06T18:20:14.031Z"
        approved_by: "USER"
        approved_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-06T18:19:59.972Z"
      digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
      proposal:
        assumptions:
          - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
          - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
          - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
          - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
          - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
          - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
          - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
          - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
          - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
          - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
          - "Native prepublish failed on fourteen stale generated version SVGs, and docs:social:check reports only two missing release images and a stale manifest. Run bun run docs:readme-header:generate and bun run docs:social:generate. Preserve all unrelated existing images and unchanged README content. The generators may rewrite byte-identical README headers; only the named generated artifact roots should appear in the final product diff."
          - "The native supervisor may amend its implementation evidence commit during recovery. Use current Git and native verification records for exact identity; do not revive the earlier 529e290f identity as the current head."
        planning_baseline:
          captured_at: "2026-09-06T18:18:54.996Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:2d335069aa846a4832467d166fa7f69e1330dc622c6e3aa839583b8f3aebb55a"
          dirty_paths:
            - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "010f7598eefd21ee5f19b9893485ed88cf0a7d3d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:20"
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run qualification:mixed-scope-lifecycle"
              id: "installed-lifecycle"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
              id: "published-upgrade"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
              id: "release-notes"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
          criteria:
            -
              check_ids:
                - "prepublish"
              description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
              id: "stable-candidate"
              required: true
            -
              check_ids:
                - "release-notes"
                - "prepublish"
              description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
              id: "readable-complete-notes"
              required: true
            -
              check_ids:
                - "installed-lifecycle"
                - "published-upgrade"
              description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
              id: "installed-reliability"
              required: true
          evidence_fingerprint: "sha256:2d335069aa846a4832467d166fa7f69e1330dc622c6e3aa839583b8f3aebb55a"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "prepublish"
                  description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                  id: "stable-candidate"
                  required: true
                -
                  check_ids:
                    - "release-notes"
                    - "prepublish"
                  description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                  id: "readable-complete-notes"
                  required: true
                -
                  check_ids:
                    - "installed-lifecycle"
                    - "published-upgrade"
                  description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                  id: "installed-reliability"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "docs/releases/v0.7.7.md"
                  - "scripts/lib/installed-migration-matrix.mjs"
                  - "scripts/generate/generate-website-docs.mjs"
                required_sources:
                  - "docs/developer/release-and-publishing.mdx"
                  - "docs/releases/TEMPLATE.md"
                  - "scripts/release/version-surfaces.json"
                  - "scripts/release/version-bump.mjs"
                  - "scripts/lib/qualification-packed-runtime.mjs"
                  - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/policy/workflow.upgrade.md"
                  - "scripts/generate/generate-readme-header.mjs"
                  - "website/scripts/generate-social-images.mjs"
                symbol_hints:
                  - "installPublishedAgentplane"
                  - "installPackedWorkspace"
                  - "runPackagedMixedScopeLifecycle"
              depends_on: []
              expected_outputs:
                - "Stable 0.7.8 release metadata and generated references"
                - "English release notes with two accessible opening paragraphs and all planned changes"
                - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                - "Fresh 0.7.8 README header SVGs and generated release-page social images with their manifest"
              id: "prepare-qualified-078-candidate"
              objective: "Preserve the committed 0.7.8 metadata, readable complete release notes and installed upgrade script. Complete release preparation by refreshing the fourteen versioned README SVG headers, two required release-page social images and their manifest with existing generators. Run focused freshness checks and return the result for unchanged native release qualification."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: ".agentplane/WORKFLOW.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/recipes/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/recipes/src/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/examples/acr.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases/v0.7.8.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/generated-reference.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/llms-full.txt"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases/v0.7.8-evidence"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/assets/header.svg"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/assets/readme-headers"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/docs/releases"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/manifest.json"
              risk: "medium"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/recipes/src/index.ts"
                - "packages/spec/examples/acr.json"
                - "packages/testkit/package.json"
                - "docs/releases/v0.7.8.md"
                - "docs/reference/generated-reference.mdx"
                - "website/static/llms-full.txt"
                - "docs/releases/v0.7.8-evidence"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "website/static/img/social/docs/releases"
                - "website/static/img/social/manifest.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run qualification:mixed-scope-lifecycle"
                    id: "installed-lifecycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                    id: "published-upgrade"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                    id: "release-notes"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                evidence_fingerprint: "sha256:2d335069aa846a4832467d166fa7f69e1330dc622c6e3aa839583b8f3aebb55a"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202609061750-Z0XXVD"
    event_cursor: 17
    final_validation: null
    id: "202609061750-Z0XXVD"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run qualification:mixed-scope-lifecycle"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node .agentplane/tasks/202609061750-Z0XXVD/evidence/qualify-upgrade-0.7.7.mjs"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
          id: "legacy-4"
          required: true
      captured_at: "2026-09-06T17:50:14.084Z"
      constraints: []
      request: |-
        Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

        Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
      task_id: "202609061750-Z0XXVD"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-06T17:53:30.169Z"
        digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
          planning_baseline:
            captured_at: "2026-09-06T17:50:59.283Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:345943aa99961211ef7adfa39da7933b927fe8fd3725e296e77085c83ce66114"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "262da3130bc5628a7641c400c74368ae355000bf"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/tasks/202609061750-Z0XXVD/evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:345943aa99961211ef7adfa39da7933b927fe8fd3725e296e77085c83ce66114"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                id: "prepare-qualified-078-candidate"
                objective: "Prepare the user-approved stable 0.7.8 metadata, readable complete release notes, and reproducible installed upgrade qualification. Keep publication and formal lifecycle transitions at the subsequent native operator boundaries."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/tasks/202609061750-Z0XXVD/evidence"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - ".agentplane/tasks/202609061750-Z0XXVD/evidence"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/tasks/202609061750-Z0XXVD/evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:345943aa99961211ef7adfa39da7933b927fe8fd3725e296e77085c83ce66114"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-06T18:11:16.880Z"
        digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "Restore the preserved relocation-drafts.json from the original executor exchange after the revised authority is issued. Move only the four authored evidence files to docs/releases/v0.7.8-evidence and use ../../../scripts/lib/qualification-packed-runtime.mjs plus ../../../ as the script root. Keep .agentplane/tasks entirely framework-owned. The original recorded result is retired and must not be rewritten or submitted as a new implementation."
          planning_baseline:
            captured_at: "2026-09-06T18:10:28.303Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:dfce891c043358fed029d2a05b375803c54f1301dc47505af76a03b7d2e7b1e6"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/diffstat.txt"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/github-body.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/github-title.txt"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/meta.json"
              - ".agentplane/tasks/202609061750-Z0XXVD/pr/review.md"
            git:
              kind: "commit"
              ref: null
              sha: "262da3130bc5628a7641c400c74368ae355000bf"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:10"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:dfce891c043358fed029d2a05b375803c54f1301dc47505af76a03b7d2e7b1e6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                id: "prepare-qualified-078-candidate"
                objective: "Prepare the user-approved stable 0.7.8 metadata, readable complete release notes, and reproducible installed upgrade qualification. Keep publication and formal lifecycle transitions at the subsequent native operator boundaries."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:dfce891c043358fed029d2a05b375803c54f1301dc47505af76a03b7d2e7b1e6"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      -
        approval:
          approved_at: "2026-09-06T18:16:14.692Z"
          approved_by: "USER"
          approved_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-06T18:15:57.172Z"
        digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
        proposal:
          assumptions:
            - "The operator already approved the exact stable version 0.7.8 and all necessary release actions. Native release plan .agentplane/.release/plan/2026-09-06T17-50-45-857Z fixes base 262da3130bc5628a7641c400c74368ae355000bf and v0.7.7..HEAD, with 1417 changes. Read the original plan from the primary checkout and preserve its exact inputs in task evidence. Do not change the native plan range or its version."
            - "Use the existing local version-surface utility for the approved metadata values and current documentation generators. Do not invoke formal release candidate/apply, Git commits, tags, PRs, publication or lifecycle commands inside the semantic episode."
            - "The semantic WorkItem prepares a reversible local candidate. GitHub publication is a subsequent explicit operator action after native integration and exact-SHA hosted release-ready evidence. Never represent local qualification as a completed publication."
            - "The user specifically requested two human-readable opening paragraphs above the detailed Release Notes. Explain practical user outcomes without internal task identifiers or implementation jargon in those paragraphs. Keep the artifact in English under repository policy."
            - "The complete planned change record includes framework evidence commits. Describe their actual recorded evidence or lifecycle purpose; do not inflate them into product features. Keep concise user-facing highlights before the detailed record."
            - "Use existing qualification helpers and a task-specific script instead of new shared testing infrastructure. Install published 0.7.7 from npm and all three current packed packages into isolated temporary prefixes. Temporary fixture repositories are explicitly authorized test data; do not change global git configuration or real consumer repositories."
            - "Build packages and run focused version, formatting, notes and generation checks before returning the result. AgentPlane must commit the implementation before running declared full prepublish and installed checks, so a dirty product tree never substitutes for an exact committed candidate."
            - "The main 262da313 baseline already passed ci:local:full. Preserve the native full-regression policy floor for the release candidate; do not skip or weaken it."
            - "Store authored qualification scripts and immutable source evidence only under the allowed task evidence directory. The framework continues to own task README, verification, PR and closure artifacts. Do not hand-edit those artifacts."
            - "Existing unrelated legacy beta tasks, T4RR70 worktree, provider expansion and new framework refactors remain outside this WorkItem. Any new implementation defect requires an emitted rework/refinement route."
            - "The complete candidate is already committed as 529e290f25392071470a7f6f5b1a1d9646688504. Preserve it and the immutable previous result. No additional product mutation is needed if focused checks still pass. The new semantic result must describe the existing implementation honestly; AgentPlane retains responsibility for recording its identity and verification."
          planning_baseline:
            captured_at: "2026-09-06T18:15:00.786Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:26d3d64472fa8d1cfc95efa4b541dd5a78b6a77b34e443d58e1b7949d69cfd20"
            dirty_paths:
              - ".agentplane/tasks/202609061750-Z0XXVD/README.md"
              - ".agentplane/tasks/202609061750-Z0XXVD/supervision/implementation-evidence.json"
            git:
              kind: "commit"
              ref: null
              sha: "529e290f25392071470a7f6f5b1a1d9646688504"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:16"
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run qualification:mixed-scope-lifecycle"
                id: "installed-lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                id: "published-upgrade"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                id: "release-notes"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
            criteria:
              -
                check_ids:
                  - "prepublish"
                description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                id: "stable-candidate"
                required: true
              -
                check_ids:
                  - "release-notes"
                  - "prepublish"
                description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                id: "readable-complete-notes"
                required: true
              -
                check_ids:
                  - "installed-lifecycle"
                  - "published-upgrade"
                description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                id: "installed-reliability"
                required: true
            evidence_fingerprint: "sha256:26d3d64472fa8d1cfc95efa4b541dd5a78b6a77b34e443d58e1b7949d69cfd20"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "prepublish"
                    description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                    id: "stable-candidate"
                    required: true
                  -
                    check_ids:
                      - "release-notes"
                      - "prepublish"
                    description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                    id: "readable-complete-notes"
                    required: true
                  -
                    check_ids:
                      - "installed-lifecycle"
                      - "published-upgrade"
                    description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                    id: "installed-reliability"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 200000
                  optional_sources:
                    - "docs/releases/v0.7.7.md"
                    - "scripts/lib/installed-migration-matrix.mjs"
                    - "scripts/generate/generate-website-docs.mjs"
                  required_sources:
                    - "docs/developer/release-and-publishing.mdx"
                    - "docs/releases/TEMPLATE.md"
                    - "scripts/release/version-surfaces.json"
                    - "scripts/release/version-bump.mjs"
                    - "scripts/lib/qualification-packed-runtime.mjs"
                    - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/policy/workflow.upgrade.md"
                  symbol_hints:
                    - "installPublishedAgentplane"
                    - "installPackedWorkspace"
                    - "runPackagedMixedScopeLifecycle"
                depends_on: []
                expected_outputs:
                  - "Stable 0.7.8 release metadata and generated references"
                  - "English release notes with two accessible opening paragraphs and all planned changes"
                  - "Reproducible published 0.7.7 upgrade verification script and source-backed qualification evidence"
                id: "prepare-qualified-078-candidate"
                objective: "Preserve and qualify the already committed 0.7.8 candidate 529e290f25392071470a7f6f5b1a1d9646688504. Its existing exported recipes version is an explicitly declared public_api effect. Check release notes and qualification artifacts, then return the semantic result for native verification without inventing another product edit."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/recipes/src/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/examples/acr.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/llms-full.txt"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.8-evidence"
                risk: "medium"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/recipes/src/index.ts"
                  - "packages/spec/examples/acr.json"
                  - "packages/testkit/package.json"
                  - "docs/releases/v0.7.8.md"
                  - "docs/reference/generated-reference.mdx"
                  - "website/static/llms-full.txt"
                  - "docs/releases/v0.7.8-evidence"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run qualification:mixed-scope-lifecycle"
                      id: "installed-lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs"
                      id: "published-upgrade"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417"
                      id: "release-notes"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                  criteria:
                    -
                      check_ids:
                        - "prepublish"
                      description: "All three release packages and exact internal pins are 0.7.8. Existing version surfaces and generated references agree. Frozen dependency graph is preserved. The canonical prepublish gate passes on the committed candidate."
                      id: "stable-candidate"
                      required: true
                    -
                      check_ids:
                        - "release-notes"
                        - "prepublish"
                      description: "The release notes start with two ordinary, accessible English prose paragraphs explaining the practical meaning of the entire release. Required template sections and a curated change record cover every one of the 1417 planned commits without claiming publication or unobserved test success."
                      id: "readable-complete-notes"
                      required: true
                    -
                      check_ids:
                        - "installed-lifecycle"
                        - "published-upgrade"
                      description: "Packed installed lifecycle qualification passes. Published agentplane 0.7.7 initializes separate direct and branch_pr fixtures. Upgrading with packed 0.7.8 preserves existing task identity, content and lifecycle state, records an upgrade commit, passes doctor and policy routing, and is idempotent. Evidence records actual package hashes and outcomes."
                      id: "installed-reliability"
                      required: true
                  evidence_fingerprint: "sha256:26d3d64472fa8d1cfc95efa4b541dd5a78b6a77b34e443d58e1b7949d69cfd20"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
    revision: 24
    schema_version: 1
    updated_at: "2026-09-06T18:25:15.275Z"
    work_items:
      prepare-qualified-078-candidate:
        attempt: 0
        claim_id: null
        id: "prepare-qualified-078-candidate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-06T18:08:37.133Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "ORCHESTRATOR"
        cause_refs:
          - "plan:sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          - "note:sha256:304cb946a533f0408dd393933bb95e943b36b110e700e7b75b08471167ca79c2"
        entity: "task"
        id: "event_29817e2f2bfe97adcc4714ac"
        mutation_id: "plan-reject-cd47d1eb9548784ab5638e357de58871"
        plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-06T18:14:53.037Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "ORCHESTRATOR"
        cause_refs:
          - "plan:sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          - "note:sha256:2ed70fe3d8063c8b5b9f3f16e3398b596078310f7ec558e9399e9fcff23209ae"
        entity: "task"
        id: "event_2041baa5f5f91c6260fd83ae"
        mutation_id: "plan-reject-571b1f92492d0423993820e92b607dd2"
        plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 14
        work_item_id: null
      -
        at: "2026-09-06T18:18:53.456Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_4a7740b9ca7dc02918e6374d"
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15"
        plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
        task_revision: 19
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:022834da100df7fc3623c30cc816ea817bf10345a355f2f1c927d82e6bc91348:
        aggregate_digest: "sha256:087d8f51468b7d88d1618131d7f5e451b4f31d4e13fbf452ae4ff0c7b979ac6e"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:15:57.181Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_328d7ade2103df43a490082e"
          mutation_id: "compatibility:sha256:022834da100df7fc3623c30cc816ea817bf10345a355f2f1c927d82e6bc91348"
          plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:022834da100df7fc3623c30cc816ea817bf10345a355f2f1c927d82e6bc91348"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:26f0fd85026bcefd781c4807eeb949178126b891cab698d31872c3ee2b562efd:
        aggregate_digest: "sha256:84598813318a3db5a8973bb6a0ff8713d258b96a9796a8460259737414fb54a6"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:49.426Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_8bc3e574ef8a9c337810fcac"
          mutation_id: "compatibility:sha256:26f0fd85026bcefd781c4807eeb949178126b891cab698d31872c3ee2b562efd"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:26f0fd85026bcefd781c4807eeb949178126b891cab698d31872c3ee2b562efd"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:38c1a368b397f18797dcfd4a0c15c09b1e8d686f22df7266d2bdbac12edc33f0:
        aggregate_digest: "sha256:581d5094b401d85b66d996cc84a74adac9699dd795eff3bd90f6c90b6a4a92ea"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:13:31.704Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8c265be062b65af9e44ca695"
          mutation_id: "compatibility:sha256:38c1a368b397f18797dcfd4a0c15c09b1e8d686f22df7266d2bdbac12edc33f0"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:38c1a368b397f18797dcfd4a0c15c09b1e8d686f22df7266d2bdbac12edc33f0"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:3a7d4e38747fb89a3ca23da8d1d7dfd5298e74458f0cadd1bfa99c009afb1957:
        aggregate_digest: "sha256:73200c6e25978743d9625d20b68a0e7cb759cceed5d7f1600a7ea95326cb6df9"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:10:27.211Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_8dc069cfb866d3ec6dda357a"
          mutation_id: "compatibility:sha256:3a7d4e38747fb89a3ca23da8d1d7dfd5298e74458f0cadd1bfa99c009afb1957"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 9
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:3a7d4e38747fb89a3ca23da8d1d7dfd5298e74458f0cadd1bfa99c009afb1957"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:5a3a6c5e45f3bb85d6ae8f44300701014a86a20911b100533285f921128a94db:
        aggregate_digest: "sha256:c642d341d5a33d6df692f9ae6ac118d1d625a99c104553b76e2b96c2c56925db"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:19.415Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_bb36c79b88999f7871c777ba"
          mutation_id: "compatibility:sha256:5a3a6c5e45f3bb85d6ae8f44300701014a86a20911b100533285f921128a94db"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:5a3a6c5e45f3bb85d6ae8f44300701014a86a20911b100533285f921128a94db"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:799e3b7339d08d6b19b67cc357c43ae214094bdfcaf70d7f18d191b187dfa2bb:
        aggregate_digest: "sha256:c478ef3611f79c6c58b41df5820211fc99e6c06dac840bd310b7eca26dd6ae2a"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:16:29.069Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f04f60838b96bd1524d1abb8"
          mutation_id: "compatibility:sha256:799e3b7339d08d6b19b67cc357c43ae214094bdfcaf70d7f18d191b187dfa2bb"
          plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:799e3b7339d08d6b19b67cc357c43ae214094bdfcaf70d7f18d191b187dfa2bb"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:8be6b8ca800a1de129a9b4f2b61dcfab99999bd7f846e3c9913b108f327eb5c8:
        aggregate_digest: "sha256:75aeed7703a95f3a64e5bf98050b5a4c6a868f72f9d963c748e6962db1bf161f"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:14:53.426Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_145815ee4f90c9c4a1445f8f"
          mutation_id: "compatibility:sha256:8be6b8ca800a1de129a9b4f2b61dcfab99999bd7f846e3c9913b108f327eb5c8"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 15
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:8be6b8ca800a1de129a9b4f2b61dcfab99999bd7f846e3c9913b108f327eb5c8"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:a6d7e4c9e442ea5fe493b9b59461a6760f210c674f4aab6c4649f6f61c053b3c:
        aggregate_digest: "sha256:71d94ac99ea51f48c0200b4ee1ae1957119ee73f656c9d426cf60c031368062e"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:25:15.275Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_92d897086254f634d8052e85"
          mutation_id: "compatibility:sha256:a6d7e4c9e442ea5fe493b9b59461a6760f210c674f4aab6c4649f6f61c053b3c"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 22
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a6d7e4c9e442ea5fe493b9b59461a6760f210c674f4aab6c4649f6f61c053b3c"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:b7e389e2a3a4fb34ece00c7e2716efa2957fbd321a8dd8adf7d1867bbf20a8e9:
        aggregate_digest: "sha256:1c74719e1e02381880db5a7021b5a7d5866587351e3200a512434e0fba92bea1"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:49.426Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3280ea87e2af8333f5a6aaf2"
          mutation_id: "compatibility:sha256:b7e389e2a3a4fb34ece00c7e2716efa2957fbd321a8dd8adf7d1867bbf20a8e9"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b7e389e2a3a4fb34ece00c7e2716efa2957fbd321a8dd8adf7d1867bbf20a8e9"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:d30fa027ed7856e7056d2598a86b1ccfc5c30fa868397a607d2774dff2e1daca:
        aggregate_digest: "sha256:0df693d0d2dafafae59c71f0961dc5c6b8dbfcd6bb4dc7b2b586b61fc9e19963"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:25:15.275Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_273fe2f5a73fd0dfe2aaef48"
          mutation_id: "compatibility:sha256:d30fa027ed7856e7056d2598a86b1ccfc5c30fa868397a607d2774dff2e1daca"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 23
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d30fa027ed7856e7056d2598a86b1ccfc5c30fa868397a607d2774dff2e1daca"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:d6922ff05cf38a0dba3530ebf94bb6f2f76c1b14c812fcdfd598c982da9b7bce:
        aggregate_digest: "sha256:56b525d8a8180e7bd604c0ab4d0dbff48b45b4ed98aa0ada452dd1c6b6f2d975"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:09:05.556Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_6595801c6728c06a36d1d704"
          mutation_id: "compatibility:sha256:d6922ff05cf38a0dba3530ebf94bb6f2f76c1b14c812fcdfd598c982da9b7bce"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 8
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:d6922ff05cf38a0dba3530ebf94bb6f2f76c1b14c812fcdfd598c982da9b7bce"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:dfca504742a503e965fdf03ef3c604fb5d4acbe02eeeb5fda668bc1eacf50ace:
        aggregate_digest: "sha256:bc9fdd1528c19bfa09f90ed421dd9178dc782a77e0473115b68eeb3224b1d6b0"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:11:16.888Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c43f37ff0b9851123d3fae79"
          mutation_id: "compatibility:sha256:dfca504742a503e965fdf03ef3c604fb5d4acbe02eeeb5fda668bc1eacf50ace"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dfca504742a503e965fdf03ef3c604fb5d4acbe02eeeb5fda668bc1eacf50ace"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:e0e0cb34033033c7ab8d7189975c53ae57ad31b72025bb792b8033f93e1045b5:
        aggregate_digest: "sha256:42c801343d3f4fb0b6be1d8e42d7c50987b42e338a689c992d86035fecca2818"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T17:54:19.416Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8bdee5e301d25d90ffdab33e"
          mutation_id: "compatibility:sha256:e0e0cb34033033c7ab8d7189975c53ae57ad31b72025bb792b8033f93e1045b5"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e0e0cb34033033c7ab8d7189975c53ae57ad31b72025bb792b8033f93e1045b5"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:e337b254448112333dc3aa41df847a7208f6474fdd15a04de63b8dc01576d7db:
        aggregate_digest: "sha256:b12b8c74a5fa7c11e0e7069a8f608369656e8c7b3eaefa6477b74b94310352bd"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:19:59.982Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9a3711808d5c739abfe23a36"
          mutation_id: "compatibility:sha256:e337b254448112333dc3aa41df847a7208f6474fdd15a04de63b8dc01576d7db"
          plan_digest: "sha256:3265ee89d510c5fed575e40417e8b6d2a11821ad9f5ea982c3dc115ecaa22526"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e337b254448112333dc3aa41df847a7208f6474fdd15a04de63b8dc01576d7db"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      compatibility:sha256:f39b24041988d8c80f1edd6f7bee46b7d776fc185073f15804173e5ab383a790:
        aggregate_digest: "sha256:039213a7cf78cf71f21599daa3f2ceb75b7df3173d1f9fc1b0f195e350fb3cb9"
        event:
          actor_id: "agentplane"
          at: "2026-09-06T18:13:31.704Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c8a26cecf48547f494a4fb4e"
          mutation_id: "compatibility:sha256:f39b24041988d8c80f1edd6f7bee46b7d776fc185073f15804173e5ab383a790"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f39b24041988d8c80f1edd6f7bee46b7d776fc185073f15804173e5ab383a790"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15:
        aggregate_digest: "sha256:8bea027c19e2865f0c30fdc3cb55b8662b4f5f2f80ca4e7ac11e4d1e0908644b"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-06T18:18:53.456Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_4a7740b9ca7dc02918e6374d"
          mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15"
          plan_digest: "sha256:908993cbf77b0fe6b76017d18561d5dbe82a85aee7ba118921d327054aa91c67"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 19
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609061750-Z0XXVD-executor-6727cc071bd99cbf1c16bd15"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-reject-571b1f92492d0423993820e92b607dd2:
        aggregate_digest: "sha256:60305b89f9f21ae771284ae39ab0dd9e3b195c53c6cb211ad9246987e48d397e"
        event:
          actor_id: "ORCHESTRATOR"
          at: "2026-09-06T18:14:53.037Z"
          cause_refs:
            - "plan:sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
            - "note:sha256:2ed70fe3d8063c8b5b9f3f16e3398b596078310f7ec558e9399e9fcff23209ae"
          entity: "task"
          from: "ACTIVE"
          id: "event_2041baa5f5f91c6260fd83ae"
          mutation_id: "plan-reject-571b1f92492d0423993820e92b607dd2"
          plan_digest: "sha256:4ace540ea054031b1e3407e552728c65ad7c0d3ebcf677317c8c920bad79b0b7"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 14
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-571b1f92492d0423993820e92b607dd2"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
      plan-reject-cd47d1eb9548784ab5638e357de58871:
        aggregate_digest: "sha256:64385ccbd27bafae72e5121f4bff45cfd7c821eba44355b70c35c42c2ec57d05"
        event:
          actor_id: "ORCHESTRATOR"
          at: "2026-09-06T18:08:37.133Z"
          cause_refs:
            - "plan:sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
            - "note:sha256:304cb946a533f0408dd393933bb95e943b36b110e700e7b75b08471167ca79c2"
          entity: "task"
          from: "ACTIVE"
          id: "event_29817e2f2bfe97adcc4714ac"
          mutation_id: "plan-reject-cd47d1eb9548784ab5638e357de58871"
          plan_digest: "sha256:aaca66f175885da71b3ac0a2b7a745eea8d3f1f8be6f39f2a5e54424172b7b2c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609061750-Z0XXVD"
          task_revision: 6
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-cd47d1eb9548784ab5638e357de58871"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609061750-Z0XXVD"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "bcd1de2213d918ce9fe5fc0eba592b7809e265f6"
  task_execution_context:
    base_ref: "main"
    base_sha: "262da3130bc5628a7641c400c74368ae355000bf"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "262da3130bc5628a7641c400c74368ae355000bf"
    version: 1
id_source: "generated"
---
## Summary

Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.

## Scope

- In scope: Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
- Out of scope: unrelated refactors not required for "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication".

## Plan

Complete stable 0.7.8 release preparation with the required generated README headers and release-page social artifacts.

## Verify Steps

1. Run `bun run release:prepublish`. Expected: the committed 0.7.8 candidate passes canonical release CI, package checks, active-incident cleanup, version parity and generated-document freshness.
2. Run `bun run qualification:mixed-scope-lifecycle`. Expected: the installed packed candidate completes the mixed source, test and documentation lifecycle with correct replay, stale-result, projection and cleanup behavior.
3. Run `node docs/releases/v0.7.8-evidence/qualify-upgrade-0.7.7.mjs`. Expected: published 0.7.7 direct and branch_pr fixtures upgrade using packed 0.7.8, preserve existing task identity, content and DOING state, produce the dedicated upgrade commit, pass routing and doctor, and make no changes on an actual repeated upgrade.
4. Run `node scripts/check-release-notes.mjs --tag v0.7.8 --min-bullets 1417`. Expected: valid English template sections and complete planned change coverage. Review the first two prose paragraphs for a clear explanation of practical user outcomes.
5. Review the final diff and observed evidence. Expected: only approved release metadata, notes, generated references and qualification artifacts changed; publication remains explicitly pending until exact-SHA hosted release-ready and canonical publish-result evidence exist.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-06T18:16:28.303Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run release:prepublish
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:860a8441b86236b4176982b3b7cc53b92a7cc2d7a60ae35921ca43cf99931621, input_digest=sha256:5db480110194b3a749db12713701ab37ef4728721168a51473e08b55e832c317

Details:

Command: bun run release:prepublish
Result: fail
Evidence: .agentplane/tasks/202609061750-Z0XXVD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609061750-Z0XXVD declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609061750-Z0XXVD-prepare-and-qualify-agentplane-0-7-8-for-exact-s/.agentplane/tasks/202609061750-Z0XXVD/blueprint/resolved-snapshot.json
- old_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
- current_digest: f6bec5868351edb7f16e9c97fcf1dc5a6cb402731f61bcbf310dfa10f5fb3ed2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609061750-Z0XXVD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609061750-Z0XXVD
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
