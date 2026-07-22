---
id: "202607221344-D9JTEY"
title: "Release AgentPlane v0.6.24"
result_summary: "Prepared and locally verified v0.6.24 release candidate with complete notes, generated artifacts, package parity, and evaluator evidence."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T13:44:49.181Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-22T14:30:59.383Z"
  updated_by: "CODER"
  note: "Release candidate v0.6.24 verified: frozen plan covers all 20 commits since v0.6.23; release prepublish completed all 82 isolated groups plus workflow coverage 34/34, significant coverage 204/204, and release-critical 16/16; focused help snapshot 13/13 passed; version parity, incident gate, release check, generated headers, workflow recovery snapshot, routing, doctor, local tarball installation, and package policy all pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-22T14:32:36.789Z"
  updated_by: "EVALUATOR"
  note: "v0.6.24 release candidate remains ready after generated-artifact normalization."
  evaluated_sha: "f1ab68eaa9a377caa76571ed8ac65784e90c218d"
  blueprint_digest: "e77ff3804f61ca6e5bc784823f05f7ec8c4a484ce8bef7b48894a007df5e1a1e"
  evidence_refs:
    - ".agentplane/tasks/202607221344-D9JTEY/README.md"
    - ".agentplane/tasks/202607221344-D9JTEY/quality/20260722-143236789-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221344-D9JTEY/quality/20260722-143236789-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221344-D9JTEY/quality/20260722-143236789-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221344-D9JTEY/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-07-22T14-28-33-962Z.json"
  findings:
    - "The current implementation head adds only the evaluator packet and Prettier normalization for the release-bumped ACR example; all 82 release groups, focused help snapshot, parity, release check, routing, doctor, and generated artifact checks remain satisfied."
commit:
  hash: "9698f5602cb621128dbf7262287ee09ecdd4d4e6"
  message: "✅ D9JTEY task: refresh quality review"
comments:
  -
    author: "CODER"
    body: "Start: prepare v0.6.24 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
  -
    author: "CODER"
    body: "Verified: v0.6.24 release candidate passed full local release gates and is ready for hosted review, protected-main integration, and deferred publication."
events:
  -
    type: "status"
    at: "2026-07-22T13:45:45.760Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.24 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
  -
    type: "verify"
    at: "2026-07-22T14:30:59.383Z"
    author: "CODER"
    state: "ok"
    note: "Release candidate v0.6.24 verified: frozen plan covers all 20 commits since v0.6.23; release prepublish completed all 82 isolated groups plus workflow coverage 34/34, significant coverage 204/204, and release-critical 16/16; focused help snapshot 13/13 passed; version parity, incident gate, release check, generated headers, workflow recovery snapshot, routing, doctor, local tarball installation, and package policy all pass."
  -
    type: "status"
    at: "2026-07-22T14:36:11.273Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.6.24 release candidate passed full local release gates and is ready for hosted review, protected-main integration, and deferred publication."
