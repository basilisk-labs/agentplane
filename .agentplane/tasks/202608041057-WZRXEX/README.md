---
id: "202608041057-WZRXEX"
title: "Disambiguate hosted release evidence task selection"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "post-merge-fix"
  - "release"
task_kind: "release"
mutation_scope: "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T10:58:01.027Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T12:47:50.392Z"
  updated_by: "TESTER"
  note: "P1 fix verified against refreshed release blueprint snapshot"
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-04T12:45:34.071Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "797de145457d7ef41951b3e6dd13360177ed8ffa"
  blueprint_digest: "6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6"
  evidence_refs:
    - ".agentplane/tasks/202608041057-WZRXEX/quality/20260804-124533682-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/20260804-124533682-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/objects/sha256/3bd66ff0bb3575297bbef5e0b86456f88a89c6d472e8066917bdc55fa5e934ea.md"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/20260804-124533682-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/20260804-124533682-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/20260804-124533682-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608041057-WZRXEX/README.md"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/objects/sha256/87e96bd439fabc13f9dab3c4934fc20e821ad9676a5afaf5fb6794ddb81453ac.patch"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/objects/sha256/8e1e16359bef4a192a77427044b7c948187657e12c4e0aa4f3528372529d33ba.json"
    - ".agentplane/tasks/202608041057-WZRXEX/verification/20260804124453273-a347d04f52a022f9.json"
    - ".agentplane/tasks/202608041057-WZRXEX/quality/objects/sha256/1f3ab000c7900312d8e1a5f8967c6167584239c3a74d9f6ac1a6ad59ed128e61.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "Current task metadata now supplies task_kind=release and mutation_scope=release, so registry matching for v0.7.2 returns WZRXEX; the exact release-commit intersection excludes YCNM1S even though that prior task README is touched in the same merge."
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-04T12:49:00.184Z"
commit:
  hash: "dd7f6169f177f0fdeddb8dfbb89a81ca733291fd"
  message: "🧩 WZRXEX task: bind verification to release snapshot"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: v0.7.2 release evidence task selection is deterministic, compatibility fixtures are aligned, and full release:prepublish passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-04T10:58:31.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-04T12:01:40.038Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: v0.7.2 release evidence task selection is deterministic, compatibility fixtures are aligned, and full release:prepublish passed."
  -
    type: "verify"
    at: "2026-08-04T12:01:59.646Z"
    author: "TESTER"
    state: "ok"
    note: "v0.7.2 release-evidence selection and release candidate verified."
  -
    type: "verify"
    at: "2026-08-04T12:04:12.205Z"
    author: "TESTER"
    state: "ok"
    note: "v0.7.2 release-evidence selection and release candidate verified."
  -
    type: "status"
    at: "2026-08-04T12:05:26.810Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-04T12:28:47.188Z"
    author: "TESTER"
    state: "ok"
    note: "Final v0.7.2 candidate verification passed"
  -
    type: "status"
    at: "2026-08-04T12:31:49.510Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-04T12:34:33.815Z"
    author: "TESTER"
    state: "ok"
    note: "Final v0.7.2 candidate and archived-incident state verified"
  -
    type: "status"
    at: "2026-08-04T12:36:27.896Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-04T12:44:53.273Z"
    author: "TESTER"
    state: "ok"
    note: "P1 prior-release evidence collision is fixed and verified"
  -
    type: "verify"
    at: "2026-08-04T12:47:50.392Z"
    author: "TESTER"
    state: "ok"
    note: "P1 fix verified against refreshed release blueprint snapshot"
  -
    type: "status"
    at: "2026-08-04T12:49:00.184Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-04T13:09:19.816Z"
