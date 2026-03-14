---
id: "202603141409-ZMR686"
title: "Apply and publish release v0.3.7"
result_summary: "Released v0.3.7 end-to-end: tag v0.3.7 points to bd7e3f494c61ad5c3cd4810aeca30b8678670d83, the GitHub release is published, the docs deploy is live, and npm now serves agentplane and @agentplaneorg/core at 0.3.7."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 26
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "agentplane release plan --patch"
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts"
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T14:09:58.024Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T18:07:15.293Z"
  updated_by: "CODER"
  note: "Verified: agentplane release plan --patch; bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts; bun run release:prepublish; agentplane release apply --push --yes; GitHub Core CI 23093272212, Docs CI 23093272193, Pages Deploy 23093296457, and Publish to npm 23093326043 all succeeded; npm registry shows agentplane=0.3.7 and @agentplaneorg/core=0.3.7."
commit:
  hash: "bd7e3f494c61ad5c3cd4810aeca30b8678670d83"
  message: "✨ release: v0.3.7"
comments:
  -
    author: "CODER"
    body: "Start: validate 0.3.7 backward compatibility from the 0.3.6 line, generate the patch release plan, update the release notes from the plan inventory, pass release prepublish gates, and publish the release only if the compatibility and release checks stay green."
  -
    author: "CODER"
    body: "Blocked: bun run release:prepublish is red for v0.3.7 after the CLI reference refresh, with two deterministic expectation mismatches and multiple timeout failures across dist-guard, release smoke, rebase integration, release apply, and local release E2E coverage."
  -
    author: "CODER"
    body: "Start: all atomic release-unblock tasks are now DONE; rerunning the full release gate, and if it passes, resuming release apply/publish for v0.3.7."
  -
    author: "CODER"
    body: "Blocked: full release:prepublish advanced past the earlier release/apply/lifecycle/doctor blockers, but it still fails on a deeper timeout-only tail in upgrade.merge, integrate rebase failure paths, stale-dist readonly runtime explain, git-utils staged rename coverage, and close-message fallback coverage."
  -
    author: "CODER"
    body: "Start: all final timeout-tail tasks are now DONE; rerun the release verification contract from release plan through full prepublish, and publish v0.3.7 only if every release gate is green."
  -
    author: "CODER"
    body: "Blocked: bun run release:prepublish still fails after the final timeout-tail fixes; the new remaining blockers are readiness JSON contamination, finish/start/cleanup lifecycle regressions, and two local-release E2E auth/sha failure-path timeouts, so release apply/publish for v0.3.7 remains unsafe."
  -
    author: "CODER"
    body: "Start: the final readiness, lifecycle, cleanup, and local-release unblock tasks are now DONE; rerun the full release verification contract and only continue to apply/publish if bun run release:prepublish is fully green."
  -
    author: "CODER"
    body: "Blocked: the latest bun run release:prepublish moved past the earlier readiness, lifecycle, cleanup, local-release, and integrate-rebase blocker layers, but it still fails on 5 tests across release apply, work start, commit wrapper --close --check-only, and workflow verify rework, so release apply/publish for v0.3.7 remains unsafe."
  -
    author: "CODER"
    body: "Start: the final release/apply, work-start, close-wrapper, and verify-rework unblock tasks are now DONE; rerun the full release verification contract from release plan through full prepublish, and only continue to apply/publish if every release gate is green."
  -
    author: "CODER"
    body: "Blocked: the latest release apply retry got past the tracked-tree and release-notes validation blockers, but the embedded bun run release:prepublish rerun still fails on 6 timeout cases across lifecycle start, cleanup-merged, and stale-dist readonly flows, so release apply/publish for v0.3.7 remains unsafe."
  -
    author: "CODER"
    body: "Start: the three final lifecycle, cleanup-merged, and stale-dist timeout tasks are now DONE; rerun the release verification contract from patch planning through full release:prepublish, and only continue to release apply/publish if every gate stays green."
  -
    author: "CODER"
    body: "Verified: the local release gate passed, the release commit and tag were pushed, GitHub Core CI/Docs CI/Pages Deploy/Publish to npm all succeeded, and the npm registry now shows both packages at 0.3.7."