doc_version: 3
doc_updated_at: "2026-07-22T14:43:17.330Z"
doc_updated_by: "CODER"
description: "Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops."
sections:
  Summary: |-
    Release AgentPlane v0.6.24

    Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.
  Scope: "Release v0.6.24 from main at base SHA 9de894461a781549fd1044d588037870e5532acc. In scope: generated release plan; docs/releases/v0.6.24.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and new feature work."
  Plan: "1. Freeze v0.6.24 from v0.6.23 at base 9de894461a781549fd1044d588037870e5532acc and preserve every planned change. 2. Generate the release plan and write complete English release notes covering all commits since v0.6.23. 3. Generate the branch_pr release candidate so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run evaluator, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged release SHA. 7. Verify tag, GitHub Release, workflow success, and npm parity for every published package; confirm clean main and untouched agentplane-loops."
  Verify Steps: "1. Confirm the release plan targets exactly 0.6.24 from v0.6.23 and every planned commit is represented in docs/releases/v0.6.24.md. 2. Run bun run release:incidents:check, bun run release:check, bun run release:parity, node .agentplane/policy/check-routing.mjs, ap doctor, and bun run test:full-fast. 3. Confirm hosted PR checks pass on the closure head and protected-main integration completes through the queue. 4. Dispatch Publish to npm with the exact merged release SHA and require a successful workflow. 5. Verify tag v0.6.24, GitHub Release v0.6.24, and exact npm 0.6.24 parity for all published packages. 6. Confirm main is clean and the original agentplane-loops checkout remains unchanged."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-22T14:30:59.383Z — VERIFY — ok

    By: CODER

    Note: Release candidate v0.6.24 verified: frozen plan covers all 20 commits since v0.6.23; release prepublish completed all 82 isolated groups plus workflow coverage 34/34, significant coverage 204/204, and release-critical 16/16; focused help snapshot 13/13 passed; version parity, incident gate, release check, generated headers, workflow recovery snapshot, routing, doctor, local tarball installation, and package policy all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T14:30:18.094Z, excerpt_hash=sha256:3c7d316c0e9445e3c074b262b061f601c3c2c96c7f69ce4eb1504a1eae843a24

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221344-D9JTEY-release-v0-6-24/.agentplane/tasks/202607221344-D9JTEY/blueprint/resolved-snapshot.json
    - old_digest: e77ff3804f61ca6e5bc784823f05f7ec8c4a484ce8bef7b48894a007df5e1a1e
    - current_digest: e77ff3804f61ca6e5bc784823f05f7ec8c4a484ce8bef7b48894a007df5e1a1e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221344-D9JTEY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221344-D9JTEY
    - diagnostic_command: agentplane pr check 202607221344-D9JTEY
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, close or revert the release candidate PR without tagging. After publication, do not rewrite v0.6.24; prepare a new patch release that reverts or corrects the defective change and preserve the immutable tag and npm evidence."
  Findings: |-
    - Observation: The release prepublish suite found the top-level CLI help snapshot omitted the shipped context finalize-task command.
      Impact: The release candidate could not pass the immutable help contract even though runtime registration and generated CLI documentation were correct.
      Resolution: Updated only the canonical help snapshot, added the release-note entry, and reran the focused 13-test help snapshot suite successfully.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Release candidate preparation updated .agentplane/WORKFLOW.md to 0.6.24 and the workflow hook refreshed last-known-good.md, leaving the recovery snapshot as a tracked post-commit change.
      Impact: The candidate branch was not clean and recovery would otherwise remain pinned to an older expected CLI version.
      Resolution: Included the refreshed last-known-good snapshot and release-note entry in a dedicated signed release fix commit, then revalidated parity and workflow freshness.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: After the version bump, release:check reported all fourteen checked-in README header SVGs still rendered the previous package version.
      Impact: The v0.6.24 candidate was internally version-consistent but its public generated header assets were stale.
      Resolution: Regenerated all fourteen README header assets for v0.6.24 and verified the freshness check before committing them.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The release gates found a stale CLI help snapshot and versioned generated recovery/header artifacts.
      Impact: Without correction the candidate would fail hosted release validation or expose stale recovery/public documentation state.
      Resolution: Updated the canonical help snapshot, synchronized last-known-good, regenerated v0.6.24 headers, and reran the relevant focused and full release checks.

    - Observation: The pre-push format gate found the release-bumped ACR example was semantically current at 0.6.24 but not normalized by Prettier.
      Impact: The candidate could not be pushed even though release validation and ACR version checks passed.
      Resolution: Formatted only packages/spec/examples/acr.json, preserved the evaluator evidence directory, and committed both before retrying the push.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: Hosted review found bun.lock retained 0.6.23 for publishable workspaces and internal dependencies after the release mutation.
      Impact: Frozen installs could use a stale workspace graph even though package manifests and parity checks reported 0.6.24.
      Resolution: Updated the six workspace and internal dependency entries to 0.6.24, verified frozen install, release parity, and focused release mutation tests, and will refresh the closure head.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  implementation_commit:
    hash: "f1ab68eaa9a377caa76571ed8ac65784e90c218d"
    message: "✅ D9JTEY task: record release verification"
id_source: "generated"
---
## Summary

Release AgentPlane v0.6.24

Prepare release notes and the v0.6.24 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.24 from main at base SHA 9de894461a781549fd1044d588037870e5532acc. In scope: generated release plan; docs/releases/v0.6.24.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and new feature work.

## Plan

1. Freeze v0.6.24 from v0.6.23 at base 9de894461a781549fd1044d588037870e5532acc and preserve every planned change. 2. Generate the release plan and write complete English release notes covering all commits since v0.6.23. 3. Generate the branch_pr release candidate so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run evaluator, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged release SHA. 7. Verify tag, GitHub Release, workflow success, and npm parity for every published package; confirm clean main and untouched agentplane-loops.

