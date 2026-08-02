---
id: "202608020830-G5AYGC"
title: "Disambiguate release evidence task selection"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evidence"
  - "postrelease"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T08:31:05.125Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T08:43:11.340Z"
  updated_by: "TESTER"
  note: |-
    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts
    Result: pass
    Evidence: 8/8 tests and 32 assertions passed, including tag-only code-task exclusion, semantic ambiguity rejection, evidence rendering, and idempotence.
    Scope: focused release evidence discovery and rendering regression.

    Command: bun scripts/release-task-evidence.mjs prepare --release-sha 9a8c2695c104897b26007a3dada75e37f562a840 --publish-result publish-result.json --repo basilisk-labs/agentplane --json
    Result: pass
    Evidence: actionable=true and task_id=202607221854-XV67TD with no ambiguity.
    Scope: authoritative v0.7.0 publish-result resolution.

    Command: rg release_sha, ghcr, and external channels in .agentplane/tasks/202607221854-XV67TD/README.md
    Result: pass
    Evidence: exact release SHA plus GHCR and Homebrew, Scoop, setup-agentplane verification SHAs are recorded; verification attempts remain 0.
    Scope: hosted publication evidence completeness.

    Command: ap doctor and node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: doctor OK with pre-existing non-blocking archive warnings; policy routing OK.
    Scope: repository workflow and policy gates.

    Command: bun run ci:contract and bun run test:critical
    Result: pass
    Evidence: full static contract passed; all 12/12 critical CLI chunks passed at implementation commit c1441d8fbae4122d351bd395ee2724a893e49f37.
    Scope: regression matrix and critical CLI compatibility.

    Command: git diff --name-only origin/main...HEAD, git rev-list -n 1 v0.7.0, and npm view agentplane@0.7.0 version
    Result: pass
    Evidence: diff is limited to evidence implementation/tests/task artifacts; tag remains at 9a8c2695c104897b26007a3dada75e37f562a840 and public CLI remains 0.7.0.
    Scope: approved boundary and release immutability.
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T08:44:26.409Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "c1441d8fbae4122d351bd395ee2724a893e49f37"
  blueprint_digest: "378f5e501f18163398259c351c708e9c0616ae6f593384dded2450166b397f57"
  evidence_refs:
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608020830-G5AYGC/README.md"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608020830-G5AYGC/quality/20260802-084351416-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The read-only evaluator sandbox cannot independently rerun the focused test because Bun cannot create its temporary directory; frozen verification records a successful writable-environment run at the evaluated SHA."
commit:
  hash: "c1441d8fbae4122d351bd395ee2724a893e49f37"
  message: "🐛 G5AYGC evidence: disambiguate release tasks"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: release evidence discovery now requires semantic release kind or scope; regression coverage excludes tag-only code tasks; hosted v0.7.0 proof records npm, GHCR, GitHub Release, external channel SHAs, and preserves verification attempts. Checks: focused 8/8, critical CLI 12/12 chunks, ci:contract, typecheck, task-state, doctor, routing, and postpublish audit passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-02T08:31:33.718Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T08:42:06.382Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: release evidence discovery now requires semantic release kind or scope; regression coverage excludes tag-only code tasks; hosted v0.7.0 proof records npm, GHCR, GitHub Release, external channel SHAs, and preserves verification attempts. Checks: focused 8/8, critical CLI 12/12 chunks, ci:contract, typecheck, task-state, doctor, routing, and postpublish audit passed."
  -
    type: "verify"
    at: "2026-08-02T08:43:11.340Z"
    author: "TESTER"
    state: "ok"
    note: |-
      Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts
      Result: pass
      Evidence: 8/8 tests and 32 assertions passed, including tag-only code-task exclusion, semantic ambiguity rejection, evidence rendering, and idempotence.
      Scope: focused release evidence discovery and rendering regression.

      Command: bun scripts/release-task-evidence.mjs prepare --release-sha 9a8c2695c104897b26007a3dada75e37f562a840 --publish-result publish-result.json --repo basilisk-labs/agentplane --json
      Result: pass
      Evidence: actionable=true and task_id=202607221854-XV67TD with no ambiguity.
      Scope: authoritative v0.7.0 publish-result resolution.

      Command: rg release_sha, ghcr, and external channels in .agentplane/tasks/202607221854-XV67TD/README.md
      Result: pass
      Evidence: exact release SHA plus GHCR and Homebrew, Scoop, setup-agentplane verification SHAs are recorded; verification attempts remain 0.
      Scope: hosted publication evidence completeness.

      Command: ap doctor and node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: doctor OK with pre-existing non-blocking archive warnings; policy routing OK.
      Scope: repository workflow and policy gates.

      Command: bun run ci:contract and bun run test:critical
      Result: pass
      Evidence: full static contract passed; all 12/12 critical CLI chunks passed at implementation commit c1441d8fbae4122d351bd395ee2724a893e49f37.
      Scope: regression matrix and critical CLI compatibility.

      Command: git diff --name-only origin/main...HEAD, git rev-list -n 1 v0.7.0, and npm view agentplane@0.7.0 version
      Result: pass
      Evidence: diff is limited to evidence implementation/tests/task artifacts; tag remains at 9a8c2695c104897b26007a3dada75e37f562a840 and public CLI remains 0.7.0.
      Scope: approved boundary and release immutability.
  -
    type: "status"
    at: "2026-08-02T08:45:07.410Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-02T08:45:07.410Z"
