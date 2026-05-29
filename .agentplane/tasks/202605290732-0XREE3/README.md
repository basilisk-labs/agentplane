---
id: "202605290732-0XREE3"
title: "Release v0.6.12"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  updated_at: "2026-05-29T08:25:31.502Z"
  updated_by: "CODER"
  note: "Release checks passed: release candidate prepared for v0.6.12; release:prepublish:fast passed; release:prepublish:heavy passed including release-ci-base 67/67 chunks, workflow/significant coverage, and release-critical suite; pre-push standard mode passed before branch update."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-29T08:32:14.670Z"
  updated_by: "EVALUATOR"
  note: "v0.6.12 release candidate satisfies the approved release.strict scope: release plan targets v0.6.12, candidate branch was prepared without tag publication, local fast/heavy release gates passed, PR #4306 hosted checks are stable green, and post-merge hosted npm publish remains the expected external tail."
  evaluated_sha: "33ebb8c617ae86bf25d9c8edecc2490f7dc4bc29"
  blueprint_digest: "5431508d1fc82b5c6f67b63b729406018703b29e6015f73a839161e4631abe61"
  evidence_refs:
    - ".agentplane/tasks/202605290732-0XREE3/README.md"
    - ".agentplane/tasks/202605290732-0XREE3/quality/20260529-083214670-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605290732-0XREE3/quality/20260529-083214670-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605290732-0XREE3/quality/20260529-083214670-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605290732-0XREE3/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-05-29T08-16-14-927Z.json"
    - "ap pr check 202605290732-0XREE3 --hosted: 18/18 passing"
    - "bun run release:prepublish:heavy: release-ci-base 67/67, workflow coverage, significant coverage, release-critical passed"
  findings:
    - "Release notes, social image artifact, package version bump, release parity, lifecycle invariant refresh, release-ci-base 67/67 chunks, workflow/significant coverage, release-critical suite, standard pre-push, and hosted PR checks all passed for the candidate branch."
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
doc_version: 3
doc_updated_at: "2026-05-29T08:25:31.519Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release candidate commit df47c6576/b390c4c3/df47c657 lineage was amended only for formatting and PR metadata; final HEAD is b390c4c3 before verification refresh.
      Impact: Candidate branch is ready for PR integration; hosted publish still required after merge to main.
      Resolution: Use branch_pr integration, then dispatch hosted Publish to npm with the merged release commit SHA and verify npm/tag/GitHub Release.
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release candidate commit df47c6576/b390c4c3/df47c657 lineage was amended only for formatting and PR metadata; final HEAD is b390c4c3 before verification refresh.
  Impact: Candidate branch is ready for PR integration; hosted publish still required after merge to main.
  Resolution: Use branch_pr integration, then dispatch hosted Publish to npm with the merged release commit SHA and verify npm/tag/GitHub Release.
