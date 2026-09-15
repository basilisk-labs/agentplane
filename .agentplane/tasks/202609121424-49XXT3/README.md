---
id: "202609121424-49XXT3"
title: "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 66
origin:
  system: "manual"
depends_on:
  - "202609121424-4BC7B3"
tags:
  - "release-0.7.9"
  - "publish"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "credentials"
  - "publish"
  - "merge"
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bun run release:check"
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T22:14:20.074Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:f356ae8497c1d56eb9988de28911a4c026c457637f6e4f6c31a607f52ca603aa"
verification:
  state: "pending"
  updated_at: "2026-09-15T00:52:20.908Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
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
      - ".agentplane/.release"
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - ".agentplane/tasks/202609121424-49XXT3"
      - "docs/assets"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence"
      - "docs/releases/v0.7.9.md"
      - "package.json"
      - "packages/agentplane"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts/baselines"
      - "website/static/img/social"
  declaration:
    external_effects:
      - "credentials"
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Public distribution requires authenticated external writes and independent readback."
      - "Release preparation changes canonical versions, generated surfaces, notes, baselines, and task evidence."
      - "The candidate must pass local and hosted qualification before exact-SHA publication."
      - "The existing candidate must be replayed onto the exact qualified main commit."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts,packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts,packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository_effects=tests"
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository_effects=tests"
    repository_effects:
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/.release"
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - ".agentplane/tasks/202609121424-49XXT3"
      - "docs/assets"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence"
      - "docs/releases/v0.7.9.md"
      - "package.json"
      - "packages/agentplane"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts/baselines"
      - "website/static/img/social"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
    changed_paths:
      - "docs/releases/v0.7.9-evidence/candidate-base-synchronization.json"
    external_effects: []
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/.release"
          - ".agentplane/WORKFLOW.md"
          - ".agentplane/config.json"
          - ".agentplane/tasks/202609121424-49XXT3"
          - "docs/assets"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.9-evidence"
          - "docs/releases/v0.7.9.md"
          - "package.json"
          - "packages/agentplane"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "scripts/baselines"
          - "website/static/img/social"
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
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "credentials"
          - "external_write"
          - "network_read"
          - "publish"
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
          reversibility: "recovery_required"
      digest: "sha256:42ac9703cb5041c37f268d5cbd75b003ae971c29f317aa63661ec29c8ae736fd"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
        changed_files:
          - "docs/releases/v0.7.9-evidence/candidate-base-synchronization.json"
        external_effects: []
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
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
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version bump requires two release metadata files outside the issued writable roots. Recommended action: Approve the exact scope extension, request a fresh packet, and rerun the canonical version bump without excluding release surfaces. Requested scope: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923. Agentplane receipt: external-agent-blocker/tr_c6fd4ad79889a8a1540b287109085a52/sha256:b8cffe516cf04d094fc3f81064acd6d65e5e21afcb7e8823df89b26d72b398d2/sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/WORKFLOW.md, .agentplane/config.json; repository effects: release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The release range must be frozen by the operator-owned release plan before stable version mutation. Recommended action: Return control to the operator, run `agentplane release plan --patch`, then request a fresh semantic packet for candidate preparation. Agentplane receipt: external-agent-blocker/tr_070ee5381abe878f776b35e133be89c7/sha256:6c3de6fc00f1da0c6ab6ab13c60ccd481eec169b064796457d692775f3879ea1."
  -
    author: "CODER"
    body: "Start: Resume stable 0.7.9 candidate preparation after the operator-owned release plan was generated at .agentplane/.release/plan/2026-09-13T23-07-41-521Z."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The complete release check requires generated social assets for the new release documentation. Recommended action: Approve the exact generated asset roots, run `bun run docs:social:generate`, and rerun the complete release check. Requested scope: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository effects=documentation,release_metadata,repository_write; request digest=sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5. Agentplane receipt: external-agent-blocker/tr_9031fb2bd52327684141227d8dfc6ff7/sha256:0236d1160fbd9234951721268e8e8a51ed494cd0fbcda7c470c81c502bef612e/sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png, website/static/img/social/docs/releases/v0.7.9.png, website/static/img/social/manifest.json; repository effects: documentation, release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical social-image generator updates the complete generated social asset tree, not only the two new 0.7.9 images. Recommended action: Approve the generated social root, request a fresh packet, recreate the stable candidate, run `bun run docs:social:generate`, and rerun the complete release checks. Requested scope: roots=website/static/img/social; repository effects=documentation,release_metadata,repository_write; request digest=sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256. Agentplane receipt: external-agent-blocker/tr_a9b5612b125816493e821ae0bf34f942/sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971/sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: website/static/img/social; repository effects: documentation, release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1e0f3ea01052. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. AgentPlane classified the canonical stable version promotion as three repository effects that are absent from the current execution contract. Recommended action: Approve the exact repository-effect extension and request a fresh packet without adding paths or external effects. Requested scope: roots=unchanged; repository effects=dependencies,public_api,source_code; request digest=sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1. Agentplane receipt: external-agent-blocker/tr_eb6f91d3374408b2b64c68bbfbd20f24/sha256:e534773c2819abeeaa85e5655030dfdafc4556e24dcedd39e569052f44fe9fd9/sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: ; repository effects: dependencies, public_api, source_code."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal committed-candidate gate found a pre-existing task-state integrity failure in the qualified base. Recommended action: Create a separate AgentPlane task from current main, determine the intended immutable-evidence invariant, implement the narrow repair with regression coverage, integrate it through hosted CI, then refresh the 0.7.9 candidate base and rerun the complete prepublish gate. Agentplane receipt: external-agent-blocker/tr_8968ad611cc27642bbd26da3ecd9c844/sha256:f861a7b5a3eb8f61932568d387fe7054e33998181d8e091a03580b049c164b15."
  -
    author: "CODER"
    body: "Resume: PR #5950 merged task-state validation repair at origin/main 9792878934b2c4d068e98056cef3c2c691451a90 | details: continue the approved 0.7.9 release qualification."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Candidate-base synchronization requires a supervisor-owned Git lifecycle operation that this semantic executor is explicitly forbidden to perform. Recommended action: Run or emit the repository-owned candidate branch synchronization operation, record its receipt, and then issue a fresh semantic packet for prepare_candidate. Do not ask an external executor to rebase, cherry-pick, commit, or rewrite Git history. Agentplane receipt: external-agent-blocker/tr_64c6b4be9fa98a3b6e4c3b6312fed325/sha256:f5db69947a8573cb0f586066c4d5aebf308084d76935d1ea398de829dcbdd98d."
  -
    author: "ORCHESTRATOR"
    body: "Resume after the release-base blocker was resolved. | details: PR #5952 merged as origin/main 1a93a9a43da2b714854174491f9672c52bf33e9f, and Core CI run 34825881983 completed successfully for that exact SHA.; The approved plan must be refined before synchronization because its existing base 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 is obsolete and its ready WorkItem lacks the exact branch-base claim required by current main."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: dea7d66178a0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The required prepublish gate is blocked by two reproducible qualified-main test regressions outside the release-only mutation contract. Recommended action: Create a separate AgentPlane stabilization task from current qualified main. Repair durable unavailable usage observation for managed custom runners and restore branch_pr finish guard ordering with focused regression coverage. Integrate the repair through hosted CI. Then resynchronize this candidate to the new exact main SHA, refresh the release metadata and baselines, and rerun release:prepublish. Agentplane receipt: external-agent-blocker/tr_f4266b50a2fbe3b9a127ac441fc6f6d7/sha256:a1e70f328dad6407aa986dc52155cf974445434e47575a5e968f2f1c2f285b04."
  -
    author: "CODER"
    body: "Start: release blockers are integrated and hosted-verified on main; resume the approved 0.7.9 release plan against the new qualified base."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 529d2a93fa06. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal 0.7.9 prepublish gate exposed incomplete task-centric WorkItem setup in two route-decision test fixtures. Recommended action: Refine the plan to add only the two failing test files, call the existing completeRouteWorkItem helper at the fixture transition from implementation to downstream routing, then rerun the focused tests and the complete release:prepublish gate. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts,packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository effects=tests; request digest=sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52. Agentplane receipt: external-agent-blocker/tr_857ee7e8f7e814424cbc07834bcbd4d7/sha256:46654593bbb94946faad1c1bd03c33657db32c344c4c07a2bc04a52088110c14/sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts, packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route-decision chunk passed, but the next release chunk exposed two additional deterministic test-fixture compatibility gaps. Recommended action: Extend the approved test-only scope to the verification and evidence-rework files, preserve the first fixture repair, align the four deterministic expectations with existing lifecycle helpers and explicit exact-key replacement, then rerun focused tests and release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts,packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository effects=tests; request digest=sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66. Agentplane receipt: external-agent-blocker/tr_b401592dda9fd81dde93d4eda3fb42a3/sha256:0ac0e0e7bed730e3439ff5831521098bd50e1489d5e5869c8c77fedb914260dc/sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts, packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route and recovery chunks passed, but the next release chunk exposed one stale prompt-contract assertion. Recommended action: Extend the test-only scope to run-cli.core.task-create-base-intent.test.ts, replace the obsolete result.task_intent literal with the current task_intent contract, preserve all prior fixture repairs, and rerun the focused test plus release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository effects=tests; request digest=sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15. Agentplane receipt: external-agent-blocker/tr_396ecaf9ea7c4304e9f987dd03c49a2d/sha256:397a13112f8b151deda66b600275df2b1fecef21a83b595e6eeeb5bf3b319906/sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository effects: tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired release chunks passed, but chunk 54 exposed one additional deterministic task-run fixture drift. Recommended action: Extend the approved test-only scope to run-cli.core.task-run.test.ts, replace the removed phrase assertion with an exact current bootstrap invariant, run the focused test and lint checks, then rerun release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository effects=tests; request digest=sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02. Agentplane receipt: external-agent-blocker/tr_a7cb32fcf9ae3a742aace6ff193e3328/sha256:798d239f4827d7b42f71f7d280b140ece9383c52e974b183d8e02d227bad0657/sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository effects: tests."