doc_updated_by: "DEUS"
description: "Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release."
sections:
  Summary: |-
    Disambiguate hosted release evidence task selection

    Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.
  Scope: |-
    - In scope: Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.
    - Out of scope: unrelated refactors not required for "Disambiguate hosted release evidence task selection".
  Plan: "Patch-release plan: version=0.7.2, tag=v0.7.2. 1. Reproduce the hosted publish evidence ambiguity when several DONE release tasks mention one version. 2. Change release-task selection to prefer the unique exact-release-commit task candidate, intersected with version-qualified release tasks, and retain fail-closed behavior for genuine ambiguity. 3. Add focused unit/integration regressions covering unique commit match, multiple registry matches, fallback, and ambiguity. 4. Apply the successful v0.7.1 publish-result to task 202608021232-YCNM1S so its canonical README records hosted publication while preserving unavailable token provenance. 5. Run targeted tests, release contracts, full prepublish, and independent evaluator on the final candidate. 6. Merge through the integration queue, publish v0.7.2 for the exact merged SHA, and verify npm, tag, GitHub Release, clean install, postpublish audit, evidence follow-up, main parity, and branch cleanup. Stop on product drift beyond this repair, tag/version drift, active incidents, or any failed required gate."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: exact-commit task selection, version fallback, and genuine ambiguity cases pass.
    2. Run the `prepare` command against the archived v0.7.1 `publish-result.json`. Expected: task `202608021232-YCNM1S` is selected despite other DONE v0.7.1 release tasks.
    3. Run `bun run ci:contract` and `bun run release:prepublish`. Expected: all blocking contracts and release gates pass on the final v0.7.2 candidate.
    4. Verify task `202608021232-YCNM1S` contains hosted publish evidence for SHA `f519d9518c34226075a61d2b01b936127a77e587` and retains explicit unavailable token provenance.
    5. After merge and publish, verify npm `latest` for all three packages is `0.7.2`, tag and GitHub Release `v0.7.2` point to the exact merged SHA, a clean install reports `0.7.2`, postpublish audit passes from the workflow artifact, release evidence follow-up succeeds, main is clean and matches origin, and merged branches/worktrees are removed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T12:01:59.646Z — VERIFY — ok

    By: TESTER

    Note: v0.7.2 release-evidence selection and release candidate verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:01:40.038Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

    Details:

    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; bun run release:prepublish; archived v0.7.1 prepare replay.
    Result: PASS — 9/9 targeted release-evidence tests, 9/9 compatibility tests, 101/101 release-ci chunks, 50/50 workflow coverage, 204/204 significant coverage, 16/16 release-critical tests; replay selected task 202608021232-YCNM1S.
    Evidence: implementation f0d58a4092e7a659538a32359a4d57a86ae17645; v0.7.1 release SHA f519d9518c34226075a61d2b01b936127a77e587; hosted evidence and explicit supervisor_journal_missing token provenance in .agentplane/tasks/202608021232-YCNM1S/README.md.
    Scope: release tooling, regression tests, task evidence, and v0.7.2 release assets only; no AgentPlane runtime/core behavior change and no provider qualification rerun required.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
    - old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608041057-WZRXEX
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T12:04:12.205Z — VERIFY — ok

    By: TESTER

    Note: v0.7.2 release-evidence selection and release candidate verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:02:00.726Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

    Details:

    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; bun run release:prepublish; archived v0.7.1 prepare replay.
    Result: pass
    Evidence: 9/9 targeted release-evidence tests; 9/9 compatibility tests; 101/101 release-ci chunks; 50/50 workflow coverage; 204/204 significant coverage; 16/16 release-critical tests; replay selected 202608021232-YCNM1S for f519d9518c34226075a61d2b01b936127a77e587; token provenance remains supervisor_journal_missing/unavailable.
    Scope: implementation f0d58a4092e7a659538a32359a4d57a86ae17645; release tooling, regression tests, task evidence, and v0.7.2 release assets only; no AgentPlane runtime/core behavior change.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
    - old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608041057-WZRXEX
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T12:28:47.188Z — VERIFY — ok

    By: TESTER

    Note: Final v0.7.2 candidate verification passed
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:05:26.821Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

    Details:

    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; archived v0.7.1 publish-result prepare replay; bun run ci:contract; bun run release:prepublish
    Result: pass
    Evidence: release evidence regression 9/9; real v0.7.1 replay selected 202608021232-YCNM1S; active release incident gate passed with resolved incident archived; final prepublish passed 101/101 release-ci chunks, 50/50 workflow tests, 204/204 significant tests, 16/16 release-critical tests, and 8/8 install migration scenarios
    Scope: final implementation head f3000de59d32d425f4dda4eeea91cb8882e1872e

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
    - old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

    ### 2026-08-04T12:34:33.815Z — VERIFY — ok

    By: TESTER

    Note: Final v0.7.2 candidate and archived-incident state verified
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:31:49.536Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

    Details:

    Command: git diff --exit-code f3000de59d32d425f4dda4eeea91cb8882e1872e..8dc72497a25202a38b50ea09a8332a0cb59c7dcf excluding task artifacts; bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; node scripts/check-release-incidents.mjs; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: non-task repository tree is identical to f3000de59d32d425f4dda4eeea91cb8882e1872e, where final release:prepublish passed 101/101 base chunks, 50/50 workflow, 204/204 significant, 16/16 release-critical, and 8/8 migrations; current targeted regression passed 9/9; active incident gate passed; archived finding no longer promotes
    Scope: final implementation head 8dc72497a25202a38b50ea09a8332a0cb59c7dcf

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
    - old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

    ### 2026-08-04T12:44:53.273Z — VERIFY — ok

    By: TESTER

    Note: P1 prior-release evidence collision is fixed and verified
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:36:27.918Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

    Details:

    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun run ci:contract; node scripts/check-release-incidents.mjs; product-tree comparison against 8dc72497a25202a38b50ea09a8332a0cb59c7dcf
    Result: pass
    Evidence: targeted release-evidence suite 10/10 including current v0.7.2 plus prior v0.7.1 evidence collision; current task is independently version-qualified with task_kind=release and mutation_scope=release; full ci:contract and active incident gate pass; product implementation tree remains unchanged from the fully prepublish-tested candidate
    Scope: implementation head 797de145457d7ef41951b3e6dd13360177ed8ffa

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
    - old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
    - current_digest: 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

    ### 2026-08-04T12:47:50.392Z — VERIFY — ok

    By: TESTER

    Note: P1 fix verified against refreshed release blueprint snapshot
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:45:34.093Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

    Details:

    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun run ci:contract; agentplane blueprint snapshot 202608041057-WZRXEX
    Result: pass
    Evidence: release-evidence suite 10/10; full contract pass; release.strict snapshot current with digest 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6 and unchanged route
    Scope: implementation head 797de1454

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
    - old_digest: 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6
    - current_digest: 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

    <!-- BEGIN HOSTED PUBLISH EVIDENCE -->
    ### Hosted publish

    - State: ok
    - Note: Hosted publish confirmed for v0.7.2.
    - Details:
      - release_sha: 09d90582c0686610b52287e7527e6fafc9ae5c60
      - version: 0.7.2
      - tag: v0.7.2
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.7.2
      - ghcr: published
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/30911823733
      - external_homebrew: published | basilisk-labs/homebrew-tap | 439f9afa4ac7a5a543eac2a355f47fb8612ab9ef | https://github.com/basilisk-labs/homebrew-tap/pull/35
      - external_scoop: published | basilisk-labs/scoop-bucket | a136558cfdbe56223304381421a4ffb28d0ddbe2 | https://github.com/basilisk-labs/scoop-bucket/pull/35
      - external_setup-agentplane: published | basilisk-labs/setup-agentplane | 7b3c46f4497b05b722d88dfb1e062f7910291f91 | https://github.com/basilisk-labs/setup-agentplane/pull/35
    <!-- END HOSTED PUBLISH EVIDENCE -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The v0.7.1 Publish release workflow published every channel successfully but skipped release-task evidence because three DONE release tasks matched the same version and the selector ignored task-scoped files in the exact release commit.
      Impact: The release itself was correct, but the canonical publish task README retained only pre-merge verification and required manual provenance recovery from the publish-result artifact.
      Resolution: Resolve all task ids touched by the exact release commit, intersect them with version-qualified release tasks, select a unique exact match, and preserve fail-closed fallback behavior for genuine ambiguity; regression and real v0.7.1 replay pass.