doc_updated_by: "CODER"
description: "Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD."
sections:
  Summary: |-
    Disambiguate release evidence task selection

    Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD.
  Scope: |-
    - In scope: make release evidence discovery require semantic release classification (`task_kind=release` or `mutation_scope=release`); add regression coverage for code tasks that merely carry a `release` tag; apply the authoritative publish-result from run 30739430330 to release task 202607221854-XV67TD.
    - Out of scope: republishing v0.7.0, moving its tag, changing release contents, or unrelated task-classification refactors.
  Plan: |-
    1. Reproduce the ambiguous release-task selection against the authoritative v0.7.0 publish result and isolate the classifier boundary.
    2. Tighten release-task discovery to semantic release kind/scope and add a regression fixture proving tag-only code tasks are excluded.
    3. Run focused tests and repository gates, then apply the exact hosted publish evidence to task 202607221854-XV67TD.
    4. Record independent verification and integrate the follow-up through the protected branch workflow.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: all tests pass, including a case where a DONE code task tagged `release` and `v0.7` is not selected as the release task.
    2. Run `bun scripts/release-task-evidence.mjs prepare --publish-result <authoritative-v0.7.0-result> --json`. Expected: it resolves exactly task `202607221854-XV67TD` with no ambiguity.
    3. Run `bun scripts/release-task-evidence.mjs apply --publish-result <authoritative-v0.7.0-result> --task-id 202607221854-XV67TD --json`, then inspect that task README. Expected: exact SHA, tag, workflow run, npm, GHCR, GitHub Release, and external distribution evidence are recorded without changing release state.
    4. Run `ap doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: both repository gates pass.
    5. Review the diff against scope. Expected: no tag movement, republish, version change, or unrelated task mutation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T08:43:11.340Z — VERIFY — ok

    By: TESTER

    Note: Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts\nResult: pass\nEvidence: 8/8 tests and 32 assertions passed, including tag-only code-task exclusion, semantic ambiguity rejection, evidence rendering, and idempotence.\nScope: focused release evidence discovery and rendering regression.\n\nCommand: bun scripts/release-task-evidence.mjs prepare --release-sha 9a8c2695c104897b26007a3dada75e37f562a840 --publish-result publish-result.json --repo basilisk-labs/agentplane --json\nResult: pass\nEvidence: actionable=true and task_id=202607221854-XV67TD with no ambiguity.\nScope: authoritative v0.7.0 publish-result resolution.\n\nCommand: rg release_sha, ghcr, and external channels in .agentplane/tasks/202607221854-XV67TD/README.md\nResult: pass\nEvidence: exact release SHA plus GHCR and Homebrew, Scoop, setup-agentplane verification SHAs are recorded; verification attempts remain 0.\nScope: hosted publication evidence completeness.\n\nCommand: ap doctor and node .agentplane/policy/check-routing.mjs\nResult: pass\nEvidence: doctor OK with pre-existing non-blocking archive warnings; policy routing OK.\nScope: repository workflow and policy gates.\n\nCommand: bun run ci:contract and bun run test:critical\nResult: pass\nEvidence: full static contract passed; all 12/12 critical CLI chunks passed at implementation commit c1441d8fbae4122d351bd395ee2724a893e49f37.\nScope: regression matrix and critical CLI compatibility.\n\nCommand: git diff --name-only origin/main...HEAD, git rev-list -n 1 v0.7.0, and npm view agentplane@0.7.0 version\nResult: pass\nEvidence: diff is limited to evidence implementation/tests/task artifacts; tag remains at 9a8c2695c104897b26007a3dada75e37f562a840 and public CLI remains 0.7.0.\nScope: approved boundary and release immutability.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T08:42:06.382Z, excerpt_hash=sha256:b77945680a44bf525ab38bbc379f31e0ae045f32d413ca4f3718542a8e23e0cb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020830-G5AYGC-disambiguate-release-evidence-task-selection/.agentplane/tasks/202608020830-G5AYGC/blueprint/resolved-snapshot.json
    - old_digest: 378f5e501f18163398259c351c708e9c0616ae6f593384dded2450166b397f57
    - current_digest: 378f5e501f18163398259c351c708e9c0616ae6f593384dded2450166b397f57
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608020830-G5AYGC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608020830-G5AYGC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: release-task-evidence treated any DONE task tagged release as a release task, so code task 202607221908-PWFH5K made v0.7.0 discovery ambiguous.
      Impact: The publish workflow skipped its optional task-evidence follow-up even though publish-result remained authoritative and all release channels succeeded.
      Resolution: Require semantic task_kind=release or mutation_scope=release, cover the tag-only code-task regression, preserve verification attempts, and record GHCR plus external distribution evidence.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "9a8c2695c104897b26007a3dada75e37f562a840"
    version: 1
id_source: "generated"
---
## Summary

Disambiguate release evidence task selection

Fix post-publish evidence discovery so code tasks tagged release are not treated as release tasks; add regression coverage and record the authoritative v0.7.0 publish result on task 202607221854-XV67TD.

## Scope

- In scope: make release evidence discovery require semantic release classification (`task_kind=release` or `mutation_scope=release`); add regression coverage for code tasks that merely carry a `release` tag; apply the authoritative publish-result from run 30739430330 to release task 202607221854-XV67TD.
- Out of scope: republishing v0.7.0, moving its tag, changing release contents, or unrelated task-classification refactors.

## Plan

1. Reproduce the ambiguous release-task selection against the authoritative v0.7.0 publish result and isolate the classifier boundary.
2. Tighten release-task discovery to semantic release kind/scope and add a regression fixture proving tag-only code tasks are excluded.
3. Run focused tests and repository gates, then apply the exact hosted publish evidence to task 202607221854-XV67TD.
4. Record independent verification and integrate the follow-up through the protected branch workflow.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: all tests pass, including a case where a DONE code task tagged `release` and `v0.7` is not selected as the release task.
2. Run `bun scripts/release-task-evidence.mjs prepare --publish-result <authoritative-v0.7.0-result> --json`. Expected: it resolves exactly task `202607221854-XV67TD` with no ambiguity.
3. Run `bun scripts/release-task-evidence.mjs apply --publish-result <authoritative-v0.7.0-result> --task-id 202607221854-XV67TD --json`, then inspect that task README. Expected: exact SHA, tag, workflow run, npm, GHCR, GitHub Release, and external distribution evidence are recorded without changing release state.
4. Run `ap doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: both repository gates pass.
5. Review the diff against scope. Expected: no tag movement, republish, version change, or unrelated task mutation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T08:43:11.340Z — VERIFY — ok