events:
  -
    type: "status"
    at: "2026-09-13T22:57:11.849Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T23:03:44.698Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version bump requires two release metadata files outside the issued writable roots. Recommended action: Approve the exact scope extension, request a fresh packet, and rerun the canonical version bump without excluding release surfaces. Requested scope: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923. Agentplane receipt: external-agent-blocker/tr_c6fd4ad79889a8a1540b287109085a52/sha256:b8cffe516cf04d094fc3f81064acd6d65e5e21afcb7e8823df89b26d72b398d2/sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923."
  -
    type: "status"
    at: "2026-09-13T23:07:23.950Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The release range must be frozen by the operator-owned release plan before stable version mutation. Recommended action: Return control to the operator, run `agentplane release plan --patch`, then request a fresh semantic packet for candidate preparation. Agentplane receipt: external-agent-blocker/tr_070ee5381abe878f776b35e133be89c7/sha256:6c3de6fc00f1da0c6ab6ab13c60ccd481eec169b064796457d692775f3879ea1."
  -
    type: "status"
    at: "2026-09-13T23:08:20.260Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: Resume stable 0.7.9 candidate preparation after the operator-owned release plan was generated at .agentplane/.release/plan/2026-09-13T23-07-41-521Z."
  -
    type: "status"
    at: "2026-09-13T23:13:10.761Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The complete release check requires generated social assets for the new release documentation. Recommended action: Approve the exact generated asset roots, run `bun run docs:social:generate`, and rerun the complete release check. Requested scope: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository effects=documentation,release_metadata,repository_write; request digest=sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5. Agentplane receipt: external-agent-blocker/tr_9031fb2bd52327684141227d8dfc6ff7/sha256:0236d1160fbd9234951721268e8e8a51ed494cd0fbcda7c470c81c502bef612e/sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5."
  -
    type: "status"
    at: "2026-09-13T23:17:35.778Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical social-image generator updates the complete generated social asset tree, not only the two new 0.7.9 images. Recommended action: Approve the generated social root, request a fresh packet, recreate the stable candidate, run `bun run docs:social:generate`, and rerun the complete release checks. Requested scope: roots=website/static/img/social; repository effects=documentation,release_metadata,repository_write; request digest=sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256. Agentplane receipt: external-agent-blocker/tr_a9b5612b125816493e821ae0bf34f942/sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971/sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256."
  -
    type: "status"
    at: "2026-09-13T23:20:21.839Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1e0f3ea01052. CLI accepted one state-bound external-agent semantic result."
    commit: "1e0f3ea01052bd2226fe1fd31079eecafac8f116"
  -
    type: "status"
    at: "2026-09-13T23:21:41.489Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. AgentPlane classified the canonical stable version promotion as three repository effects that are absent from the current execution contract. Recommended action: Approve the exact repository-effect extension and request a fresh packet without adding paths or external effects. Requested scope: roots=unchanged; repository effects=dependencies,public_api,source_code; request digest=sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1. Agentplane receipt: external-agent-blocker/tr_eb6f91d3374408b2b64c68bbfbd20f24/sha256:e534773c2819abeeaa85e5655030dfdafc4556e24dcedd39e569052f44fe9fd9/sha256:9cd12c42f9888f81dff79b953cff3526dad52b5cb8593d53b1ef8913469053d1."
  -
    type: "status"
    at: "2026-09-13T23:30:11.418Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal committed-candidate gate found a pre-existing task-state integrity failure in the qualified base. Recommended action: Create a separate AgentPlane task from current main, determine the intended immutable-evidence invariant, implement the narrow repair with regression coverage, integrate it through hosted CI, then refresh the 0.7.9 candidate base and rerun the complete prepublish gate. Agentplane receipt: external-agent-blocker/tr_8968ad611cc27642bbd26da3ecd9c844/sha256:f861a7b5a3eb8f61932568d387fe7054e33998181d8e091a03580b049c164b15."
  -
    type: "status"
    at: "2026-09-14T00:31:46.313Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: PR #5950 merged task-state validation repair at origin/main 9792878934b2c4d068e98056cef3c2c691451a90 | details: continue the approved 0.7.9 release qualification."
  -
    type: "status"
    at: "2026-09-14T02:08:41.270Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Candidate-base synchronization requires a supervisor-owned Git lifecycle operation that this semantic executor is explicitly forbidden to perform. Recommended action: Run or emit the repository-owned candidate branch synchronization operation, record its receipt, and then issue a fresh semantic packet for prepare_candidate. Do not ask an external executor to rebase, cherry-pick, commit, or rewrite Git history. Agentplane receipt: external-agent-blocker/tr_64c6b4be9fa98a3b6e4c3b6312fed325/sha256:f5db69947a8573cb0f586066c4d5aebf308084d76935d1ea398de829dcbdd98d."
  -
    type: "status"
    at: "2026-09-14T09:13:07.280Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after the release-base blocker was resolved. | details: PR #5952 merged as origin/main 1a93a9a43da2b714854174491f9672c52bf33e9f, and Core CI run 34825881983 completed successfully for that exact SHA.; The approved plan must be refined before synchronization because its existing base 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 is obsolete and its ready WorkItem lacks the exact branch-base claim required by current main."
  -
    type: "status"
    at: "2026-09-14T14:12:43.781Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: dea7d66178a0. CLI accepted one state-bound external-agent semantic result."
    commit: "dea7d66178a082498a8f40f9e892c656fe59bad5"
  -
    type: "status"
    at: "2026-09-14T14:39:25.433Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The required prepublish gate is blocked by two reproducible qualified-main test regressions outside the release-only mutation contract. Recommended action: Create a separate AgentPlane stabilization task from current qualified main. Repair durable unavailable usage observation for managed custom runners and restore branch_pr finish guard ordering with focused regression coverage. Integrate the repair through hosted CI. Then resynchronize this candidate to the new exact main SHA, refresh the release metadata and baselines, and rerun release:prepublish. Agentplane receipt: external-agent-blocker/tr_f4266b50a2fbe3b9a127ac441fc6f6d7/sha256:a1e70f328dad6407aa986dc52155cf974445434e47575a5e968f2f1c2f285b04."
  -
    type: "status"
    at: "2026-09-14T16:26:34.900Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: release blockers are integrated and hosted-verified on main; resume the approved 0.7.9 release plan against the new qualified base."
  -
    type: "status"
    at: "2026-09-14T22:15:48.057Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 529d2a93fa06. CLI accepted one state-bound external-agent semantic result."
    commit: "529d2a93fa0636f31830be894a727866e788e23a"
  -
    type: "status"
    at: "2026-09-14T22:52:06.599Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The formal 0.7.9 prepublish gate exposed incomplete task-centric WorkItem setup in two route-decision test fixtures. Recommended action: Refine the plan to add only the two failing test files, call the existing completeRouteWorkItem helper at the fixture transition from implementation to downstream routing, then rerun the focused tests and the complete release:prepublish gate. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts,packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts; repository effects=tests; request digest=sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52. Agentplane receipt: external-agent-blocker/tr_857ee7e8f7e814424cbc07834bcbd4d7/sha256:46654593bbb94946faad1c1bd03c33657db32c344c4c07a2bc04a52088110c14/sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52."
  -
    type: "status"
    at: "2026-09-14T23:29:25.923Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route-decision chunk passed, but the next release chunk exposed two additional deterministic test-fixture compatibility gaps. Recommended action: Extend the approved test-only scope to the verification and evidence-rework files, preserve the first fixture repair, align the four deterministic expectations with existing lifecycle helpers and explicit exact-key replacement, then rerun focused tests and release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts,packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts; repository effects=tests; request digest=sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66. Agentplane receipt: external-agent-blocker/tr_b401592dda9fd81dde93d4eda3fb42a3/sha256:0ac0e0e7bed730e3439ff5831521098bd50e1489d5e5869c8c77fedb914260dc/sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66."
  -
    type: "status"
    at: "2026-09-15T00:06:32.254Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired route and recovery chunks passed, but the next release chunk exposed one stale prompt-contract assertion. Recommended action: Extend the test-only scope to run-cli.core.task-create-base-intent.test.ts, replace the obsolete result.task_intent literal with the current task_intent contract, preserve all prior fixture repairs, and rerun the focused test plus release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts; repository effects=tests; request digest=sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15. Agentplane receipt: external-agent-blocker/tr_396ecaf9ea7c4304e9f987dd03c49a2d/sha256:397a13112f8b151deda66b600275df2b1fecef21a83b595e6eeeb5bf3b319906/sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15."
  -
    type: "status"
    at: "2026-09-15T00:51:41.248Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The repaired release chunks passed, but chunk 54 exposed one additional deterministic task-run fixture drift. Recommended action: Extend the approved test-only scope to run-cli.core.task-run.test.ts, replace the removed phrase assertion with an exact current bootstrap invariant, run the focused test and lint checks, then rerun release:prepublish. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-run.test.ts; repository effects=tests; request digest=sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02. Agentplane receipt: external-agent-blocker/tr_a7cb32fcf9ae3a742aace6ff193e3328/sha256:798d239f4827d7b42f71f7d280b140ece9383c52e974b183d8e02d227bad0657/sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02."
