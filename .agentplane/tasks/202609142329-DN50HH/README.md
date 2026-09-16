---
id: "202609142329-DN50HH"
title: "Release AgentPlane 0.6.30 from the 0.6 maintenance branch"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
task_kind: "release"
mutation_scope: "release"
blueprint_request: "release.strict"
verify:
  - "Verify hosted CI on the final release-candidate head and exact-SHA publication for every claimed channel."
  - "bun run ci:local:full"
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-09-16T19:46:07.399Z"
  updated_by: "USER"
  note: "Approved exact-base refinement to 9001433ac67aa2973b6e3323de041216864eed61 and all actions necessary for the correct 0.6.30 release."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Release planning is blocked because the locally available tag set ends at v0.6.28 while the workspace is already 0.6.29. Recommended action: Fetch the exact remote v0.6.29 tag, verify that it peels to 69d023b1de5450a63244e8443662021fba484f81, restore the task to DOING, and issue a fresh EXECUTOR packet. Agentplane receipt: external-agent-blocker/tr_39fc4b732810e6d750674a78f999c87c/sha256:28b68ef433b7c615e08419dc8be9b6649856f2335943ca6c0680c75dd2a6cd54."
  -
    author: "ORCHESTRATOR"
    body: "Resume: fetched v0.6.29 from origin and verified it resolves exactly to 69d023b1de5450a63244e8443662021fba484f81. Continue the approved 0.6.30 release plan."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The v0.6.30 candidate is prepared, but the required prepublish gate exposed a source-code regression in the newly backported install-layout guard; publishing is unsafe until that guard is corrected and requalified. Recommended action: Create a bounded source-code fix task on the 0.6 maintenance branch. Qualify the source layout against its owning repository/worktree boundary, add the missing cross-repository regression test, merge that fix into the maintenance branch, then restart the v0.6.30 candidate from the new exact base SHA. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts,packages/agentplane/src/commands/branch/work-start.materialize.test.ts,packages/agentplane/src/commands/branch/work-start.materialize.ts; repository effects=source_code,tests; request digest=sha256:be74f5c4b03bfc9b19939132b7b86b934c29f90118a42a33eaf847c1f0d11531. Agentplane receipt: external-agent-blocker/tr_37aba4fcff770d68dd683414acc1d192/sha256:bb54d7703951dce7a53a99b39b2d5932806a6ee5c05c47bf13e148305d471f4e/sha256:be74f5c4b03bfc9b19939132b7b86b934c29f90118a42a33eaf847c1f0d11531."
  -
    author: "USER"
    body: "Resume: PR #5959 merged the corrected runtime guard into codex/release-v0.6.27-reclaim-fix at exact base 9001433ac67aa2973b6e3323de041216864eed61. | details: Rebase the prepared 0.6.30 candidate onto that base, rerun all release gates, merge only to the maintenance branch, and publish from the exact merged SHA."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The release contract is corrected, but the candidate branch still descends from cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9 instead of the required exact base 9001433ac67aa2973b6e3323de041216864eed61. Recommended action: Perform the approved Git lifecycle recovery outside the semantic episode, confirm the candidate merge-base is 9001433ac67aa2973b6e3323de041216864eed61, then issue a replacement EXECUTOR packet and rerun release:prepublish and ci:local:full. Agentplane receipt: external-agent-blocker/tr_dcb9b4835b0d8591906fa13919580226/sha256:e8cf7dcfb5200781a36427bbcf5b351caf25ae59105c3bdda209d3276cc43498."