events:
  -
    type: "status"
    at: "2026-03-14T14:10:09.161Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate 0.3.7 backward compatibility from the 0.3.6 line, generate the patch release plan, update the release notes from the plan inventory, pass release prepublish gates, and publish the release only if the compatibility and release checks stay green."
  -
    type: "status"
    at: "2026-03-14T14:25:18.103Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: bun run release:prepublish is red for v0.3.7 after the CLI reference refresh, with two deterministic expectation mismatches and multiple timeout failures across dist-guard, release smoke, rebase integration, release apply, and local release E2E coverage."
  -
    type: "status"
    at: "2026-03-14T15:20:00.571Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: all atomic release-unblock tasks are now DONE; rerunning the full release gate, and if it passes, resuming release apply/publish for v0.3.7."
  -
    type: "status"
    at: "2026-03-14T15:30:08.710Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: full release:prepublish advanced past the earlier release/apply/lifecycle/doctor blockers, but it still fails on a deeper timeout-only tail in upgrade.merge, integrate rebase failure paths, stale-dist readonly runtime explain, git-utils staged rename coverage, and close-message fallback coverage."
  -
    type: "status"
    at: "2026-03-14T15:47:43.280Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: all final timeout-tail tasks are now DONE; rerun the release verification contract from release plan through full prepublish, and publish v0.3.7 only if every release gate is green."
  -
    type: "status"
    at: "2026-03-14T15:59:58.473Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: bun run release:prepublish still fails after the final timeout-tail fixes; the new remaining blockers are readiness JSON contamination, finish/start/cleanup lifecycle regressions, and two local-release E2E auth/sha failure-path timeouts, so release apply/publish for v0.3.7 remains unsafe."
  -
    type: "status"
    at: "2026-03-14T16:26:16.640Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: the final readiness, lifecycle, cleanup, and local-release unblock tasks are now DONE; rerun the full release verification contract and only continue to apply/publish if bun run release:prepublish is fully green."
  -
    type: "status"
    at: "2026-03-14T16:40:25.311Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: the latest bun run release:prepublish moved past the earlier readiness, lifecycle, cleanup, local-release, and integrate-rebase blocker layers, but it still fails on 5 tests across release apply, work start, commit wrapper --close --check-only, and workflow verify rework, so release apply/publish for v0.3.7 remains unsafe."
  -
    type: "status"
    at: "2026-03-14T16:50:04.707Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: the final release/apply, work-start, close-wrapper, and verify-rework unblock tasks are now DONE; rerun the full release verification contract from release plan through full prepublish, and only continue to apply/publish if every release gate is green."
  -
    type: "status"
    at: "2026-03-14T17:21:34.677Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: the latest release apply retry got past the tracked-tree and release-notes validation blockers, but the embedded bun run release:prepublish rerun still fails on 6 timeout cases across lifecycle start, cleanup-merged, and stale-dist readonly flows, so release apply/publish for v0.3.7 remains unsafe."
  -
    type: "status"
    at: "2026-03-14T17:34:05.940Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: the three final lifecycle, cleanup-merged, and stale-dist timeout tasks are now DONE; rerun the release verification contract from patch planning through full release:prepublish, and only continue to release apply/publish if every gate stays green."
  -
    type: "verify"
    at: "2026-03-14T18:07:15.293Z"
    author: "CODER"
    state: "ok"
    note: "Verified: agentplane release plan --patch; bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts; bun run release:prepublish; agentplane release apply --push --yes; GitHub Core CI 23093272212, Docs CI 23093272193, Pages Deploy 23093296457, and Publish to npm 23093326043 all succeeded; npm registry shows agentplane=0.3.7 and @agentplaneorg/core=0.3.7."
  -
    type: "status"
    at: "2026-03-14T18:07:32.153Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the local release gate passed, the release commit and tag were pushed, GitHub Core CI/Docs CI/Pages Deploy/Publish to npm all succeeded, and the npm registry now shows both packages at 0.3.7."