extensions:
  implementation_commit:
    hash: "797de145457d7ef41951b3e6dd13360177ed8ffa"
    message: "🧩 WZRXEX post-merge-fix: qualify v0.7.2 release task identity"
  workflow_route_baseline:
    start_head_sha: "f519d9518c34226075a61d2b01b936127a77e587"
    version: 1
id_source: "generated"
---
## Summary

Disambiguate hosted release evidence task selection

Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.

## Scope

- In scope: Make post-publish evidence select the unique release task touched by the exact release commit before falling back to version-wide registry matching; add regression coverage for multiple DONE release tasks sharing one version, record v0.7.1 publication evidence, and ship the corrective patch release.
- Out of scope: unrelated refactors not required for "Disambiguate hosted release evidence task selection".

## Plan

Patch-release plan: version=0.7.2, tag=v0.7.2. 1. Reproduce the hosted publish evidence ambiguity when several DONE release tasks mention one version. 2. Change release-task selection to prefer the unique exact-release-commit task candidate, intersected with version-qualified release tasks, and retain fail-closed behavior for genuine ambiguity. 3. Add focused unit/integration regressions covering unique commit match, multiple registry matches, fallback, and ambiguity. 4. Apply the successful v0.7.1 publish-result to task 202608021232-YCNM1S so its canonical README records hosted publication while preserving unavailable token provenance. 5. Run targeted tests, release contracts, full prepublish, and independent evaluator on the final candidate. 6. Merge through the integration queue, publish v0.7.2 for the exact merged SHA, and verify npm, tag, GitHub Release, clean install, postpublish audit, evidence follow-up, main parity, and branch cleanup. Stop on product drift beyond this repair, tag/version drift, active incidents, or any failed required gate.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: exact-commit task selection, version fallback, and genuine ambiguity cases pass.
2. Run the `prepare` command against the archived v0.7.1 `publish-result.json`. Expected: task `202608021232-YCNM1S` is selected despite other DONE v0.7.1 release tasks.
3. Run `bun run ci:contract` and `bun run release:prepublish`. Expected: all blocking contracts and release gates pass on the final v0.7.2 candidate.
4. Verify task `202608021232-YCNM1S` contains hosted publish evidence for SHA `f519d9518c34226075a61d2b01b936127a77e587` and retains explicit unavailable token provenance.
5. After merge and publish, verify npm `latest` for all three packages is `0.7.2`, tag and GitHub Release `v0.7.2` point to the exact merged SHA, a clean install reports `0.7.2`, postpublish audit passes from the workflow artifact, release evidence follow-up succeeds, main is clean and matches origin, and merged branches/worktrees are removed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T12:01:59.646Z — VERIFY — ok