doc_version: 3
doc_updated_at: "2026-09-15T00:51:41.248Z"
doc_updated_by: "SUPERVISOR"
description: "Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9."
sections:
  Summary: |-
    Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

    Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
  Scope: |-
    - In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
    - Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".
  Plan: "The release plan now rebinds candidate synchronization to qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 and preserves the remaining 0.7.9 release graph."
  Verify Steps: |-
    1. Run `bun run release:check`. Expected: version parity, generated release surfaces, package manifests, and release policy checks pass for 0.7.9.
    2. Run `bun run release:prepublish`. Expected: the complete prepublish gate passes for the exact release candidate without skipped mandatory checks.
    3. Review `git diff --check`, the exact task diff, and `git status --short --untracked-files=all`. Expected: only approved release metadata, documentation, package version surfaces, baseline evidence, and AgentPlane task artifacts changed; `agentplane-roadmap-r2` and unrelated user work are not committed.
    4. Complete AgentPlane verification and hosted branch protection for the release-ready candidate. Expected: the accepted release commit is integrated into `main`, hosted checks are successful, and `origin/main` resolves to the exact qualified publish SHA.
    5. Publish v0.7.9 only through the AgentPlane release route after an exact fresh publish-authority grant. Expected: `.agentplane/.release/publish/publish-result.json` records `success=true`, an empty `failures` array, version 0.7.9, and the exact qualified main SHA.
    6. Independently read back the GitHub v0.7.9 tag and release. Expected: the tag resolves to the qualified publish SHA and every required release asset and checksum is present.
    7. Independently read back all npm package versions and install the published packages in clean temporary directories. Expected: every public AgentPlane package reports 0.7.9 and both `agentplane` and `ap` entrypoints execute successfully.
    8. Independently verify `setup-agentplane`, Homebrew, and Scoop distribution surfaces and perform their documented clean install smoke checks when the release route provides them. Expected: every required surface resolves to 0.7.9 and its expected checksum; any unavailable anonymous GHCR read is recorded separately without being misreported as success.
    9. Re-fetch the default branch and provider state after publication. Expected: `origin/main`, the canonical release evidence, the tag, registries, and distribution surfaces agree on the same released SHA and version.
    10. Complete the required post-publish evidence follow-up and start the next patch beta only through fresh AgentPlane-managed tasks and authority packets. Expected: no lifecycle or external action is inferred from prose, and any genuine provider or evidence boundary is reported explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.scope_extension_request:
    applied_at: "2026-09-15T00:52:20.908Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:798d239f4827d7b42f71f7d280b140ece9383c52e974b183d8e02d227bad0657"
    kind: "task_scope_extension_request"
    request:
      rationale: "The next isolated release chunk exposed one stale assertion after every earlier repaired chunk passed."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
    request_digest: "sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02"
    schema_version: 1
    status: "applied"
    transition_id: "tr_a7cb32fcf9ae3a742aace6ff193e3328"
    work_item_id: "prepare_candidate"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-15T00:52:20.908Z"
        approved_by: "USER"
        approved_digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
        policy_facts:
          - "state_bound_scope_extension:sha256:c8aa236bae0bb5a29b3113e7326991067d055b5c83224f956561a2629df5dd02"
        state: "approved"
      created_at: "2026-09-15T00:52:20.908Z"
      digest: "sha256:f7ec9106b4c0a4c6f70ee80620bfaa6dcf62ab30a0ace1de39ad163c10ce7702"
      proposal:
        assumptions:
          - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
          - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
          - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
          - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
        planning_baseline:
          captured_at: "2026-09-14T16:28:06.040Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
          dirty_paths:
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:49"
        schema_version: 1
        task_id: "202609121424-49XXT3"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "candidate_base_identity"
              kind: "structural"
              required: true
            -
              capability: "task.verify"
              command: "bun run release:check"
              id: "release_check"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "release_prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              id: "scope_hygiene"
              kind: "structural"
              required: true
            -
              capability: "task.verify"
              id: "hosted_integration"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "publish_manifest"
              kind: "structural"
              required: true
            -
              capability: "task.verify"
              id: "github_release"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "registry_readback"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "installer_readback"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "default_branch_readback"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "candidate_base_identity"
                - "scope_hygiene"
              description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
              id: "candidate_base_exact"
              required: true
            -
              check_ids:
                - "release_check"
                - "release_prepublish"
                - "scope_hygiene"
              description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
              id: "candidate_exact"
              required: true
            -
              check_ids:
                - "release_check"
                - "release_prepublish"
                - "hosted_integration"
              description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
              id: "candidate_qualified"
              required: true
            -
              check_ids:
                - "publish_manifest"
                - "github_release"
              description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
              id: "publication_exact"
              required: true
            -
              check_ids:
                - "registry_readback"
                - "installer_readback"
                - "default_branch_readback"
              description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
              id: "distribution_verified"
              required: true
            -
              check_ids:
                - "scope_hygiene"
                - "default_branch_readback"
              description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
              id: "post_publish_complete"
              required: true
          evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "candidate_base_identity"
                    - "scope_hygiene"
                  description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                  id: "candidate_base_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "PR #5956 provider state"
                  - "the successful hosted checks for PR #5956"
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "qualified main"
                  - "release candidate base"
                  - "branch-base"
                  - "history preservation"
              depends_on: []
              expected_outputs:
                - "supervisor_owned_candidate_synchronization_receipt"
                - "qualified_release_base_sha"
              id: "synchronize_candidate_base"
              objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "exclusive"
                  mode: "exclusive"
                  resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-worktree"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - ".agentplane/config.json"
                - ".agentplane/tasks/202609121424-49XXT3"
                - "docs/assets"
                - "docs/reference/generated-reference.mdx"
                - "docs/releases/v0.7.9-evidence"
                - "docs/releases/v0.7.9.md"
                - "package.json"
                - "packages"
                - "scripts/baselines"
                - "website/static/img/social"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "candidate_base_identity"
                    kind: "structural"
                    required: true
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release_check"
                    - "release_prepublish"
                    - "scope_hygiene"
                  description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                  id: "candidate_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "docs/releases/v0.7.8-evidence"
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  - "docs/releases/v0.7.8.md"
                symbol_hints:
                  - "version parity"
                  - "release notes"
                  - "compatibility baseline"
                  - "clone baseline"
              depends_on:
                - "synchronize_candidate_base"
              expected_outputs:
                - "stable_candidate_diff"
                - "release_notes_and_evidence"
                - "exact_candidate_sha"
              id: "prepare_candidate"
              objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
              optional: false
              priority: 2
              required_inputs:
                - "qualified_release_base_sha"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - ".agentplane/config.json"
                - ".agentplane/tasks/202609121424-49XXT3"
                - "docs/assets"
                - "docs/reference/generated-reference.mdx"
                - "docs/releases/v0.7.9-evidence"
                - "docs/releases/v0.7.9.md"
                - "package.json"
                - "packages"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
                - "scripts/baselines"
                - "website/static/img/social"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:check"
                    id: "release_check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release_prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release_check"
                    - "release_prepublish"
                    - "hosted_integration"
                  description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                  id: "candidate_qualified"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources: []
                required_sources:
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "verification"
                  - "hosted integration"
              depends_on:
                - "prepare_candidate"
              expected_outputs:
                - "independent_evaluator_verdict"
                - "green_hosted_candidate_checks"
                - "qualified_main_sha"
              id: "qualify_integrate"
              objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
              optional: false
              priority: 3
              required_inputs:
                - "exact_candidate_sha"
                - "release_notes_and_evidence"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "integration-lane"
              risk: "high"
              scope_roots:
                - ".agentplane/tasks/202609121424-49XXT3"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:check"
                    id: "release_check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release_prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    id: "hosted_integration"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "publish_manifest"
                    - "github_release"
                  description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                  id: "publication_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources: []
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "publish-result.json"
                  - "release-ready"
              depends_on:
                - "qualify_integrate"
              expected_outputs:
                - "v0_7_9_github_release"
                - "published_npm_packages"
                - "exact_sha_publish_result"
              id: "publish_stable"
              objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
              optional: false
              priority: 4
              required_inputs:
                - "qualified_main_sha"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "release-v0.7.9"
              risk: "high"
              scope_roots:
                - ".agentplane/.release"
                - ".agentplane/tasks/202609121424-49XXT3"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "publish_manifest"
                    kind: "structural"
                    required: true
                  -
                    capability: "task.verify"
                    id: "github_release"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "registry_readback"
                    - "installer_readback"
                    - "default_branch_readback"
                  description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                  id: "distribution_verified"
                  required: true
                -
                  check_ids:
                    - "scope_hygiene"
                    - "default_branch_readback"
                  description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                  id: "post_publish_complete"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources:
                  - "public GHCR metadata"
                required_sources:
                  - ".agentplane/.release/publish/publish-result.json"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "agentplane"
                  - "ap"
                  - "Homebrew"
                  - "Scoop"
                  - "setup-agentplane"
              depends_on:
                - "publish_stable"
              expected_outputs:
                - "independent_distribution_readback"
                - "verified_cli_entrypoints"
                - "final_main_and_next_beta_evidence"
                - "residual_limitations"
              id: "verify_distribution"
              objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
              optional: false
              priority: 5
              required_inputs:
                - "exact_sha_publish_result"
                - "v0_7_9_github_release"
                - "published_npm_packages"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "read"
                  resource: "release-readback-v0.7.9"
              risk: "high"
              scope_roots:
                - ".agentplane/.release"
                - ".agentplane/tasks/202609121424-49XXT3"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "registry_readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "installer_readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "default_branch_readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                schema_version: 1
      revision: 14
      schema_version: 1
      task_id: "202609121424-49XXT3"
    event_cursor: 50
    final_validation: null
    id: "202609121424-49XXT3"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run release:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T14:24:56.231Z"
      constraints: []
      request: |-
        Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

        Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
      task_id: "202609121424-49XXT3"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-13T22:53:42.760Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-13T03:09:14.798Z"
        digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - "package.json"
                  - "packages"
                  - "docs/releases/v0.7.9.md"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/assets"
                  - "scripts/baselines"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:03:50.512Z"
          approved_by: "USER"
          approved_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          policy_facts:
            - "state_bound_scope_extension:sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923"
          state: "approved"
        created_at: "2026-09-13T23:03:50.512Z"
        digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:13:16.889Z"
          approved_by: "USER"
          approved_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          policy_facts:
            - "state_bound_scope_extension:sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5"
          state: "approved"
        created_at: "2026-09-13T23:13:16.889Z"
        digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  - "website/static/img/social/docs/releases/v0.7.9.png"
                  - "website/static/img/social/manifest.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:17:41.802Z"
          approved_by: "USER"
          approved_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          policy_facts:
            - "state_bound_scope_extension:sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256"
          state: "approved"
        created_at: "2026-09-13T23:17:41.802Z"
        digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                  - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  - "website/static/img/social/docs/releases/v0.7.9.png"
                  - "website/static/img/social/manifest.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 4
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T00:38:42.841Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T00:37:24.811Z"
        digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        proposal:
          assumptions:
            - "Qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 is the required release base because it contains the merged task-state validation repair and its hosted closure evidence."
            - "The existing release branch contains the previously prepared stable 0.7.9 candidate and must preserve those changes during synchronization."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-14T00:34:11.350Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "e567297b0f86d69bfb9a939764ed4aef90fcc1d3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:26"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing release candidate is synchronized onto qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 without losing prepared release changes or importing unrelated work."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change beyond generated or version-parity release surfaces."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing release candidate is synchronized onto qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 without losing prepared release changes or importing unrelated work."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "PR #5950 provider state"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch synchronization"
                depends_on: []
                expected_outputs:
                  - "synchronized_candidate_branch"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Synchronize the existing stable candidate branch onto exact qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 through the repository-owned recovery path while preserving all prepared candidate changes and unrelated user work."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing release candidate is synchronized onto qualified main commit 9792878934b2c4d068e98056cef3c2c691451a90 without losing prepared release changes or importing unrelated work."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change beyond generated or version-parity release surfaces."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze 9792878934b2c4d068e98056cef3c2c691451a90 as the release base and finalize stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without unrelated semantic source changes."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change beyond generated or version-parity release surfaces."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:4cc4070687bcfe5bfb52a882f38fd6ace12e6d3504ce1815aa8b64502439dd6b"
                  schema_version: 1
        revision: 5
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T00:43:06.119Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T00:42:42.447Z"
        digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
        proposal:
          assumptions:
            - "Qualified main 9792878934b2c4d068e98056cef3c2c691451a90 is the required release base."
            - "The existing release branch contains the prepared stable candidate and must preserve it during replay."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T00:40:55.620Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "e567297b0f86d69bfb9a939764ed4aef90fcc1d3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:30"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is replayed onto 9792878934b2c4d068e98056cef3c2c691451a90, preserves all approved release paths and qualified-main repairs, and imports no unrelated work."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is replayed onto 9792878934b2c4d068e98056cef3c2c691451a90, preserves all approved release paths and qualified-main repairs, and imports no unrelated work."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5950 provider state"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "history replay"
                depends_on: []
                expected_outputs:
                  - "synchronized_candidate_branch"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Replay the existing stable candidate onto exact qualified main 9792878934b2c4d068e98056cef3c2c691451a90 while preserving all approved candidate content and unrelated user work."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/tasks/202609121424-49XXT3"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/assets"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference/generated-reference.mdx"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.9-evidence"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/releases/v0.7.9.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "package.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is replayed onto 9792878934b2c4d068e98056cef3c2c691451a90, preserves all approved release paths and qualified-main repairs, and imports no unrelated work."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines on base 9792878934b2c4d068e98056cef3c2c691451a90."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers, record limitations, and complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:87c1bb77c938e8f2169cf14be7f5755554e96076b8b9a08cdc0bef88b9a8228a"
                  schema_version: 1
        revision: 6
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T02:07:44.461Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T02:06:34.504Z"
        digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
        proposal:
          assumptions:
            - "Qualified main 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 is the required release base because it contains the merged task-state validation repair and hosted closure evidence."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits; external agents must not create or rewrite Git commits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T02:02:03.588Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "e567297b0f86d69bfb9a939764ed4aef90fcc1d3"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:33"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 40368f0ae58774c8cdd80fddb22cb6daacbae8f4, preserves all approved release paths and qualified-main repairs, and imports no unrelated work; no semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 40368f0ae58774c8cdd80fddb22cb6daacbae8f4, preserves all approved release paths and qualified-main repairs, and imports no unrelated work; no semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5950 provider state"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "history replay"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main 40368f0ae58774c8cdd80fddb22cb6daacbae8f4 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation while preserving all approved candidate content and unrelated user work. This WorkItem defines acceptance only; an external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 40368f0ae58774c8cdd80fddb22cb6daacbae8f4, preserves all approved release paths and qualified-main repairs, and imports no unrelated work; no semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base 40368f0ae58774c8cdd80fddb22cb6daacbae8f4."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers, record limitations, and complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:aa1677a81c8c55cebc13561b94297ff8f13c830644a630de2a476aa6d7caa6f2"
                  schema_version: 1
        revision: 7
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T09:19:49.368Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T09:17:05.322Z"
        digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
        proposal:
          assumptions:
            - "Qualified main 1a93a9a43da2b714854174491f9672c52bf33e9f is the required release base because PR #5952 is merged and Core CI run 34825881983 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T09:14:40.154Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "801d545e1e5aaf2c9b4c307d4ca6a19214628a65"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:38"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 1a93a9a43da2b714854174491f9672c52bf33e9f. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 1a93a9a43da2b714854174491f9672c52bf33e9f. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5952 provider state"
                    - "Core CI run 34825881983"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main 1a93a9a43da2b714854174491f9672c52bf33e9f as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@1a93a9a43da2b714854174491f9672c52bf33e9f"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto 1a93a9a43da2b714854174491f9672c52bf33e9f. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base 1a93a9a43da2b714854174491f9672c52bf33e9f."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:48c9bd8c5e7b8b04f82591a26587ceb64398312971347b0429ffa8d00e1abb70"
                  schema_version: 1
        revision: 8
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T14:04:36.346Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T14:00:41.250Z"
        digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
        proposal:
          assumptions:
            - "Qualified main ed89f946b3058cf290df7a76bec23ab4dcc1fa92 is the required release base because PR #5954 is merged and the successful hosted checks for PR #5954 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T13:59:22.486Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "801d545e1e5aaf2c9b4c307d4ca6a19214628a65"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:41"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto ed89f946b3058cf290df7a76bec23ab4dcc1fa92. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto ed89f946b3058cf290df7a76bec23ab4dcc1fa92. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5954 provider state"
                    - "the successful hosted checks for PR #5954"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main ed89f946b3058cf290df7a76bec23ab4dcc1fa92 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@ed89f946b3058cf290df7a76bec23ab4dcc1fa92"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto ed89f946b3058cf290df7a76bec23ab4dcc1fa92. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base ed89f946b3058cf290df7a76bec23ab4dcc1fa92."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:252142361c1ed374b2814ea4c94cd9098a8eaa6a9aff9a31e89993d05736f7e6"
                  schema_version: 1
        revision: 9
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T22:14:20.074Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-14T16:29:27.707Z"
        digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 10
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T22:52:42.086Z"
          approved_by: "USER"
          approved_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          policy_facts:
            - "state_bound_scope_extension:sha256:78fcf70c805a6dc284b475245077172648ae62d9289721d75222cdd648c07b52"
          state: "approved"
        created_at: "2026-09-14T22:52:42.086Z"
        digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 11
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-14T23:29:50.328Z"
          approved_by: "USER"
          approved_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          policy_facts:
            - "state_bound_scope_extension:sha256:3dccde82a5eeae4425495e7d56596433c6069179dfcdb610a58b10fbf183ae66"
          state: "approved"
        created_at: "2026-09-14T23:29:50.328Z"
        digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 12
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-15T00:06:50.787Z"
          approved_by: "USER"
          approved_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          policy_facts:
            - "state_bound_scope_extension:sha256:d3b6cf988ac605d144b6104370ab639a919cd2ffc480f46c756531beb496da15"
          state: "approved"
        created_at: "2026-09-15T00:06:50.787Z"
        digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
        proposal:
          assumptions:
            - "Qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 is the required release base because PR #5956 is merged and the successful hosted checks for PR #5956 succeeded for that exact SHA."
            - "The existing release branch contains the prepared stable candidate and must preserve it during synchronization."
            - "Candidate-base synchronization is a supervisor-owned AgentPlane branch lifecycle operation that must complete before semantic release edits."
            - "Repository release tooling owns publication, exact-SHA evidence, and next-beta creation."
          planning_baseline:
            captured_at: "2026-09-14T16:28:06.040Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            dirty_paths:
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "c3c16604c5f8ec39aada2a0803e846dac2ab198f"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:49"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "candidate_base_identity"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "candidate_base_identity"
                  - "scope_hygiene"
                description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                id: "candidate_base_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "candidate_base_identity"
                      - "scope_hygiene"
                    description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                    id: "candidate_base_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "PR #5956 provider state"
                    - "the successful hosted checks for PR #5956"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "qualified main"
                    - "release candidate base"
                    - "branch-base"
                    - "history preservation"
                depends_on: []
                expected_outputs:
                  - "supervisor_owned_candidate_synchronization_receipt"
                  - "qualified_release_base_sha"
                id: "synchronize_candidate_base"
                objective: "Establish exact qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 as the release candidate base through a supervisor-owned AgentPlane branch synchronization lifecycle operation. Preserve all approved candidate content and unrelated user work. This WorkItem defines acceptance only. An external semantic executor must not create or rewrite Git commits."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "exclusive"
                    mode: "exclusive"
                    resource: "branch-base:main@a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "candidate_base_identity"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "candidate_base_identity"
                        - "scope_hygiene"
                      description: "The existing candidate is synchronized by a supervisor-owned AgentPlane branch lifecycle operation onto a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270. The synchronization preserves all approved release paths and qualified-main repairs. The synchronization imports no unrelated work. No semantic executor creates or rewrites Git commits."
                      id: "candidate_base_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "version parity"
                    - "release notes"
                    - "compatibility baseline"
                    - "clone baseline"
                depends_on:
                  - "synchronize_candidate_base"
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Finalize stable 0.7.9 versions, pins, generated surfaces, notes, evidence, formatting, compatibility baselines, and clone baselines only after supervisor-owned synchronization establishes base a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270."
                optional: false
                priority: 2
                required_inputs:
                  - "qualified_release_base_sha"
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-create-base-intent.test.ts"
                  - "scripts/baselines"
                  - "website/static/img/social"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The candidate has stable 0.7.9 version parity, complete notes and evidence, fresh generated surfaces and baselines, and no unrelated semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact candidate and integrate it through independent review, hosted CI, the protected merge lane, and hosted close."
                optional: false
                priority: 3
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact candidate passes local gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release route and preserve canonical publication evidence."
                optional: false
                priority: 4
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected workflow publishes v0.7.9 from the exact qualified main SHA and records success=true with an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify public 0.7.9 artifacts and installers. Record limitations. Complete AgentPlane-managed evidence and next-beta follow-up."
                optional: false
                priority: 5
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies registries, release assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final main."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "AgentPlane records post-publish evidence and starts the next beta only after public proof while preserving unrelated user work."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:27f7a74e220869127547a3ca7a508be7bf9a4460e529f228ace6f5a5d3561a91"
                  schema_version: 1
        revision: 13
        schema_version: 1
        task_id: "202609121424-49XXT3"
    revision: 66
    schema_version: 1
    updated_at: "2026-09-15T00:51:41.248Z"
    work_items:
      prepare_candidate:
        attempt: 0
        claim_id: null
        id: "prepare_candidate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      publish_stable:
        attempt: 0
        claim_id: null
        id: "publish_stable"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      qualify_integrate:
        attempt: 0
        claim_id: null
        id: "qualify_integrate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      synchronize_candidate_base:
        attempt: 1
        claim_id: null
        id: "synchronize_candidate_base"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:a9d1fb3adfcdb80a0c5f5fbabaa2107af25c3b23d6ed95b6c50b07e48c8a3169"
            id: "supervisor_owned_candidate_synchronization_receipt"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 10
              task_id: "202609121424-49XXT3"
              work_item_id: "synchronize_candidate_base"
            provenance:
              - "sha256:ee6e73f0f43da46bc821f098adf51cc22613c15a0b1aadd1e69b6428dc27fd3e"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:5724856167b5100850f3741c3d68fb218f0d33712319585115e8b93b6fc5f42b"
            id: "qualified_release_base_sha"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 10
              task_id: "202609121424-49XXT3"
              work_item_id: "synchronize_candidate_base"
            provenance:
              - "sha256:ee6e73f0f43da46bc821f098adf51cc22613c15a0b1aadd1e69b6428dc27fd3e"
              - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "candidate_base_identity"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-14T22:15:51.305Z"
              repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-49XXT3/supervision/declared-checks.json"
              check_id: "scope_hygiene"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-14T22:15:51.305Z"
              repository_snapshot_digest: "sha256:da18916e8326e580f3c89a896b967455897e6fd2ea3c73dc1c5f184eccd28568"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      verify_distribution:
        attempt: 0
        claim_id: null
        id: "verify_distribution"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T23:01:21.946Z"
        from: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        to: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_09e51e2ff0846e81e8db19cd"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
        plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-14T00:34:09.691Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_8548f5a0e0489ca2e70cd1a4"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9"
        plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 25
        work_item_id: null
      -
        at: "2026-09-14T00:39:46.937Z"
        from: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        to: "sha256:9e285965362318aa806b2ead1dcddad86f26178f8bb4aaca1e55a3618812daf3"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_5c54ba054e1eeb90f0335dc0"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04"
        plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 28
        work_item_id: null
      -
        at: "2026-09-14T00:40:53.958Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_5f6cadaeee399a2ec63ca6d3"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6"
        plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 29
        work_item_id: null
      -
        at: "2026-09-14T02:02:01.893Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
          - "dependencies_changed"
          - "architecture_changed"
        entity: "task"
        id: "event_b169b299c4e7016f6d543c6e"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7"
        plan_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
        plan_revision: 6
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 32
        work_item_id: null
      -
        at: "2026-09-14T09:14:38.431Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_77bf2255888a8e15ffc5eae1"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a"
        plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
        plan_revision: 7
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 37
        work_item_id: null
      -
        at: "2026-09-14T14:12:47.166Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:ea3e0eddd02bdee3cea41d87f0bca5da14ce0c0cfdab8acd8de54bab589ae819"
        entity: "work_item"
        id: "event_71f75d268461f213eadb748e"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6"
        plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
        plan_revision: 9
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 45
        work_item_id: "synchronize_candidate_base"
      -
        at: "2026-09-14T16:28:04.232Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_6d533a221b7ee824d9db2c99"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07"
        plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
        plan_revision: 9
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 48
        work_item_id: null
      -
        at: "2026-09-14T22:15:51.336Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:c8b3c17a8bace614db0f4cc9a20661bf56823077e183a3e7d5b6af7f22627c72"
        entity: "work_item"
        id: "event_5167f6465707615d336c0fea"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191"
        plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
        plan_revision: 10
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 53
        work_item_id: "synchronize_candidate_base"
    leases: []
    mutation_receipts:
      compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3:
        aggregate_digest: "sha256:1e8ddc402af0dbaa4a8de58f965c314f73afd70122a1e21678777c6b79c14ead"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:53:16.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_426f27761a62ae0e06c0431f"
          mutation_id: "compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551:
        aggregate_digest: "sha256:ff42920bca0cea490f64a8a516c68709732b961ee50f1259fd57447b7453731e"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_7d58a4a2a85b9933836f03c6"
          mutation_id: "compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:067e10b0020868451305332b5bc514fd717698d1114e2252a996b77134c6df34:
        aggregate_digest: "sha256:d19c312476fc8c646ae85271b4bb4f86463e2f512bae3c1ff5438feb42de0eec"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:29:25.923Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_6f1c6074d59bb6cbec44fd2f"
          mutation_id: "compatibility:sha256:067e10b0020868451305332b5bc514fd717698d1114e2252a996b77134c6df34"
          plan_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 59
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:067e10b0020868451305332b5bc514fd717698d1114e2252a996b77134c6df34"
        next_revision: 60
        previous_revision: 59
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602:
        aggregate_digest: "sha256:e3239e63b31f6f03a8c3077e8ee8068b2124f0e0af71aa92879aa10f6190a001"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:07:23.950Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_80e479e56b0a3f441e45109d"
          mutation_id: "compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 10
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd:
        aggregate_digest: "sha256:cfb0091efde65e83f7084169ed081c00b03bbb27a4bcc2ee6b5691205ce72676"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:53:16.172Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_98bb6ebbe54c013e6aa8b1da"
          mutation_id: "compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:15238a185d9d6f6638425bce2408cecc26c09e69022551433ba3d4b6a5a87dae:
        aggregate_digest: "sha256:87693512e0b38d6de4c259354d5cfc5a38c68c1ae52e46885c98e569d877c05a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:39:25.433Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a458cc70835c6f9bd99652ac"
          mutation_id: "compatibility:sha256:15238a185d9d6f6638425bce2408cecc26c09e69022551433ba3d4b6a5a87dae"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 46
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:15238a185d9d6f6638425bce2408cecc26c09e69022551433ba3d4b6a5a87dae"
        next_revision: 47
        previous_revision: 46
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:16549760ade2ff969316ba2531557a3218fedce7a8803627141e8d272abe1301:
        aggregate_digest: "sha256:8102b266ee84603c56e1e891d8f8bca07d7fc6dc4dda6d1351f032ff99effc71"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:21:41.489Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_c35a456a193047c7d1f0c72a"
          mutation_id: "compatibility:sha256:16549760ade2ff969316ba2531557a3218fedce7a8803627141e8d272abe1301"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 21
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:16549760ade2ff969316ba2531557a3218fedce7a8803627141e8d272abe1301"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:25ebe0223d646bb935d6e6f07c84ece9cc2759e7d3c12b13950ee02b4fb5beb8:
        aggregate_digest: "sha256:bc225c9a4987941b4a19c1fb229f8cab7e4c7cfb745784043739cb5c556b2fdf"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:06:32.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b2fb4374442de6341209aee3"
          mutation_id: "compatibility:sha256:25ebe0223d646bb935d6e6f07c84ece9cc2759e7d3c12b13950ee02b4fb5beb8"
          plan_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          plan_revision: 12
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 60
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:25ebe0223d646bb935d6e6f07c84ece9cc2759e7d3c12b13950ee02b4fb5beb8"
        next_revision: 61
        previous_revision: 60
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:2f261bb198ac6d87ce12c874d2145cfea075cfd7f48d6e7f0f7c9715830a3fe8:
        aggregate_digest: "sha256:5004725bc3753757de9679c402f299687fdccc5dc83fd6d26115eb8af83d6a65"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:12:43.781Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4b0e24b97f60ebdf434ef32d"
          mutation_id: "compatibility:sha256:2f261bb198ac6d87ce12c874d2145cfea075cfd7f48d6e7f0f7c9715830a3fe8"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 44
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2f261bb198ac6d87ce12c874d2145cfea075cfd7f48d6e7f0f7c9715830a3fe8"
        next_revision: 45
        previous_revision: 44
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:3179b068ba7457fafe52587f95888c01ba9057e2dd7bfb3bf329230dc2c540e6:
        aggregate_digest: "sha256:f1a4e327a4c3bb731557b755734c67af66bf1819fd67780c01f8b92f6c4dbfe0"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T16:26:34.900Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_3e79d9f0aa1ced28f1b9f44a"
          mutation_id: "compatibility:sha256:3179b068ba7457fafe52587f95888c01ba9057e2dd7bfb3bf329230dc2c540e6"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 47
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3179b068ba7457fafe52587f95888c01ba9057e2dd7bfb3bf329230dc2c540e6"
        next_revision: 48
        previous_revision: 47
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:318084961a397b3419e1d9154faeed0f46632c1ba74637b53d9cfd60e0d5f4ad:
        aggregate_digest: "sha256:78014b2c0333160d20e6ceb9be7d7262d2f63aef9f2f58beb4eb7cefaeb796ff"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:51:41.248Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_1a4d5323cce6af1a72616fb1"
          mutation_id: "compatibility:sha256:318084961a397b3419e1d9154faeed0f46632c1ba74637b53d9cfd60e0d5f4ad"
          plan_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          plan_revision: 13
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 65
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:318084961a397b3419e1d9154faeed0f46632c1ba74637b53d9cfd60e0d5f4ad"
        next_revision: 66
        previous_revision: 65
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:40aa9856b61c1f1e2ceaf69ea3e5573ff591a44e965b9e2f23dcb008a613cb85:
        aggregate_digest: "sha256:e1cccc9ca91d522b64933292e4c6f08c8fd746c044e6cc0288524b79ece5bdc8"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T09:17:05.349Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_96b315b41076928d89550495"
          mutation_id: "compatibility:sha256:40aa9856b61c1f1e2ceaf69ea3e5573ff591a44e965b9e2f23dcb008a613cb85"
          plan_digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 39
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:40aa9856b61c1f1e2ceaf69ea3e5573ff591a44e965b9e2f23dcb008a613cb85"
        next_revision: 40
        previous_revision: 39
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:513db44108e85ed87cef39a830dfbd3d911d3bebe2881381d70cdee02d5bb181:
        aggregate_digest: "sha256:55a9e2ff33d18ff6c07f896cc85e80d5b883f7f08c4e9ec3c4c528e90bff5e95"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:20:21.839Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0802005f624c69582516c9d0"
          mutation_id: "compatibility:sha256:513db44108e85ed87cef39a830dfbd3d911d3bebe2881381d70cdee02d5bb181"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:513db44108e85ed87cef39a830dfbd3d911d3bebe2881381d70cdee02d5bb181"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:61f02ff91468050eeda24345627a94091b29b5f7d3dcbe93ed180359a45b320a:
        aggregate_digest: "sha256:f6a6da89a73f8b65d2277141bb97a9f6abdcccdf4de9379d6500de8d9adc7e97"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T02:08:41.270Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_357089c057e55c649823612d"
          mutation_id: "compatibility:sha256:61f02ff91468050eeda24345627a94091b29b5f7d3dcbe93ed180359a45b320a"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 35
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:61f02ff91468050eeda24345627a94091b29b5f7d3dcbe93ed180359a45b320a"
        next_revision: 36
        previous_revision: 35
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6465ecabf20045ef10370e07fa9edd368d85eb5e7b23d68c6967ecc8fc51be04:
        aggregate_digest: "sha256:9ece8d1bc80aa3f6c3d337b5997ad0a96e06820dbfba0e5803085b9ae3b75f79"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:29:25.923Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f16d0d01b2ef4058e9db794c"
          mutation_id: "compatibility:sha256:6465ecabf20045ef10370e07fa9edd368d85eb5e7b23d68c6967ecc8fc51be04"
          plan_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 57
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6465ecabf20045ef10370e07fa9edd368d85eb5e7b23d68c6967ecc8fc51be04"
        next_revision: 58
        previous_revision: 57
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:65940460e9ca8855a966ffb8780d92852cd020fe430fae86f7ff92affd20b9ca:
        aggregate_digest: "sha256:872c4a4537e2e0039a879e3e38b43357e038acf6c8a92c04b85c2137f6fe6062"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:31:46.313Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_060812bce7c428874eb4dd98"
          mutation_id: "compatibility:sha256:65940460e9ca8855a966ffb8780d92852cd020fe430fae86f7ff92affd20b9ca"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 24
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:65940460e9ca8855a966ffb8780d92852cd020fe430fae86f7ff92affd20b9ca"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6a8c60830af7e59784fb00121c19a9d5f6d3567ff9b68b7a177db48775c1f288:
        aggregate_digest: "sha256:391bb726eb853e11a177b8e41b6c676817ab8929cbe42cbdad85a1aaca195f8f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:21:41.489Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_11b54774a685b955864b5695"
          mutation_id: "compatibility:sha256:6a8c60830af7e59784fb00121c19a9d5f6d3567ff9b68b7a177db48775c1f288"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 22
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6a8c60830af7e59784fb00121c19a9d5f6d3567ff9b68b7a177db48775c1f288"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6c6feb5a69dc4845b844975ab5bbc906cbed5411d34057a1adf14663b8574a71:
        aggregate_digest: "sha256:12c5b8c8a87016e85041474c6bb9b38252ff94d9cf3a78716ad7fc96ac6f6a4a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:15:48.057Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_268940272ea3a918cd0a9037"
          mutation_id: "compatibility:sha256:6c6feb5a69dc4845b844975ab5bbc906cbed5411d34057a1adf14663b8574a71"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 52
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6c6feb5a69dc4845b844975ab5bbc906cbed5411d34057a1adf14663b8574a71"
        next_revision: 53
        previous_revision: 52
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e:
        aggregate_digest: "sha256:9926d4f6961e785dd78313a05d5bfe91f3b380065f2528f58042e8fd0e2a8cef"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5282cc51086ee1d79f381a39"
          mutation_id: "compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 7
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:726333f5d70cf45b38546a54c18795b940885092a1539c3b9fb15c1ef26bc1a0:
        aggregate_digest: "sha256:59b81d0a16006bbf188ba12fce864cd77b7f6dc4c15d9f2c8e9e002a29c803c0"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:51:41.248Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_14c784edddf12ba8f38b36ea"
          mutation_id: "compatibility:sha256:726333f5d70cf45b38546a54c18795b940885092a1539c3b9fb15c1ef26bc1a0"
          plan_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          plan_revision: 13
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 63
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:726333f5d70cf45b38546a54c18795b940885092a1539c3b9fb15c1ef26bc1a0"
        next_revision: 64
        previous_revision: 63
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:7d08f7334c5b439d74cbc91ecf1b184756a0722bab019e17ac1f3112b171ea33:
        aggregate_digest: "sha256:18de3834694f906abd3f9205358dc1b362737c1d951c153efaabaa412b82d220"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:20:21.839Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1aab4dc0e9a4502cd3bf873b"
          mutation_id: "compatibility:sha256:7d08f7334c5b439d74cbc91ecf1b184756a0722bab019e17ac1f3112b171ea33"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 19
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7d08f7334c5b439d74cbc91ecf1b184756a0722bab019e17ac1f3112b171ea33"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:7daa3c01d3a379229f881d853a6e69887c12ab509521d329fdb1220a0c9551c1:
        aggregate_digest: "sha256:b7a7e0ae568e7858f026dbaa15d395e21ed7d94f28ef03b1c2a258354091775a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T13:58:06.801Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4f5304a0e0e4a39d2ea95b41"
          mutation_id: "compatibility:sha256:7daa3c01d3a379229f881d853a6e69887c12ab509521d329fdb1220a0c9551c1"
          plan_digest: "sha256:378580cbefb72708067b44ff677c37af443a3385091d5f05480dcb21504e8c44"
          plan_revision: 8
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 40
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:7daa3c01d3a379229f881d853a6e69887c12ab509521d329fdb1220a0c9551c1"
        next_revision: 41
        previous_revision: 40
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:87f74a066c743a24cdebd6eafc9e9216af6081d8ced4eb4e82f8857156011abf:
        aggregate_digest: "sha256:620c50d72c7c4c27710637e6d196af1f3c002375e338fb25fee729e85738d97a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:52:06.599Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6469018a37c4ae6975612e06"
          mutation_id: "compatibility:sha256:87f74a066c743a24cdebd6eafc9e9216af6081d8ced4eb4e82f8857156011abf"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 54
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:87f74a066c743a24cdebd6eafc9e9216af6081d8ced4eb4e82f8857156011abf"
        next_revision: 55
        previous_revision: 54
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:8ced4650bc3274c2b82df701dc9d18d9579cca94b3fd7e101e9d67b4f350e822:
        aggregate_digest: "sha256:8e04a4713f1bf11a7a49ba7b34f4d21327916c5fc6cbde2532342f72edeb437b"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T16:29:27.741Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_cfbb186800d7eb1ac283479d"
          mutation_id: "compatibility:sha256:8ced4650bc3274c2b82df701dc9d18d9579cca94b3fd7e101e9d67b4f350e822"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 50
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8ced4650bc3274c2b82df701dc9d18d9579cca94b3fd7e101e9d67b4f350e822"
        next_revision: 51
        previous_revision: 50
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:8e5c35cd253fa10e2c4c1dcaa29f3ee2e7be7ec4862aed8cd5f4c93b6e6075d6:
        aggregate_digest: "sha256:9d5a06b02d2d9f937fd8ced6ee009041df640236ea47b819341773f3df9bcc77"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:30:11.418Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_89f4a77d49a9040a2ed07eb1"
          mutation_id: "compatibility:sha256:8e5c35cd253fa10e2c4c1dcaa29f3ee2e7be7ec4862aed8cd5f4c93b6e6075d6"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 23
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:8e5c35cd253fa10e2c4c1dcaa29f3ee2e7be7ec4862aed8cd5f4c93b6e6075d6"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716:
        aggregate_digest: "sha256:70449a1ad5412a24658da1ba64eaebaab13b48c1a223d8d722f57a9a9ae2fab9"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b6cc5af0b3fe4dee524c89b8"
          mutation_id: "compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 15
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:9810401a237ee22fb59b4432e4214f47705fc9e03ce6e219c1b0fab69c8853fc:
        aggregate_digest: "sha256:872d26bb979e3beb43232fa757f9a43315bb58c89e3025a196b0bc6128b30180"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:15:48.057Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3b5d732b6de97e64481573a8"
          mutation_id: "compatibility:sha256:9810401a237ee22fb59b4432e4214f47705fc9e03ce6e219c1b0fab69c8853fc"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 51
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9810401a237ee22fb59b4432e4214f47705fc9e03ce6e219c1b0fab69c8853fc"
        next_revision: 52
        previous_revision: 51
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a607a16f6af7fec0c794563941d827439b3531ed2987b1808cd504432828d11f:
        aggregate_digest: "sha256:88c32b255e68fa9712a4ad1832f68dc362c5e3d99772ddc08a517c3bba23fd94"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:00:41.283Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_0170e29257e16705d5ad8d0a"
          mutation_id: "compatibility:sha256:a607a16f6af7fec0c794563941d827439b3531ed2987b1808cd504432828d11f"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 42
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a607a16f6af7fec0c794563941d827439b3531ed2987b1808cd504432828d11f"
        next_revision: 43
        previous_revision: 42
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a7953a26a334852a2d946428fa46f4f9f351cbce1911c1fa63708bab698b84ac:
        aggregate_digest: "sha256:50e80b646ba01144540d80d31e5bc131ebdc2b0b5f4fac24a6f01dd2c4aec3cb"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:42:42.470Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_0cda429031b9b7c8ffa2a9e9"
          mutation_id: "compatibility:sha256:a7953a26a334852a2d946428fa46f4f9f351cbce1911c1fa63708bab698b84ac"
          plan_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 31
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a7953a26a334852a2d946428fa46f4f9f351cbce1911c1fa63708bab698b84ac"
        next_revision: 32
        previous_revision: 31
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade:
        aggregate_digest: "sha256:408c1ec37701da5c9259625091e1645a362b912157473d9bd1011b301bd98fc2"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:57:11.849Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c753d15c8af88512ee0bcc2f"
          mutation_id: "compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9:
        aggregate_digest: "sha256:4d3b7338c297e8010911c7815bd1d61eb076864551a03eb5f23691aec0395c9c"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_abe1dabf124a0b7972868fe3"
          mutation_id: "compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 16
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ad69f44d2c19cb6998538b58adc33ad32f85a04d06df6afff5888b25c42bc056:
        aggregate_digest: "sha256:8af2ce16f514059e061b77c6674ce6b71224f27780d1a1ac5743ff22a2ecf78a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:52:06.599Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_cd933ad895bfce728018e7eb"
          mutation_id: "compatibility:sha256:ad69f44d2c19cb6998538b58adc33ad32f85a04d06df6afff5888b25c42bc056"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 56
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ad69f44d2c19cb6998538b58adc33ad32f85a04d06df6afff5888b25c42bc056"
        next_revision: 57
        previous_revision: 56
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ae4afc9021d82cde8fad79c9144dcb63e6fb0372ca3ed3b4505e23d6d9d022b3:
        aggregate_digest: "sha256:25fc37725b706aa2ccb2ecd6d01da04179119e61ba169003fd4ae08b16d04670"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:06:32.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_164526b67f915760ea9a6cfe"
          mutation_id: "compatibility:sha256:ae4afc9021d82cde8fad79c9144dcb63e6fb0372ca3ed3b4505e23d6d9d022b3"
          plan_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          plan_revision: 12
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 62
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ae4afc9021d82cde8fad79c9144dcb63e6fb0372ca3ed3b4505e23d6d9d022b3"
        next_revision: 63
        previous_revision: 62
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:b35991a6c48ed51bb29b614385a7b75c9ab8724dedf2ecec548d48d2fa17e6a7:
        aggregate_digest: "sha256:885c252c26a3415d6229a74b4d6aba0d22ee525e29cb32659952f9069673dc1f"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:51:41.248Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_acd4d542e8d2af9d65feefe6"
          mutation_id: "compatibility:sha256:b35991a6c48ed51bb29b614385a7b75c9ab8724dedf2ecec548d48d2fa17e6a7"
          plan_digest: "sha256:fac98f81df9d216ee69d867cb02c7b675c6c2fe4c6b7e3f9b92f99af83a9e890"
          plan_revision: 13
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 64
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:b35991a6c48ed51bb29b614385a7b75c9ab8724dedf2ecec548d48d2fa17e6a7"
        next_revision: 65
        previous_revision: 64
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:c97f1b8ba7a4f015e1c9c155173142eb14d74f0dfc6b7cc1f75d796ab19257c9:
        aggregate_digest: "sha256:7bb4056664ba413a8529fbcddc91b4396a146f5616925c55f529681167680dc3"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:12:43.781Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fd03b2097a0f1639597f907a"
          mutation_id: "compatibility:sha256:c97f1b8ba7a4f015e1c9c155173142eb14d74f0dfc6b7cc1f75d796ab19257c9"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 43
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c97f1b8ba7a4f015e1c9c155173142eb14d74f0dfc6b7cc1f75d796ab19257c9"
        next_revision: 44
        previous_revision: 43
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee:
        aggregate_digest: "sha256:a3df4e024aad4766d649f76ad116f63cb5c8e88fef4597198b17d12c883f48f5"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_132744cdb786aba96bd255bd"
          mutation_id: "compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:cf7af711aa442fb70247141b6b53fdf7be3bbb1af2e54d1f0607e07f9a79a717:
        aggregate_digest: "sha256:31295263aed4eaf089b928b5858fffed6a0dabe8ffd08455ac9af40ef83cc41a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:52:06.599Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_3eabf218b7b401fbcecfe955"
          mutation_id: "compatibility:sha256:cf7af711aa442fb70247141b6b53fdf7be3bbb1af2e54d1f0607e07f9a79a717"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 55
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:cf7af711aa442fb70247141b6b53fdf7be3bbb1af2e54d1f0607e07f9a79a717"
        next_revision: 56
        previous_revision: 55
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd:
        aggregate_digest: "sha256:01e24eb53b8cc1114bb940ab244ad72ee0e9a69a5b653e9543e3799028a9225f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:08:20.260Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_b665e5f518da35f40d00a0e7"
          mutation_id: "compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:d70c8fdb48193614020930a05ce2c460b895bca3ab433f7a8b2465f62135acef:
        aggregate_digest: "sha256:2c00d232a257fdca63fd5f7eb92d4d580c5ddab99f86beda902c23c9cfcd1faa"
        event:
          actor_id: "agentplane"
          at: "2026-09-15T00:06:32.254Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_f9721a3c8bb1cf9af41dec43"
          mutation_id: "compatibility:sha256:d70c8fdb48193614020930a05ce2c460b895bca3ab433f7a8b2465f62135acef"
          plan_digest: "sha256:7d82cb0a3ff017d01f1e483a7e98de884c7cc9bcbe6b36096355c9b05327a84d"
          plan_revision: 12
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 61
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:d70c8fdb48193614020930a05ce2c460b895bca3ab433f7a8b2465f62135acef"
        next_revision: 62
        previous_revision: 61
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:de2094d53b7dc3aff3e2338d3eed355bf2d209869e1bbecd169452eea0de4054:
        aggregate_digest: "sha256:c1cf95fe6c1218862b73d053743ed5e6308859d920d6e572ddd3001141bc6e50"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T09:13:07.280Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_2a0d280a5820e629f5772d8f"
          mutation_id: "compatibility:sha256:de2094d53b7dc3aff3e2338d3eed355bf2d209869e1bbecd169452eea0de4054"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 36
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:de2094d53b7dc3aff3e2338d3eed355bf2d209869e1bbecd169452eea0de4054"
        next_revision: 37
        previous_revision: 36
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:de306b92afeb498e88a226d4f067bd7e696f5079b64093f693e02d3930c28ee4:
        aggregate_digest: "sha256:88fa4dba77b42fd930b0dac1ba6e24152446582be2be3e3eb8135f0b5d2f8594"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:21:41.489Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7669d4338986a983afde99db"
          mutation_id: "compatibility:sha256:de306b92afeb498e88a226d4f067bd7e696f5079b64093f693e02d3930c28ee4"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 20
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:de306b92afeb498e88a226d4f067bd7e696f5079b64093f693e02d3930c28ee4"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88:
        aggregate_digest: "sha256:8a1a55678c4442eefb8e7d129f7fbebd00c567de025d4b46621049f566bb3e91"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_089e5af8b2d4f7c522d37bbd"
          mutation_id: "compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f03af7a31da8d893b1460a148258a988f9ae521e8ff765e8b4577c70f51d13c4:
        aggregate_digest: "sha256:b3ddac01873d010923232adcfef354bba7c2e79d5c743e61d197916f4e46bb52"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:37:24.832Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_d51c5675ca3172cad8a950b1"
          mutation_id: "compatibility:sha256:f03af7a31da8d893b1460a148258a988f9ae521e8ff765e8b4577c70f51d13c4"
          plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 27
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f03af7a31da8d893b1460a148258a988f9ae521e8ff765e8b4577c70f51d13c4"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f6eec07a92279d0f7a9d4de6e3f821943fe360d666b4b79ca43b98c409b5e1a5:
        aggregate_digest: "sha256:035f650c4daf15a435aabe53e77bddcf86b605eceaf6ead3b94c40c7f7e75879"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T23:29:25.923Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_4e167a17bf1a7ab4038ab513"
          mutation_id: "compatibility:sha256:f6eec07a92279d0f7a9d4de6e3f821943fe360d666b4b79ca43b98c409b5e1a5"
          plan_digest: "sha256:cb82b4dc41dcb54b9ec41599dafe685683aae1e87e1ad09eab4a8b5b7f831070"
          plan_revision: 11
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 58
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f6eec07a92279d0f7a9d4de6e3f821943fe360d666b4b79ca43b98c409b5e1a5"
        next_revision: 59
        previous_revision: 58
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f73189cbd47c6805c1d7b2c98b106d7239f5029b70208be5f4c89e7a940ba33a:
        aggregate_digest: "sha256:dfd4f710774be68b229ec6675f303aff5a17d63e68db658c3cfcc74690226d7a"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T02:06:34.530Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_200048e783a5d8b3b8b2a3b5"
          mutation_id: "compatibility:sha256:f73189cbd47c6805c1d7b2c98b106d7239f5029b70208be5f4c89e7a940ba33a"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 34
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f73189cbd47c6805c1d7b2c98b106d7239f5029b70208be5f4c89e7a940ba33a"
        next_revision: 35
        previous_revision: 34
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f:
        aggregate_digest: "sha256:59f999ba0cb5832a58f63e98a719e85f0cde09eac64c57fd478d6c088c9a1290"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a6099804ca4faafa3f7b9ee8"
          mutation_id: "compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 12
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e:
        aggregate_digest: "sha256:4a3caf0f179c302a281e9553368d69daca88e2485378533831128c532be4be3d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_e0fcd4064689837a2222fb58"
          mutation_id: "compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 8
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626:
        aggregate_digest: "sha256:c1c9463018af1be82dc24a0fa917c39ebf84eccdd7b49fcb452891080d2d7851"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_90bed59ee431c5e3a70d2a3e"
          mutation_id: "compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 13
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6:
        aggregate_digest: "sha256:fba01ef3b83da355bc415b937e851625b889f225daada30ec7ca0ac6ecf33441"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:12:47.166Z"
          cause_refs:
            - "semantic-result:sha256:ea3e0eddd02bdee3cea41d87f0bca5da14ce0c0cfdab8acd8de54bab589ae819"
          entity: "work_item"
          from: "READY"
          id: "event_71f75d268461f213eadb748e"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 45
          to: "COMPLETED"
          work_item_id: "synchronize_candidate_base"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-00afd788a39e4976554119c6"
        next_revision: 46
        previous_revision: 45
        schema_version: 1
        task_id: "202609121424-49XXT3"
      external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191:
        aggregate_digest: "sha256:1af8b0214af19c9bc9b792afb536b61058bf10f1a9c86b8a7d139325798b0cfd"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:15:51.336Z"
          cause_refs:
            - "semantic-result:sha256:c8b3c17a8bace614db0f4cc9a20661bf56823077e183a3e7d5b6af7f22627c72"
          entity: "work_item"
          from: "READY"
          id: "event_5167f6465707615d336c0fea"
          mutation_id: "external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191"
          plan_digest: "sha256:c37f177171441b358c9a0bde2de1a4f18a7ed0a9a89bba7ce19c1595bcdcd2ce"
          plan_revision: 10
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 53
          to: "COMPLETED"
          work_item_id: "synchronize_candidate_base"
        mutation_id: "external-result:work-order-202609121424-49XXT3-executor-b52af39d3d1a16f646ddb191"
        next_revision: 54
        previous_revision: 53
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6:
        aggregate_digest: "sha256:2099ae2049cd5115b8745c9bdb56d889e1592e0314283a76101c9d6e950e82b2"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T00:40:53.958Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_5f6cadaeee399a2ec63ca6d3"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6"
          plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 29
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-0abaa4e4bfeb153cdcdd51a6"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07:
        aggregate_digest: "sha256:2d24885be848b20686b3d160b14a14c3a26f5a95557a42d18ba87fc6e07e8b7d"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T16:28:04.232Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_6d533a221b7ee824d9db2c99"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07"
          plan_digest: "sha256:daeb3cc4f442055aff876a2c9af17cc066df9b9ea4452819f5284755a61dc80c"
          plan_revision: 9
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 48
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-244025d6af0680e5855dcd07"
        next_revision: 49
        previous_revision: 48
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079:
        aggregate_digest: "sha256:b31d2c603a5a552f448f5af1c0488402aedc0fc4cf5b392656c4c416a2f881bc"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-13T23:01:21.946Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          id: "event_09e51e2ff0846e81e8db19cd"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 6
          to: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9:
        aggregate_digest: "sha256:c2a7c81734e2bc934351979d1539b040cb5f0a31d56b54ef0a0695f53a0a8b43"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T00:34:09.691Z"
          cause_refs:
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_8548f5a0e0489ca2e70cd1a4"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9"
          plan_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 25
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-45f2030ec063788840e7c4b9"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04:
        aggregate_digest: "sha256:4b9f1ec85caa7be3536a43d537022ac806198417d31bb48512d2701579dded22"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T00:39:46.937Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          id: "event_5c54ba054e1eeb90f0335dc0"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04"
          plan_digest: "sha256:eb9ce27c4909631c733ca19863ef09fc2f884213b20b57e35f4f50e01462d5d5"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 28
          to: "sha256:9e285965362318aa806b2ead1dcddad86f26178f8bb4aaca1e55a3618812daf3"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-84bb81bb296b8c85aff12b04"
        next_revision: 29
        previous_revision: 28
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7:
        aggregate_digest: "sha256:342f69ac5230e446f53de5e61c299170a05a1eb2b5fb96bebef7fdf17ac8f0b2"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T02:02:01.893Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
            - "architecture_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_b169b299c4e7016f6d543c6e"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7"
          plan_digest: "sha256:b7ab04861eb63f6d357b719af194fb1fa2aa03047d37e31af93321b1205476d2"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 32
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-af29bd7cf5ad53932e76c5d7"
        next_revision: 33
        previous_revision: 32
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a:
        aggregate_digest: "sha256:7a48c011f7717df573ff12f82dcaa84c13aab99556016b3bb7a716bd9d662cc7"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-14T09:14:38.431Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_77bf2255888a8e15ffc5eae1"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a"
          plan_digest: "sha256:2dc5dc0f43f6b65479ab63ffbd9cd7f458486e5ed3678edeca71f4080fe8ce02"
          plan_revision: 7
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 37
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-bd09ad6a63b7728ba655087a"
        next_revision: 38
        previous_revision: 37
        schema_version: 1
        task_id: "202609121424-49XXT3"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "529d2a93fa0636f31830be894a727866e788e23a"
  task_execution_context:
    base_ref: "main"
    base_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ecfccc5ad0230fc1876a319be0af5cdb530c339f"
    version: 1
