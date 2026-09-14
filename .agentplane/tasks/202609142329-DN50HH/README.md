---
id: "202609142329-DN50HH"
title: "Release AgentPlane 0.6.30 from the 0.6 maintenance branch"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-09-14T23:29:55.648Z"
  updated_by: "ORCHESTRATOR"
  note: null
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
doc_version: 3
doc_updated_at: "2026-09-14T23:32:29.798Z"
doc_updated_by: "ORCHESTRATOR"
description: "Prepare, qualify, merge, publish, and verify AgentPlane 0.6.30 from exact maintenance SHA cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Do not modify main. Include the safe reusable node_modules layout guard merged by PR #5958."
sections:
  Summary: |-
    Release AgentPlane 0.6.30 from the 0.6 maintenance branch

    Prepare, qualify, merge, publish, and verify AgentPlane 0.6.30 from exact maintenance SHA cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Do not modify main. Include the safe reusable node_modules layout guard merged by PR #5958.
  Scope: |-
    - In scope: Prepare, qualify, merge, publish, and verify AgentPlane 0.6.30 from exact maintenance SHA cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Do not modify main. Include the safe reusable node_modules layout guard merged by PR #5958.
    - Out of scope: unrelated refactors not required for "Release AgentPlane 0.6.30 from the 0.6 maintenance branch".
  Plan: "Release plan: version=0.6.30, tag=v0.6.30, base=codex/release-v0.6.27-reclaim-fix at cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Generate the patch plan and release notes. Bump all synchronized package versions. Run the full prepublish and local regression gates. Create and publish a branch_pr release candidate only to the maintenance branch. Require hosted CI and evaluator approval on the final candidate head. Merge the PR without touching main. Dispatch Publish to npm with the exact provider merge SHA. Verify npm packages, agentplane and ap install smoke, v0.6.30 tag, GitHub Release assets, GHCR, and the v0.6 moving tag. Preserve explicit evidence for any credential-gated optional channels."
  Verify Steps: |-
    1. Run `agentplane release plan --patch`. Expected: the plan freezes version 0.6.30 and tag v0.6.30 from maintenance base cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9.
    2. Run the release candidate command and its required prepublish gate. Expected: synchronized package versions, release notes, parity checks, distribution generation, and the full release gate pass on the candidate commit.
    3. Run `bun run ci:local:full`. Expected: the complete local regression suite passes on the final candidate head.
    4. Inspect the final diff and repository status. Expected: only 0.6.30 release metadata, notes, task evidence, and the already-merged guard are present; main is unchanged.
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
  workflow_route_baseline:
    start_head_sha: "cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9"
    version: 1
id_source: "generated"
---
## Summary

Release AgentPlane 0.6.30 from the 0.6 maintenance branch

Prepare, qualify, merge, publish, and verify AgentPlane 0.6.30 from exact maintenance SHA cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Do not modify main. Include the safe reusable node_modules layout guard merged by PR #5958.

## Scope

- In scope: Prepare, qualify, merge, publish, and verify AgentPlane 0.6.30 from exact maintenance SHA cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Do not modify main. Include the safe reusable node_modules layout guard merged by PR #5958.
- Out of scope: unrelated refactors not required for "Release AgentPlane 0.6.30 from the 0.6 maintenance branch".

## Plan

Release plan: version=0.6.30, tag=v0.6.30, base=codex/release-v0.6.27-reclaim-fix at cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9. Generate the patch plan and release notes. Bump all synchronized package versions. Run the full prepublish and local regression gates. Create and publish a branch_pr release candidate only to the maintenance branch. Require hosted CI and evaluator approval on the final candidate head. Merge the PR without touching main. Dispatch Publish to npm with the exact provider merge SHA. Verify npm packages, agentplane and ap install smoke, v0.6.30 tag, GitHub Release assets, GHCR, and the v0.6 moving tag. Preserve explicit evidence for any credential-gated optional channels.

## Verify Steps

1. Run `agentplane release plan --patch`. Expected: the plan freezes version 0.6.30 and tag v0.6.30 from maintenance base cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9.
2. Run the release candidate command and its required prepublish gate. Expected: synchronized package versions, release notes, parity checks, distribution generation, and the full release gate pass on the candidate commit.
3. Run `bun run ci:local:full`. Expected: the complete local regression suite passes on the final candidate head.
4. Inspect the final diff and repository status. Expected: only 0.6.30 release metadata, notes, task evidence, and the already-merged guard are present; main is unchanged.
5. Verify the final release-candidate PR. Expected: all hosted checks pass on the exact final head and the PR targets only codex/release-v0.6.27-reclaim-fix.
6. After provider merge, dispatch Publish to npm with the exact merged SHA. Expected: npm packages, CLI install smoke for agentplane and ap, v0.6.30 tag, GitHub Release assets, GHCR, and v0.6 tag are confirmed; optional credential-gated channels are reported explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