doc_version: 3
doc_updated_at: "2026-03-14T18:07:32.159Z"
doc_updated_by: "CODER"
description: "Audit backward compatibility against older initialized repositories and legacy task-doc states, generate the 0.3.7 patch release plan, update release notes, pass release prepublish gates, apply the release with push, and confirm npm publication for both packages."
sections:
  Summary: |-
    Apply and publish release v0.3.7
    
    Audit backward compatibility against older initialized repositories and legacy task-doc states, generate the 0.3.7 patch release plan, update release notes, pass release prepublish gates, apply the release with push, and confirm npm publication for both packages.
  Scope: |-
    - In scope: Audit backward compatibility against older initialized repositories and legacy task-doc states, generate the 0.3.7 patch release plan, update release notes, pass release prepublish gates, apply the release with push, and confirm npm publication for both packages.
    - Out of scope: unrelated refactors not required for "Apply and publish release v0.3.7".
  Plan: "Release plan: version=0.3.7, tag=v0.3.7, scope=run patch release plan from v0.3.6, audit backward compatibility via legacy upgrade/backend regression suites, update docs/releases/v0.3.7.md from the generated changes inventory, pass bun run release:prepublish, apply the release with --push --yes, then confirm npm versions for agentplane and @agentplaneorg/core."
  Verify Steps: |-
    1. Run `agentplane release plan --patch`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run release:prepublish`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T18:07:15.293Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: agentplane release plan --patch; bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts; bun run release:prepublish; agentplane release apply --push --yes; GitHub Core CI 23093272212, Docs CI 23093272193, Pages Deploy 23093296457, and Publish to npm 23093326043 all succeeded; npm registry shows agentplane=0.3.7 and @agentplaneorg/core=0.3.7.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T18:06:58.984Z, excerpt_hash=sha256:ab66da0a56ec17b51b8d4d44eff1f8fd5292821e077407543ec95117fac7c647
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Facts:
    - agentplane release plan --patch resolved v0.3.7 from the v0.3.6 line.
    - The targeted backward-compatibility suite passed for legacy README v2 recovery, mixed managed-tree drift recovery, and local/Redmine backend mappings.
    - bun run release:prepublish passed end-to-end after the final lifecycle, cleanup-merged, and stale-dist timeout fixes.
    - agentplane release apply --push --yes created release commit bd7e3f494c61ad5c3cd4810aeca30b8678670d83, created/pushed tag v0.3.7, and wrote .agentplane/.release/apply/2026-03-14T17-57-59-819Z.json.
    - GitHub workflows then completed the external publication path: Core CI 23093272212 succeeded, Docs CI 23093272193 succeeded, Pages Deploy 23093296457 succeeded, Publish to npm 23093326043 succeeded, and the GitHub release v0.3.7 is published.
    - npm registry now reports agentplane=0.3.7 and @agentplaneorg/core=0.3.7.
    
    Inference:
    - The full v0.3.7 release path is now healthy from local gate through registry and docs deployment.
    
    Residual risk:
    - Only post-release documentation traceability remains: close this task cleanly and then complete the dependent blog-article task.
id_source: "generated"
---
## Summary

Apply and publish release v0.3.7

Audit backward compatibility against older initialized repositories and legacy task-doc states, generate the 0.3.7 patch release plan, update release notes, pass release prepublish gates, apply the release with push, and confirm npm publication for both packages.

## Scope

- In scope: Audit backward compatibility against older initialized repositories and legacy task-doc states, generate the 0.3.7 patch release plan, update release notes, pass release prepublish gates, apply the release with push, and confirm npm publication for both packages.
- Out of scope: unrelated refactors not required for "Apply and publish release v0.3.7".

## Plan

Release plan: version=0.3.7, tag=v0.3.7, scope=run patch release plan from v0.3.6, audit backward compatibility via legacy upgrade/backend regression suites, update docs/releases/v0.3.7.md from the generated changes inventory, pass bun run release:prepublish, apply the release with --push --yes, then confirm npm versions for agentplane and @agentplaneorg/core.

## Verify Steps

1. Run `agentplane release plan --patch`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run release:prepublish`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T18:07:15.293Z — VERIFY — ok

By: CODER

Note: Verified: agentplane release plan --patch; bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts; bun run release:prepublish; agentplane release apply --push --yes; GitHub Core CI 23093272212, Docs CI 23093272193, Pages Deploy 23093296457, and Publish to npm 23093326043 all succeeded; npm registry shows agentplane=0.3.7 and @agentplaneorg/core=0.3.7.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T18:06:58.984Z, excerpt_hash=sha256:ab66da0a56ec17b51b8d4d44eff1f8fd5292821e077407543ec95117fac7c647

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Facts:
- agentplane release plan --patch resolved v0.3.7 from the v0.3.6 line.
- The targeted backward-compatibility suite passed for legacy README v2 recovery, mixed managed-tree drift recovery, and local/Redmine backend mappings.
- bun run release:prepublish passed end-to-end after the final lifecycle, cleanup-merged, and stale-dist timeout fixes.
- agentplane release apply --push --yes created release commit bd7e3f494c61ad5c3cd4810aeca30b8678670d83, created/pushed tag v0.3.7, and wrote .agentplane/.release/apply/2026-03-14T17-57-59-819Z.json.
- GitHub workflows then completed the external publication path: Core CI 23093272212 succeeded, Docs CI 23093272193 succeeded, Pages Deploy 23093296457 succeeded, Publish to npm 23093326043 succeeded, and the GitHub release v0.3.7 is published.
- npm registry now reports agentplane=0.3.7 and @agentplaneorg/core=0.3.7.

Inference:
- The full v0.3.7 release path is now healthy from local gate through registry and docs deployment.

Residual risk:
- Only post-release documentation traceability remains: close this task cleanly and then complete the dependent blog-article task.