id_source: "generated"
---
## Summary

Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.

## Scope

- In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
- Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".

## Plan

The release plan now rebinds candidate synchronization to qualified main a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270 and preserves the remaining 0.7.9 release graph.

## Verify Steps

1. Run `bun run release:check`. Expected: version parity, generated release surfaces, package manifests, and release policy checks pass for 0.7.9.
2. Run `bun run release:prepublish`. Expected: the complete prepublish gate passes for the exact release candidate without skipped mandatory checks.
3. Review `git diff --check`, the exact task diff, and `git status --short --untracked-files=all`. Expected: only approved release metadata, documentation, package version surfaces, baseline evidence, and AgentPlane task artifacts changed; `agentplane-roadmap-r2` and unrelated user work are not committed.
4. Complete AgentPlane verification and hosted branch protection for the release-ready candidate. Expected: the accepted release commit is integrated into `main`, hosted checks are successful, and `origin/main` resolves to the exact qualified publish SHA.
5. Publish v0.7.9 only through the AgentPlane release route after an exact fresh publish-authority grant. Expected: `.agentplane/.release/publish/publish-result.json` records `success=true`, an empty `failures` array, version 0.7.9, and the exact qualified main SHA.
6. Independently read back the GitHub v0.7.9 tag and release. Expected: the tag resolves to the qualified publish SHA and every required release asset and checksum is present.
7. Independently read back all npm package versions and install the published packages in clean temporary directories. Expected: every public AgentPlane package reports 0.7.9 and both `agentplane` and `ap` entrypoints execute successfully.
8. Independently verify `setup-agentplane`, Homebrew, and Scoop distribution surfaces and perform their documented clean install smoke checks when the release route provides them. Expected: every required surface resolves to 0.7.9 and its expected checksum; any unavailable anonymous GHCR read is recorded separately without being misreported as success.
9. Re-fetch the default branch and provider state after publication. Expected: `origin/main`, the canonical release evidence, the tag, registries, and distribution surfaces agree on the same released SHA and version.
10. Complete the required post-publish evidence follow-up and start the next patch beta only through fresh AgentPlane-managed tasks and authority packets. Expected: no lifecycle or external action is inferred from prose, and any genuine provider or evidence boundary is reported explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