By: TESTER

Note: Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts\nResult: pass\nEvidence: 8/8 tests and 32 assertions passed, including tag-only code-task exclusion, semantic ambiguity rejection, evidence rendering, and idempotence.\nScope: focused release evidence discovery and rendering regression.\n\nCommand: bun scripts/release-task-evidence.mjs prepare --release-sha 9a8c2695c104897b26007a3dada75e37f562a840 --publish-result publish-result.json --repo basilisk-labs/agentplane --json\nResult: pass\nEvidence: actionable=true and task_id=202607221854-XV67TD with no ambiguity.\nScope: authoritative v0.7.0 publish-result resolution.\n\nCommand: rg release_sha, ghcr, and external channels in .agentplane/tasks/202607221854-XV67TD/README.md\nResult: pass\nEvidence: exact release SHA plus GHCR and Homebrew, Scoop, setup-agentplane verification SHAs are recorded; verification attempts remain 0.\nScope: hosted publication evidence completeness.\n\nCommand: ap doctor and node .agentplane/policy/check-routing.mjs\nResult: pass\nEvidence: doctor OK with pre-existing non-blocking archive warnings; policy routing OK.\nScope: repository workflow and policy gates.\n\nCommand: bun run ci:contract and bun run test:critical\nResult: pass\nEvidence: full static contract passed; all 12/12 critical CLI chunks passed at implementation commit c1441d8fbae4122d351bd395ee2724a893e49f37.\nScope: regression matrix and critical CLI compatibility.\n\nCommand: git diff --name-only origin/main...HEAD, git rev-list -n 1 v0.7.0, and npm view agentplane@0.7.0 version\nResult: pass\nEvidence: diff is limited to evidence implementation/tests/task artifacts; tag remains at 9a8c2695c104897b26007a3dada75e37f562a840 and public CLI remains 0.7.0.\nScope: approved boundary and release immutability.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T08:42:06.382Z, excerpt_hash=sha256:b77945680a44bf525ab38bbc379f31e0ae045f32d413ca4f3718542a8e23e0cb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020830-G5AYGC-disambiguate-release-evidence-task-selection/.agentplane/tasks/202608020830-G5AYGC/blueprint/resolved-snapshot.json
- old_digest: 378f5e501f18163398259c351c708e9c0616ae6f593384dded2450166b397f57
- current_digest: 378f5e501f18163398259c351c708e9c0616ae6f593384dded2450166b397f57
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608020830-G5AYGC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608020830-G5AYGC
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

- Observation: release-task-evidence treated any DONE task tagged release as a release task, so code task 202607221908-PWFH5K made v0.7.0 discovery ambiguous.
  Impact: The publish workflow skipped its optional task-evidence follow-up even though publish-result remained authoritative and all release channels succeeded.
  Resolution: Require semantic task_kind=release or mutation_scope=release, cover the tag-only code-task regression, preserve verification attempts, and record GHCR plus external distribution evidence.
  Promotion: incident-candidate
  Fixability: repo-fixable