## Verify Steps

1. Confirm the release plan targets exactly 0.6.24 from v0.6.23 and every planned commit is represented in docs/releases/v0.6.24.md. 2. Run bun run release:incidents:check, bun run release:check, bun run release:parity, node .agentplane/policy/check-routing.mjs, ap doctor, and bun run test:full-fast. 3. Confirm hosted PR checks pass on the closure head and protected-main integration completes through the queue. 4. Dispatch Publish to npm with the exact merged release SHA and require a successful workflow. 5. Verify tag v0.6.24, GitHub Release v0.6.24, and exact npm 0.6.24 parity for all published packages. 6. Confirm main is clean and the original agentplane-loops checkout remains unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-22T14:30:59.383Z — VERIFY — ok

By: CODER

Note: Release candidate v0.6.24 verified: frozen plan covers all 20 commits since v0.6.23; release prepublish completed all 82 isolated groups plus workflow coverage 34/34, significant coverage 204/204, and release-critical 16/16; focused help snapshot 13/13 passed; version parity, incident gate, release check, generated headers, workflow recovery snapshot, routing, doctor, local tarball installation, and package policy all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T14:30:18.094Z, excerpt_hash=sha256:3c7d316c0e9445e3c074b262b061f601c3c2c96c7f69ce4eb1504a1eae843a24

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221344-D9JTEY-release-v0-6-24/.agentplane/tasks/202607221344-D9JTEY/blueprint/resolved-snapshot.json
- old_digest: e77ff3804f61ca6e5bc784823f05f7ec8c4a484ce8bef7b48894a007df5e1a1e
- current_digest: e77ff3804f61ca6e5bc784823f05f7ec8c4a484ce8bef7b48894a007df5e1a1e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221344-D9JTEY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221344-D9JTEY
- diagnostic_command: agentplane pr check 202607221344-D9JTEY
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, close or revert the release candidate PR without tagging. After publication, do not rewrite v0.6.24; prepare a new patch release that reverts or corrects the defective change and preserve the immutable tag and npm evidence.

## Findings

- Observation: The release prepublish suite found the top-level CLI help snapshot omitted the shipped context finalize-task command.
  Impact: The release candidate could not pass the immutable help contract even though runtime registration and generated CLI documentation were correct.
  Resolution: Updated only the canonical help snapshot, added the release-note entry, and reran the focused 13-test help snapshot suite successfully.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Release candidate preparation updated .agentplane/WORKFLOW.md to 0.6.24 and the workflow hook refreshed last-known-good.md, leaving the recovery snapshot as a tracked post-commit change.
  Impact: The candidate branch was not clean and recovery would otherwise remain pinned to an older expected CLI version.
  Resolution: Included the refreshed last-known-good snapshot and release-note entry in a dedicated signed release fix commit, then revalidated parity and workflow freshness.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: After the version bump, release:check reported all fourteen checked-in README header SVGs still rendered the previous package version.
  Impact: The v0.6.24 candidate was internally version-consistent but its public generated header assets were stale.
  Resolution: Regenerated all fourteen README header assets for v0.6.24 and verified the freshness check before committing them.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The release gates found a stale CLI help snapshot and versioned generated recovery/header artifacts.
  Impact: Without correction the candidate would fail hosted release validation or expose stale recovery/public documentation state.
  Resolution: Updated the canonical help snapshot, synchronized last-known-good, regenerated v0.6.24 headers, and reran the relevant focused and full release checks.

- Observation: The pre-push format gate found the release-bumped ACR example was semantically current at 0.6.24 but not normalized by Prettier.
  Impact: The candidate could not be pushed even though release validation and ACR version checks passed.
  Resolution: Formatted only packages/spec/examples/acr.json, preserved the evaluator evidence directory, and committed both before retrying the push.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: Hosted review found bun.lock retained 0.6.23 for publishable workspaces and internal dependencies after the release mutation.
  Impact: Frozen installs could use a stale workspace graph even though package manifests and parity checks reported 0.6.24.
  Resolution: Updated the six workspace and internal dependency entries to 0.6.24, verified frozen install, release parity, and focused release mutation tests, and will refresh the closure head.
  Promotion: incident-candidate
  Fixability: repo-fixable
