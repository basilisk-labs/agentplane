---
id: "202606011006-MTT6E8"
title: "Prepare v0.6.14 release candidate"
result_summary: "Merged via PR #4363."
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T10:06:36.114Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T10:46:07.760Z"
  updated_by: "INTEGRATOR"
  note: "Release candidate payload prepared for v0.6.14. ap release candidate completed release:prepublish:fast and release:ci-check gates through release-critical tests, then failed only on staging generated task artifacts before commit; payload was committed manually with the release candidate message. release:parity and release state now read 0.6.14."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-01T10:46:21.307Z"
  updated_by: "EVALUATOR"
  note: "v0.6.14 release candidate payload is prepared and locally gated."
  evaluated_sha: "ede2be7045fafdd03568187fd93076c8a56640cc"
  blueprint_digest: "c5f296a6e61d82d44ef7f30e372d4a880911b941e9cb2d3a7ab3f138d1c46491"
  evidence_refs:
    - ".agentplane/tasks/202606011006-MTT6E8/README.md"
    - ".agentplane/tasks/202606011006-MTT6E8/quality/20260601-104621307-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606011006-MTT6E8/quality/20260601-104621307-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606011006-MTT6E8/quality/20260601-104621307-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606011006-MTT6E8/blueprint/resolved-snapshot.json"
    - "docs/releases/v0.6.14.md"
    - "packages/agentplane/package.json"
    - "packages/core/package.json"
    - "packages/recipes/package.json"
  findings:
    - "The candidate branch is at version 0.6.14 with release parity passing; release candidate execution completed release:prepublish:fast and release:ci-check through release-critical tests, then failed only on generated task artifact staging before commit. The checked payload was committed manually as ede2be704."
commit:
  hash: "9fd7ae49ade2480fce6bf785455b8aa907c1e83e"
  message: "Merge pull request #4363 from basilisk-labs/task/202606011006-MTT6E8/prepare-v0-6-14-release-candidate"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: prepare v0.6.14 release candidate from the dedicated branch_pr worktree without publishing npm packages or pushing release tags."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4363 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-01T10:06:49.319Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.14 release candidate from the dedicated branch_pr worktree without publishing npm packages or pushing release tags."
  -
    type: "verify"
    at: "2026-06-01T10:46:07.760Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Release candidate payload prepared for v0.6.14. ap release candidate completed release:prepublish:fast and release:ci-check gates through release-critical tests, then failed only on staging generated task artifacts before commit; payload was committed manually with the release candidate message. release:parity and release state now read 0.6.14."
  -
    type: "status"
    at: "2026-06-02T09:12:32.433Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4363 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-02T09:12:32.438Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication."
sections:
  Summary: |-
    Prepare v0.6.14 release candidate

    Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
  Scope: |-
    - In scope: Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.14 release candidate".
  Plan: "Release candidate plan: version=0.6.14, tag=v0.6.14, plan=.agentplane/.release/plan/2026-06-01T10-05-51-604Z. Run ap release candidate from dedicated branch_pr worktree with --push --yes. Verify release:tasks:check, release:parity, release:check, release:state, release:next-action, and GitHub PR checks. Do not publish npm packages or push release tag in this task."
  Verify Steps: |-
    1. ap release candidate --plan .agentplane/.release/plan/2026-06-01T10-07-08-939Z --push --yes
    2. bun run release:prepublish:fast
    3. bun run release:ci-check
    4. bun run release:tasks:check
    5. bun run release:parity
    6. bun run release:check
    7. bun run release:state
    8. bun run release:next-action
    9. gh pr checks <release-pr> --watch=false
    10. git status --short --untracked-files=all
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T10:46:07.760Z — VERIFY — ok

    By: INTEGRATOR

    Note: Release candidate payload prepared for v0.6.14. ap release candidate completed release:prepublish:fast and release:ci-check gates through release-critical tests, then failed only on staging generated task artifacts before commit; payload was committed manually with the release candidate message. release:parity and release state now read 0.6.14.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T10:44:35.626Z, excerpt_hash=sha256:9ea2c23c0cba85105046312eb898b377640999bdc72f3e641309a22b7b7d97e7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011006-MTT6E8-prepare-v0-6-14-release-candidate/.agentplane/tasks/202606011006-MTT6E8/blueprint/resolved-snapshot.json
    - old_digest: c5f296a6e61d82d44ef7f30e372d4a880911b941e9cb2d3a7ab3f138d1c46491
    - current_digest: c5f296a6e61d82d44ef7f30e372d4a880911b941e9cb2d3a7ab3f138d1c46491
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606011006-MTT6E8

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Close the release candidate PR without merge or revert the release candidate branch. Do not publish npm packages or tags from this task."
  Findings: |-
    - Observation: ap release candidate --push hit E_INTERNAL at git commit because .agentplane/tasks/202606011006-MTT6E8/blueprint/resolved-snapshot.json was generated but not staged.
      Impact: Candidate payload was still generated and heavy gates passed before the staging failure; manual commit preserved the checked payload.
      Resolution: Stage generated task artifacts before candidate commit or fix release candidate staging behavior in a follow-up.
id_source: "generated"
---
## Summary

Prepare v0.6.14 release candidate

Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.

## Scope

- In scope: Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
- Out of scope: unrelated refactors not required for "Prepare v0.6.14 release candidate".

## Plan

Release candidate plan: version=0.6.14, tag=v0.6.14, plan=.agentplane/.release/plan/2026-06-01T10-05-51-604Z. Run ap release candidate from dedicated branch_pr worktree with --push --yes. Verify release:tasks:check, release:parity, release:check, release:state, release:next-action, and GitHub PR checks. Do not publish npm packages or push release tag in this task.

## Verify Steps

1. ap release candidate --plan .agentplane/.release/plan/2026-06-01T10-07-08-939Z --push --yes
2. bun run release:prepublish:fast
3. bun run release:ci-check
4. bun run release:tasks:check
5. bun run release:parity
6. bun run release:check
7. bun run release:state
8. bun run release:next-action
9. gh pr checks <release-pr> --watch=false
10. git status --short --untracked-files=all

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T10:46:07.760Z — VERIFY — ok

By: INTEGRATOR

Note: Release candidate payload prepared for v0.6.14. ap release candidate completed release:prepublish:fast and release:ci-check gates through release-critical tests, then failed only on staging generated task artifacts before commit; payload was committed manually with the release candidate message. release:parity and release state now read 0.6.14.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T10:44:35.626Z, excerpt_hash=sha256:9ea2c23c0cba85105046312eb898b377640999bdc72f3e641309a22b7b7d97e7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606011006-MTT6E8-prepare-v0-6-14-release-candidate/.agentplane/tasks/202606011006-MTT6E8/blueprint/resolved-snapshot.json
- old_digest: c5f296a6e61d82d44ef7f30e372d4a880911b941e9cb2d3a7ab3f138d1c46491
- current_digest: c5f296a6e61d82d44ef7f30e372d4a880911b941e9cb2d3a7ab3f138d1c46491
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606011006-MTT6E8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Close the release candidate PR without merge or revert the release candidate branch. Do not publish npm packages or tags from this task.

## Findings

- Observation: ap release candidate --push hit E_INTERNAL at git commit because .agentplane/tasks/202606011006-MTT6E8/blueprint/resolved-snapshot.json was generated but not staged.
  Impact: Candidate payload was still generated and heavy gates passed before the staging failure; manual commit preserved the checked payload.
  Resolution: Stage generated task artifacts before candidate commit or fix release candidate staging behavior in a follow-up.
