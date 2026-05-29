---
id: "202605290732-0XREE3"
title: "Release v0.6.12"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "publish"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "ap pr check <task-id>"
  - "ap release candidate --plan .agentplane/.release/plan/2026-05-29T07-32-07-845Z --push --yes"
  - "ap verify <task-id> --ok --by CODER --note \"Release checks recorded\""
  - "npm view agentplane version && git ls-remote --tags origin v0.6.12 && gh release view v0.6.12"
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T07:32:33.271Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T08:35:56.976Z"
  updated_by: "CODER"
  note: "Release checks refreshed after bun.lock sync: bun install --frozen-lockfile --ignore-scripts passed; bun run release:check passed with 0.6.12 package metadata; prior release:prepublish:heavy and hosted checks remain covered, pending fresh hosted rerun for the latest branch head."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-29T08:36:09.917Z"
  updated_by: "EVALUATOR"
  note: "v0.6.12 release candidate remains acceptable after the bun.lock review fix. The lockfile now matches package workspace metadata at 0.6.12, frozen lockfile install passes, release:check passes, and the prior heavy candidate gates still establish release readiness subject to fresh hosted checks on the latest branch head."
  evaluated_sha: "76081ab34d03cdf4f68f9314e634c157e58eb1d8"
  blueprint_digest: "5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61"
  evidence_refs:
    - ".agentplane/tasks/202605290732-0XREE3/README.md"
    - ".agentplane/tasks/202605290732-0XREE3/quality/20260529-083609917-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605290732-0XREE3/quality/20260529-083609917-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605290732-0XREE3/quality/20260529-083609917-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605290732-0XREE3/blueprint/resolved-snapshot.json"
    - "bun install --frozen-lockfile --ignore-scripts: pass"
    - "bun run release:check: pass"
    - "GitHub review thread PRRT_kwDORCLmJM6FoDe4 resolved"
  findings:
    - "Resolved PR #4306 review thread by syncing root bun.lock metadata for agentplane, @agentplaneorg/core, @agentplaneorg/recipes, and @agentplane/testkit dependency references to 0.6.12."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Prepare v0.6.12 release candidate from approved release.strict plan, validate release checks, publish PR artifacts, and record evidence."
events:
  -
    type: "status"
    at: "2026-05-29T07:32:51.547Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prepare v0.6.12 release candidate from approved release.strict plan, validate release checks, publish PR artifacts, and record evidence."
  -
    type: "verify"
    at: "2026-05-29T08:25:31.502Z"
    author: "CODER"
    state: "ok"
    note: "Release checks passed: release candidate prepared for v0.6.12; release:prepublish:fast passed; release:prepublish:heavy passed including release-ci-base 67/67 chunks, workflow/significant coverage, and release-critical suite; pre-push standard mode passed before branch update."
  -
    type: "verify"
    at: "2026-05-29T08:35:56.976Z"
    author: "CODER"
    state: "ok"
    note: "Release checks refreshed after bun.lock sync: bun install --frozen-lockfile --ignore-scripts passed; bun run release:check passed with 0.6.12 package metadata; prior release:prepublish:heavy and hosted checks remain covered, pending fresh hosted rerun for the latest branch head."