By: TESTER

Note: v0.7.2 release-evidence selection and release candidate verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:01:40.038Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

Details:

Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; bun run release:prepublish; archived v0.7.1 prepare replay.
Result: PASS — 9/9 targeted release-evidence tests, 9/9 compatibility tests, 101/101 release-ci chunks, 50/50 workflow coverage, 204/204 significant coverage, 16/16 release-critical tests; replay selected task 202608021232-YCNM1S.
Evidence: implementation f0d58a4092e7a659538a32359a4d57a86ae17645; v0.7.1 release SHA f519d9518c34226075a61d2b01b936127a77e587; hosted evidence and explicit supervisor_journal_missing token provenance in .agentplane/tasks/202608021232-YCNM1S/README.md.
Scope: release tooling, regression tests, task evidence, and v0.7.2 release assets only; no AgentPlane runtime/core behavior change and no provider qualification rerun required.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
- old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608041057-WZRXEX
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T12:04:12.205Z — VERIFY — ok

By: TESTER

Note: v0.7.2 release-evidence selection and release candidate verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:02:00.726Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

Details:

Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts; bun run release:prepublish; archived v0.7.1 prepare replay.
Result: pass
Evidence: 9/9 targeted release-evidence tests; 9/9 compatibility tests; 101/101 release-ci chunks; 50/50 workflow coverage; 204/204 significant coverage; 16/16 release-critical tests; replay selected 202608021232-YCNM1S for f519d9518c34226075a61d2b01b936127a77e587; token provenance remains supervisor_journal_missing/unavailable.
Scope: implementation f0d58a4092e7a659538a32359a4d57a86ae17645; release tooling, regression tests, task evidence, and v0.7.2 release assets only; no AgentPlane runtime/core behavior change.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
- old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608041057-WZRXEX
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T12:28:47.188Z — VERIFY — ok

By: TESTER

Note: Final v0.7.2 candidate verification passed
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:05:26.821Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

Details:

Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; archived v0.7.1 publish-result prepare replay; bun run ci:contract; bun run release:prepublish
Result: pass
Evidence: release evidence regression 9/9; real v0.7.1 replay selected 202608021232-YCNM1S; active release incident gate passed with resolved incident archived; final prepublish passed 101/101 release-ci chunks, 50/50 workflow tests, 204/204 significant tests, 16/16 release-critical tests, and 8/8 install migration scenarios
Scope: final implementation head f3000de59d32d425f4dda4eeea91cb8882e1872e

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
- old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

