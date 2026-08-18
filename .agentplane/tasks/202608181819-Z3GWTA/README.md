---
id: "202608181819-Z3GWTA"
title: "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "marketing-boundary"
  - "positioning"
  - "website"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
blueprint_request: "code.direct"
verify:
  - "bun run docs:readme-header:check"
  - "bun run docs:site:check"
  - "bun run lint:website"
  - "bun run release:demo:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-18T18:23:24.386Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-18T20:03:12.286Z"
  updated_by: "TESTER"
  note: "All declared checks pass on implementation commit a74975786; launch source and derived context are absent from the current tree and suppressed from deletion diffs."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-18T20:04:04.039Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "a749757867ec2824f7206d0f544f0ea391172771"
  blueprint_digest: "55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae"
  evidence_refs:
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/20260818-200356108-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/20260818-200356108-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/objects/sha256/d61bd77a680dd69da5c8153c3014808dcc0a50ff59ea1caeee26eee02466085a.md"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/20260818-200356108-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/20260818-200356108-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/20260818-200356108-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608181819-Z3GWTA/README.md"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/objects/sha256/15ad14834d54cfca3bcf555ea4ced884086d80defcb694243d195a2b61f79bf3.patch"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/objects/sha256/ea53a9b9f7f4154e50f99490f3e4ebad1310fe69d38f8455ac9e192c4df647cd.json"
    - ".agentplane/tasks/202608181819-Z3GWTA/quality/objects/sha256/eafed46fee43d017a057933d11cf3e53dcf84df66a33c23ba4fe0d8f0ecf80a8.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.direct.md"
  findings:
    - "README, docs, website, SEO, comparison, demo, and generated discovery surfaces use the same category and authority/proof promise without exceeding the source-backed product contract."
    - "Current-tree searches find no unique internal launch-draft phrases; docs/launch/** and launch-derived context changes render without textual bodies through scoped .gitattributes rules."
    - "Only the current sanitized review packet remains in the task quality store."