doc_version: 3
doc_updated_at: "2026-05-29T08:35:56.996Z"
doc_updated_by: "CODER"
description: "Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12."
sections:
  Summary: |-
    Release v0.6.12

    Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
  Scope: |-
    - In scope: Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
    - Out of scope: unrelated refactors not required for "Release v0.6.12".
  Plan: "Release plan: version=0.6.12, tag=v0.6.12, scope=next patch release from current origin/main using branch_pr release.strict route; use .agentplane/.release/plan/2026-05-29T07-32-07-845Z; run release candidate, hosted PR merge, Publish to npm dispatch, and external evidence checks."
  Verify Steps: |-
    1. Run `ap release plan --patch`. Expected: the plan targets `v0.6.12`.
    2. Run `ap release candidate --plan <plan-dir> --push --yes`. Expected: versioned release candidate commit is created and pushed without creating a tag.
    3. Run `ap pr check 202605290732-0XREE3`. Expected: task PR metadata is current and required checks are green or explicitly recorded.
    4. After merge and publish, run `npm view agentplane version`, `git ls-remote --tags origin v0.6.12`, and `gh release view v0.6.12`. Expected: all external surfaces show `v0.6.12`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T08:25:31.502Z — VERIFY — ok

    By: CODER

    Note: Release checks passed: release candidate prepared for v0.6.12; release:prepublish:fast passed; release:prepublish:heavy passed including release-ci-base 67/67 chunks, workflow/significant coverage, and release-critical suite; pre-push standard mode passed before branch update.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T07:32:51.547Z, excerpt_hash=sha256:5eb4a05248f73af6cb4fe68575656b182c87d990abd716dd79704d515a9d87c0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605290732-0XREE3-release-v0-6-12/.agentplane/tasks/202605290732-0XREE3/blueprint/resolved-snapshot.json
    - old_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
    - current_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290732-0XREE3

    ### 2026-05-29T08:35:56.976Z — VERIFY — ok

    By: CODER

    Note: Release checks refreshed after bun.lock sync: bun install --frozen-lockfile --ignore-scripts passed; bun run release:check passed with 0.6.12 package metadata; prior release:prepublish:heavy and hosted checks remain covered, pending fresh hosted rerun for the latest branch head.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T08:25:31.519Z, excerpt_hash=sha256:5eb4a05248f73af6cb4fe68575656b182c87d990abd716dd79704d515a9d87c0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605290732-0XREE3-release-v0-6-12/.agentplane/tasks/202605290732-0XREE3/blueprint/resolved-snapshot.json
    - old_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
    - current_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290732-0XREE3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release candidate commit df47c6576/b390c4c3/df47c657 lineage was amended only for formatting and PR metadata; final HEAD is b390c4c3 before verification refresh.
      Impact: Candidate branch is ready for PR integration; hosted publish still required after merge to main.
      Resolution: Use branch_pr integration, then dispatch hosted Publish to npm with the merged release commit SHA and verify npm/tag/GitHub Release.

    - Observation: Addressed PR #4306 review thread by updating root bun.lock workspace metadata from 0.6.11 to 0.6.12.
      Impact: Fresh publish checkout using frozen lockfile should no longer fail before build/publish.
      Resolution: Wait for hosted PR checks on the updated branch and continue branch_pr integration.
id_source: "generated"
---
## Summary

Release v0.6.12

Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.

## Scope

- In scope: Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
- Out of scope: unrelated refactors not required for "Release v0.6.12".

## Plan

Release plan: version=0.6.12, tag=v0.6.12, scope=next patch release from current origin/main using branch_pr release.strict route; use .agentplane/.release/plan/2026-05-29T07-32-07-845Z; run release candidate, hosted PR merge, Publish to npm dispatch, and external evidence checks.

## Verify Steps

1. Run `ap release plan --patch`. Expected: the plan targets `v0.6.12`.
2. Run `ap release candidate --plan <plan-dir> --push --yes`. Expected: versioned release candidate commit is created and pushed without creating a tag.
3. Run `ap pr check 202605290732-0XREE3`. Expected: task PR metadata is current and required checks are green or explicitly recorded.
4. After merge and publish, run `npm view agentplane version`, `git ls-remote --tags origin v0.6.12`, and `gh release view v0.6.12`. Expected: all external surfaces show `v0.6.12`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T08:25:31.502Z — VERIFY — ok

By: CODER

Note: Release checks passed: release candidate prepared for v0.6.12; release:prepublish:fast passed; release:prepublish:heavy passed including release-ci-base 67/67 chunks, workflow/significant coverage, and release-critical suite; pre-push standard mode passed before branch update.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T07:32:51.547Z, excerpt_hash=sha256:5eb4a05248f73af6cb4fe68575656b182c87d990abd716dd79704d515a9d87c0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605290732-0XREE3-release-v0-6-12/.agentplane/tasks/202605290732-0XREE3/blueprint/resolved-snapshot.json
- old_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
- current_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290732-0XREE3

### 2026-05-29T08:35:56.976Z — VERIFY — ok

By: CODER

Note: Release checks refreshed after bun.lock sync: bun install --frozen-lockfile --ignore-scripts passed; bun run release:check passed with 0.6.12 package metadata; prior release:prepublish:heavy and hosted checks remain covered, pending fresh hosted rerun for the latest branch head.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T08:25:31.519Z, excerpt_hash=sha256:5eb4a05248f73af6cb4fe68575656b182c87d990abd716dd79704d515a9d87c0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605290732-0XREE3-release-v0-6-12/.agentplane/tasks/202605290732-0XREE3/blueprint/resolved-snapshot.json
- old_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
- current_digest: 5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290732-0XREE3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release candidate commit df47c6576/b390c4c3/df47c657 lineage was amended only for formatting and PR metadata; final HEAD is b390c4c3 before verification refresh.
  Impact: Candidate branch is ready for PR integration; hosted publish still required after merge to main.
  Resolution: Use branch_pr integration, then dispatch hosted Publish to npm with the merged release commit SHA and verify npm/tag/GitHub Release.

- Observation: Addressed PR #4306 review thread by updating root bun.lock workspace metadata from 0.6.11 to 0.6.12.
  Impact: Fresh publish checkout using frozen lockfile should no longer fail before build/publish.
  Resolution: Wait for hosted PR checks on the updated branch and continue branch_pr integration.