### 2026-08-04T12:34:33.815Z — VERIFY — ok

By: TESTER

Note: Final v0.7.2 candidate and archived-incident state verified
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:31:49.536Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

Details:

Command: git diff --exit-code f3000de59d32d425f4dda4eeea91cb8882e1872e..8dc72497a25202a38b50ea09a8332a0cb59c7dcf excluding task artifacts; bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; node scripts/check-release-incidents.mjs; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: non-task repository tree is identical to f3000de59d32d425f4dda4eeea91cb8882e1872e, where final release:prepublish passed 101/101 base chunks, 50/50 workflow, 204/204 significant, 16/16 release-critical, and 8/8 migrations; current targeted regression passed 9/9; active incident gate passed; archived finding no longer promotes
Scope: final implementation head 8dc72497a25202a38b50ea09a8332a0cb59c7dcf

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
- old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- current_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

### 2026-08-04T12:44:53.273Z — VERIFY — ok

By: TESTER

Note: P1 prior-release evidence collision is fixed and verified
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:36:27.918Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

Details:

Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun run ci:contract; node scripts/check-release-incidents.mjs; product-tree comparison against 8dc72497a25202a38b50ea09a8332a0cb59c7dcf
Result: pass
Evidence: targeted release-evidence suite 10/10 including current v0.7.2 plus prior v0.7.1 evidence collision; current task is independently version-qualified with task_kind=release and mutation_scope=release; full ci:contract and active incident gate pass; product implementation tree remains unchanged from the fully prepublish-tested candidate
Scope: implementation head 797de145457d7ef41951b3e6dd13360177ed8ffa

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
- old_digest: aeb49d43a5ae3d93afd65fe4b524d5d0cc0c6971cd12c8db68df52ad369db54e
- current_digest: 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

### 2026-08-04T12:47:50.392Z — VERIFY — ok

By: TESTER

Note: P1 fix verified against refreshed release blueprint snapshot
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T12:45:34.093Z, excerpt_hash=sha256:e86b3757a66971cef08f3b690d4b91196253d5eccc3a044a9eb9a1b21ec16452

Details:

Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts; bun run ci:contract; agentplane blueprint snapshot 202608041057-WZRXEX
Result: pass
Evidence: release-evidence suite 10/10; full contract pass; release.strict snapshot current with digest 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6 and unchanged route
Scope: implementation head 797de1454

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041057-WZRXEX-disambiguate-hosted-release-evidence-task-select/.agentplane/tasks/202608041057-WZRXEX/blueprint/resolved-snapshot.json
- old_digest: 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6
- current_digest: 6c6523eb8d4d48fa222e00cecb201f045f2edb5b88176ba91e3c60253c688fa6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041057-WZRXEX

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

<!-- BEGIN HOSTED PUBLISH EVIDENCE -->
### Hosted publish

- State: ok
- Note: Hosted publish confirmed for v0.7.2.
- Details:
  - release_sha: 09d90582c0686610b52287e7527e6fafc9ae5c60
  - version: 0.7.2
  - tag: v0.7.2
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.7.2
  - ghcr: published
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/30911823733
  - external_homebrew: published | basilisk-labs/homebrew-tap | 439f9afa4ac7a5a543eac2a355f47fb8612ab9ef | https://github.com/basilisk-labs/homebrew-tap/pull/35
  - external_scoop: published | basilisk-labs/scoop-bucket | a136558cfdbe56223304381421a4ffb28d0ddbe2 | https://github.com/basilisk-labs/scoop-bucket/pull/35
  - external_setup-agentplane: published | basilisk-labs/setup-agentplane | 7b3c46f4497b05b722d88dfb1e062f7910291f91 | https://github.com/basilisk-labs/setup-agentplane/pull/35
<!-- END HOSTED PUBLISH EVIDENCE -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The v0.7.1 Publish release workflow published every channel successfully but skipped release-task evidence because three DONE release tasks matched the same version and the selector ignored task-scoped files in the exact release commit.
  Impact: The release itself was correct, but the canonical publish task README retained only pre-merge verification and required manual provenance recovery from the publish-result artifact.
  Resolution: Resolve all task ids touched by the exact release commit, intersect them with version-qualified release tasks, select a unique exact match, and preserve fail-closed fallback behavior for genuine ambiguity; regression and real v0.7.1 replay pass.

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-04T12:49:00.184Z`