execution_route:
  frozen: true
  reason_codes:
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "direct"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "external_write"
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:documentation"
    changed_components:
      - ".agentplane"
      - ".gitattributes"
      - "README.md"
      - "context"
      - "docs"
      - "marketing"
      - "packages/agentplane"
      - "website"
    changed_paths:
      - ".agentplane/context/derived/reports/release-docs-assimilation.json"
      - ".agentplane/context/derived/reports/release-docs-assimilation.sgr.json"
      - ".agentplane/context/derived/reports/release-docs-coverage-detail.jsonl"
      - ".gitattributes"
      - "README.md"
      - "context/wiki/release-docs/concepts/acr.md"
      - "context/wiki/release-docs/concepts/configuration.md"
      - "context/wiki/release-docs/concepts/recipes.md"
      - "context/wiki/release-docs/docs-domains.md"
      - "context/wiki/release-docs/domains/launch.md"
      - "docs/assets/agentplane-demo.gif"
      - "docs/assets/agentplane-demo.tape"
      - "docs/compare.mdx"
      - "docs/index.mdx"
      - "docs/launch/checklist.md"
      - "docs/launch/hn.md"
      - "docs/launch/reddit.md"
      - "docs/launch/twitter.md"
      - "docs/listing.md"
      - "docs/manifesto.mdx"
      - "docs/user/overview.mdx"
      - "marketing"
      - "packages/agentplane/README.md"
      - "website/docusaurus.config.ts"
      - "website/scripts/check-site-content.mjs"
      - "website/src/data/homepage-content.ts"
      - "website/src/pages/_home.module.css"
      - "website/src/pages/index.tsx"
      - "website/static/img/social/docs/launch/checklist.png"
      - "website/static/img/social/docs/launch/hn.png"
      - "website/static/img/social/docs/launch/reddit.png"
      - "website/static/img/social/docs/launch/twitter.png"
      - "website/static/img/social/manifest.json"
      - "website/static/llms-full.txt"
      - "website/static/llms.txt"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:external_write"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "external_write"
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:8b43a6e0da00cc759499f5c5ba0bf9fdb41e7a33450c9b655f3d3c8dc5a8a18e"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:.agentplane/context/derived/reports/release-docs-assimilation.json"
        - "unknown_path:.agentplane/context/derived/reports/release-docs-assimilation.sgr.json"
        - "unknown_path:.agentplane/context/derived/reports/release-docs-coverage-detail.jsonl"
        - "unknown_path:.gitattributes"
        - "unknown_path:marketing"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - ".gitattributes"
          - "README.md"
          - "context"
          - "docs"
          - "marketing"
          - "packages/agentplane"
          - "website"
        changed_files:
          - ".agentplane/context/derived/reports/release-docs-assimilation.json"
          - ".agentplane/context/derived/reports/release-docs-assimilation.sgr.json"
          - ".agentplane/context/derived/reports/release-docs-coverage-detail.jsonl"
          - ".gitattributes"
          - "README.md"
          - "context/wiki/release-docs/concepts/acr.md"
          - "context/wiki/release-docs/concepts/configuration.md"
          - "context/wiki/release-docs/concepts/recipes.md"
          - "context/wiki/release-docs/docs-domains.md"
          - "context/wiki/release-docs/domains/launch.md"
          - "docs/assets/agentplane-demo.gif"
          - "docs/assets/agentplane-demo.tape"
          - "docs/compare.mdx"
          - "docs/index.mdx"
          - "docs/launch/checklist.md"
          - "docs/launch/hn.md"
          - "docs/launch/reddit.md"
          - "docs/launch/twitter.md"
          - "docs/listing.md"
          - "docs/manifesto.mdx"
          - "docs/user/overview.mdx"
          - "marketing"
          - "packages/agentplane/README.md"
          - "website/docusaurus.config.ts"
          - "website/scripts/check-site-content.mjs"
          - "website/src/data/homepage-content.ts"
          - "website/src/pages/_home.module.css"
          - "website/src/pages/index.tsx"
          - "website/static/img/social/docs/launch/checklist.png"
          - "website/static/img/social/docs/launch/hn.png"
          - "website/static/img/social/docs/launch/reddit.png"
          - "website/static/img/social/docs/launch/twitter.png"
          - "website/static/img/social/manifest.json"
          - "website/static/llms-full.txt"
          - "website/static/llms.txt"
        external_effects: []
        repository_effects:
          - "documentation"
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
      - "external_effect:external_write"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "cbd9d5b3c234238194cbfb5f5e760129d5b71493"
  message: "🚧 Z3GWTA task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Blocked: public main diverges from origin/main (ahead 34, behind 119), so AgentPlane refuses safe branch_pr worktree creation; base reconciliation requires an explicit operator choice because active worktrees and unpublished local history must be preserved."
  -
    author: "CODER"
    body: "Resume: operator-authorized base reconciliation completed in merge commit 7d7e964ae; origin/main is now an ancestor, conflicts used the newer upstream authority/config implementation, and targeted checks passed."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: cbd9d5b3c234. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-18T18:43:13.166Z"
    author: "CODER"
    from: "TODO"
    to: "BLOCKED"
    note: "Blocked: public main diverges from origin/main (ahead 34, behind 119), so AgentPlane refuses safe branch_pr worktree creation; base reconciliation requires an explicit operator choice because active worktrees and unpublished local history must be preserved."
  -
    type: "status"
    at: "2026-08-18T18:56:09.353Z"
    author: "CODER"
    from: "BLOCKED"
    to: "TODO"
    note: "Resume: operator-authorized base reconciliation completed in merge commit 7d7e964ae; origin/main is now an ancestor, conflicts used the newer upstream authority/config implementation, and targeted checks passed."
  -
    type: "status"
    at: "2026-08-18T18:57:10.256Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-18T19:10:55.040Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "f4b9faf482a744690425743a391d9498424e9f1a"
  -
    type: "verify"
    at: "2026-08-18T19:22:20.001Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Public positioning and website checks pass, but the declared release demo gate fails because the existing GIF is 3,834,539 bytes against a 3,000,000-byte limit."
  -
    type: "verify"
    at: "2026-08-18T19:37:43.515Z"
    author: "TESTER"
    state: "ok"
    note: "All declared checks pass after reducing the reproducible VHS demo canvas; public positioning, private-content boundary, production website build, policy routing, and release demo are verified."
  -
    type: "verify"
    at: "2026-08-18T19:39:18.309Z"
    author: "TESTER"
    state: "ok"
    note: "All declared checks pass on implementation commit 60c6cda2f; this record rebinds the already-observed evidence after the verified VHS output was committed."
  -
    type: "verify"
    at: "2026-08-18T19:46:33.941Z"
    author: "TESTER"
    state: "ok"
    note: "All declared checks pass on implementation commit 9a01a6dd4; current public context, docs, and website contain no launch-document metadata outside excluded historical provenance."
  -
    type: "status"
    at: "2026-08-18T19:53:57.078Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: cbd9d5b3c234. CLI accepted one state-bound external-agent semantic result."
    commit: "cbd9d5b3c234238194cbfb5f5e760129d5b71493"
  -
    type: "verify"
    at: "2026-08-18T19:59:51.783Z"
    author: "TESTER"
    state: "ok"
    note: "All declared checks pass on implementation commit cbd9d5b3c; launch-copy bodies are absent from the current tree and suppressed from deletion diffs."
  -
    type: "verify"
    at: "2026-08-18T20:03:12.286Z"
    author: "TESTER"
    state: "ok"
    note: "All declared checks pass on implementation commit a74975786; launch source and derived context are absent from the current tree and suppressed from deletion diffs."