events:
  -
    type: "status"
    at: "2026-09-14T23:30:39.978Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-14T23:32:07.261Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Release planning is blocked because the locally available tag set ends at v0.6.28 while the workspace is already 0.6.29. Recommended action: Fetch the exact remote v0.6.29 tag, verify that it peels to 69d023b1de5450a63244e8443662021fba484f81, restore the task to DOING, and issue a fresh EXECUTOR packet. Agentplane receipt: external-agent-blocker/tr_39fc4b732810e6d750674a78f999c87c/sha256:28b68ef433b7c615e08419dc8be9b6649856f2335943ca6c0680c75dd2a6cd54."
  -
    type: "status"
    at: "2026-09-14T23:32:29.798Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: fetched v0.6.29 from origin and verified it resolves exactly to 69d023b1de5450a63244e8443662021fba484f81. Continue the approved 0.6.30 release plan."
  -
    type: "status"
    at: "2026-09-14T23:50:38.731Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The v0.6.30 candidate is prepared, but the required prepublish gate exposed a source-code regression in the newly backported install-layout guard; publishing is unsafe until that guard is corrected and requalified. Recommended action: Create a bounded source-code fix task on the 0.6 maintenance branch. Qualify the source layout against its owning repository/worktree boundary, add the missing cross-repository regression test, merge that fix into the maintenance branch, then restart the v0.6.30 candidate from the new exact base SHA. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts,packages/agentplane/src/commands/branch/work-start.materialize.test.ts,packages/agentplane/src/commands/branch/work-start.materialize.ts; repository effects=source_code,tests; request digest=sha256:be74f5c4b03bfc9b19939132b7b86b934c29f90118a42a33eaf847c1f0d11531. Agentplane receipt: external-agent-blocker/tr_37aba4fcff770d68dd683414acc1d192/sha256:bb54d7703951dce7a53a99b39b2d5932806a6ee5c05c47bf13e148305d471f4e/sha256:be74f5c4b03bfc9b19939132b7b86b934c29f90118a42a33eaf847c1f0d11531."
  -
    type: "status"
    at: "2026-09-16T19:42:54.571Z"
    author: "USER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: PR #5959 merged the corrected runtime guard into codex/release-v0.6.27-reclaim-fix at exact base 9001433ac67aa2973b6e3323de041216864eed61. | details: Rebase the prepared 0.6.30 candidate onto that base, rerun all release gates, merge only to the maintenance branch, and publish from the exact merged SHA."
  -
    type: "status"
    at: "2026-09-16T19:46:58.265Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The release contract is corrected, but the candidate branch still descends from cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9 instead of the required exact base 9001433ac67aa2973b6e3323de041216864eed61. Recommended action: Perform the approved Git lifecycle recovery outside the semantic episode, confirm the candidate merge-base is 9001433ac67aa2973b6e3323de041216864eed61, then issue a replacement EXECUTOR packet and rerun release:prepublish and ci:local:full. Agentplane receipt: external-agent-blocker/tr_dcb9b4835b0d8591906fa13919580226/sha256:e8cf7dcfb5200781a36427bbcf5b351caf25ae59105c3bdda209d3276cc43498."
