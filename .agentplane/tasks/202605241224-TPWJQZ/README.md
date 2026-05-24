---
id: "202605241224-TPWJQZ"
title: "Release AgentPlane v0.6.9"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-24T12:24:35.492Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-24T12:38:28.864Z"
  updated_by: "CODER"
  note: "Release candidate checks passed for v0.6.9: registry availability, fast release prepublish gate, policy routing, and doctor all passed on the task branch."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-24T12:39:30.371Z"
  updated_by: "EVALUATOR"
  note: "v0.6.9 release candidate is ready for PR integration after local release gates passed."
  evaluated_sha: "f268ac0165e63dc13781c260c42b04a2b2002c0a"
  blueprint_digest: "986713dcaf024d1df9d9c2e432630cc50bebb5ef933d892a58ddf8041c377792"
  evidence_refs:
    - ".agentplane/tasks/202605241224-TPWJQZ/README.md"
    - ".agentplane/tasks/202605241224-TPWJQZ/quality/20260524-123930371-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605241224-TPWJQZ/quality/20260524-123930371-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605241224-TPWJQZ/quality/20260524-123930371-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605241224-TPWJQZ/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-05-24T12-33-51-030Z.json"
    - "docs/releases/v0.6.9.md"
    - "website/static/img/social/docs/releases/v0.6.9.png"
  findings:
    - "Release candidate commit 73e00973261364135cc4ed7e477fc1ad58930519 prepared the v0.6.9 package and notes changes without creating a local tag; support artifact commit f268ac016 added the generated release social image and last-known-good version drift. Registry availability, release:prepublish:fast, policy routing, and doctor passed on the task branch."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: prepare the v0.6.9 patch release candidate in the dedicated branch_pr worktree, using the approved release plan, branch_pr candidate route, release gates, GitHub PR merge, and hosted publish evidence checks."
events:
  -
    type: "status"
    at: "2026-05-24T12:26:01.373Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare the v0.6.9 patch release candidate in the dedicated branch_pr worktree, using the approved release plan, branch_pr candidate route, release gates, GitHub PR merge, and hosted publish evidence checks."
  -
    type: "verify"
    at: "2026-05-24T12:38:28.864Z"
    author: "CODER"
    state: "ok"
    note: "Release candidate checks passed for v0.6.9: registry availability, fast release prepublish gate, policy routing, and doctor all passed on the task branch."
doc_version: 3
doc_updated_at: "2026-05-24T12:38:28.930Z"
doc_updated_by: "CODER"
description: "Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence."
sections:
  Summary: |-
    Prepare v0.6.9 patch release

    Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence.
  Scope: |-
    - In scope: Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.9 patch release".
  Plan: "Release plan: version=v0.6.9, tag=v0.6.9, scope=next patch release candidate from current main. Route: branch_pr only; create a dedicated task worktree/branch, generate fresh patch release plan, bump public package versions, generate release notes, run release candidate/prepublish gates, open and merge the release PR through GitHub, then dispatch Publish release from the merged release commit SHA and verify npm/tag/GitHub release evidence. Stop on dirty tree, active incidents, task registry blocker, parity failure, unavailable target version, CI failure, or publication drift."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare v0.6.9 patch release". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare v0.6.9 patch release". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-24T12:38:28.864Z — VERIFY — ok

    By: CODER

    Note: Release candidate checks passed for v0.6.9: registry availability, fast release prepublish gate, policy routing, and doctor all passed on the task branch.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T12:26:01.373Z, excerpt_hash=sha256:c3f649fcbf405541e6937dda0335cb8ab99256a793b43eaaf40373e693eb04cc

    Details:

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605241224-TPWJQZ-prepare-v0-6-9-patch-release/.agentplane/tasks/202605241224-TPWJQZ/blueprint/resolved-snapshot.json
    - old_digest: 712de790e55143b41c6846d95ec41baa676d28f7f04a198f61789a50312349de
    - current_digest: 986713dcaf024d1df9d9c2e432630cc50bebb5ef933d892a58ddf8041c377792
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605241224-TPWJQZ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202605241224-TPWJQZ; Result: pass; Evidence: task state OK (tasks=2836). Scope: release task registry gate. Command: bun run release:incidents:check; Result: pass; Evidence: no active incident entries. Scope: release incident gate. Command: ap release plan --patch; Result: pass; Evidence: plan .agentplane/.release/plan/2026-05-24T12-27-49-049Z targets v0.6.9. Scope: release plan. Command: bun run release:check:registry; Result: pass; Evidence: npm version availability check passed for 0.6.9. Scope: npm target version. Command: ap release candidate; Result: pass; Evidence: commit 73e00973261364135cc4ed7e477fc1ad58930519 prepared without local tag. Scope: branch_pr release candidate. Command: bun run docs:social:generate && bun run release:prepublish:fast; Result: pass; Evidence: generated one social image, checked 200 docs social images, package tarball policy OK, blueprint release gate OK. Scope: release package/social gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway. Command: ap doctor; Result: pass; Evidence: doctor OK with resolved agentplane/core 0.6.9. Scope: runtime parity.
      Impact: The release candidate is locally ready for PR publication and hosted CI; final npm publication still depends on protected-base merge and explicit Publish release dispatch.
      Resolution: Proceed through branch_pr PR, hosted checks, GitHub merge, publish workflow dispatch, and external npm/tag/GitHub Release verification.