doc_version: 3
doc_updated_at: "2026-08-18T20:03:31.414Z"
doc_updated_by: "SUPERVISOR"
description: "Unify public positioning across README, docs, website, SEO, demos, comparisons, and generated discovery surfaces. Move Launch Kit, post drafts, internal messaging strategy, and competitor research into the private agentplane-marketing repository without exposing them in the public code repository. Preserve source-backed claims and current 0.7.6 workflow truth."
sections:
  Summary: |-
    Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository

    Unify public positioning across README, docs, website, SEO, demos, comparisons, and generated discovery surfaces. Move Launch Kit, post drafts, internal messaging strategy, and competitor research into the private agentplane-marketing repository without exposing them in the public code repository. Preserve source-backed claims and current 0.7.6 workflow truth.
  Scope: |-
    - In scope: Unify public positioning across README, docs, website, SEO, demos, comparisons, and generated discovery surfaces. Move Launch Kit, post drafts, internal messaging strategy, and competitor research into the private agentplane-marketing repository without exposing them in the public code repository. Preserve source-backed claims and current 0.7.6 workflow truth.
    - Out of scope: unrelated refactors not required for "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository".
  Plan: "Reposition AgentPlane around one category contract: the Git-native control plane for coding agents. Migrate internal launch plans, post drafts, competitor research, and private messaging strategy out of the public repository into the authorized private agentplane-marketing repository; then align the public README, documentation, website, SEO, discovery surfaces, examples, and demo around bounded WorkOrders, human-owned approval boundaries, supervisor-observed receipts, and Git-native closure evidence."
  Verify Steps: |-
    PLANNER fallback scaffold for "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-18T19:22:20.001Z — VERIFY — needs_rework

    By: TESTER

    Note: Public positioning and website checks pass, but the declared release demo gate fails because the existing GIF is 3,834,539 bytes against a 3,000,000-byte limit.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:1a2f92e3ff2ef9e05d67da9dead653feb396fc7b6f61bb2eaab2d19bf0ce1223

    Details:

    Check: affected_unit_integration
    Command: bun run lint:website
    Result: pass
    Evidence: ESLint exited 0 on the published task branch.
    Scope: touched website implementation.

    Check: critical_paths
    Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
    Scope: public README and repository policy gateway.

    Check: full_regression
    Command: bun run release:demo:check
    Result: fail
    Evidence: docs/assets/agentplane-demo.gif is 3,834,539 bytes; enforced limit is 3,000,000 bytes.
    Scope: declared task verification set.

    Check: hosted_integration
    Command: agentplane pr open 202608181819-Z3GWTA --author CODER
    Result: pass
    Evidence: GitHub PR 4845 was created and linked by Agentplane.
    Scope: published task branch and PR metadata.

    Check: real_e2e
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
    Scope: public documentation and website build.

    Check: task_outcome
    Command: inspect public diff and private marketing source of truth
    Result: pass
    Evidence: public Launch Kit files and derived cards are removed; marketing submodule points to published private commit d590b93; canonical control-plane copy is present across README, docs, SEO, homepage, and llms surfaces.
    Scope: requested positioning and content-boundary outcome.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
    - old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-18T19:37:43.515Z — VERIFY — ok

    By: TESTER

    Note: All declared checks pass after reducing the reproducible VHS demo canvas; public positioning, private-content boundary, production website build, policy routing, and release demo are verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:139e758b0ed8e2d2a3d25665d60a6c1fdc96070466e4c6a16ffe417f68169c78

    Details:

    Check: affected_unit_integration
    Command: bun run lint:website
    Result: pass
    Evidence: ESLint exited 0 on the reworked task branch.
    Scope: touched website implementation.

    Check: critical_paths
    Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
    Scope: public README and repository policy gateway.

    Check: full_regression
    Command: bun run release:demo:check
    Result: pass
    Evidence: the check performed a fresh VHS render at 700x394; resulting GIF is 2,682,529 bytes under the 3,000,000-byte limit.
    Scope: declared release demo gate.

    Check: hosted_integration
    Command: agentplane pr open 202608181819-Z3GWTA --author CODER
    Result: pass
    Evidence: GitHub PR 4845 exists and is linked in task metadata; reworked head publication remains owned by the next Agentplane route.
    Scope: task branch and hosted PR linkage.

    Check: real_e2e
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
    Scope: public documentation and website build.

    Check: task_outcome
    Command: inspect public diff and published private marketing source of truth
    Result: pass
    Evidence: public Launch Kit files and derived cards are removed; marketing submodule points to published private commit d590b93; canonical control-plane copy is present across README, docs, SEO, homepage, and llms surfaces.
    Scope: requested positioning and content-boundary outcome.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
    - old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

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

    ### 2026-08-18T19:39:18.309Z — VERIFY — ok

    By: TESTER

    Note: All declared checks pass on implementation commit 60c6cda2f; this record rebinds the already-observed evidence after the verified VHS output was committed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:92a97dcecbcd40c02b4d9680c39494cfbbe6f365588f6e103740ee7d83b26102

    Details:

    Check: affected_unit_integration
    Command: bun run lint:website
    Result: pass
    Evidence: ESLint exited 0 on the reworked task branch.
    Scope: touched website implementation.

    Check: critical_paths
    Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
    Scope: public README and repository policy gateway.

    Check: full_regression
    Command: bun run release:demo:check
    Result: pass
    Evidence: a fresh VHS render at 700x394 completed and stayed below the 3,000,000-byte limit; the verified output is committed in 60c6cda2f.
    Scope: declared release demo gate.

    Check: hosted_integration
    Command: agentplane pr open 202608181819-Z3GWTA --author CODER
    Result: pass
    Evidence: GitHub PR 4845 exists and is linked in task metadata; current head publication remains owned by the next Agentplane route.
    Scope: task branch and hosted PR linkage.

    Check: real_e2e
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
    Scope: public documentation and website build.

    Check: task_outcome
    Command: inspect public diff and published private marketing source of truth
    Result: pass
    Evidence: public Launch Kit files and derived cards are removed; marketing submodule points to published private commit d590b93; canonical control-plane copy is present across README, docs, SEO, homepage, and llms surfaces.
    Scope: requested positioning and content-boundary outcome.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
    - old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-18T19:46:33.941Z — VERIFY — ok

    By: TESTER

    Note: All declared checks pass on implementation commit 9a01a6dd4; current public context, docs, and website contain no launch-document metadata outside excluded historical provenance.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:b3f9887ceac28072ad83c9f29a1f1e71de10670634b2bac794d8a79849ca632b

    Details:

    Check: affected_unit_integration
    Command: bun run lint:website
    Result: pass
    Evidence: ESLint exited 0 on the cleaned task branch.
    Scope: touched website implementation.

    Check: critical_paths
    Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
    Scope: public README and repository policy gateway.

    Check: full_regression
    Command: bun run release:demo:check
    Result: pass
    Evidence: a fresh VHS render at 700x394 completed below the 3,000,000-byte limit; the committed verified GIF was restored byte-for-byte after the nondeterministic render.
    Scope: declared release demo gate.

    Check: hosted_integration
    Command: agentplane pr open 202608181819-Z3GWTA --author CODER
    Result: pass
    Evidence: GitHub PR 4845 exists and is linked in task metadata; cleaned head publication remains owned by the next Agentplane route.
    Scope: task branch and hosted PR linkage.

    Check: real_e2e
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
    Scope: public documentation and website build.

    Check: task_outcome
    Command: rg for launch paths and titles in current public context, docs, and website
    Result: pass
    Evidence: no matches remain outside deliberately excluded historical release provenance and task records; stale disposable release-docs assimilation reports were removed.
    Scope: requested current-tree private-content boundary and positioning outcome.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
    - old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-18T19:59:51.783Z — VERIFY — ok

    By: TESTER

    Note: All declared checks pass on implementation commit cbd9d5b3c; launch-copy bodies are absent from the current tree and suppressed from deletion diffs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:ed0a9e426313098216820ef43728b2ca3f84999fdb340bbe57cbdc52eb52d11e

    Details:

    Check: affected_unit_integration
    Command: bun run lint:website
    Result: pass
    Evidence: ESLint exited 0 on the current implementation.
    Scope: touched website implementation.

    Check: critical_paths
    Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
    Scope: public README, attributes, and repository policy gateway.

    Check: full_regression
    Command: bun run release:demo:check
    Result: pass
    Evidence: a fresh VHS render completed below the 3,000,000-byte limit; committed GIF bytes were restored after the nondeterministic render.
    Scope: declared release demo gate.

    Check: hosted_integration
    Command: agentplane pr open 202608181819-Z3GWTA --author CODER
    Result: pass
    Evidence: GitHub PR 4845 exists and is linked in task metadata; publication of the current clean head remains a subsequent lifecycle action.
    Scope: task branch and hosted PR linkage.

    Check: real_e2e
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus build, navigation check, and design-language check passed.
    Scope: public documentation and website build.

    Check: task_outcome
    Command: privacy phrase scan plus git diff check for docs/launch/**
    Result: pass
    Evidence: unique internal draft phrases have no current-tree matches; deleted launch files render as Binary files differ because docs/launch/** has diff unset.
    Scope: requested current-tree private-content boundary and PR diff exposure.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
    - old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-18T20:03:12.286Z — VERIFY — ok

    By: TESTER

    Note: All declared checks pass on implementation commit a74975786; launch source and derived context are absent from the current tree and suppressed from deletion diffs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:4caf666c0c8a28729af156e5ecc46baa0d87ca66d6dc19334ea22156d0ae4820

    Details:

    Check: affected_unit_integration
    Command: bun run lint:website
    Result: pass
    Evidence: ESLint exited 0 on the implementation immediately before the attributes-only privacy hardening commit.
    Scope: touched website implementation; the later commit changes only Git diff attributes and task evidence.

    Check: critical_paths
    Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
    Scope: public README and repository policy gateway.

    Check: full_regression
    Command: bun run release:demo:check
    Result: pass
    Evidence: a fresh VHS render completed below the 3,000,000-byte limit; committed GIF bytes were restored after the nondeterministic render.
    Scope: declared release demo gate.

    Check: hosted_integration
    Command: agentplane pr open 202608181819-Z3GWTA --author CODER
    Result: pass
    Evidence: GitHub PR 4845 exists and is linked in task metadata; current head publication remains a subsequent lifecycle action.
    Scope: task branch and hosted PR linkage.

    Check: real_e2e
    Command: bun run docs:site:check
    Result: pass
    Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus build, navigation check, and design-language check passed.
    Scope: public documentation and website build.

    Check: task_outcome
    Command: privacy phrase scan plus git diff review for docs/launch/**, context/wiki/release-docs/**, and .agentplane/context/derived/reports/release-docs-*
    Result: pass
    Evidence: unique internal draft phrases have no current-tree matches, and deleted launch source and derived context render only as Binary files differ.
    Scope: requested current-tree private-content boundary and hosted PR diff exposure.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
    - old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Observation: the approved branch_pr worktree cannot start because local main is 34 commits ahead of and 119 commits behind origin/main. AgentPlane refuses to branch from a stale base. Impact: public README, docs, website content, stale proof counters, launch-file deletion, and marketing submodule pointer update remain unmodified. Resolution: preserve all local commits and active worktrees; reconcile the base through an explicit operator-selected merge/rebase/recovery lane, then resume this task and rerun work start. Fixability: external."
extensions:
  workflow_route_baseline:
    start_head_sha: "7d7e964aec30e3551d34c81d3a726f28a6379690"
    version: 1
id_source: "generated"
---
## Summary

Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository

Unify public positioning across README, docs, website, SEO, demos, comparisons, and generated discovery surfaces. Move Launch Kit, post drafts, internal messaging strategy, and competitor research into the private agentplane-marketing repository without exposing them in the public code repository. Preserve source-backed claims and current 0.7.6 workflow truth.

## Scope

- In scope: Unify public positioning across README, docs, website, SEO, demos, comparisons, and generated discovery surfaces. Move Launch Kit, post drafts, internal messaging strategy, and competitor research into the private agentplane-marketing repository without exposing them in the public code repository. Preserve source-backed claims and current 0.7.6 workflow truth.
- Out of scope: unrelated refactors not required for "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository".

## Plan

Reposition AgentPlane around one category contract: the Git-native control plane for coding agents. Migrate internal launch plans, post drafts, competitor research, and private messaging strategy out of the public repository into the authorized private agentplane-marketing repository; then align the public README, documentation, website, SEO, discovery surfaces, examples, and demo around bounded WorkOrders, human-owned approval boundaries, supervisor-observed receipts, and Git-native closure evidence.

## Verify Steps

PLANNER fallback scaffold for "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the public repository". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-18T19:22:20.001Z — VERIFY — needs_rework

By: TESTER

Note: Public positioning and website checks pass, but the declared release demo gate fails because the existing GIF is 3,834,539 bytes against a 3,000,000-byte limit.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:1a2f92e3ff2ef9e05d67da9dead653feb396fc7b6f61bb2eaab2d19bf0ce1223

Details:

Check: affected_unit_integration
Command: bun run lint:website
Result: pass
Evidence: ESLint exited 0 on the published task branch.
Scope: touched website implementation.

Check: critical_paths
Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
Scope: public README and repository policy gateway.

Check: full_regression
Command: bun run release:demo:check
Result: fail
Evidence: docs/assets/agentplane-demo.gif is 3,834,539 bytes; enforced limit is 3,000,000 bytes.
Scope: declared task verification set.

Check: hosted_integration
Command: agentplane pr open 202608181819-Z3GWTA --author CODER
Result: pass
Evidence: GitHub PR 4845 was created and linked by Agentplane.
Scope: published task branch and PR metadata.

Check: real_e2e
Command: bun run docs:site:check
Result: pass
Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
Scope: public documentation and website build.

Check: task_outcome
Command: inspect public diff and private marketing source of truth
Result: pass
Evidence: public Launch Kit files and derived cards are removed; marketing submodule points to published private commit d590b93; canonical control-plane copy is present across README, docs, SEO, homepage, and llms surfaces.
Scope: requested positioning and content-boundary outcome.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
- old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-18T19:37:43.515Z — VERIFY — ok

By: TESTER

Note: All declared checks pass after reducing the reproducible VHS demo canvas; public positioning, private-content boundary, production website build, policy routing, and release demo are verified.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:139e758b0ed8e2d2a3d25665d60a6c1fdc96070466e4c6a16ffe417f68169c78

Details:

Check: affected_unit_integration
Command: bun run lint:website
Result: pass
Evidence: ESLint exited 0 on the reworked task branch.
Scope: touched website implementation.

Check: critical_paths
Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
Scope: public README and repository policy gateway.

Check: full_regression
Command: bun run release:demo:check
Result: pass
Evidence: the check performed a fresh VHS render at 700x394; resulting GIF is 2,682,529 bytes under the 3,000,000-byte limit.
Scope: declared release demo gate.

Check: hosted_integration
Command: agentplane pr open 202608181819-Z3GWTA --author CODER
Result: pass
Evidence: GitHub PR 4845 exists and is linked in task metadata; reworked head publication remains owned by the next Agentplane route.
Scope: task branch and hosted PR linkage.

Check: real_e2e
Command: bun run docs:site:check
Result: pass
Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
Scope: public documentation and website build.

Check: task_outcome
Command: inspect public diff and published private marketing source of truth
Result: pass
Evidence: public Launch Kit files and derived cards are removed; marketing submodule points to published private commit d590b93; canonical control-plane copy is present across README, docs, SEO, homepage, and llms surfaces.
Scope: requested positioning and content-boundary outcome.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
- old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

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

### 2026-08-18T19:39:18.309Z — VERIFY — ok

By: TESTER

Note: All declared checks pass on implementation commit 60c6cda2f; this record rebinds the already-observed evidence after the verified VHS output was committed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:92a97dcecbcd40c02b4d9680c39494cfbbe6f365588f6e103740ee7d83b26102

Details:

Check: affected_unit_integration
Command: bun run lint:website
Result: pass
Evidence: ESLint exited 0 on the reworked task branch.
Scope: touched website implementation.

Check: critical_paths
Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
Scope: public README and repository policy gateway.

Check: full_regression
Command: bun run release:demo:check
Result: pass
Evidence: a fresh VHS render at 700x394 completed and stayed below the 3,000,000-byte limit; the verified output is committed in 60c6cda2f.
Scope: declared release demo gate.

Check: hosted_integration
Command: agentplane pr open 202608181819-Z3GWTA --author CODER
Result: pass
Evidence: GitHub PR 4845 exists and is linked in task metadata; current head publication remains owned by the next Agentplane route.
Scope: task branch and hosted PR linkage.

Check: real_e2e
Command: bun run docs:site:check
Result: pass
Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
Scope: public documentation and website build.

Check: task_outcome
Command: inspect public diff and published private marketing source of truth
Result: pass
Evidence: public Launch Kit files and derived cards are removed; marketing submodule points to published private commit d590b93; canonical control-plane copy is present across README, docs, SEO, homepage, and llms surfaces.
Scope: requested positioning and content-boundary outcome.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
- old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-18T19:46:33.941Z — VERIFY — ok

By: TESTER

Note: All declared checks pass on implementation commit 9a01a6dd4; current public context, docs, and website contain no launch-document metadata outside excluded historical provenance.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:b3f9887ceac28072ad83c9f29a1f1e71de10670634b2bac794d8a79849ca632b

Details:

Check: affected_unit_integration
Command: bun run lint:website
Result: pass
Evidence: ESLint exited 0 on the cleaned task branch.
Scope: touched website implementation.

Check: critical_paths
Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
Scope: public README and repository policy gateway.

Check: full_regression
Command: bun run release:demo:check
Result: pass
Evidence: a fresh VHS render at 700x394 completed below the 3,000,000-byte limit; the committed verified GIF was restored byte-for-byte after the nondeterministic render.
Scope: declared release demo gate.

Check: hosted_integration
Command: agentplane pr open 202608181819-Z3GWTA --author CODER
Result: pass
Evidence: GitHub PR 4845 exists and is linked in task metadata; cleaned head publication remains owned by the next Agentplane route.
Scope: task branch and hosted PR linkage.

Check: real_e2e
Command: bun run docs:site:check
Result: pass
Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus production build, navigation check, and design-language check passed.
Scope: public documentation and website build.

Check: task_outcome
Command: rg for launch paths and titles in current public context, docs, and website
Result: pass
Evidence: no matches remain outside deliberately excluded historical release provenance and task records; stale disposable release-docs assimilation reports were removed.
Scope: requested current-tree private-content boundary and positioning outcome.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
- old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-18T19:59:51.783Z — VERIFY — ok

By: TESTER

Note: All declared checks pass on implementation commit cbd9d5b3c; launch-copy bodies are absent from the current tree and suppressed from deletion diffs.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:ed0a9e426313098216820ef43728b2ca3f84999fdb340bbe57cbdc52eb52d11e

Details:

Check: affected_unit_integration
Command: bun run lint:website
Result: pass
Evidence: ESLint exited 0 on the current implementation.
Scope: touched website implementation.

Check: critical_paths
Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
Scope: public README, attributes, and repository policy gateway.

Check: full_regression
Command: bun run release:demo:check
Result: pass
Evidence: a fresh VHS render completed below the 3,000,000-byte limit; committed GIF bytes were restored after the nondeterministic render.
Scope: declared release demo gate.

Check: hosted_integration
Command: agentplane pr open 202608181819-Z3GWTA --author CODER
Result: pass
Evidence: GitHub PR 4845 exists and is linked in task metadata; publication of the current clean head remains a subsequent lifecycle action.
Scope: task branch and hosted PR linkage.

Check: real_e2e
Command: bun run docs:site:check
Result: pass
Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus build, navigation check, and design-language check passed.
Scope: public documentation and website build.

Check: task_outcome
Command: privacy phrase scan plus git diff check for docs/launch/**
Result: pass
Evidence: unique internal draft phrases have no current-tree matches; deleted launch files render as Binary files differ because docs/launch/** has diff unset.
Scope: requested current-tree private-content boundary and PR diff exposure.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
- old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-18T20:03:12.286Z — VERIFY — ok

By: TESTER

Note: All declared checks pass on implementation commit a74975786; launch source and derived context are absent from the current tree and suppressed from deletion diffs.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c4bfb185b00811689c594c0c0a308f4fd8d2ab7cf6bb5d9010ed04f7ad3836f0, input_digest=sha256:4caf666c0c8a28729af156e5ecc46baa0d87ca66d6dc19334ea22156d0ae4820

Details:

Check: affected_unit_integration
Command: bun run lint:website
Result: pass
Evidence: ESLint exited 0 on the implementation immediately before the attributes-only privacy hardening commit.
Scope: touched website implementation; the later commit changes only Git diff attributes and task evidence.

Check: critical_paths
Command: bun run docs:readme-header:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: README header artifacts are fresh for v0.7.6 and policy routing is OK.
Scope: public README and repository policy gateway.

Check: full_regression
Command: bun run release:demo:check
Result: pass
Evidence: a fresh VHS render completed below the 3,000,000-byte limit; committed GIF bytes were restored after the nondeterministic render.
Scope: declared release demo gate.

Check: hosted_integration
Command: agentplane pr open 202608181819-Z3GWTA --author CODER
Result: pass
Evidence: GitHub PR 4845 exists and is linked in task metadata; current head publication remains a subsequent lifecycle action.
Scope: task branch and hosted PR linkage.

Check: real_e2e
Command: bun run docs:site:check
Result: pass
Evidence: docs IA, generated artifacts, website typecheck, social-card check, optimized Docusaurus build, navigation check, and design-language check passed.
Scope: public documentation and website build.

Check: task_outcome
Command: privacy phrase scan plus git diff review for docs/launch/**, context/wiki/release-docs/**, and .agentplane/context/derived/reports/release-docs-*
Result: pass
Evidence: unique internal draft phrases have no current-tree matches, and deleted launch source and derived context render only as Binary files differ.
Scope: requested current-tree private-content boundary and hosted PR diff exposure.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608181819-Z3GWTA-reposition-agentplane-as-the-git-native-control/.agentplane/tasks/202608181819-Z3GWTA/blueprint/resolved-snapshot.json
- old_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- current_digest: 55f73b356fcc4b7eae5edc4e504c1414684e0f34f5b84b7d780f58277aec1fae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608181819-Z3GWTA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608181819-Z3GWTA
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

Observation: the approved branch_pr worktree cannot start because local main is 34 commits ahead of and 119 commits behind origin/main. AgentPlane refuses to branch from a stale base. Impact: public README, docs, website content, stale proof counters, launch-file deletion, and marketing submodule pointer update remain unmodified. Resolution: preserve all local commits and active worktrees; reconcile the base through an explicit operator-selected merge/rebase/recovery lane, then resume this task and rerun work start. Fixability: external.