doc_version: 3
doc_updated_at: "2026-09-16T19:46:58.265Z"
doc_updated_by: "SUPERVISOR"
description: "Prepare, qualify, merge, publish, and verify AgentPlane 0.6.30 from exact maintenance SHA cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Do not modify main. Include the safe reusable node_modules layout guard merged by PR #5958."
sections:
  Summary: "Release AgentPlane 0.6.30 from exact maintenance base 9001433ac67aa2973b6e3323de041216864eed61. Do not modify main. Include the install-layout guard from PR #5958 and its active-runtime correction from PR #5959."
  Scope: |-
    - In scope: rebase and qualify the prepared 0.6.30 candidate on exact maintenance SHA 9001433ac67aa2973b6e3323de041216864eed61, merge only to codex/release-v0.6.27-reclaim-fix, publish from the exact merged SHA, and verify all required channels.
    - Out of scope: main and unrelated refactors.
  Plan: "Release plan: version=0.6.30, tag=v0.6.30, base=codex/release-v0.6.27-reclaim-fix at 9001433ac67aa2973b6e3323de041216864eed61. Rebase the prepared candidate onto the exact maintenance base that contains PR #5958 and corrective PR #5959. Regenerate the patch plan and confirm release notes and synchronized package versions. Run release:prepublish and ci:local:full on the final candidate head. Publish a branch_pr release candidate only to codex/release-v0.6.27-reclaim-fix. Require evaluator approval and stable hosted CI. Merge without touching main. Dispatch Publish to npm with the exact merged SHA. Verify npm packages, agentplane and ap install smoke, v0.6.30 tag, GitHub Release assets, GHCR, and the v0.6 moving tag. Report optional credential-gated channels explicitly."
  Verify Steps: |-
    1. Run `agentplane release plan --patch`. Expected: the plan freezes version 0.6.30 and tag v0.6.30 from maintenance base 9001433ac67aa2973b6e3323de041216864eed61.
    2. Run `bun run release:prepublish`. Expected: synchronized package versions, release notes, parity checks, distribution generation, and the full release gate pass on the final candidate head.
    3. Run `bun run ci:local:full`. Expected: the complete local regression suite passes on the final candidate head.
    4. Inspect the final diff and repository status. Expected: only 0.6.30 release metadata, notes, task evidence, and the already-merged guard corrections are present; main is unchanged.
    5. Verify the final release-candidate PR. Expected: all hosted checks pass on the exact final head and the PR targets only codex/release-v0.6.27-reclaim-fix.
    6. After provider merge, dispatch Publish to npm with the exact merged SHA. Expected: npm packages, CLI install smoke for agentplane and ap, v0.6.30 tag, GitHub Release assets, GHCR, and v0.6 tag are confirmed; optional credential-gated channels are reported explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:bb54d7703951dce7a53a99b39b2d5932806a6ee5c05c47bf13e148305d471f4e"
    kind: "task_scope_extension_request"
    request:
      rationale: "The release cannot pass its required prepublish gate without correcting the guard implementation and tests outside release metadata."
      repository_effects:
        - "source_code"
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
        - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
        - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
    request_digest: "sha256:be74f5c4b03bfc9b19939132b7b86b934c29f90118a42a33eaf847c1f0d11531"
    schema_version: 1
    status: "pending"
    transition_id: "tr_37aba4fcff770d68dd683414acc1d192"
    work_item_id: null
  workflow_route_baseline:
    start_head_sha: "cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9"
    version: 1
id_source: "generated"
---
## Summary

Release AgentPlane 0.6.30 from exact maintenance base 9001433ac67aa2973b6e3323de041216864eed61. Do not modify main. Include the install-layout guard from PR #5958 and its active-runtime correction from PR #5959.

## Scope

- In scope: rebase and qualify the prepared 0.6.30 candidate on exact maintenance SHA 9001433ac67aa2973b6e3323de041216864eed61, merge only to codex/release-v0.6.27-reclaim-fix, publish from the exact merged SHA, and verify all required channels.
- Out of scope: main and unrelated refactors.

## Plan

Release plan: version=0.6.30, tag=v0.6.30, base=codex/release-v0.6.27-reclaim-fix at 9001433ac67aa2973b6e3323de041216864eed61. Rebase the prepared candidate onto the exact maintenance base that contains PR #5958 and corrective PR #5959. Regenerate the patch plan and confirm release notes and synchronized package versions. Run release:prepublish and ci:local:full on the final candidate head. Publish a branch_pr release candidate only to codex/release-v0.6.27-reclaim-fix. Require evaluator approval and stable hosted CI. Merge without touching main. Dispatch Publish to npm with the exact merged SHA. Verify npm packages, agentplane and ap install smoke, v0.6.30 tag, GitHub Release assets, GHCR, and the v0.6 moving tag. Report optional credential-gated channels explicitly.

## Verify Steps

1. Run `agentplane release plan --patch`. Expected: the plan freezes version 0.6.30 and tag v0.6.30 from maintenance base 9001433ac67aa2973b6e3323de041216864eed61.
2. Run `bun run release:prepublish`. Expected: synchronized package versions, release notes, parity checks, distribution generation, and the full release gate pass on the final candidate head.
3. Run `bun run ci:local:full`. Expected: the complete local regression suite passes on the final candidate head.
4. Inspect the final diff and repository status. Expected: only 0.6.30 release metadata, notes, task evidence, and the already-merged guard corrections are present; main is unchanged.
5. Verify the final release-candidate PR. Expected: all hosted checks pass on the exact final head and the PR targets only codex/release-v0.6.27-reclaim-fix.
6. After provider merge, dispatch Publish to npm with the exact merged SHA. Expected: npm packages, CLI install smoke for agentplane and ap, v0.6.30 tag, GitHub Release assets, GHCR, and v0.6 tag are confirmed; optional credential-gated channels are reported explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