id_source: "generated"
---
## Summary

Prepare v0.6.9 patch release

Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence.

## Scope

- In scope: Prepare and publish the next patch release candidate through the branch_pr release workflow, then verify hosted publication evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.6.9 patch release".

## Plan

Release plan: version=v0.6.9, tag=v0.6.9, scope=next patch release candidate from current main. Route: branch_pr only; create a dedicated task worktree/branch, generate fresh patch release plan, bump public package versions, generate release notes, run release candidate/prepublish gates, open and merge the release PR through GitHub, then dispatch Publish release from the merged release commit SHA and verify npm/tag/GitHub release evidence. Stop on dirty tree, active incidents, task registry blocker, parity failure, unavailable target version, CI failure, or publication drift.

## Verify Steps

PLANNER fallback scaffold for "Prepare v0.6.9 patch release". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare v0.6.9 patch release". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-24T12:38:28.864Z — VERIFY — ok

By: CODER

Note: Release candidate checks passed for v0.6.9: registry availability, fast release prepublish gate, policy routing, and doctor all passed on the task branch.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T12:26:01.373Z, excerpt_hash=sha256:c3f649fcbf405541e6937dda0335cb8ab99256a793b43eaaf40373e693eb04cc

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605241224-TPWJQZ-prepare-v0-6-9-patch-release/.agentplane/tasks/202605241224-TPWJQZ/blueprint/resolved-snapshot.json
- old_digest: 712de790e55143b41c6846d95ec41baa676d28f7f04a198f61789a50312349de
- current_digest: 986713dcaf024d1df9d9c2e432630cc50bebb5ef933d892a58ddf8041c377792
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605241224-TPWJQZ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: node scripts/release/check-task-registry-ready.mjs --ignore-release-task 202605241224-TPWJQZ; Result: pass; Evidence: task state OK (tasks=2836). Scope: release task registry gate. Command: bun run release:incidents:check; Result: pass; Evidence: no active incident entries. Scope: release incident gate. Command: ap release plan --patch; Result: pass; Evidence: plan .agentplane/.release/plan/2026-05-24T12-27-49-049Z targets v0.6.9. Scope: release plan. Command: bun run release:check:registry; Result: pass; Evidence: npm version availability check passed for 0.6.9. Scope: npm target version. Command: ap release candidate; Result: pass; Evidence: commit 73e00973261364135cc4ed7e477fc1ad58930519 prepared without local tag. Scope: branch_pr release candidate. Command: bun run docs:social:generate && bun run release:prepublish:fast; Result: pass; Evidence: generated one social image, checked 200 docs social images, package tarball policy OK, blueprint release gate OK. Scope: release package/social gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway. Command: ap doctor; Result: pass; Evidence: doctor OK with resolved agentplane/core 0.6.9. Scope: runtime parity.
  Impact: The release candidate is locally ready for PR publication and hosted CI; final npm publication still depends on protected-base merge and explicit Publish release dispatch.
  Resolution: Proceed through branch_pr PR, hosted checks, GitHub merge, publish workflow dispatch, and external npm/tag/GitHub Release verification.
